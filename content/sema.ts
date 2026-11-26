// Akış şeması çizim araçları. Derslerdeki şemalar buradaki fonksiyonlarla, metinden otomatik çizilir.
//
//   sema("Başlık", [
//     { t: "bas" },
//     { t: "giris", m: "a, b sayılarını al" },
//     { t: "islem", m: "toplam = a + b" },
//     { karar: "toplam > 10 ?", evet: [{ t: "cikis", m: "Büyük" }], hayir: [{ t: "cikis", m: "Küçük" }] },
//     { dongu: "i <= 5 ?", govde: [{ t: "cikis", m: "i" }, { t: "islem", m: "i = i + 1" }] },
//     { t: "bit" },
//   ])

export type Dugum = { t: "bas" | "bit" | "giris" | "cikis" | "islem"; m?: string };
export type Karar = { karar: string; evet: Dugum[]; hayir: Dugum[] };
export type Dongu = { dongu: string; govde: Dugum[] };
export type Parca = Dugum | Karar | Dongu;

const H = 44; // düğüm yüksekliği
const ARA = 34; // düğümler arası ok uzunluğu
const EGIM = 13; // paralelkenar eğimi

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const genislik = (m: string, en = 120) => Math.max(en, Math.round(m.length * 8.3 + 44));

export const STIL = `
<defs>
  <marker id="sema-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="#3f5653"/>
  </marker>
</defs>
<style>
  .s-bas { fill:#0f766e; stroke:#0f5f59; stroke-width:1.5 }
  .s-y.s-bas-y { fill:#ffffff; font-weight:600 }
  .s-giris { fill:#ffe2ad; stroke:#0f5f59; stroke-width:1.75 }
  .s-cikis { fill:#b6efe5; stroke:#0f5f59; stroke-width:1.75 }
  .s-islem { fill:#ffffff; stroke:#0f5f59; stroke-width:1.75 }
  .s-karar { fill:#ffc4b5; stroke:#0f5f59; stroke-width:1.75 }
  .s-cizgi { stroke:#3f5653; stroke-width:1.6; fill:none; marker-end:url(#sema-ok) }
  .s-yol { stroke:#3f5653; stroke-width:1.6; fill:none }
  .s-nokta { fill:#3f5653 }
  .s-y { font-family: Nunito, system-ui, sans-serif; font-size:15px; fill:#1b2b2a; text-anchor:middle; dominant-baseline:central }
  .s-kod { font-family: "IBM Plex Mono", ui-monospace, Menlo, monospace; font-size:14px }
  .s-e { font-family: Nunito, system-ui, sans-serif; fill:#1f7a4a; font-weight:600; font-size:13px; text-anchor:middle }
  .s-h { font-family: Nunito, system-ui, sans-serif; fill:#b4323a; font-weight:600; font-size:13px; text-anchor:middle }
  .s-not { font-family: Nunito, system-ui, sans-serif; fill:#3f5653; font-size:13px; text-anchor:middle }
</style>`;

/** Araçta açılabilen şema biçimi: düğümlerin merkez koordinatları ve bağlantılar. */
export type GDugum = { id: string; t: Dugum["t"] | "karar"; m: string; x: number; y: number };
export type GBag = { id: string; kaynak: string; hedef: string; etiket?: "Evet" | "Hayır" };
export type Graf = { dugumler: GDugum[]; baglar: GBag[] };

type Cizim = { parcalar: string[]; minX: number; maxX: number; graf: Graf };
type Kaynak = { id: string; etiket?: "Evet" | "Hayır" };

function sinir(c: Cizim, x1: number, x2: number) {
  c.minX = Math.min(c.minX, x1);
  c.maxX = Math.max(c.maxX, x2);
}

let sonId = "";
function kaydet(c: Cizim, t: GDugum["t"], m: string, x: number, y: number): string {
  const id = `d${c.graf.dugumler.length + 1}`;
  c.graf.dugumler.push({ id, t, m, x, y });
  sonId = id;
  return id;
}
function bagla(c: Cizim, kaynaklar: Kaynak[], hedef: string) {
  for (const k of kaynaklar) c.graf.baglar.push({ id: `b${c.graf.baglar.length + 1}`, kaynak: k.id, hedef, ...(k.etiket ? { etiket: k.etiket } : {}) });
}

