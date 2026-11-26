"use client";
// IDE için ayrı bir Python motoru: çıktı anında akar, input() kullanıcıdan canlı cevap bekler,
// program istenildiğinde durdurulabilir.
//
// Canlı input() için tarayıcının SharedArrayBuffer desteği gerekir. Bu da sitenin
// "cross-origin isolated" olarak sunulmasını (COOP/COEP başlıkları) gerektirir. Bu başlıklar yoksa
// motor otomatik olarak "Girdiler kutusu" moduna geçer.

import type { PythonHatasi } from "./hatalar";

const TEMEL_YOL = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Programın girdi beklemeden çalışabileceği en uzun süre */
const CALISMA_SINIRI_MS = 10_000;

export type MotorDurumu = "yukleniyor" | "hazir" | "calisiyor" | "girdi-bekliyor" | "hata";

export type Olaylar = {
  cikti: (metin: string) => void;
  girdiIste: (istem: string) => void;
  durum: (d: MotorDurumu) => void;
};

export type KosuSonucu = { hata: PythonHatasi | null; durduruldu: boolean; sureMs: number };

export function etkilesimliDestekleniyor(): boolean {
  return typeof SharedArrayBuffer !== "undefined" && typeof self !== "undefined" && self.crossOriginIsolated === true;
}

export class EtkilesimliMotor {
  private worker: Worker | null = null;
  private hazir: Promise<void> | null = null;
  private sab: SharedArrayBuffer | null = null;
  private aktif: {
    id: number;
    coz: (s: KosuSonucu) => void;
    baslangic: number;
    zamanlayici: ReturnType<typeof setTimeout> | null;
    kalanMs: number;
    sayacBaslangic: number;
  } | null = null;
  private sayac = 0;
  private motorHazir = false;

  constructor(private olaylar: Olaylar) {}

  baslat() {
    if (this.worker) return;
    this.motorHazir = false;
    this.olaylar.durum("yukleniyor");
    const w = new Worker(`${TEMEL_YOL}/pyodide/worker.mjs`, { type: "module" });
    this.worker = w;
    this.hazir = new Promise<void>((coz, reddet) => {
      w.addEventListener("message", (e) => this.mesaj(e, coz, reddet));
      w.addEventListener("error", () => {
        this.olaylar.durum("hata");
        reddet(new Error("Python motoru yüklenemedi."));
      });
    });
    this.hazir.catch(() => {});
  }

  private mesaj(e: MessageEvent, hazirCoz: () => void, hazirReddet: (e: Error) => void) {
    const v = e.data;
    if (v?.tip === "hazir") {
      this.motorHazir = true;
      if (!this.aktif) this.olaylar.durum("hazir");
      hazirCoz();
      return;
    }
    if (v?.tip === "yuklenemedi") {
      this.olaylar.durum("hata");
      hazirReddet(new Error(v.mesaj));
      return;
    }
    if (!this.aktif || v?.id !== this.aktif.id) return;
    if (v.tip === "akis") this.olaylar.cikti(v.metin);
    else if (v.tip === "girdi") {
      this.zamanlayiciyiDuraklat();
      this.olaylar.durum("girdi-bekliyor");
      this.olaylar.girdiIste(v.istem);
    } else if (v.tip === "sonuc") {
      if (v.cikti) this.olaylar.cikti(v.cikti);
      this.bitir({ hata: v.hata, durduruldu: false });
    }
  }

  private zamanlayiciyiBaslat() {
    const a = this.aktif;
    if (!a) return;
    a.sayacBaslangic = performance.now();
    a.zamanlayici = setTimeout(() => {
      this.workeriYenile();
      this.bitir({
        hata: { tur: "ZamanAsimi", mesaj: `Program ${CALISMA_SINIRI_MS / 1000} saniyede bitmedi.`, satir: null, ayrinti: "" },
        durduruldu: false,
      });
    }, a.kalanMs);
  }

  private zamanlayiciyiDuraklat() {
    const a = this.aktif;
    if (!a || !a.zamanlayici) return;
    clearTimeout(a.zamanlayici);
    a.zamanlayici = null;
    a.kalanMs -= performance.now() - a.sayacBaslangic;
  }

  private bitir(s: { hata: PythonHatasi | null; durduruldu: boolean }) {
    const a = this.aktif;
    if (!a) return;
    if (a.zamanlayici) clearTimeout(a.zamanlayici);
    this.aktif = null;
    this.olaylar.durum(this.motorHazir ? "hazir" : "yukleniyor");
    a.coz({ ...s, sureMs: performance.now() - a.baslangic });
  }

  private workeriYenile() {
    this.worker?.terminate();
    this.worker = null;
    this.hazir = null;
    this.baslat();
  }

  /** Kodu çalıştırır. Etkileşimli mod desteklenmiyorsa `yedekGirdiler` input() cevapları olarak kullanılır. */
  async calistir(kod: string, yedekGirdiler: string[] = []): Promise<KosuSonucu> {
    this.baslat();
    try {
      await this.hazir;
    } catch {
      return {
        hata: { tur: "MotorHatası", mesaj: "Python motoru yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.", satir: null, ayrinti: "" },
        durduruldu: false,
        sureMs: 0,
      };
    }
    if (this.aktif) this.durdur();
    const id = ++this.sayac;
    const sonuc = new Promise<KosuSonucu>((coz) => {
      this.aktif = { id, coz, baslangic: performance.now(), zamanlayici: null, kalanMs: CALISMA_SINIRI_MS, sayacBaslangic: 0 };
    });
    this.olaylar.durum("calisiyor");
    this.zamanlayiciyiBaslat();
    if (etkilesimliDestekleniyor()) {
      if (!this.sab) this.sab = new SharedArrayBuffer(8 + 64 * 1024);
      this.worker!.postMessage({ tip: "etkilesimli", id, kod, sab: this.sab });
    } else {
      this.worker!.postMessage({ tip: "calistir", id, kod, girdiler: yedekGirdiler, yanki: true });
    }
    return sonuc;
  }

  /** Programın beklediği input() cevabını gönderir. */
  girdiGonder(metin: string) {
    if (!this.sab || !this.aktif) return;
    const kontrol = new Int32Array(this.sab, 0, 2);
    const baytlar = new Uint8Array(this.sab, 8);
    const kod = new TextEncoder().encode(metin).slice(0, baytlar.length);
    baytlar.set(kod);
    Atomics.store(kontrol, 1, kod.length);
    Atomics.store(kontrol, 0, 1);
    Atomics.notify(kontrol, 0);
    this.olaylar.durum("calisiyor");
    this.zamanlayiciyiBaslat();
  }

  /** Çalışan programı hemen durdurur. */
  durdur() {
    if (!this.aktif) return;
    this.workeriYenile();
    this.bitir({ hata: null, durduruldu: true });
  }

  kapat() {
    this.worker?.terminate();
    this.worker = null;
  }
}
