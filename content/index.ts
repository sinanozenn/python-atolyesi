// Tüm derslerin listesi: önce iki hazırlık dersi (algoritma, akış şeması), sonra ders kitabı 3. Ünite sırası.
// Yeni bir ders eklemek için:
// 1) content/dersler/ klasörüne yeni bir dosya oluşturun (mevcut bir dersi kopyalayıp başlayabilirsiniz)
// 2) Aşağıya import edip SIRA listesinde istediğiniz yere ekleyin. Ders numaraları bu sıraya göre otomatik verilir.
import type { Ders, AlistirmaVerisi } from "./tipler";
import h01 from "./dersler/00a-algoritma";
import h02 from "./dersler/00b-akis-semasi";
import d01 from "./dersler/01-yazilim-program-kod";
import d02 from "./dersler/02-operatorler";
import d03 from "./dersler/03-degiskenler";
import d04 from "./dersler/04-veri-turleri";
import d05 from "./dersler/05-veri-turlerinin-kullanimi";
import d06 from "./dersler/06-diziler";
import d07 from "./dersler/07-if-else";
import d08 from "./dersler/08-elif";
import d09 from "./dersler/09-for-dongusu";
import d10 from "./dersler/10-while-dongusu";
import d11 from "./dersler/11-dongu-ve-karar";
import d12 from "./dersler/12-unite-degerlendirme";

const SIRA: Ders[] = [h01, h02, d01, d02, d03, d04, d05, d06, d07, d08, d09, d10, d11, d12];

export const dersler: Ders[] = SIRA.map((d, i) => ({ ...d, sira: i + 1 }));

export function dersBul(slug: string): Ders | undefined {
  return dersler.find((d) => d.slug === slug);
}

export function alistirmalar(d: Ders): AlistirmaVerisi[] {
  return d.bloklar.flatMap((b) => (b.tur === "alistirma" ? [b.alistirma] : []));
}

/** "3.4 Karar Yapıları · 3.4.1 If-else Yapısı · s. 102–105" → { bolum: "3.4.1", sayfa: "s. 102–105", etiket: "Kitap 3.4.1, s. 102–105" } */
export function kitapKunye(d: Ders): { bolum: string; sayfa: string; etiket: string } {
  if (d.kitap.startsWith("Hazırlık")) return { bolum: "hazırlık", sayfa: "", etiket: "Hazırlık dersi" };
  const sayfa = d.kitap.match(/s\.\s*\d+(?:–\d+)?/)?.[0] ?? "";
  const numaralar = d.kitap.match(/\b\d+\.\d+(?:\.\d+)*/g);
  // En ayrıntılı (en çok noktalı) bölüm numarasını al; eşitse ilki
  const bolum = numaralar ? numaralar.reduce((a, b) => (b.split(".").length > a.split(".").length ? b : a)) : "ünite sonu";
  const etiket = (bolum === "ünite sonu" ? "Ünite sonu" : `Kitap ${bolum}`) + (sayfa ? `, ${sayfa}` : "");
  return { bolum, sayfa, etiket };
}

