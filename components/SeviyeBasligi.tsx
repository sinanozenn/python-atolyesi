"use client";
import { dersler } from "@/content";
import { useOyun } from "@/lib/oyun";

export default function SeviyeBasligi({ slug }: { slug: string }) {
  const { seviyeler } = useOyun();
  const i = dersler.findIndex((d) => d.slug === slug);
  const s = seviyeler[i];
  if (!s) return null;
  return (
    <div className="seviye-durum">
      <span className="yildizlar buyuk" aria-label={`${s.yildiz} yıldız`}>
        {"★".repeat(s.yildiz)}
        <span className="yildiz-bos">{"★".repeat(3 - s.yildiz)}</span>
      </span>
      <span>
        {s.gorevBiten} / {s.gorevToplam} görev tamam
      </span>
    </div>
  );
}
