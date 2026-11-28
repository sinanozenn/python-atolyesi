// Her alıştırmanın örnek çözümünü testlere karşı çalıştırır ve tüm örnek kodların hatasız çalıştığını kontrol eder.
// Çalıştırmak için: npx tsx tests/cozumleri-dogrula.mts
import { loadPyodide } from "pyodide";
// @ts-ignore
import { hazirla } from "../python-motoru/runner-core.mjs";
import { dersler, alistirmalar } from "../content";
import { ciktiyiDuzenle } from "../lib/kontrol";
import path from "node:path";
import { akisOrnekleri } from "../content/akis-ornekleri";
import { ideOrnekleri } from "../content/ide-ornekleri";
import { semaGraf, sema } from "../content/sema";
import { semayiDenetle, semayiDerle, iziAyir } from "../lib/akis-derleyici";

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
// Akış şeması örnekleri: çizilebiliyor, denetimden geçiyor, Python'a çevrilip doğru çalışıyor mu?
for (const o of ideOrnekleri) {
  if (!o.deneme) continue;
  const r = calistir(o.kod.replace("time.sleep(1)", "pass"), o.deneme, true);
  if (r.hata) { hata++; console.log(`❌ [IDE ${o.dosya}]`, r.hata); }
}
for (const o of akisOrnekleri) {
  sema(o.ad, o.parcalar);
  const g = semaGraf(o.parcalar);
  const d = semayiDenetle(g);
  if (d.length) { hata++; console.log(`❌ [akış ${o.id}] denetim:`, d); continue; }
  const r = calistir(semayiDerle(g), o.test.girdiler, false);
  const { cikti, iz } = iziAyir(r.cikti);
  if (r.hata || !iz || ciktiyiDuzenle(cikti) !== ciktiyiDuzenle(o.test.beklenen)) {
    hata++;
    console.log(`❌ [akış ${o.id}]\n  beklenen: ${JSON.stringify(o.test.beklenen)}\n  çıktı:    ${JSON.stringify(cikti)}`, r.hata ?? "", iz ? "" : "iz yok");
  }
}

console.log(hata ? `\n${hata} sorun bulundu.` : `\n✅ ${dersler.length} ders, ${ids.size} alıştırma: ${akisOrnekleri.length} akış şeması, ${ideOrnekleri.length} IDE örneği: tüm çözümler ve örnekler doğru çalışıyor.`);
process.exit(hata ? 1 : 0);
