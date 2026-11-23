import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Viewport } from "next";
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
      <head>
        {/* Google Analytics — dans le head pour validation Search Console */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q5WD3F2NJD"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q5WD3F2NJD');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <a href="#contenu" className="lien-evitement">
          Aller au contenu
        </a>
        <main className="flex-1">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
