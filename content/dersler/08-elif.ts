import type { Ders } from "../tipler";
import { elifAkis } from "../akis";

const ders: Ders = {
  slug: "elif",
  sira: 8,
  baslik: "Karar Yapıları: elif (Else If)",
  ozet: "İkiden fazla seçenek olduğunda çoklu karar ver; iç içe karar yapıları kur.",
  simge: "🚦",
  sure: "2 × 40 dk",
  kitap: "3.4.2 Else If Yapısı · s. 105–109 (1. Etkinlik dâhil)",
  hedefler: [
    "elif ile birden fazla şartı sırayla kontrol edebilmek",
    "Şartların sırasının sonucu nasıl etkilediğini açıklayabilmek",
    "Sınır değerlerini (dâhil/hariç) doğru yazabilmek",
    "İç içe karar yapılarıyla program tasarlayabilmek",
  ],
  ogretmenNotu: `
- Python'da “else if” yerine kısaltması **elif** kullanılır (Kitap, Tablo 3.7).
- **Sıra önemli** sorusunu sınıfta tartışın: Python *ilk doğru* şartı çalıştırır, gerisine bakmaz.
- **4. Uygulama (zam)**: “1 ve 5 dâhil” gibi sınır ifadelerini \`<=\` ile nasıl yazacaklarını konuşun.
- **1. Etkinlik (üniversite başvurusu)** 40 dakikalık bir etkinlik. Sitede “Mini proje” olarak var; kitaptaki değerlendirme sorularını (karar yapılarını kullanırken nelere dikkat ettiniz?) sonunda sorun.
- Ünite sonu **7. soru** (hesap makinesi) da bu derste.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## İkiden fazla seçenek varsa?

if-else yapısı iki seçenek sunar: ya o ya bu. Peki bir sayının **pozitif, negatif ya da sıfır** olduğunu bulmak istersek? Üç seçenek var!

Bunun için **else if** yapısı kullanılır. Python'da bunun kısaltması olan **elif** [*elif*] yazılır:

1. \`if\` ile ilk şart sorulur. Doğruysa (True) 1. işlem yapılır.
2. Yanlışsa \`elif\` ile **yeni bir şart** sorulur. Doğruysa 2. işlem yapılır.
3. Hiçbiri doğru değilse \`else\` bloğu çalışır.

İstediğin kadar \`elif\` ekleyebilirsin. Buna **çoklu seçim yapısı** denir.
`,
    },
    { tur: "gorsel", svg: elifAkis, altyazi: "Else if yapısının akış diyagramı (Kitap, Görsel 3.9)" },
    {
      tur: "metin",
      icerik: `
**Python'da yazılışı (Kitap, Tablo 3.7):**
\`\`\`python
if sorgu1:
    1. İşlem
elif sorgu2:
    2. İşlem
else:
    3. İşlem
4. İşlem
\`\`\`
`,
    },
    {
      tur: "soru",
      soru: "Bir if-elif-else yapısında **en fazla kaç blok** çalışır?",
      secenekler: ["Hepsi", "Sadece bir tanesi", "İki tanesi", "Hiçbiri çalışmaz"],
      dogru: 1,
      aciklama: "Python yukarıdan aşağı bakar ve **ilk doğru** şartın bloğunu çalıştırır; gerisini atlar. Hiçbiri doğru değilse yalnızca else çalışır. Yani her zaman **en fazla bir** blok çalışır.",
    },
    {
      tur: "ornek",
      baslik: "Kitap 16. Örnek: Pozitif, negatif ya da sıfır",
      kod: `sayi = int(input("Bir Sayı Giriniz: "))
if sayi > 0:
    print("Pozitif Sayıdır.")
elif sayi < 0:
    print("Negatif Sayıdır.")
else:
    print("Sayı Sıfırdır.")`,
      girdiler: ["-4"],
    },
    {
      tur: "ornek",
      baslik: "Karne notu",
      kod: `puan = int(input("Sınav puanın? "))

if puan >= 85:
    print("Pekiyi (5)")
elif puan >= 70:
    print("İyi (4)")
elif puan >= 60:
    print("Orta (3)")
elif puan >= 50:
    print("Geçer (2)")
else:
    print("Geçmez (1)")`,
      girdiler: ["78"],
    },
    {
      tur: "soru",
      soru: "Bu kodda şartların sırası değiştirilmiş. Çıktı ne olur?",
      kod: `puan = 90
if puan >= 50:
    print("Geçer")
elif puan >= 85:
    print("Pekiyi")`,
      secenekler: ["Pekiyi", "Geçer", "Önce Geçer, sonra Pekiyi", "Hiçbir şey yazmaz"],
      dogru: 1,
      aciklama: "Python **ilk doğru şartı** çalıştırır ve gerisini **atlar**. 90 ≥ 50 doğru olduğu için “Geçer” yazılır; `elif`'e hiç bakılmaz. Bu yüzden şartların **sırası** önemlidir.",
    },
    {
      tur: "soru",
      soru: "`puan = 65` iken çıktı nedir?",
      kod: "if puan >= 85:\n    print(\"Pekiyi\")\nelif puan >= 70:\n    print(\"İyi\")\nelif puan >= 60:\n    print(\"Orta\")\nelse:\n    print(\"Geçer\")",
      secenekler: ["Pekiyi", "İyi", "Orta", "Geçer"],
      dogru: 2,
      aciklama: "65 ≥ 85 yanlış, 65 ≥ 70 yanlış, 65 ≥ 60 **doğru** → “Orta” yazılır ve geri kalan şartlara bakılmaz.",
    },
    {
      tur: "soru",
      soru: "`s = 0` iken çıktı nedir?",
      kod: "if s < 0:\n    print(\"Buz\")\nelif s == 0:\n    print(\"Donma noktası\")\nelse:\n    print(\"Su\")",
      secenekler: ["Buz", "Donma noktası", "Su", "Buz ve Su"],
      dogru: 1,
      aciklama: "0 < 0 **yanlış** (0, 0'dan küçük değil). 0 == 0 **doğru** → “Donma noktası”.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k8-hesap",
        baslik: "Ünite sonu 7. soru: Hesap makinesi",
        gorev: `Kullanıcıdan iki sayı ve bir işlem (\`-\` ya da \`+\`) alan program, işleme göre çıkarma ya da toplama sonucunu yazmalı. Başka bir sembol girilirse \`Tanımlı işlem giriniz!\` yazmalı.

Kodda **boşluklar (...)** var. Doldur ve çalıştır. Örnek: 8, 3 ve \`-\` girilirse çıktı \`5\` olmalı.`,
        baslangicKodu: `sayi_1 = ...(...("1. sayıyı girin: "))
sayi_2 = ...(...("2. sayıyı girin: "))
islem = ...("Yapmak istediğiniz işlemi seçin (-, +): ")
if ... == "...":
    print(... - ...)
elif ... == "...":
    print(... + ...)
else:
    print("...")
`,
        testler: [
          { girdiler: ["8", "3", "-"], beklenen: "5" },
          { girdiler: ["8", "3", "+"], beklenen: "11" },
          { girdiler: ["8", "3", "*"], beklenen: "Tanımlı işlem giriniz!" },
        ],
        ipuclari: [
          "Sayılar için `int(input(...))`, işlem sembolü metin olduğu için sadece `input(...)` yeterli.",
          'Şart: `if islem == "-":`',
        ],
        cozum: `sayi_1 = int(input("1. sayıyı girin: "))
sayi_2 = int(input("2. sayıyı girin: "))
islem = input("Yapmak istediğiniz işlemi seçin (-, +): ")
if islem == "-":
    print(sayi_1 - sayi_2)
elif islem == "+":
    print(sayi_1 + sayi_2)
else:
    print("Tanımlı işlem giriniz!")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k8-zam",
        baslik: "Kitap 4. Uygulama: Maaş zammı",
        gorev: `Bir işveren, personeline çalıştıkları süreye göre zam yapacak:

| Çalışma süresi | Zam oranı |
|---|---|
| 1–5 yıl (1 ve 5 dâhil) | %5 |
| 6–10 yıl (6 ve 10 dâhil) | %10 |
| 11 yıl ve üzeri | %15 |

Kullanıcıdan önce **çalışma süresini**, sonra **maaşı** al. Zam miktarını ve zamlı maaşı yazdır. Süre 3, maaş 20000 ise:
\`\`\`
Zam miktarı: 1000.0
Zamlı maaş: 21000.0
\`\`\``,
        baslangicKodu: `sure = int(input("Çalışma süreniz (yıl): "))
maas = int(input("Maaşınız: "))
`,
        testler: [
          { girdiler: ["3", "20000"], beklenen: "Zam miktarı: 1000.0\nZamlı maaş: 21000.0" },
          { girdiler: ["5", "20000"], beklenen: "Zam miktarı: 1000.0\nZamlı maaş: 21000.0" },
          { girdiler: ["6", "20000"], beklenen: "Zam miktarı: 2000.0\nZamlı maaş: 22000.0" },
          { girdiler: ["10", "30000"], beklenen: "Zam miktarı: 3000.0\nZamlı maaş: 33000.0" },
          { girdiler: ["12", "30000"], beklenen: "Zam miktarı: 4500.0\nZamlı maaş: 34500.0" },
        ],
        kodKurallari: [{ desen: "\\belif\\b", mesaj: "Bu alıştırmada `elif` kullanmalısın." }],
        ipuclari: [
          "Önce süreye göre `oran` değişkenine 5, 10 ya da 15 ata.",
          "Zam miktarı: `zam = maas * oran / 100`",
          "Zamlı maaş: `maas + zam`. İki satırı da `print` ile yazdır.",
        ],
        cozum: `sure = int(input("Çalışma süreniz (yıl): "))
maas = int(input("Maaşınız: "))
if sure <= 5:
    oran = 5
elif sure <= 10:
    oran = 10
else:
    oran = 15
zam = maas * oran / 100
print("Zam miktarı:", zam)
print("Zamlı maaş:", maas + zam)`,
      },
    },
    {
      tur: "metin",
      icerik: `
## İç içe karar yapıları

Bir if bloğunun **içine** başka bir if yazabiliriz. İçteki if, sadece dıştaki şart doğruysa sorulur. İçteki bloğun satırları **bir kat daha** içeriden (8 boşluk) yazılır.
`,
    },
    {
      tur: "ornek",
      baslik: "İç içe if",
      kod: `yas = int(input("Yaşın: "))
if yas >= 18:
    ehliyet = input("Ehliyetin var mı? (E/H): ")
    if ehliyet == "E":
        print("Araba kullanabilirsin.")
    else:
        print("Önce ehliyet almalısın.")
else:
    print("Araba kullanmak için yaşın küçük.")`,
      girdiler: ["19", "H"],
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "a = 10\nif a > 5:\n    if a > 20:\n        print(\"Büyük\")\n    else:\n        print(\"Orta\")\nelse:\n    print(\"Küçük\")",
      secenekler: ["Büyük", "Orta", "Küçük", "Orta ve Küçük"],
      dogru: 1,
      aciklama: "Dış şart: 10 > 5 **doğru** → içeri girilir. İç şart: 10 > 20 **yanlış** → içteki else çalışır: **Orta**. Dıştaki else'e hiç bakılmaz.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k8-universite",
        baslik: "Mini proje (Kitap 1. Etkinlik): Üniversite başvurusu",
        gorev: `Bir öğrenci özel yetenek sınavı yapan bir üniversiteye başvuruyor.

**Başvuru şartları** (üçü birden sağlanmalı):
- Lise diploma puanı **en az 60**
- TYT puanı **150 veya daha fazla**
- Yabancı dil sınavı puanı **en az 60**

Program bu üç puanı sırayla sorsun.
- Şartlar sağlanmıyorsa: \`Başvuru kriterleriniz uygun değildir.\`
- Sağlanıyorsa: \`Başvurunuz kabul edilmiştir.\` yazsın ve **yetenek sınavı puanını** sorsun:
  - **70 ve üzeri** ise: \`Üniversiteye kayıt yaptırmak için hak kazandınız.\`
  - değilse: \`Üniversiteye kayıt yaptıramazsınız.\``,
        baslangicKodu: `diploma = int(input("Diploma puanınız: "))
tyt = int(input("TYT puanınız: "))
dil = int(input("Yabancı dil puanınız: "))
`,
        testler: [
          { girdiler: ["70", "160", "65", "80"], beklenen: "Başvurunuz kabul edilmiştir.\nÜniversiteye kayıt yaptırmak için hak kazandınız." },
          { girdiler: ["70", "160", "65", "60"], beklenen: "Başvurunuz kabul edilmiştir.\nÜniversiteye kayıt yaptıramazsınız." },
          { girdiler: ["60", "150", "60", "70"], beklenen: "Başvurunuz kabul edilmiştir.\nÜniversiteye kayıt yaptırmak için hak kazandınız." },
          { girdiler: ["55", "200", "90"], beklenen: "Başvuru kriterleriniz uygun değildir." },
          { girdiler: ["80", "140", "90"], beklenen: "Başvuru kriterleriniz uygun değildir." },
        ],
        ipuclari: [
          "Üç şartı `and` ile birleştir: `if diploma >= 60 and tyt >= 150 and dil >= 60:`",
          "Yetenek puanını **sadece** başvuru kabul edildiğinde sor: `input` satırı if bloğunun içinde olmalı.",
          "İçteki if-else bloğu bir kat daha içeriden (8 boşluk) yazılır.",
        ],
        cozum: `diploma = int(input("Diploma puanınız: "))
tyt = int(input("TYT puanınız: "))
dil = int(input("Yabancı dil puanınız: "))
if diploma >= 60 and tyt >= 150 and dil >= 60:
    print("Başvurunuz kabul edilmiştir.")
    yetenek = int(input("Yetenek sınavı puanınız: "))
    if yetenek >= 70:
        print("Üniversiteye kayıt yaptırmak için hak kazandınız.")
    else:
        print("Üniversiteye kayıt yaptıramazsınız.")
else:
    print("Başvuru kriterleriniz uygun değildir.")`,
      },
    },
    {
      tur: "ipucu",
      renk: "bilgi",
      baslik: "Etkinlik değerlendirmesi",
      icerik: "1. Karar yapılarını kullanırken nelere dikkat ettiniz?\n2. Karar yapılarını kullanmanın avantajları nelerdir?\n\nCevaplarını arkadaşlarınla paylaş.",
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **Else if (elif)** yapısı çoklu seçim sağlar: if ile başlayan sorgudan sonra elif ile yeni sorgular eklenir.
- Python şartları **yukarıdan aşağıya** kontrol eder ve **ilk doğru** olanı çalıştırır.
- Sınır değerlerinde \`<\` ile \`<=\` farkına dikkat edilmelidir.
- Bir karar yapısının içine başka bir karar yapısı yazılabilir (iç içe karar yapısı).`,
    },
  ],
};

export default ders;
