# URoP Foundry Release Notes

## [0.1.53] - 2026-09-05

### Added
- Neuer Actor-Typ `vehicle` mit Vergleichswerten für Geschwindigkeit, Beschleunigung und Manövrierbarkeit, frei beschreibbaren Vergleichseinheiten, Sektionen und konfigurierbaren Strukturkonsequenzen.
- Neues Item `vehicle_module` für Antrieb, Tank, Crew, Laderaum, Sensorik, Steuerung, Netz/Kommunikation und weitere Einbauten; jedes Modul führt Tier, Größe, Preis, Verfügbarkeit und Voraussetzungen.
- Neue Compendia `URoP Fahrzeuge` mit Motorrad, gepanzertem Auto und LKW sowie `URoP Fahrzeugmodule` mit acht Beispielen.
- Charaktere können Vehicle-Actors auf der Ausrüstungsseite zuordnen und die Beziehung notieren.

### Changed
- Gear erhält Lagerort/Montage und Platzbedarf; Waffen und Rüstungen können über Tier, Sektion und Montage/Geltungsbereich auf Vehicle-Actors verwendet werden.

### Migration Required
- yes
- Bestehende Charaktere erhalten eine leere Fahrzeugzuordnung; Waffen und Rüstungen erhalten sichere Standardwerte für Fahrzeugmontage.

## [0.1.52] - 2026-08-31

### Changed
- Die automatische EP-Summe umfasst nur noch Attribute und Fertigkeiten. Manöver und Quickhacks sind kostenfreie Optionen.
- Manöver und Quickhacks besitzen Voraussetzungen und werden bei erfüllten Voraussetzungen mit Spielleiterzustimmung gewählt.
- Parent-Verknüpfungen von Fertigkeiten erzeugen keine separate Freischaltungskosten mehr.
- Manöver- und Quickhack-Daten sowie das Manöver-Compendium enthalten keine aktiven Lernkostenfelder mehr.
- Vor- und Nachteile erhalten ein strukturiertes Feld für individuell festgelegte EP-Kosten beziehungsweise Rückgaben.

### Fixed
- Manuell angelegte Fertigkeiten zeigen ihr gesetztes Attribut als Regelanker, wenn keine eigene Regelanker-Liste hinterlegt ist.

### Migration Required
- yes
- Alte `system.learnCostEp`-Felder werden bei Quickhacks und Manövern entfernt.

## [0.1.51] - 2026-08-31

### Added
- Manöver erhalten wie Quickhacks eine charakterspezifische Fertigkeitszuordnung und einen numerischen Tierwert auf der Skala 0 bis 6.
- Manöver-Tab als Tabelle mit Name, Drei-Würfel-Probe und Einsatzfenster erweitert.
- Neues Item-Compendium `URoP Manöver` im Folder `URoP System` aus 38 strukturierten Manöver-Einträgen erzeugt.

### Changed
- Bestehende Manöver-Tiers von `T0-T3` auf numerische Werte `0-3` migriert; Tier 4 bis 6 bleibt für spätere Referenzmanöver und Balancing offen.

### Migration Required
- yes
- Bestehende Manöver erhalten `system.skillItemId = ""`; alte Tierwerte `T0-T3` werden in `0-3` überführt.

## [0.1.50] - 2026-08-28

### Fixed
- Doppelte Quickhack-Felder für Fertigkeit und Tier entfernt.
- Quickhack-Sheet verwendet wieder genau ein Feld für `skillItemId` und ein Feld für `tier`, sodass Auswahl und Tierwert beim Speichern erhalten bleiben.
- Doppelte `getData()`-Definition im Quickhack-Sheet entfernt.

### Migration Required
- no

## [0.1.49] - 2026-08-28

### Added
- Quickhacks erhalten Tier `0-6` und eine charakterspezifische Fertigkeitszuordnung ueber lokale Skill-Item-IDs.
- Quickhack-Details zeigen nur Fertigkeiten des jeweiligen Charakters zur Auswahl an.
- Cyberkampf-Wuerfe geben Quickhack-Name, Tier, Fertigkeitsname, Fertigkeitsebene und Fertigkeitsstufe kompakt aus.
- Quickhack-Regeln um Netzwerk-/Node-/System-/Subsystem-Hierarchie, Apps, Direktzugriff, Einzelwurf, Zustaende, Dauer, Wirkung und Risiko erweitert.

