# Charte graphique — Sparkso Certification

L'identité visuelle du produit, ses couleurs exactes et le
raisonnement derrière. Décidée le 22 août 2026 ; appliquée sur les deux
pages du vérifieur et sur le site vitrine
[sparkso.build](https://sparkso.build).

## 1. Le registre : un document officiel, lisible en plein soleil

Le public visé — scolarité, étudiants, familles, employeurs — consulte
souvent sur **téléphone, dehors**. Le premier thème (sombre) faisait
« futuriste » et se lisait mal au soleil ; il a été remplacé par un
thème **clair**, dans le registre du **document officiel** : sobre,
posé, digne de confiance. C'est une décision d'identité, consignée ici
pour ne pas être re-débattue à chaque écran.

## 2. Les couleurs

| Rôle | Valeur | Usage |
|---|---|---|
| Fond | `#f7faf9` | Blanc à peine teinté de vert — tout l'arrière-plan. |
| Accent | `#0e8a58` | Vert soutenu : actions, liens, verdict « conforme », centre du logo. |
| Halos | vert / violet pastel | Touches décoratives discrètes en arrière-plan, jamais sous le texte. |
| Verdict « pas encore ancré » | jaune | Calculs justes, antériorité pas encore prouvée. |
| Verdict « non conforme » | rouge | Quelque chose ne correspond pas. |
| Témoin d'essai | orange | Réservé au bandeau « essai » (SPEC-ESSAI, à venir). |

Les couleurs de verdict sont **sémantiques** : vert = prouvé, jaune =
en attente, rouge = échec, orange = exercice. Ne jamais les réaffecter.

## 3. Le logo

Un **hexagone composé de 19 hexagones**, décliné en verts — le plus
soutenu au centre. Il se dessine en SVG dans la page (aucune image
externe) et se décline en camaïeu sans changer de forme.

## 4. Les composants

- **Onglets « pilule »** : navigation par volets, arrondie, sur une
  ligne qui glisse au doigt sur téléphone.
- **Typographie** : polices système uniquement (aucune police
  téléchargée) — cohérent avec la règle d'auto-suffisance.
- **Captures du guide** : embarquées en data-URI dans la page, et
  toujours refaites dans le **thème courant** — une capture au thème
  périmé est un bogue de documentation.

## 5. Les règles non négociables

1. **Aucune ressource externe** sur les pages du vérifieur : ni
   police, ni image liée, ni script tiers. L'identité visuelle doit
   vivre dans le fichier.
2. **FR et EN en miroir** : toute évolution visuelle de
   `verifieur/index.html` se répercute dans `verifieur/en.html`.
3. **La marque** est « Sparkso Certification » ; le reçu reste « un
   témoin » (vocabulaire technique, jamais rebaptisé).
4. Ne jamais reprendre le thème de sparkso-universites : les deux
   produits ont chacun leur identité.
