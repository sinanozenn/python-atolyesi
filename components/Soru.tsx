"use client";
import { useState } from "react";
import Markdown from "./Markdown";

type Props = { soru: string; kod?: string; secenekler: string[]; dogru: number; aciklama: string };

export default function Soru({ soru, kod, secenekler, dogru, aciklama }: Props) {
  const [yanlislar, setYanlislar] = useState<number[]>([]);
  const [bitti, setBitti] = useState(false);
  const [dogruBildi, setDogruBildi] = useState(false);

  function sec(i: number) {
    if (bitti) return;
    if (i === dogru) {
      setDogruBildi(true);
      setBitti(true);
    } else if (!yanlislar.includes(i)) setYanlislar([...yanlislar, i]);
  }

  return (
    <div className="soru">
      <div className="soru-etiket">🤔 Düşün bakalım</div>
      <Markdown>{soru}</Markdown>
      {kod && <pre className="soru-kod">{kod}</pre>}
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
          <b>Tam değil, bir daha dene!</b>{" "}
          <button className="baglanti" onClick={() => setBitti(true)}>Cevabı göster</button>
        </div>
      )}
      {bitti && (
        <div className={dogruBildi ? "geri-bildirim basari" : "geri-bildirim bilgi"}>
          <b>{dogruBildi ? (yanlislar.length === 0 ? "Doğru, ilk denemede! 🎉" : "Doğru! 🎉") : `Doğru cevap: ${"ABCDE"[dogru]}`}</b>
          <Markdown>{aciklama}</Markdown>
        </div>
      )}
    </div>
  );
}
