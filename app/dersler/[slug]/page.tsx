import Link from "next/link";
import { notFound } from "next/navigation";
import { dersler, dersBul, alistirmalar } from "@/content";
import DersIcerigi from "@/components/DersIcerigi";
import DersIlerlemesi from "@/components/DersIlerlemesi";
import Markdown from "@/components/Markdown";
import MotorRozeti from "@/components/MotorRozeti";

export function generateStaticParams() {
  return dersler.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = dersBul((await params).slug);
  return { title: d ? d.baslik : "Ders bulunamadı" };
}

export default async function DersSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const ders = dersBul((await params).slug);
  if (!ders) notFound();
  const sira = dersler.indexOf(ders);
  const onceki = dersler[sira - 1];
  const sonraki = dersler[sira + 1];

  return (
    <article className="kap ders">
      <div className="ders-ust">
        <Link href="/dersler" className="geri">← Tüm dersler</Link>
        <MotorRozeti />
      </div>
      <div className="ders-baslik">
        <span className="ders-simge buyuk">{ders.simge}</span>
        <div>
          <div className="ders-no">Ders {ders.sira} · {ders.sure}</div>
          <h1>{ders.baslik}</h1>
        </div>
      </div>
      <div className="kitap-etiketi">📖 Ders kitabı: {ders.kitap}</div>
      <DersIlerlemesi idler={alistirmalar(ders).map((a) => a.id)} />

      <div className="hedefler">
        <div className="kutu-baslik">🎯 Bu derste öğreneceklerin</div>
        <ul>
          {ders.hedefler.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      {ders.ogretmenNotu && (
        <details className="ogretmen-notu">
          <summary>👩‍🏫 Öğretmen notu</summary>
          <Markdown>{ders.ogretmenNotu}</Markdown>
        </details>
      )}

      <DersIcerigi ders={ders} />

      <nav className="ders-gezinme">
        {onceki ? (
          <Link href={`/dersler/${onceki.slug}`} className="dugme">← {onceki.baslik}</Link>
        ) : <span />}
        {sonraki ? (
          <Link href={`/dersler/${sonraki.slug}`} className="dugme dugme-ana">{sonraki.baslik} →</Link>
        ) : (
          <Link href="/ide" className="dugme dugme-ana">IDE'de serbest çalış →</Link>
        )}
      </nav>
    </article>
  );
}
