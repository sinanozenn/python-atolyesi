import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "algoritma",
  sira: 1,
  baslik: "Algoritma",
  ozet: "Bir problemi adım adım çözmek: algoritmanın tanımı, özellikleri ve günlük hayattan örnekler.",
  simge: "",
  sure: "2 × 40 dk",
  kitap: "Hazırlık dersi: Algoritma",
  hedefler: [
    "Algoritmanın ne olduğunu kendi cümleleriyle açıklayabilmek",
    "İyi bir algoritmanın özelliklerini sayabilmek",
    "Günlük hayattaki bir işi algoritma adımlarıyla yazabilmek",
    "Bir problemin girdisini, işlemini ve çıktısını belirleyebilmek",
    "Sıralı, karar içeren ve tekrar eden algoritmaları ayırt edebilmek",
  ],
  ogretmenNotu: `
- **Isınma:** Bir öğrenciyi tahtaya kaldırın; sınıf ona yalnızca sözlü komutlarla “sınıfın kapısını açtırsın”. “Kapıya git” gibi belirsiz komutlarla öğrencinin nasıl takıldığını gösterin: bilgisayar da tam olarak söyleneni yapar.
- **Sandviç etkinliği:** “Peynirli sandviç yapma” algoritmasını sınıfa yazdırın, siz de adımları *harfiyen* uygulayın (ekmeği açmadan peynir koymaya çalışmak gibi). Netlik ve sıranın önemi çok iyi anlaşılır.
- Bu derste Python bilgisi gerekmez. Python örnekleri yalnızca merak uyandırmak için var; “bunu birkaç ders sonra kendiniz yazacaksınız” deyin.
- Sıralama etkinliklerini önce bireysel, sonra sıra arkadaşıyla karşılaştırarak yaptırın.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Problem çözmek

Her gün farkında olmadan onlarca problem çözüyoruz: okula nasıl gideceğimize, ödevi hangi sırayla yapacağımıza, markette en uygun ürünü nasıl seçeceğimize karar veriyoruz. Bunları yaparken kafamızda **adım adım bir plan** vardır.

Bir bilgisayara iş yaptırmak için de bu planı yazmamız gerekir. Ama bilgisayar bizim gibi düşünemez, tahmin yürütemez, “ne demek istediğimizi” anlayamaz. Ona her adımı **açık, net ve doğru sırayla** söylemeliyiz.

## Algoritma nedir?

**Algoritma**, bir problemi çözmek ya da bir işi yapmak için izlenecek adımların **sıralı ve açık** biçimde yazılmasıdır.

> Algoritma kelimesi, 9. yüzyılda yaşamış Türk-İslam matematikçisi **el-Harezmî**'nin adından gelir. Harezmî'nin adı Latinceye “Algoritmi” olarak çevrilmiş, zamanla bugünkü kelimeye dönüşmüştür.

Algoritma bir programlama dili değildir; bir **düşünme biçimidir**. Aynı algoritmayı Türkçe cümlelerle, akış şemasıyla ya da Python gibi bir programlama diliyle yazabiliriz. Program yazmanın ilk adımı her zaman algoritmayı tasarlamaktır.
`,
    },
    {
      tur: "metin",
      icerik: `
## Günlük hayattan bir algoritma: Çay demlemek

Adımlar **numaralandırılarak** ve her biri tek bir işi anlatacak şekilde yazılır:

1. Başla.
2. Çaydanlığın alt kısmına su doldur.
3. Çaydanlığı ocağa koy ve ocağı yak.
4. Su kaynayana kadar bekle.
5. Demliğe çay koy.
6. Kaynayan suyu demliğe dök.
7. Demliği çaydanlığın üstüne koy.
8. 15 dakika demlenmesini bekle.
9. Bitir.

Bu adımların sırasını değiştirirsek ne olur? Örneğin 6. adımı 5. adımdan önce yaparsak demlikte sadece sıcak su olur. **Algoritmada sıra önemlidir.**
`,
    },
    {
      tur: "siralama",
      baslik: "Okula hazırlanma algoritması",
      gorev: "Sabah okula hazırlanma adımları karıştı. Okları kullanarak adımları **doğru sıraya** diz.",
      adimlar: ["Başla", "Alarm çalınca uyan", "Yüzünü yıka", "Okul kıyafetlerini giy", "Kahvaltı yap", "Çantanı al", "Evden çık", "Bitir"],
    },
    {
      tur: "metin",
      icerik: `
## İyi bir algoritmanın özellikleri

| Özellik | Anlamı | Kötü örnek | İyi örnek |
|---|---|---|---|
| **Başlangıcı ve sonu belli** | Nerede başlayıp nerede bittiği açıktır | Sonu olmayan bir tarif | “Başla … Bitir” |
| **Açık ve net** | Her adım tek bir anlama gelir | “Biraz tuz ekle” | “1 çay kaşığı tuz ekle” |
| **Sıralı** | Adımlar doğru sırada yapılır | Ekmeği kesmeden sandviç yapmak | Önce kes, sonra doldur |
| **Sonlu** | Belli sayıda adımdan sonra biter | “Sürekli karıştır” | “3 dakika karıştır” |
| **Girdisi ve çıktısı vardır** | Ne aldığı ve ne ürettiği bellidir | — | Girdi: iki sayı, Çıktı: toplamları |
| **Genel** | Benzer bütün problemlerde çalışır | Yalnızca 3 + 5'i toplayan bir yöntem | Her iki sayıyı toplayan bir yöntem |
`,
    },
    {
      tur: "soru",
      soru: "“Yemeğe **biraz** tuz ekle.” adımı algoritmanın hangi özelliğine **uymaz**?",
      secenekler: ["Sıralı olma", "Açık ve net olma", "Sonlu olma", "Başlangıcının belli olma"],
      dogru: 1,
      aciklama: "“Biraz” herkes için farklı bir miktardır. Bilgisayar böyle belirsiz bir komutu anlayamaz. Adımlar **açık ve net** olmalı: “1 çay kaşığı tuz ekle”.",
    },
    {
      tur: "soru",
      soru: "Aşağıdakilerden hangisi bir algoritma için **doğru değildir**?",
      secenekler: ["Adımları belli bir sırayla yapılır.", "Sonunda bir sonuç üretir.", "Sonsuza kadar devam edebilir.", "Türkçe cümlelerle de yazılabilir."],
      dogru: 2,
      aciklama: "Algoritmalar **sonludur**: belli sayıda adımdan sonra mutlaka biter. Bitmeyen bir adım listesi algoritma değildir.",
    },
    {
      tur: "metin",
      icerik: `
## Girdi → İşlem → Çıktı

Bilgisayarın yaptığı her iş üç parçadan oluşur:

| Parça | Anlamı | Örnek: iki sayıyı toplamak |
|---|---|---|
| **Girdi** | Algoritmaya verilen bilgiler | Birinci sayı ve ikinci sayı |
| **İşlem** | Girdilerle yapılan hesaplama ya da karşılaştırma | İki sayıyı topla |
| **Çıktı** | Algoritmanın ürettiği sonuç | Toplam |

Bir algoritma yazmadan önce bu üç soruyu sor: **Ne alacağım? Ne yapacağım? Ne vereceğim?**

### Değişken: bilgiyi saklayan kutu

Algoritmada aldığımız ve hesapladığımız bilgileri **isim verdiğimiz kutularda** saklarız. Bu kutulara **değişken** denir. Örneğin kullanıcının girdiği ilk sayıyı \`a\` adlı kutuya, ikinciyi \`b\` adlı kutuya koyabiliriz. Toplamı da \`toplam\` adlı kutuda saklarız.
`,
    },
    {
      tur: "metin",
      icerik: `
## Örnek 1: İki sayının toplamı

**Problem:** Kullanıcının girdiği iki sayının toplamını bulan algoritmayı yazınız.

- **Girdi:** iki sayı (\`a\`, \`b\`)
- **İşlem:** toplama
- **Çıktı:** toplam

**Algoritma:**
1. Başla.
2. Birinci sayıyı al, \`a\`'ya ata.
3. İkinci sayıyı al, \`b\`'ye ata.
4. \`toplam = a + b\` işlemini yap.
5. \`toplam\`'ı ekrana yaz.
6. Bitir.

Aynı algoritma Python'da şöyle görünür. Henüz Python bilmiyorsun, ama satırların algoritma adımlarıyla nasıl eşleştiğine bak. **▶ Çalıştır**'a bas:
`,
    },
    {
      tur: "ornek",
      baslik: "Algoritmanın Python karşılığı",
      kod: `a = int(input("Birinci sayı: "))    # Adım 2
b = int(input("İkinci sayı: "))     # Adım 3
toplam = a + b                      # Adım 4
print("Toplam:", toplam)            # Adım 5`,
      girdiler: ["8", "5"],
    },
    {
      tur: "metin",
      icerik: `
## Örnek 2: Dikdörtgenin alanı ve çevresi

**Problem:** Kısa ve uzun kenarı verilen bir dikdörtgenin alanını ve çevresini bulunuz.

- **Girdi:** kısa kenar, uzun kenar
- **İşlem:** alan = kısa × uzun, çevre = 2 × (kısa + uzun)
- **Çıktı:** alan ve çevre

**Algoritma:**
1. Başla.
2. Kısa kenarı al.
3. Uzun kenarı al.
4. alan = kısa kenar × uzun kenar
5. çevre = 2 × (kısa kenar + uzun kenar)
6. Alanı ve çevreyi ekrana yaz.
7. Bitir.

## Örnek 3: Harçlık planı

**Problem:** Haftalık harçlığının %10'unu biriktiren bir öğrencinin her gün ne kadar harcayabileceğini bulunuz.

1. Başla.
2. Haftalık harçlığı al.
3. birikim = harçlık × 10 / 100
4. kalan = harçlık − birikim
5. günlük = kalan / 7
6. Birikimi ve günlük harcamayı ekrana yaz.
7. Bitir.

Bu iki örnekteki adımlar **hep aynı sırayla, birer kez** yapılır. Bu tür algoritmalara **sıralı (doğrusal) algoritma** denir.
`,
    },
    {
      tur: "siralama",
      baslik: "Üç notun ortalaması",
      gorev: "Bir öğrencinin üç sınav notunun ortalamasını bulan algoritmanın adımlarını sırala.",
      adimlar: ["Başla", "Birinci notu al", "İkinci notu al", "Üçüncü notu al", "toplam = not1 + not2 + not3", "ortalama = toplam / 3", "Ortalamayı ekrana yaz", "Bitir"],
    },
    {
      tur: "metin",
      icerik: `
## Karar içeren algoritmalar

Bazen bir adımın yapılıp yapılmayacağı bir **şarta** bağlıdır: *“Hava yağmurluysa şemsiye al, değilse alma.”* Algoritmada bu tür adımlara **karar adımı** denir. Karar adımı bir **soru** sorar; cevabı **Evet** ya da **Hayır** olur.

## Örnek 4: Geçti mi, kaldı mı?

**Problem:** Üç notun ortalaması 50 veya üzerindeyse “Geçti”, değilse “Kaldı” yazan algoritma.

1. Başla.
2. Üç notu al.
3. ortalama = (not1 + not2 + not3) / 3
4. **Eğer** ortalama ≥ 50 **ise** “Geçti” yaz, **değilse** “Kaldı” yaz.
5. Bitir.

## Örnek 5: Tek mi, çift mi?

Bir sayı 2'ye bölündüğünde **kalan 0** ise çifttir.

1. Başla.
2. Sayıyı al.
3. kalan = sayının 2'ye bölümünden kalan
4. **Eğer** kalan = 0 **ise** “Çift” yaz, **değilse** “Tek” yaz.
5. Bitir.

## Örnek 6: İki sayıdan büyüğü

1. Başla.
2. a ve b sayılarını al.
3. **Eğer** a > b **ise** a'yı yaz, **değilse** b'yi yaz.
4. Bitir.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek 5'in Python karşılığı",
      kod: `sayi = int(input("Bir sayı gir: "))
if sayi % 2 == 0:       # Eğer kalan 0 ise
    print("Çift")
else:                   # değilse
    print("Tek")`,
      girdiler: ["7"],
      aciklama: "Girdiler kutusundaki sayıyı değiştirip tekrar çalıştır.",
    },
    {
      tur: "soru",
      soru: "“Eğer ortalama ≥ 50 ise ‘Geçti’ yaz, değilse ‘Kaldı’ yaz.” adımında ortalama **50** ise ekrana ne yazılır?",
      secenekler: ["Geçti", "Kaldı", "Hiçbir şey", "Hem Geçti hem Kaldı"],
      dogru: 0,
      aciklama: "≥ işareti “büyük **veya eşit**” demektir. 50 ≥ 50 doğrudur, bu yüzden **Geçti** yazılır. Şart yalnızca > olsaydı “Kaldı” yazardı. Sınır değerlere her zaman dikkat et!",
    },
    {
      tur: "metin",
      icerik: `
## Tekrar eden algoritmalar (döngü)

Bazı adımların **birçok kez** yapılması gerekir. Ekrana 1'den 100'e kadar sayıları yazmak için 100 adım yazmak yerine, adımları **tekrar ettiririz**. Tekrar sayısını takip eden değişkene **sayaç** denir.

## Örnek 7: 1'den 5'e kadar sayılar

1. Başla.
2. sayac = 1
3. **sayac ≤ 5 olduğu sürece** 4. ve 5. adımları tekrarla:
4. &nbsp;&nbsp;&nbsp;sayac'ı ekrana yaz.
5. &nbsp;&nbsp;&nbsp;sayac = sayac + 1
6. Bitir.

Adım adım izleyelim:

| Tur | sayac | sayac ≤ 5 ? | Ekrana yazılan |
|---|---|---|---|
| 1 | 1 | Evet | 1 |
| 2 | 2 | Evet | 2 |
| 3 | 3 | Evet | 3 |
| 4 | 4 | Evet | 4 |
| 5 | 5 | Evet | 5 |
| — | 6 | **Hayır** → döngü biter | — |

Bu tabloya **iz sürme tablosu** denir. Algoritmanın doğru çalışıp çalışmadığını kontrol etmenin en iyi yollarından biridir.

## Örnek 8: 1'den 10'a kadar sayıların toplamı

1. Başla.
2. toplam = 0, sayac = 1
3. sayac ≤ 10 olduğu sürece tekrarla:
4. &nbsp;&nbsp;&nbsp;toplam = toplam + sayac
5. &nbsp;&nbsp;&nbsp;sayac = sayac + 1
6. toplam'ı ekrana yaz.
7. Bitir.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek 8'in Python karşılığı",
      kod: `toplam = 0
sayac = 1
while sayac <= 10:
    toplam = toplam + sayac
    sayac = sayac + 1
print("Toplam:", toplam)`,
    },
    {
      tur: "soru",
      soru: "Örnek 7'de 5. adımı (sayac = sayac + 1) unutursak ne olur?",
      secenekler: ["Ekrana 1'den 5'e kadar yazılır.", "Hiçbir şey yazılmaz.", "Ekrana durmadan 1 yazılır; algoritma hiç bitmez.", "Ekrana sadece 5 yazılır."],
      dogru: 2,
      aciklama: "sayac hep 1 kalır, “sayac ≤ 5” hep doğru olur ve döngü **hiç bitmez**. Bu, algoritmanın **sonlu olma** özelliğini bozar. Döngülerde sayacı değiştirmeyi unutma!",
    },
    {
      tur: "siralama",
      baslik: "Doğru şifreyi bekle",
      gorev: "Kullanıcı doğru şifreyi girene kadar şifre soran algoritmanın adımlarını sırala.",
      adimlar: ["Başla", "Şifreyi al", "Şifre yanlış olduğu sürece tekrarla:", "“Yanlış şifre” yaz", "Şifreyi yeniden al", "“Giriş başarılı” yaz", "Bitir"],
    },
    {
      tur: "metin",
      icerik: `
## Algoritma yazarken izlenecek yol

1. **Problemi anla:** Ne isteniyor? Örnek bir durum düşün.
2. **Girdi ve çıktıyı belirle:** Ne alacağım, ne vereceğim?
3. **Adımları yaz:** Her adım tek bir iş yapsın, açık olsun.
4. **Test et:** Birkaç farklı girdiyle adımları elle uygula (iz sürme). Sınır değerleri dene: 0, negatif sayılar, eşit sayılar…
5. **Düzelt:** Yanlış sonuç veren adımı bul ve düzelt.

Bir sonraki derste algoritmaları **akış şeması** ile çizmeyi öğreneceğiz. Şekiller, adımları bir bakışta görmeyi sağlar.
`,
    },
    {
      tur: "soru",
      soru: "“Bir dairenin alanını bulan algoritma” için **girdi** nedir?",
      secenekler: ["Dairenin alanı", "Dairenin yarıçapı", "pi × r × r işlemi", "Ekrana yazdırma"],
      dogru: 1,
      aciklama: "Alanı hesaplamak için kullanıcıdan alınması gereken bilgi **yarıçaptır** (girdi). pi × r × r **işlemdir**, alan ise **çıktıdır**.",
    },
    {
      tur: "soru",
      soru: "Aşağıdakilerden hangisi **karar** içeren bir algoritmaya örnektir?",
      secenekler: ["İki sayıyı toplayıp sonucu yazmak", "Bir sayının pozitif olup olmadığını yazmak", "Dikdörtgenin alanını hesaplamak", "Adını ekrana yazmak"],
      dogru: 1,
      aciklama: "Pozitif mi değil mi sorusunun cevabına göre farklı bir şey yazılır. Bu bir **karar** adımıdır. Diğerleri sıralı algoritmalardır.",
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol noktası",
      icerik: `- **Algoritma**, bir problemi çözmek için izlenecek adımların sıralı ve açık biçimde yazılmasıdır.
- İyi bir algoritmanın başı ve sonu bellidir; açık, sıralı, sonlu ve geneldir; girdisi ve çıktısı vardır.
- Algoritmalar **sıralı**, **karar içeren** ve **tekrar eden (döngü)** adımlardan oluşabilir.
- Algoritma yazmadan önce girdiyi, işlemi ve çıktıyı belirle; yazdıktan sonra iz sürerek test et.`,
    },
  ],
};

export default ders;
