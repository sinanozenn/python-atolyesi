import Link from "next/link";
import { dersler } from "@/content";
import { sema } from "@/content/sema";
import { akisOrnegi } from "@/content/akis-ornekleri";
import DersListesi from "@/components/DersListesi";

export default function AnaSayfa() {
  const ornek = akisOrnegi("tek-cift");
  const svg = sema(ornek.ad, ornek.parcalar);
  return (
    <>
      <div className="kap">
        <section className="giris">
          <div className="giris-metin">
            <h1>Kod yazmayı adım adım öğren</h1>
            <p>
              Algoritma ve akış şemasıyla başla, Python&apos;la devam et. Her örneği, her akış şemasını ve kendi kodunu bu sitede
              çalıştırabilirsin.
            </p>
            <div className="dugmeler">
              <Link href={`/dersler/${dersler[0].slug}`} className="dugme giris-dugme">
                Derslere başla
              </Link>
              <Link href="/akis" className="dugme giris-dugme-ikincil">
                Akış şeması çiz
              </Link>
            </div>
          </div>
          <figure className="giris-sema">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <figcaption>{ornek.ad}</figcaption>
          </figure>
        </section>
      </div>

      <section className="kap liste-bolum">
        <h2>Dersler</h2>
        <DersListesi />
      </section>
    </>
  );
}
