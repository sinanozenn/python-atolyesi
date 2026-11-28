"use client";
import { useEffect, useMemo, useState } from "react";
import type { IzSonucu } from "@/lib/izleyici";

/** Kaydedilmiş izi adım adım gösterir: sıradaki satır, değişkenler ve o ana kadarki ekran çıktısı. */
export default function AdimAdim({ kod, iz, kapat }: { kod: string; iz: IzSonucu; kapat: () => void }) {
  const [adim, setAdim] = useState(0);
  const [oynuyor, setOynuyor] = useState(false);
  const satirlar = useMemo(() => kod.replace(/\s+$/, "").split("\n"), [kod]);
  const son = iz.adimlar.length - 1;
  const su = iz.adimlar[adim];
  const onceki = adim > 0 ? iz.adimlar[adim - 1] : null;
  const bitti = adim === son;

  useEffect(() => {
    if (!oynuyor) return;
    if (adim >= son) {
      setOynuyor(false);
      return;
    }
    const t = setTimeout(() => setAdim((a) => Math.min(a + 1, son)), 900);
    return () => clearTimeout(t);
  }, [oynuyor, adim, son]);

  const oncekiDegerler = new Map((onceki?.degiskenler ?? []).map(([ad, deger]) => [ad, deger]));
  const yeniCikti = onceki && su.cikti.length > onceki.cikti.length;
  // Bir önceki adımda çalışan satır: değişen değerler ve yeni çıktı onun eseridir.
  const calisanSatir = onceki?.satir ?? null;

  let durumMetni: string;
  if (adim === 0) durumMetni = `Program başlıyor. İlk çalışacak satır: ${su.satir}.`;
  else if (bitti && iz.hata) durumMetni = `${calisanSatir}. satırda hata oluştu, program durdu.`;
  else if (bitti) durumMetni = iz.kesildi ? "Çok fazla adım var; izleme burada durduruldu." : `${calisanSatir}. satır çalıştı. Program bitti.`;
  else durumMetni = `${calisanSatir}. satır çalıştı. Sırada ${su.satir}. satır var.`;

  return (
    <div className="izleme">
      <div className="izleme-ust">
        <b>Adım adım izleme</b>
        <span className="izleme-sayac">
          Adım {adim + 1} / {son + 1}
        </span>
        <button className="izleme-kapat" onClick={kapat} aria-label="İzlemeyi kapat">
          ✕
        </button>
      </div>

      <div className="izleme-govde">
        <ol className="izleme-kod" aria-label="Kod">
          {satirlar.map((s, i) => {
            const no = i + 1;
            const sinif = no === su.satir ? "siradaki" : no === calisanSatir ? "calisan" : "";
            return (
              <li key={i} className={sinif}>
                <span className="izleme-ok">{no === su.satir ? "➜" : no === calisanSatir ? "✓" : ""}</span>
                <span className="izleme-no">{no}</span>
                <code>{s || " "}</code>
              </li>
            );
          })}
        </ol>

        <div className="izleme-yan">
          <div className="izleme-baslik">Değişkenler</div>
          {su.degiskenler.length === 0 ? (
            <p className="izleme-bos">Henüz değişken yok.</p>
          ) : (
            <table className="izleme-degiskenler">
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Değer</th>
                  <th>Tür</th>
                </tr>
              </thead>
              <tbody>
                {su.degiskenler.map(([ad, deger, tur]) => {
                  const degisti = onceki !== null && oncekiDegerler.get(ad) !== deger;
                  return (
                    <tr key={ad} className={degisti ? "degisti" : ""}>
                      <td>{ad}</td>
                      <td>{deger}</td>
                      <td>{tur}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="izleme-baslik">Ekran</div>
          <pre className={yeniCikti ? "izleme-ekran yeni" : "izleme-ekran"}>{su.cikti || " "}</pre>
        </div>
      </div>

      <p className={bitti && iz.hata ? "izleme-durum hata" : "izleme-durum"}>
        {durumMetni}
        {bitti && iz.hata && <> {iz.hata.mesaj}</>}
      </p>

      <div className="izleme-dugmeler">
        <button className="dugme" onClick={() => { setOynuyor(false); setAdim(0); }} disabled={adim === 0}>
          ⏮ Baştan
        </button>
        <button className="dugme" onClick={() => { setOynuyor(false); setAdim((a) => Math.max(0, a - 1)); }} disabled={adim === 0}>
          ◀ Geri
        </button>
        <button className="dugme dugme-ana" onClick={() => { setOynuyor(false); setAdim((a) => Math.min(son, a + 1)); }} disabled={bitti}>
          İleri ▶
        </button>
        <button className="dugme" onClick={() => { if (bitti) setAdim(0); setOynuyor((o) => !o); }}>
          {oynuyor ? "⏸ Durdur" : "⏯ Otomatik oynat"}
        </button>
      </div>
    </div>
  );
}
