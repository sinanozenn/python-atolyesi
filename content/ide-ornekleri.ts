// IDE'deki "Örnekler" menüsünde listelenen hazır programlar. Yeni örnek eklemek için listeye ekleyin.

export type IdeOrnegi = { ad: string; dosya: string; kod: string };

export const ideOrnekleri: IdeOrnegi[] = [
  {
    ad: "Merhaba",
    dosya: "merhaba.py",
    kod: `ad = input("Adın ne? ")
print("Merhaba", ad + "!")
print("Python Atölyesi'ne hoş geldin.")
`,
  },
  {
    ad: "Hesap makinesi",
    dosya: "hesap_makinesi.py",
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
    print("Tanımlı işlem giriniz!")
`,
  },
  {
    ad: "Sayı tahmin oyunu",
    dosya: "tahmin_oyunu.py",
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
    ad: "Çarpım tablosu",
    dosya: "carpim_tablosu.py",
    kod: `for i in range(1, 11):
    satir = ""
    for j in range(1, 11):
        satir = satir + str(i * j).rjust(4)
    print(satir)
`,
  },
  {
    ad: "Not ortalaması",
    dosya: "not_ortalamasi.py",
    kod: `notlar = []
sayi = int(input("Kaç not gireceksin? "))

for i in range(sayi):
    puan = int(input(str(i + 1) + ". not: "))
    notlar.append(puan)

ortalama = sum(notlar) / len(notlar)
print("Notlar:", notlar)
print("Ortalama:", ortalama)

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
  },
  {
    ad: "Tek ve çift ayırıcı",
    dosya: "tek_cift.py",
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
  },
  {
    ad: "Yıldız üçgeni",
    dosya: "yildiz.py",
    kod: `boy = int(input("Üçgenin boyu: "))
for i in range(1, boy + 1):
    print(" " * (boy - i) + "*" * (2 * i - 1))
`,
  },
  {
    ad: "Geri sayım",
    dosya: "geri_sayim.py",
    kod: `import time

sayi = int(input("Kaçtan geri sayalım? "))
while sayi > 0:
    print(sayi)
    time.sleep(1)
    sayi = sayi - 1
print("Kalkış!")
`,
  },
];
