import Link from "next/link";
import { dersler } from "@/content";
import DersListesi from "@/components/DersListesi";
import KodCalistirici from "@/components/KodCalistirici";

export default function AnaSayfa() {
  return (
    <>
      <section className="giris">
        <div className="kap giris-ic">
          <div className="giris-metin">
            <h1>Python'u kod yazarak öğren.</h1>
            <p>
              <i>Programlamaya Giriş ve Algoritma</i> dersinin 3. ünitesi: operatörler, değişkenler, veri türleri, karar
              yapıları ve döngüler. Daha önce hiç kod yazmadıysan buradan başla. Kurulum yok; yazdığın her kod bu sayfada
              çalışır.
            </p>
            <div className="dugmeler">
              <Link href={`/dersler/${dersler[0].slug}`} className="dugme dugme-ana dugme-buyuk">
                İlk derse başla
              </Link>
              <Link href="/ide" className="dugme dugme-buyuk">
                IDE'yi aç
              </Link>
            </div>
          </div>
          <div className="giris-kod">
            <p className="el-yazisi giris-not">Değiştir, sonra çalıştır:</p>
            <KodCalistirici kod={`ad = input("Adın ne? ")\nfor i in range(3):\n    print("Merhaba", ad)`} girdiler={["Deniz"]} />
          </div>
        </div>
      </section>

      <section className="kap icindekiler-bolum">
        <h2>İçindekiler</h2>
        <p className="bolum-alt">
          Dersler kitaptaki sırayı izler. Kutucuklar alıştırmaları gösterir; çözdükçe dolar.
        </p>
        <DersListesi />
      </section>
    </>
  );
}
