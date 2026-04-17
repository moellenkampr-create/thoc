# URoP – Vor- und Nachteile
Stand: 2026-04-17

## 1. Grundsatz [GELOCKT]
Vor- und Nachteile laufen ab jetzt ueber **eine gemeinsame Struktur**.
Beide Seiten bleiben unterscheidbar ueber `kind`, nutzen aber denselben Feldkern.

## 2. Datenstruktur [GELOCKT]
Fuehrend ist:
- `URoP_Vor_und_Nachteile.json`

Erklaerende Lesefassung:
- `URoP_Vor_und_Nachteile.md`

Ziel ist eine **gut lesbare, schlanke Struktur fuer den Erzaehler** statt halbautomatischer Detailverwaltung.

## 3. Leitlinien [GELOCKT]
Vor- und Nachteile sollen:
- klar umrissen sein
- spielrelevant sein
- identitaetsstark bleiben
- nicht in viele kleine Bonus-/Malusfelder zerfallen
- ohne zusaetzliche Hook-, Tag- oder Stacking-Logik lesbar bleiben

## 4. Aktiver Feldkern [GELOCKT]
- `id`
- `name`
- `kind`
- `tier`
- `rules_short`
- `description`
- `requirements`
- `incompatibilities`

## 5. Feldbedeutung [GELOCKT]
### `id`
Stabile interne Kennung.

### `name`
Anzeigename.

### `kind`
Marker fuer die Grundart:
- `advantage`
- `disadvantage`

### `tier`
Grobe Gewichtung:
- `minor`
- `moderate`
- `major`

Bei Vorteilen ist das die grobe **Kostenklasse**.
Bei Nachteilen ist das die grobe **Rueckgabeklasse**.

### `rules_short`
Kurzregel in 1-2 Saetzen fuer schnellen Tischzugriff.

### `description`
Ausfuehrlicher Regelsinn und Lesefassung.

### `requirements`
Optionale Voraussetzungen als kurzer Text.
Wenn nichts noetig ist, bleibt das Feld leer.

### `incompatibilities`
Optionale Unvertraeglichkeiten als kurzer Text.
Wenn nichts gesperrt ist, bleibt das Feld leer.

## 6. Bewusst gestrichen [GELOCKT]
Nicht mehr Teil der aktiven Struktur:
- `effect_type`
- `stacking`
- `tags`
- `mechanical_hooks`
- `levels`
- `setting_scope`
- `typical_uses`
- `limitations`
- `gm_notes`

Wenn spaeter wieder mehr Ordnung noetig wird, soll das gezielt und nur bei echtem Nutzen zurueckkommen.

## 7. Kosten- und Rueckgabedenke [TESTSTAND]
Aktuell bleibt die grobe Leselogik:
- Vorteile: `minor / moderate / major`
- Nachteile: `minor / moderate / major`

Konkrete Kosten und Rueckgaben werden weiter im Charakterbau gelesen, nicht ueber Zusatzfelder am Eintrag selbst.

## 8. Referenzbestand [ARBEITSSTAND]
Stand: 2026-04-17 — 47 Eintraege. Fuehrend ist die JSON-Datei.

---

### Allgemein — Vorteile

**Wachsame Sinne** *(moderate)*
Fruehere Hinweise, schwache Reize und kleine Auffaelligkeiten kippen bei dir seltener unbemerkt durch.

**Richtungssinn** *(minor)*
Du behaeltst Wege, Richtungen und Orientierungspunkte ungewoehnlich stabil im Kopf.
→ Inkompatibel mit: Schlechte Orientierung

**Zaeh** *(moderate)*
Belastung, Erschoepfung und allgemeiner Druck werfen dich spaeter aus der Bahn als andere.

**Abgebrueht** *(moderate)*
Schock, Einschuechterung, Blut, Chaos oder Druck bringen dich seltener aus dem Arbeitsmodus.

