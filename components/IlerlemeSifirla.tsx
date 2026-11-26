"use client";
import { ilerlemeyiSifirla } from "@/lib/depo";

export default function IlerlemeSifirla() {
  return (
    <button
      className="dugme dugme-sade"
      onClick={() => {
        if (confirm("Bu cihazdaki tüm ilerleme ve yazdığın kodlar silinsin mi?")) ilerlemeyiSifirla();
      }}
    >
      🗑️ Bu cihazdaki ilerlemeyi sıfırla
    </button>
  );
}
