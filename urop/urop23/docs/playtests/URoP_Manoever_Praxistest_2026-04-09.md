# URoP – Manöver-Praxistest
> Hinweis: Historischer Praxistest-Snapshot vom 2026-04-09. Nicht führend für die aktuelle Feldstruktur; bei Widersprüchen gilt der aktuelle JSON-/Regelstand.

Stand: 2026-04-09
Zweck: erster harter Praxistest des Manöverkerns gegen Initiative, Ausdauer, Fenster und Gegenreaktionen

## 1. Testcharakter des Durchlaufs
Dies ist kein Zahlen-Balancing mit vollständigen Charakterbögen, sondern ein **Szenen-Praxistest**.
Getestet wurde, ob die aktuellen Manöver:
- am Tisch klar ansagbar sind
- ein erkennbares Einsatzfenster haben
- sich von Basisanwendungen abheben
- sinnvolle Folgefenster oder Gegenfenster erzeugen
- mit der aktuellen Ausdauerlogik attraktiv oder zu teuer wirken

Wichtige Einschränkung des aktuellen Datenstands:
- `URoP_Manoever.json` enthält zwar Tierlogik und Referenzmanöver, aber mehrere Wirkungsfelder wie `on_success`, `on_partial_or_tight` und `risk_or_counter_window` sind derzeit noch leer.
- Dieser Praxistest validiert daher vor allem **Szenenlogik und Systemgefühl**, noch nicht die finale Mikrowirkung jeder einzelnen Probe.

## 2. Praxisszene A – Nahkampf im Flur
**Lage:** Zwei Figuren geraten in enger Distanz aneinander. Eine führt ein Messer offen, die andere versucht, den Austausch zu kontrollieren.

### Genutzte Manöver
- `Entwaffnen` (T1)
- `Befreien aus Griff` (T0)
- `Festsetzen` (T2)
- `Konter` (T2)
- `Finisher` (T3)

### Testverlauf
1. `Entwaffnen` funktioniert als gutes Kernmanöver, wenn die Waffenlinie sichtbar und der Gegner im Austausch gebunden ist.
2. `Festsetzen` fühlt sich nur dann richtig an, wenn vorher wirklich eine Öffnung entstanden ist. Ohne vorherige Öffnung oder Lagevorteil wäre es zu breit.
3. `Konter` funktioniert als reaktives Elitewerkzeug, darf aber nur auf **klar lesbare** gegnerische Aktion anspringen, nicht auf jede vage Kampfhandlung.
4. `Finisher` liest sich sauber als Abschluss nach harter Öffnung oder Kontrolle. Direkt aus neutralem Austausch heraus wäre er falsch.

### Befund
- Die Kette **Entwaffnen -> Festsetzen -> Finisher** trägt sehr gut.
- `Befreien aus Griff` als T0 passt; es schützt die Verteidigerseite, ohne den Fluss zu bremsen.
- `Konter` ist stark, aber nur dann gesund, wenn das Reaktionsfenster eng bleibt.

### Designschluss
- `Festsetzen` soll im Text noch deutlicher an **vorherige Öffnung, Griff oder gebrochene Linie** gebunden werden.
- `Finisher` braucht weiter eine **harte Vorbedingung** und darf kein teurer Standardangriff werden.

## 3. Praxisszene B – Schusswechsel im Korridor
**Lage:** Eine Gruppe gerät in plötzliche Gewalt. Eine Figur zieht unter Druck, eine andere hält den Vorstoß mit Feuer zurück.

### Genutzte Manöver
- `Schnellziehen` (T0)
- `Präzisionsschuss` (T1)
- `Unterdrückungsfeuer` (T2)
- `Reaktionsschuss` (T2)

