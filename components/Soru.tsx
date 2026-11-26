"use client";
import { useState } from "react";
import Markdown from "./Markdown";
import { soruDogruIsaretle, useSorular, SORU_PUANI } from "@/lib/depo";

type Props = { id: string; soru: string; kod?: string; secenekler: string[]; dogru: number; aciklama: string };

export default function Soru({ id, soru, kod, secenekler, dogru, aciklama }: Props) {
  const kazanildi = !!useSorular()[id];
  const [yanlislar, setYanlislar] = useState<number[]>([]);
  const [bitti, setBitti] = useState(false);
  const [dogruBildi, setDogruBildi] = useState(false);

  function sec(i: number) {
    if (bitti) return;
    if (i === dogru) {
      setDogruBildi(true);
      setBitti(true);
      if (yanlislar.length === 0) soruDogruIsaretle(id);
    } else if (!yanlislar.includes(i)) setYanlislar([...yanlislar, i]);
  }

  return (
    <div className="soru">
      <div className="soru-ust"><span className="soru-etiket">Düşün bakalım</span><span className={kazanildi ? "puan-cip kazanildi" : "puan-cip"}>{kazanildi ? `+${SORU_PUANI} kazanıldı` : `ilk denemede +${SORU_PUANI}`}</span></div>
      <Markdown>{soru}</Markdown>
      {kod && <pre className="soru-kod defter">{kod}</pre>}
      <div className="secenekler">
        {secenekler.map((s, i) => {
          let sinif = "secenek";
          if (bitti && i === dogru) sinif += " dogru";
          else if (yanlislar.includes(i)) sinif += " yanlis";
          return (
            <button key={i} className={sinif} onClick={() => sec(i)} disabled={bitti || yanlislar.includes(i)}>
              <span className="secenek-harf">{"ABCDE"[i]}</span> <span>{s}</span>
            </button>
          );
        })}
      </div>
      {!bitti && yanlislar.length > 0 && (
        <div className="geri-bildirim uyari">
          <b>Olmadı, bir daha dene.</b>{" "}
          <button className="baglanti" onClick={() => setBitti(true)}>Cevabı göster</button>
        </div>
      )}
      {bitti && (
        <div className={dogruBildi ? "geri-bildirim basari" : "geri-bildirim bilgi"}>
          <b>{dogruBildi ? (yanlislar.length === 0 ? `Doğru, ilk denemede! +${SORU_PUANI} puan` : "Doğru. Bu sefer puan yok, ama artık biliyorsun.") : `Doğru cevap: ${"ABCDE"[dogru]}`}</b>
          <Markdown>{aciklama}</Markdown>
        </div>
      )}
    </div>
  );
}
