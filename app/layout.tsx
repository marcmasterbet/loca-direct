import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.loca-direct.fr"),
  title: {
    default: "LocaDirect — Location directe sans commission",
    template: "%s | LocaDirect",
  },
  description:
    "Louez ou trouvez un logement directement entre particuliers, sans commission. Contact direct par WhatsApp. Annuaire gratuit de prestataires (conciergerie, ménage, photographe).",
  keywords: [
    "location directe",
    "location sans commission",
    "alternative Airbnb",
    "location particulier à particulier",
    "conciergerie",
    "location saisonnière",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "LocaDirect",
    title: "LocaDirect — Location directe sans commission",
    description:
      "Louez ou trouvez un logement directement entre particuliers, sans commission. Contact direct par WhatsApp.",
    url: "https://www.loca-direct.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocaDirect — Location directe sans commission",
    description:
      "Louez ou trouvez un logement directement entre particuliers, sans commission.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q5WD3F2NJD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q5WD3F2NJD');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
              <a href="/mentions-legales" className="hover:text-orange-600 transition">Mentions légales</a>
              <a href="/cgu" className="hover:text-orange-600 transition">CGU</a>
              <a href="/politique-confidentialite" className="hover:text-orange-600 transition">Confidentialité</a>
              <a href="/cookies" className="hover:text-orange-600 transition">Cookies</a>
            </div>

            <p className="text-center text-xs text-gray-500">© 2026 LocaDirect - Tous droits réservés</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
