import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: type() ile türü öğrenmek

Bir değerin türünü \`type()\` ile sorabilirsin:

| Kod | Sonuç | Anlamı |
|---|---|---|
| \`type(15)\` | \`<class 'int'>\` | Tam sayı (integer) |
| \`type(3.5)\` | \`<class 'float'>\` | Ondalıklı sayı |
| \`type("15")\` | \`<class 'str'>\` | Metin (string) |
| \`type(True)\` | \`<class 'bool'>\` | Mantıksal değer |

**Dönüştürme komutları:**
- \`int("15")\` → 15 (metni tam sayıya çevirir)
- \`float("2.5")\` → 2.5 (metni ondalıklı sayıya çevirir)
- \`str(15)\` → "15" (sayıyı metne çevirir)

> \`int("on beş")\` ya da \`int("2.5")\` **hata verir**: int() yalnızca tam sayı gibi görünen metinleri çevirebilir.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Türleri görelim",
    aciklama: "Aynı görünen değerlerin türleri farklı olabilir.",
    kod: `print(type(42))
print(type("42"))
print(type(4.2))
print(type(4 > 2))`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Adın kaç harf?",
    aciklama: "len() bir metnin kaç karakterden oluştuğunu söyler. Girdiler kutusuna kendi adını yaz.",
    kod: `ad = input("Adın ne? ")
print("Merhaba", ad)
print("Adın", len(ad), "harften oluşuyor.")`,
    girdiler: ["Zeynep"],
  },
  {
    tur: "soru",
    soru: "`print(\"5\" * 3)` ve `print(5 * 3)` komutlarının çıktıları sırasıyla nedir?",
    secenekler: ["15 ve 15", "555 ve 15", "15 ve 555", "Hata ve 15"],
    dogru: 1,
    aciklama: "\"5\" bir **metin**dir; metin × 3 metni üç kez yan yana yazar: **555**. 5 bir sayıdır: 5 × 3 = **15**. Tür, işlemin anlamını değiştirir!",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Metin + metin, sayı + sayı",
    aciklama: "+ işareti sayılarda toplar, metinlerde birleştirir.",
    kod: `print(10 + 20)
print("10" + "20")
print(int("10") + int("20"))
print("Not: " + str(85))`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Doğum yılından yaş",
    aciklama: "input() metin verdiği için hesap yapmadan önce int() ile sayıya çeviriyoruz. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `yil = int(input("Doğum yılın: "))
yas = 2026 - yil
print("Bu yıl", yas, "yaşına giriyorsun.")
print("10 yıl sonra", yas + 10, "yaşında olacaksın.")`,
    girdiler: ["2011"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Üç sayının ortalaması",
    aciklama: "Ondalıklı girdiler için float() kullanılır. Ortalama da ondalıklı olabilir; round() ile yuvarlıyoruz.",
    kod: `a = float(input("1. not: "))
b = float(input("2. not: "))
c = float(input("3. not: "))
ortalama = (a + b + c) / 3
print("Ortalama:", round(ortalama, 2))`,
    girdiler: ["78", "91.5", "64"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Fiş yazdır",
    aciklama: "Metin, sayı ve dönüştürmeler bir arada. str() ile sayıyı metne çevirip + ile birleştiriyoruz.",
    kod: `urun = input("Ürün: ")
adet = int(input("Adet: "))
fiyat = float(input("Birim fiyat: "))
toplam = adet * fiyat
print("-" * 24)
print(urun + " x " + str(adet))
print("Toplam: " + str(toplam) + " TL")
print("-" * 24)`,
    girdiler: ["Defter", "3", "27.5"],
  },
  {
    tur: "metin",
    icerik: `
## Sık yapılan hatalar
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Metin ile sayı toplama",
    aciklama: "input() metin verir. \"15\" + 1 yapılamaz. int() ile düzelt.",
    kod: `yas = input("Yaşın: ")
print(yas + 1)`,
    girdiler: ["15"],
    hataBekleniyor: true,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Çevrilemeyen metin",
    aciklama: "\"2.5\" bir tam sayı değildir; int() çeviremez. float() kullanmalısın.",
    kod: `x = int("2.5")
print(x)`,
    hataBekleniyor: true,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k4-dikdortgen",
      baslik: "🟡 Orta: Dikdörtgen",
      gorev: `Kullanıcıdan bir dikdörtgenin **kısa** ve **uzun** kenarını (tam sayı) al. Alanı ve çevreyi şöyle yazdır (kullanıcı 4 ve 7 girerse):

\`\`\`
Alan: 28
Çevre: 22
\`\`\``,
      baslangicKodu: `kisa = input("Kısa kenar: ")\nuzun = input("Uzun kenar: ")\n`,
      testler: [
        { girdiler: ["4", "7"], beklenen: "Alan: 28\nÇevre: 22" },
        { girdiler: ["10", "15"], beklenen: "Alan: 150\nÇevre: 50" },
      ],
      ipuclari: ["input() metin verir; int(input(...)) kullan.", "cevre = 2 * (kisa + uzun)"],
      cozum: `kisa = int(input("Kısa kenar: "))
uzun = int(input("Uzun kenar: "))
print("Alan:", kisa * uzun)
print("Çevre:", 2 * (kisa + uzun))`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k4-kullanici-adi",
      baslik: "🔴 Zor: Kullanıcı adı üret",
      gorev: `Kullanıcıdan **adını** ve **doğum yılını** al. Adın sonuna doğum yılını ekleyerek bir kullanıcı adı oluştur, adın kaç harf olduğunu da yaz. Kullanıcı Ali ve 2010 girerse:

\`\`\`
Kullanıcı adın: Ali2010
Adın 3 harf.
\`\`\``,
      baslangicKodu: `ad = input("Adın: ")\nyil = int(input("Doğum yılın: "))\n`,
      testler: [
        { girdiler: ["Ali", "2010"], beklenen: "Kullanıcı adın: Ali2010\nAdın 3 harf." },
        { girdiler: ["Zeynep", "2011"], beklenen: "Kullanıcı adın: Zeynep2011\nAdın 6 harf." },
      ],
      ipuclari: ["Araya boşluk girmemesi için + ile birleştir: ad + str(yil)", "Harf sayısı: len(ad)"],
      cozum: `ad = input("Adın: ")
yil = int(input("Doğum yılın: "))
print("Kullanıcı adın: " + ad + str(yil))
print("Adın", len(ad), "harf.")`,
    },
  },
];

export default bloklar;
