import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: dizilerle kullanışlı komutlar

Python'da dizilere **liste** de denir. Listelerle çok sık kullanılan komutlar:

| Komut | Ne yapar? | Örnek (notlar = [70, 85, 60]) |
|---|---|---|
| \`len(liste)\` | Eleman sayısı | \`3\` |
| \`sum(liste)\` | Elemanların toplamı | \`215\` |
| \`max(liste)\` | En büyük eleman | \`85\` |
| \`min(liste)\` | En küçük eleman | \`60\` |
| \`liste.append(x)\` | Sona x ekler | \`[70, 85, 60, x]\` |
| \`liste.remove(x)\` | x değerini siler | |
| \`liste.sort()\` | Küçükten büyüğe sıralar | \`[60, 70, 85]\` |
| \`x in liste\` | x listede var mı? | \`85 in notlar\` → \`True\` |

> **Son eleman** her zaman \`liste[-1]\` ya da \`liste[len(liste) - 1]\`'dir. \`liste[len(liste)]\` yazarsan hata alırsın; çünkü indisler 0'dan başlar.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Sınıf listesi",
    aciklama: "İlk, son ve belirli bir sıradaki öğrenciye indisle ulaşıyoruz.",
    kod: `sinif = ["Ali", "Ayşe", "Can", "Deniz", "Ece"]
print("İlk öğrenci:", sinif[0])
print("Üçüncü öğrenci:", sinif[2])
print("Son öğrenci:", sinif[-1])
print("Sınıf mevcudu:", len(sinif))`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Hazır komutlar",
    aciklama: "sum, max, min ve len ile tek satırda istatistik.",
    kod: `notlar = [70, 85, 60, 95, 78]
print("Toplam:", sum(notlar))
print("En yüksek:", max(notlar))
print("En düşük:", min(notlar))
print("Ortalama:", sum(notlar) / len(notlar))`,
  },
  {
    tur: "soru",
    soru: "`renkler = [\"kırmızı\", \"mavi\", \"yeşil\", \"sarı\"]` için `renkler[len(renkler) - 2]` nedir?",
    secenekler: ["mavi", "yeşil", "sarı", "Hata verir"],
    dogru: 1,
    aciklama: "len(renkler) = 4, 4 − 2 = 2. renkler[2] = **yeşil** (0: kırmızı, 1: mavi, 2: yeşil).",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Alışveriş listesi",
    aciklama: "Eleman ekleyip silerek listeyi güncelliyoruz; in ile bir elemanın listede olup olmadığına bakıyoruz. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `liste = ["ekmek", "süt"]
liste.append("yumurta")
liste.append("peynir")
print(liste)
liste.remove("süt")
print(liste)
print("Peynir var mı?", "peynir" in liste)
print("Süt var mı?", "süt" in liste)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Sıralama",
    aciklama: "sort() listeyi kalıcı olarak sıralar. Metinler alfabetik sıralanır.",
    kod: `yaslar = [15, 9, 42, 31, 7]
yaslar.sort()
print(yaslar)
isimler = ["Zeynep", "Ahmet", "Mert", "Buse"]
isimler.sort()
print(isimler)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Kullanıcıdan liste oluşturmak",
    aciklama: "Boş bir listeyle başlayıp kullanıcının girdiği sayıları append ile ekliyoruz.",
    kod: `sayilar = []
sayilar.append(int(input("1. sayı: ")))
sayilar.append(int(input("2. sayı: ")))
sayilar.append(int(input("3. sayı: ")))
print("Liste:", sayilar)
print("En büyük ile en küçük arasındaki fark:", max(sayilar) - min(sayilar))`,
    girdiler: ["12", "45", "7"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Ortadaki eleman (medyan)",
    aciklama: "Tek sayıda elemanı olan sıralı bir listenin ortadaki elemanına medyan denir. Ortadaki indis len // 2 ile bulunur.",
    kod: `boylar = [162, 175, 158, 181, 169]
boylar.sort()
print("Sıralı:", boylar)
orta = len(boylar) // 2
print("Medyan:", boylar[orta])`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Liste dışına çıkmak",
    aciklama: "3 elemanlı listenin indisleri 0, 1, 2'dir. 3. indis yoktur.",
    kod: `meyveler = ["elma", "armut", "kiraz"]
print(meyveler[3])`,
    hataBekleniyor: true,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k6-istatistik",
      baslik: "🟡 Orta: Sıcaklık istatistiği",
      gorev: `\`sicakliklar = [18, 22, 25, 19, 16, 21, 24]\` bir haftanın sıcaklıkları. Haftanın en yüksek, en düşük ve ortalama sıcaklığını yazdır:

\`\`\`
En yüksek: 25
En düşük: 16
Ortalama: 20.714285714285715
\`\`\``,
      baslangicKodu: `sicakliklar = [18, 22, 25, 19, 16, 21, 24]\n`,
      testler: [{ beklenen: "En yüksek: 25\nEn düşük: 16\nOrtalama: 20.714285714285715" }],
      kodKurallari: [{ desen: "max\\(", mesaj: "En yüksek değer için max() kullan." }],
      ipuclari: ["max(sicakliklar), min(sicakliklar)", "Ortalama: sum(sicakliklar) / len(sicakliklar)"],
      cozum: `sicakliklar = [18, 22, 25, 19, 16, 21, 24]
print("En yüksek:", max(sicakliklar))
print("En düşük:", min(sicakliklar))
print("Ortalama:", sum(sicakliklar) / len(sicakliklar))`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k6-takim",
      baslik: "🔴 Zor: Takım listesi",
      gorev: `\`takim = ["Ece", "Berk", "Selin"]\` listesiyle başla. Sırayla:

1. Kullanıcıdan bir isim al ve listeye ekle.
2. "Berk" takımdan ayrıldı: onu listeden sil.
3. Listeyi alfabetik sırala ve yazdır.
4. Takımda kaç kişi olduğunu yazdır.

Kullanıcı **Can** girerse çıktı:
\`\`\`
['Can', 'Ece', 'Selin']
Takımda 3 kişi var.
\`\`\``,
      baslangicKodu: `takim = ["Ece", "Berk", "Selin"]\n`,
      testler: [
        { girdiler: ["Can"], beklenen: "['Can', 'Ece', 'Selin']\nTakımda 3 kişi var." },
        { girdiler: ["Zehra"], beklenen: "['Ece', 'Selin', 'Zehra']\nTakımda 3 kişi var." },
      ],
      ipuclari: ["takim.append(input(\"İsim: \"))", "takim.remove(\"Berk\"), sonra takim.sort()"],
      cozum: `takim = ["Ece", "Berk", "Selin"]
takim.append(input("İsim: "))
takim.remove("Berk")
takim.sort()
print(takim)
print("Takımda", len(takim), "kişi var.")`,
    },
  },
];

export default bloklar;
