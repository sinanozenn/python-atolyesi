"use client";
// Tarayıcıda (localStorage) saklanan veriler: tamamlanan alıştırmalar ve öğrencinin yazdığı kodlar. Hesap/kişisel veri yoktur; her şey öğrencinin kendi cihazında kalır.

import { useSyncExternalStore } from "react";

const ILERLEME = "atolye-ilerleme";
const dinleyiciler = new Set<() => void>();

function oku(anahtar: string): string | null {
  try {
    return localStorage.getItem(anahtar);
  } catch {
    return null;
  }
}
function yaz(anahtar: string, deger: string | null) {
  try {
    if (deger === null) localStorage.removeItem(anahtar);
    else localStorage.setItem(anahtar, deger);
  } catch {}
  dinleyiciler.forEach((f) => f());
}
function abone(f: () => void) {
  dinleyiciler.add(f);
  const depo = (e: StorageEvent) => f();
  window.addEventListener("storage", depo);
  return () => {
    dinleyiciler.delete(f);
    window.removeEventListener("storage", depo);
  };
}

// --- Kayıtlı işaret listeleri (JSON nesnesi, değişmedikçe aynı nesne döner) ---
const BOS: Record<string, boolean> = {};
const onbellekler = new Map<string, { ham: string | null; deger: Record<string, boolean> }>();

function isaretleriOku(anahtar: string): Record<string, boolean> {
  const ham = oku(anahtar);
  const o = onbellekler.get(anahtar);
  if (o && o.ham === ham) return o.deger;
  let deger: Record<string, boolean> = {};
  try {
    deger = ham ? JSON.parse(ham) : {};
  } catch {}
  onbellekler.set(anahtar, { ham, deger });
  return deger;
}

// --- İlerleme (tamamlanan görevler) ---
const ilerlemeOku = () => isaretleriOku(ILERLEME);

export function useIlerleme(): Record<string, boolean> {
  return useSyncExternalStore(abone, ilerlemeOku, () => BOS);
}

// --- İlk denemede doğru cevaplanan sorular ---
const SORULAR = "atolye-sorular";
const sorulariOku = () => isaretleriOku(SORULAR);

export function useSorular(): Record<string, boolean> {
  return useSyncExternalStore(abone, sorulariOku, () => BOS);
}

export function soruDogruIsaretle(id: string) {
  if (sorulariOku()[id]) return;
  yaz(SORULAR, JSON.stringify({ ...sorulariOku(), [id]: true }));
}

// --- Puan ---
export const GOREV_PUANI = 20;
export const SORU_PUANI = 5;

export function usePuan(): number {
  const g = useIlerleme();
  const s = useSorular();
  return Object.keys(g).length * GOREV_PUANI + Object.keys(s).length * SORU_PUANI;
}

export function tamamlandiIsaretle(id: string) {
  yaz(ILERLEME, JSON.stringify({ ...ilerlemeOku(), [id]: true }));
}

export function ilerlemeyiSifirla() {
  yaz(SORULAR, null);
  yaz(ILERLEME, null);
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("atolye-kod-"))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
}

// --- Öğrencinin kodu ---
export function kayitliKod(id: string): string | null {
  return oku(`atolye-kod-${id}`);
}
export function koduKaydet(id: string, kod: string | null) {
  try {
    if (kod === null) localStorage.removeItem(`atolye-kod-${id}`);
    else localStorage.setItem(`atolye-kod-${id}`, kod);
  } catch {}
}
