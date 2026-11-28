import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: metinlerle çalışmak

Metinler (string) **karakter dizileridir**: her harfin bir sıra numarası (indis) vardır ve numaralar **0'dan** başlar.

| P | y | t | h | o | n |
|---|---|---|---|---|---|
| 0 | 1 | 2 | 3 | 4 | 5 |

| Kod | Sonuç | Açıklama |
|---|---|---|
| \`k = "Python"\` | | |
| \`k[0]\` | \`P\` | İlk karakter |
| \`k[-1]\` | \`n\` | Son karakter |
| \`len(k)\` | \`6\` | Karakter sayısı |
| \`k.upper()\` | \`PYTHON\` | Hepsi büyük harf |
| \`k.lower()\` | \`python\` | Hepsi küçük harf |

**Yuvarlama:** \`round(3.14159, 2)\` → **3.14**, \`round(7.5)\` → **8**

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Harflere ulaşmak",
    aciklama: "Köşeli parantezle metnin istediğin karakterine ulaşabilirsin. -1 son karakter demektir.",
    kod: `kelime = "Programlama"
print(kelime[0])
print(kelime[3])
print(kelime[-1])
print(len(kelime), "harf")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Büyük ve küçük harf",
    aciklama: "upper() ve lower() metnin harflerini değiştirir. Türkçe i ve ı harflerinde dikkat: Python 'i'yi 'I' yapar.",
    kod: `sehir = "Ankara"
print(sehir.upper())
print(sehir.lower())`,
  },
  {
    tur: "soru",
    soru: "`k = \"Merhaba\"` iken `k[1]` nedir?",
    secenekler: ["M", "e", "r", "a"],
    dogru: 1,
    aciklama: "İndisler 0'dan başlar: k[0] = **M**, k[1] = **e**.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Ondalıklı hesap ve yuvarlama",
    aciklama: "Bir pizza 8 dilim, 3 kişi paylaşıyor. Bölme ondalıklı sonuç verir; round() ile 2 basamağa yuvarlıyoruz.",
    kod: `dilim = 8
kisi = 3
pay = dilim / kisi
print("Kişi başı:", pay)
print("Yuvarlanmış:", round(pay, 2))
print("Tam dilim:", dilim // kisi, "Artan:", dilim % kisi)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Boolean değerler",
    aciklama: "Karşılaştırma sonuçları bool türündedir ve değişkende saklanabilir.",
    kod: `not1 = 72
gecti = not1 >= 50
print("Geçti mi?", gecti)
print(type(gecti))
print("Tersi:", not gecti)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Baş harfler",
    aciklama: "Ad ve soyadın ilk harflerini alıp büyük harfe çeviriyoruz. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `ad = input("Adın: ")
soyad = input("Soyadın: ")
bas_harfler = ad[0].upper() + "." + soyad[0].upper() + "."
print("Baş harflerin:", bas_harfler)`,
    girdiler: ["mehmet", "yılmaz"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Harfin ASCII kodu",
    aciklama: "ord() bir karakterin sayı karşılığını, chr() ise sayının karakter karşılığını verir. Büyük ve küçük harf arasında 32 fark vardır.",
    kod: `harf = "A"
kod = ord(harf)
print(harf, "→", kod)
print(kod + 32, "→", chr(kod + 32))
print("Sonraki harf:", chr(kod + 1))`,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k5-ilk-son",
      baslik: "🟡 Orta: İlk ve son harf",
      gorev: `Kullanıcıdan bir kelime al. Kelimenin ilk harfini, son harfini ve harf sayısını yazdır. Kullanıcı **kalem** yazarsa:

\`\`\`
İlk harf: k
Son harf: m
Harf sayısı: 5
\`\`\``,
      baslangicKodu: `kelime = input("Bir kelime: ")\n`,
      testler: [
        { girdiler: ["kalem"], beklenen: "İlk harf: k\nSon harf: m\nHarf sayısı: 5" },
        { girdiler: ["bilgisayar"], beklenen: "İlk harf: b\nSon harf: r\nHarf sayısı: 10" },
      ],
      ipuclari: ["İlk harf: kelime[0], son harf: kelime[-1]", "Harf sayısı: len(kelime)"],
      cozum: `kelime = input("Bir kelime: ")
print("İlk harf:", kelime[0])
print("Son harf:", kelime[-1])
print("Harf sayısı:", len(kelime))`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k5-yakit",
      baslik: "🔴 Zor: Yakıt hesabı",
      gorev: `Bir araba 100 km'de **6.5 litre** yakıt harcıyor, yakıtın litresi **43.75 TL**. Kullanıcıdan gidilecek yolu (km, ondalıklı olabilir) al; harcanacak yakıtı ve tutarı **2 basamağa yuvarlayarak** yazdır. Kullanıcı 250 girerse:

\`\`\`
Yakıt: 16.25 litre
Tutar: 710.94 TL
\`\`\``,
      baslangicKodu: `yol = float(input("Yol (km): "))\n`,
      testler: [
        { girdiler: ["250"], beklenen: "Yakıt: 16.25 litre\nTutar: 710.94 TL" },
        { girdiler: ["80"], beklenen: "Yakıt: 5.2 litre\nTutar: 227.5 TL" },
      ],
      ipuclari: ["yakit = yol * 6.5 / 100", "tutar = yakit * 43.75, yazdırırken round(tutar, 2)"],
      cozum: `yol = float(input("Yol (km): "))
yakit = yol * 6.5 / 100
tutar = yakit * 43.75
print("Yakıt:", round(yakit, 2), "litre")
print("Tutar:", round(tutar, 2), "TL")`,
    },
  },
];

export default bloklar;
