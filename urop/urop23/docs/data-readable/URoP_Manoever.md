# URoP – Manöver
Stand: 2026-04-16

## 1. Grundabgrenzung [GELOCKT]
- **Fertigkeit** = was die Figur grundsätzlich kann
- **Spezialisierung** = worin sie fokussiert ist
- **Manöver** = zugespitzte, besondere Anwendung eines vorhandenen Könnens mit eigenem Einsatzfenster, erhöhter Wirkung, Kosten, Risiko oder klarer Gegenreaktion
- basisnahe Anschlussanwendungen bleiben **Basisanwendungen**, solange sie keine eigene Fenster-, Kosten- oder Gegenlogik brauchen

---

## 2. Was ein Manöver ist [ARBEITSSTAND]
Manöver sind besondere Anwendungen eines vorhandenen Könnens.
Sie verändern Nutzung, Wirkung, Kontrolle, Mobilität, Schutz, Zugriff oder Präzision.

Ein Manöver liegt vor, wenn mindestens einer dieser Punkte klar erfüllt ist:
- es braucht ein **besonderes Einsatzfenster**
- es erzeugt eine **spürbar andere Wirkung** als die Basisaktion
- es kostet **Aktionszeit** oder trägt ein klares Zusatzrisiko
- es eröffnet eine **gezielte Gegenreaktion**
- es verschiebt die Szene deutlich in Richtung **Kontrolle, Zugriff, Stellung oder Eskalation**

Normale Angriffe und Basisaktionen sind in der Regel **keine Manöver**.
Nicht jede gute Beschreibung oder clevere Idee wird automatisch zu einem eigenen Manöver.

---

## 3. Abgrenzung zu Basisaktionen [ARBEITSSTAND]
### 3.1 Basisaktion
Eine Anwendung bleibt im Grundkern, wenn sie:
- häufig vorkommt
- ohne Sonderlogik funktioniert
- kein enges Einsatzfenster braucht
- keine eigene Kosten- oder Konterlogik verlangt

Beispiele:
- normal angreifen
- normal ausweichen
- sich in Deckung bewegen
- jemanden ansprechen
- ein einfaches Schloss unter ruhigen Bedingungen öffnen

### 3.2 Manöver
Ein Manöver ist sinnvoll, wenn die Frage am Tisch nicht nur lautet **"schaffe ich das?"**, sondern zusätzlich:
- **komme ich rechtzeitig in dieses Fenster?**
- **lohnt sich die Investition in Aktionszeit, Lage und Konsequenz?**
- **öffne ich mich für Gegenwehr?**
- **verändere ich damit Stellung, Kontrolle oder Zugriff spürbar?**

### 3.3 Vereinfachungslinie [GELOCKT]
URoP führt aktuell **keine eigene Zwischenebene für Optionen / Techniken**.
Was kein volles Manöver braucht, bleibt vorerst einfache Anwendung von Fertigkeit, Spezialisierung und Lage.

## 4. Manöverachsen [ARBEITSSTAND]
Jedes Manöver sollte künftig auf drei Achsen lesbar sein.

### 4.1 Einsatzdomäne
- **Kampf**
- **Einfluss / Sozial**
- **Technik / Zugriff**
- später möglich: Fahrzeuge, Magie, Psi, Sondermodule

### 4.2 Timing
- **aktiv** = in der eigenen Handlung ausgeführt
- **reaktiv** = Antwort auf erkennbare gegnerische Handlung
- **nachsetzend** = baut auf bereits geschaffene Öffnung, Kontrolle oder Vorbedingung auf

### 4.3 Hauptrolle
- **Druck** = mehr unmittelbare Wirkung, Bedrohung oder Tempo
- **Kontrolle** = Zugriff, Festlegung, Einschränkung, Stellung
- **Öffnung** = Fenster schaffen, Schutz knacken, Linie aufbrechen
- **Sicherung** = Risiko senken, Stabilität erhöhen, Lage absichern
- **Abbruch / Entzug** = gegnerische Linie unterbrechen, Distanz, Zugriff oder Takt verlieren lassen

Diese Achsen dienen aktuell vor allem als Lesehilfe und Konstruktionsblick, nicht als Pflichtfelder der JSON-Struktur.

---

## 5. Tierlogik [ARBEITSSTAND]
- **T0** = Grundmanöver
- **T1** = Kernmanöver
- **T2** = fortgeschrittene Manöver
- **T3** = Meistermanöver

