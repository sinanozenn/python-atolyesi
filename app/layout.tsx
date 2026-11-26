import type { Metadata } from "next";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/400-italic.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import UstMenu from "@/components/UstMenu";

export const metadata: Metadata = {
  title: { default: "Python Atölyesi", template: "%s – Python Atölyesi" },
  description: "Algoritma, akış şeması ve Python: tarayıcıda çalışan, Türkçe, etkileşimli programlama dersleri.",
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
