# Capacités et limites — sparkso-certification

Ce que le système sait faire, jusqu'où, en combien de temps, et ce
qu'il ne promet pas. Les chiffres donnés ici découlent de la
conception ; les garanties formelles sont dans [SPEC.md](../SPEC.md).

## 1. La promesse exacte — ni plus, ni moins

Un témoin valide et ancré prouve : « ces octets existaient **au plus
tard lorsque le bloc Bitcoin B a été miné**, et n'ont pas changé
depuis ». Toujours « au plus tard au bloc B », jamais une date-heure :
l'horodatage affiché d'un bloc tolère environ **deux heures de
dérive** — c'est une propriété de Bitcoin, pas un défaut du système.

Ce que la promesse **ne couvre pas** :

- la **véracité métier** — une note fausse, scellée, reste fausse ; le
  témoin prouve qu'elle n'a pas changé, pas qu'elle était juste ;
- l'**identité de l'émetteur** — le témoin n'est pas une signature ;
- l'**exactitude à la minute** — voir la dérive ci-dessus.

## 2. Volumes : l'arbre absorbe presque tout

Un lot de N enregistrements produit **une seule** empreinte publique
(la racine), quel que soit N. La taille du chemin de calcul dans chaque
témoin croît en log₂(N) — c'est mathématique, pas expérimental :

| Enregistrements dans le lot | Empreintes dans le chemin |
|---|---|
| 1 000 | 10 |
| 100 000 | 17 |
| 1 000 000 | 20 |

Un témoin reste donc un petit fichier (quelques kilooctets), même dans
un lot d'un million d'enregistrements. La limite pratique n'est pas le
format : c'est la **mémoire de la machine** qui émet le lot (le fichier
d'extraction est lu en entier). Pour les volumes courants d'une
plateforme (des milliers à des centaines de milliers d'enregistrements
par lot), aucune précaution particulière.

## 3. Délais : l'ancrage vit en deux temps

- `temoin emettre` : **immédiat** (pur calcul, aucun réseau).
- `temoin ancrer` : quelques secondes (dépôt auprès des calendriers
  OpenTimestamps publics) — la preuve est alors **incomplète**.
- `temoin completer` : utilisable **quelques heures plus tard**, une
  fois la transaction confirmée dans un bloc Bitcoin. Tant que ce
  n'est pas fait, le témoin est structurellement valide mais ne prouve
  encore aucune antériorité.

Conséquence d'organisation : ancrer est un geste en deux visites
(ancrer aujourd'hui, compléter demain), pas une opération instantanée.
Ne jamais promettre une date-heure de scellement : promettre « au plus
tard au bloc B ».

## 4. Coûts et dépendances externes

- **Aucun coût par lot** : OpenTimestamps agrège gratuitement des
  milliers d'empreintes dans une seule transaction Bitcoin. Pas de
  portefeuille, pas de frais.
- **Dépendance de disponibilité** : les calendriers OpenTimestamps
  publics sont des services tiers, gratuits et redondants. S'ils sont
  injoignables, `ancrer` attend ou échoue proprement — `emettre` et
  `verifier`, eux, n'ont jamais besoin du réseau.
- **La vérification ne dépend de personne** : page hors ligne, ou
  outils OpenTimestamps officiels + n'importe quel explorateur Bitcoin.

## 5. Effacement : fort, mais à sens unique

Détruire le sel et les données rend l'empreinte ancrée **muette à
jamais** (crypto-shredding, SPEC §10) : personne ne peut plus rien en
confirmer, pas même le propriétaire. C'est la réponse au droit à
l'effacement — et c'est irréversible par construction. La racine, elle,
reste sur la chaîne : elle ne porte rien.

## 6. Ce qui n'existe pas (encore)

- **Ancrage d'essai** : complément rédigé
  ([SPEC-ESSAI.md](../SPEC-ESSAI.md)), en relecture — pour développer,
  former et tester sans toucher au registre public.
- **Attestation EVM** : lecture directe dans un explorateur de chaîne à
  contrats — proposé ([PROPOSITION-EVM.md](../PROPOSITION-EVM.md)), en
  attente de décisions.
- **Publication npm** : la bibliothèque se consomme par URL git pour
  l'instant.
- **Révocation** : un témoin ne se « révoque » pas — il prouve un état
  passé. Corriger une donnée, c'est sceller un nouveau lot ; l'ancien
  témoin reste la trace exacte de l'ancien état.
