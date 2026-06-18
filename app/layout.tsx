import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "LocaDirect",
  description: "Location directe entre voyageurs et hébergeurs sans commission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white">
        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
              <a
                href="/mentions-legales"
                className="hover:text-orange-600 transition"
              >
                Mentions légales
              </a>

              <a
                href="/cgu"
                className="hover:text-orange-600 transition"
              >
                CGU
              </a>

              <a
                href="/confidentialite"
                className="hover:text-orange-600 transition"
              >
                Confidentialité
              </a>

              <a
                href="/cookies"
                className="hover:text-orange-600 transition"
              >
                Cookies
              </a>
            </div>

            <p className="text-center text-xs text-gray-500">
              © 2026 LocaDirect - Tous droits réservés
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}