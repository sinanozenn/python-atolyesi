import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: if-else yazım kuralları

\`\`\`python
if koşul:
    koşul doğruysa yapılacaklar
else:
    koşul yanlışsa yapılacaklar
devam eden kod
\`\`\`

1. \`if\` ve \`else\` satırları **iki nokta üst üste (:)** ile biter.
2. Bloğun içindeki satırlar **4 boşluk içeriden** (girintili) yazılır. Girinti, satırın hangi bloğa ait olduğunu gösterir.
3. Bir blokta **birden fazla satır** olabilir; hepsi aynı girintide olmalıdır.
4. \`else\` zorunlu değildir. Sadece koşul doğruyken bir şey yapılacaksa \`else\` yazılmaz.
5. Girintisiz satırlar if-else bittikten sonra **her durumda** çalışır.

**Koşulda kullanılabilecekler:** karşılaştırmalar (\`>\`, \`<\`, \`==\`, \`!=\`, \`>=\`, \`<=\`), mantıksal operatörler (\`and\`, \`or\`, \`not\`) ve \`in\`.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Sadece if",
    aciklama: "else olmadan da if kullanılabilir. Sıcaklık 30'dan büyük değilse ilk print atlanır; son print her durumda çalışır.",
    kod: `sicaklik = int(input("Sıcaklık: "))
if sicaklik > 30:
    print("Çok sıcak, bol su iç!")
print("İyi günler.")`,
    girdiler: ["34"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Şifre kontrolü",
    aciklama: "Metinler == ile karşılaştırılır. Büyük-küçük harf farkı önemlidir.",
    kod: `sifre = input("Şifre: ")
if sifre == "python123":
    print("Giriş başarılı.")
else:
    print("Şifre yanlış!")`,
    girdiler: ["python123"],
  },
  {
    tur: "soru",
    soru: "Aşağıdaki kodun çıktısı kaç satırdır?",
    kod: `x = 5
if x > 10:
    print("A")
    print("B")
print("C")`,
    secenekler: ["0", "1", "2", "3"],
    dogru: 1,
    aciklama: "5 > 10 yanlış; girintili iki satır (A ve B) atlanır. Girintisiz \"C\" her durumda yazılır: **1 satır**.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Blokta birden fazla satır",
    aciklama: "Kargo ücreti: 300 TL ve üzeri alışverişte kargo bedava, altında 40 TL. Her blokta iki satır var. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `tutar = float(input("Sepet tutarı: "))
if tutar >= 300:
    kargo = 0
    print("Kargo bedava!")
else:
    kargo = 40
    print(300 - tutar, "TL daha alışveriş yaparsan kargo bedava.")
print("Ödenecek:", tutar + kargo, "TL")`,
    girdiler: ["250"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: and ile iki koşul",
    aciklama: "Bir sayının 10 ile 20 arasında olup olmadığını kontrol ediyoruz. İki koşul da doğru olmalı.",
    kod: `sayi = int(input("Bir sayı: "))
if sayi >= 10 and sayi <= 20:
    print(sayi, "10 ile 20 arasında.")
else:
    print(sayi, "aralığın dışında.")`,
    girdiler: ["15"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Mutlak değer",
    aciklama: "Bir sayının mutlak değeri, sıfıra olan uzaklığıdır. Negatifse -1 ile çarpıyoruz. (Python'da hazır abs() komutu da vardır.)",
    kod: `x = int(input("Bir sayı: "))
if x < 0:
    x = -x
print("Mutlak değer:", x)`,
    girdiler: ["-17"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Üçgen olur mu?",
    aciklama: "Üç kenarın üçgen oluşturması için her kenar diğer ikisinin toplamından küçük olmalı. Üç koşul and ile birleşiyor.",
    kod: `a = int(input("1. kenar: "))
b = int(input("2. kenar: "))
c = int(input("3. kenar: "))
if a < b + c and b < a + c and c < a + b:
    print("Bu kenarlarla üçgen çizilebilir.")
else:
    print("Bu kenarlarla üçgen çizilemez.")`,
    girdiler: ["3", "4", "8"],
  },
  {
    tur: "soru",
    soru: "Üçgen örneğine **5, 5, 5** girilirse ne yazılır?",
    secenekler: ["Üçgen çizilebilir", "Üçgen çizilemez", "Hata verir", "Hiçbir şey yazmaz"],
    dogru: 0,
    aciklama: "5 < 10, 5 < 10, 5 < 10: üç koşul da doğru. Kenarları eşit olan bu üçgene **eşkenar üçgen** denir.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Unutulan iki nokta",
    aciklama: "if satırının sonundaki : unutulmuş. Ekleyip tekrar çalıştır.",
    kod: `x = 5
if x > 3
    print("Büyük")`,
    hataBekleniyor: true,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Girinti yok",
    aciklama: "if'ten sonraki satır içeriden başlamalı.",
    kod: `x = 5
if x > 3:
print("Büyük")`,
    hataBekleniyor: true,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k7-kargo",
      baslik: "🟡 Orta: İndirim kuponu",
      gorev: `Kullanıcıdan sepet tutarını (tam sayı) al. Tutar **500 TL veya üzeriyse** %10 indirim uygula, değilse indirim yok. Ödenecek tutarı yazdır. Kullanıcı 600 girerse:

\`\`\`
Ödenecek: 540.0 TL
\`\`\`

400 girerse:
\`\`\`
Ödenecek: 400 TL
\`\`\``,
      baslangicKodu: `tutar = int(input("Sepet tutarı: "))\n`,
      testler: [
        { girdiler: ["600"], beklenen: "Ödenecek: 540.0 TL" },
        { girdiler: ["400"], beklenen: "Ödenecek: 400 TL" },
        { girdiler: ["500"], beklenen: "Ödenecek: 450.0 TL" },
      ],
      kodKurallari: [{ desen: "\\bif\\b", mesaj: "Bu alıştırmada `if` kullanmalısın." }],
      ipuclari: ["Koşul: tutar >= 500", "İndirimli tutar: tutar - tutar * 10 / 100"],
      cozum: `tutar = int(input("Sepet tutarı: "))
if tutar >= 500:
    tutar = tutar - tutar * 10 / 100
print("Ödenecek:", tutar, "TL")`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k7-artik-yil",
      baslik: "🔴 Zor: Artık yıl",
      gorev: `Kullanıcıdan bir yıl al. Yıl **artık yıl** ise "Artık yıl", değilse "Artık yıl değil" yazdır.

Kural: Bir yıl **4'e bölünüyor ve 100'e bölünmüyorsa** ya da **400'e bölünüyorsa** artık yıldır. (2024 → artık yıl, 1900 → değil, 2000 → artık yıl)`,
      baslangicKodu: `yil = int(input("Yıl: "))\n`,
      testler: [
        { girdiler: ["2024"], beklenen: "Artık yıl" },
        { girdiler: ["1900"], beklenen: "Artık yıl değil" },
        { girdiler: ["2000"], beklenen: "Artık yıl" },
        { girdiler: ["2023"], beklenen: "Artık yıl değil" },
      ],
      ipuclari: ["Bölünebilme: yil % 4 == 0", "(yil % 4 == 0 and yil % 100 != 0) or yil % 400 == 0"],
      cozum: `yil = int(input("Yıl: "))
if (yil % 4 == 0 and yil % 100 != 0) or yil % 400 == 0:
    print("Artık yıl")
else:
    print("Artık yıl değil")`,
    },
  },
];

export default bloklar;
