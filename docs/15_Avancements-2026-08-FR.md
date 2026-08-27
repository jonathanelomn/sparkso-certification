# Avancements — août 2026

Ce document résume les avancements de sparkso-certification, période par
période, dans l'esprit du document homonyme de Sparkso Universités :
chaque section dit ce qui change concrètement. Il est tenu à jour **à
chaque évolution notable** ; un nouveau fichier est ouvert chaque mois
(`15_Avancements-AAAA-MM-FR.md`).

## 1. Le socle complet, de la règle du jeu à la preuve réelle (21–22 août)

Le système existe de bout en bout :

- **La spécification (SPEC.md), v1 figée** : format du témoin, recette
  exacte des calculs, garantie précise (« au plus tard au bloc B »),
  effacement RGPD par destruction du sel, vecteurs de test chiffrés en
  annexe. C'est l'interface du système — elle ne bougera plus.
- **La bibliothèque (lib/)**, sans aucune dépendance, dont les 10 tests
  rejouent l'annexe A ; **l'outil en ligne de commande** (`temoin
  emettre|ancrer|completer|verifier`) ; **le format d'extraction**
  (EXTRACTION.md) qui dit aux plateformes comment alimenter le système.
- **La page de vérification** (français et anglais) : un seul fichier,
  tout le calcul dans le navigateur, zéro requête réseau, quatre
  volets dont un guide pas à pas illustré.
- **Le jalon de preuve** : un lot de démonstration réellement ancré —
  racine `b133a459…867b`, bloc Bitcoin 963516 — vérifié par les outils
  officiels OpenTimestamps. La compatibilité avec le standard est
  prouvée, pas seulement affirmée (dossier exemples/).

## 2. La page passait l'épreuve du téléphone (22 août)

Le public visé vérifie surtout depuis un smartphone ; la page a donc
été auditée dans un navigateur mobile piloté par programme, puis testée
sur un iPhone réel. Concrètement :

- les onglets tiennent sur **une ligne qui glisse au doigt**, l'onglet
  touché se recentre seul ;
- les libellés disent « **touchez** » sur écran tactile, « cliquez » à
  la souris ;
- le zoom forcé de Safari iOS dans le champ de collage est désarmé ;
- chaque volet ouvre sur un titre de section.

Le récit complet, avec la méthode et la liste de contrôle pour refaire
l'audit : [../verifieur/MOBILE.md](../verifieur/MOBILE.md).

## 3. La page passait au clair (22 août)

Décision d'identité, maquette comparative à l'appui : le fond sombre
d'origine faisait « futuriste » pour les professeurs et étudiants, et
se lisait mal en plein soleil. La page est désormais **claire** — blanc
à peine teinté de vert, halos pastel, accent vert soutenu, logo décliné
soutenu au centre — sans aucun changement de texte ni de calcul. Les
captures « réelles » du guide ont été refaites sur la page claire, avec
le témoin ancré du lot de démonstration. La charte est consignée dans
le CLAUDE.md du dépôt.

## 4. L'extension EVM se proposait, rien ne s'engageait (22 août)

[../PROPOSITION-EVM.md](../PROPOSITION-EVM.md) rédige le complément que
la SPEC §11 réserve : ancrer la même racine **aussi** sur une chaîne à
contrats (Base proposée), pour une lecture directe dans un explorateur
web. Contrat minimal d'une dizaine de lignes, coûts, risques exposés
sans fard. **En attente de trois décisions** (section 8 du document) ;
la SPEC v1 reste intacte et rien ne s'implémente avant validation.

## 5. Corrections et outillage (22 août)

- `npm test` échouait sous Node 22 (la commande ne comprenait plus le
  dossier en argument) : le script cible désormais `test/*.test.js` —
  les 10 tests repassent sur toutes les versions.
- La documentation vivante s'installait : ce dossier `docs/` (guide
  utilisateur, plan de test, sécurité des données, avancements), sur le
  modèle de Sparkso Universités, avec sa règle de tenue à jour dans le
  CLAUDE.md du dépôt.

## 6. Le projet devient Sparkso Certification (24 août)

