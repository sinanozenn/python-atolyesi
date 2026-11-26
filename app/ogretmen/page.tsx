import Link from "next/link";
import { dersler, alistirmalar } from "@/content";

export const metadata = { title: "Öğretmenler İçin" };

export default function OgretmenSayfasi() {
  return (
    <div className="kap sayfa okunur">
      <h1>Öğretmenler için</h1>
      <p className="sayfa-alt">Site, <b>Programlamaya Giriş ve Algoritma</b> ders kitabının <b>3. Ünitesi (Programlamanın Temel Kavramları)</b> sırasını izler. Kitaptaki örnekler, uygulamalar, etkinlikler ve ölçme soruları siteye çalıştırılabilir hâlde aktarılmıştır. Hem sınıfta öğretmen eşliğinde hem de öğrencilerin evde kendi başlarına çalışması için tasarlandı.</p>

      <h2>Kitapla ilgili düzeltme notları</h2>
      <ul>
        <li><b>Üs alma:</b> Kitap “** veya ^” der; Python'da üs alma yalnızca <code>**</code> ile yapılır. <code>^</code> Python'da Özel Veya (XOR) işlemidir (<code>10^5</code> → 15).</li>
        <li><b>3. Örnek (mantıksal operatörler):</b> <code>print(a==10 ^ b&gt;20)</code> Python'da beklenen sonucu vermez; sitede <code>(a==10) ^ (b&gt;20)</code> şeklinde parantezli yazıldı.</li>
        <li><b>Değişken isimleri:</b> Kitap <code>$</code> ile başlayabileceğini söyler; Python'da <code>$</code> kullanılamaz.</li>
        <li><b>Ölçme 2. soru:</b> <code>a=5,b=10</code> Python'da hata verir; sitede iki ayrı satır olarak verildi (cevap değişmez: Ayşe 55.0).</li>
        <li><b>9. ve 10. Örnek:</b> <code>,+(sayi/10)</code> yazımı <code>, sayi / 10</code> olarak sadeleştirildi.</li>
      </ul>

      <h2>Sınıfta kullanım</h2>
      <ul>
        <li><b>Öğretmen notları:</b> Her dersin başında katlanmış bir “Öğretmen notu” kutusu var. Isınma soruları, vurgulanacak noktalar ve sık yapılan hatalar orada.</li>
        <li><b>“Düşün bakalım” soruları:</b> Önce sınıfa tahmin ettirin, sonra cevabı birlikte işaretleyin. Kodu çalıştırmadan önce tahmin yaptırmak kalıcı öğrenmeyi artırır.</li>
        <li><b>Örnekleri canlı değiştirin:</b> Her örnek düzenlenebilir. “Şu sayıyı değiştirirsek ne olur?” sorusu en iyi öğretim aracınız.</li>
      </ul>

      <h2>Öğrencilerin kendi başına çalışması</h2>
      <ul>
        <li>Öğrencinin ilerlemesi ve yazdığı kodlar <b>kendi tarayıcısında</b> saklanır. Hesap açmak gerekmez, kişisel veri toplanmaz.</li>
        <li>Alıştırmalarda kademeli <b>ipuçları</b> var. <b>Çözüm</b> düğmesi ancak iki deneme yapıldıktan sonra görünür.</li>
        <li>Farklı bir cihaza geçen öğrencinin ilerlemesi taşınmaz (ileride hesap sistemiyle eklenebilir).</li>
      </ul>

      <h2>Önerilen ders planı</h2>
      <table>
        <thead>
          <tr><th>Ders</th><th>Kitap</th><th>Süre</th><th>Alıştırmalar</th></tr>
        </thead>
        <tbody>
          {dersler.map((d) => (
            <tr key={d.slug}>
              <td><Link href={`/dersler/${d.slug}`}>{d.sira}. {d.baslik}</Link></td>
              <td>{d.kitap}</td>
              <td>{d.sure}</td>
              <td>{alistirmalar(d).map((a) => a.baslik).join(" · ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Bilinen sınırlamalar</h2>
      <ul>
        <li>Python ilk açılışta yaklaşık 10 MB indirir; sonraki açılışlarda tarayıcı önbelleğinden hızlıca yüklenir. Okul ağı yavaşsa dersten önce sayfayı bir kez açmak iyi olur.</li>
        <li><code>input()</code> değerleri programdan önce “Girdiler” kutusuna yazılır (terminaldeki gibi anlık sorulmaz).</li>
        <li>5 saniyeden uzun süren programlar (ör. sonsuz döngüler) otomatik durdurulur.</li>
      </ul>
    </div>
  );
}
