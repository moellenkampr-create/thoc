# URoP – Vehicle Praxistest
> Hinweis: Historischer Praxistest-Snapshot vom 2026-04-09. Nicht führend für die aktuelle Feldstruktur; bei Widersprüchen gilt der aktuelle JSON-/Regelstand.

Stand: 2026-04-09

## Zweck
Dieser Praxistest prueft die **einfache Fahrzeugschicht** gegen kurze Cyberpunk-Szenen.
Es geht nicht um Feinsimulation, sondern um die Frage, ob **Druckfahrt, Verfolgung, Crewspiel, Fahrzeughacks und mobile Gefechte** mit dem gesetzten URoP-Kern bereits tragfaehig sind.

Grundsatz:
**Leistungswert -> Wurf -> Ergebnis -> Wirkung/Konsequenz**

---

## Testszene 1 – Flucht auf dem Street Bike
### Lage
Eine Runnerin startet bei Nacht auf einem Street Bike und muss zwei Blocks Vorsprung gegen einen Streifenwagen gewinnen.

### Was die Szene prueft
- Druckfahrt statt normaler Fortbewegung
- Positionsleiter statt Meterrechnung
- enger Stadtverkehr als Hindernis

### Lesung am Tisch
- Die Szene startet auf **nah**.
- Die Fahrerin will ueber Seitengassen und rote Kreuzungen auf **vorsprung** kommen.
- Der Streifenwagen ist stabiler, aber in den engen Luecken weniger beweglich.

### Ergebnis
- Die **Positionslogik** reicht hier voll aus.
- Man braucht keine exakte Distanz in Metern.
- Bikes fuehlen sich sofort anders an als Autos, ohne dass ein zweites Fahrregelsystem noetig wird.

### Fazit
**Traegt sehr gut.**
Die Fahrzeugschicht ist stark, wenn sie Bewegung als Lagewechsel liest statt als Zahlenrennen.

---

## Testszene 2 – Van-Run mit Crewspiel
### Lage
Ein Cargo Van zieht unter Feuer aus einem Industriehof. Fahrer, Schuetze und Hacker handeln gleichzeitig.

### Was die Szene prueft
- Mehrere sinnvolle Rollen im selben Fahrzeug
- Drive-by / Feuerwinkel
- Fahrzeughack waehrend der Bewegung

### Lesung am Tisch
- Der Fahrer haelt Linie und versucht von **gleichauf** auf **vorsprung** zu kommen.
- Der Schuetze gibt Deckungsfeuer auf Verfolger am Tor.
- Der Hacker versucht das automatische Werktor kurz offen zu halten.

### Ergebnis
- Das **Crewspiel funktioniert** bereits mit der jetzigen Schicht.
- Fahrer bleibt wichtig, ohne alle anderen auszusperren.
- Quickhacks docken natuerlich an Fahrzeuge und Infrastruktur an.

### Fazit
**Traegt gut.**
Die Fahrzeugregeln gewinnen deutlich, sobald das Fahrzeug als Plattform statt nur als Fortbewegungsmittel gelesen wird.

---

## Testszene 3 – Pursuit Sedan gegen Armored SUV
### Lage
Ein Pursuit Sedan verfolgt ein gepanzertes SUV auf Stadtautobahn und Zubringern.

### Was die Szene prueft
- Unterschied zwischen **control**, **speed**, **protection_value** und **durability**
- Verfolgung mit Positionsstufen
- mobile Bedrohung ohne Detailtabelle

### Lesung am Tisch
- Das Sedan kann besser Linien schneiden und Druck aufbauen.
- Das SUV schluckt mehr Feuer und kann Fehler eher wegstecken.
- Die Verfolgung kippt nicht ueber Topspeed-Tabellen, sondern ueber Verkehr, Ramprisiko, Feuer und Streckenwahl.

