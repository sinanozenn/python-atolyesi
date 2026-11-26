import type { Metadata } from "next";
import "./globals.css";
import UstMenu from "@/components/UstMenu";

export const metadata: Metadata = {
  title: { default: "Programlama Temelleri (Python)", template: "%s · Programlama Temelleri (Python)" },
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
            🐍 Programlama Temelleri (Python) · Kodlar tamamen senin tarayıcında çalışır; hiçbir kişisel veri toplanmaz.
          </div>
        </footer>
      </body>
    </html>
  );
}
