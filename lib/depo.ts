"use client";
// Öğrencinin alıştırmalarda yazdığı kod tarayıcıda (localStorage) saklanır; sayfa yenilense de kaybolmaz.
// Hesap, puan ya da ilerleme takibi yoktur.

export function kayitliKod(id: string): string | null {
  try {
    return localStorage.getItem(`atolye-kod-${id}`);
  } catch {
    return null;
  }
}

export function koduKaydet(id: string, kod: string | null) {
  try {
    if (kod === null) localStorage.removeItem(`atolye-kod-${id}`);
    else localStorage.setItem(`atolye-kod-${id}`, kod);
  } catch {}
}
