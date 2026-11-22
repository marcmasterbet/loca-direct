# LocaDirect — loca-direct.fr

Location de vacances entre particuliers, sans commission, avec contact direct par WhatsApp, et annuaire de prestataires pour les propriétaires (conciergerie, ménage, photographe…).

## Pile technique

- Next.js 16 (App Router), React 19, TypeScript, Tailwind 4
- Supabase (base de données et stockage des photos)
- Resend (e-mails)
- Hébergement Vercel, Google Analytics 4

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:3000.

## Variables d'environnement

À définir dans `.env.local` en local, et dans les réglages du projet Vercel en production :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Adresse du projet Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé serveur Supabase (ne jamais l'exposer côté navigateur) |
| `SESSION_SECRET` | Clé de signature des sessions, 64 caractères aléatoires ou plus. Ne pas la changer : tous les utilisateurs seraient déconnectés. |
| `ADMIN_PASSWORD` | Mot de passe du panneau d'administration |
| `RESEND_API_KEY` | Envoi des e-mails |
| `NEXT_PUBLIC_APP_URL` | Adresse publique du site |

## Organisation

| Dossier | Contenu |
| --- | --- |
| `app/` | Pages et routes d'API |
| `app/blog/` | Articles du guide (un dossier par article) |
| `app/admin/` | Panneau d'administration |
| `app/espace/` | Espace des propriétaires et des prestataires |
| `lib/articles.ts` | Liste des articles (page /blog et sitemap) |
| `lib/seo.ts` | Règles d'indexation (seuils des pages régions et villes) |
| `lib/session.ts` | Sessions signées |
| `supabase/` | Scripts SQL ponctuels, toujours avec une étape d'aperçu |

## Règles

- Ne jamais supprimer ni renommer une table ou une colonne Supabase : on ajoute seulement.
- Toute page qui change d'adresse garde une redirection permanente dans `next.config.ts`.
- Pour publier un article : créer `app/blog/<slug>/page.tsx` et l'ajouter dans `lib/articles.ts`.
