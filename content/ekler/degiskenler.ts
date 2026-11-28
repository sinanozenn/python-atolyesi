import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: atama nasıl çalışır?

\`x = x + 1\` matematikte imkânsız bir eşitliktir; programlamada ise çok sık kullanılır. Python bu satırı **sağdan sola** okur:

1. Önce **sağ taraf** hesaplanır: x'in **şu anki** değerine 1 eklenir.
2. Sonra bulunan sonuç **soldaki** kutuya konur; eski değer silinir.

x = 5 iken \`x = x + 1\` çalışırsa: sağ taraf 5 + 1 = 6 → x artık **6**'dır.

**Kısa yazımlar:** \`x = x + 1\` yerine \`x += 1\` yazılabilir. Aynı şekilde \`-=\`, \`*=\`, \`/=\` de vardır.

**İyi değişken adı nasıl seçilir?**
- Ne tuttuğunu anlatsın: \`a\` yerine \`ogrenci_sayisi\`
- Türkçe karakter kullanabilirsin ama alışkanlık olarak **ı, ş, ğ, ü, ö, ç** yerine i, s, g, u, o, c kullanmak daha yaygındır.
- Birden fazla kelimeyi **alt çizgi** ile birleştir: \`ders_notu\`

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Değişkenle bilgi kartı",
    aciklama: "Bilgileri bir kez değişkenlere yazıp istediğimiz kadar kullanabiliriz. Değerleri değiştirip çalıştır.",
    kod: `ad = "Elif"
sinif = "9-A"
okul_no = 128
print("Ad:", ad)
print("Sınıf:", sinif)
print("Numara:", okul_no)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Değişkenlerle hesap",
    aciklama: "Bir kalem 15 TL. Kaç kalem alırsak toplam ne kadar öderiz? Yalnızca adet değişkenini değiştirerek farklı durumları dene.",
    kod: `kalem_fiyati = 15
adet = 4
toplam = kalem_fiyati * adet
print(adet, "kalem", toplam, "TL")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Değer güncelleme",
    aciklama: "Aynı değişkenin değeri adım adım değişiyor. Her print'te x'in kaç olduğunu çalıştırmadan önce tahmin et.",
    kod: `x = 10
print(x)
x = x + 5
print(x)
x = x * 2
print(x)
x -= 7        # x = x - 7 ile aynı
print(x)`,
  },
  {
    tur: "soru",
    soru: "Aşağıdaki kodun çıktısı nedir?",
    kod: `puan = 50
puan = puan - 20
puan += 5
print(puan)`,
    secenekler: ["50", "35", "30", "75"],
    dogru: 1,
    aciklama: "50 − 20 = 30, sonra 30 + 5 = **35**.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Market alışverişi",
    aciklama: "Ara sonuçlar ayrı değişkenlerde tutulursa program hem okunur hem de kolay değiştirilir.",
    kod: `ekmek = 10
sut = 32
peynir = 120
ara_toplam = ekmek * 2 + sut + peynir
indirim = ara_toplam * 10 / 100
odenecek = ara_toplam - indirim
print("Ara toplam:", ara_toplam)
print("İndirim (%10):", indirim)
print("Ödenecek:", odenecek)`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: İki bardağın içindekini değiştirmek",
    aciklama: "a ile b'nin değerlerini yer değiştirmek için üçüncü bir 'boş bardak' (gecici) gerekir. Gecici olmadan denersen ne olur?",
    kod: `a = 3
b = 8
print("Önce:", a, b)
gecici = a
a = b
b = gecici
print("Sonra:", a, b)`,
  },
  {
    tur: "soru",
    soru: "a = 3, b = 8 iken **gecici kullanmadan** `a = b` ve ardından `b = a` yazılırsa sonuç ne olur?",
    secenekler: ["a = 8, b = 3", "a = 8, b = 8", "a = 3, b = 3", "Hata verir"],
    dogru: 1,
    aciklama: "a = b satırı a'yı 8 yapar; 3 kaybolur. Sonra b = a satırı b'ye de 8 koyar: **a = 8, b = 8**. Bu yüzden önce eski değeri gecici bir kutuda saklarız. (Python'da kısaca `a, b = b, a` da yazılabilir.)",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Birikimli faiz",
    aciklama: "Bankaya yatırılan para her yıl %10 artıyor. Aynı değişken her yıl güncelleniyor; round(sayi, 2) sonucu 2 basamağa yuvarlar.",
    kod: `para = 1000
oran = 10
para = para + para * oran / 100
print("1. yıl sonu:", round(para, 2))
para = para + para * oran / 100
print("2. yıl sonu:", round(para, 2))
para = para + para * oran / 100
print("3. yıl sonu:", round(para, 2))`,
  },
  {
    tur: "metin",
    icerik: `
## Sık yapılan hatalar
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Tanımlanmamış değişken",
    aciklama: "toplam değişkeni hiç oluşturulmadan kullanılmış. Bir değişkeni kullanmadan önce ona değer atamalısın.",
    kod: `sayi = 5
print(toplam)`,
    hataBekleniyor: true,
  },
  {
    tur: "ornek",
    baslik: "Örnek · Hata: Yazım farkı",
    aciklama: "Python için Sayi ile sayi farklı isimlerdir.",
    kod: `sayi = 5
print(Sayi)`,
    hataBekleniyor: true,
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k3-takas",
      baslik: "🟡 Orta: Değerleri yer değiştir",
      gorev: `\`sol = "elma"\` ve \`sag = "armut"\` değişkenlerinin değerlerini **yer değiştir**, sonra iki değişkeni yazdır. Çıktı:

\`\`\`
armut elma
\`\`\`

Son satırdaki \`print(sol, sag)\` komutunu değiştirme.`,
      baslangicKodu: `sol = "elma"
sag = "armut"
# buraya yaz

print(sol, sag)`,
      testler: [{ beklenen: "armut elma" }],
      kodKurallari: [{ desen: "print\\(sol, sag\\)", mesaj: "Son satır `print(sol, sag)` olarak kalmalı." }],
      ipuclari: ["Önce sol'un değerini gecici bir değişkende sakla.", "gecici = sol, sol = sag, sag = gecici"],
      cozum: `sol = "elma"
sag = "armut"
gecici = sol
sol = sag
sag = gecici
print(sol, sag)`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k3-kumbara",
      baslik: "🔴 Zor: Kumbara",
      gorev: `\`kumbara = 0\` ile başla. Aşağıdaki olayları sırayla \`kumbara\` değişkenini güncelleyerek uygula ve **her olaydan sonra** kumbaradaki parayı yazdır:

1. Harçlıktan 200 TL atıldı.
2. 45 TL'lik bir kitap alındı.
3. Bayramda kumbaradaki para **ikiye katlandı**.

Çıktı:
\`\`\`
200
155
310
\`\`\``,
      baslangicKodu: `kumbara = 0\n`,
      testler: [{ beklenen: "200\n155\n310" }],
      kodKurallari: [{ desen: "310", mesaj: "310'u kendin yazma; kumbara değişkenini güncelleyerek hesapla.", olmamali: true }],
      ipuclari: ["`kumbara = kumbara + 200` ya da kısaca `kumbara += 200`", "İkiye katlamak: `kumbara = kumbara * 2`"],
      cozum: `kumbara = 0
kumbara += 200
print(kumbara)
kumbara -= 45
print(kumbara)
kumbara *= 2
print(kumbara)`,
    },
  },
];

export default bloklar;
