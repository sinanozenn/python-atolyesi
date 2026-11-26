import Link from "next/link";
import { dersler } from "@/content";
import DersListesi from "@/components/DersListesi";
import KodCalistirici from "@/components/KodCalistirici";

export default function AnaSayfa() {
  return (
    <>
      <section className="kahraman">
        <div className="kap kahraman-ic">
          <div className="kahraman-metin">
            <h1>
              Programlamayı <span className="vurgu">Python</span> ile keşfet
            </h1>
            <p className="kahraman-alt">
              Daha önce hiç kod yazmadın mı? Sorun değil! Önce algoritma ve akış şemasıyla problem çözmeyi, sonra Python ile
              programlamayı adım adım, okuyarak değil <b>kod yazarak</b> öğren. Hiçbir şey kurmana gerek yok, Python doğrudan
              tarayıcında çalışır.
            </p>
            <div className="dugmeler">
              <Link href={`/dersler/${dersler[0].slug}`} className="dugme dugme-ana dugme-buyuk">
                🚀 İlk derse başla
              </Link>
              <Link href="/ide" className="dugme dugme-buyuk">
                🧑‍💻 IDE&apos;yi aç
              </Link>
            </div>
          </div>
          <div className="kahraman-kod">
            <KodCalistirici kod={`ad = input("Adın ne? ")\nfor i in range(3):\n    print("Merhaba", ad, "🎉")`} girdiler={["Deniz"]} baslik="Hemen dene!" />
          </div>
        </div>
      </section>

      <section className="kap ozellikler">
        <div className="ozellik">
          <div className="ozellik-simge">⚡</div>
          <h3>Anında dene</h3>
          <p>Her örneği değiştirip çalıştırabilirsin. Kırmaktan korkma, “Sıfırla” her zaman orada.</p>
        </div>
        <div className="ozellik">
          <div className="ozellik-simge">🔷</div>
          <h3>Akış şemaları</h3>
          <p>Algoritmanı şekillerle çiz, Akış Şeması Aracı&apos;nda çalıştır ve her adımı izle.</p>
        </div>
        <div className="ozellik">
          <div className="ozellik-simge">🇹🇷</div>
          <h3>Türkçe hata açıklamaları</h3>
          <p>Python&apos;un İngilizce hata mesajlarını senin için anlaşılır Türkçeye çeviriyoruz.</p>
        </div>
      </section>

      <section className="kap">
        <h2 className="bolum-basligi">Dersler</h2>
        <DersListesi />
      </section>
    </>
  );
}
