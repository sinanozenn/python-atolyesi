"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "./Markdown";

// Adımları doğru sıraya dizme etkinliği. Karıştırma, sunucu ve tarayıcıda aynı sonucu vermesi için
// metinden türetilen sabit bir tohumla yapılır.
function karistir(adimlar: string[], tohum: string): number[] {
  let h = 2166136261;
  for (const c of tohum) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const sira = adimlar.map((_, i) => i);
  for (let i = sira.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const j = Math.abs(h) % (i + 1);
    [sira[i], sira[j]] = [sira[j], sira[i]];
  }
  if (sira.every((v, i) => v === i) && sira.length > 1) [sira[0], sira[1]] = [sira[1], sira[0]];
  return sira;
}

export default function Siralama({ baslik, gorev, adimlar }: { baslik: string; gorev: string; adimlar: string[] }) {
  const ilk = useMemo(() => karistir(adimlar, baslik), [adimlar, baslik]);
  const [sira, setSira] = useState<number[]>(ilk);
  const [kontrol, setKontrol] = useState(false);
  const dogruSayisi = sira.filter((v, i) => v === i).length;
  const tamam = dogruSayisi === adimlar.length;

  const liste = useRef<HTMLOListElement>(null);
  const [suruklenen, setSuruklenen] = useState<number | null>(null);

  const yerlestir = (adim: number, hedef: number) => {
    setSira((onceki) => {
      const yeni = onceki.filter((a) => a !== adim);
      yeni.splice(hedef, 0, adim);
      return yeni.every((a, i) => a === onceki[i]) ? onceki : yeni;
    });
    setKontrol(false);
  };

  // Sürüklenen adımı, işaretçinin altındaki boşluğa taşır (diğer adımların orta noktalarına göre).
  const hedefBul = (y: number, adim: number) => {
    const ogeler = Array.from(liste.current?.children ?? []) as HTMLElement[];
    let hedef = 0;
    for (const o of ogeler) {
      if (Number(o.dataset.adim) === adim) continue;
      const r = o.getBoundingClientRect();
      if (r.top + r.height / 2 < y) hedef++;
    }
    return hedef;
  };

  const basla = (e: React.PointerEvent<HTMLLIElement>, adim: number) => {
    const tutamak = (e.target as HTMLElement).closest(".siralama-tutamak");
    if (e.pointerType !== "mouse" && !tutamak) return; // dokunmatikte sayfa kaydırılabilsin
    if (e.button !== 0) return;
    e.preventDefault();
    setSuruklenen(adim);
  };

  // Sürükleme sırasında öğeler yer değiştirdiği için olayları pencereden dinliyoruz.
  useEffect(() => {
    if (suruklenen === null) return;
    const hareket = (e: PointerEvent) => {
      e.preventDefault();
      yerlestir(suruklenen, hedefBul(e.clientY, suruklenen));
    };
    const bitir = () => setSuruklenen(null);
    window.addEventListener("pointermove", hareket, { passive: false });
    window.addEventListener("pointerup", bitir);
    window.addEventListener("pointercancel", bitir);
    return () => {
      window.removeEventListener("pointermove", hareket);
      window.removeEventListener("pointerup", bitir);
      window.removeEventListener("pointercancel", bitir);
    };
  }, [suruklenen]);

  const klavye = (e: React.KeyboardEvent<HTMLLIElement>, i: number, adim: number) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const j = e.key === "ArrowUp" ? i - 1 : i + 1;
    if (j < 0 || j >= sira.length) return;
    yerlestir(adim, j);
    requestAnimationFrame(() => (liste.current?.children[j] as HTMLElement | undefined)?.focus());
  };

  return (
    <section className={kontrol && tamam ? "siralama tamam" : "siralama"}>
      <div className="siralama-etiket">Sırala</div>
      <h3>{baslik}</h3>
      <Markdown>{gorev}</Markdown>
      <p className="siralama-ipucu">Adımları tutup sürükleyerek doğru sıraya diz.</p>
      <ol className="siralama-liste" ref={liste}>
        {sira.map((adim, i) => {
          const durum = kontrol ? (adim === i ? " dogru" : " yanlis") : "";
          return (
            <li
              key={adim}
              data-adim={adim}
              tabIndex={0}
              className={`siralama-adim${durum}${suruklenen === adim ? " suruklenen" : ""}`}
              onPointerDown={(e) => basla(e, adim)}
              onKeyDown={(e) => klavye(e, i, adim)}
              aria-label={`${i + 1}. sırada: ${adimlar[adim]}. Yerini değiştirmek için sürükle ya da yukarı/aşağı ok tuşlarını kullan.`}
            >
              <span className="siralama-tutamak" aria-hidden="true">
                <svg viewBox="0 0 10 16" width="10" height="16"><circle cx="2.5" cy="3" r="1.4" /><circle cx="7.5" cy="3" r="1.4" /><circle cx="2.5" cy="8" r="1.4" /><circle cx="7.5" cy="8" r="1.4" /><circle cx="2.5" cy="13" r="1.4" /><circle cx="7.5" cy="13" r="1.4" /></svg>
              </span>
              <span className="siralama-no">{i + 1}</span>
              <span className="siralama-metin">{adimlar[adim]}</span>
            </li>
          );
        })}
      </ol>
      <div className="dugmeler">
        <button className="dugme dugme-ana" onClick={() => setKontrol(true)}>
          Kontrol et
        </button>
        <button
          className="dugme dugme-sade"
          onClick={() => {
            setSira(adimlar.map((_, i) => i));
            setKontrol(true);
          }}
        >
          Doğru sırayı göster
        </button>
      </div>
      {kontrol && (
        <p className={tamam ? "geri-bildirim basari" : "geri-bildirim uyari"}>
          <b>{tamam ? "Doğru sıra." : `${dogruSayisi} / ${adimlar.length} adım yerinde.`}</b>{" "}
          {tamam ? "Algoritma adımları ancak bu sırayla yapılınca doğru sonuç verir." : "Kırmızı adımların yerini değiştirip tekrar dene."}
        </p>
      )}
    </section>
  );
}