/** Tek düğüm çizer; (x, y) üst ortası. Alt kenarın y'sini döndürür. */
function dugum(c: Cizim, d: Dugum, x: number, y: number): number {
  const kod = d.t === "islem";
  const m = d.m ?? (d.t === "bas" ? "Başla" : d.t === "bit" ? "Bitir" : "");
  const cy = y + H / 2;
  kaydet(c, d.t, d.m ?? "", x, cy);
  const yazi = (sinif = "") => `<text class="s-y${kod ? " s-kod" : ""}${sinif}" x="${x}" y="${cy}">${esc(m)}</text>`;
  if (d.t === "bas" || d.t === "bit") {
    const w = Math.max(110, genislik(m, 110));
    c.parcalar.push(`<rect class="s-bas" x="${x - w / 2}" y="${y}" width="${w}" height="${H}" rx="${H / 2}"/>${yazi(" s-bas-y")}`);
    sinir(c, x - w / 2, x + w / 2);
  } else if (d.t === "giris" || d.t === "cikis") {
    const w = genislik(m) + 10;
    const s = EGIM;
    c.parcalar.push(
      `<polygon class="s-${d.t}" points="${x - w / 2 + s},${y} ${x + w / 2 + s},${y} ${x + w / 2 - s},${y + H} ${x - w / 2 - s},${y + H}"/>${yazi()}`
    );
    sinir(c, x - w / 2 - s, x + w / 2 + s);
  } else {
    const w = genislik(m);
    c.parcalar.push(`<rect class="s-islem" x="${x - w / 2}" y="${y}" width="${w}" height="${H}" rx="3"/>${yazi()}`);
    sinir(c, x - w / 2, x + w / 2);
  }
  return y + H;
}

function dugumGenisligi(d: Dugum): number {
  const m = d.m ?? (d.t === "bas" ? "Başla" : d.t === "bit" ? "Bitir" : "");
  if (d.t === "bas" || d.t === "bit") return Math.max(110, genislik(m, 110));
  if (d.t === "giris" || d.t === "cikis") return genislik(m) + 10 + 2 * EGIM;
  return genislik(m);
}

const ok = (c: Cizim, d: string) => c.parcalar.push(`<path class="s-cizgi" d="${d}"/>`);
const yol = (c: Cizim, d: string) => c.parcalar.push(`<path class="s-yol" d="${d}"/>`);

/** Elmas çizer; (x, y) üst ucu. */
function elmas(c: Cizim, metin: string, x: number, y: number): { w: number; h: number } {
  const w = Math.max(170, Math.round(metin.length * 8.8 + 70));
  const h = 74;
  kaydet(c, "karar", metin.replace(/\s*\?$/, ""), x, y + h / 2);
  c.parcalar.push(
    `<polygon class="s-karar" points="${x},${y} ${x + w / 2},${y + h / 2} ${x},${y + h} ${x - w / 2},${y + h / 2}"/>` +
      `<text class="s-y s-kod" x="${x}" y="${y + h / 2}">${esc(metin)}</text>`
  );
  sinir(c, x - w / 2, x + w / 2);
  return { w, h };
}

/** Düğümleri alt alta dizer; (x, y) ilk düğümün üstü. Son alt kenarın y'sini, ilk ve son düğümün kimliğini döndürür. */
function dizi(c: Cizim, dugumler: Dugum[], x: number, y: number, giris: Kaynak[]): { alt: number; ilk: string; son: string } {
  let alt = y;
  let onceki = giris;
  let ilk = "";
  dugumler.forEach((d, i) => {
    if (i > 0) {
      ok(c, `M${x},${alt} L${x},${alt + ARA}`);
      alt += ARA;
    }
    alt = dugum(c, d, x, alt);
    bagla(c, onceki, sonId);
    if (i === 0) ilk = sonId;
    onceki = [{ id: sonId }];
  });
  return { alt, ilk, son: sonId };
}

