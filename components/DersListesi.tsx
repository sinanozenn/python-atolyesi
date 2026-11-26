import Link from "next/link";
import { dersler, alistirmalar } from "@/content";
import DersIlerlemesi from "./DersIlerlemesi";

export default function DersListesi() {
  return (
    <div className="ders-izgarasi">
      {dersler.map((d) => (
        <Link key={d.slug} href={`/dersler/${d.slug}`} className="ders-karti">
          <div className="ders-karti-ust">
            <span className="ders-simge">{d.simge}</span>
            <span className="ders-no">Ders {d.sira} · {d.sure}</span>
          </div>
          <h3>{d.baslik}</h3>
          <p>{d.ozet}</p>
          <div className="kart-kitap">📖 {d.kitap.split(" · ")[0]}</div>
          <DersIlerlemesi idler={alistirmalar(d).map((a) => a.id)} kucuk />
        </Link>
      ))}
    </div>
  );
}