### 5.1 Leitlinie
Je höher das Tier, desto eher sinnvoll:
- höhere Aktionskosten oder Vorbereitung
- zusätzliche Voraussetzungen
- staerkere Konsequenzen beim Re-Einsatz
- engeres Einsatzfenster
- stärkere oder kontrollierendere Wirkung
- klarere Combo- oder Kettenlogik

### 5.2 Praktische Lesart der Tiers
#### T0 – Grundmanöver
- sehr nah an der Basisanwendung
- meist ohne Vorbereitung
- erzeugt einen kleinen, aber klar lesbaren Spezialvorteil
- soll das System nicht verlangsamen
- oft guter Kandidat für Spezialisierungsflair

#### T1 – Kernmanöver
- häufige, nützliche Spezialwerkzeuge
- klar stärker oder präziser als die Basisaktion
- wenig bis mittlere Vorbedingung
- soll im Alltagseinsatz attraktiv, aber nicht automatisch richtig sein

#### T2 – Fortgeschrittene Manöver
- deutlicher Szeneneingriff
- brauchen meist Lagevorteil, Vorbereitung, Spezialisierung oder gutes Timing
- starke Kontrolle, harte Öffnung oder reaktive Umkehr sind hier typisch
- dürfen scheitern, ohne wertlos zu sein, müssen aber spürbares Risiko tragen

#### T3 – Meistermanöver
- große Szenenverschiebung
- enge Fenster, harte Voraussetzungen oder vorherige Kette
- oft Finisher, dominanter Kontrollabschluss oder hochriskante Spitzenaktion
- nicht für Spam gedacht

### 5.3 Ranklogik innerhalb einzelner Manoeverfamilien [ARBEITSSTAND]
Nicht jedes Manoever braucht mehrere Lernstufen.
Wo Balancing, Spezialisierung oder Wahlverbesserungen davon gewinnen, fuehrt die JSON jetzt **Rank-Familien**:
- **Rank I** = Einstieg in das Manoever
- **Rank II** = aufbauender Fortschritt, nicht ueberspringbar
- **Rank III** = Endrank, ebenfalls nur sequentiell erreichbar

Leitlinien:
- hoeherer Rank ersetzt niedrigere Ranks nicht automatisch
- `learn_cost_ep` ist immer die **Zusatzinvestition fuer genau diesen Rank**
- die Rank-Familie darf von der reinen Tier-Kostentabelle abweichen, wenn das Balancing es braucht
- Voraussetzungen und Upgrade-Details bleiben oft bewusst lesbar als Text statt als starre Pflichtmatrix

---

## 6. Manoeverkosten und Einsatzfenster [GELOCKT / TESTSTAND]
### 6.1 Aktionskosten
Manoever werden ueber Aktionszeit statt Ausdauer bezahlt:
- **Frei** (nur kleine, nicht kampfentscheidende Effekte)
- **Aktion**
- **2+ Aktionen** (Setup, Aufbau, Finisher-Vorbereitung)

### 6.1.1 Erwerbskosten (EP)
Manoever werden im Build zusaetzlich mit Entwicklungspunkten gekauft.
Die JSON trennt jetzt sauber zwischen **Erwerbskosten** (`learn_cost_ep`) und **Einsatzkosten** (`action_cost`, `uses_reaction_window`, `activation_notes`).

Die Tiertabelle bleibt als Orientierungswert bestehen:
- **T0** = 0 EP
- **T1** = 15 EP
- **T2** = 30 EP
- **T3** = 50 EP

Diese Tabelle ist aktuell mit `tier_cost_reference` in der JSON synchronisiert.
Bei Rank-Familien darf ein Folgerank davon bewusst abweichen, weil `learn_cost_ep` nur den **naechsten Schritt der Familie** bezahlt und nicht das ganze Manoever neu einkauft.

### 6.2 Einsatzfenster
Jedes Manoever erhaelt zusaetzlich ein Einsatzfenster.
Diese Information wird jetzt in der JSON je Eintrag ueber `usage_window` gefuehrt:
- **beliebig** (nur bei kleinen Effekten)
- **1x pro Kampf**
- **1x pro Szene**

### 6.3 Re-Einsatz
Wird ein limitiertes Manoever in derselben Szene erneut genutzt,
entsteht mindestens eine leichte Konsequenz; bei weiteren Re-Einsaetzen steigt die Haerte.

Typische Kurzzeit-Konsequenz fuer risikoreiche Nahkampfmanoever:
- **Offen** (leichter zu treffen, anfaellig fuer passende Folgeangriffe/Finisher)

