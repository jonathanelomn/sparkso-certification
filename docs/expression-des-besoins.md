# Expression des besoins — sparkso-certification

Pourquoi ce système existe, pour qui, et ce qui a commandé sa
conception. Ce document a été écrit après coup (août 2026), une fois le
socle livré : il consigne les besoins tels qu'ils ont réellement guidé
les choix, pour que les décisions restent compréhensibles dans dix ans.

## 1. Le problème de départ

Une plateforme (la première : Sparkso Universités, pour l'IUGM à
Mahajanga) délivre des résultats qui engagent des vies — notes,
diplômes. Deux questions se posent tôt ou tard :

- **Cette donnée a-t-elle été modifiée après coup ?** (intégrité)
- **Existait-elle vraiment à l'époque prétendue ?** (antériorité)

Aujourd'hui, la seule réponse est « faites confiance à la plateforme »
— précisément ce qu'un employeur, une ambassade ou une autre université
ne peut pas faire, surtout à des années de distance ou si
l'établissement a disparu.

## 2. Les besoins, dans l'ordre

1. **Prouver sans être cru.** La preuve doit se vérifier sans faire
   confiance à la plateforme, ni à Sparkso : formule publique, registre
   public, outils tiers.
2. **Ne rien exposer.** Aucune donnée personnelle ne doit quitter la
   plateforme — ni nom, ni note, ni même une empreinte attaquable par
   essais successifs. Le droit à l'effacement (RGPD) doit rester
   entier.
3. **Durer.** Un reçu remis en 2026 doit se vérifier en 2036, avec la
   seule spécification. D'où une interface **figée** (SPEC v1) et des
   formats volontairement simples.
4. **Rester gratuit et sobre.** Pas de portefeuille de cryptomonnaie,
   pas de frais par lot, pas de serveur à maintenir pour vérifier.
5. **Être compris.** Le public visé (scolarité, étudiants, familles)
   n'est pas expert : chaque écran et chaque document explique ses
   termes, pas à pas, avec des images concrètes.
6. **Servir plusieurs plateformes.** Le système ne doit rien savoir du
   métier : des octets en entrée, un reçu en sortie. Les universités ne
   sont que le premier consommateur.

## 3. La forme que cela impose

Ces besoins, pris ensemble, dessinent la solution retenue :

- des **empreintes salées** (rien d'exposé, effacement possible par
  destruction du sel — le crypto-shredding) ;
- un **arbre de Merkle** par lot (une seule empreinte publique pour
  des milliers d'enregistrements) ;
- un **ancrage OpenTimestamps sur Bitcoin** (gratuit, standard ouvert,
  registre que personne ne réécrit) ;
- un **témoin** par enregistrement : un petit fichier remis à son
  propriétaire, qui le rend indépendant de la plateforme ;
- une **page de vérification** auto-suffisante, qui fonctionne hors
  connexion sur un téléphone.

Le détail est dans [SPEC.md](../SPEC.md) (le format, figé) et
[EXTRACTION.md](../EXTRACTION.md) (le pont avec les plateformes).

## 4. Les critères de réussite

- Un témoin se vérifie **sans aucun outil de Sparkso** (client
  OpenTimestamps officiel + un explorateur Bitcoin public) — démontré
  le 22 août 2026 sur le lot réel `demonstration-notes-2026-S1`, ancré
  au bloc 963516.
- La bibliothèque rejoue **tous les vecteurs de la spécification**
  (`npm test`).
- Une personne non technicienne suit la vérification de bout en bout
  sur la page, sur son téléphone, y compris hors connexion.

## 5. Hors besoin (assumé)

- **La véracité métier** : le système prouve qu'une donnée n'a pas
  changé, pas qu'elle était juste.
- **L'identité de l'émetteur** : le témoin n'est pas une signature ;
  l'identité relève des circuits de remise de la plateforme.
- **Toute infrastructure** : base de données, écrans d'administration,
  stockage des sels — c'est le territoire des plateformes clientes
  (frontière du [README](../README.md)).
