import type { Metadata } from "next";
import "./globals.css";
import UstMenu from "@/components/UstMenu";

export const metadata: Metadata = {
  title: { default: "Python Atölyesi", template: "%s · Python Atölyesi" },
  description: "Lise hazırlık sınıfları için tarayıcıda çalışan, Türkçe, etkileşimli Python dersleri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <UstMenu />
        <main>{children}</main>
        <footer className="alt-bilgi">
          <div className="kap">
            🐍 Python Atölyesi · Kodlar tamamen senin tarayıcında çalışır; hiçbir kişisel veri toplanmaz.
          </div>
        </footer>
      </body>
    </html>
  );
}
