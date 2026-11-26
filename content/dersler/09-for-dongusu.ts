import type { Ders } from "../tipler";
import { donguAkis } from "../akis";

const carpimTablosu = (n: number) =>
  Array.from({ length: 10 }, (_, i) => `${n} x ${i + 1} = ${n * (i + 1)}`).join("\n");

const ders: Ders = {
  slug: "for-dongusu",
  sira: 9,
  baslik: "Döngü Yapıları: for",
  ozet: "Tekrar eden işleri bilgisayara yaptır: for döngüsü, range() ve toplam biriktirme.",
  simge: "🔁",
  sure: "2 × 40 dk",
  kitap: "3.5 Döngü Yapıları · 3.5.1 For Döngüsü · s. 110–111",
  hedefler: [
    "Döngü yapılarının neden kullanıldığını açıklayabilmek",
    "for döngüsü ve range() ile belirli sayıda tekrar yapabilmek",
    "range() fonksiyonunun başlangıç, bitiş ve artış değerlerini kullanabilmek",
    "Döngüde toplam biriktirebilmek",
  ],
  ogretmenNotu: `
- Önce döngüsüz yazdırın: “Programlama” kelimesini 5 kez yazmak için 5 satır \`print\`. Sonra 100 kez yazmak gerekse? Döngünün sağladığı **kod sadeliğini** vurgulayın.
- \`range(5)\` sayılarını tahtaya yazın: 0, 1, 2, 3, 4. Kitaptaki kenar notu: “Ayraçlar içinde belirtilen sayı döngüye dâhil edilmez.”
- **İz sürme tablosu**: 18. Örnek için tahtaya \`sayi\` ve \`sonuc\` sütunları çizip adım adım doldurun.
- Ünite sonu **8. soru** sitede alıştırma olarak var. Kitaptaki kodda hem boşluklar hem de \`%2!=0\` hatası bulunuyor.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Neden döngü?

Ekrana 5 kez “Programlama” yazdırmak için 5 satır \`print\` yazabilirsin. Peki 100 kez gerekirse? 1000 kez?

Komutları tekrar tekrar yazmak yerine **bir kez yazıp istediğimiz kadar çalıştırmamızı** sağlayan yapılara **döngü yapıları** denir. Döngüler:
- gereksiz satırları ortadan kaldırır, kodu **sadeleştirir**,
- programcının iş yükünü azaltır,
- istenen sonuca daha hızlı ulaşmayı sağlar.

En yaygın kullanılan iki döngü **for** ve **while** döngüleridir. Bu derste **for** döngüsünü öğreneceğiz.
`,
    },
    {
      tur: "metin",
      icerik: `
## for döngüsü

**for** [*for*, için] döngüsünde tekrar sayısı **en başta** belirlenir. Python'da genellikle **range** [*reync*, aralık] ile kullanılır:

\`\`\`python
for i in range(5):
    tekrarlanacak işlem
\`\`\`

Bu satır şunu söyler: “**i** değişkeni sırayla 0, 1, 2, 3, 4 değerlerini alsın ve her seferinde içerideki işlemi yap.”

- \`i\`'ye **sayaç** denir. Sayaç adı olarak genellikle **i** ve **j** kullanılır.
- \`for\` satırı **iki nokta** \`:\` ile biter, tekrarlanacak satırlar **girintili** yazılır (tıpkı if gibi).
`,
    },
    { tur: "gorsel", svg: donguAkis, altyazi: "Döngü yapısının akış diyagramı (Kitap, Görsel 3.10)" },
    {
      tur: "ornek",
      baslik: "Kitap 17. Örnek: 5 kez “Programlama”",
      kod: `for i in range(5):
    print("Programlama")`,
    },
    {
      tur: "ornek",
      baslik: "Sayacın değerini görelim",
      kod: `for i in range(5):
    print("Tur numarası:", i)
print("Döngü bitti.")`,
      aciklama: "Son satır girintisiz olduğu için döngünün dışında; sadece bir kez, döngü bitince çalışır.",
    },
    {
      tur: "metin",
      icerik: `
## range() ile aralık belirlemek

\`range(başlangıç, bitiş, artış)\` şeklinde üç değer alabilir (Kitap, Tablo 3.8):

| Yazım | Ürettiği sayılar | Açıklama |
|---|---|---|
| \`range(5)\` | 0, 1, 2, 3, 4 | Başlangıç verilmezse **0'dan** başlar |
| \`range(1, 6)\` | 1, 2, 3, 4, 5 | **Bitiş değeri dâhil değildir!** |
| \`range(0, 10, 2)\` | 0, 2, 4, 6, 8 | İkişer ikişer artar |
| \`range(10, 0, -1)\` | 10, 9, 8, …, 1 | Geriye doğru sayar |
`,
    },
    {
      tur: "soru",
      soru: "`range(5, 0, -1)` hangi sayıları üretir?",
      secenekler: ["5 4 3 2 1", "5 4 3 2 1 0", "0 1 2 3 4 5", "1 2 3 4 5"],
      dogru: 0,
      aciklama: "5'ten başlar ve birer birer **azalır**. Bitiş değeri olan 0 dâhil değildir: 5, 4, 3, 2, 1.",
    },
    {
      tur: "soru",
      soru: "`for i in range(3, 8):` döngüsü kaç kez döner?",
      secenekler: ["3", "5", "6", "8"],
      dogru: 1,
      aciklama: "range(3, 8) → 3, 4, 5, 6, 7. Toplam **5** sayı (bitiş − başlangıç = 8 − 3 = 5).",
    },
    {
      tur: "soru",
      soru: "Bu kod ekrana hangi sayıları yazar?",
      kod: `for i in range(2, 10, 3):
    print(i)`,
      secenekler: ["2 5 8", "2 5 8 11", "3 6 9", "2 3 4 5 6 7 8 9"],
      dogru: 0,
      aciklama: "2'den başlar, 3'er artar: 2, 5, 8. Bir sonraki 11 olurdu ama bitiş değeri 10'u geçtiği için döngü durur.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "for i in range(3):\n    print(\"A\")\nprint(\"B\")",
      secenekler: ["A B A B A B", "A A A B", "A B", "A A A B B B"],
      dogru: 1,
      aciklama: "Sadece girintili `print(\"A\")` döngünün içinde, 3 kez çalışır. `print(\"B\")` girintisiz olduğu için döngü **bittikten sonra** bir kez çalışır.",
    },
    {
      tur: "metin",
      icerik: `
## Döngüde toplam biriktirmek

Döngülerin en yaygın kullanımlarından biri toplam **biriktirmektir**:
1. Döngüden **önce** boş bir kutu hazırla: \`sonuc = 0\`
2. Döngünün **içinde** her sayıyı kutuya ekle: \`sonuc = sonuc + sayi\`
3. Döngü **bittikten sonra** sonucu yazdır.
`,
    },
    {
      tur: "ornek",
      baslik: "Kitap 18. Örnek: 0'dan 10'a kadar sayıların toplamı",
      kod: `sonuc = 0
for sayi in range(11):
    sonuc = sonuc + sayi
print("Toplam=", sonuc)`,
      aciklama: "range(11) → 0'dan 10'a kadar (10 dâhil). Satır satır izle: sonuc 0, 1, 3, 6, 10, 15 … 55 olur.",
    },
    {
      tur: "ipucu",
      renk: "bilgi",
      baslik: "Kısa yazım",
      icerik: "`sonuc = sonuc + sayi` yerine kısaca `sonuc += sayi` yazabilirsin. Benzer şekilde `-=`, `*=` de vardır.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "carpim = 1\nfor i in range(1, 5):\n    carpim = carpim * i\nprint(carpim)",
      secenekler: ["10", "24", "120", "1 2 3 4"],
      dogru: 1,
      aciklama: "Bu sefer çarpım biriktiriyoruz; bu yüzden başlangıç **1** (0 olsaydı sonuç hep 0 olurdu!). 1 × 1 × 2 × 3 × 4 = **24**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k9-birden-ona",
        baslik: "1'den 10'a kadar say",
        gorev: "for döngüsü kullanarak 1'den 10'a kadar (10 dâhil) sayıları **alt alta** yazdır.",
        baslangicKodu: `# for döngüsü ile yaz\n`,
        testler: [{ beklenen: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" }],
        kodKurallari: [{ desen: "\\bfor\\b", mesaj: "Bu alıştırmada `for` döngüsü kullanmalısın." }],
        ipuclari: ["`range(1, 11)` 1'den 10'a kadar sayıları üretir.", "Döngünün içinde `print(i)`"],
        cozum: `for i in range(1, 11):
    print(i)`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k9-carpim",
        baslik: "Çarpım tablosu",
        gorev: `Kullanıcıdan bir sayı al ve o sayının 1'den 10'a kadar çarpım tablosunu yazdır. Kullanıcı 3 yazarsa:

\`\`\`
3 x 1 = 3
3 x 2 = 6
...
3 x 10 = 30
\`\`\``,
        baslangicKodu: `sayi = int(input("Hangi sayının çarpım tablosu? "))\n`,
        testler: [
          { girdiler: ["3"], beklenen: carpimTablosu(3) },
          { girdiler: ["9"], beklenen: carpimTablosu(9) },
        ],
        kodKurallari: [{ desen: "\\bfor\\b", mesaj: "Bu alıştırmada `for` döngüsü kullanmalısın." }],
        ipuclari: ["`for i in range(1, 11):`", 'Virgüllerle: `print(sayi, "x", i, "=", sayi * i)`'],
        cozum: `sayi = int(input("Hangi sayının çarpım tablosu? "))
for i in range(1, 11):
    print(sayi, "x", i, "=", sayi * i)`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k9-cift-toplam",
        baslik: "Ünite sonu 8. soru: Çift sayıların toplamı",
        gorev: `Kullanıcıdan bir **sınır sayısı** alan program, 0'dan başlayarak o sayıya kadar (sınır **dâhil**) olan **çift** sayıların toplamını yazmalı. Sınır 10 ise 0+2+4+6+8+10:

\`\`\`
Çift sayıların toplamı: 30
\`\`\`

Kodda **boşluklar (...)** ve **bir hata** var. Doldur ve düzelt.`,
        baslangicKodu: `sonuc = 0
sinir = ...(...("Sınır için bir sayı giriniz: "))
for sayi in range(...):
    if ... % 2 != 0:
        sonuc = ... + ...
print("...", ...)
`,
        testler: [
          { girdiler: ["10"], beklenen: "Çift sayıların toplamı: 30" },
          { girdiler: ["7"], beklenen: "Çift sayıların toplamı: 12" },
          { girdiler: ["1"], beklenen: "Çift sayıların toplamı: 0" },
        ],
        ipuclari: [
          "Sınır dâhil olsun diye: `range(sinir + 1)`",
          "`% 2 != 0` tek sayıları bulur. Çift sayılar için hangi karşılaştırma gerekir?",
          'Son satır: `print("Çift sayıların toplamı:", sonuc)` — girintisiz olmalı, yoksa her turda yazar.',
        ],
        cozum: `sonuc = 0
sinir = int(input("Sınır için bir sayı giriniz: "))
for sayi in range(sinir + 1):
    if sayi % 2 == 0:
        sonuc = sonuc + sayi
print("Çift sayıların toplamı:", sonuc)`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **Döngü yapıları**, tekrarlı yazılması gereken komutları bir kez yazıp defalarca çalıştırmayı sağlar.
- **for döngüsünde** tekrar sayısı en başta belirlenir; Python'da \`range()\` ile kullanılır.
- \`range()\` başlangıç verilmezse 0'dan başlar; **bitiş değeri dâhil değildir**.
- Döngü ile kullanılan \`i\`, \`j\` gibi değişkenlere **sayaç** denir.`,
    },
  ],
};

export default ders;
