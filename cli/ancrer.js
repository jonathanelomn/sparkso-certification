// « temoin ancrer <lot> » — déposer la racine du lot dans Bitcoin.
//
// Seul moment où le système touche au réseau (avec « completer ») : la
// racine — 32 octets, rien d'autre — est soumise aux calendriers
// OpenTimestamps publics. Gratuit, sans compte, sans portefeuille.

import { existsSync, readFileSync } from 'node:fs';
import { depuisHex, ajouterAttestation } from '../lib/index.js';
import { ancrerRacine } from './ots.js';
import {
  lireJson, ecrireJson, ecrireOctets, chemins, listerTemoins, option,
  vert, jaune, gras, gris,
} from './commun.js';

// Pose dans chaque témoin du lot l'attestation « ots » INCOMPLÈTE (la
// preuve, sans numéro de bloc — SPEC §8.2) : c'est ce qui dit à qui lit
// le témoin, plateforme comprise, que la racine est déposée et en
// attente. « completer » la remplacera par l'attestation complète.
// Sans effet sur un témoin qui la porte déjà.
function poserAttestationEnAttente(dossierTemoins, octetsOts) {
  const preuveBase64 = Buffer.from(octetsOts).toString('base64');
  let poses = 0;
  for (const fichier of listerTemoins(dossierTemoins)) {
    const temoin = lireJson(fichier, 'un témoin du lot');
    const ots = (temoin.attestations ?? []).filter(a => a && a.type === 'ots');
    if (ots.some(a => Number.isInteger(a.bloc) || a.preuve === preuveBase64)) continue;
    const sansOts = { ...temoin, attestations: (temoin.attestations ?? []).filter(a => !(a && a.type === 'ots')) };
    ecrireJson(fichier, ajouterAttestation(sansOts, { preuveOts: octetsOts }));
    poses++;
  }
  return poses;
}

export async function executer(args) {
  const dossier = option(args, '--dossier', 'ancrage');
  const lot = args[0];
  if (!lot) {
    throw new Error('Usage : temoin ancrer <lot> [--dossier ancrage]');
  }

  const sortie = chemins(dossier, lot);
  const fichierSels = lireJson(sortie.sels, `le récapitulatif du lot (écrit par « emettre »)`);
  const racine = depuisHex(fichierSels.racine, 32, 'racine');

  if (existsSync(sortie.preuve)) {
    const octets = readFileSync(sortie.preuve);
    console.log(jaune('Une preuve existe déjà') + ` pour ce lot (${sortie.preuve}, ${octets.length} octets).`);
    const poses = poserAttestationEnAttente(sortie.temoins, octets);
    if (poses > 0) console.log(vert('✓') + ` ${poses} témoin(s) portent maintenant cette preuve, en attente.`);
    console.log('Pour la mettre à niveau après confirmation Bitcoin : ' + gras(`temoin completer ${lot}`));
    return;
  }

  console.log(gras(`Ancrage du lot « ${lot} »`));
  console.log('Racine à déposer : ' + gris(fichierSels.racine));
  console.log('Envoi aux calendriers OpenTimestamps publics…');

  const { octets: octetsOts, calendriers } = await ancrerRacine(racine);
  ecrireOctets(sortie.preuve, octetsOts);
  const poses = poserAttestationEnAttente(sortie.temoins, octetsOts);

  console.log();
  console.log(vert('✓') + ` Preuve écrite : ${sortie.preuve} (${octetsOts.length} octets, ${calendriers} calendrier(s))`);
  console.log(vert('✓') + ` ${poses} témoin(s) portent la preuve, en attente de confirmation.`);
  console.log();
  console.log(jaune('Cette preuve est pour l\'instant INCOMPLÈTE') + ' : elle référence les');
  console.log('calendriers, qui vont regrouper cette racine avec d\'autres et l\'inscrire');
  console.log('dans une transaction Bitcoin. Quand un bloc l\'aura confirmée (comptez');
  console.log('quelques heures), lancez :');
  console.log(gras(`  temoin completer ${lot}`) + gris(` --dossier ${dossier}`));
}
