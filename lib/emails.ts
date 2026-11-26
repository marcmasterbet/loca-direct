// Mise en page commune des e-mails LocaDirect (couleurs du site, lisible sur téléphone)

export const EXPEDITEUR = 'LocaDirect <bienvenue@loca-direct.fr>'
export const REPONDRE_A = 'contact@seokraft.fr'
const SITE = process.env.NEXT_PUBLIC_APP_URL || 'https://www.loca-direct.fr'

const echapper = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function bouton(href: string, texte: string) {
  return `<a href="${href}" style="display:inline-block;background:#5534E8;color:#ffffff;padding:14px 26px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;margin:8px 0;">${echapper(texte)}</a>`
}

export function gabarit(contenu: string) {
  return `<!DOCTYPE html><html lang="fr"><body style="margin:0;background:#F4F3FB;">
  <div style="font-family:-apple-system,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;padding:32px 20px;color:#17162A;">
    <p style="margin:0 0 24px;font-size:20px;font-weight:700;"><span style="display:inline-block;background:#5534E8;color:#fff;border-radius:8px;padding:2px 9px;margin-right:6px;">L</span>locadirect</p>
    <div style="background:#ffffff;border-radius:18px;padding:28px 24px;border:1px solid #E4E3EE;font-size:16px;line-height:1.6;">${contenu}</div>
    <p style="font-size:13px;color:#6B6A80;line-height:1.5;margin:20px 4px 0;">LocaDirect, la location de vacances en direct entre particuliers, sans commission.<br><a href="${SITE}" style="color:#3F22C9;">loca-direct.fr</a></p>
  </div></body></html>`
}

type Profil = { est_hebergeur?: boolean; est_prestataire?: boolean }

/** E-mail de bienvenue, envoyé une fois l'adresse confirmée : la marche à suivre selon le profil */
export function emailBienvenue(u: Profil): { subject: string; html: string } {
  const etapesLogement = `
    <p style="margin:20px 0 8px;font-weight:700;">Publier votre logement, en 3 étapes</p>
    <ol style="margin:0;padding-left:20px;">
      <li style="margin-bottom:6px;"><strong>Décrivez-le</strong> : type, couchages, prix, équipements. Comptez une dizaine de minutes.</li>
      <li style="margin-bottom:6px;"><strong>Ajoutez de belles photos</strong> : lumineuses, prises à l’horizontale, une par pièce. Une vidéo ou une visite 3D est un plus.</li>
      <li style="margin-bottom:6px;"><strong>Indiquez votre WhatsApp</strong> : les voyageurs vous écrivent directement. Votre numéro n’est pas écrit dans la page : il s’affiche seulement à la demande d’un voyageur.</li>
    </ol>
    <p style="margin:16px 0;">Votre annonce est relue puis mise en ligne sous 24 à 48&nbsp;heures.</p>
    ${bouton(`${SITE}/espace/ma-vitrine`, 'Publier mon logement')}
    <p style="margin:16px 0 0;font-size:15px;color:#55536B;">🐕 Vous acceptez les chiens de plus de 10&nbsp;kg&nbsp;? Cochez-le : votre logement apparaîtra aussi dans la rubrique Chien accepté, très recherchée.</p>`

  const etapesPresta = `
    <p style="margin:20px 0 8px;font-weight:700;">Créer votre fiche dans l’annuaire</p>
    <ol style="margin:0;padding-left:20px;">
      <li style="margin-bottom:6px;"><strong>Votre métier et votre zone</strong> : votre fiche apparaîtra sur les pages de votre ville et de votre région.</li>
      <li style="margin-bottom:6px;"><strong>Vos tarifs ou « sur devis »</strong>, et une présentation de vos services.</li>
      <li style="margin-bottom:6px;"><strong>Des photos de vos réalisations</strong> et votre logo : une fiche illustrée inspire confiance.</li>
    </ol>
    <p style="margin:16px 0;">L’inscription dans l’annuaire est gratuite.</p>
    ${bouton(`${SITE}/espace/devenir-prestataire`, 'Créer ma fiche')}`

  const corps =
    (u.est_hebergeur ? etapesLogement : '') +
    (u.est_prestataire ? etapesPresta : '') +
    (!u.est_hebergeur && !u.est_prestataire ? `<p>Retrouvez vos logements favoris et vos alertes dans votre espace.</p>${bouton(`${SITE}/espace`, 'Mon espace')}` : '')

  return {
    subject: u.est_prestataire && !u.est_hebergeur ? 'Bienvenue sur LocaDirect : créez votre fiche' : 'Bienvenue sur LocaDirect : publiez votre logement',
    html: gabarit(`
      <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Bienvenue sur LocaDirect&nbsp;!</p>
      <p style="margin:0;">Votre compte est activé. Ici, pas de commission : les voyageurs et les propriétaires échangent en direct.</p>
      ${corps}
      <p style="margin:24px 0 0;">Une question, un souci pour publier&nbsp;? <strong>Répondez simplement à cet e-mail</strong>, je vous aide personnellement.</p>
      <p style="margin:12px 0 0;">Marc, fondateur de LocaDirect</p>`),
  }
}

