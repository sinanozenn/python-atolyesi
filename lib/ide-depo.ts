"use client";
// IDE dosyalarının tarayıcıda (localStorage) saklanması.

export type IdeDosyasi = { ad: string; kod: string };
export type IdeDurumu = { dosyalar: IdeDosyasi[]; aktif: string };

const ANAHTAR = "atolye-ide";
const ACILACAK = "atolye-ide-acilacak";

export const VARSAYILAN_KOD = `# 🐍 Python Atölyesi IDE'sine hoş geldin!
# Kodunu buraya yaz ve ▶ Çalıştır'a bas (kısayol: Ctrl + Enter).
# Program input() ile bir şey sorarsa cevabını sağdaki konsola yazabilirsin.

ad = input("Adın ne? ")
print("Merhaba", ad + "!")

for i in range(1, 6):
    print(i, "x", i, "=", i * i)
`;

export function idDurumunuOku(): IdeDurumu {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    if (ham) {
      const d = JSON.parse(ham) as IdeDurumu;
      if (Array.isArray(d.dosyalar) && d.dosyalar.length > 0) {
        if (!d.dosyalar.some((f) => f.ad === d.aktif)) d.aktif = d.dosyalar[0].ad;
        return d;
      }
    }
  } catch {}
  return { dosyalar: [{ ad: "ana.py", kod: VARSAYILAN_KOD }], aktif: "ana.py" };
}

export function idDurumunuKaydet(d: IdeDurumu) {
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(d));
  } catch {}
}

/** Ders sayfalarından "IDE'de aç" ile gönderilen kodu bırakır */
export function ideyeGonder(ad: string, kod: string) {
  try {
    localStorage.setItem(ACILACAK, JSON.stringify({ ad, kod }));
  } catch {}
}

export function acilacakKoduAl(): IdeDosyasi | null {
  try {
    const ham = localStorage.getItem(ACILACAK);
    if (!ham) return null;
    localStorage.removeItem(ACILACAK);
    return JSON.parse(ham);
  } catch {
    return null;
  }
}

/** Dosya adını düzenler: Türkçe karakterleri ve boşlukları sadeleştirir, .py ekler, çakışmayı önler */
export function dosyaAdiDuzenle(ad: string, mevcut: string[]): string {
  const harita: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "I", ö: "o", ş: "s", ü: "u", Ç: "C", Ğ: "G", Ö: "O", Ş: "S", Ü: "U" };
  let temiz = ad
    .trim()
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (c) => harita[c] ?? c)
    .replace(/\.py$/i, "")
    .replace(/[^A-Za-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
  if (!temiz) temiz = "dosya";
  let aday = `${temiz}.py`;
  let n = 2;
  while (mevcut.includes(aday)) aday = `${temiz}_${n++}.py`;
  return aday;
}
