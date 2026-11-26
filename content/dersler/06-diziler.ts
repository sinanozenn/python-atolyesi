import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "diziler",
  sira: 6,
  baslik: "Diziler (Listeler)",
  ozet: "Birden fazla veriyi tek bir isimle sakla; indis numarasıyla elemanlara ulaş.",
  simge: "🗂️",
  sure: "40 dk",
  kitap: "3.3 Farklı Veri Türlerinin Programda Kullanımı – Diziler · s. 100–101",
  hedefler: [
    "Dizinin ne olduğunu ve neden kullanıldığını açıklayabilmek",
    "Python'da [ ] ile dizi (liste) oluşturabilmek",
    "İndis numarasıyla (0'dan başlayarak) elemanlara ulaşabilmek",
    "Diziye eleman ekleyebilmek (append) ve eleman sayısını bulabilmek (len)",
  ],
  ogretmenNotu: `
- Diziyi **numaralı dolaplara** benzetin: tek bir dolap sırası (dizi adı), her dolabın bir numarası (indis) var ve numaralar **0'dan** başlıyor.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Dizi nedir?

Bir sınıftaki 30 öğrencinin notunu saklamak için 30 ayrı değişken mi oluşturmalıyız? \`not1\`, \`not2\`, \`not3\`… Bu çok zahmetli olurdu!

**Dizi** [*array*, errey], birden fazla verinin **sıralanarak tek bir isimle** hafızada tutulmasını sağlar. Python'da diziler **liste** olarak adlandırılır ve köşeli parantez \`[ ]\` içinde, virgülle ayrılarak yazılır:

\`\`\`python
sayi = [10, 20, 30, 40]
\`\`\`

## İndis: Elemanın sıra numarası

Dizideki her elemanın bir sıra numarası vardır. Bu numaraya **indis** denir. **İndisler 0'dan başlar!**

| İndis | \`sayi[0]\` | \`sayi[1]\` | \`sayi[2]\` | \`sayi[3]\` |
|---|---|---|---|---|
| **Değer** | 10 | 20 | 30 | 40 |

Bir elemana ulaşmak için dizinin adından sonra köşeli parantez içine indisini yazarız: \`sayi[2]\` → **30**
`,
    },
    {
      tur: "ornek",
      baslik: "Dizi ve indis",
      kod: `sayi = [10, 20, 30, 40]
print(sayi)
print(sayi[0])
print(sayi[2])
print("Eleman sayısı:", len(sayi))`,
      aciklama: "len() fonksiyonu dizinin kaç elemanı olduğunu verir.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(len([3, 6, 9, 12, 15]))",
      secenekler: ["4", "5", "15", "[3, 6, 9, 12, 15]"],
      dogru: 1,
      aciklama: "`len()` dizideki **eleman sayısını** verir. Dizide 5 eleman var.",
    },
    {
      tur: "ornek",
      baslik: "Örnek: Farklı türlerde diziler",
      aciklama: "Diziler her veri türüyle kullanılabilir. Hepsinin ikinci elemanını (indis 1) yazdıralım.",
      kod: `dizi_i = [10, 20, 30, 40]
dizi_s = ["Programlamaya", "Giriş", "ve", "Algoritmalar"]
dizi_c = ["P", "G", "V", "A"]
dizi_d = [1.2, 2.3, 3.4]
print(dizi_i[1])
print(dizi_s[1])
print(dizi_c[1])
print(dizi_d[1])`,
    },
    {
      tur: "soru",
      soru: "`renkler = [\"kırmızı\", \"mavi\", \"yeşil\", \"sarı\"]` dizisinde `\"yeşil\"` elemanına nasıl ulaşılır?",
      secenekler: ["`renkler[3]`", "`renkler[2]`", "`renkler(3)`", "`renkler[yeşil]`"],
      dogru: 1,
      aciklama: "İndisler 0'dan başlar: kırmızı → 0, mavi → 1, **yeşil → 2**, sarı → 3. Köşeli parantez kullanılır: `renkler[2]`.",
    },
    {
      tur: "metin",
      icerik: `
## Diziye eleman eklemek ve değiştirmek

Dizilere ilk tanımlamada eleman yerleştirildiği gibi **sonradan da eleman eklenebilir**:

- \`liste.append(eleman)\` → elemanı dizinin **sonuna ekler** [*append*, ekle]
- \`liste[indis] = yeni_deger\` → o sıradaki elemanı **değiştirir**
`,
    },
    {
      tur: "ornek",
      baslik: "Ekleme ve değiştirme",
      kod: `notlar = [70, 85]
print(notlar)

notlar.append(90)        # sona 90 ekle
print(notlar)

notlar[0] = 75           # ilk notu 75 yap
print(notlar)
print("Not sayısı:", len(notlar))`,
    },
    {
      tur: "soru",
      soru: "Aşağıdaki kodun çıktısının `['programlamaya', 'giriş', 've', 'algoritmalar']` olması için `print( ... )` içine ne yazılmalı?",
      kod: `ders = ["programlamaya", "giriş", "ve", "algoritmalar"]
programlama_dili = [ders, "python"]
print( ... )`,
      secenekler: ["`ders`", "`ders[1]`", "`ders[2]`", "`programlama_dili`", "`programlama_dili[1]`"],
      dogru: 0,
      aciklama: "`ders` dizisinin tamamı yazdırılmalı. `ders[1]` sadece \"giriş\" yazar, `programlama_dili[1]` ise \"python\" yazar. (`programlama_dili[0]` da aynı sonucu verirdi, çünkü ilk elemanı `ders` dizisidir.) Kodu IDE'de deneyebilirsin!",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "liste = [1, 2, 3]\nliste.append(4)\nprint(liste[3])",
      secenekler: ["3", "4", "Hata verir", "[1, 2, 3, 4]"],
      dogru: 1,
      aciklama: "`append(4)` sonrası dizi [1, 2, 3, 4] olur. İndisler 0, 1, 2, 3'tür; `liste[3]` son eleman olan **4**'tür.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "a = [5, 10, 15]\na[1] = 20\nprint(a)",
      secenekler: ["[20, 10, 15]", "[5, 20, 15]", "[5, 10, 20]", "[5, 10, 15, 20]"],
      dogru: 1,
      aciklama: "`a[1] = 20` ikinci elemanı (indis 1) değiştirir: 10 yerine 20 gelir → **[5, 20, 15]**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k6-gunler",
        baslik: "Haftanın günleri",
        gorev: `Aşağıdaki \`gunler\` dizisini kullanarak sırasıyla şunları yazdır:

1. Haftanın **ilk** günü
2. Haftanın **son** günü
3. Dizinin **eleman sayısı**

Çıktı:
\`\`\`
Pazartesi
Pazar
7
\`\`\``,
        baslangicKodu: `gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
`,
        testler: [{ beklenen: "Pazartesi\nPazar\n7" }],
        kodKurallari: [{ desen: "gunler\\[", mesaj: "Günlere indis ile ulaşmalısın: `gunler[0]` gibi." }, { desen: "len\\(", mesaj: "Eleman sayısı için `len()` kullan." }],
        ipuclari: ["İlk eleman: `gunler[0]`", "7 elemanlı dizinin son indisi 6'dır."],
        cozum: `gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
print(gunler[0])
print(gunler[6])
print(len(gunler))`,
      },
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "isimler = [\"Ali\", \"Ayşe\"]\nprint(isimler[0] + isimler[1])",
      secenekler: ["Ali Ayşe", "AliAyşe", "Ali + Ayşe", "Hata verir"],
      dogru: 1,
      aciklama: "`isimler[0]` → \"Ali\", `isimler[1]` → \"Ayşe\". İki metin `+` ile boşluksuz birleşir: **AliAyşe**.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k6-ekle",
        baslik: "Not listesine ekle",
        gorev: `\`notlar\` dizisinde iki not var. Kullanıcıdan **yeni bir not** al (tam sayı olarak), diziye **ekle** ve dizinin son hâlini yazdır. Kullanıcı 90 yazarsa:

\`\`\`
[70, 85, 90]
\`\`\``,
        baslangicKodu: `notlar = [70, 85]
`,
        testler: [
          { girdiler: ["90"], beklenen: "[70, 85, 90]" },
          { girdiler: ["55"], beklenen: "[70, 85, 55]" },
        ],
        kodKurallari: [{ desen: "append", mesaj: "Diziye eklemek için `append()` kullanmalısın." }],
        ipuclari: ["`yeni = int(input(\"Yeni not: \"))`", "`notlar.append(yeni)` ve sonra `print(notlar)`"],
        cozum: `notlar = [70, 85]
yeni = int(input("Yeni not: "))
notlar.append(yeni)
print(notlar)`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **Diziler**, birden fazla veriyi tek bir isimle depolayan yapılardır. Python'da \`[ ]\` ile yazılır ve **liste** olarak adlandırılır.
- Elemanlar **0'dan başlayan indis numaraları** ile tutulur: \`dizi[0]\` ilk elemandır.
- \`append()\` ile sona eleman eklenir, \`len()\` ile eleman sayısı bulunur.`,
    },
  ],
};

export default ders;
