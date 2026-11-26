"use client";
import { useIlerleme } from "@/lib/depo";

export default function DersIlerlemesi({ idler, kucuk }: { idler: string[]; kucuk?: boolean }) {
  const ilerleme = useIlerleme();
  const biten = idler.filter((id) => ilerleme[id]).length;
  const yuzde = idler.length ? Math.round((biten / idler.length) * 100) : 0;
  return (
    <div className={kucuk ? "ilerleme kucuk" : "ilerleme"}>
      <div className="ilerleme-cubuk">
        <div className="ilerleme-dolu" style={{ width: `${yuzde}%` }} />
      </div>
      <span className="ilerleme-yazi">
        {biten === idler.length && idler.length > 0 ? "✅ Tamamlandı" : `${biten}/${idler.length} alıştırma`}
      </span>
    </div>
  );
}
