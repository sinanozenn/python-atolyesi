"use client";
// Akış Şeması Aracı: sembolleri ekle, sürükle, bağla; şemayı çalıştır ve adım adım izle.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { STIL, semaGraf, type GBag, type GDugum, type Graf } from "@/content/sema";
import { akisOrnekleri, akisOrnegi } from "@/content/akis-ornekleri";
import { semayiDenetle, semayiDerle, iziAyir, etiketi, type Iz, type SemaHatasi } from "@/lib/akis-derleyici";
import { EtkilesimliMotor, etkilesimliDestekleniyor, type MotorDurumu } from "@/lib/etkilesimli";
import type { PythonHatasi } from "@/lib/hatalar";
import { HataKutusu } from "@/components/CiktiPaneli";
import Markdown from "@/components/Markdown";

type Tur = GDugum["t"];
type Secim = { tur: "dugum" | "bag"; id: string } | null;
type Gorunum = { x: number; y: number; olcek: number };

const KAYIT = "atolye-akis";
export const ACILACAK = "atolye-akis-acilacak";
const EGIM = 13;
const IZGARA = 10;

const TURLER: { t: Tur; ad: string; varsayilan: string; ipucu: string }[] = [
  { t: "bas", ad: "Başla", varsayilan: "", ipucu: "Her şemada bir tane olur; akış buradan başlar." },
  { t: "giris", ad: "Giriş", varsayilan: "sayi", ipucu: "Kullanıcıdan alınacak **değişkenlerin adlarını** yaz, virgülle ayır: `a, b`. Sayılar otomatik olarak sayıya çevrilir." },
  { t: "islem", ad: "İşlem", varsayilan: "x = 0", ipucu: "Hesaplama ya da atama yaz: `toplam = a + b`. Birden fazla satır yazabilirsin." },
  { t: "karar", ad: "Karar", varsayilan: "x > 0", ipucu: "Bir koşul yaz: `sayi % 2 == 0`. Bu kutudan bir **Evet** (sol) ve bir **Hayır** (sağ) oku çıkmalı." },
  { t: "cikis", ad: "Çıktı", varsayilan: '"Sonuç:", x', ipucu: "Ekrana yazılacakları `print()` içine yazar gibi yaz: `\"Toplam:\", toplam`. Metinleri tırnak içine al." },
  { t: "bit", ad: "Bitir", varsayilan: "", ipucu: "Akışın bittiği yer. Bundan ok çıkmaz." },
];
const turBilgisi = (t: Tur) => TURLER.find((x) => x.t === t)!;

const bos = (): Graf => ({
  dugumler: [
    { id: "d1", t: "bas", m: "", x: 300, y: 80 },
    { id: "d2", t: "bit", m: "", x: 300, y: 260 },
  ],
  baglar: [],
});

