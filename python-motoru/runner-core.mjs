// Python kodunu Pyodide ile çalıştıran çekirdek mantık.
// Hem tarayıcıdaki web worker (worker.mjs) hem de testler bu dosyayı kullanır.

const KURULUM = `
import builtins, sys

_kalan_girdiler = []
_yanki = True
_js_girdi = None

def _girdileri_ayarla(liste, yanki, js_girdi=None):
    global _kalan_girdiler, _yanki, _js_girdi
    _kalan_girdiler = [str(x) for x in liste]
    _yanki = yanki
    _js_girdi = js_girdi

def _girdi(istem=""):
    if _js_girdi is not None:
        # Etkileşimli mod (IDE): istemi göster, kullanıcı cevap yazana kadar bekle
        if istem:
            print(istem, end="")
        sys.stdout.flush()
        return str(_js_girdi(str(istem)))
    if _yanki and istem:
        print(istem, end="")
    if not _kalan_girdiler:
        raise EOFError("GIRDI_BITTI")
    deger = _kalan_girdiler.pop(0)
    if _yanki:
        print(deger)
    return deger

builtins.input = _girdi
`;

const AZAMI_CIKTI = 50_000; // karakter (etkileşimsiz mod)

export async function hazirla(loadPyodide, indexURL) {
  const pyodide = await loadPyodide({ indexURL });
  pyodide.runPython(KURULUM);

  const cozucu = new TextDecoder();
  let cikti = "";
  let kesildi = false;
  /** @type {null | ((metin: string) => void)} */
  let akis = null;
  const yaz = (buf) => {
    const metin = cozucu.decode(buf, { stream: true });
    if (akis) akis(metin);
    else if (cikti.length < AZAMI_CIKTI) cikti += metin;
    else kesildi = true;
    return buf.length;
  };
  pyodide.setStdout({ write: yaz });
  pyodide.setStderr({ write: yaz });
  // Çıktının anında görünmesi için satır tamponlamayı aç
  try {
    pyodide.runPython("import sys; sys.stdout.reconfigure(line_buffering=True)");
  } catch {}

  function kosu(kod) {
    const ad = pyodide.globals.get("dict")();
    ad.set("__name__", "__main__");
    let hata = null;
    try {
      pyodide.runPython(kod, { globals: ad, filename: "<kod>" });
    } catch (e) {
      hata = hatayiAyristir(e);
    } finally {
      try { pyodide.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()"); } catch {}
      ad.destroy();
    }
    return hata;
  }

  /**
   * Etkileşimsiz çalıştırma (dersler ve alıştırma kontrolü).
   * @param {string} kod
   * @param {string[]} girdiler  input() çağrılarına sırayla verilecek değerler
   * @param {boolean} yanki      true: terminal gibi istemi ve girilen değeri göster
   */
  function calistir(kod, girdiler = [], yanki = true) {
    cikti = "";
    kesildi = false;
    akis = null;
    pyodide.globals.get("_girdileri_ayarla")(pyodide.toPy(girdiler), yanki);
    const hata = kosu(kod);
    if (kesildi) cikti += "\n… (çıktı çok uzun olduğu için kesildi)";
    return { cikti, hata };
  }

  /**
   * Etkileşimli çalıştırma (IDE): çıktı anında akar, input() kullanıcıdan canlı cevap bekler.
   * @param {string} kod
   * @param {(metin: string) => void} ciktiYaz
   * @param {(istem: string) => string} girdiAl  senkron olarak cevap döndürmeli (Atomics.wait ile)
   */
  function calistirEtkilesimli(kod, ciktiYaz, girdiAl) {
    akis = ciktiYaz;
    pyodide.globals.get("_girdileri_ayarla")(pyodide.toPy([]), false, girdiAl);
    try {
      return { hata: kosu(kod) };
    } finally {
      akis = null;
      pyodide.globals.get("_girdileri_ayarla")(pyodide.toPy([]), true);
    }
  }

  return { calistir, calistirEtkilesimli };
}

function hatayiAyristir(e) {
  const ham = String(e && e.message ? e.message : e);
  const satirlar = ham.trimEnd().split("\n");
  const son = satirlar[satirlar.length - 1] || "";
  const tur = (e && e.type) || (son.match(/^(\w+(?:Error|Exception)|\w+):/) || [])[1] || "Hata";
  const mesaj = son.startsWith(tur) ? son.slice(tur.length).replace(/^:\s*/, "") : son;

  // Kullanıcının kodundaki satır numarasını bul (son eşleşme en yakın olandır)
  let satir = null;
  for (const m of ham.matchAll(/File "<kod>", line (\d+)/g)) satir = Number(m[1]);

  // Sözdizimi hatalarında hatalı satırı ve ^ işaretini göster
  let ayrinti = "";
  const i = satirlar.findIndex((s) => s.includes('File "<kod>"'));
  if (i >= 0 && (tur === "SyntaxError" || tur === "IndentationError" || tur === "TabError")) {
    ayrinti = satirlar.slice(i + 1, satirlar.length - 1).join("\n");
  }
  return { tur, mesaj, satir, ayrinti };
}
