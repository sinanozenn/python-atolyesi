import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "yazilim-program-kod",
  sira: 1,
  baslik: "Yazılım, Program ve Kod",
  ozet: "Yazılım nedir, program nasıl yazılır? İlk Python komutun: print().",
  simge: "👋",
  sure: "40 dk",
  kitap: "3.1 Programlamada Kullanılan İşlem ve Semboller (giriş) · s. 84–85",
  hedefler: [
    "Donanım, yazılım, program ve kod kavramlarını ayırt edebilmek",
    "Bu sitedeki kod editörünü kullanabilmek",
    "print() komutuyla ekrana yazı ve sayı yazdırabilmek",
    "# ile açıklama satırı yazabilmek",
    "Hata mesajlarından korkmamak 🙂",
  ],
  ogretmenNotu: `
- **Yazılım → Program → Kod** iç içe kutularını tahtaya çizin.
- İlk örneği projeksiyonda birlikte çalıştırın; sonra her öğrencinin kendi adını yazdırmasını isteyin.
- \`print("5 + 5")\` ile \`print(5 + 5)\` farkını önce **tahmin ettirin**, sonra çalıştırın.
- Bilerek hata yaptırın (tırnağı silin): hata mesajının bir **yardımcı** olduğunu gösterin.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Bilgisayar neden oluşur?

Bilgisayar iki temel parçadan oluşur ve bu parçalar birbirini tamamlar:

- **Donanım:** Bilgisayarın *dokunabildiğimiz, görebildiğimiz* fiziksel parçalarıdır. Klavye, fare, ekran, işlemci…
- **Yazılım:** Donanımın çalışmasını ve bilgisayarın bir amaç için kullanılmasını sağlayan, **kodlarla yazılmış programlardır**. Oyunlar, web tarayıcısı, hesap makinesi…

Yazılım, program ve kod iç içe geçmiş kavramlardır:

| Kavram | Anlamı |
|---|---|
| **Yazılım** | Programların ve onlarla ilgili her şeyin bütünü |
| **Program** | Belli bir işi yapan talimatlar listesi |
| **Kod** | Programı oluşturan, bir programlama dilinde yazılmış satırlar |

İyi bir program **doğru, güvenilir, kullanışlı, masrafsız ve basit** olmalıdır.
`,
    },
    {
      tur: "soru",
      soru: "Aşağıdakilerden hangisi bir **yazılımdır**?",
      secenekler: ["Klavye", "Ekran kartı", "Web tarayıcısı", "Fare"],
      dogru: 2,
      aciklama: "Klavye, ekran kartı ve fare elle tutulabilen **donanım** parçalarıdır. Web tarayıcısı ise kodlarla yazılmış bir **programdır**, yani yazılımdır.",
    },
    {
      tur: "soru",
      soru: "İyi bir programda aşağıdakilerden hangisi **olmamalıdır**?",
      secenekler: ["Doğru çalışması", "Güvenilir olması", "Gereksiz yere karmaşık olması", "Kullanışlı olması"],
      dogru: 2,
      aciklama: "Kitaba göre programlar **doğru, güvenilir, kullanışlı, masrafsız ve basit** olacak şekilde tasarlanır. Karmaşıklık iyi bir program özelliği değildir.",
    },
    {
      tur: "metin",
      icerik: `
## Programlama dili ve Python

Önceki iki derste problemleri algoritma ve akış şemasıyla **planlamayı** öğrendik. Bu planı bilgisayara anlatmak için **programlama dili** kullanırız. Yüzlerce programlama dili vardır. Aralarında küçük farklar olsa da hepsinde **operatörler, değişkenler, karar ve döngü yapıları** gibi ortak kavramlar bulunur. Bu derslerde bu ortak kavramları öğreneceğiz.

Biz **Python** [*paytın*] dilini kullanacağız. Python okunması kolay bir dildir ve dünyada en çok öğretilen dillerden biridir.

> **Bu site nasıl kullanılır?** Aşağıdaki gri kutular gerçek birer kod editörüdür.
> - **▶ Çalıştır** düğmesi kodu çalıştırır ve sonucunu **Çıktı** bölümünde gösterir.
> - Kodu istediğin gibi **değiştirebilirsin**. Bozarsan **↺ Sıfırla** düğmesi kodu eski haline getirir.
> - Alıştırmalarda **✔ Kontrol Et** düğmesi kodunun doğru olup olmadığını söyler.

## İlk programın: \`print()\`

\`print()\` [*pirint*, yazdır] komutu, parantez içindeki veriyi **ekrana yazdırır**. Hemen dene: **▶ Çalıştır** düğmesine bas, sonra tırnak içindeki yazıyı değiştirip tekrar çalıştır!
`,
    },
    {
      tur: "ornek",
      baslik: "İlk program",
      kod: `print("Merhaba Dünya!")`,
    },
    {
      tur: "metin",
      icerik: `
### print() kuralları

- Yazılar (metinler) **tırnak içinde** yazılır: \`"Merhaba"\` ya da \`'Merhaba'\`
- Her \`print()\` yeni bir satıra yazar.
- **Virgülle** ayırarak birden fazla şeyi yan yana yazdırabilirsin. Python araya kendisi boşluk koyar.
- Sayılar **tırnaksız** yazılır. Tırnaksız yazılan işlemleri Python **hesaplar**.
`,
    },
    {
      tur: "ornek",
      baslik: "Birden fazla satır, metin ve sayı",
      kod: `print("Programlamaya Giriş ve Algoritma")
print("Sınıfım:", "Hazırlık", "A")
print("5 + 5")
print(5 + 5)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(\"Merhaba\", \"Dünya\")",
      secenekler: ["MerhabaDünya", "Merhaba Dünya", "Merhaba, Dünya", "Hata verir"],
      dogru: 1,
      aciklama: "`print()` içinde virgülle ayrılan değerler yan yana yazılır ve Python araya **bir boşluk** koyar. Virgülün kendisi ekrana yazılmaz.",
    },
    {
      tur: "soru",
      soru: "Aşağıdaki kodun çıktısı ne olur?",
      kod: `print("3 * 4")`,
      secenekler: ["12", "3 * 4", '"3 * 4"', "Hata verir"],
      dogru: 1,
      aciklama: "Tırnak içindeki her şey **metindir**. Python onu hesaplamaz, olduğu gibi yazar. Tırnak işaretlerinin kendisi ekrana yazılmaz.",
    },
    {
      tur: "ipucu",
      renk: "bilgi",
      baslik: "Açıklama satırı: #",
      icerik: `Python'da \`#\` [*diyez*] işaretinden sonra yazılanlar **çalıştırılmaz**. Bunlara **açıklama satırı** denir. Kodu okuyan insanlara not bırakmak için kullanılır. (Başka dillerde bunun için \`//\` ya da \`/* ... */\` kullanılır.)

\`\`\`python
# Bu satır bir açıklamadır, çalışmaz
print("Bu satır çalışır")   # satır sonuna da açıklama yazılabilir
\`\`\``,
    },
    {
      tur: "soru",
      soru: "Bu kod ekrana ne yazar?",
      kod: "# print(\"A\")\nprint(\"B\")   # print(\"C\")",
      secenekler: ["A, B ve C", "Sadece B", "B ve C", "Hiçbir şey"],
      dogru: 1,
      aciklama: "1. satır tamamen açıklamadır, çalışmaz. 2. satırda `#` işaretinden **sonraki** kısım açıklamadır; sadece `print(\"B\")` çalışır.",
    },
    {
      tur: "metin",
      icerik: `
## Hatalar senin arkadaşın

Programcılar her gün hata yapar. Önemli olan hata mesajını **okuyup** düzeltmektir. Bu sitede hatalar **Türkçe** açıklanır ve hatanın **hangi satırda** olduğu gösterilir.

Aşağıdaki kodu çalıştır, hata mesajını oku ve sonra düzelt:
`,
    },
    {
      tur: "ornek",
      baslik: "Hatayı bul",
      kod: `print("Merhaba)
print("Nasılsın?")`,
      hataBekleniyor: true,
    },
    {
      tur: "soru",
      soru: "Aşağıdakilerden hangisi **doğru** yazılmıştır?",
      secenekler: ["`print(Merhaba)`", "`Print(\"Merhaba\")`", "`print(\"Merhaba\")`", "`print \"Merhaba\"`"],
      dogru: 2,
      aciklama: "Metin tırnak içinde olmalı, komut parantezle kullanılmalı ve **küçük harfle** yazılmalı. Python büyük/küçük harfe duyarlıdır: `Print` diye bir komut yoktur.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k1-unite",
        baslik: "Üç satır yazdır",
        gorev: `Ekrana **tam olarak** şu üç satırı yazdıran bir program yaz:

\`\`\`
Python Atölyesi
Hazırlık Sınıfı
Programlamanın Temel Kavramları
\`\`\``,
        baslangicKodu: `# Kodunu bu satırın altına yaz\n`,
        testler: [{ beklenen: "Python Atölyesi\nHazırlık Sınıfı\nProgramlamanın Temel Kavramları" }],
        ipuclari: ["Her satır için ayrı bir `print()` kullan.", "Büyük/küçük harfler ve noktalama işaretleri de karşılaştırılır. Dikkatli yaz!"],
        cozum: `print("Python Atölyesi")
print("Hazırlık Sınıfı")
print("Programlamanın Temel Kavramları")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k1-hata",
        baslik: "Hataları düzelt",
        gorev: `Bu kodda **iki hata** var. Kodu düzelt; çıktı şöyle olmalı:

\`\`\`
Merhaba
Python öğreniyorum
\`\`\``,
        baslangicKodu: `print("Merhaba)
print(Python öğreniyorum)
`,
        testler: [{ beklenen: "Merhaba\nPython öğreniyorum" }],
        ipuclari: ["Önce **▶ Çalıştır** ile hata mesajını oku. Hangi satırı gösteriyor?", "Metinler iki tırnak arasında olmalı: hem açılış hem kapanış tırnağı gerekir."],
        cozum: `print("Merhaba")
print("Python öğreniyorum")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k1-hesap",
        baslik: "Python hesaplasın",
        gorev: `Bir yılda (365 gün) kaç **saat** olduğunu ekrana yazdır. Sonucu kendin hesaplama, Python hesaplasın! Ekrana sadece sayı yazılmalı.

*İpucu: Programlamada çarpma işareti \`x\` değil, \`*\` (yıldız) karakteridir.*`,
        baslangicKodu: `# 1 gün = 24 saat\n`,
        testler: [{ beklenen: "8760" }],
        kodKurallari: [{ desen: "8760", olmamali: true, mesaj: "Sonucu kendin yazmışsın gibi görünüyor. Çarpma işlemini (*) Python'a yaptır!" }],
        ipuclari: ["`print(365 * 24)`"],
        cozum: `print(365 * 24)`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- Bilgisayar **donanım** ve **yazılımdan** oluşur. Yazılım, kodlarla yazılmış programları kapsar.
- Programlama dillerinin ortak kavramları (operatörler, değişkenler, karar ve döngü yapıları) programın temelini oluşturur.
- \`print()\` ekrana yazdırır. Metinler tırnak içinde, sayılar tırnaksız yazılır.
- \`#\` ile başlayan satırlar açıklamadır ve çalışmaz.`,
    },
  ],
};

export default ders;
