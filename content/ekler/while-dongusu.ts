import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: for mu, while mı?

| Durum | Hangisi? | Örnek |
|---|---|---|
| Tekrar sayısı **önceden belli** | \`for\` | 10 kez yaz, listedeki her eleman için… |
| Tekrar bir **koşula bağlı**, kaç kez süreceği belli değil | \`while\` | Doğru şifre girilene kadar, para bitene kadar… |

Bir while döngüsünün doğru çalışması için üç şey gerekir:

1. **Başlangıç:** Koşulda kullanılan değişken döngüden **önce** bir değer almalı.
2. **Koşul:** Her turun başında kontrol edilir; yanlış olunca döngü biter.
3. **Değişim:** Döngünün içinde koşuldaki değişken **değişmeli**. Değişmezse döngü hiç bitmez (sonsuz döngü).

\`\`\`python
i = 1              # 1. başlangıç
while i <= 5:      # 2. koşul
    print(i)
    i = i + 1      # 3. değişim
\`\`\`

**while True ve break:** Bazen koşulu döngünün ortasında kontrol etmek daha kolaydır. \`while True:\` hiç bitmeyen bir döngü kurar, \`break\` ise döngüden çıkar.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: İkişer ikişer",
    aciklama: "Değişim adımı 2 olunca çift sayılar yazılır. Başlangıcı 1 yaparak tek sayıları dene.",
    kod: `i = 2
while i <= 20:
    print(i)
    i = i + 2`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Para bitene kadar",
    aciklama: "Her gün 35 TL harcanıyor. Para yetmeyene kadar döngü devam ediyor.",
    kod: `para = 200
gun = 0
while para >= 35:
    para = para - 35
    gun = gun + 1
    print(str(gun) + ". gün sonunda kalan:", para)
print("Para", gun, "gün yetti.")`,
  },
  {
    tur: "soru",
    soru: "Aşağıdaki döngü kaç kez döner?",
    kod: `x = 100
