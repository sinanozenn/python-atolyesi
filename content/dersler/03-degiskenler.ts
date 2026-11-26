import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "degiskenler",
  sira: 3,
  baslik: "Değişkenler",
  ozet: "Verileri isimli kutularda sakla, değiştir ve işlemlerde kullan.",
  simge: "📦",
  sure: "40 dk",
  kitap: "3.1.2 Değişkenler · s. 88–91",
  hedefler: [
    "Değişkeni hafızadaki bir kutucuğa benzeterek açıklayabilmek",
    "Değişken tanımlayıp değer atayabilmek",
    "Değişkenlerle işlem yapıp sonucu yeni bir değişkene aktarabilmek",
    "Değişken isimlendirme kurallarını uygulayabilmek",
  ],
  ogretmenNotu: `
- **Kitap 4. Örnek**'teki kutucuk çizimini tahtada yapın: \`sayi_1\`, \`sayi_2\`, \`toplam\` kutuları; önce boş, sonra dolu.
- **1. Uygulama** (ortalama) sitede alıştırma olarak var. Öğrencilerden önce defterlerine kutucukları çizmelerini, sonra kodu yazmalarını isteyin.
- ⚠️ **Kitapla ilgili not:** Kitap değişken adlarının “\`_\` ve \`$\` ile başlayabileceğini” söyler. Bu bazı diller için geçerlidir; **Python'da \`$\` kullanılamaz**, yalnızca harf, rakam ve \`_\` kullanılır.
- Ünite sonundaki **3. ölçme sorusu** (yanlış değişken tanımlarını düzeltme) bu derste alıştırma olarak yer alıyor.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Değişken nedir?

Programlarda kullandığımız veriler (değerler), **değişkenler** ile isimlendirilir. Bilgisayar her değişken için hafızada bir **alan** ayırır. Değişkene verdiğimiz isim sayesinde bu alandaki veriyi okuyabilir, değiştirebilir, yeni veri koyabiliriz.

Değişkenleri hafızadaki **kutucuklara** benzetebiliriz. Kutunun üzerinde bir **isim etiketi**, içinde ise bir **değer** vardır:

| Değişken adı (etiket) | Değer (kutunun içi) |
|---|---|
| \`ad\` | \`"Ayşe"\` |
| \`no\` | \`100\` |

Python'da değişken oluşturmak için ona bir değer **atamamız** yeterlidir:

\`\`\`python
ad = "Ayşe"
no = 100
\`\`\`

\`=\` işareti matematikteki “eşittir” değildir. Anlamı: **sağdaki değeri, soldaki değişkene ata (koy)**.
`,
    },
    {
      tur: "metin",
      icerik: `
## Kitap 4. Örnek: Adım adım değişkenler

**1. Değişkenler tanımlanır:** \`sayi_1\`, \`sayi_2\`, \`toplam\`

**2. Değerler atanır:** \`sayi_1\` kutusuna 10, \`sayi_2\` kutusuna 20 konur.

**3. İşlem yapılır:** \`toplam = sayi_1 + sayi_2\`. Python önce sağ tarafı hesaplar (10 + 20 = 30), sonra sonucu \`toplam\` kutusuna koyar.

| | Adım 2'den sonra | Adım 3'ten sonra |
|---|---|---|
| \`sayi_1\` | 10 | 10 |
| \`sayi_2\` | 20 | 20 |
| \`toplam\` | (boş) | **30** |
`,
    },
    {
      tur: "ornek",
      baslik: "Kitap 4. Örnek",
      kod: `sayi_1 = 10
sayi_2 = 20
toplam = sayi_1 + sayi_2
print(toplam)
print("Toplam:", toplam)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "a = 3\nb = a + 2\na = 10\nprint(b)",
      secenekler: ["5", "12", "10", "3"],
      dogru: 0,
      aciklama: "`b = a + 2` satırı çalıştığında a 3'tür, yani b = **5** olur. Sonradan a'yı 10 yapmak b'yi değiştirmez; b'nin kutusunda hâlâ 5 vardır.",
    },
    {
      tur: "metin",
      icerik: `
## Değer değişebilir

Değişkenlerin adı üstünde: içlerindeki değer **değişebilir**. Bir değişkene yeni bir değer atadığında eski değer silinir.
`,
    },
    {
      tur: "ornek",
      baslik: "Oyunda puan toplamak",
      kod: `puan = 10
print("Başlangıç puanı:", puan)

puan = puan + 5      # mevcut puana 5 ekle
print("Altın topladın:", puan)

puan = puan - 3
print("Tuzağa düştün:", puan)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı ne olur?",
      kod: `x = 5
x = x + 2
x = x * 10
print(x)`,
      secenekler: ["5", "7", "70", "x * 10"],
      dogru: 2,
      aciklama: "Satır satır izle: x önce 5, sonra 5 + 2 = **7**, sonra 7 × 10 = **70** olur. Her atamada kutunun içindeki eski değer silinir.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "x = 1\ny = 2\nx = y\ny = x\nprint(x, y)",
      secenekler: ["2 1", "1 2", "2 2", "1 1"],
      dogru: 2,
      aciklama: "x = y satırında x'in içine 2 konur (eski 1 silinir). Sonra y = x satırında y'ye x'in **yeni** değeri olan 2 konur. Sonuç: **2 2**. İki değişkenin değerini değiştirmek için üçüncü bir “geçici” kutu gerekir!",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k3-ortalama",
        baslik: "Kitap 1. Uygulama: Ortalama",
        gorev: `1. İki sayıyı değişken olarak tanımla: \`sayi_1\` ve \`sayi_2\`
2. Bu değişkenlere **40** ve **60** değerlerini ata.
3. İki sayının ortalamasını bulup \`ortalama\` adlı değişkene ata.
4. \`ortalama\` değişkenini ekrana yazdır.`,
        baslangicKodu: `# 1. ve 2. adım: değişkenleri tanımla ve değer ata

# 3. adım: ortalamayı hesapla

# 4. adım: ekrana yazdır
`,
        testler: [{ beklenen: "50.0" }],
        kodKurallari: [
          { desen: "sayi_1\\s*=", mesaj: "`sayi_1` adında bir değişken tanımlamalısın." },
          { desen: "sayi_2\\s*=", mesaj: "`sayi_2` adında bir değişken tanımlamalısın." },
          { desen: "ortalama\\s*=", mesaj: "Sonucu `ortalama` adında bir değişkene atamalısın." },
          { desen: "print\\(\\s*50", olmamali: true, mesaj: "Sonucu kendin yazma; ortalama değişkenini yazdır." },
        ],
        ipuclari: ["Ortalama = (birinci sayı + ikinci sayı) / 2", "Parantezi unutma! `sayi_1 + sayi_2 / 2` yazarsan önce bölme yapılır.", "Bölme işlemi (/) sonucu her zaman ondalıklı verir: 50.0"],
        cozum: `sayi_1 = 40
sayi_2 = 60
ortalama = (sayi_1 + sayi_2) / 2
print(ortalama)`,
      },
    },
    {
      tur: "metin",
      icerik: `
## Değişken isimlendirme kuralları

| Kural | ✅ Doğru | ❌ Yanlış |
|---|---|---|
| Sayı ile **başlayamaz** (sayı sonra gelebilir) | \`no1 = 100\` | \`1no = 100\` |
| **Boşluk** içeremez; boşluk yerine \`_\` kullanılır | \`ders_adi = "..."\` | \`ders adi = "..."\` |
| **Özel karakter** içeremez (\`*\`, \`-\`, \`.\`, \`!\`…) | \`sayi = 20\` | \`sayi* = 20\` |
| Python'un **komutları** isim olamaz | \`yazdir = 50\` | \`print = 50\` |
| \`for, if, else, while, and, or\` gibi **ayrılmış kelimeler** kullanılmaz | \`kosul = 1\` | \`if = 1\` |

Ayrıca:
- **Büyük/küçük harf duyarlılığı vardır:** \`isim\` ile \`İsim\` aynı değişken değildir.
- **Türkçe karakter** (ç, ğ, ı, İ, ö, ş, ü) kullanmamak daha uygundur. Bazı dillerde hata verir.
- İsimler **anlamlı ve akılda kalıcı** olmalı: \`x\` yerine \`ogrenci_no\` gibi.
- Metinler (sözel veriler) **tırnak içinde** yazılır: \`ad = "Ayşe"\`, \`no = 100\`
`,
    },
    {
      tur: "soru",
      soru: "Aşağıdaki değişken tanımlarından hangisi **doğrudur**?",
      secenekler: ["`1sinif = \"A\"`", "`ders adi = \"Fizik\"`", "`ogrenci_no = 25`", "`not-ortalamasi = 80`"],
      dogru: 2,
      aciklama: "`1sinif` sayı ile başlıyor, `ders adi` boşluk içeriyor, `not-ortalamasi` içindeki `-` işareti çıkarma operatörü olarak algılanır. Doğru olan **`ogrenci_no = 25`**.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "isim = \"Ali\"\nprint(Isim)",
      secenekler: ["Ali", "isim", "Hata verir", "Isim"],
      dogru: 2,
      aciklama: "Python büyük/küçük harfe duyarlıdır. `isim` adında bir değişken var ama `Isim` adında yok; bu yüzden **NameError** hatası verir.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k3-isimler",
        baslik: "Yanlış değişken isimlerini düzelt",
        gorev: `Ünite sonu 3. sorudaki gibi, bu koddaki **değişken isimleri kurallara uymuyor**. Değişken isimlerini düzelterek programı çalışır hale getir. (Değerlere dokunma.)

Çıktı şöyle olmalı:
\`\`\`
Ahmet
soru
20
\`\`\``,
        baslangicKodu: `is im = "Ahmet"
1soru = "soru"
sayi* = 20
print(is im)
print(1soru)
print(sayi*)
`,
        testler: [{ beklenen: "Ahmet\nsoru\n20" }],
        ipuclari: [
          "Boşluk yerine alt çizgi kullan ya da boşluğu sil: `isim`",
          "Sayı başta olamaz: `soru1` ya da `soru_1` yazabilirsin.",
          "Değişkeni değiştirdiğin her yerde (print içinde de) aynı yeni ismi kullanmalısın.",
        ],
        cozum: `isim = "Ahmet"
soru1 = "soru"
sayi = 20
print(isim)
print(soru1)
print(sayi)`,
      },
    },
    {
      tur: "ipucu",
      renk: "uyari",
      baslik: "Neden print = 50 yazılmaz?",
      icerik: "Ünite sonu 3. sorudaki `print=50` tanımı Python'da hemen hata vermez ama `print` komutunu **bozar**. Bundan sonra `print(...)` yazdığında program çalışmaz, çünkü `print` artık bir komut değil, içinde 50 olan bir kutudur. Komut isimlerini değişken adı olarak kullanma!",
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **Değişkenler** verileri hafızada saklayan, isim verilmiş kutucuklardır.
- \`=\` ile değişkene değer **atanır**: sağdaki değer soldaki isme aktarılır.
- Değişkenin değeri program içinde değiştirilebilir.
- Değişken isimleri sayı ile başlamaz, boşluk ve özel karakter içermez, komut isimleri kullanılmaz.`,
    },
  ],
};

export default ders;
