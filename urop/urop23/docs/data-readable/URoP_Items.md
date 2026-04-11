# URoP – Items
Stand: 2026-04-10

## 1. Zweck dieser Datei
Diese Datei erklärt die **aktive Itemstruktur** des URoP-Regelwerks.
Die führende Datenquelle für allgemeine Ausrüstung ist:
- `URoP_Items.json`

Die Itemstruktur ist absichtlich **schlank**.
Sie soll am Tisch, im Regelwerk und später in Foundry schnell lesbar bleiben.

---

## 2. Grundsatz
Für allgemeine Items gilt in URoP:
- **so viel Struktur wie nötig**
- **so wenig Pflege wie möglich**
- Fließtext ist oft hilfreicher als zusätzliche Pflichtfelder

Items sollen in der Regel nicht schon die Spielleitung ersetzen.
Sie sollen vor allem sagen:
- Was ist das?
- Was tut es grob?
- Was kostet es?

---

## 3. Aktiver Kern
Die aktive Itemstruktur behält nur diese Felder:
- `id`
- `name`
- `kind`
- `description`
- `rules_short`
- `price_eb`

### `id`
Stabile interne Kennung für Pflege, Import und Foundry.

### `name`
Klarer Anzeigename des Gegenstands.

### `kind`
Grobe Einordnung des Gegenstands.
Dieses Feld bleibt vor allem für Ordnung, Listen und spätere Foundry-Unterordner erhalten.

### `description`
Beschreibender Fließtext.
Hier können Weltgefühl, typische Nutzung, auffällige Eigenschaften, rechtliche Besonderheiten oder andere Hinweise stehen.

### `rules_short`
Kurze regeltechnische Kernaussage.
Dieses Feld soll knapp bleiben und nur sagen, was das Item regeltechnisch grob bewirkt oder ermöglicht.

### `price_eb`
Referenzpreis in **EB**.
Alias: **ebbies / Eurodollar / Eurobuck**.

---

## 4. Was bewusst nicht mehr im Kern steckt
Folgende Felder gehören **nicht mehr** zur aktiven Itemstruktur:
- `subcategory`
- `tags`
- `skill_links`
- `availability`
- `legal_status`
- `bulk`
- `concealability`
- `durability`
- `quantity_mode`
- `setting_scope`
- `use_profiles`
- `mechanical_hooks`
- `refill_profile`
- `refill_cost_eb`
- `special_notes`

Grund:
Diese Felder erzeugen für allgemeine Items mehr Pflege- und Driftaufwand als echten Nutzen.
Wenn solche Informationen wichtig sind, können sie im Fließtext stehen oder in spezialisierte Datenschemata wandern.

---

## 5. Verhältnis zu spezialisierten Dateien
Die schlanke Itemstruktur gilt für **allgemeine Ausrüstung**.
Tiefer regelrelevante Objektgruppen dürfen eigene stärkere Schemata behalten, z. B.:
- Waffen
- Schutz und Rüstung
- Cyberware
- Vehicles
- Quickhacks und Netrunning als eigene Systemblöcke

URoP trennt damit bewusst zwischen:
- **allgemeinen Items** mit leichtem Kern
- **Spezialdaten** mit mehr Struktur, wenn das Spiel sie wirklich braucht

---

## 6. Foundry-Nutzung
Für allgemeine Items reicht in Foundry meist:
- `id`
- `name`
- `kind`
- `description`
- `rules_short`
- `price_eb`

Das hält die Einträge knapp, sauber und wartbar.
Mehr Struktur kann später gezielt dort ergänzt werden, wo ein echter Nutzen entsteht.

---

## 7. Aktueller Referenzbestand
`URoP_Items.json` enthält derzeit **8 Referenzitems**.
Sie dienen als Testbestand für den schlanken Itemkern und nicht als fertiger Vollkatalog.

---

## 8. Update 2026-04-10 – Item-Kern verschlankt
- Aktive Itemstruktur auf **6 Kernfelder** reduziert.
- `kind` bleibt als leichtes Ordnungsfeld erhalten.
- Preise laufen bei Items nur noch über `price_eb`.
- Zusatzlogik wie Skill-Links, Tags, Verfügbarkeit oder Nachfüllprofile ist nicht mehr Teil der führenden Itemstruktur.