**Feldroutine** *(moderate)*
Typische Gefahrensituationen eskalieren fuer dich seltener unkontrolliert.

**Erstversorger** *(minor)*
Du kannst medizinische Notfallversorgung schnell, praktisch und unter Druck einsetzen.

**Szene-Kontakte** *(moderate)*
Du hast belastbare Kontakte in einer relevanten Szene oder einem Milieu.

**Kampfschule** *(moderate)*
Du hast formale oder halbformale Ausbildung in einem klaren Kampfstil erhalten.
Markiert Stil, Zugang und Trainingshintergrund — ist selbst keine Fertigkeit.

---

### Allgemein — Nachteile

**Schlechte Orientierung** *(minor)*
Routen, Richtungen und Raumanordnung kippen bei dir leichter durcheinander.
→ Inkompatibel mit: Richtungssinn

**Fragil** *(moderate)*
Koerperliche Belastungen und Treffer kippen bei dir schneller in echte Folgen.

**Schreckhaft** *(moderate)*
Ueberraschung, Knall, Schock oder abrupte Eskalation werfen dich leichter aus der Spur.

**Stolz** *(minor)*
Kraenkung, Statusverlust oder Demuetigung lassen Konflikte fuer dich schneller haerter werden.

**Misstrauisch** *(minor)*
Vertrauen faellt dir schwer; Kooperation, Offenheit und Bindung bauen sich zaeher auf.

**Verpflichtung** *(moderate)*
Du hast eine wiederkehrende Pflicht, die Zeit, Loyalitaet oder Handlungsspielraum kostet.
Konkret benennen: Familie, Organisation, Schwur o.a.

**Schulden** *(moderate)*
Du stehst finanziell oder faktisch in der Kreide und geraetst dadurch regelmaessig unter Druck.

**Schlechter Ruf** *(moderate)*
In passenden Milieus hast du einen spuerbaren Vertrauens- und Ansehensnachteil.

---

### Koerper — Vorteile

**Kraftvoll** *(moderate)* · Facette: Staerke
Tragen, Druecken, Ringen und rohe koerperliche Gewalt liegen dir ueberdurchschnittlich gut.
→ Inkompatibel mit: Schwaechlich

**Geschickt** *(moderate)* · Facette: Grobmotorik
Balance, Ausweichen, Klettern und schnelle saubere Bewegungen gelingen dir leichter.
→ Inkompatibel mit: Ungelenk

**Cyberware-Affinitaet** *(moderate)* · Facette: Konstitution
Dein Organismus nimmt Implantate ungewoehnlich gut an; Abstossungsreaktionen, Heilungszeiten und biologische Reibung fallen geringer aus.
→ Inkompatibel mit: Cyberware-Empfindlich

**Schmerzresistent** *(moderate)* · Facette: Konstitution
Schmerz bringt dich spaeter aus dem Arbeitsmodus; du haeltst unter Verwundung und Belastung laenger funktional.
Kein Schutz vor Verletzungen selbst — die Konsequenzen fuer Handlungsfaehigkeit treten spaeter ein.
→ Inkompatibel mit: Schmerzempfindlich

**Schnell** *(minor)* · Facette: Grobmotorik
Du bewegst dich schneller als der Durchschnitt; Distanzen schliessen sich, Verfolgungen kippen eher zu deinen Gunsten.
→ Inkompatibel mit: Traege

**Beidhaendig** *(minor)* · Facette: Feinmotorik
Du arbeitest mit beiden Haenden gleichmaessig sicher; einseitige Einschraenkungen und Behinderungen treffen dich weniger.

---

### Koerper — Nachteile

**Schwaechlich** *(moderate)* · Facette: Staerke
Last, Griffkraft und rohe koerperliche Durchsetzung kippen bei dir schneller an ihre Grenzen.
→ Inkompatibel mit: Kraftvoll

