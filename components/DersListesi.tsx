import Link from "next/link";
import { dersler, hazirlikMi } from "@/content";

export default function DersListesi() {
  const gruplar = [
    { ad: "🧭 Hazırlık: problem çözme", liste: dersler.filter(hazirlikMi) },
    { ad: "🐍 Python ile programlama", liste: dersler.filter((d) => !hazirlikMi(d)) },
  ];
  return (
    <>
      {gruplar.map((g) => (
        <section key={g.ad} className="ders-grubu">
          <h3 className="grup-basligi">{g.ad}</h3>
          <div className="ders-izgarasi">
            {g.liste.map((d) => (
              <Link key={d.slug} href={`/dersler/${d.slug}`} className="ders-karti">
                <div className="ders-karti-ust">
                  <span className="ders-simge">{d.simge}</span>
                  <span className="ders-no">Ders {d.sira} · {d.sure}</span>
                </div>
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