function ciz(parcalar: Parca[]): { c: Cizim; yukseklik: number } {
  const c: Cizim = { parcalar: [], minX: 0, maxX: 0, graf: { dugumler: [], baglar: [] } };
  let y = 0;
  let ilk = true;
  let bekleyen: Kaynak[] = [];
  for (const p of parcalar) {
    if (!ilk) {
      ok(c, `M0,${y} L0,${y + ARA}`);
      y += ARA;
    }
    ilk = false;
    if ("t" in p) {
      y = dugum(c, p, 0, y);
      bagla(c, bekleyen, sonId);
      bekleyen = [{ id: sonId }];
    } else if ("karar" in p) {
      const { w, h } = elmas(c, p.karar, 0, y);
      const kararId = sonId;
      bagla(c, bekleyen, kararId);
      bekleyen = [];
      const dalGenisligi = Math.max(0, ...p.evet.map(dugumGenisligi), ...p.hayir.map(dugumGenisligi));
      const D = Math.max(w / 2 + 34, dalGenisligi / 2 + 18);
      const orta = y + h / 2;
      const ust = y + h + 26;
      // Evet: sol dal
      let solAlt: number;
      if (p.evet.length) {
        ok(c, `M${-w / 2},${orta} L${-D},${orta} L${-D},${ust}`);
        const r = dizi(c, p.evet, -D, ust, [{ id: kararId, etiket: "Evet" }]);
        solAlt = r.alt;
        bekleyen.push({ id: r.son });
      } else {
        yol(c, `M${-w / 2},${orta} L${-D},${orta} L${-D},${ust}`);
        solAlt = ust;
        bekleyen.push({ id: kararId, etiket: "Evet" });
      }
      c.parcalar.push(`<text class="s-e" x="${-w / 2 - 22}" y="${orta - 8}">Evet</text>`);
      // Hayır: sağ dal
      let sagAlt: number;
      if (p.hayir.length) {
        ok(c, `M${w / 2},${orta} L${D},${orta} L${D},${ust}`);
        const r = dizi(c, p.hayir, D, ust, [{ id: kararId, etiket: "Hayır" }]);
        sagAlt = r.alt;
        bekleyen.push({ id: r.son });
      } else {
        yol(c, `M${w / 2},${orta} L${D},${orta} L${D},${ust}`);
        sagAlt = ust;
        bekleyen.push({ id: kararId, etiket: "Hayır" });
      }
      c.parcalar.push(`<text class="s-h" x="${w / 2 + 24}" y="${orta - 8}">Hayır</text>`);
      const birles = Math.max(solAlt, sagAlt) + 26;
      ok(c, `M${-D},${solAlt} L${-D},${birles} L-7,${birles}`);
      ok(c, `M${D},${sagAlt} L${D},${birles} L7,${birles}`);
      c.parcalar.push(`<circle class="s-nokta" cx="0" cy="${birles}" r="4"/>`);
      sinir(c, -D - dalGenisligi / 2, D + dalGenisligi / 2);
      y = birles;
    } else {
      const { w, h } = elmas(c, p.dongu, 0, y);
      const donguId = sonId;
      bagla(c, bekleyen, donguId);
      const orta = y + h / 2;
      const govdeUst = y + h + ARA;
      ok(c, `M0,${y + h} L0,${govdeUst}`);
      c.parcalar.push(`<text class="s-e" x="20" y="${y + h + 18}" style="text-anchor:start">Evet</text>`);
      const g = dizi(c, p.govde, 0, govdeUst, [{ id: donguId, etiket: "Evet" }]);
      const govdeAlt = g.alt;
      bagla(c, [{ id: g.son }], donguId);
      bekleyen = [{ id: donguId, etiket: "Hayır" }];
      const govdeGenisligi = Math.max(0, ...p.govde.map(dugumGenisligi));
      const L = Math.max(w / 2, govdeGenisligi / 2) + 36;
      const geri = govdeAlt + 22;
      ok(c, `M0,${govdeAlt} L0,${geri} L${-L},${geri} L${-L},${orta} L${-w / 2},${orta}`);
      c.parcalar.push(`<text class="s-not" x="${-L - 12}" y="${(orta + geri) / 2}" transform="rotate(-90 ${-L - 12} ${(orta + geri) / 2})">tekrar</text>`);
      const R = Math.max(w / 2, govdeGenisligi / 2) + 36;
      const cikis = geri + 30;
      yol(c, `M${w / 2},${orta} L${R},${orta} L${R},${cikis}`);
      ok(c, `M${R},${cikis} L7,${cikis}`);
      c.parcalar.push(`<circle class="s-nokta" cx="0" cy="${cikis}" r="4"/>`);
      c.parcalar.push(`<text class="s-h" x="${w / 2 + 24}" y="${orta - 8}">Hayır</text>`);
      sinir(c, -L - 24, R + 6);
      y = cikis;
    }
  }
  return { c, yukseklik: y };
}

