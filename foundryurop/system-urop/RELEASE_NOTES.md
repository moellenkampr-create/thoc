# URoP Foundry Release Notes

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
- EP-Gesamtrechnung fuer Skill-Items nutzt jetzt `learn_cost_ep` aus dem Charakter-Skill und wendet Fokusmodifikator ueber passende Regelanker an
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