### Migration Required
- yes
- Bestehende Quickhacks erhalten `system.tier = 0` und `system.skillItemId = ""`, falls die Felder fehlen.

## [0.1.48] - 2026-08-23

### Fixed
- Fertigkeiten-Compendium korrigiert: Die drei Folder-IDs entsprechen jetzt der von Foundry v14 geforderten Länge von 16 alphanumerischen Zeichen.
- Verhindert den System-Ladefehler beim Initialisieren von `urop.urop-skills`.

### Migration Required
- no

## [0.1.47] - 2026-08-23

### Added
- Neues Item-Compendium `URoP Fertigkeiten` im bestehenden Folder `URoP System`.
- 73 Fertigkeiten aus dem strukturierten Importbestand übernommen und nach Kampffertigkeiten, Aktionsfertigkeiten und Flufffertigkeiten aufgeteilt.
- Reproduzierbarer Generator und Regressionstest für den Fertigkeits-Pack ergänzt.

### Migration Required
- no

## [0.1.46] - 2026-08-22

### Changed
- Beschädigte Actor-Sheet-Struktur für Übersicht und Attribute korrigiert; Attribute werden wieder sauber in drei Leitattributkarten gerendert.
- Boni/Mali-Markup vollständig aus der aktiven Attributdarstellung entfernt.
- Neue Anpassbarkeits-Box und datengetriebene Attributgruppen gegen Template-Regressionen abgesichert.

### Migration Required
- no

## [0.1.45] - 2026-08-22

### Changed
- Alte Boni/Mali-Struktur aus Character-Sheet, Datenmodell und aktiver Berechnungslogik entfernt; bestehende Legacy-Felder werden migriert.
- EP-Berechnung auf 30 EP pro natuerlicher Attributstufe relativ zu Basiswert 2 sowie Fertigkeitskosten pro Stufe umgestellt.
- Item-Aktionen speichern den aktuellen Actor-Formularstand vor dem Erstellen oder Loeschen eingebetteter Items.
- Tests fuer Datenmodell, Migration, Item-Aktionen und Formularsicherung ergaenzt.

### Migration Required
- yes
- Bestehende Actors erhalten Anpassbarkeit 6, falls das Feld fehlt, und verlieren die alten Boni/Mali-Felder.

## [0.1.44] - 2026-08-22

### Changed
- Redundantes hinteres Fertigkeitswertfeld aus dem Fertigkeitsdetail entfernt; der aktuelle Wert bleibt im Stepper zwischen Minus- und Plus-Button sichtbar.

### Migration Required
- no

## [0.1.43] - 2026-08-22

### Changed
- Boni/Mali-Textfeld aus der Übersicht und sichtbare Boni/Mali-Steuerelemente aus der Attributseite entfernt.
- Sonderattribut-Box mit Anpassbarkeit und Standardwert 6 ergänzt; bestehende Actors erhalten den Wert per Migration.
- Direkte Erstellen-Buttons für Fertigkeiten, Cyberkampf, Manöver und alle Ausrüstungsbereiche ergänzt.
- Rechtsklick auf bestehende Items öffnet eine Löschbestätigung und entfernt das Item direkt aus dem Charakter.

### Migration Required
- yes
- Bestehende Charaktere erhalten `system.specialAttributes.adaptability = 6`, sofern das Feld noch fehlt.

## [0.1.42] - 2026-08-22

### Changed
- Fertigkeitsdetail-Stepper mit festen Bedienelementbreiten und rechts verankerter Wertebox ausgeliefert.

### Migration Required
- no

## [0.1.41] - 2026-08-21

### Changed
- Fertigkeitsdetail-Stepper mit fester Rasterbreite korrigiert; Minus-Button und Wertanzeige bleiben innerhalb des Rahmens.
- Quickhacks aus der Ausrüstungsseite in einen eigenen Tab `Cyberkampf` verschoben.
- Cyberkampf-Tabelle um Drei-Würfel-Probenbuttons und die Quickhack-Typanzeige ergänzt.
- Quickhack-Proben erscheinen im Chat als `Cyberkampfprobe` ohne nicht vorhandene Fertigkeitsstufe.

### Migration Required
- no

## [0.1.40] - 2026-08-21

