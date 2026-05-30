# URoP â€“ Schutz und RÃ¼stung
Stand: 2026-04-10

## 1. Zweck dieser Datei
Diese Datei erklÃ¤rt die **Schutz- und RÃ¼stungsstruktur** des URoP-Regelwerks.
Die **fÃ¼hrende Datenquelle** fÃ¼r Schutz und RÃ¼stung ist ab jetzt:
- `URoP_Schutz_und_Ruestung.json`

Diese MD-Datei dient als:
- Regel- und StrukturÃ¼bersicht
- ErlÃ¤uterung der Felder
- menschlich lesbare Einordnung
- Referenz fÃ¼r spÃ¤tere Listenpflege

---

## 2. Grundsatz
Schutz und RÃ¼stung werden kÃ¼nftig **datenorientiert** gefÃ¼hrt.
FÃ¼r Datenbank, Foundry-Import und spÃ¤tere Listenpflege ist JSON die robustere Hauptquelle.

Darum gilt:
- **JSON** = fÃ¼hrende Datendefinition und spÃ¤tere Importbasis
- **MD** = erklÃ¤render Regeltext und Lesefassung

---

## 3. Kernlogik von Schutz und RÃ¼stung
Schutz und RÃ¼stung beantworten in URoP vor allem vier Fragen:
1. **Was ist das fÃ¼r ein Schutztyp?**
2. **FÃ¼r welche NutzergrÃ¶ÃŸe ist er gebaut?**
3. **Wie viel Wirkung fÃ¤ngt er typischerweise ab?**
4. **Wie ist das StÃ¼ck grob einzuordnen und was muss man dazu wissen?**

DafÃ¼r nutzt URoP folgende Kernfelder:
- `category`
- `quality`
- `userSize Nominal`
- `protectionValue`
- `rulesShort`
- `description`
- `priceEb`

`coverage`, VerfÃ¼gbarkeit, LegalitÃ¤t und Ã¤hnliche Hinweise werden derzeit **nicht als Pflichtfelder** gefÃ¼hrt, sondern in die Beschreibung integriert.
Das hÃ¤lt die Struktur offen fÃ¼r Humanoide, Tiere, Aliens und spÃ¤tere Trefferzonenmodelle.

---

## 4. Regelbedeutung der Kernfelder

### `category`
Die grobe Schutz- oder RÃ¼stungskategorie.
Sie dient zugleich als guter Trenner fÃ¼r spÃ¤tere Foundry-Typen oder Filter.

Beispiele:
- `clothing`
- `vest`
- `armorLight`
- `armorHeavy`
- `riot`
- `powered`
- `shield`
- `helmet`

### `quality`
Die allgemeine QualitÃ¤tsstufe des Schutzes.
Aktuell analog zur Waffenstruktur gefÃ¼hrt.

Leitlinie:
- `poor`
- `standard`
- `excellent`

### `userSize Nominal`
Die nominale NutzergrÃ¶ÃŸe.
Sie beantwortet:
**FÃ¼r welche KÃ¶rpergrÃ¶ÃŸe / Ergonomie ist der Schutz gebaut?**

Beispiel:
- `G3`

Das Feld ist bewusst offen genug, um spÃ¤ter auch nichtmenschliche TrÃ¤ger sauber abzubilden.

### `protectionValue`
Der zentrale Schutzwert.

Er beschreibt:
**wie viele Wirkungsstufen dieser Schutz auf abgedeckten Bereichen typischerweise reduziert**

Leitlinie:
- `0` = praktisch kein echter Schutz
- `1` = leichter Schutz
- `2` = spÃ¼rbarer Schutz
- `3` = starker Schutz
- `4` = sehr starker Schutz
- `5+` = Sonderfall / schwere Spezialpanzerung

### `rulesShort`
1â€“2 SÃ¤tze zur schnellen Regelfunktion.

### `description`
Volle Beschreibung, Fluff und Nutzungskontext.
Hier stehen derzeit auch:
- typische Abdeckung
- VerfÃ¼gbarkeits- oder Beschaffungshinweise
- rechtlicher oder sozialer Kontext
- Trage- und Nutzungshinweise

### `priceEb`
Preis in **EB**.

---

## 5. Protection Scale
`protectionScale` bleibt als **grobe Leseskala** erhalten.
Sie ist keine zweite verdeckte Regelmechanik, sondern nur eine Orientierung dafuer, wie stark sich ein Schutzwert im Spiel anfuehlt.

---

## 6. Zusammenspiel mit Waffen, Deckung und Zielwahl
Schutz und RÃ¼stung sprechen dieselbe Wirkungslogik wie Waffen.

### Standardlogik
1. Waffe liefert `baseEffect`
2. Schutz reduziert mit `protectionValue`
3. GrÃ¶ÃŸenregeln verschieben bei Bedarf
4. Zielwahl verschiebt bei Bedarf
5. WurfqualitÃ¤t verschiebt
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
- QualitÃ¤t
- nominale NutzergrÃ¶ÃŸe
- Schutzwert
- Kurzregel
- Preis

Weitere Details stehen in der Beschreibung.

---

## 8. Pflegeprinzip
- Neue Schutz- und RÃ¼stungseintrÃ¤ge werden **zuerst in JSON** eingetragen.
- Diese MD-Datei wird angepasst, wenn:
  - sich das Feldschema Ã¤ndert
  - neue Pflichtfelder dazukommen
  - die Regellogik geÃ¤ndert wird
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