// ---------- Geometri ----------
function satirlar(d: GDugum): string[] {
  if (d.t === "bas") return ["Başla"];
  if (d.t === "bit") return ["Bitir"];
  const s = (d.t === "karar" ? d.m.replace(/\s*\?*\s*$/, "") + " ?" : d.m).split("\n");
  return s.length ? s : [""];
}
function boyut(d: GDugum): { w: number; h: number } {
  const ss = satirlar(d);
  const enUzun = Math.max(...ss.map((s) => s.length));
  if (d.t === "bas" || d.t === "bit") return { w: 116, h: 46 };
  if (d.t === "karar") return { w: Math.max(170, Math.round(enUzun * 8.8 + 72)), h: 84 };
  const w = Math.max(130, Math.round(enUzun * 8.3 + 44)) + (d.t === "giris" || d.t === "cikis" ? 10 : 0);
  return { w, h: 46 + (ss.length - 1) * 20 };
}
function cikisNoktasi(d: GDugum, etiket?: string): { x: number; y: number; yon: "alt" | "sol" | "sag" } {
  const { w, h } = boyut(d);
  if (d.t === "karar") return etiket === "Hayır" ? { x: d.x + w / 2, y: d.y, yon: "sag" } : { x: d.x - w / 2, y: d.y, yon: "sol" };
  return { x: d.x, y: d.y + h / 2, yon: "alt" };
}
function girisNoktasi(d: GDugum) {
  return { x: d.x, y: d.y - boyut(d).h / 2 };
}
function bagYolu(a: { x: number; y: number; yon: string }, b: { x: number; y: number }): string {
  const dy = b.y - a.y;
  if (dy > 24) {
    const k = Math.max(28, dy / 2);
    const c1 = a.yon === "alt" ? `${a.x},${a.y + k}` : `${a.x + (a.yon === "sol" ? -60 : 60)},${a.y}`;
    return `M${a.x},${a.y} C${c1} ${b.x},${b.y - k} ${b.x},${b.y}`;
  }
  // Hedef yukarıda: yandan dolaşarak geri dön (döngü)
  const yan = a.yon === "sag" ? 1 : -1;
  const aci = Math.max(160, Math.abs(a.x - b.x) / 2 + 140);
  return `M${a.x},${a.y} C${a.x + yan * (a.yon === "alt" ? 40 : 90)},${a.y + 90} ${b.x + yan * aci},${b.y - 110} ${b.x},${b.y}`;
}
const sekilYolu = (d: GDugum) => {
  const { w, h } = boyut(d);
  if (d.t === "bas" || d.t === "bit") return <rect className="s-bas" x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} />;
  if (d.t === "giris" || d.t === "cikis")
    return (
      <polygon
        className={`s-${d.t}`}
        points={`${-w / 2 + EGIM},${-h / 2} ${w / 2 + EGIM},${-h / 2} ${w / 2 - EGIM},${h / 2} ${-w / 2 - EGIM},${h / 2}`}
      />
    );
  if (d.t === "karar") return <polygon className="s-karar" points={`0,${-h / 2} ${w / 2},0 0,${h / 2} ${-w / 2},0`} />;
  return <rect className="s-islem" x={-w / 2} y={-h / 2} width={w} height={h} rx={3} />;
};
function sinirlar(g: Graf) {
  if (!g.dugumler.length) return { x: 0, y: 0, w: 600, h: 400 };
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const d of g.dugumler) {
    const { w, h } = boyut(d);
    x1 = Math.min(x1, d.x - w / 2 - EGIM);
    x2 = Math.max(x2, d.x + w / 2 + EGIM);
    y1 = Math.min(y1, d.y - h / 2);
    y2 = Math.max(y2, d.y + h / 2);
  }
  return { x: x1 - 200, y: y1 - 60, w: x2 - x1 + 400, h: y2 - y1 + 160 };
}
const yeniId = (onek: string, mevcut: { id: string }[]) => {
  let n = mevcut.length + 1;
  while (mevcut.some((m) => m.id === `${onek}${n}`)) n++;
  return `${onek}${n}`;
};
const yuvarla = (v: number) => Math.round(v / IZGARA) * IZGARA;

// ---------- Bileşen ----------
type Parca = { tur: "cikti" | "girdi" | "bilgi"; metin: string } | { tur: "hata"; hata: PythonHatasi };

