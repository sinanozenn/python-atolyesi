"use client";
import { useRouter } from "next/navigation";
import { sema, type Parca } from "@/content/sema";
import { akisOrnegi } from "@/content/akis-ornekleri";

const ACILACAK = "atolye-akis-acilacak";

export default function SemaBlok({ ornek, parcalar, baslik, altyazi }: { ornek?: string; parcalar?: Parca[]; baslik?: string; altyazi?: string }) {
  const router = useRouter();
  const o = ornek ? akisOrnegi(ornek) : null;
  const svg = sema(baslik ?? o?.ad ?? "Akış şeması", o ? o.parcalar : parcalar ?? []);
  return (
    <figure className="sema">
      {(baslik ?? o?.ad) && <div className="sema-baslik">{baslik ?? o?.ad}</div>}
      <div className="sema-cizim" dangerouslySetInnerHTML={{ __html: svg }} />
      {(altyazi || o) && (
        <figcaption>
          {altyazi ?? o?.aciklama}
          {o && (
            <button
              className="dugme sema-ac"
              onClick={() => {
                try {
                  localStorage.setItem(ACILACAK, o.id);
                } catch {}
                router.push("/akis");
              }}
            >
              Akış şeması aracında aç ve çalıştır
            </button>
          )}
        </figcaption>
      )}
    </figure>
  );
}
