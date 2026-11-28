import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: print() nasıl çalışır?

\`print\` bir **komuttur** (Python'da buna *fonksiyon* denir). Parantezin içine yazdığın her şey ekrana yazılır. Bilmen gereken birkaç ayrıntı:

- **Tırnak içindeki her şey** olduğu gibi yazılır: \`print("3 + 4")\` ekrana **3 + 4** yazar.
- **Tırnaksız** yazılan işlemler önce **hesaplanır**: \`print(3 + 4)\` ekrana **7** yazar.
- Virgülle ayrılan parçalar arasına **bir boşluk** konur: \`print("Yaş:", 15)\` → **Yaş: 15**
- Boş \`print()\` ekrana **boş bir satır** yazar.
- Tek tırnak (\`'merhaba'\`) ve çift tırnak (\`"merhaba"\`) aynı işi görür; ama açtığın tırnakla kapatmalısın.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Kendini tanıt",
    aciklama: "Her print ayrı bir satıra yazar. Kendi bilgilerinle değiştirip çalıştır.",
    kod: `print("Merhaba!")
print("Benim adım Deniz.")
print("Hazırlık sınıfındayım.")
print("En sevdiğim ders: Programlama")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Tırnaklı ve tırnaksız",
    aciklama: "İlk satır tırnak içinde olduğu için olduğu gibi yazılır; ikinci satırda Python önce hesap yapar. 👣 Adım adım çalıştır düğmesiyle her satırda neler olduğunu izle.",
    izle: true,
    kod: `print("8 * 7")
print(8 * 7)
print("8 * 7 =", 8 * 7)`,
  },
  {
    tur: "soru",
    soru: "Aşağıdaki kodun çıktısı nedir?",
    kod: `print("10 - 4", 10 - 4)`,
    secenekler: ["10 - 4 10 - 4", "6 6", "10 - 4 6", "10 - 46"],
    dogru: 2,
    aciklama: "Tırnak içindeki **10 - 4** olduğu gibi yazılır, tırnaksız **10 - 4** hesaplanır (6). Virgül araya bir boşluk koyar: **10 - 4 6**.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Boş satır ve süsleme",
    aciklama: "Boş print() satır atlar. Metinleri yan yana koyarak basit çizimler yapabilirsin.",
    kod: `print("**********")
print("*  KARNE  *")
print("**********")
print()
print("Matematik :", 85)
print("Fizik     :", 90)
print("Programlama:", 100)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Python hesap makinesi",
    aciklama: "print içinde birden çok işlem yapılabilir. Python çarpma ve bölmeyi toplama ve çıkarmadan önce yapar.",
    kod: `print("Bir haftada kaç saat var?", 7 * 24)
print("Bir yılda kaç dakika var?", 365 * 24 * 60)
print("3 kalem 12 TL, 2 defter 45 TL. Toplam:", 3 * 12 + 2 * 45)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Metni tekrar etmek",
    aciklama: "Bir metni bir sayıyla çarparsan metin o kadar kez yan yana yazılır. Bununla tek satırlık kodlarla çizim yapılabilir.",
    kod: `print("=" * 20)
print("Ha" * 3)
print(" " * 4 + "*")
print(" " * 3 + "***")
print(" " * 2 + "*****")
print(" " * 1 + "*******")
print("=" * 20)`,
  },
  {
    tur: "soru",
    soru: "`print(\"ab\" * 3)` komutunun çıktısı nedir?",
    secenekler: ["ab3", "ababab", "ab ab ab", "Hata verir"],
    dogru: 1,
    aciklama: "Metin × sayı, metni o kadar kez **yan yana** yazar: **ababab**. Araya boşluk konmaz.",
  },
  {
    tur: "metin",
    icerik: `
## Sık yapılan hatalar

Aşağıdaki örneklerin her biri **bilerek** hatalı. Çalıştırıp hata mesajını oku, sonra düzelt.
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata 1: Kapanmayan tırnak",
    aciklama: "Tırnak açıldı ama kapanmadı. Sonuna \" ekleyerek düzelt.",
    kod: `print("Merhaba)`,
    hataBekleniyor: true,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata 2: Büyük harf",
    aciklama: "Python büyük-küçük harfe duyarlıdır. Print ile print farklı şeylerdir.",
    kod: `Print("Merhaba")`,
    hataBekleniyor: true,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata 3: Eksik parantez",
    aciklama: "Açılan her parantez kapanmalı.",
    kod: `print("Toplam:", (3 + 4)`,
    hataBekleniyor: true,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k1-kutu",
      baslik: "🟡 Orta: İsim kartı",
      gorev: `Aşağıdaki gibi bir isim kartı yazdır. Kenarları oluşturmak için \`"*" * 17\` gibi metin çarpmayı kullanabilirsin.

\`\`\`
*****************
* PYTHON KULÜBÜ *
*****************
\`\`\`

(Ortadaki satırın sonunda da bir yıldız var.)`,
      baslangicKodu: `print("*" * 17)\n`,
      testler: [{ beklenen: "*****************\n* PYTHON KULÜBÜ *\n*****************" }],
      ipuclari: ["Üç ayrı print kullan.", 'Ortadaki satır: `print("* PYTHON KULÜBÜ *")`'],
      cozum: `print("*" * 17)
print("* PYTHON KULÜBÜ *")
print("*" * 17)`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k1-zaman",
      baslik: "🔴 Zor: Zaman hesabı",
      gorev: `Python'a hesap yaptırarak aşağıdaki üç satırı yazdır. Sayıları **kendin hesaplama**, işlemi print'in içine yaz.

\`\`\`
Bir günde 1440 dakika var.
Bir haftada 10080 dakika var.
Bir yılda 525600 dakika var.
\`\`\``,
      baslangicKodu: `print("Bir günde", 24 * 60, "dakika var.")\n`,
      testler: [{ beklenen: "Bir günde 1440 dakika var.\nBir haftada 10080 dakika var.\nBir yılda 525600 dakika var." }],
      kodKurallari: [
        { desen: "10080", mesaj: "10080'i kendin yazma; Python hesaplasın (ör. 7 * 24 * 60).", olmamali: true },
        { desen: "525600", mesaj: "525600'ü kendin yazma; Python hesaplasın (ör. 365 * 24 * 60).", olmamali: true },
      ],
      ipuclari: ["Bir hafta 7 gün, bir gün 24 saat, bir saat 60 dakika.", 'Örnek: `print("Bir haftada", 7 * 24 * 60, "dakika var.")`'],
      cozum: `print("Bir günde", 24 * 60, "dakika var.")
print("Bir haftada", 7 * 24 * 60, "dakika var.")
print("Bir yılda", 365 * 24 * 60, "dakika var.")`,
    },
  },
];

export default bloklar;