/** Şemayı araçta açılabilecek biçime (düğümler + bağlantılar) çevirir. */
export function semaGraf(parcalar: Parca[]): Graf {
  const { c } = ciz(parcalar);
  const dx = -c.minX + 60;
  return {
    dugumler: c.graf.dugumler.map((d) => ({ ...d, x: Math.round(d.x + dx), y: Math.round(d.y + 60) })),
    baglar: c.graf.baglar,
  };
}

/** Bir akış şemasını SVG olarak üretir. */
export function sema(baslik: string, parcalar: Parca[]): string {
  const { c, yukseklik } = ciz(parcalar);
  const pay = 16;
  const w = Math.ceil(c.maxX - c.minX + 2 * pay);
  const h = Math.ceil(yukseklik + 2 * pay);
  const dx = -c.minX + pay;
  return (
    `<svg viewBox="0 0 ${w} ${h}" width="${w}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(baslik)}">${STIL}` +
    `<g transform="translate(${dx},${pay})">${c.parcalar.join("")}</g></svg>`
  );
}

/** Akış şeması sembolleri tablosu. */
export function semboller(): string {
  const satirlar: [string, string, string][] = [
    ["bas", "Başla / Bitir", "Algoritmanın başladığı ve bittiği yer. Her şemada bir tane Başla, bir tane Bitir olur."],
    ["giris", "Veri girişi", "Kullanıcıdan (klavyeden) bilgi alınır: “Sayıyı al”, “Adını oku”."],
    ["islem", "İşlem", "Hesaplama ya da değer atama yapılır: toplam = a + b"],
    ["karar", "Karar (koşul)", "Bir soru sorulur. Cevaba göre Evet ya da Hayır yolundan gidilir."],
    ["cikis", "Çıktı (ekrana yaz)", "Sonuç ekrana yazdırılır: “toplamı yaz”."],
    ["ok", "Akış yönü", "Adımların hangi sırayla yapılacağını gösterir."],
  ];
  const satirH = 84;
  const w = 640;
  const icerik = satirlar
    .map(([t, ad, ac], i) => {
      const y = i * satirH + 14;
      const cx = 90;
      const cy = y + 28;
      let sekil = "";
      if (t === "bas") sekil = `<rect class="s-bas" x="${cx - 60}" y="${cy - 20}" width="120" height="40" rx="20"/>`;
      if (t === "giris") sekil = `<polygon class="s-giris" points="${cx - 58},${cy - 20} ${cx + 68},${cy - 20} ${cx + 58},${cy + 20} ${cx - 68},${cy + 20}"/>`;
      if (t === "cikis") sekil = `<polygon class="s-cikis" points="${cx - 58},${cy - 20} ${cx + 68},${cy - 20} ${cx + 58},${cy + 20} ${cx - 68},${cy + 20}"/>`;
      if (t === "islem") sekil = `<rect class="s-islem" x="${cx - 62}" y="${cy - 20}" width="124" height="40" rx="3"/>`;
      if (t === "karar") sekil = `<polygon class="s-karar" points="${cx},${cy - 28} ${cx + 66},${cy} ${cx},${cy + 28} ${cx - 66},${cy}"/>`;
      if (t === "ok") sekil = `<path class="s-cizgi" d="M${cx - 50},${cy} L${cx + 50},${cy}"/>`;
      return (
        sekil +
        `<text class="s-y" x="190" y="${cy - 11}" style="text-anchor:start;font-weight:600">${esc(ad)}</text>` +
        `<text class="s-y" x="190" y="${cy + 12}" style="text-anchor:start;font-size:13.5px;fill:#3f5653">${esc(ac)}</text>`
      );
    })
    .join("");
  return `<svg viewBox="0 0 ${w} ${satirlar.length * satirH + 10}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Akış şeması sembolleri">${STIL}${icerik}</svg>`;
}
