"use client";
import { ilerlemeyiSifirla } from "@/lib/depo";

export default function IlerlemeSifirla() {
  return (
    <button
      className="dugme dugme-sade"
      onClick={() => {
        if (confirm("Bu cihazdaki puanların, yıldızların ve yazdığın kodlar silinsin mi?")) ilerlemeyiSifirla();
      }}
    >
      Puanları ve ilerlemeyi sıfırla
    </button>
  );
}
