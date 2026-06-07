# URoP â€“ Fertigkeiten
Stand: 2026-04-08

## 1. FÃ¼hrende Datenquelle
FÃ¼r Fertigkeiten gilt ab jetzt:
- `URoP_Fertigkeiten.json` = **fÃ¼hrende Datenquelle** fÃ¼r Feldschema und EintrÃ¤ge
- `URoP_Fertigkeiten.md` = erklÃ¤rende Lesefassung, Regeltext und Designhinweise

Die JSON-Datei ist die spÃ¤tere Import- und Datenbankbasis. Diese MD-Datei erklÃ¤rt Aufbau, Begriffe und aktive Strukturregeln.

---

## 2. Fertigkeitsebenen [GELOCKT / ARBEITSSTAND]
URoP kennt bis zu vier Ebenen:
- Leitattribut
- Sammelfertigkeit
- Standardfertigkeit / Stammbereich
- Spezialisierung

### 2.1 Nomenklatur der vier Einteilungen [GELOCKT]
Fertigkeiten werden in URoP ueber vier voneinander getrennte Einteilungen gelesen:

1. **Fertigkeitsebene**
- beschreibt die strukturelle Tiefe im Fertigkeitenbaum
- Werte: Sammelfertigkeit, Standardfertigkeit, Spezialisierung

2. **Anwendungsklasse**
- beschreibt die regeltechnische Einsatzschaerfe und Kostenklasse
- Werte: Kampffertigkeit, Aktionsfertigkeit, Flufffertigkeit
- Leitlinie Kosten: Kampf am teuersten, Aktion darunter, Fluff sehr guenstig bis kostenfrei

Definitionskriterien:
- **Kampffertigkeit**: fuer unmittelbaren Konfliktdruck, Kampfkontrolle, direkte Bedrohung oder Ueberlebenssicherung in Konflikten.
- **Aktionsfertigkeit**: fuer handlungsrelevante Problemlosung unter Zeitdruck, Risiko oder Widerstand ausserhalb direkter Kampfwirkung.
- **Flufffertigkeit**: fuer langfristige, vorbereitende, alltagsnahe oder charakterprofilierende Wirkung mit geringer unmittelbarer Eskalationswirkung.

3. **Regelanker**
- beschreibt, an welche Leitattribute/Attribute eine Fertigkeit fuer Voraussetzungen und Regelpruefung andockt
- mindestens ein Leitattributanker; Attributanker optional gemaess Regelstand

4. **Konsequenzdomaene**
- beschreibt, in welche Domaenen Nebenfolgen dieser Fertigkeit primaer abgewickelt werden
- dient der Konsequenzzuordnung, nicht der Fertigkeitsebene

Diese vier Einteilungen sind **parallel** und ersetzen einander nicht.
Eine Fertigkeit hat damit mindestens:
- eine Fertigkeitsebene
- eine Anwendungsklasse
- einen Regelanker
- eine Konsequenzdomaene

### Grundprinzipien [GELOCKT]
- Ãœberhang wird nur gegen das **zugehÃ¶rige Leitattribut** geprÃ¼ft.
- Standardfertigkeiten sind **optional**.
- Spezialisierungen dÃ¼rfen **direkt an eine Sammelfertigkeit** angeschlossen werden.
- Nicht jede Spezialisierung braucht eine Standardfertigkeit darÃ¼ber.
- Mehrfachzuordnung ist erlaubt, wenn mehrere klare KompetenzrÃ¤ume sinnvoll sind.
- Sammelfertigkeiten sollten ihr zugehÃ¶riges Leitattribut **im Regelfall nicht ueberschreiten**; hoehere Werte sind nur als begruendete Ausnahme gedacht.

---

## 3. Ziel der Fertigkeitsstruktur
Die Fertigkeitsstruktur soll drei Dinge leisten:
1. die **Art** einer Fertigkeit klar machen
2. ihren **Platz im System** markieren
3. ihren groben **Ordnungsbereich** fÃ¼r Sortierung und Filterung tragen

Die Struktur soll ausdrÃ¼cklich **nicht nur fÃ¼r Kampf** funktionieren, sondern auch fÃ¼r:
- Soziales
- Technik
- Medizin
- Wissen
- Ãœberleben
- Fahrzeuge
- Heimlichkeit
- Wahrnehmung

---

## 4. JSON-Feldschema (Kurzfassung)
Pflichtfelder je Eintrag:
- `id`
- `name`
- `type`
- `applicationClass`
- `attributeAnchor`
- `ruleAnchors`
- `skillDomain`
- `learnCostEp`
- `prerequisitesText`
- `parentIds`
- `rulesShort`
- `description`

### Bedeutungslogik
- `type` = `broad`, `standard` oder `specialization`
- `applicationClass` = `combat`, `action`, `fluff`
- `attributeAnchor` = typischer Leitattributanker, kein harter Zwang
- `ruleAnchors` = bis zu drei optionale Leitattribut-/Attribut-Anker als Auswahlliste
- `skillDomain` = Obergruppe fÃ¼r Sortierung und Filterung
- `learnCostEp` = gefuehrter Lernkostenwert des konkreten Eintrags
- `prerequisitesText` = Freitextfeld fuer Voraussetzungen; keine automatische Pruefung noetig
- `parentIds` = Ã¼bergeordnete Knoten; mehrere Eltern sind erlaubt