Le nom « Sparkso Témoin » restait fidèle au mécanisme mais parlait mal
au public visé, et « Witness » ne portait rien en anglais. Le produit
s'appelle désormais **Sparkso Certification** : le mot est identique en
français et en anglais, et il nomme le bénéfice (des états certifiés)
plutôt que le rouage. Renommés : le répertoire de travail
(`~/sparkso-certification`), le nom npm dans `package.json`, le titre du
README et la marque affichée en tête du vérifieur (`verifieur/`).

Le vocabulaire technique ne change pas : le reçu remis lors d'un
scellement reste **un témoin**, la SPEC et la CLI (`temoin`) restent
telles quelles. Seule la marque produit change.

Le site vitrine [sparkso.build](https://sparkso.build) présente le
produit sous son nouveau nom, avec de vraies captures du vérifieur
(accueil et résultat de vérification de l'exemple de la SPEC).

## 7. L'ancrage d'essai se concevait (27 août)

Besoin exprimé : des environnements de test et de production, et le
rafraîchissement de la test depuis la prod pour répéter sans risque.
La réponse tient dans le mécanisme d'extension que la SPEC v1
prévoyait : un type d'attestation « essai », local et instantané, qui
ne dépose rien au registre public — donc rien à « désancrer », jamais.
Le complément [../SPEC-ESSAI.md](../SPEC-ESSAI.md) est rédigé (type
`essai`, garde anti-mélange, contrat test/prod) ; **en relecture avant
implémentation** — la SPEC v1 reste intacte.

## 8. La documentation se complétait (27 août)

En s'inspirant de la trame documentaire de Sparkso Universités, six
documents rejoignaient `docs/` : expression des besoins, installation,
capacités et limites, feuille de route, mise en production, charte
graphique. Le guide utilisateur et la sécurité des données gagnaient
leur **miroir anglais** (règle : toute modification de l'un se
répercute dans l'autre). Au passage, une erreur corrigée dans la
sécurité des données : le sel fait 32 octets (SPEC §5.1), pas 16.

## 9. La documentation prenait la nomenclature commune (27 août)

Les documents de `docs/` reprenaient la nomenclature numérotée de
Sparkso Universités — même numéro pour même sujet, suffixe de langue
`-FR`/`-EN` (`01_Expression_des_besoins.md`, `04_Guide-utilisateur-FR.md`,
`16_Mise-en-production-FR.md`…). Les numéros absents le sont à
dessein : 02 est `SPEC.md` (l'interface, qui reste à la racine) ; 06,
07, 10, 11 et 13 désignent des documents propres à la plateforme, qui
vivent dans le dépôt sparkso-universites. Toutes les références
croisées suivaient.

## 10. Le vérifieur parlait le langage de la plateforme (27 août)

Décision d'alignement : les deux pages du vérifieur reprennent **à
l'identique** le langage d'écran de Sparkso Universités — les quatre
familles (encre pour la structure, canard pour l'accent, parchemin
pour les neutres chauds, sauge/ambre/terre pour les états), la
typographie à quatre tailles et trois poids, les cartes à ombre
unique, les boutons, la capsule d'onglets en pastilles et la signature
du studio. Les verdicts passent au format « bandeau » de la
plateforme : sauge (conforme ancré), ambre (en attente), terre (non
conforme) ; l'orange reste réservé au futur bandeau d'essai. Le guide
pas à pas y gagne une cohérence complète : les captures de la
plateforme IUGM et celles du vérifieur montrent désormais la même
identité. Les captures embarquées ont été refaites dans le nouveau
thème (règle de la charte), l'audit mobile rejoué (une ligne
d'onglets qui glisse, aucun débordement), les dix tests repassés. La
charte ([14_Charte-graphique-FR.md](14_Charte-graphique-FR.md)) est
réécrite en conséquence et la décision du 22 août (thème clair,
lisible en plein soleil) demeure.

Au passage, `npm test` devenait portable : le motif générique du
script ne fonctionnait que sous Node 22 (et pas sous Node 18-20,
pourtant promis par l'installation) ; le script nomme désormais le
fichier de tests explicitement.
