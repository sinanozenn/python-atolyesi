// Çalıştırılabilir akış şeması örnekleri. Derslerde çizilir, Akış Şeması Aracı'nda şablon olarak açılır.
// Kutu içerikleri Python kurallarıyla yazılır (bkz. lib/akis-derleyici.ts).
// "test" alanı, örneğin doğru çalıştığını otomatik kontrol etmek içindir (npm test).

import type { Parca } from "./sema";

export type AkisOrnegi = {
  id: string;
  ad: string;
  aciklama: string;
  parcalar: Parca[];
  test: { girdiler: string[]; beklenen: string };
};

export const akisOrnekleri: AkisOrnegi[] = [
  {
    id: "toplama",
    ad: "İki sayının toplamı",
    aciklama: "Kullanıcıdan iki sayı alır, toplamını ekrana yazar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "a, b" },
      { t: "islem", m: "toplam = a + b" },
      { t: "cikis", m: '"Toplam:", toplam' },
      { t: "bit" },
    ],
    test: { girdiler: ["3", "4"], beklenen: "Toplam: 7" },
  },
  {
    id: "dikdortgen",
    ad: "Dikdörtgenin alanı ve çevresi",
    aciklama: "Kısa ve uzun kenarı alır; alanı ve çevreyi hesaplayıp yazar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "kisa, uzun" },
      { t: "islem", m: "alan = kisa * uzun" },
      { t: "islem", m: "cevre = 2 * (kisa + uzun)" },
      { t: "cikis", m: '"Alan:", alan' },
      { t: "cikis", m: '"Çevre:", cevre' },
      { t: "bit" },
    ],
    test: { girdiler: ["4", "7"], beklenen: "Alan: 28\nÇevre: 22" },
  },
  {
    id: "daire",
    ad: "Dairenin alanı",
    aciklama: "Yarıçapı alır, pi = 3.14 ile dairenin alanını hesaplar.",
    parcalar: [
      { t: "bas" },
      { t: "islem", m: "pi = 3.14" },
      { t: "giris", m: "r" },
      { t: "islem", m: "alan = pi * r * r" },
      { t: "cikis", m: '"Alan:", alan' },
      { t: "bit" },
    ],
    test: { girdiler: ["10"], beklenen: "Alan: 314.0" },
  },
  {
    id: "tek-cift",
    ad: "Tek mi, çift mi?",
    aciklama: "Girilen sayının 2'ye bölümünden kalana bakarak tek ya da çift olduğunu yazar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "sayi" },
      { karar: "sayi % 2 == 0 ?", evet: [{ t: "cikis", m: '"Çift"' }], hayir: [{ t: "cikis", m: '"Tek"' }] },
      { t: "bit" },
    ],
    test: { girdiler: ["7"], beklenen: "Tek" },
  },
  {
    id: "buyuk",
    ad: "İki sayıdan büyüğü",
    aciklama: "İki sayıyı karşılaştırır, büyük olanı yazar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "a, b" },
      { karar: "a > b ?", evet: [{ t: "cikis", m: '"Büyük olan:", a' }], hayir: [{ t: "cikis", m: '"Büyük olan:", b' }] },
      { t: "bit" },
    ],
    test: { girdiler: ["12", "30"], beklenen: "Büyük olan: 30" },
  },
  {
    id: "ortalama",
    ad: "Not ortalaması: geçti mi?",
    aciklama: "Üç notun ortalamasını hesaplar; 50 ve üzeri ise “Geçti”, değilse “Kaldı” yazar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "not1, not2, not3" },
      { t: "islem", m: "ort = (not1 + not2 + not3) / 3" },
      { karar: "ort >= 50 ?", evet: [{ t: "cikis", m: '"Geçti, ortalama:", ort' }], hayir: [{ t: "cikis", m: '"Kaldı, ortalama:", ort' }] },
      { t: "bit" },
    ],
    test: { girdiler: ["60", "70", "80"], beklenen: "Geçti, ortalama: 70.0" },
  },
  {
    id: "say",
    ad: "1'den 5'e kadar say",
    aciklama: "Bir sayaçla 1'den 5'e kadar olan sayıları alt alta yazar.",
    parcalar: [
      { t: "bas" },
      { t: "islem", m: "i = 1" },
      { dongu: "i <= 5 ?", govde: [{ t: "cikis", m: "i" }, { t: "islem", m: "i = i + 1" }] },
      { t: "cikis", m: '"Bitti"' },
      { t: "bit" },
    ],
    test: { girdiler: [], beklenen: "1\n2\n3\n4\n5\nBitti" },
  },
  {
    id: "toplam-n",
    ad: "1'den n'ye kadar toplam",
    aciklama: "n sayısını alır; 1 + 2 + … + n toplamını döngüyle hesaplar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "n" },
      { t: "islem", m: "toplam = 0" },
      { t: "islem", m: "i = 1" },
      { dongu: "i <= n ?", govde: [{ t: "islem", m: "toplam = toplam + i" }, { t: "islem", m: "i = i + 1" }] },
      { t: "cikis", m: '"Toplam:", toplam' },
      { t: "bit" },
    ],
    test: { girdiler: ["10"], beklenen: "Toplam: 55" },
  },
  {
    id: "carpim",
    ad: "Çarpım tablosu",
    aciklama: "Girilen sayının 1'den 10'a kadar çarpım tablosunu yazar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "sayi" },
      { t: "islem", m: "i = 1" },
      { dongu: "i <= 10 ?", govde: [{ t: "cikis", m: 'sayi, "x", i, "=", sayi * i' }, { t: "islem", m: "i = i + 1" }] },
      { t: "bit" },
    ],
    test: {
      girdiler: ["3"],
      beklenen: Array.from({ length: 10 }, (_, k) => `3 x ${k + 1} = ${3 * (k + 1)}`).join("\n"),
    },
  },
  {
    id: "sifre",
    ad: "Doğru şifreyi bekle",
    aciklama: "Doğru şifre girilene kadar tekrar sorar.",
    parcalar: [
      { t: "bas" },
      { t: "giris", m: "sifre" },
      { dongu: 'sifre != 1234 ?', govde: [{ t: "cikis", m: '"Yanlış şifre, tekrar dene."' }, { t: "giris", m: "sifre" }] },
      { t: "cikis", m: '"Giriş başarılı"' },
      { t: "bit" },
    ],
    test: { girdiler: ["1111", "4321", "1234"], beklenen: "Yanlış şifre, tekrar dene.\nYanlış şifre, tekrar dene.\nGiriş başarılı" },
  },
];

export function akisOrnegi(id: string): AkisOrnegi {
  const o = akisOrnekleri.find((x) => x.id === id);
  if (!o) throw new Error(`Akış örneği bulunamadı: ${id}`);
  return o;
}
