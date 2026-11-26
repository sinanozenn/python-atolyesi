"use client";
import { useMotorDurumu } from "@/lib/python";

export default function MotorRozeti() {
  const d = useMotorDurumu();
  if (d === "hazir") return <span className="rozet rozet-hazir">● Python hazır</span>;
  if (d === "hata") return <span className="rozet rozet-hata">● Python yüklenemedi</span>;
  return <span className="rozet rozet-yukleniyor">● Python yükleniyor…</span>;
}