### Testverlauf
1. `Schnellziehen` passt sehr gut als T0. Das Manöver hat ein klares Einmalfenster beim Kippen in Gewalt.
2. `Unterdrückungsfeuer` trägt als Kontrollmanöver und fühlt sich deutlich anders an als ein normaler Schuss.
3. `Reaktionsschuss` wirkt spannend, wird aber schnell zu stark, wenn seine Reaktionsbindung nicht klar gegen andere Reaktionen abgegrenzt ist.
4. `Präzisionsschuss` funktioniert als sauberes T1-Werkzeug, solange er nicht jede normale Schussabgabe verdrängt.

### Befund
- Die Fernkampf-Manöver sind verständlich und rollenstark.
- Die Kombination aus fixer Initiative und reaktiven Schüssen braucht eine **harte Reaktionsökonomie**.

### Designschluss
- `Reaktionsschuss` und `Konter` müssen dieselbe knappe Reaktionsressource beanspruchen.
- `Unterdrückungsfeuer` sollte ausdrücklich Bewegung, Vorstoß, Peeken oder Linienwechsel stören, nicht primär Schaden ersetzen.

## 4. Praxisszene C – Soziale Eskalation im Verhörraum
**Lage:** Eine Zielperson hält Fassade. Die SC versuchen, die Haltung mit Druck oder einem plötzlichen Schlag zu brechen.

### Genutzte Manöver
- `Gesprächsschock` (T2)
- `Sozialer Konter` (T2)

### Testverlauf
1. `Gesprächsschock` funktioniert gut, wenn schon Druck, Widerspruch, Statusgefälle oder eine harte Wahrheit in der Szene liegt.
2. `Sozialer Konter` funktioniert nur dann gesund, wenn er auf eine **konkret erkennbare Aussage oder Linie** reagiert.
3. Ohne benennbare Fassade oder Haltung wird die Szene zu weich und kippt in bloßes Rollenspiel ohne Systemzähne.

### Befund
- Der Sozialkern trägt grundsätzlich.
- Er braucht aber klarere Formulierungen zu **Haltung**, **Fassade**, **sozialer Linie** und dem Punkt, an dem wieder nur eine normale Einflussprobe vorliegt.

### Designschluss
- `Gesprächsschock` bleibt T2.
- Für soziale Manöver sollte die Lesefassung später 3–5 typische Trigger klar benennen, damit der Tisch schneller erkennt, wann wirklich ein Manöverfenster offen ist.

## 5. Praxisszene D – Zugriff unter Zeitdruck
**Lage:** Ein Techniker steht vor einer gesicherten Zugangslösung. Direktes Öffnen wäre laut oder zu langsam; danach droht Alarm.

### Genutzte Manöver
- `Bypass` (T2)
- `Alarm verzögern` (T2)

### Testverlauf
1. `Bypass` fühlt sich deutlich anders an als normales Öffnen oder ruhige Elektronikarbeit und rechtfertigt damit seinen Manöverstatus.
2. `Alarm verzögern` funktioniert gut als reaktive Rettung, wenn Entdeckung schon droht.
3. Die Kombination aus zwei T2-Manövern in kurzer Folge zeigt aber, dass Technik-Spezialisten ihre Ausdauer sehr schnell in Spitzensituationen binden.

### Befund
- Die technische Domäne funktioniert, solange klar bleibt: Routine bleibt Basisanwendung; nur **Umgehung unter Druck** wird zum Manöver.
- Das Domänengefühl ist gut: Technik bekommt eigene Spitzenwerkzeuge, statt nur als Sonderwurf zu wirken.

### Designschluss
- `Bypass` und `Alarm verzögern` bleiben volle Manöver.
- Im Regeltext sollte noch klarer stehen, dass normales Öffnen, saubere Vorbereitung und Routinezugriff **keine** Manöver sein müssen.

## 6. Praxisszene E – Teamfight im Lagerhaus
**Lage:** Zwei SC arbeiten zusammen. Eine Figur fixiert Bewegungslinien auf Distanz, die andere geht in Nahdistanz auf Öffnung und Kontrolle.

### Genutzte Manöver
- `Unterdrückungsfeuer` (T2)
- `Entwaffnen` (T1)
- `Festsetzen` (T2)

