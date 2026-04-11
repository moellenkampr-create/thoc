# URoP – Fertigkeiten
Stand: 2026-04-08

## 1. Führende Datenquelle
Für Fertigkeiten gilt ab jetzt:
- `URoP_Fertigkeiten.json` = **führende Datenquelle** für Feldschema und Einträge
- `URoP_Fertigkeiten.md` = erklärende Lesefassung, Regeltext und Designhinweise

Die JSON-Datei ist die spätere Import- und Datenbankbasis. Diese MD-Datei erklärt Aufbau, Begriffe und aktive Strukturregeln.

---

## 2. Fertigkeitsebenen [GELOCKT / ARBEITSSTAND]
URoP kennt bis zu vier Ebenen:
- Attribut
- Sammelfertigkeit
- Standardfertigkeit / Stammbereich
- Spezialisierung

### Grundprinzipien [GELOCKT]
- Überhang wird nur gegen das **zugehörige Attribut** geprüft.
- Standardfertigkeiten sind **optional**.
- Spezialisierungen dürfen **direkt an eine Sammelfertigkeit** angeschlossen werden.
- Nicht jede Spezialisierung braucht eine Standardfertigkeit darüber.
- Mehrfachzuordnung ist erlaubt, wenn mehrere klare Kompetenzräume sinnvoll sind.

---

## 3. Ziel der Fertigkeitsstruktur
Die Fertigkeitsstruktur soll drei Dinge leisten:
1. die **Art** einer Fertigkeit klar machen
2. ihren **Platz im System** markieren
3. ihren groben **Ordnungsbereich** für Sortierung und Filterung tragen

Die Struktur soll ausdrücklich **nicht nur für Kampf** funktionieren, sondern auch für:
- Soziales
- Technik
- Medizin
- Wissen
- Überleben
- Fahrzeuge
- Heimlichkeit
- Wahrnehmung

---

## 4. JSON-Feldschema (Kurzfassung)
Pflichtfelder je Eintrag:
- `id`
- `name`
- `type`
- `attribute_anchor`
- `skill_domain`
- `parent_ids`
- `rules_short`
- `description`

### Bedeutungslogik
- `type` = `broad`, `standard` oder `specialization`
- `attribute_anchor` = typischer Attributanker, kein harter Zwang
- `skill_domain` = Obergruppe für Sortierung und Filterung
- `parent_ids` = übergeordnete Knoten; mehrere Eltern sind erlaubt

---

## 5. Aktive Strukturregeln [GELOCKT / ARBEITSSTAND]
### 5.1 Direkter Sprung [GELOCKT]
Ein Charakter darf direkt von einer Sammelfertigkeit auf eine Spezialisierung gehen.

### 5.2 Mehrfachzuordnung [GELOCKT]
Eine Spezialisierung darf an mehreren Knoten hängen, wenn mehrere klare Kompetenzräume sinnvoll sind.

Beispiele:
- Messer → Waffenlos oder Klingenwaffen
- Spurenlesen → Überleben oder Wahrnehmung
- Maschinenpistole → Kurzwaffen oder Langwaffen

### 5.3 Herauslösen [GELOCKT / TESTSTAND]
Ein Teilbereich kann aus einer breiteren Fertigkeit oder aus einem Stammbereich als eigener Wert herausgelöst werden.

- Herauslösen kostet **10 Punkte**
- keine Gratissteigerung
- nur getrennte Führung
- neuer Bereich startet grundsätzlich auf dem vorhandenen Wert des übergeordneten Bereichs, sofern Logik und Hintergrund das tragen

### 5.4 Mitzieh-Regel [GELOCKT]
Solange der herausgelöste Bereich keinen höheren eigenen Wert als der übergeordnete Bereich hat, kann er mitgezogen werden.

---

## 6. Verhältnis zum Probenkern
Fertigkeiten wirken nicht nur auf den **Standard**, sondern oft auch auf **Kontrolle** und **Fehlerbeherrschung**.

Das ist besonders wichtig für:
- enge Spezialisierungen
- Routine in gefährlichen Situationen
- Fachfertigkeiten mit hohem Fehlerrisiko
- soziale oder technische Anwendungen, bei denen Fehler anders eskalieren als im Kampf

Der unterstützende Wert wirkt daher nicht nur „atmosphärisch“, sondern kann die Beherrschbarkeit von Fehlern mittragen.

---

## 7. Aktueller Referenzbestand
Der aktuelle JSON-Testbestand deckt bereits gemischt ab:
- Kampf
- Soziales
- Technik
- Medizin
- Wissen
- Überleben
- Fahrzeuge

Er enthält:
- Sammelfertigkeiten
- Kern-Standardfertigkeiten
- gemischte Spezialisierungen aus Kampf- und Nichtkampffeldern

---

## 8. Fertigkeitskosten [TESTSTAND]
### Sammelfertigkeit
- 1 = 15
- 2 = 30
- 3 = 50
- 4 = 80
- 5 = 120
- 6 = 170

### Standardfertigkeit / Spezialisierung
- 1 = 10
- 2 = 20
- 3 = 35
- 4 = 55
- 5 = 80
- 6 = 110

### Überhang [TESTSTAND]
- bis Attribut = normal
- +1 über Attribut = +30
- +2 über Attribut = +90
- mehr als +2 = Ausnahmebereich

---

## 9. Noch offen
- Endlock einzelner optionaler Standardfertigkeiten
- finale Passungslogik verwandter Fertigkeiten
- Ausbau des Referenzbestands
- spätere JSON-Anbindung an Manöver, Vorteile und Foundry-Import
