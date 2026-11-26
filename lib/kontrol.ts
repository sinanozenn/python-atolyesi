"use client";
// Alıştırmaları otomatik kontrol eder: kodu her test girdisiyle çalıştırıp çıktıyı karşılaştırır.

import type { AlistirmaVerisi, Test } from "@/content/tipler";
import type { PythonHatasi } from "./hatalar";
import { pythonCalistir } from "./python";

export type TestSonucu = {
  test: Test;
  gecti: boolean;
  cikti: string;
  hata: PythonHatasi | null;
};

export type KontrolSonucu = {
  basarili: boolean;
  kuralHatalari: string[];
  testler: TestSonucu[];
};

export function ciktiyiDuzenle(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((satir) => satir.trimEnd())
    .join("\n")
    .trim();
}

export async function alistirmayiKontrolEt(kod: string, a: AlistirmaVerisi): Promise<KontrolSonucu> {
  const kuralHatalari = (a.kodKurallari ?? [])
    .filter((k) => {
      const var_ = new RegExp(k.desen, "m").test(kod);
      return k.olmamali ? var_ : !var_;
    })
    .map((k) => k.mesaj);

  const testler: TestSonucu[] = [];
  for (const test of a.testler) {
    const { cikti, hata } = await pythonCalistir(kod, test.girdiler ?? [], false);
    const gecti = !hata && ciktiyiDuzenle(cikti) === ciktiyiDuzenle(test.beklenen);
    testler.push({ test, gecti, cikti, hata });
    if (hata?.tur === "ZamanAsimi") break; // sonsuz döngüde diğer testleri boşuna bekletme
  }
  return {
    basarili: kuralHatalari.length === 0 && testler.length === a.testler.length && testler.every((t) => t.gecti),
    kuralHatalari,
    testler,
  };
}
