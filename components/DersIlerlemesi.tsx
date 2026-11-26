"use client";
import { useIlerleme } from "@/lib/depo";

// Her alıştırma için defterdeki gibi bir kutucuk; çözülenler işaretlenir.
export default function DersIlerlemesi({ idler, kucuk }: { idler: string[]; kucuk?: boolean }) {
  const ilerleme = useIlerleme();
  const biten = idler.filter((id) => ilerleme[id]).length;
  return (
    <span className={kucuk ? "ilerleme kucuk" : "ilerleme"} title={`${biten} / ${idler.length} alıştırma tamamlandı`}>
      <span className="ilerleme-kutular" aria-hidden="true">
        {idler.map((id) => (
          <span key={id} className={ilerleme[id] ? "kutucuk dolu" : "kutucuk"} />
        ))}
      </span>
      <span className="ilerleme-yazi">
        {kucuk ? `${biten}/${idler.length}` : biten === idler.length && idler.length > 0 ? "Bütün alıştırmalar tamam" : `${biten} / ${idler.length} alıştırma`}
      </span>
    </span>
  );
}
