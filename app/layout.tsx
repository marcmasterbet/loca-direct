import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Viewport } from "next";
import BandeauCookies from "@/components/site/BandeauCookies";
import SiteFooter from "@/components/site/SiteFooter";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5534e8",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.loca-direct.fr"),
  title: {
    default: "Location vacances entre particuliers sans commission",
    template: "%s | LocaDirect",
  },
  description:
    "Maisons, appartements et gîtes en France, loués par leurs propriétaires. Chien accepté. Écrivez directement sur WhatsApp, sans commission ni frais.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "LocaDirect",
    title: "Location vacances entre particuliers sans commission",
    description:
      "Maisons, appartements et gîtes en France, loués par leurs propriétaires. Chien accepté. Écrivez directement sur WhatsApp, sans commission ni frais.",
    url: "https://www.loca-direct.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Location vacances entre particuliers sans commission",
    description:
      "Maisons, appartements et gîtes en France, loués par leurs propriétaires. Chien accepté. Écrivez directement sur WhatsApp, sans commission ni frais.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'LSycZNSAAZpW2aR1hGhZhbcjRplhAoorX5M',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-white">
        <a href="#contenu" className="lien-evitement">
          Aller au contenu
        </a>
        <div className="flex-1">{children}</div>

        <SiteFooter />
        <BandeauCookies />
      </body>
    </html>
  );
}
