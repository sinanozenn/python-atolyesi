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

// --- İlerleme ---
let onbellekHam: string | null = null;
let onbellek: Record<string, boolean> = {};
const BOS: Record<string, boolean> = {};

function ilerlemeOku(): Record<string, boolean> {
  const ham = oku(ILERLEME);
  if (ham !== onbellekHam) {
    onbellekHam = ham;
    try {
      onbellek = ham ? JSON.parse(ham) : {};
    } catch {
      onbellek = {};
    }
  }
  return onbellek;
}

export function useIlerleme(): Record<string, boolean> {
  return useSyncExternalStore(abone, ilerlemeOku, () => BOS);
}

export function tamamlandiIsaretle(id: string) {
  yaz(ILERLEME, JSON.stringify({ ...ilerlemeOku(), [id]: true }));
}

export function ilerlemeyiSifirla() {
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
