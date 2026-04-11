# URoP – Vor- und Nachteile
Stand: 2026-04-10

## 1. Grundsatz [GELOCKT]
Vor- und Nachteile laufen ab jetzt ueber **eine gemeinsame Struktur**.
Beide Seiten bleiben unterscheidbar ueber `kind`, nutzen aber denselben Feldkern.

## 2. Datenstruktur [GELOCKT]
Fuehrend ist:
- `URoP_Vor_und_Nachteile.json`

Erklaerende Lesefassung:
- `URoP_Vor_und_Nachteile.md`

Ziel ist eine **gut lesbare, schlanke Struktur fuer den Erzaehler** statt halbautomatischer Detailverwaltung.

## 3. Leitlinien [GELOCKT]
Vor- und Nachteile sollen:
- klar umrissen sein
- spielrelevant sein
- identitaetsstark bleiben
- nicht in viele kleine Bonus-/Malusfelder zerfallen
- ohne zusaetzliche Hook-, Tag- oder Stacking-Logik lesbar bleiben

## 4. Aktiver Feldkern [GELOCKT]
- `id`
- `name`
- `kind`
- `tier`
- `rules_short`
- `description`
- `requirements`
- `incompatibilities`

## 5. Feldbedeutung [GELOCKT]
### `id`
Stabile interne Kennung.

### `name`
Anzeigename.

### `kind`
Marker fuer die Grundart:
- `advantage`
- `disadvantage`

### `tier`
Grobe Gewichtung:
- `minor`
- `moderate`
- `major`

Bei Vorteilen ist das die grobe **Kostenklasse**.
Bei Nachteilen ist das die grobe **Rueckgabeklasse**.

### `rules_short`
Kurzregel in 1-2 Saetzen fuer schnellen Tischzugriff.

### `description`
Ausfuehrlicher Regelsinn und Lesefassung.

### `requirements`
Optionale Voraussetzungen als kurzer Text.
Wenn nichts noetig ist, bleibt das Feld leer.

### `incompatibilities`
Optionale Unvertraeglichkeiten als kurzer Text.
Wenn nichts gesperrt ist, bleibt das Feld leer.

## 6. Bewusst gestrichen [GELOCKT]
Nicht mehr Teil der aktiven Struktur:
- `effect_type`
- `stacking`
- `tags`
- `mechanical_hooks`
- `levels`
- `setting_scope`
- `typical_uses`
- `limitations`
- `gm_notes`

Wenn spaeter wieder mehr Ordnung noetig wird, soll das gezielt und nur bei echtem Nutzen zurueckkommen.

## 7. Kosten- und Rueckgabedenke [TESTSTAND]
Aktuell bleibt die grobe Leselogik:
- Vorteile: `minor / moderate / major`
- Nachteile: `minor / moderate / major`

Konkrete Kosten und Rueckgaben werden weiter im Charakterbau gelesen, nicht ueber Zusatzfelder am Eintrag selbst.

## 8. Aktueller Referenzbestand [ARBEITSSTAND]
Vorteile:
- Wachsame Sinne
- Richtungssinn
- Zaeh
- Abgebrueht
- Feldroutine
- Erstversorger
- Szene-Kontakte
- Kampfschule

Nachteile:
- Schlechte Orientierung
- Fragil
- Schreckhaft
- Stolz
- Misstrauisch
- Verpflichtung
- Schulden
- Schlechter Ruf

## 9. Noch offen
- spaetere Feinordnung nur dann, wenn sie am Tisch echten Nutzen bringt
- Kosten und Rueckgaben weiter gegen Spielgefuehl pruefen
- weitere Referenzeintraege schrittweise ergaenzen
