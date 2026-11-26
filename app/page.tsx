import Link from "next/link";
import Harita from "@/components/Harita";
import KodCalistirici from "@/components/KodCalistirici";
import Yilan from "@/components/Yilan";
import DevamDugmesi from "@/components/DevamDugmesi";

export default function AnaSayfa() {
  return (
    <>
      <section className="giris">
        <div className="kap giris-ic">
          <div className="giris-metin">
            <p className="ust-etiket">3. ünite, 12 seviye</p>
            <h1>Yılanı besle, Python'u öğren.</h1>
            <p>
              Her ders bir seviye. Görevleri çözdükçe puan toplar, yıldız kazanırsın; puanın arttıkça yılan da uzar. Takıldığın
              seviyeye istediğin zaman geri dönebilirsin. Kurulum yok, kodların bu sayfada çalışır.
            </p>
            <div className="dugmeler">
              <DevamDugmesi />
              <Link href="/ide" className="dugme dugme-buyuk">
                Serbest mod (IDE)
              </Link>
            </div>
          </div>
          <div className="kart giris-kod">
            <Yilan />
            <KodCalistirici kod={`puan = 0\nfor elma in range(3):\n    puan = puan + 10\nprint("Puan:", puan)`} />
          </div>
        </div>
      </section>

      <section className="kap harita-bolum">
        <h2 className="piksel-baslik">Harita</h2>
        <p className="bolum-alt">Seviyeler kitaptaki sırayı izler. Hepsi açık; istediğinden başlayabilirsin.</p>
        <Harita />
      </section>
    </>
  );
}
