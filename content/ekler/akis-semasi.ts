import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Kolaydan zora: daha fazla akış şeması

Bu bölümdeki şemalar **🟢 kolay**, **🟡 orta** ve **🔴 zor** olarak sıralandı. Her şemanın altındaki düğmeyle şemayı Akış Şeması Aracı'nda açıp kendi girdilerinle çalıştırabilirsin.

**Bir şemayı okurken izlenecek yol:**
1. **Başla**'yı bul ve okları takip et.
2. Giriş kutularında hangi değişkenlerin alındığını not et.
3. İşlem kutularında değişkenlerin nasıl değiştiğini bir tabloya yaz (iz sürme).
4. Karar kutusuna gelince soruyu o anki değerlerle cevapla, **Evet** ya da **Hayır** okunu izle.
5. **Bitir**'e ulaşınca çıktıları kontrol et.

### 🟢 Kolay: Sıcaklık dönüştürme

Tek bir giriş, tek bir işlem ve tek bir çıktı. Sıralı şemaların en sade hâli.
`,
  },
  { tur: "sema", ornek: "sicaklik", baslik: "🟢 Kolay 1: Celsius'tan Fahrenheit'a" },
  {
    tur: "metin",
    icerik: `
**İz sürme** (girdi: 25):

| Adım | Kutu | c | f | Ekran |
|---|---|---|---|---|
| 1 | Giriş: c | 25 | — | |
| 2 | f = c * 1.8 + 32 | 25 | 77.0 | |
| 3 | Çıktı | 25 | 77.0 | Fahrenheit: 77.0 |