### 6.4 Eskalationsleiter fuer limitierte Manoever [TESTSTAND]
Standardleiter fuer Manoever mit **1x pro Kampf** oder **1x pro Szene**:
- 1. Einsatz: normal
- 2. Einsatz: leichte Konsequenz
- 3. Einsatz: mittlere Konsequenz plus optional erhoehtes Risiko
- 4. Einsatz: schwere Konsequenz oder Sperre bis Szenenende

Die JSON fuehrt das je Eintrag ueber `reuse_escalation_profile`:
- `none`
- `standard_conflict`
- `strict_scene`

Leitlinie:
- 1x pro Kampf darf tendenziell etwas milder eskalieren.
- 1x pro Szene eskaliert bei Re-Einsatz strenger.

---

## 7. Voraussetzungen [ARBEITSSTAND]
Ein Manöver kann auf bis zu vier Arten gebunden sein:
- **Könnensbindung** = passende Fertigkeit oder Spezialisierung
- **Lagebindung** = Deckung, Nahdistanz, Griffkontakt, Zeitfenster, laufende Verhandlung, Zugriff auf System usw.
- **Ressourcenbindung** = Aktionszeit, Werkzeug, freie Hand, Munition, Ruhe, Position
- **Kettenbindung** = vorherige Öffnung, angesammelter Druck, bestehende Kontrolle oder Setup aus Voraktion

Die JSON fuehrt Voraussetzungen jetzt bewusst meist als **`requirements_text`** statt als Pflichtlisten.
Grund: Viele Anforderungen sind am Tisch besser lesbar und auslegbar, als wenn sie zu frueh in starre Arrays zerlegt werden.
Strukturiert bleiben nur die harten Balancing-Felder, nicht jede einzelne Lagebedingung.

### Tier-Faustregel
- **T0**: meist nur Könnensbindung
- **T1**: Könnensbindung plus leichte Lagebindung
- **T2**: fast immer mindestens eine echte Lage- oder Kettenbindung
- **T3**: in der Regel zwei Bindungen oder ein sehr enges Fenster

---

## 8. Auflösung eines Manövers [ARBEITSSTAND]
Empfohlene Reihenfolge am Tisch:
1. **Ansage** – was genau soll erreicht werden?
2. **Fenster prüfen** – ist die Lage dafür offen?
3. **Kosten festlegen** – Aktionskosten und sonstige Bindungen zahlen
4. **Probe lesen** – führender Wert, unterstützender Wert, Widerstand oder Lage
5. **Ergebnis deuten** – nicht nur Erfolg/Misserfolg, sondern Wirkung, Stellung, Risiko, Folgefenster
6. **Gegenfenster prüfen** – eröffnet das Manöver eine sinnvolle Reaktion?

### Ergebnislesung
Ein gutes Manöver sollte nicht nur "mehr Schaden" bedeuten, sondern mindestens eine dieser Fragen mitbeantworten:
- Wer kontrolliert jetzt die Lage?
- Wer verliert Zugriff, Deckung, Haltung oder Linie?
- Welche Folgeaktion wird leichter oder schwerer?
- Entsteht ein neues Fenster für Verbündete oder Gegner?

---


### 8.1 Reaktionsökonomie [ARBEITSSTAND]
Reaktive Manöver teilen sich eine **gemeinsame knappe Reaktionsressource**.

Grundsatz:
- jede Figur hat pro eigenem Initiativzyklus **ein Reaktionsfenster**
- dieses Fenster erneuert sich mit der **nächsten regulären Handlung** der Figur
- ein reaktives Manöver **verbraucht** dieses Fenster, egal ob es gelingt oder scheitert
- pro Auslöser darf eine Figur **nur eine** reaktive Antwort ansagen
- ein reaktives Manöver eröffnet **nicht sofort wieder** eine weitere reaktive Kette

Was das praktisch bedeutet:
- `Konter`, `Reaktionsschuss`, `Sozialer Konter`, `Alarm verzögern`, `Befreien aus Griff` und `Schnellziehen` konkurrieren um dasselbe Reaktionsfenster, wenn sie als reaktive Manöver gelesen werden.
- normale Gegenwehr, Widerstand oder fiktionales Ausweichen ohne volles Manöver verbrauchen dieses Fenster nicht automatisch.
- reaktive Manöver brauchen immer einen **konkret lesbaren Trigger**: sichtbarer Angriff, offener Griff, klares Peek-/Bewegungsfenster, erkennbare soziale Spitze oder ein schon laufender Alarmpfad.
- reaktive Manoever sind nicht an einen Ausdauer-Counter gebunden, sondern an Reaktionsfenster, Einsatzfenster, Lage und Konsequenz.

