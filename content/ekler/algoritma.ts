import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Kolaydan zora: daha fazla algoritma

Şimdiye kadar gördüğün üç yapıyı (sıralı adımlar, karar, tekrar) bu bölümde **adım adım zorlaşan** örneklerle pekiştireceğiz. Her örnekte önce problemi okuyup **girdi, işlem ve çıktıyı** kendin bulmaya çalış, sonra algoritmayla karşılaştır.

| Seviye | Ne var? |
|---|---|
| 🟢 Kolay | Yalnızca sıralı adımlar |
| 🟡 Orta | Bir ya da birkaç karar |
| 🔴 Zor | Tekrar (döngü) ve karar bir arada |

### 🟢 Kolay 1: Telefonla arkadaşını aramak

1. Başla
2. Telefonun kilidini aç
3. Rehberi aç
4. Arkadaşının adını bul
5. Ara düğmesine bas
6. Bitir

Bu algoritmada **girdi** de **çıktı** da yok; sadece sırayla yapılan işlemler var. Yine de bir adımın yeri değişirse (ör. 5. adım 3. adımdan önce gelirse) algoritma çalışmaz. **Sıra önemlidir.**

### 🟢 Kolay 2: Celsius'tan Fahrenheit'a

Hava durumu uygulamaları sıcaklığı iki farklı birimle gösterebilir. Dönüşüm formülü: **F = C × 1,8 + 32**

- **Girdi:** C (Celsius sıcaklık)
- **İşlem:** F = C × 1,8 + 32
- **Çıktı:** F

1. Başla
2. C sıcaklığını al
3. F = C × 1,8 + 32 hesapla
4. F'yi ekrana yaz
5. Bitir

