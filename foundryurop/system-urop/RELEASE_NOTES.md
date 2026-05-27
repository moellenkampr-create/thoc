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