### Testverlauf
1. `Unterdrückungsfeuer` erzeugt ein gutes Unterstützungsfenster für Verbündete.
2. `Entwaffnen` wird dadurch attraktiver, weil sich der Nahkämpfer nicht nur auf Schaden konzentrieren muss.
3. `Festsetzen` wird in diesem Teamkontext endlich als **harte Kontrollspitze** lesbar und nicht bloß als weiterer Angriff.

### Befund
- Der Manöverkern funktioniert besonders gut, wenn mehrere Figuren unterschiedliche Rollen spielen.
- Kontrolle, Öffnung und Sicherung tragen gemeinsam mehr als ein reiner Schadenswettlauf.

### Designschluss
- Das ist ein gutes Zeichen für das Grundziel von URoP: Manöver sollen Szenen formen, nicht bloß Zahlen stapeln.

## 7. Gesamtbefund
### Was schon trägt
- Die Trennung **Basisanwendung vs. volles Manöver** ist aktuell brauchbar und am Tisch gut lesbar.
- T0- und T1-Manöver sind attraktiv, ohne den Spielfluss unnötig zu verstopfen.
- Kampf-, Sozial- und Technikdomäne fühlen sich bereits unterschiedlich an.
- Das System gewinnt deutlich, wenn Manöver über **Kontrolle, Öffnung, Sicherung und Entzug** gelesen werden statt nur über Schaden.

### Wo es noch knirscht
1. **Reaktionsökonomie** ist noch nicht hart genug beschrieben.
   - `Konter`, `Reaktionsschuss` und ähnliche Antworten brauchen dieselbe knappe Reaktionsressource.
2. **Kettenbindung** ist noch nicht überall scharf genug.
   - `Festsetzen` und `Finisher` müssen klar an Vorbedingungen hängen.
3. **Soziale Trigger** sind noch zu weich beschrieben.
   - Der Tisch braucht klarere Hinweise, wann ein soziales Manöverfenster offen ist.
4. **JSON-Wirkungsfelder** sind noch unvollständig.
   - Für echte Feintests fehlen in `URoP_Manoever.json` noch konkrete Einträge zu Erfolg, knapper Lage, Risiko und Gegenfenster.

## 8. Ausdauer-Eindruck aus dem Praxistest
Aktueller Teststand der Tierkosten:
- T0 = 0
- T1 = 15
- T2 = 30
- T3 = 50

Aktuelle Regenerationswerte im Vorabregelwerk:
- Durchatmen = 3
- leichte Erschöpfung = 6
- schwere Erschöpfung = 12
- kurzes Ausruhen = 8

### Lesart
- T1 wirkt wie ein normaler, aber bewusster Einsatz.
- T2 wirkt wie echtes Commitment und passt für starke Eingriffe.
- T3 wirkt derzeit nicht wie Alltagswerkzeug, sondern eher wie **Szenenabschluss, Bossmoment oder Notnagel**.

### Vorläufige Bewertung
- **T1 = 15** wirkt plausibel.
- **T2 = 30** wirkt hart, aber noch passend für starke Kontrolle oder Reaktion.
- **T3 = 50** ist nur dann gesund, wenn T3-Manöver wirklich selten bleiben sollen.

Noch **kein sofortiger Regeländerungszwang**, aber T3 muss im weiteren Spieltest beobachtet werden. Wenn Spieler T3 fast nie freiwillig einsetzen, ist nicht das Konzept falsch, sondern wahrscheinlich der Preis zu hoch.

## 9. Empfehlung für den nächsten Schritt
Als nächster sinnvoller Schritt nach diesem Praxistest:
1. `URoP_Manoever.json` um **konkrete Wirkungsfelder** ergänzen
2. Reaktionsökonomie in der Lesefassung hart festziehen
3. 2–3 Beispielcharaktere gezielt gegen diese Manöver laufen lassen
4. erst danach die nächste Kostenkorrektur entscheiden