while x > 10:
    x = x // 2`,
    secenekler: ["3", "4", "5", "Sonsuz"],
    dogru: 0,
    aciklama: "x: 100 → 50 → 25 → 12 → **6**. 12 > 10 olduğu için 3. tur da çalışır ve x 6 olur; sonra 6 > 10 yanlış. Döngü **3** kez döner.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: 0 girilene kadar topla",
    aciklama: "Kullanıcı 0 girene kadar sayıları toplar. Kaç sayı gireceği belli olmadığı için while kullanılır.",
    kod: `toplam = 0
adet = 0
sayi = int(input("Sayı (bitirmek için 0): "))
while sayi != 0:
    toplam = toplam + sayi
    adet = adet + 1
    sayi = int(input("Sayı (bitirmek için 0): "))
print(adet, "sayı girdin, toplam:", toplam)`,
    girdiler: ["15", "8", "22", "0"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Geçerli girdi isteme",
    aciklama: "Kullanıcı 1–5 arasında bir puan girene kadar tekrar sorulur. Bu yöntem gerçek programlarda çok kullanılır.",
    kod: `puan = int(input("Filme 1-5 arası puan ver: "))
while puan < 1 or puan > 5:
    print("Geçersiz puan!")
    puan = int(input("Filme 1-5 arası puan ver: "))
print("Teşekkürler, puanın:", puan)`,
    girdiler: ["9", "0", "4"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Basamak sayısı",
    aciklama: "Bir sayıyı 10'a böldükçe son basamağı silinir. Sayı 0 olana kadar kaç kez bölündüğünü sayıyoruz.",
    kod: `sayi = int(input("Bir sayı: "))
basamak = 0
rakam_toplami = 0
while sayi > 0:
    rakam_toplami = rakam_toplami + sayi % 10
    sayi = sayi // 10
    basamak = basamak + 1
print("Basamak sayısı:", basamak)
print("Rakamları toplamı:", rakam_toplami)`,
    girdiler: ["90417"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Menü ile while True",
    aciklama: "Kullanıcı çıkış seçeneğini seçene kadar menü tekrar gösterilir. break döngüyü bitirir.",
    kod: `bakiye = 100
while True:
    secim = input("1: Bakiye  2: Para yatır  3: Çıkış → ")
    if secim == "1":
        print("Bakiyen:", bakiye)
    elif secim == "2":
        miktar = int(input("Miktar: "))
        bakiye = bakiye + miktar
        print("Yeni bakiye:", bakiye)
    elif secim == "3":
        print("Güle güle!")
        break
    else:
        print("Geçersiz seçim.")`,
    girdiler: ["1", "2", "50", "1", "3"],
  },
  {
    tur: "soru",
    soru: "Menü örneğinde `break` satırı silinirse ne olur?",
    secenekler: ["Program 3 seçilince normal biter", "3 seçilince “Güle güle!” yazılır ama menü tekrar gelir", "Program hiç başlamaz", "Hata verir"],
    dogru: 1,
    aciklama: "`while True` koşulu hiç yanlış olmaz; döngüden çıkmanın tek yolu `break`'tir. Silinirse “Güle güle!” yazılır ama döngü devam eder.",
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k10-ikiye-katla",
      baslik: "🟡 Orta: Kaç kez katlanır?",
      gorev: `Bir kâğıdın kalınlığı **1 birim**. Her katlamada kalınlık **ikiye katlanır**. Kullanıcıdan bir hedef kalınlık al ve kalınlık hedefe **ulaşana ya da geçene** kadar kaç kez katlanması gerektiğini yazdır. Kullanıcı 100 girerse:

\`\`\`
7 kez katlanmalı.
\`\`\`

(1 → 2 → 4 → 8 → 16 → 32 → 64 → 128)`,
      baslangicKodu: `hedef = int(input("Hedef kalınlık: "))\n`,
      testler: [
        { girdiler: ["100"], beklenen: "7 kez katlanmalı." },
        { girdiler: ["1000"], beklenen: "10 kez katlanmalı." },
        { girdiler: ["8"], beklenen: "3 kez katlanmalı." },
      ],
      kodKurallari: [{ desen: "\\bwhile\\b", mesaj: "Bu alıştırmada `while` döngüsü kullanmalısın." }],
      ipuclari: ["kalinlik = 1 ve sayac = 0 ile başla.", "while kalinlik < hedef: kalınlığı 2 ile çarp, sayacı 1 artır."],
      cozum: `hedef = int(input("Hedef kalınlık: "))
kalinlik = 1
sayac = 0
while kalinlik < hedef:
    kalinlik = kalinlik * 2
    sayac = sayac + 1
print(sayac, "kez katlanmalı.")`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k10-ortalama",
      baslik: "🔴 Zor: -1 girilene kadar not ortalaması",
      gorev: `Kullanıcı **-1** girene kadar not al. Sonra kaç not girildiğini, en yüksek notu ve ortalamayı yazdır. Kullanıcı 70, 90, 80, -1 girerse:

\`\`\`
3 not girildi.
En yüksek: 90
Ortalama: 80.0
\`\`\`

Hiç not girilmeden -1 girilirse yalnızca **Hiç not girilmedi.** yaz.`,
      baslangicKodu: `notu = int(input("Not (-1 ile bitir): "))\n`,
      testler: [
        { girdiler: ["70", "90", "80", "-1"], beklenen: "3 not girildi.\nEn yüksek: 90\nOrtalama: 80.0" },
        { girdiler: ["45", "-1"], beklenen: "1 not girildi.\nEn yüksek: 45\nOrtalama: 45.0" },
        { girdiler: ["-1"], beklenen: "Hiç not girilmedi." },
      ],
      kodKurallari: [{ desen: "\\bwhile\\b", mesaj: "Bu alıştırmada `while` döngüsü kullanmalısın." }],
      ipuclari: [
        "toplam = 0, adet = 0, en_yuksek = 0 ile başla.",
        "Döngüde: notu en_yuksek'ten büyükse en_yuksek = notu. Döngüden sonra adet == 0 mı diye kontrol et.",
      ],
      cozum: `notu = int(input("Not (-1 ile bitir): "))
toplam = 0
adet = 0
en_yuksek = 0
while notu != -1:
    toplam = toplam + notu
    adet = adet + 1
    if notu > en_yuksek:
        en_yuksek = notu
    notu = int(input("Not (-1 ile bitir): "))
if adet == 0:
    print("Hiç not girilmedi.")
else:
    print(adet, "not girildi.")
    print("En yüksek:", en_yuksek)
    print("Ortalama:", toplam / adet)`,
    },
  },
];

export default bloklar;
