-- Vidéo et visite 3D des annonces (facultatives).
-- Uniquement des AJOUTS : aucune donnée existante n'est modifiée.
-- À exécuter une fois dans Supabase > SQL Editor.
alter table public.vitrines add column if not exists video_url text;
alter table public.vitrines add column if not exists visite_3d_url text;
