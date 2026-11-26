import Link from "next/link";
import { dersler, alistirmalar, kitapKunye } from "@/content";
import DersIlerlemesi from "./DersIlerlemesi";

// Kitabın içindekiler sayfası gibi: numara, başlık, noktalı çizgi, kitap bölümü ve sayfa.
export default function DersListesi() {
  return (
    <ol className="icindekiler">
      {dersler.map((d) => {
        const { bolum, sayfa } = kitapKunye(d);
        return (
          <li key={d.slug}>
            <Link href={`/dersler/${d.slug}`} className="icindekiler-satir">
              <span className="icindekiler-no">{d.sira}</span>
              <span className="icindekiler-govde">
                <span className="icindekiler-ust">
                  <span className="icindekiler-baslik">{d.baslik}</span>
                  <span className="icindekiler-nokta" aria-hidden="true" />
                  <span className="icindekiler-sayfa">{sayfa}</span>
                </span>
                <span className="icindekiler-alt">
                  <span>{d.ozet}</span>
                  <span className="icindekiler-bolumu">{bolum === "ünite sonu" ? "Ünite sonu soruları" : `Kitap ${bolum}`}</span>
                </span>
              </span>
              <DersIlerlemesi idler={alistirmalar(d).map((a) => a.id)} kucuk />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
