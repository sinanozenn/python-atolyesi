import Link from "next/link";
import { dersler, hazirlikMi } from "@/content";
import DersEtiketi from "./DersEtiketi";

export default function DersListesi() {
  const gruplar = [
    { ad: "Hazırlık: problem çözme", liste: dersler.filter(hazirlikMi) },
    { ad: "Python ile programlama", liste: dersler.filter((d) => !hazirlikMi(d)) },
  ];
  return (
    <>
      {gruplar.map((g) => (
        <section key={g.ad} className="ders-grubu">
          <h3 className="grup-basligi">{g.ad}</h3>
          <div className="ders-izgarasi">
            {g.liste.map((d) => (
              <Link key={d.slug} href={`/dersler/${d.slug}`} className="ders-karti">
                <DersEtiketi ders={d} />
                <h3>{d.baslik}</h3>
                <p>{d.ozet}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