### Changed
- Fertigkeiten auf der Fertigkeiten-Seite nach Kampffertigkeiten, Aktionsfertigkeiten und Flufffertigkeiten gruppiert.
- Kampffertigkeiten, Waffen und Rüstungen auf der Kampfseite in getrennten Fenstern dargestellt.
- Kampffertigkeiten auf der Kampfseite um kompakte Drei-Würfel-Proben und die Stufe-Spalte ergänzt.
- Ausrüstungsbereiche auf der Ausrüstungsseite in eigene Fenster aufgeteilt.
- Manöver-Reiter direkt hinter den Kampf-Reiter verschoben.
- Fertigkeitsdetail um ein rechtsbündiges Anzeigefeld für den aktuellen Wert ergänzt.

### Migration Required
- no

## [0.1.39] - 2026-08-21

### Changed
- Fertigkeiten-Tabelle durch kompaktere Zeilen und kleinere Probe-Buttons verdichtet.
- Probe-Spalte und Drei-Wuerfel-Buttons mittig ausgerichtet; Stufe rechtsbuendig ausgerichtet.
- Hover-Tipp am Probe-Button zeigt Fertigkeitsname und Probenstufe an.

### Migration Required
- no

## [0.1.38] - 2026-08-21

### Added
- Erstes systemeigenes Journal-Compendium `URoP Documentation` im Folder `URoP System`.
- Release Notes, Versionierungsschritte und Pack-Workflow als Foundry-Journal im Compendium dokumentiert.
- Editierbare Pack-Quelle unter `src/packs/urop-documentation/` und kompilierter v11+/v14-Pack unter `packs/urop-documentation/`.

### Migration Required
- no

## [0.1.37] - 2026-08-21

### Changed
- Ausfuehrlicher lokaler Foundry-Entwicklungsleitfaden fuer Systemstruktur, Manifest, v14-API, DataModels, Sheets, Migrationen, Packs und Release-Pruefung ergaenzt.
- Entwicklungsleitfaden in das Ruleset-ZIP aufgenommen.

### Migration Required
- no

## [0.1.36] - 2026-08-15

### Changed
- Fertigkeiten-Seite als tabellarische Liste mit alternierenden Zeilenfarben neu gestaltet.
- Proben-Button pro Fertigkeit ergänzt: „Probe: Stufe x“ mit 3W6-Auslösung und Chat-Ergebnis.
- Regelanker werden in der Fertigkeiten-Tabelle lesbar dargestellt und bleiben in konsistenter Reihenfolge sichtbar.
- Name der Fertigkeit bleibt separat anklickbar, damit das Item direkt geöffnet werden kann.

### Migration Required
- no

## [0.1.35] - 2026-08-15

### Changed
- Reiter-Buttons auf der rechten Seite als kleine Flaggen-/Anhänger-Buttons neu gestaltet, mit identischer Grundform pro Seite und aktivem Highlight des geöffneten Tabs.
- Layout entsprechend der gewünschten Mockup-Richtung angepasst: am Charakterblatt hängende Tab-Flags statt flacher Rechteckleiste.
- Header bleibt über alle Seiten hinweg identisch; aktive Seite wird durch Rahmen/Highlight und höhere Vordergrund-Ebene deutlich markiert.

### Migration Required
- no

## [0.1.34] - 2026-08-15

### Changed
- Charakterblatt-Tab-Navigation von der oberen Sheet-Zone auf die rechte Seitenleiste verschoben; Header bleibt auf allen Seiten konstant.
- Layout nach der gewünschten Mockup-Struktur angepasst: schnelle Interaktion im Kopfbereich, Reiter rechts, Inhalte links im Sheet.
- Textbasierte Boni/Mali-Erweiterung im Charakterblatt ergänzt und kompatibel gehalten.

### Migration Required
- no

## [0.1.33] - 2026-08-15

### Changed
- Boni/Mali als freie Textliste im Actor-Datenmodell ergänzt (`system.modifiersText`), damit kurze Formulierungen wie `Athletics +1` und optionale Erklärungen flexibel gespeichert und im Character Sheet dargestellt werden können.
- Character Sheet um ein freies Boni/Mali-Textfeld erweitert; bestehende numerische Attribut-Modifikatoren bleiben kompatibel erhalten.

### Migration Required
- no

## [0.1.32] - 2026-07-25

### Changed
- Systemmanifest auf Version `0.1.32` angehoben.
- Kompatibilitaet auf Foundry VTT **v14 Stable 7 (Build 365)** verifiziert (`compatibility.verified = 14.365`).

