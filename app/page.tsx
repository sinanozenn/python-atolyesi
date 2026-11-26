import Link from "next/link";
import { dersler } from "@/content";
import DersListesi from "@/components/DersListesi";
import KodCalistirici from "@/components/KodCalistirici";

export default function AnaSayfa() {
  return (
    <>
      <div className="giris-bant">
      <section className="kap giris">
        <div className="giris-metin">
          <h1>Python ile programlamaya giriş</h1>
          <p>
            Önce algoritma ve akış şemasıyla problem çözmeyi, sonra <i>Programlamaya Giriş ve Algoritma</i> dersinin 3. ünitesini
            öğren: operatörler, değişkenler, veri türleri, karar yapıları ve döngüler. Kodları ve akış şemalarını bu sayfada
            çalıştırabilirsin.
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
      </div>

      <section className="kap liste-bolum">
        <h2>Dersler</h2>
        <DersListesi />
      </section>
    </>
  );
}
