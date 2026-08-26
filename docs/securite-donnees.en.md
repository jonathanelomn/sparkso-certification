# Data security — sparkso-certification

English mirror of [securite-donnees.md](securite-donnees.md): any
change to one file must be reflected in the other.

What the system guarantees, what it does not, where the secrets live,
and the threats the design answers. In plain language; the formal
foundations are in [SPEC.md](../SPEC.md) (sections 5, 10 and 12).

## 1. What the system guarantees — and does not

**Guaranteed**: **anteriority** ("these bytes existed no later than
Bitcoin block B") and **integrity** (change a single character and
verification fails). These guarantees rest on trust in no one: they
are recomputed by the verifier and observed on a public ledger.

**Not guaranteed**: **business truth** (a wrong grade, once sealed,
stays wrong — the witness proves it did not change, not that it was
correct) and the issuer's **identity** (the anchoring system does not
sign; identity belongs to the platform and its delivery channels).

## 2. Nothing personal ever leaves

Only one thing is ever deposited on the blockchain: the **root** — a
32-byte fingerprint, an irreversible digest. No data, no names, no
grades, not even the individual fingerprints. Publishing the root
reveals nothing.

## 3. The salt: the secret that protects the fingerprints

Each record gets a **salt**: a large secret random number (32 bytes,
SPEC §5.1), mixed with the data before the fingerprint is computed.
Without it, a curious party could "guess" simple data by trying every
possibility (a grade out of 20: twenty tries) and comparing
fingerprints. With it, exhaustive guessing becomes impossible.

Practical consequences:

- the salt lives **off-chain**, stored by the platform with the data,
  and handed to the owner inside their witness;
- **destroying the salt** (and the witness) makes the fingerprint
  forever mute: this is **crypto-shredding**, the system's answer to
  the GDPR right to erasure (the European data-protection regulation)
  — erase the data and its salt, and the public tree no longer allows
  anything to be deduced (SPEC §10);
- a **witness is a personal document**: it contains the data in the
  clear and the salt. Its confidentiality is its holder's
  responsibility (see the user guide).

## 4. Threats and countermeasures

| Threat | Countermeasure in the design |
|---|---|
| Falsifying data after the fact | The fingerprint no longer matches; the anchored root freezes the whole batch. |
| Forging a deceptive tree by duplicating nodes (CVE-2012-2459, a historical Merkle-tree flaw) | RFC 6962-style tree: 0x00/0x01 domain prefixes and **promotion** of the orphan node — never duplication (SPEC §6). |
| Confusing a leaf with an internal node | The domain prefixes make the two computations incompatible. |
| Breaking SHA-256 (collisions) | State of the art: no known attack; SHA-256 underpins Bitcoin itself. The witness's `hachage` field would allow a future migration without breaking the format. |
| Backdating an anchor | Impossible: the Bitcoin block is dated by the public chain, not by us. |
| Dishonest or vanished platform | Verification does not need it: witness + page (or the official OpenTimestamps tools) suffice. |

## 5. The verifier page, security-wise

- **Zero network requests**: all computation happens in the browser
  (Web Crypto API); observable in the browser's network tab, and
  proven by offline operation.
- **Self-sufficient**: a single file, no external resource (no script,
  no font, no linked image) — no third party to trust at load time, no
  dependency shifting under our feet.
- It **stores nothing**: the pasted witness stays in the tab's memory.

## 6. Dependencies (software attack surface)

- `lib/` — the core: **zero dependencies**. Nothing to audit but our
  own code.
- `cli/` — a single dependency: the **official** `opentimestamps` npm
  library, the only code that touches the network, confined to
  `cli/ots.js`.
- The page — no dependencies.

## 7. Reporting an issue

Found a weakness in the specification, the library or the page? Open
an issue on the GitHub repository (jonathanelomn/sparkso-certification)
with the scenario; for a sensitive matter, contact the maintainer
directly rather than publishing the details.