**Deneme:** C = 25 ise F = 25 × 1,8 + 32 = 45 + 32 = **77** olur.
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Celsius'tan Fahrenheit'a (Python)",
    aciklama: "Algoritmanın her adımı bir satıra dönüştü. Girdiler kutusundaki değeri değiştirip yeniden çalıştır.",
    kod: `c = float(input("Sıcaklık (°C): "))   # 2. adım: girdi
f = c * 1.8 + 32                       # 3. adım: işlem
print("Fahrenheit:", f)                # 4. adım: çıktı`,
    girdiler: ["25"],
  },
  {
    tur: "metin",
    icerik: `
### 🟢 Kolay 3: Bir ürünün KDV'li fiyatı

Bir ürünün vergisiz fiyatına %20 KDV eklenecek.

1. Başla
2. Fiyatı al
3. kdv = fiyat × 20 / 100
4. toplam = fiyat + kdv
5. kdv ve toplamı ekrana yaz
6. Bitir

**Deneme:** fiyat = 150 → kdv = 30 → toplam = **180**.

> Bu algoritmada **iki ara sonuç** var: önce kdv bulunuyor, sonra o değer toplamda kullanılıyor. Bir adımda hesaplanan değeri sonraki adımda kullanmak çok sık yapılır.
`,
  },
  {
    tur: "soru",
    soru: "KDV algoritmasında 3. ve 4. adımların yeri değiştirilirse ne olur?",
    secenekler: [
      "Hiçbir şey değişmez",
      "toplam hesaplanırken kdv henüz bilinmediği için yanlış sonuç çıkar",
      "Fiyat iki kez alınır",
      "Algoritma daha hızlı çalışır",
    ],
    dogru: 1,
    aciklama: "4. adım (toplam = fiyat + kdv) kdv değerine ihtiyaç duyar. kdv henüz hesaplanmadıysa toplam yanlış çıkar. Bir değeri **kullanmadan önce hesaplamak** gerekir.",
  },
  {
    tur: "metin",
    icerik: `
### 🟡 Orta 1: Pozitif, negatif ya da sıfır

Bir sayının işaretini bulan algoritma. Burada **iki karar** art arda geliyor:

1. Başla
2. Sayıyı al
3. Sayı 0'dan büyük mü?
   - Evet ise "Pozitif" yaz, 6. adıma git
4. Sayı 0'dan küçük mü?
   - Evet ise "Negatif" yaz, 6. adıma git
5. "Sıfır" yaz
6. Bitir

| Girdi | 3. adım | 4. adım | Çıktı |
|---|---|---|---|
| 7 | Evet | (sorulmaz) | Pozitif |
| -3 | Hayır | Evet | Negatif |
| 0 | Hayır | Hayır | Sıfır |

> İkinci soru yalnızca birinci sorunun cevabı **Hayır** olduğunda sorulur. Kararlar böyle zincir gibi bağlanabilir.

### 🟡 Orta 2: Bilet fiyatı

Bir sinemada 12 yaşından küçükler 60 TL, diğerleri 100 TL ödüyor. Çarşamba günleri herkese 20 TL indirim var.

1. Başla
2. Yaşı ve günü al
3. Yaş 12'den küçük mü?
   - Evet ise fiyat = 60
   - Hayır ise fiyat = 100
4. Gün "Çarşamba" mı?
   - Evet ise fiyat = fiyat − 20
5. Fiyatı yaz
6. Bitir

**Deneme:** 10 yaş, Çarşamba → fiyat = 60 → 60 − 20 = **40**. 15 yaş, Cuma → **100**.

Bu örnekte iki karar **bağımsızdır**: ilk karar fiyatı belirler, ikinci karar (Hayır olsa bile) algoritmanın sonraki adımına geçer.
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Bilet fiyatı (Python)",
    aciklama: "Girdileri değiştir: önce 15 ve Cuma, sonra 10 ve Çarşamba dene.",
    kod: `yas = int(input("Yaşın: "))
gun = input("Gün: ")
if yas < 12:
    fiyat = 60
else:
    fiyat = 100
if gun == "Çarşamba":
    fiyat = fiyat - 20
print("Bilet fiyatı:", fiyat, "TL")`,
    girdiler: ["10", "Çarşamba"],
  },
  {
    tur: "soru",
    soru: "Bilet algoritmasında **25 yaşındaki** biri **Çarşamba** günü kaç TL öder?",
    secenekler: ["60 TL", "80 TL", "100 TL", "40 TL"],
    dogru: 1,
    aciklama: "25 < 12 değil → fiyat = 100. Gün Çarşamba → 100 − 20 = **80 TL**.",
  },
  {
    tur: "metin",
    icerik: `
### 🔴 Zor 1: En büyük sayıyı bulmak

Kullanıcı 5 sayı girecek; algoritma bunların en büyüğünü bulacak. Hepsini aynı anda aklımızda tutmak yerine **şimdiye kadarki en büyüğü** bir değişkende saklarız:

1. Başla
2. İlk sayıyı al, enBuyuk = sayi
3. sayac = 1
4. sayac < 5 olduğu sürece tekrarla:
   - Yeni sayıyı al
   - sayi > enBuyuk ise enBuyuk = sayi
   - sayac = sayac + 1
5. enBuyuk'u yaz
6. Bitir

**İz sürme** (girdiler: 4, 9, 2, 11, 7):

| Tur | Alınan sayı | sayi > enBuyuk ? | enBuyuk |
|---|---|---|---|
| başlangıç | 4 | — | 4 |
| 1 | 9 | Evet | 9 |
| 2 | 2 | Hayır | 9 |
| 3 | 11 | Evet | 11 |
| 4 | 7 | Hayır | 11 |

Sonuç: **11**. Bu örnekte **döngünün içinde bir karar** var; ileride Python'da da tam olarak böyle yazacağız.

### 🔴 Zor 2: Sayı tahmin oyunu

Bilgisayar 1–100 arasında bir sayı tutar; kullanıcı bulana kadar tahmin eder. Her yanlış tahminde “Daha büyük” ya da “Daha küçük” ipucu verilir ve sonunda kaç denemede bulunduğu yazılır.

1. Başla
2. gizli = 1–100 arası bir sayı, deneme = 0
3. Tahmini al, deneme = deneme + 1
4. tahmin == gizli mi?
   - Evet ise 6. adıma git
5. tahmin < gizli ise "Daha büyük", değilse "Daha küçük" yaz, 3. adıma dön
6. "Bildin!" ve deneme sayısını yaz
7. Bitir

Bu algoritmada döngünün **kaç kez döneceği önceden belli değil**; kullanıcı doğru sayıyı bulunca döngü biter.
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: En büyük sayı (Python)",
    aciklama: "Algoritmadaki her adımın Python'daki karşılığını bul. Girdiler kutusundaki 5 sayıyı değiştirip dene. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `sayi = int(input("1. sayı: "))
en_buyuk = sayi
sayac = 1
while sayac < 5:
    sayi = int(input(str(sayac + 1) + ". sayı: "))
    if sayi > en_buyuk:
        en_buyuk = sayi
    sayac = sayac + 1
print("En büyük:", en_buyuk)`,
    girdiler: ["4", "9", "2", "11", "7"],
  },
  {
    tur: "soru",
    soru: "En büyük sayı algoritmasına sırayla **-5, -2, -8, -1, -9** girilirse sonuç ne olur?",
    secenekler: ["-9", "-1", "0", "-5"],
    dogru: 1,
    aciklama: "enBuyuk -5 ile başlar, -2 gelince -2 olur, -1 gelince -1 olur. Negatif sayılarda en büyük, sıfıra **en yakın** olandır: **-1**. enBuyuk'u 0 ile başlatsaydık yanlış olarak 0 bulurduk; bu yüzden ilk sayıyla başlatıyoruz.",
  },
  {
    tur: "siralama",
    baslik: "🔴 Sayı tahmin oyunu",
    gorev: "Sayı tahmin oyununun adımlarını doğru sıraya diz.",
    adimlar: [
      "Başla",
      "Bilgisayar 1–100 arasında bir sayı tutar",
      "Kullanıcının tahminini al",
      "Tahmin doğru mu? Değilse “Daha büyük” ya da “Daha küçük” yaz ve tahmin almaya dön",
      "“Bildin!” yaz",
      "Bitir",
    ],
  },
  {
    tur: "ipucu",
    renk: "bilgi",
    baslik: "Kendin dene",
    icerik: `Aşağıdaki problemlerin algoritmasını defterine yaz, sonra bir arkadaşınla değiştirip birbirinizin algoritmasını **iz sürerek** test edin:

1. 🟢 Bir kenarı verilen karenin alanını ve çevresini bulan algoritma.
2. 🟡 Girilen yaşa göre “Çocuk” (0–12), “Genç” (13–17) ya da “Yetişkin” (18 ve üzeri) yazan algoritma.
3. 🔴 1'den 100'e kadar olan sayılardan **3'e bölünebilenlerin** kaç tane olduğunu sayan algoritma.`,
  },
];

export default bloklar;