> \`*\` çarpma demektir. Bilgisayar ondalıklı sayılarda virgül yerine **nokta** kullanır: 1,8 yerine **1.8** yazılır.
`,
  },
  { tur: "sema", ornek: "kdv", baslik: "🟢 Kolay 2: KDV'li fiyat" },
  {
    tur: "soru",
    soru: "KDV şemasına fiyat olarak **200** girilirse ekrana ne yazılır?",
    secenekler: ["KDV: 20.0 ve Toplam: 220.0", "KDV: 40.0 ve Toplam: 240.0", "KDV: 40.0 ve Toplam: 200.0", "KDV: 200 ve Toplam: 240"],
    dogru: 1,
    aciklama: "kdv = 200 × 20 / 100 = **40.0**. toplam = 200 + 40 = **240.0**. Bölme (/) işlemi sonucu ondalıklı sayı verdiği için sonuçlar .0 ile yazılır.",
  },
  {
    tur: "metin",
    icerik: `
### 🟡 Orta: Kararın bir yolunda birden fazla kutu

Karar kutusunun Evet ya da Hayır yolunda **birden fazla kutu** olabilir. Aşağıdaki şemada Hayır yolunda önce bir hesap yapılıyor, sonra sonuç yazılıyor.
`,
  },
  { tur: "sema", ornek: "ehliyet", baslik: "🟡 Orta 1: Ehliyet alabilir mi?" },
  {
    tur: "soru",
    soru: "Ehliyet şemasına yaş olarak **18** girilirse hangi yoldan gidilir?",
    secenekler: ["Evet yolundan, “Ehliyet alabilirsin.” yazılır", "Hayır yolundan, “0 yıl daha beklemelisin.” yazılır", "İki yoldan da gidilir", "Şema hata verir"],
    dogru: 0,
    aciklama: "Soru **yas >= 18** (büyük veya eşit). 18 >= 18 doğrudur, cevap **Evet**'tir. Soru **yas > 18** olsaydı 18 yaşındaki biri yanlışlıkla Hayır yoluna giderdi. Sınır değerleri (burada 18) mutlaka dene!",
  },
  {
    tur: "metin",
    icerik: `
Bir şemada **birden fazla karar** art arda gelebilir. Aşağıdaki şemada ilk karar bilet fiyatını belirliyor; ikinci karar fiyatı indirimle değiştiriyor. İkinci kararın Hayır yolunda hiçbir kutu yok: cevap Hayır ise doğrudan devam edilir.
`,
  },
  { tur: "sema", ornek: "bilet", baslik: "🟡 Orta 2: Sinema bileti" },
  {
    tur: "metin",
    icerik: `
Dört farklı durum için şemayı izleyelim:

| yas | gun | 1. karar | fiyat | 2. karar | Sonuç |
|---|---|---|---|---|---|
| 10 | Çarşamba | Evet | 60 | Evet | **40 TL** |
| 10 | Cuma | Evet | 60 | Hayır | **60 TL** |
| 30 | Çarşamba | Hayır | 100 | Evet | **80 TL** |
| 30 | Cuma | Hayır | 100 | Hayır | **100 TL** |

İki kararın her birinin 2 sonucu olduğu için toplam **2 × 2 = 4** farklı yol vardır. Bir şemayı test ederken her yolu en az bir kez denemek iyi bir alışkanlıktır.
`,
  },
  {
    tur: "metin",
    icerik: `
### 🔴 Zor: Döngüde değer biriktirmek

Döngülü şemalarda bir değişken her turda **büyür**. Faktöriyel örneğinde \`sonuc\` her turda i ile çarpılır: 5! = 1 × 2 × 3 × 4 × 5 = 120.
`,
  },
  { tur: "sema", ornek: "faktoriyel", baslik: "🔴 Zor 1: Faktöriyel" },
  {
    tur: "metin",
    icerik: `
**İz sürme** (n = 4):

| Tur | i | i <= 4 ? | sonuc = sonuc * i |
|---|---|---|---|
| 1 | 1 | Evet | 1 × 1 = 1 |
| 2 | 2 | Evet | 1 × 2 = 2 |
| 3 | 3 | Evet | 2 × 3 = 6 |
| 4 | 4 | Evet | 6 × 4 = 24 |
| — | 5 | **Hayır** | Döngü biter, ekrana **4 ! = 24** yazılır |

> \`sonuc\` neden **0** ile değil de **1** ile başlıyor? Çünkü 0 ile çarpılan her sayı 0 olur! Toplam biriktirirken 0, çarpım biriktirirken 1 ile başlarız.
`,
  },
  { tur: "sema", ornek: "kumbara", baslik: "🔴 Zor 2: Kumbara hedefi" },
  {
    tur: "soru",
    soru: "Kumbara şemasında hedef **300**, haftalık **100** girilirse kaç hafta sonra döngü biter?",
    secenekler: ["2 hafta", "3 hafta", "4 hafta", "Döngü hiç bitmez"],
    dogru: 1,
    aciklama: "Hafta 1: para = 100, Hafta 2: para = 200, Hafta 3: para = 300. Şimdi **300 < 300 ?** sorusu Hayır olur ve döngü biter: **3 hafta**.",
  },
  {
    tur: "soru",
    soru: "Kumbara şemasına haftalık olarak **0** girilirse ne olur?",
    secenekler: ["Döngü bir kez döner", "Ekrana 0 hafta yazılır", "para hiç artmadığı için döngü hiç bitmez", "Şema hata verip durur"],
    dogru: 2,
    aciklama: "para her turda 0 + 0 = 0 kalır; **para < hedef** hep Evet olur. Bu bir **sonsuz döngüdür**. Akış Şeması Aracı 5000 adımdan sonra akışı durdurur ve seni uyarır. Gerçek programlarda böyle girdilere karşı önlem almak gerekir.",
  },
  {
    tur: "siralama",
    baslik: "🔴 Faktöriyel şeması",
    gorev: "Faktöriyel hesaplayan akış şemasının kutularını sıraya diz.",
    adimlar: ["Başla", "n sayısını al", "sonuc = 1", "i = 1", "i <= n ?", "sonuc = sonuc * i", "i = i + 1", "n! değerini yaz", "Bitir"],
  },
  {
    tur: "ipucu",
    renk: "bilgi",
    baslik: "Kendin çiz",
    icerik: `Akış Şeması Aracı'nda şu şemaları çizip çalıştır:

1. 🟢 Bir öğrencinin iki sınav notunun ortalamasını yazan şema.
2. 🟡 Girilen sayı 10'dan büyükse “Büyük”, değilse “Küçük ya da eşit” yazan; ardından her durumda sayının iki katını yazan şema.
3. 🔴 Kullanıcıdan bir n sayısı alıp 1'den n'ye kadar olan sayıların **karelerini** (1, 4, 9, 16…) yazan şema.`,
  },
];

export default bloklar;
