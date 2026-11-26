// Her alıştırmanın örnek çözümünü testlere karşı çalıştırır ve tüm örnek kodların hatasız çalıştığını kontrol eder.
// Çalıştırmak için: npx tsx tests/cozumleri-dogrula.mts
import { loadPyodide } from "pyodide";
// @ts-ignore
import { hazirla } from "../python-motoru/runner-core.mjs";
import { dersler, alistirmalar } from "../content";
import { ciktiyiDuzenle } from "../lib/kontrol";
import path from "node:path";

const { calistir } = await hazirla(loadPyodide, path.resolve("node_modules/pyodide") + "/");
let hata = 0;
const ids = new Set<string>();
for (const d of dersler) {
  for (const b of d.bloklar) {
    if (b.tur === "ornek") {
      const r = calistir(b.kod, b.girdiler ?? [], true);
      const bilerek = !!b.hataBekleniyor;
      if (!!r.hata !== bilerek) { hata++; console.log(`❌ [${d.slug}] örnek "${b.baslik}":`, r.hata); }
    }
  }
  for (const a of alistirmalar(d)) {
    if (ids.has(a.id)) { hata++; console.log("❌ tekrar eden id", a.id); }
    ids.add(a.id);
    for (const k of a.kodKurallari ?? []) {
      const v = new RegExp(k.desen, "m").test(a.cozum);
      if (k.olmamali ? v : !v) { hata++; console.log(`❌ [${a.id}] çözüm kuralı sağlamıyor: ${k.mesaj}`); }
    }
    a.testler.forEach((t, i) => {
      const r = calistir(a.cozum, t.girdiler ?? [], false);
      if (r.hata || ciktiyiDuzenle(r.cikti) !== ciktiyiDuzenle(t.beklenen)) {
        hata++;
        console.log(`❌ [${a.id}] test ${i + 1}\n  beklenen: ${JSON.stringify(t.beklenen)}\n  çıktı:    ${JSON.stringify(r.cikti)}`, r.hata ?? "");
      }
    });
    // Başlangıç kodu testleri GEÇMEMELİ (yoksa alıştırma anlamsız olur)
    const bas = a.testler.every((t) => { const r = calistir(a.baslangicKodu, t.girdiler ?? [], false); return !r.hata && ciktiyiDuzenle(r.cikti) === ciktiyiDuzenle(t.beklenen); });
    if (bas) { hata++; console.log(`❌ [${a.id}] başlangıç kodu zaten testleri geçiyor`); }
  }
}
console.log(hata ? `\n${hata} sorun bulundu.` : `\n✅ ${dersler.length} ders, ${ids.size} alıştırma: tüm çözümler ve örnekler doğru çalışıyor.`);
process.exit(hata ? 1 : 0);
