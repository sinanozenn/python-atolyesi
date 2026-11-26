"use client";
import { useOyun } from "@/lib/oyun";

export default function PuanCubugu() {
  const { puan, enCokPuan } = useOyun();
  const oran = enCokPuan ? Math.min(100, Math.round((puan / enCokPuan) * 100)) : 0;
  return (
    <div className="puan" title={`${enCokPuan} puanın ${puan} puanı toplandı`}>
      <span className="puan-sayi">{puan} puan</span>
      <span className="puan-cubuk" role="progressbar" aria-valuemin={0} aria-valuemax={enCokPuan} aria-valuenow={puan} aria-label="Toplam puan">
        <span style={{ width: `${oran}%` }} />
      </span>
    </div>
  );
}
