import Link from "next/link";
import { dersler, kitapKunye } from "@/content";

export default function DersListesi() {
  return (
    <ol className="ders-listesi">
      {dersler.map((d) => {
        const { bolum, sayfa } = kitapKunye(d);
        return (
          <li key={d.slug}>
            <Link href={`/dersler/${d.slug}`} className="ders-satir">
              <span className="ders-satir-no">{String(d.sira).padStart(2, "0")}</span>
              <span className="ders-satir-govde">
                <span className="ders-satir-baslik">{d.baslik}</span>
                <span className="ders-satir-ozet">{d.ozet}</span>
              </span>
              <span className="ders-satir-kitap">{bolum === "ünite sonu" ? "Ünite sonu" : `Kitap ${bolum}`}{sayfa ? `, ${sayfa}` : ""}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
