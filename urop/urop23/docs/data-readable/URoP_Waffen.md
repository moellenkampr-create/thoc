# URoP â€“ Waffen
Stand: 2026-04-10

## 1. Zweck dieser Datei
Diese Datei erklÃ¤rt die **aktive Waffenstruktur** des URoP-Regelwerks.
Die **fÃ¼hrende Datenquelle** fÃ¼r Waffen ist:
- `URoP_Waffen.json`

Diese MD-Datei dient als:
- Lesefassung der Waffenfelder
- Einordnung der Waffenkategorien
- kurze Regel- und PflegeerklÃ¤rung

---

## 2. Grundsatz
Waffen sind in URoP **strukturierter als allgemeine Items**, aber bewusst **spielorientiert statt museal**.

Die Waffenstruktur soll vor allem drei Dinge leisten:
1. Waffen im Spiel schnell einordnen
2. Waffen in Foundry und Datenlisten sauber ordnen
3. spaetere Pflege schlank halten

Darum fuehrt die Waffenstruktur nur Felder, die fuer Spielgefuehl, Reichweite, Groessenbezug und Grundwirkung echten Nutzen haben.

---

## 3. Aktiver Feldkern
Aktive Waffenfelder sind aktuell:
- `id`
- `name`
- `category`
- `combatMode`
- `description`
- `rulesShort`
- `priceEb`
- `designedFor Size Class`
- `effectiveAgainst Class`
- `damageBaseline`
- `quality`
- `magazineCapacity` *(falls relevant)*
- `fireModes` *(falls relevant)*
- `meleeReach Classes` *(falls relevant)*
- `rangeBands` *(falls relevant)*

Bewusst **nicht** aktiv gefuehrt werden derzeit:
- `skillLinks`
- `tags`
- `availability`
- `legalStatus`
- `handsRequired`
- `ammoType`
- echte Feintaxonomien wie Schnittwaffe / Stichwaffe / Schlagwaffe als eigenes Feld

Feinere Einordnung bleibt im Text.

---

## 4. Bedeutung der Kernfelder

### `category`
Die spielorientierte Hauptklasse der Waffe.
Sie dient vor allem Ordnung, Foundry-Unterordnern und der groben Einordnung.

### `combatMode`
Der Haupteinsatzraum der Waffe:
- `melee`
- `ranged`
- `hybrid`

### `description`
Der beschreibende Fliesstext.
Hier koennen auch Details stehen wie:
- eher Schnittwaffe
- vor allem Stichwaffe
- Hybrid aus Schlag und Haken
- Breach-, Jagd- oder Antimaterialrolle

### `rulesShort`
1â€“3 Saetze mit der regeltechnischen Kernaussage.

### `priceEb`
Referenzpreis in **EB**.
Alias im Setting: **ebbies / Eurodollar / Eurobuck**.

### `designedFor Size Class`
Fuer welche Nutzergroesse die Waffe primaer gebaut ist.
Beispiel:
- `G3` = menschlicher Standardraum

### `effectiveAgainst Class`
Gegen welche Zielgroesse oder Zielklasse der Basiseffekt primaer gelesen wird.
Dieses Feld ersetzt **keinen zweiten Schadenswert**, sondern die Frage:
**Wofuer ist die Waffe eigentlich ausgelegt?**

Beispiele:
- normale Dienstpistole: `G3`
- schweres Gefechtsgewehr: `G4`
- AV-Werfer: `vehicle`

### `damageBaseline`
Die typische Standardwirkung der Waffe.
Arbeitsleiter:
- `1` = reduzierter Druck
- `2` = Druck
- `3` = Leichte Konsequenz
- `4` = Schwere Konsequenz
- `5` = Kritische Konsequenz

### `quality`
Grobe Qualitaetsstufe der Waffe.
Aktueller Arbeitskern:
- `poor`
- `standard`
- `excellent`

### `magazineCapacity`
Magazingroesse oder Ladekapazitaet, wenn die Waffe das braucht.

### `fireModes`
Verfuegbare Feuerarten von Fernkampfwaffen.
Aktueller Kern:
- `single`
- `burst`
- `auto`

### `meleeReach Classes`
Aktive Nahkampfreichweiten einer Waffe.
Mehrere Eintraege sind erlaubt.
Aktueller Kern:
- `handgemenge`
- `nahkampf`
- `lang`
- `stange`

### `rangeBands`
Reichweitenbaender von Fernkampfwaffen.
Sie werden als Werteblock gefuehrt:
- `nah`
- `mittel`
- `weit`
- `extrem`

Die Werte sind derzeit grobe Obergrenzen in Metern.

---

## 5. Aktive Waffenkategorien

### Nahkampf
- `kleinwaffe`
- `nahkampfwaffe`
- `zweihandwaffe`
- `stangenwaffe`

Diese Kategorien beantworten nicht die volle historische Waffenkunde, sondern:
**Wie wird die Waffe im Spiel grob gefuehrt?**

Feinere Dinge wie Dolch, Kurzschwert, Machete, Kriegshammer oder Kampfspeer werden im Text und in den Reichweitenprofilen beschrieben.

### Fernkampf
- `handfeuerwaffe`
- `shotgun`
- `gewehr`
- `sniper`
- `schwereWaffe`
- `wurfwaffe`
- `bogen`
- `armbrust`

Auch hier gilt:
Die Kategorie ist **Spielklasse**, nicht komplette Waffenkunde.
Ein Scharfschuetzengewehr darf also bewusst `sniper` sein, obwohl es technisch auch ein Gewehr ist.

---

## 6. Pflegeprinzip
- Neue Waffen werden **zuerst in JSON** gepflegt.
- Neue Felder kommen nur dazu, wenn sie fuer Spiel, Foundry oder Folgepflege echten Mehrwert bringen.
- Dinge wie Munitionstyp, exakte Griffart oder Spezialklassifikation bleiben vorerst im Text, solange kein echter Pflege- oder Automationsnutzen entsteht.

---

## 7. Aktueller Referenzbestand
Der aktuelle Testbestand umfasst **15 Referenzwaffen**.

### Nahkampf
- Kampfmesser
- Teleskopschlagstock
- Feldmachete
- Langschwert
- Kriegshammer

### Fernkampf
- Taserpistole
- 9mm Dienstpistole
- .44 Schwerer Revolver
- Kompakte Maschinenpistole
- Dienst-SMG
- 5.56 Dienstgewehr
- 7.62 Battle Rifle
- 12G Pump-Schrotflinte
- Praezisionsgewehr 7.62
- AV-Werfer MK1

Hinweis:
Dieser Bestand ist ein **Arbeits- und Referenzkatalog**, kein finaler Vollkatalog.
