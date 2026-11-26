import Link from "next/link";
import { dersler, kitapKunye } from "@/content";

export default function DersListesi() {
  const gruplar = [
    { ad: "Hazırlık: problem çözme", liste: dersler.filter((d) => d.kitap.startsWith("Hazırlık")) },
    { ad: "3. Ünite: Python ile programlama", liste: dersler.filter((d) => !d.kitap.startsWith("Hazırlık")) },
  ];
  return (
    <>
      {gruplar.map((g) => (
        <div key={g.ad}>
          <h3 className="liste-ara">{g.ad}</h3>
          <Satirlar liste={g.liste} />
        </div>
      ))}
    </>
  );
}

function Satirlar({ liste }: { liste: typeof dersler }) {
  return (
    <ol className="ders-listesi">
      {liste.map((d) => {
        const { etiket } = kitapKunye(d);
        return (
          <li key={d.slug}>
            <Link href={`/dersler/${d.slug}`} className="ders-satir">
              <span className="ders-satir-no">{String(d.sira).padStart(2, "0")}</span>
              <span className="ders-satir-govde">
                <span className="ders-satir-baslik">{d.baslik}</span>
                <span className="ders-satir-ozet">{d.ozet}</span>
              </span>
              <span className="ders-satir-kitap">{etiket}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
