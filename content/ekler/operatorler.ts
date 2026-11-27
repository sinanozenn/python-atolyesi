import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: bölme, tam bölme ve kalan

Python'da bölmeyle ilgili **üç** operatör vardır. Aralarındaki farkı 17 ÷ 5 işlemiyle görelim:

| İşlem | Anlamı | Sonuç |
|---|---|---|
| \`17 / 5\` | Normal bölme (her zaman ondalıklı) | \`3.4\` |
| \`17 // 5\` | **Tam bölme**: bölümün tam kısmı | \`3\` |
| \`17 % 5\` | **Mod**: bölmeden kalan | \`2\` |

İlkokuldaki bölme işlemini hatırla: 17'nin içinde **3** tane 5 vardır (15), **kalan 2**'dir. \`//\` bölümü, \`%\` kalanı verir.

**Mod (%) nerede işe yarar?**
- Bir sayı **çift mi?** → \`sayi % 2 == 0\`
- Bir sayı 5'e **bölünebilir mi?** → \`sayi % 5 == 0\`
- Bir sayının **son basamağı** → \`sayi % 10\` (ör. 347 % 10 = 7)

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Dört işlem",
    aciklama: "Sayıları değiştirip sonuçların nasıl değiştiğine bak. Bölmenin her zaman ondalıklı sonuç verdiğine dikkat et.",
    kod: `a = 20
