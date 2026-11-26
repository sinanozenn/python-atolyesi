// Python'u ana sayfayı dondurmadan arka planda çalıştıran web worker.
import { loadPyodide } from "./pyodide.mjs";
import { hazirla } from "./runner-core.mjs";

const indexURL = new URL("./", import.meta.url).href;
const motor = hazirla(loadPyodide, indexURL);
const cozucu = new TextDecoder();

motor
  .then(() => self.postMessage({ tip: "hazir" }))
  .catch((e) => self.postMessage({ tip: "yuklenemedi", mesaj: String(e) }));

self.onmessage = async (olay) => {
  const veri = olay.data;
  const { id } = veri;
  try {
    const m = await motor;
    if (veri.tip === "etkilesimli") {
      // Ortak bellek: [0] = durum bayrağı (0 bekliyor, 1 cevap hazır), [1] = cevabın bayt uzunluğu, 8. bayttan sonrası = cevap
      const kontrol = new Int32Array(veri.sab, 0, 2);
      const baytlar = new Uint8Array(veri.sab, 8);
      const girdiAl = (istem) => {
        Atomics.store(kontrol, 0, 0);
        self.postMessage({ tip: "girdi", id, istem });
        Atomics.wait(kontrol, 0, 0);
        return cozucu.decode(baytlar.slice(0, kontrol[1]));
      };
      const ciktiYaz = (metin) => self.postMessage({ tip: "akis", id, metin });
      const { hata } = m.calistirEtkilesimli(veri.kod, ciktiYaz, girdiAl);
      self.postMessage({ tip: "sonuc", id, cikti: "", hata });
    } else {
      const sonuc = m.calistir(veri.kod, veri.girdiler, veri.yanki);
      self.postMessage({ tip: "sonuc", id, ...sonuc });
    }
  } catch (e) {
    self.postMessage({ tip: "sonuc", id, cikti: "", hata: { tur: "MotorHatası", mesaj: String(e), satir: null, ayrinti: "" } });
  }
};
