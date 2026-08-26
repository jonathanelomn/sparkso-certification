# Installation — sparkso-certification

Comment installer l'outil, vérifier qu'il fonctionne, et déployer la
page de vérification. Pas à pas, en partant de zéro.

## 1. Ce qu'il faut avant de commencer

- **Node.js 18 ou plus récent** (le moteur JavaScript ; vérifier avec
  `node --version`). Livré avec **npm**, le gestionnaire de paquets.
- **git** pour récupérer le dépôt.

Rien d'autre : pas de base de données, pas de compte à créer, pas de
portefeuille de cryptomonnaie.

## 2. Installer

```bash
git clone https://github.com/jonathanelomn/sparkso-certification.git
cd sparkso-certification
npm install
```

`npm install` ne télécharge qu'**une seule dépendance** : la
bibliothèque officielle `opentimestamps` (utilisée uniquement par les
commandes qui touchent au réseau — voir la
[sécurité des données](08_Securite-donnees-FR.md), section 6).

## 3. Vérifier que tout fonctionne

```bash
npm test
```

Les 10 tests rejouent les **vecteurs de l'annexe A de la
spécification** : si tout est vert, votre installation calcule
exactement ce que [SPEC.md](../SPEC.md) exige. C'est le contrat.

## 4. La ligne de commande `temoin`

Sans installation supplémentaire, depuis le dossier du dépôt :

```bash
node cli/index.js aide
```

Pour disposer de la commande `temoin` partout :

```bash
npm link
```

Puis :

```bash
temoin aide
```

Les quatre commandes (`emettre`, `ancrer`, `completer`, `verifier`)
suivent la vie d'un lot ; chacune explique ce qu'elle fait en français
courant. Le format du lot d'entrée est défini dans
[EXTRACTION.md](../EXTRACTION.md).

Seuls `ancrer` et `completer` utilisent le réseau (les calendriers
OpenTimestamps publics). `emettre` et `verifier` fonctionnent hors
connexion.

## 5. Utiliser la bibliothèque depuis une plateforme

Dans le `package.json` du projet consommateur, une dépendance par URL
git (pas de publication npm pour l'instant) :

```json
{ "dependencies": { "sparkso-certification": "github:jonathanelomn/sparkso-certification" } }
```

Le cœur (`lib/`) est à **zéro dépendance** et s'importe avec
`import { … } from "sparkso-certification"`.

## 6. Déployer la page de vérification

`verifieur/index.html` (français) et `verifieur/en.html` (anglais) sont
**auto-suffisantes** : un seul fichier chacune, aucune ressource
externe, aucune requête réseau. Les copier telles quelles sur n'importe
quel hébergement statique — chaque instance les publie à sa propre
adresse (par exemple `iugm.sparkso.mg/verifier/`). Il n'y a rien à
« installer » : c'est un fichier à poser.

## 7. En cas de problème

- `npm test` échoue : vérifier la version de Node (`node --version`,
  18 minimum) ; le lancement des tests est réglé pour Node 18 à 22+.
- `temoin ancrer` reste sans réponse : les calendriers OpenTimestamps
  sont peut-être injoignables depuis votre réseau — réessayer plus
  tard ; l'émission (`emettre`) n'a jamais besoin du réseau.
- `temoin completer` répond « pas encore confirmé » (code de sortie
  2) : c'est normal pendant les quelques heures qui suivent l'ancrage —
  Bitcoin n'a pas encore confirmé. Relancer plus tard.
