"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { EtkilesimliMotor, etkilesimliDestekleniyor, type MotorDurumu } from "@/lib/etkilesimli";
import type { PythonHatasi } from "@/lib/hatalar";
import { HataKutusu } from "@/components/CiktiPaneli";
import { ideOrnekleri } from "@/content/ide-ornekleri";
import {
  acilacakKoduAl,
  dosyaAdiDuzenle,
  idDurumunuKaydet,
  idDurumunuOku,
  type IdeDurumu,
} from "@/lib/ide-depo";

type Parca =
  | { tur: "cikti"; metin: string }
  | { tur: "girdi"; metin: string }
  | { tur: "bilgi"; metin: string }
  | { tur: "hata"; hata: PythonHatasi };

const AZAMI_KONSOL = 200_000;

const durumYazisi: Record<MotorDurumu, string> = {
  yukleniyor: "● Python yükleniyor…",
  hazir: "● Hazır",
  calisiyor: "● Program çalışıyor…",
  "girdi-bekliyor": "● Cevabını bekliyor…",
  hata: "● Python yüklenemedi",
};

export default function Ide() {
  const [ide, setIde] = useState<IdeDurumu | null>(null);
  const [konsol, setKonsol] = useState<Parca[]>([]);
  const [durum, setDurum] = useState<MotorDurumu>("yukleniyor");
  const [istem, setIstem] = useState<string | null>(null);
  const [girdi, setGirdi] = useState("");
  const [yedekGirdiler, setYedekGirdiler] = useState("");
  const [canli, setCanli] = useState(true);
  const [yenidenAdlandir, setYenidenAdlandir] = useState<string | null>(null);
  const [yeniAd, setYeniAd] = useState("");

  const motor = useRef<EtkilesimliMotor | null>(null);
  const tampon = useRef("");
  const kare = useRef<number | null>(null);
  const konsolSonu = useRef<HTMLDivElement>(null);
  const girdiKutusu = useRef<HTMLInputElement>(null);
  const dosyaSecici = useRef<HTMLInputElement>(null);

  // --- Konsola yazma (çok hızlı çıktıyı kare kare birleştirerek) ---
  const ekle = useCallback((p: Parca) => {
    setKonsol((k) => {
      const son = k[k.length - 1];
      if (p.tur === "cikti" && son?.tur === "cikti") {
        let metin = son.metin + p.metin;
        if (metin.length > AZAMI_KONSOL) metin = "…" + metin.slice(-AZAMI_KONSOL);
        return [...k.slice(0, -1), { tur: "cikti", metin }];
      }
      return [...k, p];
    });
  }, []);

  const tamponuBosalt = useCallback(() => {
    kare.current = null;
    if (tampon.current) {
      const metin = tampon.current;
      tampon.current = "";
      ekle({ tur: "cikti", metin });
    }
  }, [ekle]);

  // --- Motor ve kayıtlı dosyalar ---
  useEffect(() => {
    setCanli(etkilesimliDestekleniyor());
    const m = new EtkilesimliMotor({
      cikti: (metin) => {
        tampon.current += metin;
        if (kare.current === null) kare.current = requestAnimationFrame(tamponuBosalt);
      },
      girdiIste: (i) => {
        tamponuBosalt();
        setIstem(i);
        setTimeout(() => girdiKutusu.current?.focus(), 0);
      },
      durum: setDurum,
    });
    m.baslat();
    motor.current = m;

    const d = idDurumunuOku();
    const gelen = acilacakKoduAl();
    if (gelen) {
      const ad = dosyaAdiDuzenle(gelen.ad, d.dosyalar.map((f) => f.ad));
      d.dosyalar.push({ ad, kod: gelen.kod });
      d.aktif = ad;
    }
    setIde(d);
    return () => m.kapat();
  }, [tamponuBosalt]);

  useEffect(() => {
    if (ide) idDurumunuKaydet(ide);
  }, [ide]);

  useEffect(() => {
    konsolSonu.current?.scrollIntoView({ block: "end" });
  }, [konsol, istem]);

  const aktifDosya = ide?.dosyalar.find((f) => f.ad === ide.aktif);

  const koduDegistir = (kod: string) =>
    setIde((d) => d && { ...d, dosyalar: d.dosyalar.map((f) => (f.ad === d.aktif ? { ...f, kod } : f)) });

  const yeniDosya = (adOneri = "yeni", kod = "") => {
    setIde((d) => {
      if (!d) return d;
      const ad = dosyaAdiDuzenle(adOneri, d.dosyalar.map((f) => f.ad));
      return { dosyalar: [...d.dosyalar, { ad, kod }], aktif: ad };
    });
  };

  const dosyaSil = (ad: string) => {
    if (!ide) return;
    const dosya = ide.dosyalar.find((f) => f.ad === ad);
    if (dosya?.kod.trim() && !confirm(`"${ad}" dosyası silinsin mi? Bu işlem geri alınamaz.`)) return;
    setIde((d) => {
      if (!d) return d;
      const kalan = d.dosyalar.filter((f) => f.ad !== ad);
      if (kalan.length === 0) kalan.push({ ad: "ana.py", kod: "" });
      return { dosyalar: kalan, aktif: d.aktif === ad ? kalan[0].ad : d.aktif };
    });
  };

  const adiKaydet = () => {
    const eski = yenidenAdlandir;
    setYenidenAdlandir(null);
    if (!eski || !yeniAd.trim()) return;
    setIde((d) => {
      if (!d) return d;
      const ad = dosyaAdiDuzenle(yeniAd, d.dosyalar.filter((f) => f.ad !== eski).map((f) => f.ad));
      return { dosyalar: d.dosyalar.map((f) => (f.ad === eski ? { ...f, ad } : f)), aktif: d.aktif === eski ? ad : d.aktif };
    });
  };

  // --- Çalıştırma ---
  const calistir = useCallback(async () => {
    const m = motor.current;
    if (!m || !aktifDosya) return;
    tampon.current = "";
    setIstem(null);
    setKonsol([{ tur: "bilgi", metin: `▶ ${aktifDosya.ad} çalıştırılıyor…` }]);
    const s = await m.calistir(aktifDosya.kod, yedekGirdiler === "" ? [] : yedekGirdiler.split("\n"));
    tamponuBosalt();
    setIstem(null);
    if (s.hata) ekle({ tur: "hata", hata: s.hata });
    ekle({
      tur: "bilgi",
      metin: s.durduruldu ? "■ Program durduruldu." : `✓ Program bitti (${(s.sureMs / 1000).toFixed(2)} sn)`,
    });
  }, [aktifDosya, yedekGirdiler, ekle, tamponuBosalt]);

  const durdur = () => motor.current?.durdur();

  const girdiyiGonder = () => {
    if (istem === null) return;
    ekle({ tur: "girdi", metin: girdi + "\n" });
    motor.current?.girdiGonder(girdi);
    setGirdi("");
    setIstem(null);
  };

  const eklentiler = useMemo(
    () => [
      python(),
      EditorView.lineWrapping,
      Prec.highest(
        keymap.of([
          {
            key: "Mod-Enter",
            run: () => {
              calistir();
              return true;
            },
          },
        ])
      ),
    ],
    [calistir]
  );

  // --- Dosya aç / indir ---
  const dosyaAc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (f.size > 500_000) {
      alert("Dosya çok büyük (en fazla 500 KB).");
      return;
    }
    yeniDosya(f.name, await f.text());
  };

  const indir = () => {
    if (!aktifDosya) return;
    const url = URL.createObjectURL(new Blob([aktifDosya.kod], { type: "text/x-python;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = aktifDosya.ad;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (!ide || !aktifDosya) return <div className="ide-yukleniyor">IDE hazırlanıyor…</div>;

  const calisiyor = durum === "calisiyor" || durum === "girdi-bekliyor";
  const girdiGerekli = /\binput\s*\(/.test(aktifDosya.kod);

  return (
    <div className="ide">
      <div className="ide-arac-cubugu">
        <div className="ide-sekmeler" role="tablist">
          {ide.dosyalar.map((f) =>
            yenidenAdlandir === f.ad ? (
              <input
                key={f.ad}
                className="ide-sekme-ad"
                autoFocus
                value={yeniAd}
                onChange={(e) => setYeniAd(e.target.value)}
                onBlur={adiKaydet}
                onKeyDown={(e) => {
                  if (e.key === "Enter") adiKaydet();
                  if (e.key === "Escape") setYenidenAdlandir(null);
                }}
              />
            ) : (
              <div
                key={f.ad}
                role="tab"
                aria-selected={f.ad === ide.aktif}
                className={f.ad === ide.aktif ? "ide-sekme aktif" : "ide-sekme"}
                onClick={() => setIde({ ...ide, aktif: f.ad })}
                onDoubleClick={() => {
                  setYenidenAdlandir(f.ad);
                  setYeniAd(f.ad.replace(/\.py$/, ""));
                }}
                title="Yeniden adlandırmak için çift tıkla"
              >
                <span>🐍 {f.ad}</span>
                <button
                  className="ide-sekme-kapat"
                  aria-label={`${f.ad} dosyasını sil`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dosyaSil(f.ad);
                  }}
                >
                  ×
                </button>
              </div>
            )
          )}
          <button className="ide-yeni" onClick={() => yeniDosya()} title="Yeni dosya">
            ＋
          </button>
        </div>

        <div className="ide-dugmeler">
          <select
            className="ide-secim"
            value=""
            onChange={(e) => {
              const o = ideOrnekleri[Number(e.target.value)];
              if (o) yeniDosya(o.dosya, o.kod);
            }}
            aria-label="Örnek programlar"
          >
            <option value="">📚 Örnekler</option>
            {ideOrnekleri.map((o, i) => (
              <option key={o.dosya} value={i}>
                {o.ad}
              </option>
            ))}
          </select>
          <button className="dugme" onClick={() => dosyaSecici.current?.click()} title="Bilgisayarından .py dosyası aç">
            📂 Aç
          </button>
          <input ref={dosyaSecici} type="file" accept=".py,.txt" hidden onChange={dosyaAc} />
          <button className="dugme" onClick={indir} title="Bu dosyayı bilgisayarına indir">
            💾 İndir
          </button>
          {calisiyor ? (
            <button className="dugme dugme-durdur" onClick={durdur}>
              ■ Durdur
            </button>
          ) : (
            <button className="dugme dugme-ana" onClick={calistir} disabled={durum === "hata"}>
              ▶ Çalıştır
            </button>
          )}
        </div>
      </div>

      <div className="ide-govde">
        <div className="ide-editor">
          <CodeMirror
            value={aktifDosya.kod}
            onChange={koduDegistir}
            extensions={eklentiler}
            height="100%"
            basicSetup={{ foldGutter: false, highlightActiveLine: true, autocompletion: true, tabSize: 4 }}
            indentWithTab
          />
        </div>

        <div className="ide-konsol-alan">
          {!canli && girdiGerekli && (
            <label className="girdiler ide-yedek-girdiler">
              <span>
                ⌨️ Girdiler <small>(bu bağlantıda canlı giriş desteklenmiyor; input() cevaplarını buraya, her satıra bir tane yaz)</small>
              </span>
              <textarea value={yedekGirdiler} onChange={(e) => setYedekGirdiler(e.target.value)} rows={3} spellCheck={false} />
            </label>
          )}
          <div className="ide-konsol" onClick={() => istem !== null && girdiKutusu.current?.focus()}>
            <div className="ide-konsol-ust">
              <span>Konsol</span>
              <span className={`ide-durum ide-durum-${durum}`}>{durumYazisi[durum]}</span>
              <button className="ide-temizle" onClick={() => setKonsol([])}>
                🧹 Temizle
              </button>
            </div>
            <div className="ide-konsol-icerik">
              {konsol.length === 0 && <div className="ide-ipucu">Kodunu yaz ve ▶ Çalıştır'a bas. Çıktılar burada görünecek.</div>}
              {konsol.map((p, i) =>
                p.tur === "hata" ? (
                  <div key={i} className="ide-hata">
                    <HataKutusu hata={p.hata} />
                  </div>
                ) : (
                  <span key={i} className={`ide-${p.tur}`}>
                    {p.metin}
                    {p.tur === "bilgi" ? "\n" : ""}
                  </span>
                )
              )}
              {istem !== null && (
                <span className="ide-girdi-satiri">
                  <input
                    ref={girdiKutusu}
                    value={girdi}
                    onChange={(e) => setGirdi(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && girdiyiGonder()}
                    aria-label="Programa cevap yaz"
                    placeholder="cevabını yaz, Enter'a bas"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </span>
              )}
              <div ref={konsolSonu} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
