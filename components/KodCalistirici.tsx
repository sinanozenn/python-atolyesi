"use client";
import { useCallback, useState } from "react";
import KodEditoru from "./KodEditoru";
import CiktiPaneli from "./CiktiPaneli";
import { useRouter } from "next/navigation";
import { pythonCalistir, useMotorDurumu, type CalismaSonucu } from "@/lib/python";
import { ideyeGonder } from "@/lib/ide-depo";

type Props = {
  kod: string;
  girdiler?: string[];
  baslik?: string;
  enAz?: number;
  /** Değişiklik olunca dışarı bildir (ör. oyun alanında kaydetmek için) */
  degisince?: (kod: string) => void;
};

export default function KodCalistirici({ kod: ilkKod, girdiler: ilkGirdiler = [], baslik, enAz, degisince }: Props) {
  const [kod, setKod] = useState(ilkKod);
  const [girdiMetni, setGirdiMetni] = useState(ilkGirdiler.join("\n"));
  const [sonuc, setSonuc] = useState<CalismaSonucu | null>(null);
  const [calisiyor, setCalisiyor] = useState(false);
  const durum = useMotorDurumu();
  const router = useRouter();
  const girdiGerekli = /\binput\s*\(/.test(kod);

  const calistir = useCallback(async () => {
    setCalisiyor(true);
    const girdiler = girdiMetni === "" ? [] : girdiMetni.split("\n");
    setSonuc(await pythonCalistir(kod, girdiler, true));
    setCalisiyor(false);
  }, [kod, girdiMetni]);

  return (
    <div className="calistirici">
      {baslik && <div className="calistirici-baslik">{baslik}</div>}
      <KodEditoru
        deger={kod}
        degisince={(v) => {
          setKod(v);
          degisince?.(v);
        }}
        calistir={calistir}
        enAz={enAz}
      />
      {girdiGerekli && (
        <label className="girdiler">
          <span>⌨️ Girdiler <small>(programın <code>input()</code> ile soracağı değerler — her satıra bir tane)</small></span>
          <textarea value={girdiMetni} onChange={(e) => setGirdiMetni(e.target.value)} rows={Math.max(2, girdiMetni.split("\n").length)} spellCheck={false} />
        </label>
      )}
      <div className="dugmeler">
        <button className="dugme dugme-ana" onClick={calistir} disabled={calisiyor}>
          {calisiyor ? "Çalışıyor…" : durum === "hazir" ? "▶ Çalıştır" : "▶ Çalıştır (Python yükleniyor)"}
        </button>
        <button
          className="dugme"
          onClick={() => {
            setKod(ilkKod);
            setGirdiMetni(ilkGirdiler.join("\n"));
            setSonuc(null);
            degisince?.(ilkKod);
          }}
        >
          ↺ Sıfırla
        </button>
        <button
          className="dugme dugme-sade"
          onClick={() => {
            ideyeGonder(baslik ? baslik.replace(/^🧪\s*Örnek:?\s*/, "").replace(/^Kitap \d+\. (Örnek|Uygulama):?\s*/, "") : "ornek", kod);
            router.push("/ide");
          }}
          title="Bu kodu IDE'de yeni bir dosya olarak aç"
        >
          🧑‍💻 IDE'de aç
        </button>
        <span className="kisayol">Kısayol: Ctrl + Enter</span>
      </div>
      {(sonuc || calisiyor) && <CiktiPaneli cikti={sonuc?.cikti ?? ""} hata={sonuc?.hata ?? null} calisiyor={calisiyor} />}
    </div>
  );
}
