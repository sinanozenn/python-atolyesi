import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: range() ve listeler üzerinde dönmek

\`range()\` üç farklı biçimde yazılabilir:

| Yazılış | Ürettiği sayılar | Açıklama |
|---|---|---|
| \`range(5)\` | 0, 1, 2, 3, 4 | 0'dan başlar, **5 dahil değil** |
| \`range(2, 7)\` | 2, 3, 4, 5, 6 | 2'den başlar, 7 dahil değil |
| \`range(1, 10, 2)\` | 1, 3, 5, 7, 9 | 2'şer 2'şer artar |
| \`range(10, 0, -1)\` | 10, 9, …, 1 | Geri sayar |

**for yalnızca sayılarla çalışmaz.** Bir listenin ya da metnin elemanları üzerinde de dönebilir:

\`\`\`python
for meyve in ["elma", "armut", "kiraz"]:
    print(meyve)
\`\`\`

Burada \`meyve\` değişkeni her turda listenin **sıradaki elemanı** olur.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Adım büyüklüğü",
    aciklama: "range'in üçüncü sayısı artış miktarıdır. 5'er 5'er sayıyoruz.",
    kod: `for i in range(0, 51, 5):
    print(i)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Liste üzerinde dönmek",
    aciklama: "for, listedeki her elemanı sırayla alır. İndis kullanmaya gerek yok.",
    kod: `dersler = ["Matematik", "Fizik", "Programlama", "Edebiyat"]
for ders in dersler:
    print("Bugün", ders, "dersi var.")`,
  },
  {
    tur: "soru",
    soru: "`range(3, 12, 3)` hangi sayıları üretir?",
    secenekler: ["3, 6, 9, 12", "3, 6, 9", "0, 3, 6, 9", "3, 4, 5, …, 11"],
    dogru: 1,
    aciklama: "3'ten başlar, 3'er artar ve 12'ye **ulaşmadan** durur: **3, 6, 9**.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Geri sayım",
    aciklama: "Adım -1 olunca range geriye sayar. Bitiş değeri yine dahil değildir.",
    kod: `for i in range(10, 0, -1):
    print(i)
print("Kalkış!")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Metnin harfleri",
    aciklama: "Bir metin de for ile harf harf gezilebilir. Sayaçla sesli harfleri sayıyoruz.",
    kod: `kelime = input("Bir kelime: ")
sesli = 0
for harf in kelime:
    if harf in "aeıioöuüAEIİOÖUÜ":
        sesli = sesli + 1
print(kelime, "kelimesinde", sesli, "sesli harf var.")`,
    girdiler: ["bilgisayar"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Kullanıcının girdiği sayıların toplamı",
    aciklama: "Döngü kaç kez döneceğini kullanıcıdan öğreniyor. Her turda bir sayı alınıp toplama ekleniyor. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `adet = int(input("Kaç sayı gireceksin? "))
toplam = 0
for i in range(adet):
    sayi = int(input(str(i + 1) + ". sayı: "))
    toplam = toplam + sayi
print("Toplam:", toplam)
print("Ortalama:", toplam / adet)`,
    girdiler: ["4", "10", "20", "30", "40"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Faktöriyel",
    aciklama: "Çarpım biriktirirken başlangıç değeri 1 olmalı. 5! = 1 × 2 × 3 × 4 × 5.",
    kod: `n = int(input("n: "))
sonuc = 1
for i in range(1, n + 1):
    sonuc = sonuc * i
    print(i, "! =", sonuc)`,
    girdiler: ["6"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: İç içe döngü ile çizim",
    aciklama: "Dıştaki döngü satırları, içteki döngü o satırdaki yıldızları üretir. end=\"\" print'in alt satıra geçmesini engeller.",
    kod: `boy = 5
for satir in range(1, boy + 1):
    for yildiz in range(satir):
        print("*", end="")
    print()`,
  },
  {
    tur: "soru",
    soru: "Aşağıdaki kod ekrana toplam kaç kez \"Merhaba\" yazar?",
    kod: `for i in range(3):
    for j in range(4):
        print("Merhaba")`,
    secenekler: ["3", "4", "7", "12"],
    dogru: 3,
    aciklama: "Dış döngü 3 kez döner; her turunda iç döngü 4 kez döner: 3 × 4 = **12**.",
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k9-kareler",
      baslik: "🟡 Orta: Kareler tablosu",
      gorev: `Kullanıcıdan bir n sayısı al ve 1'den n'ye kadar her sayının karesini yazdır. Kullanıcı 4 girerse:

\`\`\`
1 1
2 4
3 9
4 16
\`\`\``,
      baslangicKodu: `n = int(input("n: "))\n`,
      testler: [
        { girdiler: ["4"], beklenen: "1 1\n2 4\n3 9\n4 16" },
        { girdiler: ["6"], beklenen: "1 1\n2 4\n3 9\n4 16\n5 25\n6 36" },
      ],
      kodKurallari: [{ desen: "\\bfor\\b", mesaj: "Bu alıştırmada `for` döngüsü kullanmalısın." }],
      ipuclari: ["range(1, n + 1)", "print(i, i * i)"],
      cozum: `n = int(input("n: "))
for i in range(1, n + 1):
    print(i, i * i)`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k9-ucgen",
      baslik: "🔴 Zor: Sayı üçgeni",
      gorev: `Kullanıcıdan bir n sayısı al ve aşağıdaki gibi bir sayı üçgeni çiz. Kullanıcı 4 girerse:

\`\`\`
1
12
123
1234
\`\`\``,
      baslangicKodu: `n = int(input("n: "))\n`,
      testler: [
        { girdiler: ["4"], beklenen: "1\n12\n123\n1234" },
        { girdiler: ["6"], beklenen: "1\n12\n123\n1234\n12345\n123456" },
      ],
      ipuclari: [
        "İç içe iki for gerekir: dıştaki satır numarası, içteki o satırın sayıları.",
        'İçteki döngüde print(j, end="") kullan; satır bitince boş print() ile alt satıra geç.',
      ],
      cozum: `n = int(input("n: "))
for satir in range(1, n + 1):
    for j in range(1, satir + 1):
        print(j, end="")
    print()`,
    },
  },
];

export default bloklar;