Ziel dieser Regel:
Reaktive Manöver sollen scharf, spannend und stark bleiben, aber nicht zu einer kostenlosen Universalunterbrechung für jede Szene werden.

### 8.2 Reaktiv-Leitplanken fuer Balancing [ARBEITSSTAND]
Damit Reaktionsfamilien stark bleiben, ohne den Tischfluss zu brechen, gilt zusaetzlich:

- **Rank-Effekt statt Fenster-Mehrung**
  - hoehere Reaktionsranks machen Antworten verlaesslicher oder schaerfer
  - sie erzeugen **keine** zusaetzlichen Reaktionsfenster

- **Triggerqualitaet vor Rankhohe**
  - Rank II und III in reaktiven Familien verlangen einen **klaren hard trigger**
  - diffuse Vorahnung oder unscharfe Absichtssignale reichen nur fuer Rank I oder basisnahe Gegenwehr

- **Ansagebindung**
  - bei mehreren moeglichen Reaktionen wird vor dem Wurf genau **eine** Antwort angesagt
  - kein nachtraegliches Umschalten zwischen `Konter`, `Reaktionsschuss`, `Sozialer Konter`, `Alarm verzoegern` oder `Schnellziehen`

- **Eskalations-Floor fuer Reaktionsfamilien**
  - reaktive Manoever mit `once_per_conflict` sollen mindestens `standard_conflict` als Re-Einsatz-Eskalation behalten
  - dadurch bleiben Wiederholungen teuer genug und werden nicht zur Dauerunterbrechung

- **Kein Reaktionsketten-Spiel**
  - ein reaktives Manoever erzeugt nicht sofort wieder ein neues Reaktionsfenster
  - damit bleibt die Reihenfolge lesbar und die Initiative bleibt entscheidungsrelevant

## 9. Typische Kern-Manöver mit geschärfter Tierzuordnung [ARBEITSSTAND]
Die folgende Zuordnung ist der aktuelle aktive Teststand der **vollen Manöver**.

### 9.1 Nahkampf
- **Befreien aus Griff** – **T0 (0 EP)**
  - defensives Grundmanöver mit engem Reaktionsfenster
- **Entwaffnen I-III** – **T1 bis T3 Rank-Familie**
  - skaliert von stabilem Waffenlinienbruch bis zu harter Waffenkontrolle in engem Fenster
- **Umreißen / Niederwerfen** – **T1 (15 EP)**
  - gute Kontrolloption ohne Endspielcharakter
- **Festsetzen I-III** – **T2/T3 Rank-Familie**
  - baut von klarer Bindung bis zu meisterlicher Lagehoheit aus, bleibt aber commitment-lastig
- **Konter** – **T2 (30 EP)**
  - reaktiv, timingkritisch, beansprucht das Reaktionsfenster
- **Finisher I-III** – **T2/T3 Rank-Familie**
  - Abschlussaktion mit harter Vorbedingung und sequentiellem Ausbau

### 9.2 Fernkampf
- **Schnellziehen I-III** – **T0 bis T2 Rank-Familie**
  - Eskalationsfenster beim Übergang in offene Gewalt; hoehere Ranks entfernen den hektischen Anschlussnachteil und oeffnen spaeter nur passende Folgefenster, nicht gratis fremde Manoeverkosten
- **Präzisionsschuss I-III** – **T1 bis T3 Rank-Familie**
  - klassisches Zielwirkungsmanoever; hoehere Ranks verkuerzen vor allem die noetige Vorbereitung
- **Unterdrückungsfeuer I-III** – **T2/T3 Rank-Familie**
  - skaliert von stabiler Raumkontrolle zu meisterlicher Feuerzonen-Hoheit bei weiter hohem Bindungs- und Verbrauchspreis
- **Reaktionsschuss I-III** – **T2/T3 Rank-Familie**
  - reaktive Bewegungsunterbrechung wird uebersichtlich staerker, bleibt aber strikt an Trigger und Reaktionsknappheit gebunden

### 9.3 Einfluss
- **Gesprächsschock I-III** – **T2/T3 Rank-Familie**
  - baut von hartem Kippmoment zu meisterlicher Deutungswirkung aus, bleibt aber bewusst ein seltenes Spitzenwerkzeug
- **Sozialer Konter I-III** – **T2/T3 Rank-Familie**
  - reaktive Deutungsumkehr wird robuster, ohne zur kostenlosen Universalparade zu werden

### 9.4 Technik
- **Bypass I-III** – **T2/T3 Rank-Familie**
  - skaliert von fragiler Umgehung hin zu robuster Zugriffsoeffnung unter Druck
