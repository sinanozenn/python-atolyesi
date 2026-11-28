import Link from "next/link";
import { notFound } from "next/navigation";
import { dersler, dersBul } from "@/content";
import DersEtiketi from "@/components/DersEtiketi";
import DersIcerigi from "@/components/DersIcerigi";
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
        <DersEtiketi ders={ders} buyuk />
        <div>
          <div className="ders-no">Ders {ders.sira} · {ders.sure}</div>
          <h1>{ders.baslik}</h1>
        </div>
      </div>

      <div className="hedefler">
        <div className="kutu-baslik">🎯 Bu derste öğreneceklerin</div>
        <ul>
          {ders.hedefler.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>


      <DersIcerigi ders={ders} />

      <nav className="ders-gezinme">
        {onceki ? (
          <Link href={`/dersler/${onceki.slug}`} className="dugme">← {onceki.baslik}</Link>
        ) : <span />}
        {sonraki ? (
          <Link href={`/dersler/${sonraki.slug}`} className="dugme dugme-ana">{sonraki.baslik} →</Link>
        ) : (
          <Link href="/ide" className="dugme dugme-ana">IDE&apos;de serbest çalış →</Link>
        )}
      </nav>
    </article>
  );
}
