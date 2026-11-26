import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
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
            Python Atölyesi. Kodlar senin tarayıcında çalışır.
          </div>
        </footer>
      </body>
    </html>
  );
}
