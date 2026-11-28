import type { CSSProperties } from "react";
import { dersRengi } from "@/content";
import type { Ders } from "@/content/tipler";

/** Dersin konusunu anlatan kısa kod etiketi (ör. print(), x = 5, for). */
export default function DersEtiketi({ ders, buyuk }: { ders: Ders; buyuk?: boolean }) {
  return (
    <span className={buyuk ? "ders-etiketi buyuk" : "ders-etiketi"} style={{ "--r": dersRengi(ders) } as CSSProperties} aria-hidden="true">
      {ders.simge}
    </span>
  );
}