- **Alarm verzögern I-III** – **T2/T3 Rank-Familie**
  - reaktive Zeitkontrolle wird ueber die Ranks verlaesslicher und weniger eskalationshart

Basisnahe Anwendungen wie ruhiges Öffnen, saubere Routinearbeit, normales Gesprächsführen oder einfache Improvisation bleiben **keine vollen Manöver**, solange sie keine eigene Fenster-, Kosten- oder Gegenlogik brauchen.

## 10. Gegenmanöver [ARBEITSSTAND]
Gegenmanöver sind **keine Universalabwehr**.
Sie sind gezielte Antworten auf:
- bestimmte gegnerische Handlungen
- erkennbare Manöver
- klare Situationen
- passende Reichweite, Distanz oder Zugriffslage

### 10.1 Einfacher Gegenmanöver-Rahmen
Ein Gegenmanöver sollte immer zu **einer** dieser Antwortarten gehören:
- **abfangen** = gegnerisches Manöver vor Wirkung brechen
- **umlenken** = Wirkung abschwächen, Richtung ändern oder auf schlechteres Ziel laufen lassen
- **entziehen** = Fenster schließen, Distanz, Zugriff oder Gesprächslinie kappen
- **umkehren** = Druck oder Kontrollversuch gegen den Gegner zurückspiegeln

### 10.2 Was Gegenmanöver normalerweise nicht dürfen
- alles gleichzeitig abwehren
- ohne klares Erkennungsfenster funktionieren
- jede stärkere Aktion kostenlos neutralisieren
- die Basisinitiative dauerhaft aushebeln

### 10.3 Praktische Gegenfenster
Sinnvolle Gegenmanöver-Fenster sind zum Beispiel:
- Annäherung oder Clinch-Versuch
- Entwaffnen, Festsetzen, Hebel, Wurf
- Präzisionsschuss, Reaktionsschuss, Bereichswurf
- Gesprächsübernahme, Gesprächsschock, Druckspitze
- Bypass, falsche Freigabe, Alarmmanipulation

### 10.4 Leitlinie für spätere Matrix
Nicht jedes Manöver braucht eine eigene Sonderabwehr. Gegenlagen und Folgefenster werden aktuell im Regeltext und in der Beschreibung des jeweiligen Manövers mitgeführt, nicht über eine starre Pflichtmatrix.

---

## 11. Aktiver Feldkern der JSON [GELOCKT]
Der aktuelle Datenkern der Manöver ist bewusst schlank gehalten:
- `id`
- `family_id`
- `family_name`
- `name`
- `rank`
- `previous_rank_id`
- `tier`
- `learn_cost_ep`
- `action_cost`
- `uses_reaction_window`
- `activation_notes`
- `usage_window`
- `reuse_escalation_profile`
- `rules_short`
- `description`
- `requirements_text`
- `advancement_mode`
- `advancement_text`

Frühere Strukturfelder wie `domain`, `timing`, `role`, `window`, `counter_window`, `response_type`, Klassenmarker oder fein zerlegte Voraussetzungen/Upgrade-Matrizen laufen derzeit bewusst im Fließtext statt als Pflichtfelder.

Interne Hilfsfelder:
- `internal_refs` wird maschinenlesbar fuer Cross-Referenzen gepflegt (z. B. Skill- und Datenblock-Bezuege)
- diese internen Felder sind **nicht** fuer Drucklisten oder Regelbuch-Lesefassungen gedacht und werden in Spieler-Ausgaben ausgeblendet

---

## 12. Testkatalog [ARBEITSSTAND]
Ein Manöver ist im aktuellen URoP-Kern dann gelungen, wenn es:
- sich klar von der Basisaktion abhebt
- ein echtes Entscheidungsfenster schafft
- nicht bloß rohe Zahlen stapelt
- Kosten, Risiko und Wirkung sauber zusammenführt
- Gegenreaktionen lesbar macht
- auch außerhalb reiner Schadenslogik Mehrwert erzeugt
- den Basiskern nicht mit Sonderfällen überlädt

---

## 13. Noch offen
- genaue Einzeleffekte pro Manöver
- Kettenbindung für `Festsetzen` und `Finisher` noch schärfer formulieren
- konkrete soziale Trigger klarer in Lesebeispiele ziehen
- falls später nötig: Anschluss- oder Finisherlogik gezielt ergänzen, statt den Kern sofort wieder aufzublähen
- Endlock der Re-Einsatz-Eskalation pro Tier
- Praxistest der Reaktiv-Leitplanken (Triggerqualitaet, Ansagebindung, Eskalations-Floor) gegen echtes Tischtempo
