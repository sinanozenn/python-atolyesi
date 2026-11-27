// Derslere eklenen ayrıntılı anlatımlar ve kolaydan zora sıralanmış ek örnekler.
// Her dosya bir dersin slug'ına karşılık gelir; bloklar dersin "Kontrol noktası" kutusundan hemen önce gösterilir.
import type { Blok } from "../tipler";
import algoritma from "./algoritma";
import akisSemasi from "./akis-semasi";
import yazilim from "./yazilim-program-kod";
import operatorler from "./operatorler";
import degiskenler from "./degiskenler";
import veriTurleri from "./veri-turleri";
import veriKullanimi from "./veri-turlerinin-kullanimi";
import diziler from "./diziler";
import ifElse from "./if-else";
import elif from "./elif";
import forDongusu from "./for-dongusu";
import whileDongusu from "./while-dongusu";
import donguKarar from "./dongu-ve-karar";
import degerlendirme from "./unite-degerlendirme";

export const ekler: Record<string, Blok[]> = {
  algoritma,
  "akis-semasi": akisSemasi,
  "yazilim-program-kod": yazilim,
  operatorler,
  degiskenler,
  "veri-turleri": veriTurleri,
  "veri-turlerinin-kullanimi": veriKullanimi,
  diziler,
  "if-else": ifElse,
  elif,
  "for-dongusu": forDongusu,
  "while-dongusu": whileDongusu,
  "dongu-ve-karar": donguKarar,
  "unite-degerlendirme": degerlendirme,
};
