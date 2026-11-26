"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const baglantilar = [
  { href: "/dersler", ad: "Dersler" },
  { href: "/akis", ad: "🔷 Akış Şeması Aracı" },
  { href: "/ide", ad: "🧑‍💻 IDE" },
];

export default function UstMenu() {
  const yol = usePathname();
  return (
    <header className="ust-menu">
      <div className="kap ust-menu-ic">
        <Link href="/" className="logo">
          <span className="logo-simge">🐍</span> Programlama Temelleri (Python)
        </Link>
        <nav>
          {baglantilar.map((b) => (
            <Link key={b.href} href={b.href} className={yol.startsWith(b.href) ? "aktif" : ""} aria-current={yol.startsWith(b.href) ? "page" : undefined}>
              {b.ad}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
