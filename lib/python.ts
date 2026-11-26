"use client";
// Tarayıcı tarafı: Python worker'ını başlatır, kodları sırayla çalıştırır,
// sonsuz döngüye giren programları zaman aşımıyla durdurur.

import { useEffect, useSyncExternalStore } from "react";
import type { PythonHatasi } from "./hatalar";

export type CalismaSonucu = { cikti: string; hata: PythonHatasi | null };
export type MotorDurumu = "bekliyor" | "yukleniyor" | "hazir" | "hata";

const TEMEL_YOL = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ZAMAN_ASIMI_MS = 5000;

let worker: Worker | null = null;
let hazir: Promise<void> | null = null;
let durum: MotorDurumu = "bekliyor";
let sayac = 0;
let kuyruk: Promise<unknown> = Promise.resolve();
const dinleyiciler = new Set<() => void>();

function durumuAyarla(d: MotorDurumu) {
  durum = d;
  dinleyiciler.forEach((f) => f());
}

function baslat() {
  durumuAyarla("yukleniyor");
  const w = new Worker(`${TEMEL_YOL}/pyodide/worker.mjs`, { type: "module" });
  worker = w;
  hazir = new Promise<void>((coz, reddet) => {
    const dinle = (e: MessageEvent) => {
      if (e.data?.tip === "hazir") {
        w.removeEventListener("message", dinle);
        durumuAyarla("hazir");
        coz();
      } else if (e.data?.tip === "yuklenemedi") {
        w.removeEventListener("message", dinle);
        durumuAyarla("hata");
        reddet(new Error(e.data.mesaj));
      }
    };
    w.addEventListener("message", dinle);
    w.addEventListener("error", () => {
      durumuAyarla("hata");
      reddet(new Error("Python motoru yüklenemedi."));
    });
  });
  hazir.catch(() => {});
}

/** Python motorunu (henüz başlamadıysa) arka planda yüklemeye başlar. */
export function motoruHazirla() {
  if (!worker) baslat();
}

async function tekCalistir(kod: string, girdiler: string[], yanki: boolean): Promise<CalismaSonucu> {
  motoruHazirla();
  try {
    await hazir;
  } catch {
    return {
      cikti: "",
      hata: { tur: "MotorHatası", mesaj: "Python motoru yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.", satir: null, ayrinti: "" },
    };
  }
  const w = worker!;
  const id = ++sayac;
  return new Promise<CalismaSonucu>((coz) => {
    const zamanlayici = setTimeout(() => {
      w.removeEventListener("message", dinle);
      w.terminate();
      worker = null;
      baslat(); // sonraki çalıştırmalar için temiz bir motor
      coz({
        cikti: "",
        hata: { tur: "ZamanAsimi", mesaj: `Program ${ZAMAN_ASIMI_MS / 1000} saniyede bitmedi.`, satir: null, ayrinti: "" },
      });
    }, ZAMAN_ASIMI_MS);
    const dinle = (e: MessageEvent) => {
      if (e.data?.tip !== "sonuc" || e.data.id !== id) return;
      clearTimeout(zamanlayici);
      w.removeEventListener("message", dinle);
      coz({ cikti: e.data.cikti, hata: e.data.hata });
    };
    w.addEventListener("message", dinle);
    w.postMessage({ id, kod, girdiler, yanki });
  });
}

/**
 * Python kodunu çalıştırır. Çalıştırmalar sıraya alınır, aynı anda yalnızca biri çalışır.
 * @param yanki true ise input() istemleri ve girilen değerler terminaldeki gibi çıktıda görünür.
 */
export function pythonCalistir(kod: string, girdiler: string[] = [], yanki = true): Promise<CalismaSonucu> {
  const is = kuyruk.then(() => tekCalistir(kod, girdiler, yanki));
  kuyruk = is.catch(() => {});
  return is;
}

export function useMotorDurumu(): MotorDurumu {
  useEffect(() => {
    motoruHazirla();
  }, []);
  return useSyncExternalStore(
    (f) => {
      dinleyiciler.add(f);
      return () => dinleyiciler.delete(f);
    },
    () => durum,
    () => "bekliyor" as MotorDurumu
  );
}
