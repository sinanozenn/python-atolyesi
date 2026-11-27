import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Kolaydan zora karma problemler

Bu bölümdeki problemler bütün derslerin konularını bir arada kullanır. Kolaydan başla; takılırsan ipuçlarına bak, ilgili derse dönüp örnekleri yeniden incele.

**Bir problemi çözerken:**
1. Girdi, işlem ve çıktıyı belirle.
2. Gerekirse kısa bir algoritma ya da akış şeması çiz.
3. Kodu küçük parçalar hâlinde yaz ve her parçadan sonra çalıştır.
4. Farklı girdilerle, özellikle **sınır değerleriyle** (0, negatif sayı, eşitlik) test et.
`,
  },
  {
    tur: "soru",
    soru: "🟢 Aşağıdaki kodun çıktısı nedir?",
    kod: `a = 7
b = 2
print(a // b, a % b, a / b)`,
    secenekler: ["3 1 3.5", "3.5 1 3", "3 1 3", "4 1 3.5"],
    dogru: 0,
    aciklama: "7 // 2 = **3** (tam bölüm), 7 % 2 = **1** (kalan), 7 / 2 = **3.5**.",
  },
  {
    tur: "soru",
    soru: "🟡 Aşağıdaki kodun çıktısı nedir?",
    kod: `liste = [4, 8, 15, 16, 23, 42]
toplam = 0
for x in liste:
    if x % 2 == 1:
        toplam = toplam + x
print(toplam)`,
    secenekler: ["108", "38", "70", "15"],
    dogru: 1,
    aciklama: "Tek sayılar: 15 ve 23. Toplamları **38**.",
  },
  {
    tur: "soru",
    soru: "🔴 Aşağıdaki kod ekrana ne yazar?",
    kod: `i = 0
s = ""
while i < 5:
    if i % 2 == 0:
        s = s + "A"
    else:
        s = s + "B"
    i = i + 1
print(s)`,
    secenekler: ["ABABA", "BABAB", "AAABB", "ABAB"],
    dogru: 0,
    aciklama: "i = 0, 1, 2, 3, 4 için: çift → A, tek → B. Sonuç **ABABA**.",
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k12-us",
      baslik: "🟢 Kolay: Kuvvet tablosu",
      gorev: `Kullanıcıdan bir taban sayısı al ve o sayının 0'dan 5'e kadar kuvvetlerini yazdır. Kullanıcı 2 girerse:

\`\`\`
2 ** 0 = 1
2 ** 1 = 2
2 ** 2 = 4
2 ** 3 = 8
2 ** 4 = 16
2 ** 5 = 32
\`\`\``,
      baslangicKodu: `taban = int(input("Taban: "))\n`,
      testler: [
        { girdiler: ["2"], beklenen: "2 ** 0 = 1\n2 ** 1 = 2\n2 ** 2 = 4\n2 ** 3 = 8\n2 ** 4 = 16\n2 ** 5 = 32" },
        { girdiler: ["3"], beklenen: "3 ** 0 = 1\n3 ** 1 = 3\n3 ** 2 = 9\n3 ** 3 = 27\n3 ** 4 = 81\n3 ** 5 = 243" },
      ],
      ipuclari: ["for us in range(6):", 'print(taban, "**", us, "=", taban ** us)'],
      cozum: `taban = int(input("Taban: "))
for us in range(6):
    print(taban, "**", us, "=", taban ** us)`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k12-harf-notu",
      baslik: "🟡 Orta: Sınıfın harf notları",
      gorev: `\`notlar = [92, 67, 45, 78, 85, 30, 59]\` listesindeki her not için harf notunu belirle ve sonunda kaç **AA** ve kaç **FF** olduğunu yazdır:

- 85 ve üzeri: AA
- 70–84: BB
- 50–69: CC
- 50'nin altı: FF

Çıktı:
\`\`\`
92 AA
67 CC
45 FF
78 BB
85 AA
30 FF
59 CC
AA sayısı: 2
FF sayısı: 2
\`\`\``,
      baslangicKodu: `notlar = [92, 67, 45, 78, 85, 30, 59]\n`,
      testler: [{ beklenen: "92 AA\n67 CC\n45 FF\n78 BB\n85 AA\n30 FF\n59 CC\nAA sayısı: 2\nFF sayısı: 2" }],
      kodKurallari: [
        { desen: "\\bfor\\b", mesaj: "Listeyi `for` ile dolaş." },
        { desen: "\\belif\\b", mesaj: "Harf notları için `elif` kullan." },
      ],
      ipuclari: ["Döngüden önce aa = 0 ve ff = 0 sayaçlarını oluştur.", "Her not için harf değişkenini if-elif ile belirle, print(n, harf) yaz; AA ve FF ise ilgili sayacı artır."],
      cozum: `notlar = [92, 67, 45, 78, 85, 30, 59]
aa = 0
ff = 0
for n in notlar:
    if n >= 85:
        harf = "AA"
        aa = aa + 1
    elif n >= 70:
        harf = "BB"
    elif n >= 50:
        harf = "CC"
    else:
        harf = "FF"
        ff = ff + 1
    print(n, harf)
print("AA sayısı:", aa)
print("FF sayısı:", ff)`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k12-tahmin-oyunu",
      baslik: "🔴 Zor: Tahmin oyunu (sınırlı hak)",
      gorev: `Gizli sayı **37**. Kullanıcının **en fazla 5 hakkı** var. Her tahminde:

- Doğruysa **Bildin! N. denemede buldun.** yaz ve oyunu bitir.
- Küçükse **Daha büyük**, büyükse **Daha küçük** yaz.

5 hakkın hepsi biterse **Hakkın bitti. Sayı 37 idi.** yaz.`,
      baslangicKodu: `gizli = 37\n`,
      testler: [
        { girdiler: ["50", "25", "37"], beklenen: "Daha küçük\nDaha büyük\nBildin! 3. denemede buldun." },
        { girdiler: ["37"], beklenen: "Bildin! 1. denemede buldun." },
        { girdiler: ["10", "20", "30", "40", "35"], beklenen: "Daha büyük\nDaha büyük\nDaha büyük\nDaha küçük\nDaha büyük\nHakkın bitti. Sayı 37 idi." },
      ],
      ipuclari: [
        "deneme = 0 ile başla; while deneme < 5: döngüsünde tahmini al ve denemeyi 1 artır.",
        "Bildiğinde bildi = True yapıp break ile çık. Döngüden sonra bildi değilse hakkın bittiğini yaz.",
        'Bildin mesajı: print("Bildin!", str(deneme) + ". denemede buldun.")',
      ],
      cozum: `gizli = 37
deneme = 0
bildi = False
while deneme < 5:
    tahmin = int(input("Tahmin: "))
    deneme = deneme + 1
    if tahmin == gizli:
        print("Bildin!", str(deneme) + ". denemede buldun.")
        bildi = True
        break
    elif tahmin < gizli:
        print("Daha büyük")
    else:
        print("Daha küçük")
if not bildi:
    print("Hakkın bitti. Sayı 37 idi.")`,
    },
  },
];

export default bloklar;
