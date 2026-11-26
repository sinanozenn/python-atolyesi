"use client";
import Link from "next/link";
import { dersler, kitapKunye } from "@/content";
import { useOyun } from "@/lib/oyun";

// Seviye haritası: her ders bir seviye. Hiçbir seviye kilitli değildir; "sıradaki" yalnızca bir öneridir.
export default function Harita() {
  const { seviyeler, siradaki } = useOyun();
  return (
    <ol className="harita">
      {dersler.map((d, i) => {
        const s = seviyeler[i];
        const sinav = i === dersler.length - 1;
        const durum = s.tamam ? "tamam" : i === siradaki ? "siradaki" : "bos";
        return (
          <li key={d.slug} className={`seviye seviye-${durum}${sinav ? " seviye-sinav" : ""}`}>
            <Link href={`/dersler/${d.slug}`} className="seviye-bag">
              <span className="seviye-rozet" aria-hidden="true">
                {sinav ? "Sınav" : d.sira}
              </span>
              <span className="seviye-ad">{d.baslik.replace(/^(Karar Yapıları|Döngü Yapıları): /, "")}</span>
              <span className="seviye-alt">
                {durum === "siradaki" ? (
                  <span className="seviye-siradaki">sıradaki</span>
                ) : (
                  <span className="yildizlar" aria-label={`${s.yildiz} yıldız`}>
                    {"★".repeat(s.yildiz)}
                    <span className="yildiz-bos">{"★".repeat(3 - s.yildiz)}</span>
                  </span>
                )}
              </span>
              <span className="seviye-kitap">{kitapKunye(d).bolum === "ünite sonu" ? "Ünite sonu" : `Kitap ${kitapKunye(d).bolum}`}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
