import type { Ders } from "../tipler";
import { ifElseAkis } from "../akis";

const ders: Ders = {
  slug: "if-else",
  sira: 7,
  baslik: "Karar Yapıları: if-else",
  ozet: "Programına karar verdir: şart doğruysa bir işi, yanlışsa başka bir işi yap.",
  simge: "🔀",
  sure: "2 × 40 dk",
  kitap: "3.4 Karar Yapıları · 3.4.1 If-else Yapısı · s. 102–105",
  hedefler: [
    "Karar yapılarının programın akışını nasıl dallandırdığını açıklayabilmek",
    "if-else yapısının akış diyagramını yorumlayabilmek",
    "Python'da girintinin (boşlukların) önemini kavramak",
    "if-else ile karar veren programlar yazabilmek",
  ],
  ogretmenNotu: `
- **Karar ağacı**: Program normalde bir ağacın gövdesi gibi düz ilerler; karar yapısıyla **dallanır**.
- **Akış diyagramını** sitede gösterin, sonra basketbolcu örneğinin kodunu diyagramla eşleştirin.
- Python girintiye duyarlıdır: hatalı girintili bir kodu bilerek çalıştırıp hata mesajını gösterin.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Hayat kararlarla dolu

Her gün kararlar veririz: *Hava yağışlıysa* yağmurluk giyer ya da şemsiye alırız; *değilse* normal kıyafetle çıkarız. Bir ürünü alırken fiyatları karşılaştırıp en uygun olanı seçeriz.

Programlarda da bir **şart (sorgu)** belirleyip cevabın **True** ya da **False** olmasına göre farklı işler yaptırabiliriz. Bunu sağlayan yapılara **karar yapıları** (seçimli yapılar) denir.

Normalde bir program satır satır, sırayla ilerler; tıpkı bir **ağacın gövdesi** gibi. Karar yapısı kullanıldığında program **dallanır**: şarta göre farklı yollardan birine gider.

## if-else yapısı

- **if** [*if*, eğer] → Şart **doğruysa (True)** bu bloktaki işlemler yapılır.
- **else** [*els*, değilse] → Şart **yanlışsa (False)** bu bloktaki işlemler yapılır.
`,
    },
    { tur: "gorsel", svg: ifElseAkis, altyazi: "If-else yapısının akış diyagramı" },
    {
      tur: "metin",
      icerik: `
### Python'da yazılışı

Birçok dilde bloklar **yay ayraçlarla** \`{ }\` gösterilir. **Python girintiye duyarlı** bir dildir: bloklar **girinti** (satır başındaki 4 boşluk) ile gösterilir.

**Diğer dillerin çoğunda:**
\`\`\`
if (sorgu) {
    1. İşlem
} else {
    2. İşlem
}
3. İşlem
\`\`\`

**Python'da:**
\`\`\`python
if sorgu:
    1. İşlem
else:
    2. İşlem
3. İşlem
\`\`\`

Dikkat etmen gereken **iki kural**:
1. \`if\` ve \`else\` satırlarının sonuna **iki nokta \`:\`** konur.
2. if/else bloğundaki satırlar **içeriden (4 boşluk)** başlar. Girintisiz satır, bloğun dışındadır.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: Basketbolcunun performansı",
      aciklama: "İki zaman diliminde atılan basket sayılarının ortalaması 60 veya üzerindeyse performans çok iyi; değilse çalışmak gerekiyor. Girdileri değiştirip iki durumu da dene!",
      kod: `basket_1 = int(input("Birinci sürede attığınız basket sayısını giriniz: "))
basket_2 = int(input("İkinci sürede attığınız basket sayısını giriniz: "))
ort = (basket_1 + basket_2) / 2
print(ort)
if ort >= 60:
    print("Performansınız çok iyi.")
else:
    print("Performansınız için çalışmalısınız!")`,
      girdiler: ["70", "60"],
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "sayi = -3\nif sayi > 0:\n    print(\"Pozitif\")\nelse:\n    print(\"Pozitif değil\")",
      secenekler: ["Pozitif", "Pozitif değil", "Hiçbir şey", "Hata verir"],
      dogru: 1,
      aciklama: "-3 > 0 şartı **False** olduğu için if bloğu atlanır ve **else** bloğu çalışır.",
    },
    {
      tur: "ornek",
      baslik: "Örnek: Sayı tahmin oyunu",
      kod: `tahmin_edilecek_sayi = 11
kullanici_tahmin = int(input("Aklımdan tuttuğum sayıyı tahmin et! "))

if tahmin_edilecek_sayi == kullanici_tahmin:
    print("Aferin! Doğru bildin...")
else:
    print("Ne yazık ki tahmin edemedin, tuttuğum sayı:", tahmin_edilecek_sayi)`,
      girdiler: ["7"],
    },
    {
      tur: "soru",
      soru: "Bu kodda hata hangi satırda?",
      kod: "yas = 20\nif yas >= 18\n    print(\"Reşit\")",
      secenekler: ["1. satır", "2. satır", "3. satır", "Hata yok"],
      dogru: 1,
      aciklama: "if satırının sonunda **iki nokta (:)** eksik. Doğrusu: `if yas >= 18:`",
    },
    {
      tur: "ipucu",
      renk: "uyari",
      baslik: "Girintiyi dene",
      icerik: "Yukarıdaki örneklerden birinde `print` satırının başındaki boşlukları sil ve çalıştır. Python **IndentationError** (girinti hatası) verecek. Python hangi satırın `if`'e ait olduğunu **girintiye bakarak** anlar.",
    },
    {
      tur: "soru",
      soru: "`puan = 40` iken bu kodun çıktısı ne olur?",
      kod: `if puan >= 50:
    print("Geçti")
    print("Tebrikler")
print("Bitti")`,
      secenekler: ["Geçti, Tebrikler, Bitti", "Sadece Bitti", "Tebrikler, Bitti", "Hiçbir şey"],
      dogru: 1,
      aciklama: "40 ≥ 50 **yanlış** olduğu için if bloğundaki **girintili iki satır** atlanır. `print(\"Bitti\")` girintisiz olduğundan if'e ait değildir ve her durumda çalışır.",
    },
    {
      tur: "metin",
      icerik: `
## Metinlerle karar vermek

Şartlarda yalnızca sayıları değil **metinleri** de karşılaştırabiliriz. Örneğin kullanıcının “E” (evet) ya da “H” (hayır) cevabını kontrol etmek için \`cevap == "E"\` yazılır. Birden fazla şart için önceki derste öğrendiğimiz **and / or** kullanılır.
`,
    },
    {
      tur: "ornek",
      baslik: "Evet mi, hayır mı?",
      kod: `cevap = input("Ödevini yaptın mı? (E/H): ")
if cevap == "E":
    print("Harika, dışarı çıkabilirsin!")
else:
    print("Önce ödevini bitirmelisin.")`,
      girdiler: ["E"],
    },
    {
      tur: "soru",
      soru: "Kullanıcı **e** (küçük harf) yazarsa çıktı ne olur?",
      kod: "cevap = input(\"Devam? (E/H): \")\nif cevap == \"E\":\n    print(\"Kabul edildi\")\nelse:\n    print(\"Reddedildi\")",
      secenekler: ["Kabul edildi", "Reddedildi", "Hata verir", "Hiçbir şey"],
      dogru: 1,
      aciklama: "Python büyük/küçük harfe duyarlıdır: `\"e\" == \"E\"` → **False**. Bu yüzden else bloğu çalışır.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "a = 5\nb = 10\nif a > 3 and b < 5:\n    print(\"X\")\nelse:\n    print(\"Y\")",
      secenekler: ["X", "Y", "X ve Y", "Hiçbir şey"],
      dogru: 1,
      aciklama: "`a > 3` → True ama `b < 5` → False. `and` için **ikisinin de** doğru olması gerekir: True and False → False. else çalışır: **Y**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k7-staj",
        baslik: "Uygulama: Staj başvurusu",
        gorev: `Bir şirket stajyer öğrencileri ön görüşmeye çağıracak. Şartlar: öğrencinin **en az bir programlama dili bilmesi** ve **İngilizce bilmesi**.

Programın sırasıyla şu iki soruyu sorsun (cevaplar **E** ya da **H**):
1. Programlama dili biliyor musunuz?
2. İngilizce biliyor musunuz?

İki cevap da **E** ise:
\`\`\`
Ön görüşme kriterlerine uygunsunuz.
\`\`\`
değilse:
\`\`\`
Ön görüşme kriterlerine uygun değilsiniz.
\`\`\``,
        baslangicKodu: `programlama = input("Programlama dili biliyor musunuz? (E/H): ")
ingilizce = input("İngilizce biliyor musunuz? (E/H): ")
`,
        testler: [
          { girdiler: ["E", "E"], beklenen: "Ön görüşme kriterlerine uygunsunuz." },
          { girdiler: ["E", "H"], beklenen: "Ön görüşme kriterlerine uygun değilsiniz." },
          { girdiler: ["H", "E"], beklenen: "Ön görüşme kriterlerine uygun değilsiniz." },
          { girdiler: ["H", "H"], beklenen: "Ön görüşme kriterlerine uygun değilsiniz." },
        ],
        kodKurallari: [{ desen: "\\bif\\b", mesaj: "Bu alıştırmada `if` kullanmalısın." }],
        ipuclari: ["İki şartın **ikisi birden** sağlanmalı: `and` kullan.", '`if programlama == "E" and ingilizce == "E":`'],
        cozum: `programlama = input("Programlama dili biliyor musunuz? (E/H): ")
ingilizce = input("İngilizce biliyor musunuz? (E/H): ")
if programlama == "E" and ingilizce == "E":
    print("Ön görüşme kriterlerine uygunsunuz.")
else:
    print("Ön görüşme kriterlerine uygun değilsiniz.")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k7-bolunebilir",
        baslik: "3'e bölünebilir mi?",
        gorev: `Kullanıcıdan bir sayı alan program, sayı 3'e bölünebiliyorsa \`Sayı 3'e bölünebilir\`, bölünemiyorsa \`Sayı 3'e bölünemez!\` yazmalı.

Aşağıdaki kodda **boşluklar (...)** ve **bir hata** var. Boşlukları doldur ve hatayı düzelt.`,
        baslangicKodu: `sayi = ...(...("Sayı girin: "))
if ... % 3 == 1:
    print("...")
else:
    print("...!")
`,
        testler: [
          { girdiler: ["9"], beklenen: "Sayı 3'e bölünebilir" },
          { girdiler: ["10"], beklenen: "Sayı 3'e bölünemez!" },
          { girdiler: ["11"], beklenen: "Sayı 3'e bölünemez!" },
        ],
        ipuclari: [
          "İlk satır: kullanıcıdan alınan metni tam sayıya çevir → `int(input(...))`",
          "Bir sayı 3'e bölünebiliyorsa kalan kaçtır? `== 1` doğru mu?",
          "Kalan 2 olan sayılar da (11 gibi) bölünemez. Şartı `% 3 == 0` olarak yazmak her durumu çözer.",
        ],
        cozum: `sayi = int(input("Sayı girin: "))
if sayi % 3 == 0:
    print("Sayı 3'e bölünebilir")
else:
    print("Sayı 3'e bölünemez!")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k7-tek-cift",
        baslik: "Tek mi, çift mi?",
        gorev: "Kullanıcıdan bir tam sayı al. Sayı çiftse `Çift`, tekse `Tek` yazdır.",
        baslangicKodu: `sayi = int(input("Bir sayı gir: "))\n`,
        testler: [
          { girdiler: ["4"], beklenen: "Çift" },
          { girdiler: ["7"], beklenen: "Tek" },
          { girdiler: ["0"], beklenen: "Çift" },
        ],
        kodKurallari: [{ desen: "\\bif\\b", mesaj: "Bu alıştırmayı `if` kullanarak çözmelisin." }],
        ipuclari: ["Çift sayılar 2'ye bölündüğünde kalan 0'dır: `sayi % 2 == 0`"],
        cozum: `sayi = int(input("Bir sayı gir: "))
if sayi % 2 == 0:
    print("Çift")
else:
    print("Tek")`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **Karar yapıları**, farklı durumlarda programın akışına yön verir; program **dallanır**.
- Karşılaştırma ve mantıksal operatörlerle **sorgular** oluşturulur; cevap True ya da False'tur.
- **if-else:** Cevap True ise if bloğu, False ise else bloğu çalışır.
- Python girintiye duyarlıdır: \`:\` işaretinden sonra gelen blok **içeriden** yazılır.`,
    },
  ],
};

export default ders;
