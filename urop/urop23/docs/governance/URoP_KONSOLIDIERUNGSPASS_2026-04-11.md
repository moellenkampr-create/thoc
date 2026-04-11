# URoP Konsolidierungspass
Stand: 2026-04-11
Typ: erster inhaltlicher Abgleich nach Strukturmigration

## Gepruefte Quellen
- 10_core/URoP_Grundregeln.md
- 20_data_json/URoP_Manoever.json
- 20_data_json/URoP_Items.json
- 20_data_json/URoP_Quickhacks.json
- 00_meta/URoP_MANIFEST.md
- 00_meta/URoP_MASTER_Folgechat.md
- 00_meta/URoP_TASKS.md

## Ergebnisueberblick
- Die neue Ordnerstruktur ist in den Meta-Dateien konsistent angekommen.
- Der Datenfokus (JSON fuehrend, MD erklaerend) ist konsistent dokumentiert.
- Der Reaktionskern ist in Grundregeln und Manoeverdaten inhaltlich deckungsgleich.
- Keine harte Inkonsistenz gefunden, die sofortige Regelkorrektur erzwingt.

## Beobachtungen mit Prioritaet
1. Kampfwirkung hat in den Grundregeln weiterhin zwei parallele Linien (Groessen-/Zielmodell vs. W/R-Klassen).
2. Dieser Parallelstand ist bewusst als offen markiert, erzeugt aber mittelfristig Umsetzungsrisiko fuer Foundry.
3. Quickhack-Logik ist sauber als digitaler Eingriff positioniert und in den Kern andockbar.
4. Itemstruktur ist bewusst schlank und wirkt als guter Basiskern fuer Foundry-Import.

## Empfohlener naechster Regelpass
1. Entscheidungsvorlage fuer Kampfwirkungs-Endlinie erstellen (A oder B oder Hybrid mit klarer Dominanz).
2. Danach nur die gewaehlte Endlinie in 10_core festziehen.
3. Ableitungen in 20_data_json und 30_readable_md gezielt nachziehen.
4. TASKS um einen expliziten Punkt erweitern: "Kampfwirkungs-Endlinie finalisieren".

## Kriterien fuer die Endlinien-Entscheidung
- Tischtempo: Wie schnell bleibt die Regel anwendbar?
- Erklaerbarkeit: Wie leicht ist die Regel fuer neue Spielende?
- Datenmodell: Wie sauber laesst sich die Linie in Foundry modellieren?
- Anschlussfaehigkeit: Wie gut passt die Linie zu Groessenstufen, Zielwahl, Schutz und Manoevern?

## Status
- ARBEITSSTAND: konsolidiert
- OFFEN: Endentscheidung Kampfwirkung
