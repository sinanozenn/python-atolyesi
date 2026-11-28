import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "dongu-ve-karar",
  sira: 11,
  baslik: "Döngü ve Karar Yapılarıyla Programlar",
  ozet: "Döngüleri, karar yapılarını ve dizileri birlikte kullanarak gerçek problemler çöz.",
  simge: "for if",
  sure: "2 × 40 dk",
  kitap: "3.6 Döngü ve Karar Yapıları ile Programlar · s. 113–117 (2. Etkinlik, 5. Uygulama)",
  hedefler: [
    "Bir problemi önce algoritma adımlarıyla tasarlayabilmek",
    "Döngü içinde karar yapısı kullanabilmek",
    "Döngü ile diziye veri ekleyip dizileri ayırabilmek",
    "Döngü kullanmanın kodu nasıl sadeleştirdiğini açıklayabilmek",
  ],
  ogretmenNotu: `
- Her alıştırmadan önce öğrencilere 5 dakika verip **algoritmasını yazdırın veya akış şemasını çizdirin**; sonra koda geçin.
- Aynı problemin döngüsüz çözümünü yazdırıp satır sayısını karşılaştırın.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Büyük resim

Artık programlamanın temel taşlarını biliyorsun: **operatörler, değişkenler, veri türleri, diziler, karar yapıları ve döngüler**. Gerçek programlar bunların **birlikte** kullanılmasıyla oluşur:

- **Karar yapıları** seçenekli işlemler oluşturur.
- **Döngü yapıları** tekrar eden adımları tek seferde yazmamızı sağlar.

### Önce düşün, sonra yaz: Algoritma

Bir problemi çözmeden önce adımlarını sırayla yazmaya **algoritma** denir. Örneğin “1'den 10'a kadar çift sayıları yazdır”:

1. Başla.
2. Sayaç \`i\`'yi 1'den 10'a kadar döndür.
3. Eğer \`i\` 2'ye tam bölünüyorsa \`i\`'yi yazdır.
4. Döngü bitince dur.
`,
    },
    {
      tur: "ornek",
      baslik: "Döngünün içinde karar",
      kod: `for i in range(1, 11):
    if i % 2 == 0:
        print(i, "çift")
    else:
        print(i, "tek")`,
      aciklama: "if bloğu for'un içinde olduğu için bir kat, print satırları ise iki kat içeriden yazılır.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "sayac = 0\nfor i in range(1, 11):\n    if i % 3 == 0:\n        sayac = sayac + 1\nprint(sayac)",
      secenekler: ["10", "3", "4", "18"],
      dogru: 1,
      aciklama: "1'den 10'a kadar 3'e bölünebilen sayılar: 3, 6, 9. Her birinde sayaç 1 artar: **3**.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "toplam = 0\nfor i in range(1, 6):\n    if i % 2 == 1:\n        toplam = toplam + i\nprint(toplam)",
      secenekler: ["15", "6", "9", "5"],
      dogru: 2,
      aciklama: "range(1, 6) → 1, 2, 3, 4, 5. Tek olanlar (2'ye bölümünden kalan 1): 1, 3, 5. Toplam: **9**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k11-bes",
        baslik: "Uygulama: 5 ile bölünebilen sayılar",
        gorev: `Bir yazılım firması iş başvurusu için şu programı istiyor:

- **0 ile 20** arasındaki (0 ve 20 dâhil) sayılardan **5 ile bölünebilenleri** alt alta yazdır,
- bu sayıların **karelerinin toplamını** en sona şöyle yazdır:

\`\`\`
0
5
10
15
20
5 ile bölünebilen sayıların karelerinin toplamı= 750
\`\`\`

**Önce algoritmayı düşün:** Toplam için bir değişken hazırla → 0'dan 20'ye döngü kur → sayı 5'e bölünüyorsa yazdır ve karesini toplama ekle → döngü bitince toplamı yazdır.`,
        baslangicKodu: `toplam = 0
`,
        testler: [{ beklenen: "0\n5\n10\n15\n20\n5 ile bölünebilen sayıların karelerinin toplamı= 750" }],
        kodKurallari: [
          { desen: "\\b(for|while)\\b", mesaj: "Firma şartı: program döngü kullanmalı." },
          { desen: "\\bif\\b", mesaj: "Firma şartı: program karar yapısı (if) kullanmalı." },
          { desen: "750", olmamali: true, mesaj: "Toplamı kendin yazma; program hesaplasın." },
        ],
        ipuclari: [
          "`for sayi in range(21):` (21 dâhil değil, 20 dâhil)",
          "5'e bölünebilme: `sayi % 5 == 0`. Karesi: `sayi ** 2`",
          'Son satır döngünün dışında: `print("5 ile bölünebilen sayıların karelerinin toplamı=", toplam)`',
        ],
        cozum: `toplam = 0
for sayi in range(21):
    if sayi % 5 == 0:
        print(sayi)
        toplam = toplam + sayi ** 2
print("5 ile bölünebilen sayıların karelerinin toplamı=", toplam)`,
      },
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "liste = [4, 7, 10, 13]\nfor s in liste:\n    if s > 8:\n        print(s)",
      secenekler: ["4 7", "10 13", "4 7 10 13", "13"],
      dogru: 1,
      aciklama: "`for s in liste:` dizinin **elemanlarını** sırayla gezer (indisleri değil). 8'den büyük olanlar: 10 ve 13.",
    },
    {
      tur: "metin",
      icerik: `
## Döngüyle diziye veri eklemek

Kullanıcıdan 10 sayı almamız gerekse 10 satır \`input\` mi yazacağız? Hayır! Bir **döngü** içinde \`input\` alıp \`append()\` ile **diziye** ekleyebiliriz.
`,
    },
    {
      tur: "ornek",
      baslik: "3 sayıyı listeye topla",
      kod: `liste = []
for i in range(3):
    sayi = int(input("Bir sayı girin: "))
    liste.append(sayi)
print(liste)`,
      girdiler: ["4", "9", "16"],
      aciklama: "`liste = []` boş bir dizi oluşturur. Her turda bir sayı alınıp listenin sonuna eklenir.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k11-etkinlik",
        baslik: "Etkinlik: Tek ve çift listeler",
        gorev: `1. Kullanıcıdan **10 sayı** al ve bunları \`liste\` adlı diziye ekle.
2. Bu sayılardan çift olanları \`cift\`, tek olanları \`tek\` adlı dizilere ekle.
3. Üç diziyi şöyle yazdır:

\`\`\`
Liste: [3, 8, 5, 12, 7, 6, 1, 10, 9, 4]
Çift: [8, 12, 6, 10, 4]
Tek: [3, 5, 7, 1, 9]
\`\`\`

(Girdiler kutusuna 10 sayı yazılı. Değiştirip deneyebilirsin.)`,
        baslangicKodu: `liste = []
cift = []
tek = []
`,
        testler: [
          { girdiler: ["3", "8", "5", "12", "7", "6", "1", "10", "9", "4"], beklenen: "Liste: [3, 8, 5, 12, 7, 6, 1, 10, 9, 4]\nÇift: [8, 12, 6, 10, 4]\nTek: [3, 5, 7, 1, 9]" },
          { girdiler: ["2", "4", "6", "8", "10", "1", "3", "5", "7", "9"], beklenen: "Liste: [2, 4, 6, 8, 10, 1, 3, 5, 7, 9]\nÇift: [2, 4, 6, 8, 10]\nTek: [1, 3, 5, 7, 9]" },
        ],
        kodKurallari: [
          { desen: "\\b(for|while)\\b", mesaj: "Bu etkinlikte döngü kullanmalısın." },
          { desen: "append", mesaj: "Dizilere eleman eklemek için `append()` kullan." },
        ],
        ipuclari: [
          "`for i in range(10):` içinde `sayi = int(input(...))` ve `liste.append(sayi)`",
          "Aynı döngünün içinde: `if sayi % 2 == 0:` → `cift.append(sayi)`, değilse `tek.append(sayi)`",
          'Yazdırma: `print("Liste:", liste)`',
        ],
        cozum: `liste = []
cift = []
tek = []
for i in range(10):
    sayi = int(input("Sayı girin: "))
    liste.append(sayi)
    if sayi % 2 == 0:
        cift.append(sayi)
    else:
        tek.append(sayi)
print("Liste:", liste)
print("Çift:", cift)
print("Tek:", tek)`,
      },
    },
    {
      tur: "ipucu",
      renk: "bilgi",
      baslik: "Etkinlik değerlendirmesi: Döngü olmasaydı?",
      icerik: `Aynı programı döngü **olmadan** yazsaydık her sayı için ayrı satırlar gerekirdi:

\`\`\`python
sayi1 = int(input())
liste.append(sayi1)
if sayi1 % 2 == 0:
    cift.append(sayi1)
else:
    tek.append(sayi1)
sayi2 = int(input())
# ... bu 6 satır 10 kez tekrar eder: 60 satır!
\`\`\`

1. Döngü kullanmadan kod yazarken ne gibi sorunlarla karşılaşırsın?
2. Döngü kullanmak programını nasıl etkiledi? Arkadaşlarınla paylaş.`,
    },
    {
      tur: "soru",
      soru: "**Algoritma** nedir?",
      secenekler: ["Bir programlama dilinin adı", "Bir problemin çözüm adımlarının sırayla yazılması", "Bilgisayarın fiziksel parçası", "Bir hata türü"],
      dogru: 1,
      aciklama: "Algoritma, bir problemi çözmek için izlenecek adımların **sıralı** listesidir. Önce algoritma tasarlanır, sonra koda dökülür.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k11-tek-cift-toplam",
        baslik: "Tek ve çift toplamları",
        gorev: `Kullanıcıdan **10 sayı** al. Girilen sayılardan **tek** olanların ve **çift** olanların toplamını ayrı ayrı bulup şöyle yazdır:

\`\`\`
Tek sayıların toplamı: 25
Çift sayıların toplamı: 40
\`\`\`

**Önce algoritmayı yaz:** İki toplam değişkeni hazırla → 10 kez dön → sayıyı al → çiftse çift toplamına, değilse tek toplamına ekle → döngü bitince iki toplamı yazdır.`,
        baslangicKodu: `tek_toplam = 0
cift_toplam = 0
`,
        testler: [
          { girdiler: ["3", "8", "5", "12", "7", "6", "1", "10", "9", "4"], beklenen: "Tek sayıların toplamı: 25\nÇift sayıların toplamı: 40" },
          { girdiler: ["1", "1", "1", "1", "1", "2", "2", "2", "2", "2"], beklenen: "Tek sayıların toplamı: 5\nÇift sayıların toplamı: 10" },
        ],
        kodKurallari: [
          { desen: "\\b(for|while)\\b", mesaj: "Bu soruda döngü kullanmalısın." },
          { desen: "\\bif\\b", mesaj: "Bu soruda karar yapısı (if) kullanmalısın." },
        ],
        ipuclari: ["Tek ve çift listeler etkinliğindeki programa çok benziyor; bu kez listeye eklemek yerine toplama ekle.", "`tek_toplam = tek_toplam + sayi`"],
        cozum: `tek_toplam = 0
cift_toplam = 0
for i in range(10):
    sayi = int(input("Sayı girin: "))
    if sayi % 2 == 0:
        cift_toplam = cift_toplam + sayi
    else:
        tek_toplam = tek_toplam + sayi
print("Tek sayıların toplamı:", tek_toplam)
print("Çift sayıların toplamı:", cift_toplam)`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- Bazı problemler döngü ve karar yapıları olmadan da çözülebilir; ancak bu yapılar kullanıldığında algoritma adımları, akış çizelgeleri ve kod satırları **çok daha az** yer kaplar.
- Döngü ve karar yapıları **zaman tasarrufu** sağlar ve tekrarlanan kod satırlarını yazmanın önüne geçer.
- Problemi çözmeden önce **algoritmasını** tasarlamak hataları azaltır.`,
    },
  ],
};

export default ders;
