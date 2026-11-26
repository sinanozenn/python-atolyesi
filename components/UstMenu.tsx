"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const baglantilar = [
  { href: "/dersler", ad: "Dersler" },
  { href: "/ide", ad: "IDE" },
  { href: "/ogretmen", ad: "Öğretmenler için" },
];

export default function UstMenu() {
  const yol = usePathname();

  return (
    <header className="ust-menu">
      <div className="kap ust-menu-ic">
        <Link href="/" className="logo">
          <span className="logo-kod">&gt;&gt;&gt;</span> Python Atölyesi
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
