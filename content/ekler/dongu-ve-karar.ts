import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: dört temel kalıp

Döngü ve kararla yazılan programların çoğu aşağıdaki dört kalıptan birine benzer. Bir problemle karşılaşınca önce “Bu hangi kalıp?” diye sor.

| Kalıp | Ne yapar? | İskelet |
|---|---|---|
| **Sayma** | Koşula uyan elemanları sayar | \`sayac = 0\` → döngüde \`if koşul: sayac += 1\` |
| **Toplama** | Koşula uyanları toplar | \`toplam = 0\` → döngüde \`if koşul: toplam += x\` |
| **Seçme (filtre)** | Koşula uyanları yeni listeye ekler | \`secilen = []\` → döngüde \`if koşul: secilen.append(x)\` |
| **En büyük / en küçük** | Şimdiye kadarki en iyiyi saklar | \`en = ilk eleman\` → döngüde \`if x > en: en = x\` |

Dikkat: Sayaç, toplam ve liste **döngüden önce** oluşturulur; sonuç **döngüden sonra** yazdırılır.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Sayma kalıbı",
    aciklama: "Listede 50 ve üzeri kaç not olduğunu sayıyoruz.",
    kod: `notlar = [45, 78, 90, 32, 66, 50, 49]
gecen = 0
for n in notlar:
    if n >= 50:
        gecen = gecen + 1
print(gecen, "öğrenci geçti.")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Toplama kalıbı",
    aciklama: "1–50 arasındaki 7'nin katlarını topluyoruz.",
    kod: `toplam = 0
for i in range(1, 51):
    if i % 7 == 0:
        toplam = toplam + i
print("7'nin katlarının toplamı:", toplam)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Seçme kalıbı",
    aciklama: "Uzun kelimeleri yeni bir listeye ayırıyoruz.",
    kod: `kelimeler = ["kedi", "bilgisayar", "su", "programlama", "elma", "klavye"]
uzunlar = []
for k in kelimeler:
    if len(k) > 5:
        uzunlar.append(k)
print("Uzun kelimeler:", uzunlar)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: FizzBuzz",
    aciklama: "Programcıların meşhur alıştırması. 3'e bölünenler Fizz, 5'e bölünenler Buzz, ikisine birden bölünenler FizzBuzz. 15 kontrolü neden en başta?",
    kod: `for i in range(1, 21):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
  },
  {
    tur: "soru",
    soru: "FizzBuzz örneğinde `i % 15 == 0` koşulu **en sona** (else'ten hemen önceye) taşınırsa 15 için ne yazılır?",
    secenekler: ["FizzBuzz", "Fizz", "Buzz", "15"],
    dogru: 1,
    aciklama: "15 % 3 == 0 doğru olduğu için zincirde ilk eşleşen **Fizz** olur; sonraki koşullara bakılmaz. En özel koşul en başta olmalıdır.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: En büyük ve yeri",
    aciklama: "En büyük elemanı ve kaçıncı sırada olduğunu buluyoruz. range(len(liste)) ile indisler üzerinde dönüyoruz.",
    kod: `satislar = [120, 340, 90, 410, 275]
en_buyuk = satislar[0]
yer = 0
for i in range(len(satislar)):
    if satislar[i] > en_buyuk:
        en_buyuk = satislar[i]
        yer = i
print("En çok satış:", en_buyuk, "TL,", str(yer + 1) + ". gün")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Asal sayı mı?",
    aciklama: "Bir sayı 1 ve kendisinden başka sayıya bölünmüyorsa asaldır. Bir bölen bulunca aramayı break ile bitiriyoruz.",
    kod: `sayi = int(input("Bir sayı: "))
asal = sayi > 1
for bolen in range(2, sayi):
    if sayi % bolen == 0:
        asal = False
        print(sayi, "sayısı", bolen, "ile bölünüyor.")
        break
if asal:
    print(sayi, "asal sayıdır.")
else:
    print(sayi, "asal değildir.")`,
    girdiler: ["91"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: 1–50 arası asal sayılar",
    aciklama: "İç içe döngü: dış döngü sayıları, iç döngü bölenleri dener.",
    kod: `asallar = []
for sayi in range(2, 51):
    asal = True
    for bolen in range(2, sayi):
        if sayi % bolen == 0:
            asal = False
            break
    if asal:
        asallar.append(sayi)
print(asallar)
print(len(asallar), "tane asal sayı var.")`,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k11-fizzbuzz",
      baslik: "🟡 Orta: FizzBuzz",
      gorev: `Kullanıcıdan bir n sayısı al ve 1'den n'ye kadar sayıları yazdır; ancak:

- 3'e ve 5'e birlikte bölünenler yerine **FizzBuzz**,
- Yalnızca 3'e bölünenler yerine **Fizz**,
- Yalnızca 5'e bölünenler yerine **Buzz** yaz.`,
      baslangicKodu: `n = int(input("n: "))\n`,
      testler: [
        { girdiler: ["5"], beklenen: "1\n2\nFizz\n4\nBuzz" },
        { girdiler: ["15"], beklenen: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
      ],
      ipuclari: ["for i in range(1, n + 1):", "İlk koşul: i % 3 == 0 and i % 5 == 0"],
      cozum: `n = int(input("n: "))
for i in range(1, n + 1):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k11-asal",
      baslik: "🔴 Zor: Asal sayıları say",
      gorev: `Kullanıcıdan bir n sayısı al; **2'den n'ye kadar** (n dahil) kaç tane asal sayı olduğunu yazdır. Kullanıcı 20 girerse:

\`\`\`
2 ile 20 arasında 8 asal sayı var.
\`\`\`

(2, 3, 5, 7, 11, 13, 17, 19)`,
      baslangicKodu: `n = int(input("n: "))\n`,
      testler: [
        { girdiler: ["20"], beklenen: "2 ile 20 arasında 8 asal sayı var." },
        { girdiler: ["10"], beklenen: "2 ile 10 arasında 4 asal sayı var." },
        { girdiler: ["100"], beklenen: "2 ile 100 arasında 25 asal sayı var." },
      ],
      ipuclari: [
        "Dış döngü: for sayi in range(2, n + 1). Her sayi için asal = True ile başla.",
        "İç döngü: for bolen in range(2, sayi): bölünüyorsa asal = False. Dış döngüde asal ise sayacı artır.",
        'Yazdırma: print("2 ile", n, "arasında", sayac, "asal sayı var.")',
      ],
      cozum: `n = int(input("n: "))
sayac = 0
for sayi in range(2, n + 1):
    asal = True
    for bolen in range(2, sayi):
        if sayi % bolen == 0:
            asal = False
            break
    if asal:
        sayac = sayac + 1
print("2 ile", n, "arasında", sayac, "asal sayı var.")`,
    },
  },
];

export default bloklar;
