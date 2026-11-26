import type { Ders } from "../tipler";
import { donguAkis } from "../akis";

const ders: Ders = {
  slug: "while-dongusu",
  sira: 10,
  baslik: "Döngü Yapıları: while ve Sayaç",
  ozet: "Şart sağlandığı sürece tekrar et: while döngüsü, sayaç yapısı, break ve continue.",
  simge: "🔄",
  sure: "2 × 40 dk",
  kitap: "3.5.2 While Döngüsü · 3.5.3 Sayaç Yapısı · s. 111–114",
  hedefler: [
    "while döngüsünün for döngüsünden farkını açıklayabilmek",
    "Sayaç değişkeniyle döngüyü kontrol edebilmek",
    "Aynı problemi for ve while ile çözebilmek",
    "Sonsuz döngüyü tanıyıp önleyebilmek; break ve continue kullanabilmek",
  ],
  ogretmenNotu: `
- Aynı problemin for ve while ile çözümünü iki sütun hâlinde tahtaya yazın; farkları öğrencilere buldurun.
- Sonsuz döngüyü bilerek gösterin (\`i = i + 1\` satırını silin). Site 5 saniye sonra programı durdurur.
`,
  bloklar: [
    {
      tur: "metin",
      icerik: `
## while döngüsü

**while** [*vayl*, -dığı sürece] döngüsü, belirtilen **şart sağlandığı sürece** tekrar eder. Şart yanlış (False) olunca döngü biter.

Genellikle döngünün **kaç kez** döneceğinin belli olmadığı durumlarda kullanılır. Örneğin “kullanıcı doğru şifreyi girene kadar sor”.

**Python'da yazılışı:**
\`\`\`python
while şart:
    işlem
\`\`\`
`,
    },
    { tur: "gorsel", svg: donguAkis, altyazi: "While döngü yapısının akış diyagramı" },
    {
      tur: "ornek",
      baslik: "Örnek: 5 kez “programlama”",
      kod: `isim = "programlama"
i = 0
while i < 5:
    print(isim)
    i = i + 1`,
      aciklama: "i önce 0. Her turda 1 artar: 0, 1, 2, 3, 4. i 5 olunca `i < 5` yanlış olur ve döngü biter.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "i = 10\nwhile i > 0:\n    i = i - 3\nprint(i)",
      secenekler: ["1", "0", "-2", "-3"],
      dogru: 2,
      aciklama: "i sırasıyla 10, 7, 4, 1 olur; hepsi 0'dan büyük olduğu için döngü devam eder. 1 − 3 = **-2** olunca şart yanlış olur ve döngü biter. Döngüden sonra **-2** yazılır.",
    },
    {
      tur: "ornek",
      baslik: "Örnek: 0'dan 10'a kadar toplam",
      kod: `i = 0
toplam = 0
while i < 11:
    toplam = toplam + i
    i = i + 1
print("toplam =", toplam)`,
    },
    {
      tur: "metin",
      icerik: `
## Sayaç yapısı

Döngüdeki işlemlerin kaç kez tekrar edeceği **sayaç** denilen bir değişkenle kontrol edilir. Bir sayaçta üç şey belirlenir:

1. **Başlangıç değeri** → \`i = 0\`
2. **Bitiş şartı** → \`i < 6\`
3. **Artış (ya da azalış) miktarı** → \`i = i + 1\`

Her turda işlem yapılır, sonra sayaç kontrol edilir. Şart sağlandığı sürece döngü devam eder.

### Aynı problem, iki döngü

0'dan 5'e kadar (5 dâhil) sayıları yazdıran iki program. Çıktıları aynıdır:

| for döngüsü ile | while döngüsü ile |
|---|---|
| \`range\` sayacı kendisi yönetir | Sayacı **biz** yönetiriz |
`,
    },
    {
      tur: "ornek",
      baslik: "for ile",
      kod: `for sayi in range(6):
    print(sayi)`,
    },
    {
      tur: "ornek",
      baslik: "while ile",
      kod: `i = 0
while i < 6:
    print(i)
    i = i + 1`,
    },
    {
      tur: "ipucu",
      renk: "uyari",
      baslik: "Sonsuz döngü tehlikesi",
      icerik: "Yukarıdaki while örneğinde `i = i + 1` satırını silip çalıştır. i hep 0 kalır, `i < 6` hep doğru olur ve döngü **asla bitmez**. Buna **sonsuz döngü** denir. Bu sitede program 5 saniye sonra otomatik durdurulur. Gerçek hayatta ise program donup kalır!",
    },
    {
      tur: "soru",
      soru: "Bu kod ekrana ne yazar?",
      kod: "i = 5\nwhile i < 3:\n    print(i)\n    i = i + 1",
      secenekler: ["5 4 3", "Sonsuz döngü", "Hiçbir şey yazmaz", "5"],
      dogru: 2,
      aciklama: "Başlangıçta i = 5 ve `5 < 3` **yanlış**. while döngüsü şartı en baştan kontrol eder; şart yanlışsa döngüye **hiç girilmez**.",
    },
    {
      tur: "soru",
      soru: "Bu kod ekrana kaç tane yıldız (*) yazar?",
      kod: `i = 0
while i < 10:
    print("*")
    i = i + 2`,
      secenekler: ["10", "5", "6", "Sonsuz"],
      dogru: 1,
      aciklama: "i sırasıyla 0, 2, 4, 6, 8 değerlerini alır ve her seferinde bir yıldız yazılır (5 tane). i 10 olunca `i < 10` yanlış olur.",
    },
    {
      tur: "ornek",
      baslik: "Doğru şifreyi bekle",
      aciklama: "Kaç deneme yapılacağını bilmiyoruz; while tam bu durumlar için.",
      kod: `sifre = input("Şifre: ")
while sifre != "python123":
    print("Yanlış şifre, tekrar dene.")
    sifre = input("Şifre: ")
print("Giriş başarılı! ✅")`,
      girdiler: ["abc", "1234", "python123"],
    },
    {
      tur: "metin",
      icerik: `
## break ve continue

Bu iki deyim **döngünün akışını kontrol eder**:

- **break** [*breyk*, kesme] → Döngüyü **hemen sonlandırır**.
- **continue** [*kontinyu*, devam et] → O turun geri kalanını **atlar**, döngü bir sonraki turdan devam eder.
`,
    },
    {
      tur: "ornek",
      baslik: "break ve continue",
      kod: `for i in range(1, 11):
    if i % 3 == 0:
        continue      # 3'ün katlarını atla
    if i == 8:
        break         # 8'e gelince döngüyü bitir
    print(i)`,
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "for i in range(10):\n    if i == 3:\n        break\n    print(i)",
      secenekler: ["0 1 2", "0 1 2 3", "3", "1 2 3"],
      dogru: 0,
      aciklama: "i 3 olduğunda `break` döngüyü **hemen** bitirir; 3 yazdırılmaz. Çıktı: 0, 1, 2.",
    },
    {
      tur: "soru",
      soru: "Bu kodun çıktısı nedir?",
      kod: "for i in range(5):\n    if i == 2:\n        continue\n    print(i)",
      secenekler: ["0 1", "0 1 2 3 4", "0 1 3 4", "2"],
      dogru: 2,
      aciklama: "i 2 olduğunda `continue` o turun geri kalanını atlar (print çalışmaz) ve döngü 3'ten devam eder. Çıktı: 0, 1, 3, 4.",
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k10-cift-toplam",
        baslik: "while ile çift toplam",
        gorev: `0'dan başlayarak kullanıcının girdiği **sınır sayısına** kadar (sınır dâhil) olan **çift** sayıların toplamını bulan programı bu kez **while döngüsü** ile yaz. Sınır 10 ise:

\`\`\`
Çift sayıların toplamı: 30
\`\`\``,
        baslangicKodu: `sinir = int(input("Sınır için bir sayı giriniz: "))
i = 0
toplam = 0
`,
        testler: [
          { girdiler: ["10"], beklenen: "Çift sayıların toplamı: 30" },
          { girdiler: ["7"], beklenen: "Çift sayıların toplamı: 12" },
          { girdiler: ["0"], beklenen: "Çift sayıların toplamı: 0" },
        ],
        kodKurallari: [{ desen: "\\bwhile\\b", mesaj: "Bu alıştırmada `while` döngüsü kullanmalısın." }],
        ipuclari: [
          "Şart: `while i <= sinir:` (sınır dâhil olduğu için `<=`)",
          "Döngünün içinde: çiftse topla (`if i % 2 == 0:`), sonra **her durumda** `i = i + 1`.",
          "Daha kısa yol: i'yi 2'şer artır, böylece sadece çift sayıları gezersin!",
        ],
        cozum: `sinir = int(input("Sınır için bir sayı giriniz: "))
i = 0
toplam = 0
while i <= sinir:
    if i % 2 == 0:
        toplam = toplam + i
    i = i + 1
print("Çift sayıların toplamı:", toplam)`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k10-geri-sayim",
        baslik: "Roket geri sayımı",
        gorev: `Kullanıcıdan bir sayı al. while döngüsüyle o sayıdan **1'e kadar geri say**, sonra \`Kalkış!\` yaz. Kullanıcı 3 yazarsa:

\`\`\`
3
2
1
Kalkış!
\`\`\``,
        baslangicKodu: `sayi = int(input("Kaçtan geri sayalım? "))\n`,
        testler: [
          { girdiler: ["3"], beklenen: "3\n2\n1\nKalkış!" },
          { girdiler: ["5"], beklenen: "5\n4\n3\n2\n1\nKalkış!" },
        ],
        kodKurallari: [{ desen: "\\bwhile\\b", mesaj: "Bu alıştırmada `while` döngüsü kullanmalısın." }],
        ipuclari: ["Şart: `while sayi > 0:`", "Döngünün içinde sayıyı yazdır, sonra 1 azalt: `sayi = sayi - 1`"],
        cozum: `sayi = int(input("Kaçtan geri sayalım? "))
while sayi > 0:
    print(sayi)
    sayi = sayi - 1
print("Kalkış!")`,
      },
    },
    {
      tur: "alistirma",
      alistirma: {
        id: "k10-tahmin",
        baslik: "Sayı tahmin oyunu (geliştirilmiş)",
        gorev: `if-else dersindeki tahmin oyununu geliştirelim. Gizli sayı **11**. Kullanıcı doğru bulana kadar tahmin istemeye devam et:

- Tahmin gizli sayıdan büyükse \`Daha küçük\`
- Küçükse \`Daha büyük\`
- Doğruysa \`Bildin! 3 denemede buldun.\` (deneme sayısıyla) yaz ve oyunu bitir.

Kullanıcı sırayla 5, 20, 11 girerse:
\`\`\`
Daha büyük
Daha küçük
Bildin! 3 denemede buldun.
\`\`\``,
        baslangicKodu: `gizli = 11
deneme = 0
`,
        testler: [
          { girdiler: ["5", "20", "11"], beklenen: "Daha büyük\nDaha küçük\nBildin! 3 denemede buldun." },
          { girdiler: ["11"], beklenen: "Bildin! 1 denemede buldun." },
          { girdiler: ["15", "1", "9", "10", "11"], beklenen: "Daha küçük\nDaha büyük\nDaha büyük\nDaha büyük\nBildin! 5 denemede buldun." },
        ],
        kodKurallari: [{ desen: "\\bwhile\\b", mesaj: "Kaç tahmin yapılacağı belli olmadığı için `while` döngüsü kullanmalısın." }],
        ipuclari: [
          "`while True:` ile sürekli dönen bir döngü kur; doğru tahminde `break` ile çık.",
          "Her tahminde `deneme = deneme + 1` yapmayı unutma.",
          'Son mesaj: `print("Bildin!", deneme, "denemede buldun.")`',
        ],
        cozum: `gizli = 11
deneme = 0
while True:
    tahmin = int(input("Tahminin: "))
    deneme = deneme + 1
    if tahmin > gizli:
        print("Daha küçük")
    elif tahmin < gizli:
        print("Daha büyük")
    else:
        print("Bildin!", deneme, "denemede buldun.")
        break`,
      },
    },
    {
      tur: "ipucu",
      renk: "basari",
      baslik: "Kontrol Noktası",
      icerik: `- **while döngüsü**, belirtilen şart sağlandığı sürece tekrar eden şartlı bir döngüdür.
- Döngüdeki işlemlerin tekrar sayısı **sayaç** değişkeniyle kontrol edilir: başlangıç, bitiş şartı, artış miktarı.
- Aynı problem hem for hem while ile çözülebilir.
- **break** döngüyü sonlandırır, **continue** bir sonraki tura geçer.`,
    },
  ],
};

export default ders;