### Ergebnis
- Die Lesefelder der Fahrzeuge sind schon ausreichend unterschiedlich.
- Schutz und Haltbarkeit fuehlen sich als andere Achse an als Tempo und Kontrolle.
- Ein schweres Fahrzeug ist nicht automatisch in allem besser.

### Fazit
**Traegt.**
Die aktuelle Feldlogik ist fuer einen Vorabstand schon robust genug.

---

## Testszene 4 – Fahrzeugsicherheit und Diebstahl
### Lage
Ein Team will eine Corporate Limo stehlen. Die Tech-Figur legt im Serviceport Elektronik frei, danach geht der Hacker per direktem Link an Wegfahrsperre und Bordauthentifizierung.

### Was die Szene prueft
- Verbindung von Elektronik, Direktlink und Fahrzeugsystemen
- lokale Hacks statt vollem Netrun
- Fahrzeug als digitales Ziel

### Lesung am Tisch
- Die erste Huerde ist **Zugang schaffen**.
- Danach reichen ein lokaler Link und passende Ausruestung fuer den Eingriff.
- Kein tiefer Dive, kein eigener Matrixraum noetig.

### Ergebnis
- Diese Logik fuehlt sich sehr cyberpunkig an.
- Fahrzeuge sind so weder triviale Beute noch unantastbare Blackboxes.
- Der Unterschied zwischen **Quickhack** und **Netrunning** bleibt lesbar.

### Fazit
**Traegt sehr gut.**
Vor-Ort-Zugang + Direktlink ist fuer Fahrzeugdiebstahl und lokale Systemarbeit eine starke, einfache Leitlinie.

---

## Testszene 5 – Patrol AV ueber Gefahrenzone
### Lage
Ein Patrol AV bringt ein Einsatzteam ueber eine umkaempfte Zone. Ein Schuetze deckt den Landeanflug, waehrend der Pilot unter Feuer eine sichere Linie halten muss.

### Was die Szene prueft
- Flugplattform als Sonderfall
- mobile Deckung und Landedruck
- Crewrollen unter Beschuss

### Lesung am Tisch
- Der Pilot prueft nicht jede Einzelbewegung, sondern ob der AV stabil bleibt, Sichtlinie bricht und das Team aussteigen kann.
- Bordfeuer und Spotting bleiben Nebenrollen, keine eigene Luftkampfsimulation.

### Ergebnis
- Auch der AV funktioniert in der vereinfachten Logik.
- Die offene Kante ist nicht der Kern, sondern spaeter eher Sonderlogik fuer Flugduelle, Absturz oder starke Luftabwehr.

### Fazit
**Fuer Vorabfassung ausreichend.**
Flugfahrzeuge brauchen spaeter vielleicht einen kleinen Zusatzkasten, aber noch keine tiefe Extraschicht.

---

## Gesamtfazit
### Was schon gut traegt
- **Position statt Meter** ist die richtige Leitidee.
- **Crewspiel** macht Fahrzeuge sofort interessanter.
- **Quickhacks** und **Elektronik** docken glaubwuerdig an Fahrzeuge an.
- Unterschiedliche Plattformen lesen sich bereits ueber Kontrolle, Tempo, Schutz und Haltbarkeit gut genug.
- Fahrzeuge funktionieren als **Szenenschicht**, nicht als Fremdsystem.

### Was bewusst noch leicht bleiben darf
- exakte Chase-Manoever
- harte Rammregeln
- Fahrzeugwaffen im Detail
- Tuning und Umbauten
- Sonderfaelle fuer Luft- und Wasserduelle

### Wichtigste offene Leitlinie
Die Fahrzeugschicht sollte **nicht** weiter in ein Simulationsspiel gezogen werden.
Fuer URoP reicht derzeit:
- Lage lesen
- Fahrzeugrolle klaeren
- Druck benennen
- Position veraendern
- Folgen ausspielen

### Urteil
**Die aktuelle Vehicle-Grundarchitektur ist fuer eine Vorabfassung tragfaehig.**
Mehr Tiefe ist spaeter moeglich, aber derzeit nicht noetig.
