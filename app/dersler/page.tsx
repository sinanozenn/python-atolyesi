import DersListesi from "@/components/DersListesi";

export const metadata = { title: "Dersler" };

export default function DerslerSayfasi() {
  return (
    <div className="kap sayfa">
      <h1>Dersler</h1>
      <p className="sayfa-alt">Önce algoritma ve akış şemasıyla problem çözmeyi öğren, sonra Python ile programlamaya geç. Her ders bir öncekinin üzerine kurulur.</p>
      <DersListesi />
    </div>
  );
}
