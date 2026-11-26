import Link from "next/link";
import type { CSSProperties } from "react";
import { dersler, dersRengi, hazirlikMi } from "@/content";

export default function DersListesi() {
  const gruplar = [
    { ad: "Hazırlık: problem çözme", liste: dersler.filter(hazirlikMi) },
    { ad: "Python ile programlama", liste: dersler.filter((d) => !hazirlikMi(d)) },
  ];
  return (
    <>
      {gruplar.map((g) => (
        <section key={g.ad} className="ders-grubu">
          <h3 className="liste-ara">{g.ad}</h3>
          <ol className="ders-kartlari">
            {g.liste.map((d) => (
              <li key={d.slug}>
                <Link href={`/dersler/${d.slug}`} className="ders-karti" style={{ "--r": dersRengi(d) } as CSSProperties}>
                  <span className="ders-karti-no">{d.sira}</span>
                  <span className="ders-karti-baslik">{d.baslik}</span>
                  <span className="ders-karti-ozet">{d.ozet}</span>
                  <span className="ders-karti-sure">{d.sure.replace("dk", "dakika")}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </>
  );
}
