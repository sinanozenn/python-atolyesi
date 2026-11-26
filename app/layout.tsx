import type { Metadata } from "next";
import "@fontsource/atkinson-hyperlegible-next/400.css";
import "@fontsource/atkinson-hyperlegible-next/400-italic.css";
import "@fontsource/atkinson-hyperlegible-next/700.css";
import "@fontsource/atkinson-hyperlegible-next/800.css";
import "@fontsource/atkinson-hyperlegible-mono/400.css";
import "@fontsource/atkinson-hyperlegible-mono/700.css";
import "@fontsource/caveat/600.css";
import "./globals.css";
import UstMenu from "@/components/UstMenu";

export const metadata: Metadata = {
  title: { default: "Python Atölyesi", template: "%s – Python Atölyesi" },
  description: "Programlamaya Giriş ve Algoritma dersi 3. ünite: tarayıcıda çalışan, Türkçe, etkileşimli Python dersleri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <UstMenu />
        <main>{children}</main>
        <footer className="alt-bilgi">
          <div className="kap">
            Python Atölyesi. Kodlar senin tarayıcında çalışır; ilerlemen yalnızca bu cihazda saklanır.
          </div>
        </footer>
      </body>
    </html>
  );
}
