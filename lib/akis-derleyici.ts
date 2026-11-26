// Akış şemasını kontrol eder ve çalıştırılabilir Python koduna çevirir.
//
// Kutu içerikleri:
//   Giriş  : alınacak değişkenlerin adları, virgülle (ör. "a, b")
//   İşlem  : Python atamaları, her satıra bir tane (ör. "toplam = a + b")
//   Karar  : koşul (ör. "a > b"); sonundaki "?" yok sayılır
//   Çıktı  : ekrana yazılacaklar, print() içine yazar gibi (ör. "Toplam:", toplam)
//
// Çalışırken her adımda hangi kutuda olunduğu ve değişkenlerin değerleri kaydedilir ("iz").
// Program bitince bu iz, özel bir işaretle başlayan tek satır olarak yazdırılır.

import type { Graf, GDugum } from "@/content/sema";

export const IZ_ISARETI = "\u0000AKIS_IZI\u0000";
export const AZAMI_ADIM = 5000;

export type IzAdimi = { d: string; v: Record<string, string>; c: number };
export type SemaHatasi = { mesaj: string; dugum?: string };

const PY_ANAHTAR = new Set(
  "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield print input".split(" ")
);

export function girisDegiskenleri(m: string): string[] {
  return m
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const kosul = (m: string) => m.trim().replace(/\s*\?+\s*$/, "");

/** Şemayı çalıştırmadan önce kontrol eder. Boş liste = sorun yok. */
export function semayiDenetle(g: Graf): SemaHatasi[] {
  const hatalar: SemaHatasi[] = [];
  const baslar = g.dugumler.filter((d) => d.t === "bas");
  const bitler = g.dugumler.filter((d) => d.t === "bit");
  if (baslar.length === 0) hatalar.push({ mesaj: "Şemada bir **Başla** kutusu yok." });
  if (baslar.length > 1) hatalar.push({ mesaj: "Şemada birden fazla **Başla** kutusu var; yalnızca bir tane olmalı.", dugum: baslar[1].id });
  if (bitler.length === 0) hatalar.push({ mesaj: "Şemada bir **Bitir** kutusu yok." });

  const cikanlar = (id: string) => g.baglar.filter((b) => b.kaynak === id);
  for (const d of g.dugumler) {
    const c = cikanlar(d.id);
    if (d.t === "bit") {
      if (c.length) hatalar.push({ mesaj: "**Bitir** kutusundan ok çıkmamalı.", dugum: d.id });
      continue;
    }
    if (d.t === "karar") {
      if (!kosul(d.m)) hatalar.push({ mesaj: "Bir **karar** kutusunun koşulu boş.", dugum: d.id });
      const evet = c.filter((b) => b.etiket === "Evet");
      const hayir = c.filter((b) => b.etiket === "Hayır");
      if (evet.length !== 1 || hayir.length !== 1)
        hatalar.push({ mesaj: `**${kosul(d.m) || "Karar"}** kutusundan bir **Evet** ve bir **Hayır** oku çıkmalı.`, dugum: d.id });
      continue;
    }
    if (c.length === 0) hatalar.push({ mesaj: `**${etiketi(d)}** kutusundan çıkan bir ok yok. Bir sonraki adıma bağla.`, dugum: d.id });
    if (c.length > 1) hatalar.push({ mesaj: `**${etiketi(d)}** kutusundan birden fazla ok çıkıyor. Karar kutusu dışındaki kutulardan yalnızca bir ok çıkar.`, dugum: d.id });
    if (d.t === "giris") {
      const adlar = girisDegiskenleri(d.m);
      if (adlar.length === 0) hatalar.push({ mesaj: "Bir **giriş** kutusu boş. Alınacak değişkenin adını yaz (ör. `sayi`).", dugum: d.id });
      for (const a of adlar)
        if (!/^[A-Za-z_çğıöşüÇĞİÖŞÜ][A-Za-z0-9_çğıöşüÇĞİÖŞÜ]*$/.test(a) || PY_ANAHTAR.has(a))
          hatalar.push({ mesaj: `Giriş kutusundaki **${a}** bir değişken adı olamaz. Giriş kutusuna yalnızca değişken adları yazılır (ör. \`a, b\`).`, dugum: d.id });
    }
    if ((d.t === "islem" || d.t === "cikis") && !d.m.trim())
      hatalar.push({ mesaj: `Bir **${d.t === "islem" ? "işlem" : "çıktı"}** kutusu boş.`, dugum: d.id });
  }
  const varmi = (id: string) => g.dugumler.some((d) => d.id === id);
  for (const b of g.baglar) if (!varmi(b.kaynak) || !varmi(b.hedef)) hatalar.push({ mesaj: "Boşta kalan bir ok var; silip yeniden bağla." });
  return hatalar;
}

export function etiketi(d: GDugum): string {
  if (d.t === "bas") return "Başla";
  if (d.t === "bit") return "Bitir";
  return d.m.split("\n")[0] || { giris: "Giriş", cikis: "Çıktı", islem: "İşlem", karar: "Karar" }[d.t];
}

const pyMetin = (s: string) => JSON.stringify(s);
const girintile = (kod: string, n: number) =>
  kod
    .split("\n")
    .map((s) => " ".repeat(n) + s)
    .join("\n");

/** Şemayı Python'a çevirir. Önce semayiDenetle() ile kontrol edilmeli. */
export function semayiDerle(g: Graf): string {
  const bas = g.dugumler.find((d) => d.t === "bas")!;
  const sonraki = (id: string, etiket?: string) => g.baglar.find((b) => b.kaynak === id && (!etiket || b.etiket === etiket))?.hedef;
  const dallar = g.dugumler.map((d) => {
    let govde: string;
    switch (d.t) {
      case "bas":
        govde = `_dugum = ${pyMetin(sonraki(d.id)!)}`;
        break;
      case "bit":
        govde = "_dugum = None";
        break;
      case "giris":
        govde =
          girisDegiskenleri(d.m)
            .map((a) => `${a} = _sayi(input(${pyMetin(a + " = ")}))`)
            .join("\n") + `\n_dugum = ${pyMetin(sonraki(d.id)!)}`;
        break;
      case "islem":
        govde = `${d.m.trim()}\n_dugum = ${pyMetin(sonraki(d.id)!)}`;
        break;
      case "cikis":
        govde = `_yaz(${d.m.trim()})\n_dugum = ${pyMetin(sonraki(d.id)!)}`;
        break;
      case "karar":
        govde = `_dugum = ${pyMetin(sonraki(d.id, "Evet")!)} if (${kosul(d.m)}) else ${pyMetin(sonraki(d.id, "Hayır")!)}`;
        break;
    }
    return `    ${d === g.dugumler[0] ? "if" : "elif"} _dugum == ${pyMetin(d.id)}:\n${girintile(govde, 8)}`;
  });

  return `import json as _json
_iz = []
_ciktilar = []
def _sayi(d):
    try:
        return int(d)
    except ValueError:
        try:
            return float(d)
        except ValueError:
            return d
def _yaz(*degerler):
    print(*degerler)
    _ciktilar.append(" ".join(str(x) for x in degerler))
def _anlik():
    return {k: repr(v) for k, v in globals().items() if not k.startswith("_") and isinstance(v, (int, float, str, bool, list))}
_dugum = ${pyMetin(bas.id)}
_adim = 0
try:
  while _dugum is not None:
    _adim += 1
    if _adim > ${AZAMI_ADIM}:
        raise RuntimeError("SONSUZ_AKIS")
    _su_an = _dugum
${dallar.join("\n")}
    _iz.append({"d": _su_an, "v": _anlik(), "c": len(_ciktilar)})
finally:
    _iz.append({"d": _dugum, "v": _anlik(), "c": len(_ciktilar), "son": True})
    print(${pyMetin(IZ_ISARETI)} + _json.dumps({"iz": _iz, "ciktilar": _ciktilar}))
`;
}

export type Iz = { iz: (IzAdimi & { son?: boolean })[]; ciktilar: string[] };

/** Çıktıdan izi ayırır: { cikti, iz }. */
export function iziAyir(tumCikti: string): { cikti: string; iz: Iz | null } {
  const i = tumCikti.indexOf(IZ_ISARETI);
  if (i < 0) return { cikti: tumCikti, iz: null };
  const json = tumCikti.slice(i + IZ_ISARETI.length).split("\n")[0];
  try {
    return { cikti: tumCikti.slice(0, i), iz: JSON.parse(json) };
  } catch {
    return { cikti: tumCikti.slice(0, i), iz: null };
  }
}
