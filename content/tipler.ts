// Ders içeriklerinin yapısı. Yeni bir ders eklerken bu tiplere uyun.
import type { Parca } from "./sema";

export type Test = {
  /** input() çağrılarına sırayla verilecek değerler */
  girdiler?: string[];
  /** Programın ekrana yazması beklenen çıktı (satır sonundaki boşluklar önemsenmez) */
  beklenen: string;
};

export type KodKurali = {
  /** Kodda aranacak düzenli ifade (ör. "\\bfor\\b") */
  desen: string;
  /** Kural sağlanmadığında gösterilecek mesaj */
  mesaj: string;
  /** true ise desen kodda OLMAMALI */
  olmamali?: boolean;
};

export type AlistirmaVerisi = {
  /** Tüm site içinde benzersiz olmalı; ilerleme bu kimlikle kaydedilir */
  id: string;
  baslik: string;
  /** Görev açıklaması (Markdown) */
  gorev: string;
  baslangicKodu: string;
  testler: Test[];
  kodKurallari?: KodKurali[];
  ipuclari: string[];
  cozum: string;
};

export type Blok =
  | { tur: "metin"; icerik: string } // Markdown
  | { tur: "ornek"; baslik?: string; kod: string; girdiler?: string[]; aciklama?: string; /** Örnek bilerek hata veriyorsa true */ hataBekleniyor?: boolean }
  | { tur: "ipucu"; renk?: "bilgi" | "uyari" | "basari"; baslik?: string; icerik: string }
  | { tur: "soru"; soru: string; kod?: string; secenekler: string[]; dogru: number; aciklama: string }
  | { tur: "alistirma"; alistirma: AlistirmaVerisi }
  /** Akış diyagramı vb. için hazır SVG çizimi */
  | { tur: "gorsel"; svg: string; altyazi?: string }
  /** Akış şeması: `ornek` verilirse content/akis-ornekleri.ts'teki örnek çizilir ve araçta açılabilir */
  | { tur: "sema"; ornek?: string; parcalar?: Parca[]; baslik?: string; altyazi?: string }
  /** Karışık verilen adımları doğru sıraya dizme etkinliği */
  | { tur: "siralama"; baslik: string; gorev: string; adimlar: string[] };

export type Ders = {
  slug: string;
  sira: number;
  baslik: string;
  ozet: string;
  simge: string;
  sure: string; // ör. "40 dk"
  /** Ders kitabındaki karşılığı, ör. "3.1.1 Operatörler · s. 85–88" */
  kitap: string;
  hedefler: string[];
  /** Sınıfta ders anlatan öğretmen için not (Markdown) */
  ogretmenNotu?: string;
  bloklar: Blok[];
};
