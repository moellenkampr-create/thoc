# URoP Foundry Release Notes

## [0.1.23] - 2026-05-31

### Changed
- Item-Sheets (Skill, Manöver, Waffe, Rüstung, Ausrüstung, Verbrauch): Feldüberschriften mit Hover-Hilfe ergänzt
- Neue Lokalisierungssektion `URoP.ItemHelp` (de/en) für kurze Feld-Erklärungen

### Migration Required
- no

## [0.1.22] - 2026-05-30

### Changed
- Manöver-Sheet: `tier`, `actionCost` und `usageWindow` als Auswahlboxen statt Freitext
- Manöver-Sheet: Tier-Auswahl zeigt Key plus Lesetext (`T0 - Grundmanöver` etc.)
- Shared-Regellogik erweitert: `small_action`, `four_actions` und `prepared`
- Finisher-Referenzdaten auf das neue Einsatzfenster `prepared` umgestellt

### Migration Required
- yes
- Bestehende Finisher-Manöver mit `usageWindow = once_per_scene` werden bei Weltenstart auf `prepared` migriert

## [0.1.21] - 2026-05-30

### Changed
- Refactoring: Separate Sheet-Klassen und Templates pro Item-Typ (skill, maneuver, weapon, armor, gear, consumable)
- Gemeinsame Basis `UropItemSheetBase`, jede Typ-Klasse erbt davon
- JS-Dateien in `scripts/sheets/items/`, Templates in `templates/items/`
- `urop.mjs` registriert jeden Typ einzeln mit eigenem Sheet

## [0.1.20] - 2026-05-30

### Changed
- Item-Sheet: Tab-Reihenfolge geändert – "Beschreibung" (ex-Effekte) als erster Reiter, Details zweiter
- Item-Sheet: "Effekte"-Tab umbenannt zu "Beschreibung"
- Item-Sheet: Fertigkeiten – Konsequenzdomäne-Feld entfernt
- Item-Sheet: Fertigkeiten – Stufe als Stepper mit Sperr-Button (standardmäßig gesperrt)
- Item-Sheet: Initaler Tab ist nun "Beschreibung" statt "Details"

### Fixed
- CSS: Select-Boxen schnitten Optionstext unten ab (min-height/padding-Fix)

## [Unreleased]

### Added
- n/a

### Changed
- n/a

### Fixed
- n/a

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.19] - 2026-05-30

### Added
- Bestaetigungsdialog beim Loeschen von Geldspeicherorten im Charakterblatt eingebaut.

### Changed
- Geldspeicherort-Entfernen auf kompakten X-Button umgestellt und Listenlayout verdichtet.
- Attribut-Layout (Kartenbreite/Spaltenbreiten) komprimiert; bei schmaleren Breiten responsiver 2-Spalten-Fallback ohne horizontales Seitenscrollen.

### Fixed
- Initiale Vorbelegung von Geldspeicherorten auf leere Erstzeile (Ort/Waehrung leer, Bestand 0) korrigiert.
- Speichern der Geldspeicherorte stabilisiert, sodass Zeilen beim Eingeben/Tabben nicht mehr verschwinden oder geleert werden.

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.18] - 2026-05-30

### Added
- Ressourcenbereich im Charakterblatt um Geldbestaende mit dynamischen Speicherorten erweitert (`system.resources.moneyStores`).
- Pro Geldspeicherort Felder fuer Aufbewahrungsort, Inhalt/Waehrung und Bestand eingebracht.

### Changed
- Attribut-Ansicht zeigt jetzt explizit Boni/Mali, Wert und Gesamt fuer alle 12 Attribute.
- Leitattribute zeigen in der Kopfzeile jetzt Wert (abgeleitet) und Gesamt (inkl. Lead-Boni/Mali) getrennt an.
- EP-/Initiative-Berechnungen nutzen konsistent die aktualisierte Modifier-Struktur.

### Fixed
- EP-Kostenberechnung bleibt bei Basisattributen stabil und wird nicht durch temporaere Boni/Mali verfremdet.

### Migration Required
- no

### Migration Notes
- Bestehende Charaktere ohne `system.resources.moneyStores` erhalten im Sheet automatisch einen initialen Eintrag; keine manuelle Migration notwendig.

---

