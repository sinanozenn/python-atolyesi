import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "veri-turlerinin-kullanimi",
  sira: 5,
  baslik: "Farklı Veri Türlerinin Kullanımı",
  ozet: "Tam sayı, ondalıklı sayı, metin, boolean ve karakter verileriyle gerçek hayat problemleri.",
  simge: "🧮",
  sure: "2 × 40 dk",
  kitap: "3.3 Farklı Veri Türlerinin Programda Kullanımı · s. 93–100",
  hedefler: [
    "Bit, byte ve veri türlerinin hafızada kapladığı alanı açıklayabilmek",
    "Tam sayı (int), ondalıklı sayı (float), metin (str) ve boolean (bool) verileri kullanabilmek",
    "Gerçek hayat problemlerini farklı veri türleriyle programlayabilmek",
    "bool(), ord() ve chr() fonksiyonlarını tanımak",
  ],
  ogretmenNotu: `
- Veri türleri tablosu genel programlama dilleri içindir (byte, short, long, double, char…). Python'da bunların hepsine karşılık **4 temel tür** kullanılır: \`int\`, \`float\`, \`str\`, \`bool\`. Öğrencilerin kafası karışmaması için bunu vurgulayın.
- Python'da \`char\` türü yoktur; karakterin ASCII karşılığı \`ord()\`, sayının karakter karşılığı \`chr()\` ile bulunur.
`,
  bloklar: [
    {
      tur: "soru",
      soru: "**1 byte** kaç bitten oluşur?",
      secenekler: ["2", "4", "8", "16"],
      dogru: 2,
      aciklama: "8 tane bit (0 ya da 1) yan yana gelince 1 **byte** oluşur.",
    },
    {
      tur: "metin",
      icerik: `
## Bit ve byte

Bilgisayar **ikilik sayı sistemiyle** çalışır: bilginin varlığı **1**, yokluğu **0** ile gösterilir. Bu 1 ve 0'ların her birine **bit** (*binary digit*, ikili basamak) denir. **8 bit** yan yana gelince en temel hafıza birimi **byte** [*bayt*] oluşur.

Her veri türü hafızada farklı miktarda yer kaplar. Basit işler için küçük boyutlu türler seçmek programın daha az yer kaplamasını ve daha hızlı çalışmasını sağlar.

## Veri türleri tablosu

| Sayısal: Tam sayılar | Sayısal: Ondalıklı | Metinsel | Mantıksal |
|---|---|---|---|
| byte (1 byte) | float (4 byte) | char – karakter (1–2 byte) | boolean: true / false (1 byte) |
| short (2 byte) | double (8 byte) | string – karakter dizisi | |
| int (4 byte) | long double (12 byte) | | |
| long (8 byte) | | | |

### Python'da işler daha kolay

Python'da bu türlerin hepsi için **dört temel tür** kullanılır ve türü yazmana gerek yoktur:

| Python türü | Karşılığı | Örnek |
|---|---|---|
| \`int\` | Tam sayılar (byte, short, int, long) | \`sayi = 100000\` |
| \`float\` | Ondalıklı sayılar (float, double) | \`pi = 3.14\` |
| \`str\` | Metinler (char, string) | \`ders = "Programlama"\` |
| \`bool\` | Mantıksal (boolean) | \`dogru_mu = True\` |
`,
    },
    {
      tur: "soru",
      soru: "`x = 7.0` yazıldığında x değişkeninin türü nedir?",
      secenekler: ["int", "float", "str", "bool"],
      dogru: 1,
      aciklama: "Noktalı yazılan sayılar ondalıklı sayıdır: **float**. Değeri tam sayı gibi görünse bile `.0` olduğu için float'tır.",
    },
    {
      tur: "ornek",
      baslik: "Örnek: Üç veri türü bir arada",
      kod: `sayi_1 = 20
sayi_2 = 30
toplam = sayi_1 + sayi_2
kelime = "Merhaba"
esit_degil = (sayi_1 != sayi_2)
print(toplam)
print(kelime)
print(esit_degil)`,
    },
    {
      tur: "metin",
      icerik: `
## Ondalıklı sayılar (float)

Programlama dillerinin çoğunda **virgül** kod yazımında başka işler için kullanıldığından ondalıklı sayılarda **nokta** kullanılır: \`3.14\` ✅ \`3,14\` ❌

Python'da ondalıklı sayılar için ayrı tanımlama yapılmaz; veri ya da işlem sonucu ondalıklıysa Python bunu **otomatik** anlar. Bölme (\`/\`) işleminin sonucu her zaman ondalıklıdır.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: Dairenin alanı",
      kod: `pi = 3.14
r = 10
alan = pi * r * r
print(alan)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(9 / 3)",
      secenekler: ["3", "3.0", "\"3\"", "0"],
      dogru: 1,
      aciklama: "Bölme (`/`) işleminin sonucu her zaman **float**'tur. 9 / 3 = **3.0**.",
    },
    {
      tur: "ornek",
      baslik: "Örnek: Okul duvarını boyama",
      aciklama: "Okul duvarının uzun kenarı 5 m, kısa kenarı 2 m. Duvar 20 öğrenciye eşit paylaştırılıyor. Bir öğrencinin boyayacağı alan ne kadar?",
      kod: `uzun_kenar = 5
kisa_kenar = 2
alan = uzun_kenar * kisa_kenar
ort = alan / 20
print("Her öğrencinin boyama alanı:", ort, "m²")`,
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k5-silindir",
        baslik: "Uygulama: Silindirin hacmi",
        gorev: `Matematik ve bilişim teknolojileri öğretmenleri bir problem hazırladı. Silindirin hacmi **taban alanı × yükseklik** ile bulunur. Taban bir dairedir: **pi × r × r**.

- pi = **3**
- yarıçap r = **10** cm
- yükseklik h = **5** cm

Silindirin hacmini bulan ve aşağıdaki gibi yazdıran programı yaz:
\`\`\`
Silindirin hacmi: 1500
\`\`\``,
        baslangicKodu: `pi = 3
r = 10
h = 5
`,
        testler: [{ beklenen: "Silindirin hacmi: 1500" }],
        kodKurallari: [{ desen: "1500", olmamali: true, mesaj: "Sonucu kendin yazma; Python değişkenlerle hesaplasın." }],
        ipuclari: ["Önce bir değişken oluştur: `hacim = pi * r * r * h`", 'Sonra yazdır: `print("Silindirin hacmi:", hacim)`'],
        cozum: `pi = 3
r = 10
h = 5
hacim = pi * r * r * h
print("Silindirin hacmi:", hacim)`,
      },
    },
    {
      tur: "ornek",
      baslik: "Örnek: 10 günlük soru ortalaması",
      aciklama: "Üniversite sınavına hazırlanan bir öğrenci 10 günde çözdüğü soruların günlük ortalamasını buluyor. Girdiler kutusundaki sayıları değiştirip tekrar çalıştır.",
      kod: `turkce_sayi = int(input("Türkçe soru sayısını girin: "))
mat_sayi = int(input("Matematik soru sayısını girin: "))
fen_sayi = int(input("Fen Bilimleri soru sayısını girin: "))
sos_sayi = int(input("Sosyal Bilimler soru sayısını girin: "))
print("Türkçe ortalama soru sayınız:", turkce_sayi / 10)
print("Matematik ortalama soru sayınız:", mat_sayi / 10)
print("Fen Bilimleri ortalama soru sayınız:", fen_sayi / 10)
print("Sosyal Bilimler ortalama soru sayınız:", sos_sayi / 10)`,
      girdiler: ["120", "85", "60", "47"],
    },
    {
      tur: "ipucu",
      renk: "bilgi",
      icerik: "Dikkat: Girilen veriler **tam sayı (int)** olsa bile bölme işlemi (`/`) sonucu **ondalıklı sayı (float)** verir. Bu yüzden 120 / 10 = **12.0** olarak yazılır.",
    },
    {
      tur: "ornek",
      baslik: "Örnek: Harçlık planı",
      aciklama: "Haftalık harçlık 700 TL. Öğrenci %5'ini biriktirip %5'ini yardımlaşmaya ayırıyor, kalanı 7 güne eşit bölüyor.",
      kod: `harclik = 700
birikim = (harclik * 5) / 100
yardim = (harclik * 5) / 100
print(birikim)
print(yardim)
harclik = harclik - (birikim + yardim)
gunlukpara = harclik / 7
print("Harcayabileceği günlük para:", gunlukpara)`,
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k5-daire",
        baslik: "Dairenin alanı (kullanıcıdan)",
        gorev: `Dairenin alanı örneğini geliştirelim: Yarıçapı **kullanıcıdan** al (tam sayı olarak), pi = **3.14** olsun ve dairenin alanını şöyle yazdır (yarıçap 10 ise):

\`\`\`
Alan: 314.0
\`\`\``,
        baslangicKodu: `pi = 3.14
`,
        testler: [
          { girdiler: ["10"], beklenen: "Alan: 314.0" },
          { girdiler: ["2"], beklenen: "Alan: 12.56" },
        ],
        kodKurallari: [{ desen: "input", mesaj: "Yarıçapı kullanıcıdan `input()` ile almalısın." }],
        ipuclari: ["`r = int(input(\"Yarıçap: \"))`", "Alan = pi × r × r"],
        cozum: `pi = 3.14
r = int(input("Yarıçap: "))
alan = pi * r * r
print("Alan:", alan)`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k5-harclik",
        baslik: "Kendi harçlık planın",
        gorev: `Kullanıcıdan **haftalık harçlığını** al. Harçlığın **%10'unu** biriktir, kalanını **7 güne** eşit böl. Sonuçları şöyle yazdır (harçlık 700 ise):

\`\`\`
Birikim: 70.0
Günlük harcama: 90.0
\`\`\``,
        baslangicKodu: `harclik = int(input("Haftalık harçlığın: "))
`,
        testler: [
          { girdiler: ["700"], beklenen: "Birikim: 70.0\nGünlük harcama: 90.0" },
          { girdiler: ["350"], beklenen: "Birikim: 35.0\nGünlük harcama: 45.0" },
        ],
        ipuclari: [
          "Harçlık planı örneğindeki gibi yüzde hesabı: `birikim = (harclik * 10) / 100`",
          "Kalan para: `harclik - birikim`. Bunu 7'ye böl.",
        ],
        cozum: `harclik = int(input("Haftalık harçlığın: "))
birikim = (harclik * 10) / 100
gunluk = (harclik - birikim) / 7
print("Birikim:", birikim)
print("Günlük harcama:", gunluk)`,
      },
    },
    {
      tur: "metin",
      icerik: `
## Metin (string)

**String** [*sıtring*] karakter dizisi demektir. Harf, kelime, cümle, paragraf gibi metinler için kullanılır. Tırnak içinde yazılan her şey metindir; **sayı bile olsa** bilgisayar onu metin olarak görür ve sadece metin işlemleri yapar.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: Metin olarak sayı",
      kod: `ders_ad = "Programlamaya Giriş ve Algoritmalar"
no = "1"
toplam = no + no
print(ders_ad)
print(no)
print(toplam)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(\"5\" + \"5\" + \"5\")",
      secenekler: ["15", "555", "5 5 5", "Hata verir"],
      dogru: 1,
      aciklama: "Üç değer de tırnak içinde, yani **metin**. Metinler `+` ile yan yana eklenir: **555**.",
    },
    {
      tur: "metin",
      icerik: `
## Boolean (mantıksal)

**Boolean** yalnızca iki değer alabilir: **True** ve **False** (bazı dillerde 1 ve 0). Karar yapılarında ve mantıksal işlemlerde kullanılır.

\`bool()\` fonksiyonu bir verinin içinde **değer olup olmadığını** gösterir: İçinde veri olan değişkenler **True**, boş metin \`""\` ya da **0** ise **False** verir.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: bool()",
      kod: `deg_1 = "Merhaba"   # içinde metin var → True
deg_2 = 20          # içinde sayı var → True
deg_3 = ""          # boş metin → False
deg_4 = 0           # sıfır → False
print(bool(deg_1))
print(bool(deg_2))
print(bool(deg_3))
print(bool(deg_4))`,
    },
    {
      tur: "metin",
      icerik: `
## Karakter (char) ve ASCII

**Char** [*çar*] tek bir karakteri tutan türdür. Bilgisayarda her karakterin bir **sayısal karşılığı** vardır. Bu karşılıkları gösteren tabloya **ASCII** (Bilgi Değişimi için Amerikan Standart Kodu) denir. Örneğin \`A\` → 65, \`a\` → 97.

Python'da ayrı bir char türü yoktur. Karakterin sayısını \`ord()\`, sayının karakterini \`chr()\` ile bulursun:
`,
    },
    {
      tur: "ornek",
      baslik: "ASCII karşılıkları",
      kod: `print(ord("A"))
print(ord("a"))
print(chr(65))
print(chr(97))`,
    },
    {
      tur: "soru",
      soru: "`ord(\"A\")` sonucu 65 ise bu kodun çıktısı nedir?",
      kod: "print(chr(66))",
      secenekler: ["A", "B", "66", "b"],
      dogru: 1,
      aciklama: "ASCII tablosunda harfler sıralıdır: A → 65, **B → 66**, C → 67… `chr(66)` sayının karşılığı olan karakteri verir.",
    },
    {
      tur: "soru",
      soru: "Aşağıdakilerden hangisinin sonucu **False** olur?",
      secenekler: ['`bool("Python")`', "`bool(15)`", '`bool("")`', '`bool("0")`'],
      dogru: 2,
      aciklama: '`""` içinde hiç karakter olmayan **boş metindir**, bu yüzden False verir. Dikkat: `"0"` tırnak içinde olduğu için sıfır sayısı değil, içinde bir karakter olan bir **metindir**; sonucu True olur!',
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- Bilgisayar bilgiyi **bit** (0 ve 1) olarak tutar; 8 bit = 1 **byte**.
- En yaygın veri türleri: byte, integer, long, float, string, boolean, char. Python'da bunlar \`int\`, \`float\`, \`str\`, \`bool\` ile karşılanır.
- Ondalıklı sayılarda **nokta** kullanılır; bölme sonucu her zaman ondalıklıdır.
- Tırnak içindeki her şey metindir: \`"1" + "1"\` → \`"11"\``,
    },
  ],
};

export default ders;
