import type { Ders } from "@/content/tipler";
import Markdown from "./Markdown";
import KodCalistirici from "./KodCalistirici";
import Soru from "./Soru";
import Alistirma from "./Alistirma";
import SemaBlok from "./SemaBlok";
import Siralama from "./Siralama";

export default function DersIcerigi({ ders }: { ders: Ders }) {
  let alistirmaNo = 0;
  return (
    <>
      {ders.bloklar.map((b, i) => {
        switch (b.tur) {
          case "metin":
            return <Markdown key={i}>{b.icerik}</Markdown>;
          case "ornek":
            return (
              <div key={i} className="ornek">
                {b.aciklama && <p className="ornek-aciklama">{b.aciklama}</p>}
                <KodCalistirici kod={b.kod} girdiler={b.girdiler} baslik={b.baslik ? (b.baslik.startsWith("Örnek") ? `🧪 ${b.baslik}` : `🧪 Örnek: ${b.baslik}`) : "🧪 Örnek"} />
              </div>
            );
          case "ipucu":
            return (
              <aside key={i} className={`kutu kutu-${b.renk ?? "bilgi"}`}>
                {b.baslik && <div className="kutu-baslik">{b.renk === "uyari" ? "⚠️" : b.renk === "basari" ? "✅" : "💡"} {b.baslik}</div>}
                <Markdown>{b.icerik}</Markdown>
              </aside>
            );
          case "gorsel":
            return (
              <figure key={i} className="gorsel">
                <div className="gorsel-cizim" dangerouslySetInnerHTML={{ __html: b.svg }} />
                {b.altyazi && <figcaption>{b.altyazi}</figcaption>}
              </figure>
            );
          case "sema":
            return <SemaBlok key={i} ornek={b.ornek} parcalar={b.parcalar} baslik={b.baslik} altyazi={b.altyazi} />;
          case "siralama":
            return <Siralama key={i} baslik={b.baslik} gorev={b.gorev} adimlar={b.adimlar} />;
          case "soru":
            return <Soru key={i} {...b} />;
          case "alistirma":
            alistirmaNo++;
            return <Alistirma key={b.alistirma.id} a={b.alistirma} no={alistirmaNo} />;
        }
      })}
    </>
  );
}
