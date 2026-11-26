import DersListesi from "@/components/DersListesi";
import IlerlemeSifirla from "@/components/IlerlemeSifirla";

export const metadata = { title: "Dersler" };

export default function DerslerSayfasi() {
  return (
    <div className="kap sayfa">
      <h1>İçindekiler</h1>
      <p className="sayfa-alt">
        Dersleri sırayla takip et; her ders bir öncekinin üzerine kurulur. Kutucuklar alıştırmaları gösterir ve ilerlemen bu
        cihazda saklanır.
      </p>
      <DersListesi />
      <div className="sayfa-son">
        <IlerlemeSifirla />
      </div>
    </div>
  );
}
