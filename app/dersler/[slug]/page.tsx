import Link from "next/link";
import { notFound } from "next/navigation";
import { dersler, dersBul, kitapKunye } from "@/content";
import DersIcerigi from "@/components/DersIcerigi";
import SeviyeBasligi from "@/components/SeviyeBasligi";
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
        <Link href="/dersler" className="geri">
          Haritaya dön
        </Link>
        <MotorRozeti />
      </div>

      <header className="ders-baslik">
        <span className="ders-no" aria-hidden="true">{ders.sira === dersler.length ? "Sınav" : ders.sira}</span>
        <div>
          <p className="ust-etiket">{ders.sira === dersler.length ? "Son seviye" : `Seviye ${ders.sira}`}</p>
          <h1>{ders.baslik}</h1>
          <p className="ders-kunye">
            Kitapta {kitapKunye(ders).bolum === "ünite sonu" ? "ünite sonu" : `bölüm ${kitapKunye(ders).bolum}`}, {kitapKunye(ders).sayfa}. Süre {ders.sure.replace("dk", "dakika")}.
          </p>
        </div>
      </header>
      <SeviyeBasligi slug={ders.slug} />

      <section className="hedefler">
        <h2>Bu derste</h2>
        <ul>
          {ders.hedefler.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      {ders.ogretmenNotu && (
        <details className="ogretmen-notu">
          <summary>Öğretmen notu</summary>
          <Markdown>{ders.ogretmenNotu}</Markdown>
        </details>
      )}

      <DersIcerigi ders={ders} />

      <nav className="ders-gezinme" aria-label="Dersler arası geçiş">
        {onceki ? (
          <Link href={`/dersler/${onceki.slug}`} className="gezinme-bag">
            <span className="gezinme-yon">Önceki seviye</span>
            <span>{onceki.sira}. {onceki.baslik}</span>
          </Link>
        ) : (
          <span />
        )}
        {sonraki ? (
          <Link href={`/dersler/${sonraki.slug}`} className="gezinme-bag gezinme-sonraki">
            <span className="gezinme-yon">Sonraki seviye</span>
            <span>{sonraki.sira}. {sonraki.baslik}</span>
          </Link>
        ) : (
          <Link href="/ide" className="gezinme-bag gezinme-sonraki">
            <span className="gezinme-yon">Ünite bitti</span>
            <span>IDE'de serbest çalış</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