function partage(url: string, texte: string) {
  const lien = (href: string, label: string) =>
    `<a href="${href}" style="display:inline-block;color:#3F22C9;font-weight:600;text-decoration:underline;margin-right:16px;">${label}</a>`
  return `<p style="margin:16px 0 0;font-size:15px;">Partagez-la pour gagner en visibilité&nbsp;: ${lien(`https://wa.me/?text=${encodeURIComponent(`${texte} ${url}`)}`, 'WhatsApp')}${lien(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'Facebook')}</p>`
}

/** Annonce de logement mise en ligne */
export function emailAnnonceEnLigne(v: { id: string; titre?: string | null; ville?: string | null }) {
  const titre = (v.titre || 'Votre logement').trim()
  const url = `${SITE}/vitrine/${encodeURIComponent(v.id)}`
  return {
    subject: `Votre annonce « ${titre.replace(/[\r\n]/g, ' ').slice(0, 120)} » est en ligne`,
    html: gabarit(`
      <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Votre annonce est en ligne 🎉</p>
      <p style="margin:0 0 16px;">Bonne nouvelle&nbsp;: votre annonce <strong>${echapper(titre)}</strong>${v.ville ? ` à ${echapper(v.ville)}` : ''} a été relue et elle est maintenant visible par tous les voyageurs, sur la carte et dans les pages de sa région.</p>
      ${bouton(url, 'Voir mon annonce')}
      ${partage(url, `Mon logement « ${titre} » sur LocaDirect :`)}
      <p style="margin:20px 0 0;font-size:15px;color:#55536B;">Les voyageurs vous écrivent directement sur WhatsApp. Pensez à garder vos disponibilités et vos prix à jour depuis votre espace.</p>
      <p style="margin:20px 0 0;">Une question&nbsp;? Répondez simplement à cet e-mail.<br>Marc, fondateur de LocaDirect</p>`),
  }
}

/** Fiche prestataire mise en ligne */
export function emailFicheEnLigne(p: { id: string; prenom?: string | null; nom?: string | null; activite?: string | null }) {
  const nom = [p.prenom, p.nom].filter(Boolean).join(' ').trim() || 'Votre fiche'
  const url = `${SITE}/prestataires/${encodeURIComponent(p.id)}`
  return {
    subject: 'Votre fiche est en ligne dans l’annuaire LocaDirect',
    html: gabarit(`
      <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Votre fiche est en ligne 🎉</p>
      <p style="margin:0 0 16px;">Bonne nouvelle&nbsp;: la fiche <strong>${echapper(nom)}</strong>${p.activite ? ` (${echapper(p.activite)})` : ''} a été relue et figure maintenant dans l’annuaire LocaDirect, sur les pages de votre métier, de votre ville et de votre région.</p>
      ${bouton(url, 'Voir ma fiche')}
      ${partage(url, `Retrouvez-moi sur LocaDirect :`)}
      <p style="margin:20px 0 0;font-size:15px;color:#55536B;">Astuce référencement&nbsp;: ajoutez un lien vers votre fiche sur votre site ou vos réseaux. Plus elle est citée, mieux elle est trouvée sur Google.</p>
      <p style="margin:20px 0 0;">Une question&nbsp;? Répondez simplement à cet e-mail.<br>Marc, fondateur de LocaDirect</p>`),
  }
}

/** Annonce ou fiche à corriger, avec le motif écrit par l'administrateur */
export function emailACorriger(quoi: 'annonce' | 'fiche', nom: string, motif: string, lienModifier: string) {
  return {
    subject: quoi === 'annonce' ? 'Votre annonce LocaDirect est à corriger' : 'Votre fiche LocaDirect est à corriger',
    html: gabarit(`
      <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Encore un petit effort</p>
      <p style="margin:0 0 16px;">${quoi === 'annonce' ? 'Votre annonce' : 'Votre fiche'} <strong>${echapper(nom)}</strong> ne peut pas encore être mise en ligne. Voici ce qu’il faut corriger&nbsp;:</p>
      <p style="margin:0 0 16px;padding:14px 16px;background:#FFF4D6;border-radius:12px;">${echapper(motif)}</p>
      ${bouton(lienModifier, quoi === 'annonce' ? 'Modifier mon annonce' : 'Modifier ma fiche')}
      <p style="margin:20px 0 0;">Une fois corrigée, nous la relisons de nouveau. Une question&nbsp;? Répondez simplement à cet e-mail.<br>Marc, fondateur de LocaDirect</p>`),
  }
}
