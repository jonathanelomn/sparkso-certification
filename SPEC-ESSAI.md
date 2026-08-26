# Complément — attestation « essai » (ancrage d'essai)

Ce document complète [SPEC.md](SPEC.md) **sans la modifier** : la
spécification v1 reste figée et le champ `format` reste `1`. Il définit
un nouveau type d'attestation, « essai », par le mécanisme d'extension
que la v1 prévoit déjà (§8.2 : un vérifieur ignore sans erreur les
types d'attestation qu'il ne connaît pas).

Statut : rédigé le 27 août 2026 — **en relecture avant
implémentation**. Une fois livré, ce complément est figé au même titre
que la spécification.

## 1. Le but, en une phrase

Permettre de dérouler tout le cycle — émettre, ancrer, vérifier — **sans
rien déposer au registre public** : un ancrage d'essai, instantané,
hors ligne et sans valeur probante, impossible à confondre avec un
ancrage réel.

## 2. Pourquoi un ancrage d'essai

L'ancrage réel (OpenTimestamps sur Bitcoin) est gratuit ; le coût n'est
donc pas le problème. Trois choses le sont :

1. **L'attente** : une preuve réelle se complète en quelques heures
   (confirmation Bitcoin). Inutilisable pour développer, tester en
   continu ou former quelqu'un séance tenante.
2. **La confusion** : un ancrage réel produit une **vraie preuve**. Des
   témoins d'exercice indiscernables de vrais états certifiés seraient
   un danger, pas un service.
3. **L'irréversibilité** : ce qui est déposé au registre public y reste.
   Un environnement d'essai doit pouvoir être vidé et rejoué à volonté.

L'attestation d'essai inverse les trois : immédiate, sans valeur
probante affichée comme telle, et n'engageant rien nulle part. Elle
sert :

- au **développement et aux tests automatiques** (le cycle complet en
  une seconde, sans réseau) ;
- à la **formation et à la démonstration** (de vrais écrans, de vrais
  calculs, des témoins clairement marqués « essai ») ;
- aux **environnements de test** des plateformes, rafraîchis depuis la
  production sans rien avoir à « désancrer » (section 7).

## 3. Ce que la v1 permet déjà

Le champ `attestations` d'un témoin est un **tableau** ouvert : la v1
n'y définit que le type `"ots"`, réserve `"evm"` (SPEC §11), et impose
aux vérifieurs d'**ignorer sans erreur** les types inconnus. Un type
`"essai"` s'y glisse donc sans toucher un octet du format : un
vérifieur qui ne le connaît pas voit un témoin **sans ancrage
intelligible** — jamais un témoin ancré.

## 4. L'attestation « essai »

```json
{ "type": "essai", "date": "2026-08-27" }
```

Deux champs, pas un de plus :

- `type` : la chaîne exacte `"essai"` — identifiant technique figé,
  jamais traduit, comme `sel` ou `racine`.
- `date` : le jour de l'essai, `AAAA-MM-JJ`. Elle est **déclarative** :
  posée sur la seule foi de l'horloge de la machine, affichée pour se
  repérer, elle ne prouve rien. C'est la différence de nature avec une
  attestation `ots`, dont la date se **constate** au registre public.

Jamais de champ `bloc` : rien n'est déposé nulle part. L'attestation
est complète d'emblée — il n'y a rien à « compléter ».

Le témoin qui la porte est par ailleurs un témoin v1 ordinaire : mêmes
empreintes salées, même chemin, même racine, même vérification des
calculs. Seule l'attestation change.

### Exemple

```json
{
  "format": 1,
  "hachage": "sha-256",
  "canonique": "{\"n\":3}",
  "sel": "3333333333333333333333333333333333333333333333333333333333333333",
  "chemin": [
    { "cote": "gauche", "empreinte": "619d2265e7a293938e0caf3207c4015658312d78db8d24b8e11bbffd4d659f35" }
  ],
  "racine": "c6c5f4615cc9a453def6b0a1b6999de9528c194a102983475a3e7e84106ebe8e",
  "attestations": [
    { "type": "essai", "date": "2026-08-27" }
  ]
}
```

(Empreintes du vecteur B de l'annexe A de la SPEC ; seule l'attestation
diffère de l'exemple du §8.4.)

## 5. Émission : `temoin ancrer --essai`

Même geste que l'ancrage réel, avec l'option en plus. Aucun réseau,
résultat immédiat, message explicite : « ancrage d'ESSAI — ce lot ne
prouve rien publiquement ».

**Garde anti-mélange** : un lot porte soit des attestations d'essai,
soit des attestations réelles — jamais les deux.

- `temoin ancrer --essai` sur un lot déjà ancré réellement : refus,
  avec explication.
- `temoin ancrer` (réel) sur un lot ancré en essai : refus, avec
  explication.
- `temoin completer` sur un lot d'essai : la commande explique qu'un
  essai n'a rien à compléter.

Pour passer d'un essai au réel, on **réémet** le lot
(`temoin emettre`) : les sels seront nouveaux, et c'est voulu — un
essai ne se « promeut » pas en preuve.

## 6. Vérification

- **Le vérifieur de ce dépôt** (page et CLI) reconnaît le type et rend
  un verdict dédié, dans une couleur à part (orange) : « **Témoin
  d'essai** — calculs conformes, aucune antériorité prouvée ». Le
  verdict vert « Conforme à son témoin », avec numéro de bloc, reste
  réservé à l'ancrage réel.
- **Un vérifieur v1 tiers** ignore le type : il voit au mieux un témoin
  « sans ancrage » (l'équivalent du verdict jaune), au pire il rejette.
  Dans aucun cas il ne dit « ancré » : l'anti-confusion est
  structurelle, pas cosmétique.
- **Les outils OpenTimestamps officiels** n'ont rien à relire : il
  n'existe aucune preuve `.ots`. Un essai ne peut pas être « vérifié
  publiquement », par construction.

## 7. Environnements : le contrat test / prod

- **En production, on ancre réellement.** Dans tout autre environnement
  — test, recette, démonstration, formation, intégration continue — on
  ancre avec `--essai`.
- **Rafraîchir un environnement de test depuis la production** ne
  demande aucune précaution côté ancrage : on copie données et témoins
  (rien à « désancrer », un ancrage d'essai n'a rien déposé), et tout
  nouvel ancrage fait en test est un essai. Attention en revanche à la
  confidentialité ordinaire : sels et témoins contiennent les données
  en clair (EXTRACTION.md §3) — une copie de production se protège en
  test comme en production.
- **Un retour en arrière en production** n'invalide aucun témoin déjà
  remis : un témoin prouve que son enregistrement existait, pas qu'il
  était juste (SPEC §2). Après correction des données, on scelle un
  nouveau lot ; l'ancien témoin reste ce qu'il est — la trace exacte
  d'un état passé.

La section « Environnements » d'[EXTRACTION.md](EXTRACTION.md) reprend
ce contrat côté plateforme.

## 8. Vocabulaire et garde-fous

- Un témoin d'essai n'est **jamais** un « état certifié par ancrage
  public ». Dire : « témoin d'essai », « exercice ».
- Toute interface qui affiche un essai doit le rendre impossible à
  manquer : bandeau dédié, couleur distincte, mots explicites.
- La `date` d'un essai ne se présente jamais comme une preuve.

## 9. Ce que ce complément ne change pas

La SPEC v1 est intacte : format `1`, vecteurs de l'annexe A inchangés,
type `evm` toujours réservé (PROPOSITION-EVM.md suit son propre
chemin). La page vérifieur reste hors ligne — l'essai n'y ajoute
aucune requête, il en enlève.
