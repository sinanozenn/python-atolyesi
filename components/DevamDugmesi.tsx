"use client";
import Link from "next/link";
import { dersler } from "@/content";
import { useOyun } from "@/lib/oyun";

export default function DevamDugmesi() {
  const { siradaki, puan } = useOyun();
  const d = siradaki === null ? dersler[dersler.length - 1] : dersler[siradaki];
  const yazi = puan === 0 ? "1. seviyeden başla" : siradaki === null ? "Sınavı tekrar çöz" : `${d.sira}. seviyeye devam et`;
  return (
    <Link href={`/dersler/${d.slug}`} className="dugme dugme-ana dugme-buyuk">
      {yazi}
    </Link>
  );
}
