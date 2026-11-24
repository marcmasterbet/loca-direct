-- Vidéo et visite 3D des annonces (facultatives).
-- Uniquement des AJOUTS : aucune donnée existante n'est modifiée.
-- À exécuter une fois dans Supabase > SQL Editor.
alter table public.vitrines add column if not exists video_url text;
alter table public.vitrines add column if not exists visite_3d_url text;

-- Espace de stockage des vidéos envoyées par les propriétaires (100 Mo max, MP4/MOV/WEBM).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vitrines-videos', 'vitrines-videos', true, 104857600, array['video/mp4', 'video/quicktime', 'video/webm'])
on conflict (id) do nothing;