### Migration Required
- no

## [0.1.30] - 2026-06-03

### Added
- Neuer Itemtyp `quickhack` inkl. Registrierung in `system.json`, `template.json` und Actor-Item-Gruppierung
- Eigenes Quickhack-Item-Sheet mit Feldern fuer Klasse, Aktionskosten, Einsatzfenster, Eskalation, Verfuegbarkeit, Zugriff und Risiko

### Changed
- Lokalisierung (de/en) um Quickhack-Felder, Enums und `ItemType.quickhack` erweitert
- Migrationslogik setzt fehlende Default-Felder fuer bestehende Quickhack-Items beim Weltenstart
- Quickhack-Referenzdaten im Ruleset um weitere Cyberpunk-Wiki-inspirierte Hacks erweitert (u. a. Ping, Contagion, Overheat, System Collapse)
- Lesefassung `URoP_Quickhacks.md` auf den erweiterten Referenzbestand und EP-Nullkostenstand synchronisiert

### Migration Required
- yes
- Bestehende Welten erhalten fuer Quickhack-Items fehlende Standardfelder bei der Migration nachgezogen

## [0.1.29] - 2026-06-03

### Changed
- EP-Berechnung für Fertigkeits-Items vereinfacht: `learnCostEp` wird direkt addiert
- Keine zusätzlichen Fokus- oder Überhang-Zuschläge mehr auf Fertigkeitskosten in der Foundry-Berechnung
- Regeltext für Fertigkeitskosten auf linearen Kostenrahmen mit 3x-Sammelfertigkeit umgestellt

### Migration Required
- no

## [0.1.28] - 2026-05-31

### Changed
- Cyberware trennt jetzt allgemeine Beschreibung und spezifische Effektbeschreibung sauber in zwei Felder
- Authoring-Hinweis und Hover-Help auf die neue Trennung von Beschreibung und Regelwirkung abgestimmt
- Glossar und Schema um das zusätzliche Cyberware-Feld `specificEffectDescription` erweitert

### Migration Required
- yes
- Bestehende Cyberware-Items erhalten das neue Feld `specificEffectDescription`

## [0.1.27] - 2026-05-31

### Changed
- Neuer Itemtyp `cyberware` mit eigenem Sheet, eigener Registrierung und Actor-Listendarstellung
- Kompaktes Cyberware-Feldmodell umgesetzt: Aktivierungstyp, Mod-Slot-Boolean, Verfügbarkeit/Legalität, Einbauort/Art, Wartung/Energie/Hackbarkeit, Risiken/Nebenwirkungen
- Hover-Hilfen (de/en) und Authoring-Hinweisblock für konsistentes Ausfüllen ergänzt
- Glossar um verbindliche Cyberware-Felddefinitionen erweitert

### Migration Required
- yes
- Bestehende Cyberware-Items erhalten fehlende Default-Felder beim Weltenstart

## [0.1.26] - 2026-05-31

### Changed
- Rüstungs-Sheet erweitert: Preis, Voraussetzungen und Liste für schadensartspezifische Schutzwerte
- Schadensartspezifische Schutzwerte als dynamische Liste mit Add/Remove, Default-Zeile und Lösch-Bestätigung
- Regeltexte und Glossar auf das neue Rüstungs-Schema abgeglichen

### Migration Required
- yes
- Bestehende Rüstungen erhalten neue Default-Felder (`price`, `prerequisitesText`, `protectionByDamageType`)

## [0.1.25] - 2026-05-31

### Changed
- Waffen-Sheet: sichtbarer Hinweisblock zur Textstruktur (Kurztext, Voraussetzungen, Beschreibung)
- Lokalisierte Hilfetexte fuer den Waffen-Authoring-Hinweis (de/en)

### Migration Required
- no

## [0.1.24] - 2026-05-31

### Changed
- Waffen-Sheet um Schadensart, Initiative-Modifikator und Voraussetzungen erweitert
- Waffen-Struktur standardisiert: Kurztext, Voraussetzungen, Beschreibung mit klarer Langtext-Logik
- Regeltexte und Glossar auf einheitliches Waffen-Schema abgeglichen

### Migration Required
- yes
- Bestehende Waffen erhalten neue Default-Felder fuer Schadensart, Initiative-Modifikator und Voraussetzungen

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