export default function AkisAraci() {
  const [graf, setGraf] = useState<Graf | null>(null);
  const [secim, setSecim] = useState<Secim>(null);
  const [gorunum, setGorunum] = useState<Gorunum>({ x: 0, y: 0, olcek: 1 });
  const [alan, setAlan] = useState({ w: 800, h: 600 });
  const [geciciBag, setGeciciBag] = useState<{ d: string } | null>(null);
  const [gecmis, setGecmis] = useState<Graf[]>([]);
  const [ileri, setIleri] = useState<Graf[]>([]);

  const [durum, setDurum] = useState<MotorDurumu>("yukleniyor");
  const [konsol, setKonsol] = useState<Parca[]>([]);
  const [istem, setIstem] = useState<string | null>(null);
  const [girdi, setGirdi] = useState("");
  const [canli, setCanli] = useState(true);
  const [yedekGirdiler, setYedekGirdiler] = useState("");
  const [denetim, setDenetim] = useState<SemaHatasi[]>([]);
  const [iz, setIz] = useState<Iz | null>(null);
  const [izAdim, setIzAdim] = useState(0);
  const [oynuyor, setOynuyor] = useState(false);
  const [hataliDugum, setHataliDugum] = useState<string | null>(null);
  const [canliCikti, setCanliCikti] = useState("");

  const svgRef = useRef<SVGSVGElement>(null);
  const kapRef = useRef<HTMLDivElement>(null);
  const motor = useRef<EtkilesimliMotor | null>(null);
  const tumCikti = useRef("");
  const kare = useRef<number | null>(null);
  const girdiKutusu = useRef<HTMLInputElement>(null);
  const konsolSonu = useRef<HTMLDivElement>(null);
  const surukleme = useRef<
    | { tur: "dugum"; id: string; dx: number; dy: number; once: Graf; oynadi: boolean }
    | { tur: "kaydir"; sx: number; sy: number; g: Gorunum }
    | { tur: "bag"; kaynak: string; etiket?: "Evet" | "Hayır" }
    | null
  >(null);

  // ----- Yükleme, kayıt -----
  useEffect(() => {
    let g: Graf | null = null;
    try {
      const acilacak = localStorage.getItem(ACILACAK);
      if (acilacak) {
        localStorage.removeItem(ACILACAK);
        g = semaGraf(akisOrnegi(acilacak).parcalar);
      } else {
        const k = localStorage.getItem(KAYIT);
        if (k) g = JSON.parse(k);
      }
    } catch {}
    const ilk = g && Array.isArray(g.dugumler) ? g : bos();
    setGraf(ilk);
    setCanli(etkilesimliDestekleniyor());
  }, []);
  useEffect(() => {
    if (graf)
      try {
        localStorage.setItem(KAYIT, JSON.stringify(graf));
      } catch {}
  }, [graf]);

  // Tuval boyutu
  useEffect(() => {
    const el = kapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAlan({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setAlan({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, [graf === null]);

  const sigdir = useCallback(
    (g: Graf | null = graf) => {
      if (!g) return;
      const s = sinirlar(g);
      const olcek = Math.min(1.25, Math.max(0.3, Math.min(alan.w / s.w, alan.h / s.h)));
      setGorunum({ olcek, x: s.x + s.w / 2 - alan.w / olcek / 2, y: s.y + s.h / 2 - alan.h / olcek / 2 });
    },
    [graf, alan]
  );
  const ilkSigdirma = useRef(false);
  useEffect(() => {
    if (graf && alan.w > 100 && !ilkSigdirma.current) {
      ilkSigdirma.current = true;
      sigdir(graf);
    }
  }, [graf, alan, sigdir]);

  // ----- Motor -----
  const tamponuBosalt = useCallback(() => {
    kare.current = null;
    // İz kaydı özel bir karakterle başlar; konsolda gösterilmez
    const i = tumCikti.current.indexOf("\u0000");
    setCanliCikti(i >= 0 ? tumCikti.current.slice(0, i) : tumCikti.current);
  }, []);

  useEffect(() => {
    const m = new EtkilesimliMotor({
      cikti: (metin) => {
        tumCikti.current += metin;
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
    return () => m.kapat();
  }, [tamponuBosalt]);

  useEffect(() => {
    konsolSonu.current?.scrollIntoView({ block: "nearest" });
  }, [canliCikti, konsol, istem]);

  // ----- Düzenleme -----
  const degistir = useCallback(
    (f: (g: Graf) => Graf, kaydet = true) => {
      setGraf((g) => {
        if (!g) return g;
        if (kaydet) {
          setGecmis((h) => [...h.slice(-99), g]);
          setIleri([]);
        }
        return f(g);
      });
      setIz(null);
      setHataliDugum(null);
    },
    []
  );
  const geriAl = useCallback(() => {
    setGecmis((h) => {
      if (!h.length) return h;
      const onceki = h[h.length - 1];
      setGraf((g) => {
        if (g) setIleri((i) => [...i, g]);
        return onceki;
      });
      return h.slice(0, -1);
    });
  }, []);
  const yinele = useCallback(() => {
    setIleri((i) => {
      if (!i.length) return i;
      const sonraki = i[i.length - 1];
      setGraf((g) => {
        if (g) setGecmis((h) => [...h, g]);
        return sonraki;
      });
      return i.slice(0, -1);
    });
  }, []);

  const ekle = (t: Tur) => {
    if (!graf) return;
    const cx = yuvarla(gorunum.x + alan.w / gorunum.olcek / 2);
    const cy = yuvarla(gorunum.y + alan.h / gorunum.olcek / 2);
    let x = cx, y = cy;
    while (graf.dugumler.some((d) => Math.abs(d.x - x) < 30 && Math.abs(d.y - y) < 30)) {
      x += 30;
      y += 30;
    }
    const id = yeniId("d", graf.dugumler);
    degistir((g) => ({ ...g, dugumler: [...g.dugumler, { id, t, m: turBilgisi(t).varsayilan, x, y }] }));
    setSecim({ tur: "dugum", id });
  };

  const sil = useCallback(() => {
    if (!secim) return;
    if (secim.tur === "dugum")
      degistir((g) => ({
        dugumler: g.dugumler.filter((d) => d.id !== secim.id),
        baglar: g.baglar.filter((b) => b.kaynak !== secim.id && b.hedef !== secim.id),
      }));
    else degistir((g) => ({ ...g, baglar: g.baglar.filter((b) => b.id !== secim.id) }));
    setSecim(null);
  }, [secim, degistir]);

  const bagEkle = (kaynak: string, hedef: string, etiket?: "Evet" | "Hayır") => {
    if (kaynak === hedef) return;
    degistir((g) => {
      const kalan = g.baglar.filter((b) => !(b.kaynak === kaynak && (etiket ? b.etiket === etiket : true)));
      const yeni: GBag = { id: yeniId("b", g.baglar), kaynak, hedef, ...(etiket ? { etiket } : {}) };
      return { ...g, baglar: [...kalan, yeni] };
    });
  };

  // Klavye kısayolları
  useEffect(() => {
    const tus = (e: KeyboardEvent) => {
      const hedef = e.target as HTMLElement;
      if (hedef.closest("input, textarea, select")) return;
      const mod = e.ctrlKey || e.metaKey;
      if ((e.key === "Delete" || e.key === "Backspace") && secim) {
        e.preventDefault();
        sil();
      } else if (mod && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        geriAl();
      } else if (mod && (e.key.toLowerCase() === "y" || (e.key.toLowerCase() === "z" && e.shiftKey))) {
        e.preventDefault();
        yinele();
      } else if (e.key === "Escape") setSecim(null);
    };
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [secim, sil, geriAl, yinele]);

  // ----- İşaretçi (fare/dokunma) -----
  const svgNoktasi = (e: { clientX: number; clientY: number }) => {
    const svg = svgRef.current!;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: p.x, y: p.y };
  };

  const dugumBas = (e: React.PointerEvent, d: GDugum) => {
    e.stopPropagation();
    if (!graf) return;
    setSecim({ tur: "dugum", id: d.id });
    const p = svgNoktasi(e);
    surukleme.current = { tur: "dugum", id: d.id, dx: p.x - d.x, dy: p.y - d.y, once: graf, oynadi: false };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const portBas = (e: React.PointerEvent, d: GDugum, etiket?: "Evet" | "Hayır") => {
    e.stopPropagation();
    surukleme.current = { tur: "bag", kaynak: d.id, etiket };
    const a = cikisNoktasi(d, etiket);
    const p = svgNoktasi(e);
    setGeciciBag({ d: bagYolu(a, p) });
  };
  const tuvalBas = (e: React.PointerEvent) => {
    setSecim(null);
    surukleme.current = { tur: "kaydir", sx: e.clientX, sy: e.clientY, g: gorunum };
  };
  const hareket = (e: React.PointerEvent) => {
    const s = surukleme.current;
    if (!s || !graf) return;
    if (s.tur === "kaydir") {
      setGorunum({ ...s.g, x: s.g.x - (e.clientX - s.sx) / s.g.olcek, y: s.g.y - (e.clientY - s.sy) / s.g.olcek });
    } else if (s.tur === "dugum") {
      const p = svgNoktasi(e);
      s.oynadi = true;
      setGraf((g) => g && { ...g, dugumler: g.dugumler.map((d) => (d.id === s.id ? { ...d, x: yuvarla(p.x - s.dx), y: yuvarla(p.y - s.dy) } : d)) });
    } else if (s.tur === "bag") {
      const kaynak = graf.dugumler.find((d) => d.id === s.kaynak);
      if (kaynak) setGeciciBag({ d: bagYolu(cikisNoktasi(kaynak, s.etiket), svgNoktasi(e)) });
    }
  };
  const birak = (e: React.PointerEvent) => {
    const s = surukleme.current;
    surukleme.current = null;
    if (!s) return;
    if (s.tur === "dugum" && s.oynadi) {
      setGecmis((h) => [...h.slice(-99), s.once]);
      setIleri([]);
      setIz(null);
    }
    if (s.tur === "bag") {
      setGeciciBag(null);
      const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-dugum]");
      const hedef = el?.getAttribute("data-dugum");
      if (hedef && hedef !== s.kaynak) {
        const hedefDugum = graf?.dugumler.find((d) => d.id === hedef);
        if (hedefDugum && hedefDugum.t !== "bas") bagEkle(s.kaynak, hedef, s.etiket);
      }
    }
  };
  const tekerlek = (e: React.WheelEvent) => {
    const p = svgNoktasi(e);
    const k = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    setGorunum((g) => {
      const olcek = Math.min(2.5, Math.max(0.25, g.olcek * k));
      return { olcek, x: p.x - (p.x - g.x) * (g.olcek / olcek), y: p.y - (p.y - g.y) * (g.olcek / olcek) };
    });
  };
  const yakinlas = (k: number) =>
    setGorunum((g) => {
      const olcek = Math.min(2.5, Math.max(0.25, g.olcek * k));
      const cx = g.x + alan.w / g.olcek / 2, cy = g.y + alan.h / g.olcek / 2;
      return { olcek, x: cx - alan.w / olcek / 2, y: cy - alan.h / olcek / 2 };
    });

  // ----- Çalıştırma -----
  const calistir = async () => {
    const m = motor.current;
    if (!m || !graf) return;
    const hatalar = semayiDenetle(graf);
    setDenetim(hatalar);
    setIz(null);
    setHataliDugum(null);
    if (hatalar.length) {
      const ilk = hatalar.find((h) => h.dugum);
      if (ilk?.dugum) {
        setSecim({ tur: "dugum", id: ilk.dugum });
        setHataliDugum(ilk.dugum);
      }
      setKonsol([]);
      setCanliCikti("");
      return;
    }
    tumCikti.current = "";
    setCanliCikti("");
    setIstem(null);
    setKonsol([{ tur: "bilgi", metin: "Akış çalışıyor…" }]);
    const s = await m.calistir(semayiDerle(graf), yedekGirdiler === "" ? [] : yedekGirdiler.split("\n"));
    if (kare.current !== null) cancelAnimationFrame(kare.current);
    kare.current = null;
    const { cikti, iz: yeniIz } = iziAyir(tumCikti.current);
    setCanliCikti(cikti);
    setIstem(null);
    const sonParcalar: Parca[] = [];
    if (s.hata) {
      const hata = { ...s.hata, satir: null, ayrinti: "" };
      sonParcalar.push({ tur: "hata", hata });
      const son = yeniIz?.iz[yeniIz.iz.length - 1];
      if (son?.d) {
        setHataliDugum(son.d);
        setSecim({ tur: "dugum", id: son.d });
      }
    }
    sonParcalar.push({
      tur: "bilgi",
      metin: s.durduruldu ? "Akış durduruldu." : s.hata ? "Akış hatayla durdu." : `Akış bitti (${(s.sureMs / 1000).toFixed(2)} sn).`,
    });
    setKonsol((k) => [...k, ...sonParcalar]);
    if (yeniIz && yeniIz.iz.length > 1) {
      setIz(yeniIz);
      setIzAdim(0);
    }
  };
  const girdiyiGonder = () => {
    if (istem === null) return;
    tumCikti.current += girdi + "\n";
    setCanliCikti((c) => c + girdi + "\n");
    motor.current?.girdiGonder(girdi);
    setGirdi("");
    setIstem(null);
  };

  // İz oynatma
  useEffect(() => {
    if (!oynuyor || !iz) return;
    const t = setInterval(() => {
      setIzAdim((a) => {
        if (a >= iz.iz.length - 1) {
          setOynuyor(false);
          return a;
        }
        return a + 1;
      });
    }, 750);
    return () => clearInterval(t);
  }, [oynuyor, iz]);

  // ----- Dışa aktarma -----
  const svgMetni = () => {
    if (!graf || !svgRef.current) return "";
    const s = sinirlar(graf);
    const kopya = svgRef.current.cloneNode(true) as SVGSVGElement;
    kopya.querySelectorAll("[data-arayuz]").forEach((el) => el.remove());
    kopya.setAttribute("viewBox", `${s.x + 150} ${s.y + 20} ${s.w - 300} ${s.h - 80}`);
    kopya.setAttribute("width", String(s.w - 300));
    kopya.setAttribute("height", String(s.h - 80));
    kopya.removeAttribute("class");
    kopya.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    return new XMLSerializer().serializeToString(kopya);
  };
  const indir = (blob: Blob, ad: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ad;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const disaAktar = (bicim: string) => {
    if (!graf) return;
    if (bicim === "svg") indir(new Blob([svgMetni()], { type: "image/svg+xml" }), "akis-semasi.svg");
    if (bicim === "json") indir(new Blob([JSON.stringify(graf, null, 2)], { type: "application/json" }), "akis-semasi.json");
    if (bicim === "png") {
      const metin = svgMetni();
      const img = new Image();
      const url = URL.createObjectURL(new Blob([metin], { type: "image/svg+xml" }));
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.width * 2;
        c.height = img.height * 2;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        c.toBlob((b) => b && indir(b, "akis-semasi.png"));
      };
      img.src = url;
    }
  };
  const dosyaSecici = useRef<HTMLInputElement>(null);
  const dosyaAc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const g = JSON.parse(await f.text()) as Graf;
      if (!Array.isArray(g.dugumler) || !Array.isArray(g.baglar)) throw new Error();
      degistir(() => g);
      setTimeout(() => sigdir(g), 0);
    } catch {
      alert("Bu dosya bir akış şeması dosyası değil.");
    }
  };
  const sablonAc = (id: string) => {
    if (!id) return;
    const g = id === "bos" ? bos() : semaGraf(akisOrnegi(id).parcalar);
    degistir(() => g);
    setSecim(null);
    setKonsol([]);
    setCanliCikti("");
    setDenetim([]);
    setTimeout(() => sigdir(g), 0);
  };

  // ----- Çizim -----
  const izSu = iz?.iz[izAdim];
  const aktifDugum = izSu?.d ?? null;
  const secili = secim?.tur === "dugum" ? graf?.dugumler.find((d) => d.id === secim.id) : undefined;
  const seciliBag = secim?.tur === "bag" ? graf?.baglar.find((b) => b.id === secim.id) : undefined;
  const stil = useMemo(() => ({ __html: STIL }), []);

  if (!graf) return <div className="ide-yukleniyor">Akış şeması aracı hazırlanıyor…</div>;
  const calisiyor = durum === "calisiyor" || durum === "girdi-bekliyor";
  const dugumBul = (id: string) => graf.dugumler.find((d) => d.id === id);

  return (
    <div className="akis">
      <div className="akis-arac-cubugu">
        <select className="ide-secim" value="" onChange={(e) => sablonAc(e.target.value)} aria-label="Şablon aç">
          <option value="">Şablon aç…</option>
          <option value="bos">Boş sayfa</option>
          {akisOrnekleri.map((o) => (
            <option key={o.id} value={o.id}>
              {o.ad}
            </option>
          ))}
        </select>
        <div className="akis-grup">
          <button className="dugme" onClick={geriAl} disabled={!gecmis.length} title="Geri al (Ctrl+Z)">
            Geri al
          </button>
          <button className="dugme" onClick={yinele} disabled={!ileri.length} title="Yinele (Ctrl+Y)">
            Yinele
          </button>
        </div>
        <div className="akis-grup">
          <button className="dugme" onClick={() => yakinlas(1 / 1.2)} aria-label="Uzaklaştır">
            −
          </button>
          <span className="akis-olcek">{Math.round(gorunum.olcek * 100)}%</span>
          <button className="dugme" onClick={() => yakinlas(1.2)} aria-label="Yakınlaştır">
            +
          </button>
          <button className="dugme" onClick={() => sigdir()}>
            Sığdır
          </button>
        </div>
        <div className="akis-grup">
          <select className="ide-secim" value="" onChange={(e) => disaAktar(e.target.value)} aria-label="İndir">
            <option value="">İndir…</option>
            <option value="png">Resim (PNG)</option>
            <option value="svg">Vektör (SVG)</option>
            <option value="json">Şema dosyası (JSON)</option>
          </select>
          <button className="dugme" onClick={() => dosyaSecici.current?.click()}>
            Aç
          </button>
          <input ref={dosyaSecici} type="file" accept=".json,application/json" hidden onChange={dosyaAc} />
        </div>
        <div className="akis-grup akis-sag">
          {calisiyor ? (
            <button className="dugme dugme-durdur" onClick={() => motor.current?.durdur()}>
              ■ Durdur
            </button>
          ) : (
            <button className="dugme dugme-ana" onClick={calistir} disabled={durum === "hata"}>
              ▶ Çalıştır
            </button>
          )}
        </div>
      </div>

      <div className="akis-govde">
        <div className="akis-palet" aria-label="Semboller">
          <p className="akis-palet-baslik">Sembol ekle</p>
          {TURLER.map((t) => (
            <button key={t.t} className="akis-palet-dugme" onClick={() => ekle(t.t)} title={`${t.ad} ekle`}>
              <svg viewBox="-34 -16 68 32" width="56" height="28" aria-hidden="true">
                <g dangerouslySetInnerHTML={stil} />
                {t.t === "bas" || t.t === "bit" ? (
                  <rect className="s-bas" x="-30" y="-12" width="60" height="24" rx="12" />
                ) : t.t === "karar" ? (
                  <polygon className="s-karar" points="0,-14 30,0 0,14 -30,0" />
                ) : t.t === "islem" ? (
                  <rect className="s-islem" x="-28" y="-12" width="56" height="24" rx="2" />
                ) : (
                  <polygon className={`s-${t.t}`} points="-22,-12 32,-12 22,12 -32,12" />
                )}
              </svg>
              <span>{t.ad}</span>
            </button>
          ))}
          <p className="akis-palet-not">
            Kutuyu sürükleyerek taşı. Kutunun altındaki noktadan sürükleyip başka kutuya bırakarak ok çiz.
          </p>
        </div>

        <div className="akis-tuval" ref={kapRef}>
          <svg
            ref={svgRef}
            className="akis-svg"
            viewBox={`${gorunum.x} ${gorunum.y} ${alan.w / gorunum.olcek} ${alan.h / gorunum.olcek}`}
            onPointerDown={tuvalBas}
            onPointerMove={hareket}
            onPointerUp={birak}
            onPointerLeave={(e) => surukleme.current?.tur !== "dugum" && birak(e)}
            onWheel={tekerlek}
            role="application"
            aria-label="Akış şeması çizim alanı"
          >
            <g dangerouslySetInnerHTML={stil} />
            {graf.baglar.map((b) => {
              const k = dugumBul(b.kaynak);
              const h = dugumBul(b.hedef);
              if (!k || !h) return null;
              const a = cikisNoktasi(k, b.etiket);
              const yolD = bagYolu(a, girisNoktasi(h));
              const sec = secim?.tur === "bag" && secim.id === b.id;
              return (
                <g key={b.id} className={sec ? "akis-bag secili" : "akis-bag"}>
                  <path
                    d={yolD}
                    className="akis-bag-tik"
                    data-arayuz=""
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setSecim({ tur: "bag", id: b.id });
                    }}
                  />
                  <path d={yolD} className="s-cizgi" />
                  {b.etiket && (
                    <text className={b.etiket === "Evet" ? "s-e" : "s-h"} x={a.x + (a.yon === "sol" ? -24 : 24)} y={a.y - 9}>
                      {b.etiket}
                    </text>
                  )}
                </g>
              );
            })}
            {geciciBag && <path d={geciciBag.d} className="s-cizgi akis-gecici" data-arayuz="" />}
            {graf.dugumler.map((d) => {
              const { w, h } = boyut(d);
              const ss = satirlar(d);
              const sinif = ["akis-dugum", secim?.tur === "dugum" && secim.id === d.id ? "secili" : "", aktifDugum === d.id ? "aktif" : "", hataliDugum === d.id ? "hatali" : ""].join(" ");
              return (
                <g key={d.id} data-dugum={d.id} className={sinif} transform={`translate(${d.x},${d.y})`} onPointerDown={(e) => dugumBas(e, d)}>
                  <rect className="akis-vurgu" data-arayuz="" x={-w / 2 - EGIM - 7} y={-h / 2 - 7} width={w + 2 * EGIM + 14} height={h + 14} rx="10" />
                  {sekilYolu(d)}
                  <text className={`s-y${d.t === "islem" || d.t === "karar" || d.t === "giris" || d.t === "cikis" ? " s-kod" : ""}${d.t === "bas" || d.t === "bit" ? " s-bas-y" : ""}`} y={-(ss.length - 1) * 10}>
                    {ss.map((s, i) => (
                      <tspan key={i} x="0" dy={i === 0 ? 0 : 20}>
                        {s}
                      </tspan>
                    ))}
                  </text>
                  {d.t === "karar" ? (
                    <>
                      <circle className="akis-port evet" data-arayuz="" cx={-w / 2} cy="0" r="7" onPointerDown={(e) => portBas(e, d, "Evet")}>
                        <title>Evet okunu çizmek için sürükle</title>
                      </circle>
                      <circle className="akis-port hayir" data-arayuz="" cx={w / 2} cy="0" r="7" onPointerDown={(e) => portBas(e, d, "Hayır")}>
                        <title>Hayır okunu çizmek için sürükle</title>
                      </circle>
                    </>
                  ) : d.t !== "bit" ? (
                    <circle className="akis-port" data-arayuz="" cx="0" cy={h / 2} r="7" onPointerDown={(e) => portBas(e, d)}>
                      <title>Ok çizmek için sürükle</title>
                    </circle>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="akis-panel">
          <section className="akis-ozellik">
            {secili ? (
              <>
                <h2>{turBilgisi(secili.t).ad} kutusu</h2>
                {secili.t !== "bas" && secili.t !== "bit" && (
                  <label className="akis-alan">
                    <span>İçerik</span>
                    <textarea
                      value={secili.m}
                      rows={secili.t === "islem" ? 3 : 2}
                      spellCheck={false}
                      onFocus={() => {
                        setGecmis((h) => [...h.slice(-99), graf]);
                        setIleri([]);
                      }}
                      onChange={(e) => {
                        const m = e.target.value;
                        setGraf((g) => g && { ...g, dugumler: g.dugumler.map((d) => (d.id === secili.id ? { ...d, m } : d)) });
                        setIz(null);
                      }}
                    />
                  </label>
                )}
                <div className="akis-ipucu">
                  <Markdown>{turBilgisi(secili.t).ipucu}</Markdown>
                </div>
                <button className="dugme dugme-sade akis-sil" onClick={sil}>
                  Kutuyu sil
                </button>
              </>
            ) : seciliBag ? (
              <>
                <h2>Ok</h2>
                <p className="akis-soluk">
                  {etiketi(dugumBul(seciliBag.kaynak)!)} → {etiketi(dugumBul(seciliBag.hedef)!)}
                  {seciliBag.etiket ? ` (${seciliBag.etiket})` : ""}
                </p>
                <button className="dugme dugme-sade akis-sil" onClick={sil}>
                  Oku sil
                </button>
              </>
            ) : (
              <>
                <h2>Nasıl kullanılır?</h2>
                <ol className="akis-yardim">
                  <li>Soldan bir sembol ekle; kutuya tıklayıp içeriğini burada yaz.</li>
                  <li>Kutunun altındaki noktadan sürükleyip bir sonraki kutuya bırak. Karar kutusunda sol nokta <b>Evet</b>, sağ nokta <b>Hayır</b>.</li>
                  <li><b>▶ Çalıştır</b> ile akışı çalıştır, sonra adım adım izle.</li>
                </ol>
                <p className="akis-soluk">Boş alanı sürükleyerek kaydır, tekerlekle yakınlaştır. Seçili kutuyu Delete ile sil.</p>
              </>
            )}
          </section>

          {denetim.length > 0 && (
            <section className="akis-denetim" role="alert">
              <h2>Şemada düzeltilecekler</h2>
              <ul>
                {denetim.map((h, i) => (
                  <li key={i}>
                    {h.dugum ? (
                      <button
                        className="baglanti"
                        onClick={() => {
                          setSecim({ tur: "dugum", id: h.dugum! });
                          setHataliDugum(h.dugum!);
                        }}
                      >
                        <Markdown>{h.mesaj}</Markdown>
                      </button>
                    ) : (
                      <Markdown>{h.mesaj}</Markdown>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {iz && izSu && (
            <section className="akis-iz">
              <div className="akis-iz-ust">
                <h2>Adım adım izle</h2>
                <span className="akis-soluk">
                  Adım {izAdim + 1} / {iz.iz.length}
                </span>
              </div>
              <div className="akis-iz-dugmeler">
                <button className="dugme" onClick={() => { setOynuyor(false); setIzAdim(0); }} aria-label="Başa dön">⏮</button>
                <button className="dugme" onClick={() => { setOynuyor(false); setIzAdim((a) => Math.max(0, a - 1)); }} aria-label="Önceki adım">◀</button>
                <button className="dugme dugme-ana" onClick={() => { if (izAdim >= iz.iz.length - 1) setIzAdim(0); setOynuyor((o) => !o); }}>{oynuyor ? "Duraklat" : "Oynat"}</button>
                <button className="dugme" onClick={() => { setOynuyor(false); setIzAdim((a) => Math.min(iz.iz.length - 1, a + 1)); }} aria-label="Sonraki adım">▶</button>
              </div>
              <p className="akis-iz-su">
                Şu an: <b>{izSu.d ? etiketi(dugumBul(izSu.d) ?? { id: "", t: "islem", m: "?", x: 0, y: 0 }) : "Akış bitti"}</b>
              </p>
              <table className="akis-degiskenler">
                <thead>
                  <tr>
                    <th>Değişken</th>
                    <th>Değer</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(izSu.v).length === 0 ? (
                    <tr>
                      <td colSpan={2} className="akis-soluk">Henüz değişken yok</td>
                    </tr>
                  ) : (
                    Object.entries(izSu.v).map(([k, v]) => {
                      const onceki = izAdim > 0 ? iz.iz[izAdim - 1].v[k] : undefined;
                      return (
                        <tr key={k} className={onceki !== v ? "degisti" : ""}>
                          <td>{k}</td>
                          <td>{v}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {izSu.c > 0 && (
                <div className="akis-iz-cikti">
                  <span className="akis-soluk">Ekrana yazılanlar</span>
                  <pre>{iz.ciktilar.slice(0, izSu.c).join("\n")}</pre>
                </div>
              )}
            </section>
          )}

          <section className="ide-konsol akis-konsol">
            <div className="ide-konsol-ust">
              <span>Konsol</span>
              <span className={`ide-durum ide-durum-${durum}`}>
                {{ yukleniyor: "Python yükleniyor…", hazir: "Hazır", calisiyor: "Akış çalışıyor…", "girdi-bekliyor": "Cevabını bekliyor…", hata: "Python yüklenemedi" }[durum]}
              </span>
            </div>
            {!canli && (
              <label className="girdiler akis-yedek">
                <span>Girdiler <small>Her satıra bir cevap.</small></span>
                <textarea value={yedekGirdiler} onChange={(e) => setYedekGirdiler(e.target.value)} rows={2} spellCheck={false} />
              </label>
            )}
            <div className="ide-konsol-icerik" onClick={() => istem !== null && girdiKutusu.current?.focus()}>
              {konsol.length === 0 && !canliCikti && <div className="ide-ipucu">Şemayı çizip ▶ Çalıştır'a bas.</div>}
              {konsol.filter((p) => p.tur === "bilgi").slice(0, 1).map((p, i) => (
                <span key={`b${i}`} className="ide-bilgi">{(p as { metin: string }).metin + "\n"}</span>
              ))}
              {canliCikti && <span className="ide-cikti">{canliCikti}</span>}
              {istem !== null && (
                <span className="ide-girdi-satiri">
                  <input
                    ref={girdiKutusu}
                    value={girdi}
                    onChange={(e) => setGirdi(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && girdiyiGonder()}
                    aria-label="Akışa cevap yaz"
                    placeholder="cevabını yaz, Enter'a bas"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </span>
              )}
              {konsol.slice(1).map((p, i) =>
                p.tur === "hata" ? (
                  <div key={i} className="ide-hata">
                    <HataKutusu hata={p.hata} />
                  </div>
                ) : (
                  <span key={i} className="ide-bilgi">{p.metin + "\n"}</span>
                )
              )}
              <div ref={konsolSonu} />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
