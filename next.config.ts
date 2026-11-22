import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Photos servies par Supabase Storage (annonces) et Unsplash (guide), optimisées par next/image.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Anciennes adresses : redirection permanente vers les pages actuelles,
  // pour qu'aucun lien enregistré ou partagé ne soit cassé.
  async redirects() {
    return [
      { source: '/ma-vitrine', destination: '/espace/ma-vitrine', permanent: true },
      { source: '/ma-vitrine/:id/modifier', destination: '/espace/ma-vitrine/:id/modifier', permanent: true },
      { source: '/api/devenir-prestataire/:id/modifier', destination: '/espace/devenir-prestataire/:id/modifier', permanent: true },
    ]
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