**Ungelenk** *(moderate)* · Facette: Grobmotorik
Feine Balance, schnelle Richtungswechsel und saubere Bewegungsablaeufe geraten dir leichter unsauber.
→ Inkompatibel mit: Geschickt

**Cyberware-Empfindlich** *(moderate)* · Facette: Konstitution
Dein Koerper reagiert auf Implantate haerter; Integrationsprobleme, Nebenwirkungen und Heilungsverlaeufe fallen unguenstiger aus.
→ Inkompatibel mit: Cyberware-Affinitaet

**Schmerzempfindlich** *(minor)* · Facette: Konstitution
Schmerz trifft dich haerter und setzt Handlungsfaehigkeit, Fokus oder Linie schneller ausser Kraft.
→ Inkompatibel mit: Schmerzresistent

**Traege** *(minor)* · Facette: Grobmotorik
Du bewegst dich langsamer als andere; Distanzen oeffnen sich gegen dich, Flucht und Angriff kosten mehr Zeit.
→ Inkompatibel mit: Schnell

**Narbengewebe** *(minor)* · Facette: Konstitution
Alte Verletzungen hinterlassen funktionale Einschraenkungen, die unter Last oder Belastung spaeter sichtbar werden.
Keine optische Einschraenkung im Vordergrund — konkret benannte mechanische oder neurologische Restschaeden.

---

### Geist — Vorteile

**Analytisch** *(moderate)* · Facette: Analytik
Muster, Fehlerquellen, Zusammenhaenge und technische Logik springen dir schneller ins Auge.
→ Inkompatibel mit: Zerstreut

**Willensstark** *(moderate)* · Facette: Willenskraft
Mentale Belastung, Ablenkung, Druck und Einschuechterung brechen deinen Fokus seltener.
→ Inkompatibel mit: Sprunghaft

**Scharf im Stress** *(moderate)* · Facette: Willenskraft
Unter Druck, Zeitnot und Gefahr wirst du klarer statt hektischer; Panik oder Reaktionsverlust treffen dich seltener.
Kein Wuerfelbonus — Konsequenzen von Schock, Ueberrumpelung und Panik-Eskalation fallen milder aus.
→ Inkompatibel mit: Trauma-Trigger

**Fotografisches Gedaechtnis** *(moderate)* · Facette: Intuition
Gesehene Details, Texte, Plaene und Szenen stehen dir spaeter ungewoehnlich praezise zur Verfuegung.
Kein Denkbonus — seltener Informationsverlust durch Zeit oder Stress.

**Gefahreninstinkt** *(moderate)* · Facette: Intuition
Du bekommst frueher ein warnendes Gefuehl, wenn etwas nicht stimmt, auch ohne klare bewusste Grundlage.
Hinterhalte, Fallen und unerwartete Aggression kippen seltener voellig unvermittelt.

**Psi-Sensitiv** *(major)* · Facette: Intuition — Gate-Vorteil
Schaltet den Zugang zu Psi-Fertigkeiten frei. Ohne diesen Vorteil sind Psi-Fertigkeiten nicht zugaenglich.
Das Ausmass der Faehigkeiten haengt von Fertigkeitspunkten ab, nicht vom Vorteil selbst.
→ Inkompatibel mit: Leer innen

---

### Geist — Nachteile

**Zerstreut** *(moderate)* · Facette: Analytik
Details, Reihenfolgen und logische Anschlussstellen rutschen dir leichter durch.
→ Inkompatibel mit: Analytisch

**Sprunghaft** *(moderate)* · Facette: Willenskraft
Du wechselst leichter den mentalen Fokus, laesst dich eher ziehen und haeltst Linien schlechter durch.
→ Inkompatibel mit: Willensstark

**Trauma-Trigger** *(moderate)* · Facette: Willenskraft
Bestimmte Reize, Situationen oder Ausloeser kippen dich in Reaktionen, die du nicht vollstaendig kontrollierst.
Trigger bei Charaktererstellung konkret benennen.
→ Inkompatibel mit: Scharf im Stress

