import Link from "next/link";
import { dersler } from "@/content";
import DersListesi from "@/components/DersListesi";
import KodCalistirici from "@/components/KodCalistirici";

export default function AnaSayfa() {
  return (
    <>
      <section className="kap giris">
        <div className="giris-metin">
          <h1>Python ile programlamaya giriş</h1>
          <p>
            <i>Programlamaya Giriş ve Algoritma</i> dersinin 3. ünitesi: operatörler, değişkenler, veri türleri, karar yapıları ve
            döngüler. Her dersteki kodları bu sayfada çalıştırabilir, değiştirebilir ve alıştırmalarla pekiştirebilirsin.
          </p>
          <div className="dugmeler">
            <Link href={`/dersler/${dersler[0].slug}`} className="dugme dugme-ana">
              Derslere başla
            </Link>
            <Link href="/ide" className="dugme">
              IDE'yi aç
            </Link>
          </div>
        </div>
        <div className="giris-kod">
          <KodCalistirici kod={`ad = input("Adın ne? ")\nprint("Merhaba", ad)`} girdiler={["Deniz"]} />
        </div>
      </section>

      <section className="kap liste-bolum">
        <h2>Dersler</h2>
        <DersListesi />
      </section>
    </>
  );
}
