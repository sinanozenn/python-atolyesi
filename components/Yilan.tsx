"use client";
import { useOyun } from "@/lib/oyun";

// Pikselden bir Python yılanı: puan arttıkça uzar. Elma, bir sonraki puanın hedefi.
const DESEN = [0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 1];

export default function Yilan() {
  const { puan } = useOyun();
  const uzunluk = Math.min(4 + Math.floor(puan / 40), 22);
  let y = 2;
  const govde: { x: number; y: number }[] = [];
  for (let i = 0; i < uzunluk; i++) {
    y = Math.max(1, Math.min(3, y + (DESEN[i] ?? 0)));
    govde.push({ x: i, y });
  }
  const bas = govde[govde.length - 1];
  const genislik = 26;
  return (
    <svg className="yilan" viewBox={`0 0 ${genislik * 10} 50`} role="img" aria-label={`Yılanın uzunluğu ${uzunluk} kare`}>
      {govde.slice(0, -1).map((p, i) => (
        <rect key={i} x={p.x * 10} y={p.y * 10} width="10" height="10" fill={i % 2 ? "#3fb950" : "#47c45a"} />
      ))}
      <rect x={bas.x * 10} y={bas.y * 10 - 5} width="16" height="16" fill="#2d8a3e" />
      <rect x={bas.x * 10 + 9} y={bas.y * 10 - 1} width="4" height="4" fill="#fff" />
      <rect x={bas.x * 10 + 16} y={bas.y * 10 + 6} width="7" height="3" fill="#e5484d" />
      <rect x={(genislik - 2) * 10} y="20" width="10" height="10" fill="#ffd23f" />
    </svg>
  );
}
