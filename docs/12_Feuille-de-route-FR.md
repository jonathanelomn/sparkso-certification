# Feuille de route — sparkso-certification

Où va le projet, dans quel ordre, et selon quel principe. Document
vivant : tenu à jour à chaque jalon, en cohérence avec les
[avancements mensuels](15_Avancements-2026-08-FR.md).

## Le principe directeur

**La SPEC v1 ne change jamais.** Un témoin émis en 2026 doit se
vérifier en 2036 avec la spécification seule. Tout ce qui suit passe
donc par les mécanismes d'extension prévus (nouveaux types
d'attestation, compléments de spécification) — jamais par une
modification du format.

## Fait (jalon du 22 août 2026, renommage le 24)

- SPEC v1 figée, vecteurs de test en annexe A.
- Bibliothèque cœur zéro dépendance ; les 10 tests rejouent l'annexe A.
- CLI `temoin` complète (émettre, ancrer, compléter, vérifier).
- Page vérifieur FR + EN : auto-suffisante, hors ligne, auditée sur
  téléphone, thème clair.
- **Preuve grandeur nature** : lot `demonstration-notes-2026-S1` ancré
  au bloc Bitcoin 963516, relu par les outils OpenTimestamps officiels.
- Le produit devient **Sparkso Certification** (le vocabulaire
  technique — témoin, `temoin` — ne change pas).

## En cours

- **Ancrage d'essai** ([SPEC-ESSAI.md](../SPEC-ESSAI.md)) : ancrer sans
  registre public, pour le développement, la formation et les
  environnements de test des plateformes (contrat test/prod, y compris
  le rafraîchissement de la test depuis la prod). Complément rédigé, en
  relecture ; implémentation à suivre (CLI, vérifieur, EXTRACTION.md).
- **Complétude documentaire** : expression des besoins, installation,
  capacités et limites, mise en production, charte graphique, versions
  anglaises (ce document en fait partie).

## À venir, dans l'ordre probable

1. **Section « Ancrage » de Sparkso Universités** — le premier
   consommateur branche sa plateforme selon le contrat
   d'[EXTRACTION.md](../EXTRACTION.md) §3. Ce travail vit dans le dépôt
   sparkso-universites, pas ici.
2. **Attestation EVM** ([PROPOSITION-EVM.md](../PROPOSITION-EVM.md)) —
   ancrer la même racine aussi sur une chaîne à contrats, pour une
   lecture directe dans un explorateur web. Proposition complète
   rédigée ; **en attente des trois décisions de sa section 8** — rien
   ne s'implémente avant validation.
3. **Publication npm** — quand l'interface de la bibliothèque aura
   vécu assez longtemps sans bouger.

## Ce qui restera toujours hors du projet

Base de données, écrans d'administration, choix de quoi sceller et
quand, stockage des sels, remise des témoins : le territoire des
plateformes clientes (frontière du [README](../README.md)).
