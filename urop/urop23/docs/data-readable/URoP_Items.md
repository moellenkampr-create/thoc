# URoP â€“ Items
Stand: 2026-04-10

## 1. Zweck dieser Datei
Diese Datei erklÃ¤rt die **aktive Itemstruktur** des URoP-Regelwerks.
Die fÃ¼hrende Datenquelle fÃ¼r allgemeine AusrÃ¼stung ist:
- `URoP_Items.json`

Die Itemstruktur ist absichtlich **schlank**.
Sie soll am Tisch, im Regelwerk und spÃ¤ter in Foundry schnell lesbar bleiben.

---

## 2. Grundsatz
FÃ¼r allgemeine Items gilt in URoP:
- **so viel Struktur wie nÃ¶tig**
- **so wenig Pflege wie mÃ¶glich**
- FlieÃŸtext ist oft hilfreicher als zusÃ¤tzliche Pflichtfelder

Items sollen in der Regel nicht schon die Spielleitung ersetzen.
Sie sollen vor allem sagen:
- Was ist das?
- Was tut es grob?
- Was kostet es?

---

## 3. Aktiver Kern
Die aktive Itemstruktur behÃ¤lt nur diese Felder:
- `id`
- `name`
- `kind`
- `description`
- `rulesShort`
- `priceEb`

### `id`
Stabile interne Kennung fÃ¼r Pflege, Import und Foundry.

### `name`
Klarer Anzeigename des Gegenstands.

### `kind`
Grobe Einordnung des Gegenstands.
Dieses Feld bleibt vor allem fÃ¼r Ordnung, Listen und spÃ¤tere Foundry-Unterordner erhalten.

### `description`
Beschreibender FlieÃŸtext.
Hier kÃ¶nnen WeltgefÃ¼hl, typische Nutzung, auffÃ¤llige Eigenschaften, rechtliche Besonderheiten oder andere Hinweise stehen.

### `rulesShort`
Kurze regeltechnische Kernaussage.
Dieses Feld soll knapp bleiben und nur sagen, was das Item regeltechnisch grob bewirkt oder ermÃ¶glicht.

### `priceEb`
Referenzpreis in **EB**.
Alias: **ebbies / Eurodollar / Eurobuck**.

---

## 4. Was bewusst nicht mehr im Kern steckt
Folgende Felder gehÃ¶ren **nicht mehr** zur aktiven Itemstruktur:
- `subcategory`
- `tags`
- `skillLinks`
- `availability`
- `legalStatus`
- `bulk`
- `concealability`
- `durability`
- `quantityMode`
- `settingScope`
- `useProfiles`
- `mechanicalHooks`
- `refillProfile`
- `refillCost Eb`
- `specialNotes`

Grund:
Diese Felder erzeugen fÃ¼r allgemeine Items mehr Pflege- und Driftaufwand als echten Nutzen.
Wenn solche Informationen wichtig sind, kÃ¶nnen sie im FlieÃŸtext stehen oder in spezialisierte Datenschemata wandern.

---

## 5. VerhÃ¤ltnis zu spezialisierten Dateien
Die schlanke Itemstruktur gilt fÃ¼r **allgemeine AusrÃ¼stung**.
Tiefer regelrelevante Objektgruppen dÃ¼rfen eigene stÃ¤rkere Schemata behalten, z. B.:
- Waffen
- Schutz und RÃ¼stung
- Cyberware
- Vehicles
- Quickhacks und Netrunning als eigene SystemblÃ¶cke

URoP trennt damit bewusst zwischen:
- **allgemeinen Items** mit leichtem Kern
- **Spezialdaten** mit mehr Struktur, wenn das Spiel sie wirklich braucht

---

## 6. Foundry-Nutzung
FÃ¼r allgemeine Items reicht in Foundry meist:
- `id`
- `name`
- `kind`
- `description`
- `rulesShort`
- `priceEb`

Das hÃ¤lt die EintrÃ¤ge knapp, sauber und wartbar.
Mehr Struktur kann spÃ¤ter gezielt dort ergÃ¤nzt werden, wo ein echter Nutzen entsteht.

---

## 7. Aktueller Referenzbestand
`URoP_Items.json` enthÃ¤lt derzeit **8 Referenzitems**.
Sie dienen als Testbestand fÃ¼r den schlanken Itemkern und nicht als fertiger Vollkatalog.

---

## 8. Update 2026-04-10 â€“ Item-Kern verschlankt
- Aktive Itemstruktur auf **6 Kernfelder** reduziert.
- `kind` bleibt als leichtes Ordnungsfeld erhalten.
- Preise laufen bei Items nur noch Ã¼ber `priceEb`.
- Zusatzlogik wie Skill-Links, Tags, VerfÃ¼gbarkeit oder NachfÃ¼llprofile ist nicht mehr Teil der fÃ¼hrenden Itemstruktur.
