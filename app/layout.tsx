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
    default: "Location vacances entre particuliers | LocaDirect",
    template: "%s | LocaDirect",
  },
  description:
    "Louez ou trouvez un logement directement entre particuliers, sans commission. Contact direct par WhatsApp. Annuaire gratuit de prestataires (conciergerie, ménage, photographe).",
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
        <main className="flex-1">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