## [0.1.17] - 2026-05-30

### Added
- Unit-Test-Suite fuer zentrale Rechenlogik (`tests/urop-calculations.test.mjs`) verbindlich im Ruleset aufgenommen.
- Reine Berechnungshelfer in `scripts/urop-calculations.mjs` als testbare Kernlogik eingebracht.

### Changed
- Feldschema in Daten- und Foundry-Logik auf konsistentes camelCase umgestellt (inkl. Skill-/Manoever-/Quickhack-Feldern).
- Sheet- und Datenbindung auf abgeleitete Leitattribute + neue Attributstruktur vereinheitlicht.

### Fixed
- Inkompatibilitaeten durch gemischte Feldkonventionen in Ruleset-Datenpfaden bereinigt.

### Migration Required
- yes (Feldkonventionen/Struktur geaendert; bestehende Inhalte pruefen)

### Migration Notes
- Systeme mit Altfeldern in snake_case auf camelCase-Schema angleichen.

---

## [0.1.16] - 2026-05-30

### Changed
- Charakterschema auf die neue Leitattribut-/Attributstruktur umgestellt.
- Fokusauswahl verwendet jetzt Leitattribute; Initiative wird aus dem gewaehlten Leitattribut abgeleitet.
- Charakterblatt zeigt abgeleitete Leitattribute, Widerstand und Initiative im Temp-Reiter an.

### Fixed
- EP-Berechnung und Fokusmodifikatoren nutzen jetzt die neue Attributstruktur mit kaufmaennischer Rundung.

### Migration Required
- yes (neues Charakterdatenmodell; bestehende Charaktere werden nicht automatisch konvertiert)

### Migration Notes
- Alte Charaktere sind fuer diesen Stand nicht kompatibel und koennen wie besprochen entfernt werden.

---

## [0.1.15] - 2026-05-28

### Fixed
- EP-Neuberechnung ist jetzt robust gegen gemischte Import-Feldnamen (CamelCase und snake_case), damit importierte Skill-/Manoeverkosten wieder korrekt eingerechnet werden.
- EP-Summierung wurde NaN-sicher gemacht, damit einzelne ungueltige Importwerte die Gesamtsumme nicht mehr auf 0 oder ungueltig ziehen.

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.14] - 2026-05-28

### Added
- Charakter-Feld `system.sizeClass` (Größenstufe, Default G3)
- Waffenfelder: `system.designedForSizeClass`, `system.effectiveAgainstClass`, `system.rangeBands` (Nah/Mittel/Weit/Extrem)
- Rüstungsfeld: `system.userSizeNominal`
- Migration ergänzt: füllt neue Größen-/Reichweitenfelder in bestehenden Welten mit Standardwerten

### Changed
- Waffen-/Rüstungsinfos im Charakterblatt erweitert (Größenbezug, Schutzwert, Distanzbänder)
- EP-Neuberechnung berücksichtigt jetzt Überhangkosten bei Fertigkeiten (+1 über Attribut = +30 EP, +2 und mehr = +90 EP)

### Fixed
- Regelstand und Ruleset bei Facettenkosten harmonisiert (lineare Abweichungskosten ±40 EP pro Stufe)

### Migration Required
- yes (automatisch beim ersten Start nach Update)

### Migration Notes
- Neue Felder werden bei Charakteren, Waffen und Rüstungen automatisch ergänzt.

---

## [0.1.13] - 2026-05-27

### Fixed
- Lesbarkeit der farbigen URoP-Probenanzeige im Chat verbessert (explizite Kontrastfarben fuer Titel, Text und Hervorhebungen)

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.12] - 2026-05-27

### Changed
- Character-Sheet bereinigt: Druckstatus nur noch einmal gebunden (Kampfseite), konflikttraechtige Doppelbindung entfernt
- Uebersichts-Notizfeld mit Druckbindung entfernt; Kampfseite nutzt fuer positive Effekte nur noch `Boosts`
- Roll-Outcome-Code aufgeraeumt und kurz dokumentiert (Banding relativ zum Standardoutcome)

### Fixed
- Komma-Ketten in Feldern durch doppelte Formularpfade behoben
- Druckstatus wird nicht mehr durch zweite Auswahl im Temp-Reiter ueberschrieben
- Unnoetige/dead Lokalisierungskeys und ungenutzte Hilfsmethode aus dem Code entfernt

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.11] - 2026-05-27

