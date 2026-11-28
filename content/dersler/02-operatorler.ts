import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "operatorler",
  sira: 2,
  baslik: "Operatörler",
  ozet: "Aritmetiksel, karşılaştırma ve mantıksal operatörlerle hesap yap, karşılaştır.",
  simge: "+ − × ÷",
  sure: "2 × 40 dk",
  kitap: "3.1.1 Operatörler · s. 85–88",
  hedefler: [
    "Operatörün ne olduğunu açıklayabilmek",
    "Aritmetiksel operatörleri (+ - * / ** %) kullanabilmek",
    "İşlem önceliğini uygulayabilmek",
    "Karşılaştırma operatörleriyle True/False sonuçları üretebilmek",
    "Mantıksal operatörleri (and, or, ^, not) kullanabilmek",
  ],
  ogretmenNotu: `
- **1. saat:** aritmetiksel operatörler + işlem önceliği. **2. saat:** karşılaştırma + mantıksal operatörler.
- Mod alma (\`%\`) için ilkokuldaki bölme işlemini hatırlatın: 10 ÷ 3 = 3, **kalan 1**.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Operatör nedir?

Tek başına bir anlam ifade etmeyen ama programın çalışmasını sağlayan özel karakterlere ya da karakter topluluklarına **operatör** denir. \`+\`, \`*\`, \`==\`, \`and\` birer operatördür.

Operatörler; değişkenlere değer atamada, matematiksel ve mantıksal işlemlerde, karşılaştırmalarda kullanılır. En yaygın üç grup şunlardır:

1. **Aritmetiksel** operatörler (hesap yapar)
2. **Karşılaştırma** operatörleri (iki değeri kıyaslar)
3. **Mantıksal** operatörler (koşulları birleştirir)

### Önce küçük bir bilgi: değer atama

Örneklerde \`a = 10\` gibi satırlar göreceksin. Bu satır **a** isimli bir kutuya **10** değerini koyar. Eşittir işaretinin **sağındaki** değer, **soldaki** isme aktarılır. Buna **değer atama** denir. (Bir sonraki derste ayrıntılı öğreneceğiz.)
`,
    },
    {
      tur: "metin",
      icerik: `
## Aritmetiksel operatörler

Temel matematik işlemlerini yapmayı sağlar:

| Operatör | Tanımı | Örnek | Sonuç |
|---|---|---|---|
| \`+\` | Toplama | \`10 + 5\` | \`15\` |
| \`-\` | Çıkarma | \`10 - 5\` | \`5\` |
| \`*\` | Çarpma | \`10 * 5\` | \`50\` |
| \`/\` | Bölme | \`10 / 5\` | \`2.0\` |
| \`**\` | Üs alma (kuvvet) | \`10 ** 5\` | \`100000\` |
| \`%\` | Mod alma (kalan) | \`10 % 5\` | \`0\` |

- **Neden \`x\` değil de \`*\`?** Matematikte çarpma için \`x\` ya da \`.\` kullanılır. Ama programlamada \`x\` bir değişken adı olabileceği için karışıklık olmasın diye \`*\` kullanılır.
- **Üs alma:** \`2 ** 4\` demek 2'yi 4 kez yan yana çarpmak demektir: 2 × 2 × 2 × 2 = 16.
- **Mod alma:** Bölme işleminde **kalanı** verir. \`10 % 3\` → 10'un içinde 3 tane 3 var (9), kalan **1**.
`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(7 / 2)",
      secenekler: ["3", "3.5", "4", "1"],
      dogru: 1,
      aciklama: "`/` bölme işlemi her zaman ondalıklı sonuç verir: 7 / 2 = **3.5**. (Kalanı bulmak isteseydik `7 % 2` → 1 yazardık.)",
    },
    {
      tur: "ipucu",
      renk: "uyari",
      baslik: "Python'da üs alma için ^ kullanılmaz!",
      icerik: "Bazı programlama dillerinde üs alma için `^` kullanılır. **Python'da ise üs almak için yalnızca `**` kullanılır.** Python'da `^` başka bir iş yapar (Özel Veya). `10 ^ 5` yazarsan 100000 değil **15** çıkar!",
    },
    {
      tur: "soru",
      soru: "Python'da **2 üssü 3** (2³) nasıl yazılır?",
      secenekler: ["`2 ^ 3`", "`2 ** 3`", "`2 x 3`", "`2 * 3`"],
      dogru: 1,
      aciklama: "Python'da üs alma `**` ile yapılır: `2 ** 3` → 8. `2 ^ 3` Python'da Özel Veya işlemidir ve **1** sonucunu verir!",
    },
    {
      tur: "ornek",
      baslik: "Örnek: a = 10 ve b = 5 ile işlemler",
      kod: `a = 10
b = 5
print(a + b)
print(a - b)
print(a * b)
print(b / a)
print(a ** b)
print(a % 2)
print(b % 3)`,
      aciklama: "Bazı dillerde satır sonlarına noktalı virgül (;) konur. Python'da noktalı virgül gerekmez; yazsan da hata vermez.",
    },
    {
      tur: "soru",
      soru: "`17 % 5` işleminin sonucu nedir?",
      secenekler: ["3", "3.4", "2", "85"],
      dogru: 2,
      aciklama: "`%` bölmeden **kalanı** verir. 17'nin içinde 3 tane 5 var (15), kalan **2**.",
    },
    {
      tur: "metin",
      icerik: `
## İşlem önceliği

Matematikte olduğu gibi programlamada da işlemler belli bir sırayla yapılır:

1. Parantez içleri \`( )\`
2. Üs alma \`**\`
3. Mod alma, çarpma, bölme \`%  *  /\`
4. Toplama ve çıkarma \`+  -\`

Emin değilsen **parantez kullan**. Hem doğru sonuç alırsın hem de kodun daha kolay okunur.
`,
    },
    {
      tur: "ornek",
      baslik: "İşlem önceliğini dene",
      kod: `print(2 + 3 * 4)
print((2 + 3) * 4)
print(2 * 3 ** 2)
print(20 - 10 / 5)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı ne olur?",
      kod: `print(10 + 2 * 5 ** 2)`,
      secenekler: ["60", "3600", "110", "300"],
      dogru: 0,
      aciklama: "Önce üs: 5 ** 2 = 25. Sonra çarpma: 2 × 25 = 50. En son toplama: 10 + 50 = **60**.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(2 + 3 * 2 ** 2)",
      secenekler: ["14", "22", "50", "100"],
      dogru: 0,
      aciklama: "Önce üs: 2 ** 2 = 4. Sonra çarpma: 3 × 4 = 12. En son toplama: 2 + 12 = **14**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k2-aritmetik",
        baslik: "Aritmetiksel operatörler",
        gorev: `\`a = 12\` ve \`b = 4\` değişkenlerini kullanarak sırasıyla şunları **alt alta** yazdır:

1. a ile b'nin toplamı
2. a'dan b'nin farkı
3. a ile b'nin çarpımı
4. a'nın b'ye bölümü
5. a'nın karesi (a üssü 2)
6. a'nın 5'e bölümünden kalan`,
        baslangicKodu: `a = 12
b = 4
# İşlemleri a ve b kullanarak yaz
`,
        testler: [{ beklenen: "16\n8\n48\n3.0\n144\n2" }],
        kodKurallari: [
          { desen: "\\*\\*", mesaj: "Karesini almak için üs alma operatörünü (**) kullan." },
          { desen: "%", mesaj: "Kalanı bulmak için mod operatörünü (%) kullan." },
        ],
        ipuclari: ["Her biri için bir `print()` kullan: `print(a + b)`", "Kare için `a ** 2`, kalan için `a % 5`."],
        cozum: `a = 12
b = 4
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a ** 2)
print(a % 5)`,
      },
    },
    {
      tur: "metin",
      icerik: `
## Karşılaştırma operatörleri

İki değeri karşılaştırır. Sorunun cevabı doğruysa **True** [*tru*, doğru], yanlışsa **False** [*fols*, yanlış] sonucunu verir. Bu iki değere **boolean** [*buulyın*, mantıksal] veri tipi denir.

| Operatör | Tanımı | Örnek | Anlamı |
|---|---|---|---|
| \`==\` | Eşittir | \`a == b\` | a ile b eşit mi? |
| \`!=\` | Eşit değildir | \`a != b\` | a ile b eşit değil mi? |
| \`>\` | Büyüktür | \`a > b\` | a, b'den büyük mü? |
| \`<\` | Küçüktür | \`a < b\` | a, b'den küçük mü? |
| \`>=\` | Büyük eşittir | \`a >= b\` | a, b'den büyük veya eşit mi? |
| \`<=\` | Küçük eşittir | \`a <= b\` | a, b'den küçük veya eşit mi? |

⚠️ **\`=\` ile \`==\` farklıdır!** Tek eşittir değer **atar**, çift eşittir **karşılaştırır**.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: a = 4 ve b = 8",
      kod: `a = 4
b = 8
print(a == b)
print(a != b)
print(a > b)
print(a < b)
print(a >= b)
print(a <= b)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(5 != 5)",
      secenekler: ["True", "False", "0", "Hata verir"],
      dogru: 1,
      aciklama: "`!=` “eşit değil mi?” diye sorar. 5 ile 5 eşit olduğu için cevap **False**.",
    },
    {
      tur: "soru",
      soru: "`=` ile `==` arasındaki fark nedir?",
      secenekler: ["İkisi de aynıdır", "`=` karşılaştırır, `==` değer atar", "`=` değer atar, `==` karşılaştırır", "`==` sadece metinlerde kullanılır"],
      dogru: 2,
      aciklama: "`a = 5` → a'ya 5 değerini **atar**. `a == 5` → a 5'e **eşit mi** diye sorar ve True/False verir.",
    },
    {
      tur: "metin",
      icerik: `
## Mantıksal operatörler

İki veya daha fazla koşulu birlikte değerlendirir ve sonuç olarak yine **True / False** üretir. Bazı dillerde işaretler kullanılır; Python'da kelimeler kullanılır:

| Python'da | Diğer dillerde | Tanımı | Ne zaman True? |
|---|---|---|---|
| \`and\` [*end*] | \`&&\` | Ve | **İki şart da** sağlanırsa |
| \`or\` [*or*] | \`\\|\\|\` | Veya | Şartlardan **en az biri** sağlanırsa |
| \`^\` | \`^\` | Özel Veya (XOR) | Şartların sonuçları **farklıysa** |
| \`not\` [*nat*] | \`!\` | Değil | Şartın sonucunu **tersine çevirir** |
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: a = 10 ve b = 20",
      kod: `a = 10
b = 20
print(a < 15 and b == 20)
print(a > 15 or b == 20)
print((a == 10) ^ (b > 25))
print(not (a < b))`,
      aciklama: "Özel Veya (^) kullanırken koşulları paranteze almayı unutma; Python'da parantezsiz yazım yanlış sonuç verebilir.",
    },
    {
      tur: "soru",
      soru: "`yas = 16` iken aşağıdaki ifadenin sonucu nedir?",
      kod: `print(yas >= 18 or yas == 16)`,
      secenekler: ["True", "False", "16", "Hata verir"],
      dogru: 0,
      aciklama: "`yas >= 18` → False, `yas == 16` → True. `or` için şartlardan **birinin** doğru olması yeterli: sonuç **True**.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(not (3 > 2) or 4 < 1)",
      secenekler: ["True", "False", "4", "Hata verir"],
      dogru: 1,
      aciklama: "Önce `not (3 > 2)` → not True → **False**. Sonra `4 < 1` → **False**. False or False → **False**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k2-mantiksal",
        baslik: "Mantıksal operatörler",
        gorev: `\`yas = 15\` değişkenini kullanarak aşağıdaki üç sorunun cevabını (True/False) **alt alta** yazdır. Her biri için belirtilen operatörü kullan:

1. Yaş 13 ile 17 arasında mı? (**and** kullan: 13 ve 17 dâhil)
2. Yaş 13'ten küçük **veya** 17'den büyük mü? (**or** kullan)
3. Yaş 15'e eşit **değil** mi? (**not** kullan)`,
        baslangicKodu: `yas = 15
`,
        testler: [{ beklenen: "True\nFalse\nFalse" }],
        kodKurallari: [
          { desen: "\\band\\b", mesaj: "1. soruda `and` operatörünü kullanmalısın." },
          { desen: "\\bor\\b", mesaj: "2. soruda `or` operatörünü kullanmalısın." },
          { desen: "\\bnot\\b", mesaj: "3. soruda `not` operatörünü kullanmalısın." },
          { desen: "print\\(\\s*(True|False)\\s*\\)", olmamali: true, mesaj: "Cevabı doğrudan yazma; Python karşılaştırarak bulsun." },
        ],
        ipuclari: ["1. soru: `print(yas >= 13 and yas <= 17)`", "3. soru: `print(not (yas == 15))`"],
        cozum: `yas = 15
print(yas >= 13 and yas <= 17)
print(yas < 13 or yas > 17)
print(not (yas == 15))`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **Operatörler** programda hesaplama, karşılaştırma ve mantıksal işlemleri yapan özel karakterlerdir.
- Aritmetiksel: \`+  -  *  /  **  %\` — Python'da üs alma \`**\` ile yapılır.
- İşlem önceliği: parantez → üs → çarpma/bölme/mod → toplama/çıkarma.
- Karşılaştırma ve mantıksal operatörler sonuç olarak **True** ya da **False** (boolean) verir.`,
    },
  ],
};

export default ders;
