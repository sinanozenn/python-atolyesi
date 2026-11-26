import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "unite-degerlendirme",
  sira: 12,
  baslik: "Ünite Değerlendirme",
  ozet: "Ünitede öğrendiklerini ölçme ve değerlendirme sorularıyla test et.",
  simge: "🏆",
  sure: "40 dk",
  kitap: "3. Ünite Ölçme ve Değerlendirme Soruları · s. 118–121",
  hedefler: [
    "Operatörler, değişkenler ve veri türleri konularını tekrar etmek",
    "Diziler, karar ve döngü yapılarıyla ilgili soruları çözebilmek",
    "Öğrendiklerini yeni bir problemde kullanabilmek",
  ],
  ogretmenNotu: `
- Kitaptaki 10 sorunun yerleri:
  - **1, 2, 4, 5** → bu sayfada
  - **3** → 5. ders (Değişkenler)
  - **6** → 9. ders (if-else)
  - **7** → 10. ders (elif)
  - **8** → 11. ders (for)
  - **9** → 12. ders (while)
  - **10** → 13. ders (döngü ve karar)
- ⚠️ **2. soruyla ilgili not:** Kitaptaki \`a=5,b=10\` yazımı Python'da **hata verir** (SyntaxError). Sitede doğru yazım \`a = 5\` ve \`b = 10\` olarak iki satırda verildi; doğru cevap değişmez: **Ayşe 55.0**.
- Bu sayfadaki ek sorular ünitenin tamamını kapsar. Ders sonunda bir **mini sınav** olarak kullanılabilir.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Haydi kendini dene! 🎯

Bu sayfada ders kitabındaki **3. Ünite Ölçme ve Değerlendirme Soruları** ile ünitenin tamamını kapsayan ek sorular var. Önce düşün, sonra cevapla. Yanlış yaparsan sorun değil; açıklamayı oku ve ilgili derse geri dön.

> Kitaptaki 3, 6, 7, 8, 9 ve 10. sorular ilgili derslerde **alıştırma** olarak yer alıyor. Onları da tamamladıysan ünitenin tüm sorularını çözmüşsün demektir!

## Kitaptaki sorular
`,
    },
    {
      tur: "soru",
      soru: "**Soru 1.** Aşağıdaki operatör ve işlem eşleşmelerinden hangisi **yanlış** verilmiştir?",
      secenekler: ["x → Çarpma işlemi", "+ → Toplama işlemi", "** → Üs alma işlemi", "- → Çıkarma işlemi", "% → Mod alma işlemi"],
      dogru: 0,
      aciklama: "Programlamada çarpma işlemi `x` ile değil `*` ile yapılır. `x` bir değişken adı olabileceğinden karışıklık yaratır.",
    },
    {
      tur: "soru",
      soru: "**Soru 2.** Bir öğretmen işlem önceliği konusunu ölçmek için aşağıdaki kodu paylaştı. Ekran çıktısı nedir?",
      kod: `ad = "Ayşe"
ad_1 = "Mehmet"
a = 5
b = 10
c = (a + b * (b / a + 3))
print(ad, c)`,
      secenekler: ["Ayşe 18.75", "Ayşe 55.0", "Mehmet 25.0", "Mehmet 25.50", "Mehmet 55.0"],
      dogru: 1,
      aciklama: "Önce en içteki parantez: b / a = 10 / 5 = **2.0**, + 3 = **5.0**. Sonra çarpma: 10 × 5.0 = **50.0**. Sonra toplama: 5 + 50.0 = **55.0**. Yazdırılan değişken `ad` olduğu için çıktı **Ayşe 55.0** olur.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k12-kareler",
        baslik: "Soru 4: Karelerin toplamı",
        gorev: `Kullanıcıdan **iki sayı** alan, bu sayıların **karelerini** bulup toplayan ve sonucu yazdıran programı yaz. 3 ve 4 girilirse:

\`\`\`
Karelerin toplamı: 25
\`\`\``,
        baslangicKodu: ``,
        testler: [
          { girdiler: ["3", "4"], beklenen: "Karelerin toplamı: 25" },
          { girdiler: ["5", "12"], beklenen: "Karelerin toplamı: 169" },
        ],
        ipuclari: ["İki sayıyı `int(input(...))` ile al.", "Kare için `**` operatörü: `sayi_1 ** 2`"],
        cozum: `sayi_1 = int(input("1. sayı: "))
sayi_2 = int(input("2. sayı: "))
toplam = sayi_1 ** 2 + sayi_2 ** 2
print("Karelerin toplamı:", toplam)`,
      },
    },
    {
      tur: "soru",
      soru: "**Soru 5.** Kodun çıktısının `['programlamaya', 'giriş', 've', 'algoritmalar']` olması için `print( ... )` içine ne yazılmalıdır?",
      kod: `ders = ["programlamaya", "giriş", "ve", "algoritmalar"]
programlama_dili = [ders, "python"]
print( ... )`,
      secenekler: ["ders", "ders[1]", "ders[2]", "programlama_dili", "programlama_dili[1]"],
      dogru: 0,
      aciklama: "Dizinin tamamını yazdırmak için adını yazmak yeterli: `print(ders)`. `ders[1]` → 'giriş', `programlama_dili[1]` → 'python' yazar.",
    },
    {
      tur: "metin",
      icerik: `
## Ek sorular: Ünitenin tamamı
`,
    },
    {
      tur: "soru",
      soru: "`print(type(3.14))` komutunun çıktısında hangi veri türü yazar?",
      secenekler: ["int", "float", "str", "bool"],
      dogru: 1,
      aciklama: "3.14 ondalıklı bir sayıdır; Python'da ondalıklı sayıların türü **float**'tur.",
    },
    {
      tur: "soru",
      soru: "Kullanıcı Girdiler kutusuna **8** yazdı. Çıktı ne olur?",
      kod: `sayi = input("Sayı: ")
print(sayi * 3)`,
      secenekler: ["24", "888", "8 8 8", "Hata verir"],
      dogru: 1,
      aciklama: "`input()` her zaman **metin** verir: `\"8\"`. Metin × 3 = metni 3 kez yan yana yazmak: **888**. Sayı olarak çarpmak için `int(input())` gerekirdi.",
    },
    {
      tur: "soru",
      soru: "Aşağıdaki değişken isimlerinden hangisi Python'da **kullanılamaz**?",
      secenekler: ["ogrenci_sayisi", "sinif2", "2sinif", "_toplam"],
      dogru: 2,
      aciklama: "Değişken isimleri **sayı ile başlayamaz**. `2sinif` hata verir; `sinif2` ise doğrudur.",
    },
    {
      tur: "soru",
      soru: "`a = 10` ve `b = 3` iken `print(a % b == 1 and a > b)` çıktısı nedir?",
      secenekler: ["True", "False", "1", "Hata verir"],
      dogru: 0,
      aciklama: "10 % 3 = 1 → `1 == 1` **True**. 10 > 3 → **True**. True and True → **True**.",
    },
    {
      tur: "soru",
      soru: "`meyveler = [\"elma\", \"armut\", \"kiraz\"]` dizisi için `print(meyveler[3])` ne yapar?",
      secenekler: ["kiraz yazar", "armut yazar", "Hata verir", "3 yazar"],
      dogru: 2,
      aciklama: "3 elemanlı dizinin indisleri 0, 1, 2'dir. **3 numaralı indis yoktur**, bu yüzden IndexError hatası verir. Son elemana `meyveler[2]` ile ulaşılır.",
    },
    {
      tur: "soru",
      soru: "`sicaklik = 25` iken çıktı ne olur?",
      kod: `if sicaklik > 30:
    print("Çok sıcak")
elif sicaklik > 20:
    print("Ilık")
elif sicaklik > 10:
    print("Serin")
else:
    print("Soğuk")`,
      secenekler: ["Çok sıcak", "Ilık", "Ilık ve Serin", "Soğuk"],
      dogru: 1,
      aciklama: "25 > 30 yanlış. 25 > 20 **doğru** → “Ilık” yazılır ve geri kalan şartlara bakılmaz (25 > 10 da doğru olsa bile).",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: `toplam = 0
for i in range(1, 5):
    toplam = toplam + i
print(toplam)`,
      secenekler: ["15", "10", "4", "1 2 3 4"],
      dogru: 1,
      aciklama: "range(1, 5) → 1, 2, 3, 4 (5 dâhil değil). 1 + 2 + 3 + 4 = **10**. `print` döngünün dışında olduğu için sadece bir kez, en sonda yazar.",
    },
    {
      tur: "soru",
      soru: "Aşağıdaki while döngüsü için hangisi **doğrudur**?",
      kod: `i = 1
while i < 5:
    print(i)`,
      secenekler: ["1 2 3 4 yazar", "1 2 3 4 5 yazar", "Hiçbir şey yazmaz", "Sonsuz döngüye girer"],
      dogru: 3,
      aciklama: "Döngünün içinde `i` hiç artırılmıyor. i hep 1 kalır, `i < 5` hep doğru olur ve döngü **asla bitmez**. Çözüm: döngüye `i = i + 1` eklemek.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "x = [2, 4, 6]\nprint(x[0] + x[2])",
      secenekler: ["6", "8", "10", "246"],
      dogru: 1,
      aciklama: "`x[0]` → 2, `x[2]` → 6 (indisler 0'dan başlar). 2 + 6 = **8**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k12-final",
        baslik: "Final görevi: Sınıf not ortalaması",
        gorev: `Ünitede öğrendiğin her şeyi kullanacağın son görev! 🎓

Kullanıcıdan önce **öğrenci sayısını**, sonra her öğrencinin **notunu** al. Notları bir **diziye** ekle. Sonra şunları yazdır:

1. Not listesi
2. Sınıf ortalaması
3. Ortalama **50 ve üzeri** ise \`Sınıf başarılı\`, değilse \`Sınıf başarısız\`

3 öğrenci için notlar 70, 40, 85 ise:
\`\`\`
Notlar: [70, 40, 85]
Ortalama: 65.0
Sınıf başarılı
\`\`\``,
        baslangicKodu: `notlar = []
sayi = int(input("Öğrenci sayısı: "))
`,
        testler: [
          { girdiler: ["3", "70", "40", "85"], beklenen: "Notlar: [70, 40, 85]\nOrtalama: 65.0\nSınıf başarılı" },
          { girdiler: ["2", "30", "50"], beklenen: "Notlar: [30, 50]\nOrtalama: 40.0\nSınıf başarısız" },
          { girdiler: ["4", "50", "50", "50", "50"], beklenen: "Notlar: [50, 50, 50, 50]\nOrtalama: 50.0\nSınıf başarılı" },
        ],
        kodKurallari: [
          { desen: "\\b(for|while)\\b", mesaj: "Notları almak için döngü kullanmalısın." },
          { desen: "append", mesaj: "Notları diziye `append()` ile eklemelisin." },
          { desen: "\\bif\\b", mesaj: "Başarı durumu için karar yapısı (if) kullanmalısın." },
        ],
        ipuclari: [
          "`for i in range(sayi):` içinde notu al ve `notlar.append(...)`",
          "Toplamı döngü içinde biriktirebilirsin ya da `sum(notlar)` kullanabilirsin.",
          "Ortalama = toplam / sayi. Sonra `if ortalama >= 50:`",
        ],
        cozum: `notlar = []
sayi = int(input("Öğrenci sayısı: "))
toplam = 0
for i in range(sayi):
    puan = int(input("Not: "))
    notlar.append(puan)
    toplam = toplam + puan
ortalama = toplam / sayi
print("Notlar:", notlar)
print("Ortalama:", ortalama)
if ortalama >= 50:
    print("Sınıf başarılı")
else:
    print("Sınıf başarısız")`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Tebrikler! 🎉",
      icerik: `Bu üniteyi tamamladıysan artık şunları biliyorsun:

- Python ile ekrana yazdırma, kullanıcıdan veri alma
- Aritmetiksel, karşılaştırma ve mantıksal **operatörler**
- **Değişkenler**, **veri türleri** ve tür dönüştürme
- **Diziler** (listeler) ve indisler
- **Karar yapıları:** if, elif, else
- **Döngü yapıları:** for, while, sayaç, break, continue

Bunlar **tüm programlama dillerinin** temelidir. Yeni şeyler denemek için menüdeki **IDE**'yi kullanmayı unutma!`,
    },
  ],
};

export default ders;