Erweiterte Leselogik fuer die vier Einteilungen:
- `type` = Fertigkeitsebene
- `skillDomain` = Konsequenzdomaene (Ordnung/Abwicklung)
- `applicationClass` = Anwendungsklasse
- `ruleAnchors` = Regelanker

---

## 5. Aktive Strukturregeln [GELOCKT / ARBEITSSTAND]
### 5.1 Direkter Sprung [GELOCKT]
Ein Charakter darf direkt von einer Sammelfertigkeit auf eine Spezialisierung gehen.

### 5.2 Mehrfachzuordnung [GELOCKT]
Eine Spezialisierung darf an mehreren Knoten hÃ¤ngen, wenn mehrere klare KompetenzrÃ¤ume sinnvoll sind.

Beispiele:
- Messer â†’ Waffenlos oder Klingenwaffen
- Spurenlesen â†’ Ãœberleben oder Wahrnehmung
- Maschinenpistole â†’ Kurzwaffen oder Langwaffen

### 5.3 HerauslÃ¶sen [GELOCKT / TESTSTAND]
Ein Teilbereich kann aus einer breiteren Fertigkeit oder aus einem Stammbereich als eigener Wert herausgelÃ¶st werden.

- HerauslÃ¶sen kostet **10 Punkte**
- keine Gratissteigerung
- nur getrennte FÃ¼hrung
- neuer Bereich startet grundsÃ¤tzlich auf dem vorhandenen Wert des Ã¼bergeordneten Bereichs, sofern Logik und Hintergrund das tragen

### 5.4 Mitzieh-Regel [GELOCKT]
Solange der herausgelÃ¶ste Bereich keinen hÃ¶heren eigenen Wert als der Ã¼bergeordnete Bereich hat, kann er mitgezogen werden.

---

## 6. VerhÃ¤ltnis zum Probenkern
Fertigkeiten wirken nicht nur auf den **Standard**, sondern oft auch auf **Kontrolle** und **Fehlerbeherrschung**.

Das ist besonders wichtig fÃ¼r:
- enge Spezialisierungen
- Routine in gefÃ¤hrlichen Situationen
- Fachfertigkeiten mit hohem Fehlerrisiko
- soziale oder technische Anwendungen, bei denen Fehler anders eskalieren als im Kampf

Der unterstÃ¼tzende Wert wirkt daher nicht nur â€žatmosphÃ¤rischâ€œ, sondern kann die Beherrschbarkeit von Fehlern mittragen.

---

## 7. Aktueller Referenzbestand
Der aktuelle JSON-Testbestand deckt bereits gemischt ab:
- Kampf
- Soziales
- Technik
- Medizin
- Wissen
- Ãœberleben
- Fahrzeuge

Erweiterte Sammelfertigkeiten im Referenzbestand:
- **Business**
- **Kunst**

Er enthÃ¤lt:
- Sammelfertigkeiten
- Kern-Standardfertigkeiten
- gemischte Spezialisierungen aus Kampf- und Nichtkampffeldern

---

## 8. Fertigkeitskosten [ARBEITSSTAND]
Kosten werden pro Fertigkeitseintrag direkt im Feld `learnCostEp` geführt.
Die folgenden Werte sind der aktuelle Kostenrahmen für den Regelbetrieb.

### 8.1 Lineare Kosten nach Fertigkeitsebene
- Standardfertigkeit: **20 EP pro Stufe**
- Spezialisierung: **15 EP pro Stufe**
- Sammelfertigkeit: **60 EP pro Stufe**

Damit gilt für typische Zielstufen:
- Sammelfertigkeit Stufe 1-6: 60, 120, 180, 240, 300, 360
- Standardfertigkeit Stufe 1-6: 20, 40, 60, 80, 100, 120
- Spezialisierung Stufe 1-6: 15, 30, 45, 60, 75, 90

### 8.2 Parent-Regel und Freischaltung
- Parent-Verknüpfungen sind **Voraussetzungen**, keine Zusatzkosten.
- Wenn eine Kindfertigkeit auf **dieselbe Stufe wie ihr Parent** gezogen wird, kostet diese Freischaltung einmalig **eine Fertigkeitsstufe**:
	- **20 EP** bei Standardfertigkeiten
	- **15 EP** bei Spezialisierungen
- Mehrere Parent-Optionen erlauben alternative Zugänge, erzeugen aber keine Mehrkosten.

### 8.3 Vereinfachung für den Spielbetrieb
- Anwendungsklassen-Multiplikatoren auf Lernkosten sind aktiv:
	- **Kampffertigkeit (`combat`)**: x **1.25**
	- **Aktionsfertigkeit (`action`)**: x **1.00**
	- **Flufffertigkeit (`fluff`)**: x **0.50**
- Keine Fokus-Multiplikatoren auf Lernkosten.
- Keine Überhang-Aufschläge auf Lernkosten.

### 8.4 Foundry-Berechnung
Die EP-Neuberechnung im Foundry-Ruleset addiert bei Fertigkeiten den gespeicherten Wert
`learnCostEp` direkt und wendet dabei nur die Anwendungsklassen-Multiplikatoren an.

---

## 9. Noch offen
- Endlock einzelner optionaler Standardfertigkeiten
- finale Passungslogik verwandter Fertigkeiten
- Ausbau des Referenzbestands
- spÃ¤tere JSON-Anbindung an ManÃ¶ver, Vorteile und Foundry-Import