### Fixed
- Syntaxfehler in der URoP-Probenauswertung bereinigt, der das Laden des Systemmoduls blockierte
- Custom Actor-/Item-Sheets werden dadurch wieder korrekt registriert statt auf Foundry-Default zurückzufallen

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.10] - 2026-05-27

### Added
- Neues Actor-Feld `system.combat.boostNotes` fuer freie Boost-Notizen auf der Kampfseite
- Chat-Farbcodierung fuer URoP-Probenausgabe (schlechter, unter Standard, Standard, ueber Standard, besser)

### Changed
- Reiter `Konsequenzen` in `Kampf` umbenannt und um Kampfuebersicht (Kampffertigkeiten, Waffen, Ruestung) erweitert
- URoP-Probenauswertung auf standardorientierte Begriffe umgestellt: `Schlechter`, `Unter Standard`, `Standard`, `Ueber Standard`, `Besser`
- Probenanzeige zeigt den gewuerfelten 3W6-Wert direkt im Chat an

### Fixed
- Outcome-Baender auf 3W6-Leitwerte abgestimmt (3-5, 6-8, 9-12, 13-15, 16-18)

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.9] - 2026-05-27

### Changed
- Item-Typ-Label in deutscher UI von `Neue Fertigkeit` auf `Fertigkeit` angepasst
- Item-Sheet-Tab fuer interne Inhalte klar als `Intern` bezeichnet

### Fixed
- Attributkosten geben bei niedrigen Werten EP zurueck (Wert 1 = -40, Wert 0 = -90)
- Kostenberechnung klemmt Attributwerte unter 0 auf 0 (nur fuer EP-Berechnung)
- Label im internen Item-Notizbereich auf `Interne Notiz` vereinheitlicht

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.8] - 2026-05-27

### Changed
- EP-Gesamtrechnung fuer Skill-Items nutzt jetzt `learnCostEp` aus dem Charakter-Skill und wendet Fokusmodifikator ueber passende Regelanker an
- Skills-Liste auf dem Charakter zeigt Name, drei Regelanker und Stufe statt EP-Wert
- Skill-Sortierung verbessert: Anwendungsklasse -> Fertigkeitsebene -> Name
- Skill-Maske: drei Regelanker als Auswahllisten (Regelanker 1 Pflicht, Regelanker 2/3 optional mit `-`)
- Plus-Buttons fuer Skill/Waffe/Ausruestung/Verbrauch entfernt; Workflow jetzt per Drag-and-Drop aus Sidebar

### Fixed
- Klick auf Listeneintraege nutzt jetzt Button-Interaktion statt Linknavigation (kein unerwuenschtes Browserfenster)
- Item-Sheet-Feldlabels und Kurztext/Beschreibung in deutscher UI konsistent benannt
- Fehlender Lokalisierungseintrag fuer `URoP.Tab.Notes` ergaenzt

### Migration Required
- no

### Migration Notes
- Fuer bestehende Skill-Items ohne Regelanker 1 sollte ein passender erster Regelanker manuell gesetzt werden.

---

## [0.1.7] - 2026-05-27

### Added
- Neuer Item-Typ `skill` mit eigener Feldmaske (u. a. Name, Beschreibung, Anwendungsklasse, Regelanker, Voraussetzungen, Lernkosten)
- Neuer Item-Typ `consumable` fuer Verbrauchsgegenstaende
- Charakterblatt: Fertigkeiten als klickbare Item-Liste mit Hover-Beschreibung und direktem Oeffnen der Skill-Maske
- Charakterblatt: Erstellen-Buttons je Bereich fuer Fertigkeiten, Ausruestung, Verbrauch, Waffen und Ruestung

### Changed
- Item-Sheet zeigt jetzt typabhaengige Feldmasken statt einer gemischten Universalmaske
- Ausruestungsdarstellung aufgeteilt in Ausruestung, Verbrauchsgegenstaende, Waffen und Ruestung
- Lokalisierung: Tab `Items` als `Ausrüstung/Equipment` umbenannt

### Fixed
- Itemtyp-Registrierung auf neue Typen erweitert (`consumable`, `skill`)

