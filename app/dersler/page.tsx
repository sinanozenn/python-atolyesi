import DersListesi from "@/components/DersListesi";
import IlerlemeSifirla from "@/components/IlerlemeSifirla";

export const metadata = { title: "Dersler" };

export default function DerslerSayfasi() {
  return (
    <div className="kap sayfa">
      <h1>Dersler</h1>
      <p className="sayfa-alt">Dersleri sırayla takip etmeni öneririz; her ders bir öncekinin üzerine kurulur. İlerlemen bu cihazda otomatik kaydedilir.</p>
      <DersListesi />
      <div style={{ marginTop: "2rem" }}>
        <IlerlemeSifirla />
      </div>
    </div>
  );
}