b = 8
print("Toplam:", a + b)
print("Fark:", a - b)
print("Çarpım:", a * b)
print("Bölüm:", a / b)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Bölüm ve kalan",
    aciklama: "// tam bölme, % kalan verir. 25 öğrenciyi 4'erli gruplara ayırıyoruz.",
    kod: `ogrenci = 25
grup = 4
print("Tam grup sayısı:", ogrenci // grup)
print("Gruba giremeyen:", ogrenci % grup)`,
  },
  {
    tur: "soru",
    soru: "`23 // 4` ve `23 % 4` işlemlerinin sonuçları sırasıyla nedir?",
    secenekler: ["5.75 ve 3", "5 ve 3", "5 ve 0.75", "6 ve 1"],
    dogru: 1,
    aciklama: "23'ün içinde **5** tane 4 vardır (20), kalan **3**'tür. `//` → 5, `%` → 3.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Dakikayı saate çevir",
    aciklama: "Bir film 135 dakika. // ve % ile saat ve dakikaya ayırıyoruz.",
    kod: `sure = 135
saat = sure // 60
dakika = sure % 60
print("Film", saat, "saat", dakika, "dakika sürüyor.")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: İşlem önceliği ve parantez",
    aciklama: "Öncelik: önce parantez, sonra **, sonra * / // %, en son + -. Aynı öncelikteki işlemler soldan sağa yapılır.",
    kod: `print(2 + 3 * 4)        # önce çarpma: 2 + 12
print((2 + 3) * 4)      # önce parantez: 5 * 4
print(2 * 3 ** 2)       # önce üs: 2 * 9
print(20 - 10 - 5)      # soldan sağa: 10 - 5
print(20 / 5 * 2)       # soldan sağa: 4.0 * 2`,
  },
  {
    tur: "soru",
    soru: "`10 - 2 * 3 + 1` işleminin sonucu nedir?",
    secenekler: ["25", "5", "3", "8"],
    dogru: 1,
    aciklama: "Önce çarpma: 2 × 3 = 6. Sonra soldan sağa: 10 − 6 = 4, 4 + 1 = **5**.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Karşılaştırmalar True/False verir",
    aciklama: "Karşılaştırma operatörlerinin sonucu her zaman True (doğru) ya da False (yanlış) olur.",
    kod: `yas = 15
print(yas > 12)      # 15, 12'den büyük mü?
print(yas == 18)     # 15, 18'e eşit mi?
print(yas != 18)     # 15, 18'den farklı mı?
print(yas >= 15)     # büyük veya eşit mi?
print(17 % 2 == 1)   # 17 tek mi?`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Basamaklara ayırma",
    aciklama: "Üç basamaklı bir sayının basamaklarını // ve % ile buluyoruz. 10'a bölmek sayıyı bir basamak sağa kaydırır.",
    kod: `sayi = 472
yuzler = sayi // 100
onlar = (sayi // 10) % 10
birler = sayi % 10
print("Yüzler basamağı:", yuzler)
print("Onlar basamağı:", onlar)
print("Birler basamağı:", birler)
print("Rakamlar toplamı:", yuzler + onlar + birler)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Mantıksal operatörlerle kurallar",
    aciklama: "and: iki koşul da doğru olmalı. or: en az biri doğru olmalı. not: sonucu tersine çevirir.",
    kod: `yas = 16
boy = 145
# Lunaparkta bir oyuncak için kural: 12 yaş üstü VE 140 cm üstü
print("Binebilir mi?", yas > 12 and boy > 140)
# İndirim kuralı: 18 yaş altı VEYA 65 yaş üstü
print("İndirimli mi?", yas < 18 or yas > 65)
# Artık yıl mı? (4'e bölünür ve 100'e bölünmez) veya 400'e bölünür
yil = 2024
print(yil, "artık yıl mı?", (yil % 4 == 0 and yil % 100 != 0) or yil % 400 == 0)`,
  },
  {
    tur: "soru",
    soru: "`a = 7` iken `a > 5 and a % 2 == 0` ifadesinin sonucu nedir?",
    secenekler: ["True", "False", "7", "Hata verir"],
    dogru: 1,
    aciklama: "a > 5 → True, ama 7 % 2 == 0 → False (7 tek). **and** için ikisi de doğru olmalı: sonuç **False**.",
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k2-saniye",
      baslik: "🟡 Orta: Saniyeyi çevir",
      gorev: `\`toplam = 4000\` saniyeyi **saat, dakika ve saniyeye** çevirip şöyle yazdır:

\`\`\`
1 saat 6 dakika 40 saniye
\`\`\`

Sayıları kendin hesaplama; \`//\` ve \`%\` kullan.`,
      baslangicKodu: `toplam = 4000\n`,
      testler: [{ beklenen: "1 saat 6 dakika 40 saniye" }],
      kodKurallari: [
        { desen: "//", mesaj: "Tam bölme (`//`) kullanmalısın." },
        { desen: "%", mesaj: "Mod (`%`) kullanmalısın." },
      ],
      ipuclari: [
        "1 saat = 3600 saniye. saat = toplam // 3600",
        "Saatlerden artan saniye: kalan = toplam % 3600. Sonra dakika = kalan // 60, saniye = kalan % 60",
      ],
      cozum: `toplam = 4000
saat = toplam // 3600
kalan = toplam % 3600
dakika = kalan // 60
saniye = kalan % 60
print(saat, "saat", dakika, "dakika", saniye, "saniye")`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k2-basamak",
      baslik: "🔴 Zor: Sayıyı ters çevir",
      gorev: `\`sayi = 385\` olarak verilen üç basamaklı sayının basamaklarını bulup sayıyı **ters çevir** ve yazdır. Çıktı:

\`\`\`
583
\`\`\`

Sonucu bir **sayı** olarak hesapla (birler × 100 + onlar × 10 + yüzler).`,
      baslangicKodu: `sayi = 385\n`,
      testler: [{ beklenen: "583" }],
      kodKurallari: [{ desen: "583", mesaj: "583'ü kendin yazma; basamaklardan hesapla.", olmamali: true }],
      ipuclari: ["yuzler = sayi // 100, onlar = (sayi // 10) % 10, birler = sayi % 10", "ters = birler * 100 + onlar * 10 + yuzler"],
      cozum: `sayi = 385
yuzler = sayi // 100
onlar = (sayi // 10) % 10
birler = sayi % 10
ters = birler * 100 + onlar * 10 + yuzler
print(ters)`,
    },
  },
];

export default bloklar;