### Migration Required
- no

### Migration Notes
- Bestehende Welten koennen alte numerische Charakter-Skills weiter enthalten; neuer Skill-Workflow laeuft ueber Item-Typ `skill`.

---

## [0.1.6] - 2026-05-27

### Changed
- Tooltip-Icon-Styling von allgemeinen Hover-Tooltips getrennt, damit Labeltexte nicht mehr als runde Icon-Elemente gerendert werden
- Facetten-Grid für Kopf- und Wertzeilen vereinheitlicht, damit "Abw." und "Gesamt" direkt über den zugehörigen Spalten stehen
- Gesamtwerte in der Facettenspalte mittig ausgerichtet

### Fixed
- Facettenbezeichnungen laufen nicht mehr sichtbar aus der Box, lange Begriffe umbrechen jetzt kontrolliert

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.5] - 2026-05-27

### Added
- Automatische EP-Aktualisierung bei Fokuswechsel und Stepper-Änderungen im Attribute-Reiter

### Changed
- Facettenlayout auf konsistentes Grid umgestellt, damit Spaltenüberschriften und Werte sauber ausgerichtet sind
- Facettenlabels dürfen umbrechen, damit Texte nicht mehr aus den Boxen laufen

### Fixed
- "Abw." steht jetzt über dem Abweichungswertbereich statt über dem Minus-Button
- EP-Anzeige bleibt nach Fokus-/Wertänderungen nicht mehr auf veralteten Werten stehen

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.4] - 2026-05-27

### Added
- Facetten-Kopfzeile mit "Abw." (inkl. Hover-Erläuterung) und "Gesamt" für kompaktere Darstellung

### Changed
- Facettenzeilen zeigen in der Zusatzspalte nur noch den Gesamtwert statt wiederholter Textlabels

### Fixed
- EP-Neuberechnung berücksichtigt jetzt Hauptattribut-Modifikatoren auf Attributkosten
- EP-Neuberechnung berücksichtigt jetzt Hauptattribut-Modifikatoren auf Facettenkosten
- Rundung der modifizierten Kosten erfolgt zugunsten des Spielers

### Migration Required
- no

### Migration Notes
- n/a

---

## [0.1.3] - 2026-05-27

### Added
- Hauptattribut-Auswahl (Körper/Geist/Präsenz) im Attribute-Reiter mit eigener Sperre
- Anzeige von Facetten-Abweichung und automatisch berechnetem Facetten-Gesamtwert je Facette

### Changed
- EP-Neuberechnung für Attribute auf progressive Kosten (ab Basis 2): 3=40, 4=90, 5=160, 6=260
- EP-Neuberechnung für Facetten auf lineare Kosten: +40/-40 pro Stufe Abweichung

### Fixed
- Begrenzung der Hauptattribut-Auswahl auf maximal zwei Einträge mit Hinweis bei dritter Auswahl

### Migration Required
- no

### Migration Notes
- Bestehende Charaktere erhalten Fokus-Felder automatisch mit Standardwerten beim ersten Speichern.

---

## [0.1.1] - 2026-05-26

### Added
- EP-Aktualisieren-Button auf dem Charakterblatt
- Hover-Hilfe fuer EP-Neuberechnung

### Changed
- Probe-Button auf "URoP Probe" umbenannt
- URoP Probe gibt Ergebnistext statt nacktem Zahlenwert aus
- Uebersicht/Temp-Reiter fuer klarere Struktur neu geordnet
- Deutsche Anzeigenamen auf korrekte Umlaute vereinheitlicht

### Fixed
- Manifest-/Download-Metadaten fuer Install-/Updatepfad verankert

### Migration Required
- no

### Migration Notes
- Bei bestehender lokaler Installation ohne Manifest: einmal neu ueber Manifest-URL installieren.

---

## [0.1.0] - 2026-05-25

### Added
- Initiales Foundry v14 Systemgeruest fuer URoP
- Charakterblatt mit mehreren Tabs
- Itemblatt fuer gear/weapon/armor/maneuver
- 3W6 Probe und Initiative-Vergleichsprobe (unterstuetzend)

### Changed
- n/a

### Fixed
- n/a

### Migration Required
- no

### Migration Notes
- n/a
