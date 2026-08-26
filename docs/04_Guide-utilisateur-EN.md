# User guide — sparkso-certification

English mirror of [04_Guide-utilisateur-FR.md](04_Guide-utilisateur-FR.md): any
change to one file must be reflected in the other.

This guide is written first for the person who **holds a witness** (a
student, a family, an employer who received the file); its last section
is for the teams that **integrate** the system into a platform. Every
technical term is explained the first time it appears.

## 1. What is a witness?

A **witness** (French: *témoin*) is a digital receipt: a small file
(name ending in `.temoin.json`) handed over when a record — a grade, a
diploma, any piece of data — has been **sealed**. It lets you prove
later, to anyone, that "this data already existed at that time and has
not been modified since", **without having to trust the platform that
issued it**: the proof rests on the Bitcoin blockchain, a public
ledger that nobody can rewrite.

The witness contains: your data (in the clear), a **salt** (a large
secret number unique to your record — the ingredient that prevents
anyone from guessing your data from the public fingerprints), the
computation **path**, the **root** (the digest-fingerprint of the whole
batch), and the anchoring **attestation** (the proof, with the Bitcoin
block number).

Note: the field names inside the file (`sel`, `racine`, `chemin`,
`gauche`/`droite`…) are **frozen technical identifiers** defined by the
specification — they are never translated, and tools in any language
read them as they are.

## 2. Keeping your witness safe

Treat it like a personal document — a transcript, a record book: it
contains your data and your secret salt.

- **Keep several copies** (phone, USB stick, an email to yourself…).
  Without it, the platform can usually issue it again, but the witness
  alone is what makes you independent from the platform.
- **Do not publish it**: showing it means showing your data. Hand it
  only to whoever needs to verify (an employer, an administration).

## 3. Verifying a witness

Open the verification page (`verifieur/en.html`, or the address
published by your institution; French version: `index.html`). It also
works **offline**: all computation happens in your browser, nothing is
sent anywhere.

1. "Verify a witness" tab: tap the dashed frame and pick your file (or
   paste its content into the field).
2. The verification runs by itself and details every step of the
   computation.
3. Read the verdict:
   - **Green — "Matches its witness"** with a block number: the
     computations are correct **and** the root is anchored; the page
     links to a public explorer so you can see the block.
   - **Yellow — "no anteriority proven yet"**: the computations are
     correct but the witness is not anchored yet (or its proof is not
     completed); it must be completed and verified again.
   - **Red**: something does not match — modified data, damaged or
     forged file. The step-by-step details say what.

The page's "Step-by-step guide" tab illustrates all of this capture by
capture, and the "Understand the system" tab explains the concepts.

The exact promise is always "these bytes existed **no later than block
B**" — never a precise date and time: the displayed timestamp of a
Bitcoin block tolerates about two hours of drift.

## 4. Verifying without trusting us at all

The page recomputes the fingerprint and the path up to the root. For
the ultimate check — re-reading the anchoring proof itself — use the
tools of the open **OpenTimestamps** standard (opentimestamps.org),
developed by third parties: download the `.ots` proof from the page (a
button is offered when the witness is anchored), then run
`ots verify`. This is deliberate: the system is designed to be
verifiable with tools we did not write.

## 5. For integrators (platforms)

The full cycle on the platform side, with the command-line tool
(`temoin`):

1. `temoin emettre` — seal a batch of records: witnesses issued, root
   computed (no network);
2. `temoin ancrer` — deposit the root via OpenTimestamps (the only
   step that touches the network);
3. `temoin completer` — a few hours later, complete the proof with the
   confirmed Bitcoin block;
4. `temoin verifier` — check a witness end to end.

The exchange format between your platform and this tool is defined in
[EXTRACTION.md](../EXTRACTION.md); the witness format, frozen, in
[SPEC.md](../SPEC.md). What remains your responsibility: choosing what
to seal and when, keeping data and salts, handing witnesses to their
owners (see the project boundary in the [README](../README.md)).
