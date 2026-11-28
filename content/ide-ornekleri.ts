// IDE'deki "Örnek programlar" menüsünde listelenen hazır programlar (kolaydan zora).
// Yeni örnek eklemek için listeye ekleyin. `deneme` girdileri yalnızca otomatik testte kullanılır.

export type Seviye = "Kolay" | "Orta" | "Zor";
export type IdeOrnegi = { ad: string; dosya: string; seviye: Seviye; kod: string; deneme?: string[] };

export const ideOrnekleri: IdeOrnegi[] = [
  // ---------------- Kolay ----------------
  {
    ad: "Merhaba",
    dosya: "merhaba.py",
    seviye: "Kolay",
    kod: `ad = input("Adın ne? ")
print("Merhaba", ad + "!")
print("Programlama Temelleri'ne hoş geldin.")
`,
    deneme: ["Deniz"],
  },
  {
    ad: "İki sayının toplamı",
    dosya: "toplama.py",
    seviye: "Kolay",
    kod: `a = int(input("1. sayı: "))
b = int(input("2. sayı: "))
toplam = a + b
print(a, "+", b, "=", toplam)
`,
    deneme: ["12", "30"],
  },
  {
    ad: "Dikdörtgenin alanı ve çevresi",
    dosya: "dikdortgen.py",
    seviye: "Kolay",
    kod: `kisa = float(input("Kısa kenar: "))
uzun = float(input("Uzun kenar: "))
alan = kisa * uzun
cevre = 2 * (kisa + uzun)
print("Alan:", alan)
print("Çevre:", cevre)
`,
    deneme: ["4", "7"],
  },
  {
    ad: "Sıcaklık dönüştürücü",
    dosya: "sicaklik.py",
    seviye: "Kolay",
    kod: `c = float(input("Sıcaklık (°C): "))
f = c * 1.8 + 32
k = c + 273.15
print("Fahrenheit:", round(f, 1))
print("Kelvin:", round(k, 2))
`,
    deneme: ["25"],
  },
  {
    ad: "Yaş hesaplama",
    dosya: "yas.py",
    seviye: "Kolay",
    kod: `dogum_yili = int(input("Doğum yılın: "))
bu_yil = 2026
yas = bu_yil - dogum_yili
print("Bu yıl", yas, "yaşına giriyorsun.")
if yas < 18:
    print("18 yaşına", 18 - yas, "yıl kaldı.")
else:
    print("18 yaşını geçtin.")
`,
    deneme: ["2011"],
  },
  {
    ad: "Tek mi, çift mi?",
    dosya: "tek_mi_cift_mi.py",
    seviye: "Kolay",
    kod: `sayi = int(input("Bir sayı gir: "))
if sayi % 2 == 0:
    print(sayi, "çift sayıdır.")
else:
    print(sayi, "tek sayıdır.")
`,
    deneme: ["17"],
  },
  {
    ad: "Geri sayım",
    dosya: "geri_sayim.py",
    seviye: "Kolay",
    kod: `import time

sayi = int(input("Kaçtan geri sayalım? "))
while sayi > 0:
    print(sayi)
    time.sleep(1)
    sayi = sayi - 1
print("Kalkış!")
`,
    deneme: ["3"],
  },

  // ---------------- Orta ----------------
  {
    ad: "Hesap makinesi",
    dosya: "hesap_makinesi.py",
    seviye: "Orta",
    kod: `sayi_1 = float(input("1. sayı: "))
islem = input("İşlem (+, -, *, /): ")
sayi_2 = float(input("2. sayı: "))

if islem == "+":
    print("Sonuç:", sayi_1 + sayi_2)
elif islem == "-":
    print("Sonuç:", sayi_1 - sayi_2)
elif islem == "*":
    print("Sonuç:", sayi_1 * sayi_2)
elif islem == "/":
    if sayi_2 == 0:
        print("Sıfıra bölünemez!")
    else:
        print("Sonuç:", sayi_1 / sayi_2)
else:
    print("Geçersiz işlem!")
`,
    deneme: ["8", "/", "2"],
  },
  {
    ad: "Not ortalaması ve harf notu",
    dosya: "not_ortalamasi.py",
    seviye: "Orta",
    kod: `notlar = []
sayi = int(input("Kaç not gireceksin? "))

for i in range(sayi):
    puan = int(input(str(i + 1) + ". not: "))
    notlar.append(puan)

ortalama = sum(notlar) / len(notlar)
print("Notlar:", notlar)
print("Ortalama:", round(ortalama, 2))

if ortalama >= 85:
    print("Pekiyi (5)")
elif ortalama >= 70:
    print("İyi (4)")
elif ortalama >= 60:
    print("Orta (3)")
elif ortalama >= 50:
    print("Geçer (2)")
else:
    print("Geçmez (1)")
`,
    deneme: ["3", "70", "85", "92"],
  },
  {
    ad: "1'den n'ye kadar toplam",
    dosya: "toplam.py",
    seviye: "Orta",
    kod: `n = int(input("n: "))
toplam = 0
for i in range(1, n + 1):
    toplam = toplam + i
print("1'den", n, "sayısına kadar toplam:", toplam)

# Gauss'un formülüyle kontrol
print("Formülle:", n * (n + 1) // 2)
`,
    deneme: ["100"],
  },
  {
    ad: "Çarpım tablosu",
    dosya: "carpim_tablosu.py",
    seviye: "Orta",
    kod: `for i in range(1, 11):
    satir = ""
    for j in range(1, 11):
        satir = satir + str(i * j).rjust(4)
    print(satir)
`,
  },
  {
    ad: "Tek ve çift ayırıcı",
    dosya: "tek_cift.py",
    seviye: "Orta",
    kod: `liste = []
cift = []
tek = []

for i in range(5):
    sayi = int(input("Sayı girin: "))
    liste.append(sayi)
    if sayi % 2 == 0:
        cift.append(sayi)
    else:
        tek.append(sayi)

print("Liste:", liste)
print("Çift:", cift)
print("Tek:", tek)
`,
    deneme: ["4", "7", "10", "13", "22"],
  },
  {
    ad: "Sesli harf sayacı",
    dosya: "sesli_harf.py",
    seviye: "Orta",
    kod: `metin = input("Bir cümle yaz: ")
sesliler = "aeıioöuüAEIİOÖUÜ"
sesli = 0
sessiz = 0
for harf in metin:
    if harf in sesliler:
        sesli = sesli + 1
    elif harf.isalpha():
        sessiz = sessiz + 1
print("Sesli harf:", sesli)
print("Sessiz harf:", sessiz)
`,
    deneme: ["Python ile programlama öğreniyorum"],
  },
  {
    ad: "Yıldız üçgeni",
    dosya: "yildiz.py",
    seviye: "Orta",
    kod: `boy = int(input("Üçgenin boyu: "))
for i in range(1, boy + 1):
    print(" " * (boy - i) + "*" * (2 * i - 1))
`,
    deneme: ["5"],
  },

  // ---------------- Zor ----------------
  {
    ad: "Sayı tahmin oyunu",
    dosya: "tahmin_oyunu.py",
    seviye: "Zor",
    kod: `import random

gizli = random.randint(1, 100)
deneme = 0
print("1 ile 100 arasında bir sayı tuttum. Bakalım bulabilecek misin?")

while True:
    tahmin = int(input("Tahminin: "))
    deneme = deneme + 1
    if tahmin < gizli:
        print("Daha büyük")
    elif tahmin > gizli:
        print("Daha küçük")
    else:
        print("Bildin!", deneme, "denemede buldun.")
        break
`,
  },
  {
    ad: "Faktöriyel",
    dosya: "faktoriyel.py",
    seviye: "Zor",
    kod: `n = int(input("Bir sayı: "))
if n < 0:
    print("Negatif sayıların faktöriyeli yoktur.")
else:
    sonuc = 1
    for i in range(1, n + 1):
        sonuc = sonuc * i
    print(str(n) + "! =", sonuc)
`,
    deneme: ["10"],
  },
  {
    ad: "Asal sayı mı?",
    dosya: "asal.py",
    seviye: "Zor",
    kod: `sayi = int(input("Bir sayı: "))
asal = sayi > 1
bolen = 2
while bolen * bolen <= sayi:
    if sayi % bolen == 0:
        asal = False
        print(sayi, "sayısı", bolen, "ile bölünüyor.")
        break
    bolen = bolen + 1

if asal:
    print(sayi, "asal sayıdır.")
else:
    print(sayi, "asal değildir.")
`,
    deneme: ["97"],
  },
  {
    ad: "Fibonacci dizisi",
    dosya: "fibonacci.py",
    seviye: "Zor",
    kod: `adet = int(input("Kaç terim? "))
a = 0
b = 1
dizi = []
for i in range(adet):
    dizi.append(a)
    yeni = a + b
    a = b
    b = yeni
print(dizi)
`,
    deneme: ["12"],
  },
  {
    ad: "Palindrom kontrolü",
    dosya: "palindrom.py",
    seviye: "Zor",
    kod: `kelime = input("Bir kelime: ").lower()
ters = ""
for harf in kelime:
    ters = harf + ters
print("Tersi:", ters)
if kelime == ters:
    print("Bu kelime bir palindromdur (tersten de aynı okunur).")
else:
    print("Bu kelime palindrom değil.")
`,
    deneme: ["kabak"],
  },
  {
    ad: "Alışveriş listesi (menü)",
    dosya: "alisveris_listesi.py",
    seviye: "Zor",
    kod: `liste = []
while True:
    print()
    print("1: Ekle  2: Sil  3: Listele  4: Çıkış")
    secim = input("Seçimin: ")
    if secim == "1":
        urun = input("Ürün: ")
        liste.append(urun)
        print(urun, "eklendi.")
    elif secim == "2":
        urun = input("Silinecek ürün: ")
        if urun in liste:
            liste.remove(urun)
            print(urun, "silindi.")
        else:
            print(urun, "listede yok.")
    elif secim == "3":
        if len(liste) == 0:
            print("Liste boş.")
        for i in range(len(liste)):
            print(str(i + 1) + ".", liste[i])
    elif secim == "4":
        print("Görüşmek üzere!")
        break
    else:
        print("Geçersiz seçim.")
`,
    deneme: ["1", "ekmek", "1", "süt", "3", "2", "ekmek", "3", "4"],
  },
];
