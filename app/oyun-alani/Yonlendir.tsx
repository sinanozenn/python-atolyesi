"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Yonlendir() {
  const router = useRouter();
  useEffect(() => router.replace("/ide"), [router]);
  return (
    <div className="kap sayfa">
      Oyun Alanı artık <Link href="/ide">IDE</Link> sayfasında.
    </div>
  );
}
