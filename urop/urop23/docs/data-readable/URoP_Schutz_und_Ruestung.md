# URoP – Schutz und Rüstung
Stand: 2026-04-10

## 1. Zweck dieser Datei
Diese Datei erklärt die **Schutz- und Rüstungsstruktur** des URoP-Regelwerks.
Die **führende Datenquelle** für Schutz und Rüstung ist ab jetzt:
- `URoP_Schutz_und_Ruestung.json`

Diese MD-Datei dient als:
- Regel- und Strukturübersicht
- Erläuterung der Felder
- menschlich lesbare Einordnung
- Referenz für spätere Listenpflege

---

## 2. Grundsatz
Schutz und Rüstung werden künftig **datenorientiert** geführt.
Für Datenbank, Foundry-Import und spätere Listenpflege ist JSON die robustere Hauptquelle.

Darum gilt:
- **JSON** = führende Datendefinition und spätere Importbasis
- **MD** = erklärender Regeltext und Lesefassung

---

## 3. Kernlogik von Schutz und Rüstung
Schutz und Rüstung beantworten in URoP vor allem vier Fragen:
1. **Was ist das für ein Schutztyp?**
2. **Für welche Nutzergröße ist er gebaut?**
3. **Wie viel Wirkung fängt er typischerweise ab?**
4. **Wie ist das Stück grob einzuordnen und was muss man dazu wissen?**

Dafür nutzt URoP folgende Kernfelder:
- `category`
- `quality`
- `user_size_nominal`
- `protection_value`
- `rules_short`
- `description`
- `price_eb`

`coverage`, Verfügbarkeit, Legalität und ähnliche Hinweise werden derzeit **nicht als Pflichtfelder** geführt, sondern in die Beschreibung integriert.
Das hält die Struktur offen für Humanoide, Tiere, Aliens und spätere Trefferzonenmodelle.

---

## 4. Regelbedeutung der Kernfelder

### `category`
Die grobe Schutz- oder Rüstungskategorie.
Sie dient zugleich als guter Trenner für spätere Foundry-Typen oder Filter.

Beispiele:
- `clothing`
- `vest`
- `armor_light`
- `armor_heavy`
- `riot`
- `powered`
- `shield`
- `helmet`

### `quality`
Die allgemeine Qualitätsstufe des Schutzes.
Aktuell analog zur Waffenstruktur geführt.

Leitlinie:
- `poor`
- `standard`
- `excellent`

### `user_size_nominal`
Die nominale Nutzergröße.
Sie beantwortet:
**Für welche Körpergröße / Ergonomie ist der Schutz gebaut?**

Beispiel:
- `G3`

Das Feld ist bewusst offen genug, um später auch nichtmenschliche Träger sauber abzubilden.

### `protection_value`
Der zentrale Schutzwert.

Er beschreibt:
**wie viele Wirkungsstufen dieser Schutz auf abgedeckten Bereichen typischerweise reduziert**

Leitlinie:
- `0` = praktisch kein echter Schutz
- `1` = leichter Schutz
- `2` = spürbarer Schutz
- `3` = starker Schutz
- `4` = sehr starker Schutz
- `5+` = Sonderfall / schwere Spezialpanzerung

### `rules_short`
1–2 Sätze zur schnellen Regelfunktion.

### `description`
Volle Beschreibung, Fluff und Nutzungskontext.
Hier stehen derzeit auch:
- typische Abdeckung
- Verfügbarkeits- oder Beschaffungshinweise
- rechtlicher oder sozialer Kontext
- Trage- und Nutzungshinweise

### `price_eb`
Preis in **EB**.

---

## 5. Protection Scale
`protection_scale` bleibt als **grobe Leseskala** erhalten.
Sie ist keine zweite verdeckte Regelmechanik, sondern nur eine Orientierung dafuer, wie stark sich ein Schutzwert im Spiel anfuehlt.

---

## 6. Zusammenspiel mit Waffen, Deckung und Zielwahl
Schutz und Rüstung sprechen dieselbe Wirkungslogik wie Waffen.

### Standardlogik
1. Waffe liefert `base_effect`
2. Schutz reduziert mit `protection_value`
3. Größenregeln verschieben bei Bedarf
4. Zielwahl verschiebt bei Bedarf
5. Wurfqualität verschiebt
6. Reaktion / Deckung verschiebt

Damit gilt:
- Schutz ist **keine eigene Schadensart**, sondern eine **Eskalationsbremse**
- Schutz und Deckung sind verwandt, aber nicht identisch
- Zielwahl, Teilbereiche und Schwachstellen bleiben weiterhin relevant

---

## 7. Spieler- und Spielleitersicht
Schnell sichtbar sein sollten:
- Name
- Kategorie
- Qualität
- nominale Nutzergröße
- Schutzwert
- Kurzregel
- Preis

Weitere Details stehen in der Beschreibung.

---

## 8. Pflegeprinzip
- Neue Schutz- und Rüstungseinträge werden **zuerst in JSON** eingetragen.
- Diese MD-Datei wird angepasst, wenn:
  - sich das Feldschema ändert
  - neue Pflichtfelder dazukommen
  - die Regellogik geändert wird
  - neue Kategorien oder Grundprinzipien dazukommen

---

## 9. Aktueller Referenzbestand
Der aktuelle JSON-Teststand enthaelt **10 Referenzeintraege** fuer Schutz und Ruestung.

### Leichter bis mittlerer Schutz
- Verstaerkte Strassenkleidung
- Verdeckte Stichschutzweste
- Leichte Schutzweste
- Patrouillenweste
- Ballistischer Helm

### Schwere oder spezialisierte Schutzsysteme
- Riot-Anzug
- Schwere taktische Panzerung
- Versiegelter Operationsanzug
- Powered Assault Frame
- Riot-Schild

Hinweis:
Diese Liste ist ein **Referenzbestand fuer Tests**, kein finaler Vollkatalog. Neue Eintraege werden fuehrend in `URoP_Schutz_und_Ruestung.json` gepflegt.
