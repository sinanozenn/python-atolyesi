import type { Ders } from "../tipler";

const ders: Ders = {
  slug: "veri-turleri",
  sira: 4,
  baslik: "Veri Türleri",
  ozet: "Sayısal ve metinsel veriler, tür uyumu, tür dönüştürme ve kullanıcıdan veri almak.",
  simge: "int str",
  sure: "40 dk",
  kitap: "3.2 Veri Türleri · s. 91–92 (ve s. 94 Bilgi Notu)",
  hedefler: [
    "Veri ve veri türü kavramlarını açıklayabilmek",
    "Sayısal ve metinsel veriyi ayırt edebilmek",
    "Türleri uyumsuz verilerle işlem yapılamayacağını fark edebilmek",
    "input() ile kullanıcıdan veri alıp int() ile sayıya dönüştürebilmek",
  ],
  ogretmenNotu: `
- Sitede \`input()\` cevapları kodu çalıştırmadan önce **Girdiler** kutusuna yazılır. Bunu öğrencilere mutlaka gösterin.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## Veri ve veri türü

Bilgisayar işlemlerinde kullanılan en temel yapıya **veri** denir. Her verinin bir **türü** vardır:

- **Sayısal veri:** \`10\`, \`-3\`, \`3.14\` → hesap yapılabilir.
- **Metinsel veri:** \`"Merhaba"\`, \`"Ayşe"\`, \`"10"\` → yazı olarak kullanılır.
- **Mantıksal veri:** \`True\`, \`False\` → doğru/yanlış bilgisini tutar.

Birçok programlama dilinde değişken tanımlarken türü yazmak gerekir: \`int sayi = 10;\` ya da \`string ders = "...";\` gibi.
**Python'da tür yazmaya gerek yoktur.** Python türü kendisi anlar: **tırnak içindeki** veriler metin, **tırnaksız** sayılar sayıdır.
`,
    },
    {
      tur: "ornek",
      baslik: "Örnek: Sayısal ve metinsel veri",
      kod: `a = 5
b = 10
c = a * b
isim = "Merhaba"
print(c)
print(isim)`,
    },
    {
      tur: "soru",
      soru: "`\"3.5\"` verisinin türü nedir?",
      secenekler: ["int", "float", "str", "bool"],
      dogru: 2,
      aciklama: "Tırnak içinde yazıldığı için bu bir **metindir (str)**. Tırnaksız `3.5` yazılsaydı float olurdu.",
    },
    {
      tur: "metin",
      icerik: `
## Tür uyumu: elma ile armut toplanmaz 🍎🍐

Matematikte 3 elma ile 3 armudu toplayıp “6 elma” diyemeyiz. Programlamada da **bir metin ile bir sayı toplanamaz**. Türler uyumlu değilse program **hata** verir. Aşağıdaki kodu çalıştır ve hatayı oku:
`,
    },
    {
      tur: "ornek",
      baslik: "Metin + sayı = hata",
      kod: `yas = 15
print("Yaşım " + yas)`,
      hataBekleniyor: true,
      aciklama: "Düzeltmek için iki yol var: virgül kullanmak `print(\"Yaşım\", yas)` ya da sayıyı metne çevirmek `print(\"Yaşım \" + str(yas))`. İkisini de dene!",
    },
    {
      tur: "metin",
      icerik: `
## Aynı veri, farklı tür

Aynı **10** verisi farklı türlerle farklı amaçlara hizmet eder:

- \`a = 10\` → **sayı**. \`a * a\` işlemi **100** verir.
- \`b = "10"\` → **metin**. \`b * 5\` işlemi metni 5 kez yan yana yazar: **1010101010**
`,
    },
    {
      tur: "ornek",
      baslik: "Sayı mı, metin mi?",
      kod: `a = 10
b = "10"
print(a * a)
print(b * 5)
print(type(a))
print(type(b))`,
      aciklama: "type() bir verinin türünü gösterir: int = tam sayı, str = metin (string).",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı ne olur?",
      kod: `x = "7"
y = "3"
print(x + y)`,
      secenekler: ["10", "73", "7 3", "Hata verir"],
      dogru: 1,
      aciklama: "x ve y tırnak içinde olduğu için **metindir**. İki metin `+` ile toplanınca yan yana eklenir: \"7\" + \"3\" → **73**.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(\"Ali\" * 2)",
      secenekler: ["AliAli", "Ali Ali", "Ali2", "Hata verir"],
      dogru: 0,
      aciklama: "Bir metni bir sayıyla **çarpmak** metni o kadar kez yan yana yazar: `\"Ali\" * 2` → **AliAli**. (Ama metin + sayı hata verir!)",
    },
    {
      tur: "metin",
      icerik: `
## Kullanıcıdan veri almak: \`input()\`

\`input()\` [*input*, girdi] komutu kullanıcıdan bir veri ister. Parantez içine kullanıcıya gösterilecek soruyu yazarız:

\`\`\`python
ad = input("Adın ne? ")
\`\`\`

> **Bu sitede:** Programın \`input()\` ile soracağı cevapları, kodu çalıştırmadan **önce** editörün altındaki **⌨️ Girdiler** kutusuna yazarsın. Her satır bir cevaptır.
`,
    },
    {
      tur: "ornek",
      baslik: "Selamlaşan program",
      kod: `ad = input("Adın ne? ")
print("Tanıştığımıza memnun oldum,", ad)`,
      girdiler: ["Zeynep"],
    },
    {
      tur: "ipucu",
      renk: "uyari",
      baslik: "Tür dönüştürme: input() her zaman METİN verir!",
      icerik: `Kullanıcı \`15\` yazsa bile \`input()\` bunu \`"15"\` (metin) olarak verir. Sayı gibi işlem yapmak için verinin **türünü dönüştürmek** gerekir. Buna **tür dönüştürme** denir: \`input\`'un önüne istediğin türün adını yazarsın.

| Yazım | Ne yapar? |
|---|---|
| \`int(input())\` | Girilen veriyi **tam sayıya** çevirir |
| \`float(input())\` | Girilen veriyi **ondalıklı sayıya** çevirir |
| \`str(15)\` | Sayıyı **metne** çevirir |`,
    },
    {
      tur: "ornek",
      baslik: "Tür dönüştürme ile hesap",
      kod: `yas = int(input("Kaç yaşındasın? "))
print("Gelecek yıl", yas + 1, "yaşında olacaksın.")
print("10 yıl sonra", yas + 10, "yaşında olacaksın.")`,
      girdiler: ["14"],
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "print(int(\"12\") + 3)",
      secenekler: ["123", "15", "Hata verir", "12 3"],
      dogru: 1,
      aciklama: "`int(\"12\")` metni **12** sayısına çevirir. 12 + 3 = **15**.",
    },
    {
      tur: "soru",
      soru: "Kullanıcı Girdiler kutusuna **4** yazdı. Çıktı ne olur?",
      kod: "n = int(input())\nprint(n * n)",
      secenekler: ["16", "44", "8", "Hata verir"],
      dogru: 0,
      aciklama: "`int(input())` girilen \"4\" metnini 4 sayısına çevirir. 4 × 4 = **16**. `int` olmasaydı metin × metin hata verirdi.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k4-selam",
        baslik: "Kişisel selamlama",
        gorev: `Kullanıcıdan adını al ve ona şöyle selam ver (kullanıcı **Ali** yazdıysa):

\`\`\`
Merhaba, Ali!
\`\`\`

\`input()\` içine istediğin soruyu yazabilirsin. Kontrol sırasında yalnızca \`print()\` çıktıların karşılaştırılır.`,
        baslangicKodu: `ad = input("Adın ne? ")\n`,
        testler: [
          { girdiler: ["Ali"], beklenen: "Merhaba, Ali!" },
          { girdiler: ["Elif"], beklenen: "Merhaba, Elif!" },
        ],
        ipuclari: [
          "Metinleri `+` ile birleştirebilirsin: `\"Merhaba, \" + ad + \"!\"`",
          "Virgülle yazdırırsan Python araya boşluk koyar; ünlem işareti adın hemen yanında olmalı.",
        ],
        cozum: `ad = input("Adın ne? ")
print("Merhaba, " + ad + "!")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k4-donustur",
        baslik: "Bozuk programı tamir et",
        gorev: `Bu program girilen sayının **iki katını** yazmalı. Ama kullanıcı 21 yazınca 42 yerine **2121** yazıyor! Önce çalıştırıp gör, sonra düzelt.`,
        baslangicKodu: `sayi = input("Bir sayı girin: ")
print(sayi * 2)
`,
        testler: [
          { girdiler: ["21"], beklenen: "42" },
          { girdiler: ["5"], beklenen: "10" },
        ],
        ipuclari: ["`input()` metin verir. Metin * 2 = metni iki kez yan yana yazmak.", "`input(...)` ifadesini `int(...)` içine al."],
        cozum: `sayi = int(input("Bir sayı girin: "))
print(sayi * 2)`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- Bilgisayarda kullanılan en temel bilgiye **veri** denir; kullanım alanına göre farklı **veri türleri** vardır.
- Doğru tür seçimi programın güvenilirliğini ve performansını artırır.
- Türleri uyumsuz veriler (metin + sayı) birlikte işleme giremez; önce **tür dönüştürme** yapılmalıdır.
- \`input()\` her zaman metin verir; sayı için \`int(input())\` ya da \`float(input())\` kullanılır.`,
    },
  ],
};

export default ders;
