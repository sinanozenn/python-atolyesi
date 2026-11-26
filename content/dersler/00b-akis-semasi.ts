import type { Ders } from "../tipler";
import { semboller } from "../sema";

const ders: Ders = {
  slug: "akis-semasi",
  sira: 2,
  baslik: "Akış Şeması",
  ozet: "Algoritmaları şekillerle çizmek: semboller, kurallar ve sıralı, kararlı, döngülü şema örnekleri.",
  simge: "",
  sure: "2 × 40 dk",
  kitap: "Hazırlık dersi: Akış şeması",
  hedefler: [
    "Akış şemasının ne işe yaradığını açıklayabilmek",
    "Akış şeması sembollerini tanıyıp doğru yerde kullanabilmek",
    "Sıralı, karar içeren ve döngülü akış şemalarını okuyabilmek",
    "Bir akış şemasını verilen girdilerle adım adım izleyebilmek (iz sürme)",
    "Basit bir problemin akış şemasını çizebilmek",
  ],
  ogretmenNotu: `
- Sembolleri tahtaya büyük çizin ve sınıfla birlikte adlandırın. Öğrencilerin defterlerine sembol tablosunu çizmeleri kalıcılığı artırır.
- Her şemayı önce **parmakla takip ederek** okutun: “Başla'dan başla, oku izle, karara gelince sor…”
- İz sürme tablolarını tahtada birlikte doldurun; özellikle döngülerde sayacın her turdaki değerini yazdırın.
- Örneklerin altındaki **“Akış şeması aracında aç ve çalıştır”** düğmesi şemayı araçta açar. Öğrenciler şemayı değiştirip çalıştırabilir, her adımda hangi kutuda olunduğunu ve değişkenlerin değerlerini görebilir.
- Ders sonunda öğrencilerden kendi şemalarını araçta çizmelerini isteyin (Kendin çiz bölümü).
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Akış şeması nedir?

Bir önceki derste algoritmaları **Türkçe cümlelerle, adım adım** yazdık. Adım sayısı arttıkça, özellikle kararlar ve tekrarlar işin içine girince, yazılı algoritmayı takip etmek zorlaşır.

**Akış şeması**, bir algoritmanın adımlarını **şekillerle ve oklarla** gösteren çizimdir. Her şeklin bir anlamı vardır; oklar ise hangi adımdan sonra hangisinin geleceğini gösterir.

Akış şemasının faydaları:
- Algoritmayı **bir bakışta** görmeyi sağlar.
- Kararların ve tekrarların nereye gittiği açıkça görünür.
- Hataları bulmak kolaylaşır.
- Hangi programlama dili kullanılırsa kullanılsın herkes aynı şekilde okur. Programı yazmadan önce bir **plan** gibi kullanılır.
`,
    },
    {
      tur: "metin",
      icerik: `
## Akış şeması sembolleri
`,
    },
    { tur: "gorsel", svg: semboller(), altyazi: "Akış şemalarında kullanılan temel semboller" },
    {
      tur: "metin",
      icerik: `
| Sembol | Adı | Ne zaman kullanılır? | Örnek |
|---|---|---|---|
| Yuvarlatılmış dikdörtgen (oval) | **Başla / Bitir** | Akışın başladığı ve bittiği yer | Başla, Bitir |
| Paralelkenar | **Giriş** (girdi) | Kullanıcıdan veri alınırken | a, b sayılarını al |
| Dikdörtgen | **İşlem** | Hesaplama ve atama yapılırken | toplam = a + b |
| Eşkenar dörtgen | **Karar** | Bir soru sorulurken; çıkışı **Evet** ve **Hayır** olur | a > b ? |
| Paralelkenar | **Çıktı** | Ekrana sonuç yazılırken | Toplamı yaz |
| Ok | **Akış yönü** | Bir adımdan sonrakine geçişi gösterir | → |

> Bu sitede giriş kutuları **turuncu**, çıktı kutuları **yeşil**, karar kutuları **açık turuncu** renktedir. Böylece şemaya bakınca hangi kutunun ne iş yaptığını hemen görebilirsin.

### Akış şeması çizme kuralları

1. Her şemada **bir Başla** ve **en az bir Bitir** bulunur.
2. Akış genellikle **yukarıdan aşağıya** doğru ilerler.
3. Her ok **tek bir yönü** gösterir; oklar birbirini kesmemelidir.
4. Karar kutusundan **iki ok** çıkar: biri **Evet**, biri **Hayır**.
5. Bitir kutusundan ok çıkmaz.
`,
    },
    {
      tur: "soru",
      soru: "Kullanıcıdan **yaşını almak** için hangi sembol kullanılır?",
      secenekler: ["Dikdörtgen (işlem)", "Eşkenar dörtgen (karar)", "Paralelkenar (giriş)", "Oval (başla/bitir)"],
      dogru: 2,
      aciklama: "Kullanıcıdan veri almak bir **giriş** işlemidir ve **paralelkenar** ile gösterilir. Aynı şekil, ekrana sonuç yazdırırken (çıktı) de kullanılır.",
    },
    {
      tur: "soru",
      soru: "Hangi sembolden **iki ok** çıkar?",
      secenekler: ["İşlem", "Karar", "Giriş", "Başla"],
      dogru: 1,
      aciklama: "Karar kutusu bir soru sorar. Cevap **Evet** ise bir yoldan, **Hayır** ise diğer yoldan devam edilir. Bu yüzden karar kutusundan iki ok çıkar.",
    },
    {
      tur: "metin",
      icerik: `
## 1. Sıralı akış şemaları

En basit akış şemalarında adımlar **tek bir yol** boyunca, sırayla yapılır. Önceki dersteki çay demleme algoritmasının akış şeması:
`,
    },
    {
      tur: "sema",
      baslik: "Örnek 1: Çay demleme",
      altyazi: "Bütün adımlar işlem kutusunda; hiçbir karar ya da tekrar yok.",
      parcalar: [
        { t: "bas" },
        { t: "islem", m: "Çaydanlığa su doldur" },
        { t: "islem", m: "Ocağı yak, suyu kaynat" },
        { t: "islem", m: "Demliğe çay koy" },
        { t: "islem", m: "Kaynayan suyu demliğe dök" },
        { t: "islem", m: "15 dakika demlendir" },
        { t: "bit" },
      ],
    },
    {
      tur: "metin",
      icerik: `
Bilgisayarda çalışan bir algoritmada genellikle **giriş → işlem → çıktı** sırası vardır. Aşağıdaki şemada kullanıcıdan iki sayı alınıyor (giriş), toplanıyor (işlem) ve sonuç ekrana yazılıyor (çıktı):
`,
    },
    { tur: "sema", ornek: "toplama", baslik: "Örnek 2: İki sayının toplamı" },
    {
      tur: "metin",
      icerik: `
**Şemayı okuyalım:** Kullanıcı 3 ve 4 girerse a = 3, b = 4 olur. İşlem kutusunda toplam = 3 + 4 = 7 hesaplanır. Çıktı kutusu ekrana **Toplam: 7** yazar.

Şemanın altındaki düğmeyle şemayı **Akış Şeması Aracı**'nda açabilir, kendi sayılarınla çalıştırıp her adımda değişkenlerin nasıl değiştiğini izleyebilirsin.
`,
    },
    { tur: "sema", ornek: "dikdortgen", baslik: "Örnek 3: Dikdörtgenin alanı ve çevresi" },
    {
      tur: "soru",
      soru: "Örnek 3'teki şemada kısa kenar **5**, uzun kenar **8** girilirse ekrana ne yazılır?",
      secenekler: ["Alan: 13, Çevre: 40", "Alan: 40, Çevre: 26", "Alan: 40, Çevre: 13", "Alan: 26, Çevre: 40"],
      dogru: 1,
      aciklama: "alan = 5 × 8 = **40**. cevre = 2 × (5 + 8) = 2 × 13 = **26**. İşlem kutuları yukarıdan aşağıya sırayla yapılır.",
    },
    {
      tur: "siralama",
      baslik: "Dairenin alanı",
      gorev: "Yarıçapı verilen bir dairenin alanını bulan akış şemasının kutuları karıştı. Kutuları akış sırasına diz.",
      adimlar: ["Başla", "pi = 3.14", "Yarıçapı (r) al", "alan = pi × r × r", "Alanı ekrana yaz", "Bitir"],
    },
    {
      tur: "metin",
      icerik: `
## 2. Karar içeren akış şemaları

Karar kutusu bir **soru** sorar. Cevaba göre akış iki yoldan birine ayrılır; bu şemalarda **Evet** yolu solda, **Hayır** yolu sağdadır. İki yol daha sonra yeniden birleşir ve akış devam eder.
`,
    },
    { tur: "sema", ornek: "tek-cift", baslik: "Örnek 4: Tek mi, çift mi?" },
    {
      tur: "metin",
      icerik: `
**Şemayı okuyalım:** \`%\` işareti bölmeden kalanı bulur. Kullanıcı **8** girerse 8'in 2'ye bölümünden kalan 0'dır; soru “Evet” olur ve ekrana **Çift** yazılır. **7** girerse kalan 1'dir; cevap “Hayır” olur ve **Tek** yazılır.

| Girilen sayı | sayi % 2 | sayi % 2 == 0 ? | Gidilen yol | Ekrana yazılan |
|---|---|---|---|---|
| 8 | 0 | Evet | sol | Çift |
| 7 | 1 | Hayır | sağ | Tek |
| 0 | 0 | Evet | sol | Çift |
`,
    },
    { tur: "sema", ornek: "buyuk", baslik: "Örnek 5: İki sayıdan büyüğü" },
    {
      tur: "soru",
      soru: "Örnek 5'teki şemaya **a = 9, b = 9** girilirse ne olur?",
      secenekler: ["“Büyük olan: 9” yazılır (Evet yolundan)", "“Büyük olan: 9” yazılır (Hayır yolundan)", "Hiçbir şey yazılmaz", "Şema hata verir"],
      dogru: 1,
      aciklama: "9 > 9 sorusunun cevabı **Hayır**'dır (9, 9'dan büyük değildir). Akış sağdaki yoldan gider ve b'yi yani 9'u yazar. Sayılar eşitse ayrıca “Eşit” yazdırmak istersek **ikinci bir karar kutusu** eklememiz gerekir.",
    },
    { tur: "sema", ornek: "ortalama", baslik: "Örnek 6: Not ortalaması, geçti mi?" },
    {
      tur: "soru",
      soru: "Örnek 6'daki şemaya notlar **40, 50, 60** girilirse ekrana ne yazılır?",
      secenekler: ["Kaldı, ortalama: 50.0", "Geçti, ortalama: 50.0", "Geçti, ortalama: 150", "Kaldı, ortalama: 150"],
      dogru: 1,
      aciklama: "ort = (40 + 50 + 60) / 3 = 150 / 3 = **50.0**. 50.0 ≥ 50 sorusunun cevabı **Evet**'tir (≥ “büyük veya eşit” demektir). Bu yüzden **Geçti** yazılır.",
    },
    {
      tur: "ornek",
      baslik: "Örnek 4'ün Python karşılığı",
      aciklama: "Akış şemasındaki her kutunun Python'da bir karşılığı vardır. Karar kutusu if, iki yol da if ve else bloklarıdır. Bunu birkaç ders sonra kendin yazacaksın; şimdilik çalıştırıp sonucu gör.",
      kod: `sayi = int(input("Bir sayı gir: "))   # Giriş kutusu
if sayi % 2 == 0:                     # Karar kutusu
    print("Çift")                     # Evet yolu
else:
    print("Tek")                      # Hayır yolu`,
      girdiler: ["8"],
    },
    {
      tur: "metin",
      icerik: `
## 3. Döngü içeren akış şemaları

Bir grup adımın **tekrar tekrar** yapılması gerekiyorsa, akış bir karar kutusuna **geri döner**. Karar kutusundaki soru “Evet” olduğu sürece tekrar devam eder; “Hayır” olunca döngüden çıkılır. Bu şemalarda döngüye geri dönen ok **solda** çizilir.

Tekrar sayısını tutan değişkene **sayaç** denir. Sayaç her turda değişmezse soru hiç “Hayır” olmaz ve döngü hiç bitmez. Buna **sonsuz döngü** denir.
`,
    },
    { tur: "sema", ornek: "say", baslik: "Örnek 7: 1'den 5'e kadar say" },
    {
      tur: "metin",
      icerik: `
**İz sürme tablosu:** Şemayı adım adım takip ederken değişkenlerin değerlerini bir tabloya yazarız.

| Tur | i | i <= 5 ? | Ekrana yazılan | i = i + 1 sonrası |
|---|---|---|---|---|
| 1 | 1 | Evet | 1 | 2 |
| 2 | 2 | Evet | 2 | 3 |
| 3 | 3 | Evet | 3 | 4 |
| 4 | 4 | Evet | 4 | 5 |
| 5 | 5 | Evet | 5 | 6 |
| — | 6 | **Hayır** | Bitti | — |
`,
    },
    {
      tur: "soru",
      soru: "Örnek 7'deki şemada **“i = i + 1”** kutusunu silersek ne olur?",
      secenekler: ["1'den 5'e kadar yazılır", "Sadece 1 yazılır ve şema biter", "Ekrana durmadan 1 yazılır, şema hiç bitmez", "Hiçbir şey yazılmaz"],
      dogru: 2,
      aciklama: "i hep 1 kalır, “i <= 5 ?” sorusu hep **Evet** olur ve akış karar kutusuyla çıktı kutusu arasında sonsuza kadar döner. Bu bir **sonsuz döngüdür**. Akış Şeması Aracı'nda deneyebilirsin; araç 5000 adımdan sonra akışı durdurur.",
    },
    { tur: "sema", ornek: "toplam-n", baslik: "Örnek 8: 1'den n'ye kadar toplam" },
    {
      tur: "soru",
      soru: "Örnek 8'deki şemaya **n = 4** girilirse ekrana ne yazılır?",
      secenekler: ["Toplam: 4", "Toplam: 6", "Toplam: 10", "Toplam: 15"],
      dogru: 2,
      aciklama: "toplam sırasıyla 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = **10** olur. i 5 olunca “i <= 4 ?” sorusu **Hayır** olur ve döngü biter.",
    },
    { tur: "sema", ornek: "sifre", baslik: "Örnek 9: Doğru şifreyi bekle" },
    {
      tur: "soru",
      soru: "Örnek 9'daki şemada kullanıcı sırayla **1111, 2222, 1234** girerse ekrana kaç kez “Yanlış şifre” yazılır?",
      secenekler: ["0", "1", "2", "3"],
      dogru: 2,
      aciklama: "1111 → yanlış (1. uyarı), 2222 → yanlış (2. uyarı), 1234 → doğru; döngüden çıkılır ve “Giriş başarılı” yazılır. Toplam **2** kez “Yanlış şifre” yazılır.",
    },
    { tur: "sema", ornek: "carpim", baslik: "Örnek 10: Çarpım tablosu" },
    {
      tur: "siralama",
      baslik: "Geri sayım şeması",
      gorev: "10'dan 1'e kadar geri sayıp sonunda “Kalkış!” yazan akış şemasının kutularını sıraya diz. (Döngünün içindeki kutular, karar kutusundan hemen sonra gelir.)",
      adimlar: ["Başla", "sayac = 10", "sayac >= 1 ?", "sayac'ı ekrana yaz", "sayac = sayac - 1", "“Kalkış!” yaz", "Bitir"],
    },
    {
      tur: "metin",
      icerik: `
## Kendin çiz

Menüdeki **Akış Şeması Aracı** ile kendi şemalarını çizebilir ve çalıştırabilirsin:

1. Soldaki sembollerden birine tıklayarak tuvale ekle, kutuları sürükleyerek yerleştir.
2. Bir kutunun alt noktasından tutup başka bir kutuya sürükleyerek **ok** çiz.
3. Kutuya tıklayıp sağdaki panelden içine ne yazılacağını gir.
4. **▶ Çalıştır** ile şemayı çalıştır; **Adım adım** ile her kutuda durup değişkenleri izle.

**Deneyebileceğin görevler:**
- Kullanıcıdan yaşını alan, 18 ve üzeriyse “Ehliyet alabilirsin”, değilse “Henüz alamazsın” yazan şema.
- Kullanıcıdan bir sayı alan ve sayı pozitifse “Pozitif”, değilse “Pozitif değil” yazan şema.
- 1'den 10'a kadar olan **çift** sayıları yazan şema. (İpucu: sayaç 2'den başlasın ve her turda 2 artsın.)
`,
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol noktası",
      icerik: `- **Akış şeması**, algoritmanın şekillerle gösterimidir.
- Oval: Başla/Bitir. Paralelkenar: giriş ve çıktı. Dikdörtgen: işlem. Eşkenar dörtgen: karar. Oklar akışın yönünü gösterir.
- Karar kutusundan **Evet** ve **Hayır** olmak üzere iki ok çıkar.
- Döngüde akış karar kutusuna geri döner; sayaç değişmezse **sonsuz döngü** oluşur.
- Bir şemayı anlamanın en iyi yolu **iz sürmek**: değişkenlerin her adımdaki değerini tabloya yazmaktır.`,
    },
  ],
};

export default ders;
