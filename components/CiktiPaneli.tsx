"use client";
import type { PythonHatasi } from "@/lib/hatalar";
import { hatayiAcikla } from "@/lib/hatalar";
import Markdown from "./Markdown";

export default function CiktiPaneli({ cikti, hata, calisiyor }: { cikti: string; hata: PythonHatasi | null; calisiyor?: boolean }) {
  return (
    <div className="cikti" aria-live="polite">
      <div className="cikti-baslik">Çıktı</div>
      {calisiyor ? (
        <pre className="cikti-metin soluk">Çalışıyor…</pre>
      ) : (
        <>
          {cikti && <pre className="cikti-metin">{cikti}</pre>}
          {!cikti && !hata && <pre className="cikti-metin soluk">(Programın ekrana bir şey yazmadı)</pre>}
          {hata && <HataKutusu hata={hata} />}
        </>
      )}
    </div>
  );
}

export function HataKutusu({ hata }: { hata: PythonHatasi }) {
  const teknik = hata.tur === "ZamanAsimi" || hata.tur === "MotorHatası" ? hata.mesaj : `${hata.tur}: ${hata.mesaj === "GIRDI_BITTI" ? "girdi kalmadı" : hata.mesaj}`;
  return (
    <div className="hata">
      <div className="hata-baslik">
        🐞 Bir hata var{hata.satir ? <> — <b>{hata.satir}. satır</b></> : null}
      </div>
      <Markdown>{hatayiAcikla(hata)}</Markdown>
      {hata.ayrinti && <pre className="hata-ayrinti">{hata.ayrinti}</pre>}
      <div className="hata-teknik">Python'un mesajı: <code>{teknik}</code></div>
    </div>
  );
}
