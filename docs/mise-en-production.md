# Mise en production — sparkso-certification

Comment un système **sans infrastructure** se met en production, ce
qu'une plateforme doit préparer, et comment vivent les environnements
de test et de production. Complète [EXTRACTION.md](../EXTRACTION.md)
(le contrat d'intégration) et [installation.md](installation.md) (la
pose des outils).

## 1. Ce que « production » veut dire ici

sparkso-certification n'a **rien qui tourne** : pas de serveur, pas de
base, pas de service à surveiller. Mettre en production, c'est :

1. installer la CLI `temoin` **sur une machine de la plateforme** (voir
   [installation.md](installation.md)) ;
2. publier la **page de vérification** sur le site public de
   l'instance (un fichier HTML à poser, rien de plus) ;
3. organiser, côté plateforme, le **rangement et les sauvegardes** de
   l'arborescence `ancrage/` (EXTRACTION.md §3) — en particulier les
   **sels**, secrets, stockés et sauvegardés avec les données.

La disponibilité du système, c'est la disponibilité de la plateforme :
si elle sait produire un lot et ranger des fichiers, elle sait ancrer.

## 2. La liste de contrôle avant la première fois

- [ ] `npm test` passe sur la machine d'ancrage (les 10 vecteurs).
- [ ] La page de vérification est en ligne à l'adresse publique de
      l'instance, et fonctionne hors connexion (mode avion : elle
      calcule toujours).
- [ ] L'arborescence `ancrage/` existe, sauvegardée avec les données ;
      les sels ne sont **jamais** dans un dépôt public.
- [ ] Un **lot d'essai** a été déroulé de bout en bout en test
      (émission → ancrage → vérification) — voir la section 3.
- [ ] Le circuit de **remise des témoins** aux propriétaires est décidé
      (bouton « Télécharger mon témoin », EXTRACTION.md §3).
- [ ] L'équipe sait dire la promesse exacte : « au plus tard au bloc
      B », jamais une date-heure
      ([capacités et limites](capacites-et-limites.md)).

## 3. Test et production : deux environnements, un contrat

Le contrat, défini par le complément [SPEC-ESSAI.md](../SPEC-ESSAI.md)
(en relecture — l'option arrive avec son implémentation) :

- **En production, on ancre réellement** (`temoin ancrer`) : chaque
  racine est déposée au registre public Bitcoin.
- **En test — et partout ailleurs — on ancre en essai**
  (`temoin ancrer --essai`) : instantané, hors ligne, et le témoin
  produit se présente lui-même comme un exercice sans valeur probante.
  Impossible de confondre : un vérifieur qui ignore le type d'essai
  voit un témoin « sans ancrage », jamais un témoin certifié.

### Rafraîchir la test depuis la prod (et les retours en arrière)

Un environnement de test se **réinitialise depuis la production** aussi
souvent qu'on veut — c'est même la bonne façon de répéter une
opération délicate avant de la faire en vrai :

1. copier les données de production vers la test (procédure de la
   plateforme), y compris `ancrage/` si utile ;
2. rien à « désancrer » : les ancrages faits en test étaient des
   essais, ils n'ont rien déposé nulle part ;
3. après la copie, tout nouvel ancrage en test reste un essai.

Deux points de vigilance :

- **Confidentialité** : sels et témoins contiennent les données en
  clair — une copie de production se protège en test comme en
  production (mêmes règles d'accès).
- **Retour en arrière en production** : restaurer des données
  n'invalide aucun témoin déjà remis — un témoin prouve qu'un état
  existait, pas qu'il était juste. Après correction, on scelle un
  **nouveau lot** ; on ne « reprend » jamais un témoin.

## 4. Le rythme de croisière

- Ancrer au fil des événements métier choisis par la plateforme
  (session close, diplômes délivrés…) : `emettre` puis `ancrer` le
  jour J, `completer` le lendemain (Bitcoin a confirmé entre-temps),
  puis remise des témoins.
- Surveiller peu, mais bien : le code de sortie de `completer` (2 =
  pas encore confirmé, on relance plus tard) et la sauvegarde
  d'`ancrage/`.
- En cas de doute sur un lot, le vérifier comme le ferait un tiers :
  page publique, ou outils OpenTimestamps officiels.
