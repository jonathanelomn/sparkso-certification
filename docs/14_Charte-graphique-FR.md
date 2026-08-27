# Charte graphique — Sparkso Certification

L'identité visuelle du produit et le raisonnement derrière. Décision du
27 août 2026 : le vérifieur reprend **à l'identique** le langage
d'écran de Sparkso Universités (sa charte de référence vit dans le
dépôt sparkso-universites, `docs/charte-graphique.md`) — couleurs
**et** grammaire. Cette décision révoque la règle antérieure « chaque
produit sa propre identité » (22-24 août) : la page de vérification est
ouverte depuis la plateforme, et le même langage d'un écran à l'autre
est un gage de confiance pour le public.

Ce que la décision du 22 août avait établi demeure : **thème unique
clair**, lisible en plein soleil sur téléphone, registre du document
officiel.

## 1. Les quatre familles (reprises de la plateforme)

| Famille | Rôle | Sur le vérifieur |
|---|---|---|
| **encre** (bleu nuit) | la structure | titres implicites, onglet actif, bouton « Vérifier », liens |
| **canard** | l'accent, 10 % de surface au maximum | le cadre de dépôt du témoin (action phare) et le logo |
| **parchemin** (neutres chauds) | fonds, bordures, textes secondaires | fond `#FAF9F7`, cartes blanches, notes |
| **sauge / ambre / terre** | les états | conforme ancré · en attente · non conforme |

Les valeurs exactes (gammes 50 à 950) sont recopiées dans le bloc
`:root` des deux pages du vérifieur — la plateforme les définit dans
son `tailwind.config.ts`, qui fait foi. Les « voyants » saturés
(vert/orange/rouge) ne servent que pour les points de pastille des
badges, jamais en fond ni en texte.

## 2. Les verdicts

Format « bandeau » de la plateforme : rayon 16 px, bord teinte 100,
fond teinte 50, texte teinte 800.

- **Sauge** — « Conforme à son témoin », racine ancrée dans un bloc.
- **Ambre** — conforme mais aucune antériorité prouvée (en attente).
- **Terre** — non conforme (fichier altéré, abîmé ou mal formé).
- **Essai** (à venir, SPEC-ESSAI) : un **orange franc**, décliné selon
  la même anatomie (bord 100 / fond 50 / texte 800, valeurs à fixer à
  la livraison), volontairement distinct de l'ambre : l'ambre dit
  « pas encore », l'orange d'essai dira « jamais — c'est un
  exercice ».

Les couleurs de verdict sont sémantiques ; ne jamais les réaffecter.

## 3. Typographie et composants (la grammaire commune)

- **Quatre tailles** : 20 px (titre de page), 16 px (titres de carte et
  de section), 14 px (corps), 12 px (notes, légendes). **Trois
  poids** : 400, 500, 600 — jamais de gras 700, jamais d'italique.
- **Cartes** : fond blanc, bord parchemin, rayon 16 px, l'ombre unique
  `0 1px 2px rgba(15,23,42,.04)` ; le survol s'entoure du liseret
  encre.
- **Boutons** : rectangle doux 8 px, 40 px de haut ; encre pleine pour
  conclure (« Vérifier », un par écran), blanc bordé pour tout le
  reste ; libellés toujours des **verbes à l'infinitif**.
- **Onglets** : capsule-mère parchemin en pastille, onglet actif en
  pastille encre-700 texte blanc ; sur téléphone, une seule ligne qui
  glisse au doigt (mécanique auditée, `verifieur/MOBILE.md`).
- **Champs** : bord parchemin-200, fond blanc, rayon 8 px.
- **Signature du studio** : « Conçu et développé par Sparkso » (lien
  sparkso.build) en note discrète parchemin-400, au pied de chaque
  page.

## 4. Le logo

L'hexagone de **19 hexagones** (12 petits en couronne, 6 moyens, 1
grand au centre), décliné dans la gamme **canard** — clair dehors,
soutenu au centre. Dessiné en SVG dans la page, jamais en image
externe.

## 5. Les règles non négociables

1. **Aucune ressource externe** sur les pages du vérifieur : ni
   police (police système uniquement), ni image liée, ni script tiers.
2. **FR et EN en miroir** : toute évolution visuelle de
   `verifieur/index.html` se répercute dans `verifieur/en.html`.
3. **Les captures du guide** sont embarquées en data-URI et toujours
   refaites dans le thème courant — une capture au thème périmé est un
   bogue de documentation.
4. **La marque** est « Sparkso Certification » ; le reçu reste « un
   témoin » (vocabulaire technique, jamais rebaptisé).
5. Toute évolution du langage se prend **côté plateforme d'abord**
   (sparkso-universites est la charte de référence), puis se répercute
   ici — jamais l'inverse.
