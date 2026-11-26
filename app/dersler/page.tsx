import Harita from "@/components/Harita";
import IlerlemeSifirla from "@/components/IlerlemeSifirla";

export const metadata = { title: "Harita" };

export default function HaritaSayfasi() {
  return (
    <div className="kap sayfa">
      <h1 className="piksel-baslik">Harita</h1>
      <p className="sayfa-alt">
        Her ders bir seviye. Görev başına 20, ilk denemede doğru bildiğin soru başına 5 puan kazanırsın. Puanın ve yıldızların bu
        cihazda saklanır.
      </p>
      <Harita />
      <div className="sayfa-son">
        <IlerlemeSifirla />
      </div>
    </div>
  );
}
