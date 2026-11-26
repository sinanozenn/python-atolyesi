import DersListesi from "@/components/DersListesi";

export const metadata = { title: "Dersler" };

export default function DerslerSayfasi() {
  return (
    <div className="kap sayfa">
      <h1>Dersler</h1>
      <p className="sayfa-alt">Dersleri sırayla takip etmeni öneririz; her ders bir öncekinin üzerine kurulur.</p>
      <DersListesi />
    </div>
  );
}