**Abhaengig** *(moderate)* · Facette: Willenskraft
Du bist von einer Substanz, einem Verhalten oder einem System abhaengig, das regelmaessig Ressourcen, Kontrolle oder Zuverlaessigkeit kostet.
Substanz oder Verhalten bei Charaktererstellung konkret benennen.

---

### Praesenz — Vorteile

**Charismatisch** *(moderate)* · Facette: Ausdruck
Deine Praesenz bleibt haengen; du gewinnst leichter Aufmerksamkeit, Vertrauen oder Folgebewegung.
→ Inkompatibel mit: Farblos

**Feinfuehlig** *(moderate)* · Facette: Empathie
Stimmungen, Unsicherheiten und kleine soziale Brueche liest du schneller und sicherer.
→ Inkompatibel mit: Taktlos

**Aura des Vertrauens** *(moderate)* · Facette: Ausdruck
Menschen geben dir gegenueber fremden Personen schneller den Benefit of the Doubt; Vertrauensaufbau und Tueroeffnen laufen smoother.
Kein Glamour-Effekt — subtile soziale Signalgebung, kein Bonus auf Luegen.
→ Inkompatibel mit: Stigmatisiert

**Magisch Veranlagt** *(major)* · Facette: Resonanz — Gate-Vorteil
Schaltet den Zugang zu magischen Fertigkeiten frei. Ohne diesen Vorteil sind magische Fertigkeiten nicht zugaenglich.
Das Ausmass der Faehigkeiten haengt von Fertigkeitspunkten ab, nicht vom Vorteil selbst.
Hohe Cyberware-Last reduziert die Resonanz-Facette und damit die Wirkstaerke — keine separate Mechanik noetig.
→ Inkompatibel mit: Leer innen

---

### Praesenz — Nachteile

**Farblos** *(minor)* · Facette: Ausdruck
Du bleibst sozial leichter blass, wirst spaeter erinnert und erzeugst weniger Sog in einer Szene.
→ Inkompatibel mit: Charismatisch

**Taktlos** *(moderate)* · Facette: Empathie
Du vergreifst dich leichter im Ton, liest Grenzen spaeter und kippst soziale Lagen schneller an.
→ Inkompatibel mit: Feinfuehlig

**Stigmatisiert** *(moderate)* · Facette: Resonanz
Ein sichtbares Merkmal, ein Ruf oder eine Zugehoerigkeit loest bei einem relevanten Teil der Gesellschaft Ablehnung oder Feindseligkeit aus.
Konkret benennen: Herkunft, Aussehen, Zugehoerigkeit oder Geschichte.
→ Inkompatibel mit: Aura des Vertrauens

**Leer innen** *(major)* · Facette: Resonanz
Zu viel Chrome, zu wenig Mensch: Empathie, emotionale Tiefe und soziale Praesenz sind dauerhaft und spuerbar reduziert.
Kein einmaliger Schock — dauerhafter Wesensanteil, der fehlt. Abgebildet ueber Resonanz-Facette und soziale Konsequenzen.
→ Inkompatibel mit: Psi-Sensitiv, Magisch Veranlagt

**Ehrenkodex** *(minor)* · Facette: Dominanz
Du haeltst dich an einen selbst gesetzten Verhaltenskodex und wirst dadurch in bestimmten Lagen vorhersehbarer oder eingeschraenkter.
Kodex bei Charaktererstellung konkret benennen. Kann als Hebel durch Antagonisten genutzt werden.

---

## 9. Noch offen
- Kosten und Rueckgaben weiter gegen Spielgefuehl pruefen
- Facetten-Logik (Resonanz als Soft-Inkompatibilitaet fuer Chrome/Magie) im Playtest validieren
- Psi-Fertigkeitenliste noch offen
