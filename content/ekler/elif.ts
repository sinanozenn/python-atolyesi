import type { Blok } from "../tipler";

const bloklar: Blok[] = [
  {
    tur: "metin",
    icerik: `
## Daha yakından: elif'te sıra neden önemli?

Python **if-elif-else** zincirinde koşulları **yukarıdan aşağıya** kontrol eder ve **ilk doğru koşulun** bloğunu çalıştırır. Geri kalan koşullara **hiç bakılmaz**.

Bu yüzden koşulların sırası sonucu değiştirebilir. Aşağıdaki iki kodu karşılaştır (not = 95):

| Doğru sıralama | Yanlış sıralama |
|---|---|
| \`if not >= 85:\` → **Pekiyi** ✔ | \`if not >= 50:\` → **Geçer** ✘ |
| \`elif not >= 70:\` | \`elif not >= 70:\` |
| \`elif not >= 50:\` | \`elif not >= 85:\` |

Yanlış sıralamada 95 ≥ 50 ilk koşulda doğru olduğu için “Geçer” yazılır ve diğer koşullara bakılmaz. **Kural:** Aralıklarla çalışırken en dar ya da en büyük koşulu **en başa** yaz.

**if-elif ile art arda if farkı:** Art arda yazılmış ayrı \`if\`'lerin **hepsi** kontrol edilir; birden fazlası çalışabilir. \`elif\` zincirinde ise **en fazla bir** blok çalışır.

## Kolaydan zora örnekler
`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Trafik ışığı",
    aciklama: "Üç seçenek, üç blok. Girdiyi kırmızı, sarı, yeşil ya da başka bir şey olarak değiştir.",
    kod: `isik = input("Işığın rengi: ")
if isik == "kırmızı":
    print("Dur!")
elif isik == "sarı":
    print("Hazırlan.")
elif isik == "yeşil":
    print("Geç.")
else:
    print("Böyle bir renk yok.")`,
    girdiler: ["sarı"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟢 Kolay: Yaş grubu",
    aciklama: "Aralıklar küçükten büyüğe kontrol ediliyor. Sınır değerlerini (12, 13, 17, 18) dene.",
    kod: `yas = int(input("Yaş: "))
if yas <= 12:
    print("Çocuk")
elif yas <= 17:
    print("Genç")
elif yas <= 64:
    print("Yetişkin")
else:
    print("Yaşlı")`,
    girdiler: ["15"],
  },
  {
    tur: "soru",
    soru: "Yaş grubu örneğine **13** girilirse hangi satır yazılır?",
    secenekler: ["Çocuk", "Genç", "Yetişkin", "Hiçbiri"],
    dogru: 1,
    aciklama: "13 <= 12 yanlış. 13 <= 17 doğru: **Genç** yazılır ve zincir biter.",
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Ayrı if'ler ile elif farkı",
    aciklama: "Aynı sayı iki programda farklı sonuç veriyor. İlkinde iki if de çalışıyor, ikincisinde sadece biri.",
    kod: `sayi = 30
print("--- Ayrı if'ler ---")
if sayi > 10:
    print("10'dan büyük")
if sayi > 20:
    print("20'den büyük")
print("--- if-elif ---")
if sayi > 10:
    print("10'dan büyük")
elif sayi > 20:
    print("20'den büyük")`,
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🟡 Orta: Vücut kitle indeksi",
    aciklama: "VKİ = kilo / (boy × boy), boy metre cinsinden. Sonuç aralıklara göre yorumlanır.",
    kod: `kilo = float(input("Kilo (kg): "))
boy = float(input("Boy (m): "))
vki = kilo / (boy * boy)
print("VKİ:", round(vki, 1))
if vki < 18.5:
    print("Zayıf")
elif vki < 25:
    print("Normal")
elif vki < 30:
    print("Fazla kilolu")
else:
    print("Obez")`,
    girdiler: ["60", "1.70"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Üç sayının en büyüğü",
    aciklama: "and ile birleşik koşullar ve elif. Eşit sayıları da dene: 5, 5, 3.",
    kod: `a = int(input("a: "))
b = int(input("b: "))
c = int(input("c: "))
if a >= b and a >= c:
    print("En büyük:", a)
elif b >= a and b >= c:
    print("En büyük:", b)
else:
    print("En büyük:", c)`,
    girdiler: ["12", "47", "33"],
  },
  {
    tur: "ornek",
    baslik: "Örnek · 🔴 Zor: Kademeli kargo ücreti",
    aciklama: "Ağırlığa göre farklı fiyat, üstüne iç içe bir karar: üye olanlara 10 TL indirim.",
    kod: `agirlik = float(input("Ağırlık (kg): "))
uye = input("Üye misin? (e/h): ")
if agirlik <= 1:
    ucret = 50
elif agirlik <= 5:
    ucret = 80
elif agirlik <= 20:
    ucret = 150
else:
    ucret = 150 + (agirlik - 20) * 10
if uye == "e":
    if ucret > 10:
        ucret = ucret - 10
print("Kargo ücreti:", ucret, "TL")`,
    girdiler: ["3.5", "e"],
  },
  {
    tur: "soru",
    soru: "Kargo örneğinde **25 kg** ve üye olmayan biri için ücret nedir?",
    secenekler: ["150 TL", "200.0 TL", "250 TL", "190.0 TL"],
    dogru: 1,
    aciklama: "25 > 20 olduğu için else bloğu çalışır: 150 + (25 − 20) × 10 = 150 + 50 = **200.0**. Üye olmadığı için indirim yok.",
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k8-mevsim",
      baslik: "🟡 Orta: Hangi mevsim?",
      gorev: `Kullanıcıdan ayın numarasını (1–12) al ve mevsimini yazdır:

- 12, 1, 2 → **Kış**
- 3, 4, 5 → **İlkbahar**
- 6, 7, 8 → **Yaz**
- 9, 10, 11 → **Sonbahar**
- Başka bir sayı → **Geçersiz ay**`,
      baslangicKodu: `ay = int(input("Ay (1-12): "))\n`,
      testler: [
        { girdiler: ["1"], beklenen: "Kış" },
        { girdiler: ["12"], beklenen: "Kış" },
        { girdiler: ["4"], beklenen: "İlkbahar" },
        { girdiler: ["8"], beklenen: "Yaz" },
        { girdiler: ["10"], beklenen: "Sonbahar" },
        { girdiler: ["13"], beklenen: "Geçersiz ay" },
      ],
      kodKurallari: [{ desen: "\\belif\\b", mesaj: "Bu alıştırmada `elif` kullanmalısın." }],
      ipuclari: ["Kış için: ay == 12 or ay == 1 or ay == 2", "İlkbahar için: ay >= 3 and ay <= 5"],
      cozum: `ay = int(input("Ay (1-12): "))
if ay == 12 or ay == 1 or ay == 2:
    print("Kış")
elif ay >= 3 and ay <= 5:
    print("İlkbahar")
elif ay >= 6 and ay <= 8:
    print("Yaz")
elif ay >= 9 and ay <= 11:
    print("Sonbahar")
else:
    print("Geçersiz ay")`,
    },
  },
  {
    tur: "alistirma",
    alistirma: {
      id: "k8-ucgen-turu",
      baslik: "🔴 Zor: Üçgenin türü",
      gorev: `Kullanıcıdan üç kenar uzunluğu al.

- Bu kenarlarla üçgen **çizilemiyorsa** "Üçgen değil" yaz. (Her kenar diğer ikisinin toplamından küçük olmalı.)
- Üç kenar eşitse **Eşkenar**,
- Yalnızca iki kenar eşitse **İkizkenar**,
- Hiçbiri eşit değilse **Çeşitkenar** yaz.`,
      baslangicKodu: `a = int(input("a: "))\nb = int(input("b: "))\nc = int(input("c: "))\n`,
      testler: [
        { girdiler: ["5", "5", "5"], beklenen: "Eşkenar" },
        { girdiler: ["5", "5", "8"], beklenen: "İkizkenar" },
        { girdiler: ["7", "4", "7"], beklenen: "İkizkenar" },
        { girdiler: ["3", "4", "5"], beklenen: "Çeşitkenar" },
        { girdiler: ["1", "2", "10"], beklenen: "Üçgen değil" },
      ],
      ipuclari: [
        "Önce üçgen olup olmadığını kontrol et: if not (a < b + c and b < a + c and c < a + b):",
        "İkizkenar için: a == b or b == c or a == c (eşkenar kontrolünden SONRA)",
      ],
      cozum: `a = int(input("a: "))
b = int(input("b: "))
c = int(input("c: "))
if not (a < b + c and b < a + c and c < a + b):
    print("Üçgen değil")
elif a == b and b == c:
    print("Eşkenar")
elif a == b or b == c or a == c:
    print("İkizkenar")
else:
    print("Çeşitkenar")`,
    },
  },
];

export default bloklar;
