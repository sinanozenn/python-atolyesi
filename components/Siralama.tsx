"use client";
import { useMemo, useState } from "react";
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

  const tasi = (i: number, yon: -1 | 1) => {
    const j = i + yon;
    if (j < 0 || j >= sira.length) return;
    const yeni = [...sira];
    [yeni[i], yeni[j]] = [yeni[j], yeni[i]];
    setSira(yeni);
    setKontrol(false);
  };

  return (
    <section className={kontrol && tamam ? "siralama tamam" : "siralama"}>
      <div className="siralama-etiket">Sırala</div>
      <h3>{baslik}</h3>
      <Markdown>{gorev}</Markdown>
      <ol className="siralama-liste">
        {sira.map((adim, i) => {
          const durum = kontrol ? (adim === i ? " dogru" : " yanlis") : "";
          return (
            <li key={adim} className={`siralama-adim${durum}`}>
              <span className="siralama-no">{i + 1}</span>
              <span className="siralama-metin">{adimlar[adim]}</span>
              <span className="siralama-dugmeler">
                <button className="siralama-tasi" onClick={() => tasi(i, -1)} disabled={i === 0} aria-label={`"${adimlar[adim]}" adımını yukarı taşı`}>
                  ↑
                </button>
                <button className="siralama-tasi" onClick={() => tasi(i, 1)} disabled={i === sira.length - 1} aria-label={`"${adimlar[adim]}" adımını aşağı taşı`}>
                  ↓
                </button>
              </span>
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
