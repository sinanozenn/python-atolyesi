"use client";
// Oyun durumu: puan, seviye yıldızları ve sıradaki seviye. Yalnızca sitedeki mevcut görev ve soruları sayar.

import { dersler, alistirmalar, soruIdleri } from "@/content";
import { GOREV_PUANI, SORU_PUANI, useIlerleme, useSorular } from "./depo";

export type SeviyeDurumu = {
  slug: string;
  gorevToplam: number;
  gorevBiten: number;
  yildiz: number; // 0–3
  tamam: boolean;
};

export function useOyun() {
  const gorevler = useIlerleme();
  const sorular = useSorular();
  let puan = 0;
  let enCokPuan = 0;
  const seviyeler: SeviyeDurumu[] = dersler.map((d) => {
    const g = alistirmalar(d).map((a) => a.id);
    const s = soruIdleri(d);
    const gorevBiten = g.filter((id) => gorevler[id]).length;
    const soruBiten = s.filter((id) => sorular[id]).length;
    puan += gorevBiten * GOREV_PUANI + soruBiten * SORU_PUANI;
    enCokPuan += g.length * GOREV_PUANI + s.length * SORU_PUANI;
    const yildiz = g.length === 0 ? 0 : gorevBiten === 0 ? 0 : Math.ceil((3 * gorevBiten) / g.length);
    return { slug: d.slug, gorevToplam: g.length, gorevBiten, yildiz, tamam: g.length > 0 && gorevBiten === g.length };
  });
  const siradaki = seviyeler.findIndex((s) => !s.tamam);
  return { puan, enCokPuan, seviyeler, siradaki: siradaki === -1 ? null : siradaki };
}
