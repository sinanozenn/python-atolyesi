"use client";
// Adım adım kod izleme: kodu Python içinde sys.settrace ile çalıştırır, her satırdan önce
// değişkenlerin ve ekran çıktısının anlık görüntüsünü kaydeder.

import { pythonCalistir } from "./python";

export type IzAdimi = {
  /** Sıradaki (henüz çalışmamış) satır; program bittiyse null */
  satir: number | null;
  degiskenler: [ad: string, deger: string, tur: string][];
  cikti: string;
};
export type IzSonucu = { adimlar: IzAdimi[]; hata: { mesaj: string; satir: number | null } | null; kesildi: boolean };

const IMLEC = "@@IZ@@";
const EN_FAZLA_ADIM = 400;

const IZLEYICI = `
import sys, json, io, builtins, types

_kod = json.loads(_KOD_JSON)
_girdiler = json.loads(_GIRDI_JSON)
_ekran = io.StringIO()
_adimlar = []
_kesildi = False
_ozel = {"input", "print", "__builtins__", "__name__"}

def _girdi(istem=""):
    _ekran.write(str(istem))
    if not _girdiler:
        raise EOFError("Girdiler kutusunda yeterli değer yok.")
    d = _girdiler.pop(0)
    _ekran.write(d + "\\n")
    return d

def _yaz(*a, **k):
    k["file"] = _ekran
    builtins.print(*a, **k)

def _gorunum(g):
    sonuc = []
    for ad, deger in g.items():
        if ad.startswith("_") or ad in _ozel:
            continue
        if isinstance(deger, (types.ModuleType, types.FunctionType, type, types.BuiltinFunctionType)):
            continue
        r = repr(deger)
        if len(r) > 80:
            r = r[:77] + "..."
        sonuc.append([ad, r, type(deger).__name__])
    return sonuc

def _izle(cerceve, olay, arg):
    global _kesildi
    if cerceve.f_code.co_filename != "<izlenen>":
        return _izle
    if olay == "line":
        if len(_adimlar) >= ${EN_FAZLA_ADIM}:
            _kesildi = True
            raise KeyboardInterrupt()
        _adimlar.append({"satir": cerceve.f_lineno, "degiskenler": _gorunum(cerceve.f_globals), "cikti": _ekran.getvalue()})
    return _izle

_alan = {"__name__": "__main__", "input": _girdi, "print": _yaz}
_hata = None
try:
    _derlenmis = compile(_kod, "<izlenen>", "exec")
    sys.settrace(_izle)
    try:
        exec(_derlenmis, _alan)
    finally:
        sys.settrace(None)
except KeyboardInterrupt:
    pass
except BaseException as e:
    satir = None
    tb = e.__traceback__
    while tb is not None:
        if tb.tb_frame.f_code.co_filename == "<izlenen>":
            satir = tb.tb_lineno
        tb = tb.tb_next
    if isinstance(e, SyntaxError):
        satir = e.lineno
    _hata = {"mesaj": type(e).__name__ + ": " + str(e), "satir": satir}

_adimlar.append({"satir": None, "degiskenler": _gorunum(_alan), "cikti": _ekran.getvalue()})
builtins.print("${IMLEC}" + json.dumps({"adimlar": _adimlar, "hata": _hata, "kesildi": _kesildi}, ensure_ascii=False))
`;

export async function koduIzle(kod: string, girdiler: string[]): Promise<IzSonucu> {
  const program = `_KOD_JSON = ${JSON.stringify(JSON.stringify(kod))}\n_GIRDI_JSON = ${JSON.stringify(JSON.stringify(girdiler))}\n${IZLEYICI}`;
  const sonuc = await pythonCalistir(program, [], false);
  const i = sonuc.cikti.lastIndexOf(IMLEC);
  if (i < 0) {
    return { adimlar: [], hata: { mesaj: sonuc.hata?.mesaj ?? "Kod izlenemedi.", satir: null }, kesildi: false };
  }
  return JSON.parse(sonuc.cikti.slice(i + IMLEC.length).trim()) as IzSonucu;
}
