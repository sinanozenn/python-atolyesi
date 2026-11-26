"use client";
import { useCallback, useEffect, useState } from "react";
import KodEditoru from "./KodEditoru";
import CiktiPaneli, { HataKutusu } from "./CiktiPaneli";
import Markdown from "./Markdown";
import type { AlistirmaVerisi } from "@/content/tipler";
import { pythonCalistir, useMotorDurumu, type CalismaSonucu } from "@/lib/python";
import { alistirmayiKontrolEt, type KontrolSonucu } from "@/lib/kontrol";
import { kayitliKod, koduKaydet } from "@/lib/depo";

export default function Alistirma({ a, no }: { a: AlistirmaVerisi; no: number }) {
  const [kod, setKod] = useState(a.baslangicKodu);
  const [girdiMetni, setGirdiMetni] = useState((a.testler[0]?.girdiler ?? []).join("\n"));
  const [calisma, setCalisma] = useState<CalismaSonucu | null>(null);
  const [kontrol, setKontrol] = useState<KontrolSonucu | null>(null);
  const [mesgul, setMesgul] = useState<"calistir" | "kontrol" | null>(null);
  const [ipucuSayisi, setIpucuSayisi] = useState(0);
  const [cozumAcik, setCozumAcik] = useState(false);
  const [denemeler, setDenemeler] = useState(0);
  const tamam = !!kontrol?.basarili;
  const durum = useMotorDurumu();
  const girdiGerekli = a.testler.some((t) => t.girdiler?.length);

  // Öğrencinin önceki kodunu geri yükle
  useEffect(() => {
    const k = kayitliKod(a.id);
    if (k !== null) setKod(k);
  }, [a.id]);

  const kodDegisti = (v: string) => {
    setKod(v);
    koduKaydet(a.id, v);
  };

  const calistir = useCallback(async () => {
    setMesgul("calistir");
    setKontrol(null);
    setCalisma(await pythonCalistir(kod, girdiMetni === "" ? [] : girdiMetni.split("\n"), true));
    setMesgul(null);
  }, [kod, girdiMetni]);

  async function kontrolEt() {
    setMesgul("kontrol");
    setCalisma(null);
    const s = await alistirmayiKontrolEt(kod, a);
    setKontrol(s);
    setDenemeler((d) => d + 1);
    setMesgul(null);
  }

  const ilkHatali = kontrol?.testler.find((t) => !t.gecti);

  return (
    <section className={tamam ? "alistirma tamam" : "alistirma"} id={a.id}>
      <header className="alistirma-ust">
        <span className="alistirma-etiket">✏️ Alıştırma {no}</span>
        <h3>{a.baslik}</h3>
        {tamam && <span className="tamam-rozeti">✅ Tamamlandı</span>}
      </header>
      <Markdown>{a.gorev}</Markdown>

      <KodEditoru deger={kod} degisince={kodDegisti} calistir={calistir} enAz={4} />

      {girdiGerekli && (
        <label className="girdiler">
          <span>⌨️ Deneme girdileri <small>(her satıra bir tane — sadece “Çalıştır” için)</small></span>
          <textarea value={girdiMetni} onChange={(e) => setGirdiMetni(e.target.value)} rows={Math.max(2, girdiMetni.split("\n").length)} spellCheck={false} />
        </label>
      )}

      <div className="dugmeler">
        <button className="dugme" onClick={calistir} disabled={!!mesgul}>
          {mesgul === "calistir" ? "Çalışıyor…" : "▶ Çalıştır"}
        </button>
        <button className="dugme dugme-ana" onClick={kontrolEt} disabled={!!mesgul}>
          {mesgul === "kontrol" ? "Kontrol ediliyor…" : durum === "hazir" ? "✔ Kontrol Et" : "✔ Kontrol Et (Python yükleniyor)"}
        </button>
        {a.ipuclari.length > 0 && ipucuSayisi < a.ipuclari.length && (
          <button className="dugme dugme-ikincil" onClick={() => setIpucuSayisi(ipucuSayisi + 1)}>
            💡 İpucu {ipucuSayisi > 0 ? `(${ipucuSayisi}/${a.ipuclari.length})` : ""}
          </button>
        )}
        {(denemeler >= 2 || tamam) && !cozumAcik && (
          <button className="dugme dugme-ikincil" onClick={() => setCozumAcik(true)}>
            👀 Çözümü göster
          </button>
        )}
        <button
          className="dugme dugme-sade"
          onClick={() => {
            setKod(a.baslangicKodu);
            koduKaydet(a.id, null);
            setCalisma(null);
            setKontrol(null);
          }}
        >
          ↺ Baştan başla
        </button>
      </div>

      {ipucuSayisi > 0 && (
        <div className="ipuclari">
          {a.ipuclari.slice(0, ipucuSayisi).map((ip, i) => (
            <div key={i} className="ipucu-satiri">
              <b>💡 İpucu {i + 1}:</b> <Markdown>{ip}</Markdown>
            </div>
          ))}
        </div>
      )}

      {(calisma || mesgul === "calistir") && (
        <CiktiPaneli cikti={calisma?.cikti ?? ""} hata={calisma?.hata ?? null} calisiyor={mesgul === "calistir"} />
      )}

      {kontrol && (
        <div className={kontrol.basarili ? "sonuc basari" : "sonuc uyari"}>
          {kontrol.basarili ? (
            <div className="sonuc-baslik">🎉 Harika! Tüm testleri geçtin.</div>
          ) : (
            <div className="sonuc-baslik">Henüz olmadı — ama yaklaşıyorsun! Aşağıya bak.</div>
          )}
          <ul className="test-listesi">
            {kontrol.testler.map((t, i) => (
              <li key={i}>
                {t.gecti ? "✅" : "❌"} Test {i + 1}
                {t.test.girdiler?.length ? <> — girdiler: <code>{t.test.girdiler.join(", ")}</code></> : null}
              </li>
            ))}
          </ul>
          {kontrol.kuralHatalari.map((m, i) => (
            <div key={i} className="kural-hatasi">⚠️ <Markdown>{m}</Markdown></div>
          ))}
          {ilkHatali && (
            <div className="karsilastirma">
              {ilkHatali.hata ? (
                <HataKutusu hata={ilkHatali.hata} />
              ) : (
                <div className="iki-sutun">
                  <div>
                    <div className="kucuk-baslik">Beklenen çıktı</div>
                    <pre>{ilkHatali.test.beklenen}</pre>
                  </div>
                  <div>
                    <div className="kucuk-baslik">Senin çıktın</div>
                    <pre>{ilkHatali.cikti.trimEnd() || "(boş)"}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {cozumAcik && (
        <div className="cozum">
          <div className="kucuk-baslik">Örnek çözüm <small>(başka doğru çözümler de olabilir!)</small></div>
          <pre>{a.cozum}</pre>
        </div>
      )}
    </section>
  );
}
