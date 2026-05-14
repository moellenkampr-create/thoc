# URoP – Quickhacks Praxistest
> Hinweis: Historischer Praxistest-Snapshot vom 2026-04-09. Nicht führend für die aktuelle Feldstruktur; bei Widersprüchen gilt der aktuelle JSON-/Regelstand.

Stand: 2026-04-09

## Ziel des Tests
Geprueft wurde nicht mathematische Balance, sondern Spielfluss:
- Greifen Zugang und Quelle glaubwuerdig ineinander?
- Oeffnen Quickhacks Szenen, statt sie zu ersetzen?
- Fuehlen sich Elektronik, Cyberware und Systemhacks wie Teamplay an?
- Wo ist der Stand schon tragfaehig, wo ist er noch weich?

---

## Testszenario 1 – Einbruch ueber Servicetuer
### Lage
Die Gruppe steht vor einer digitalen Seitentuer. Das Schloss ist nicht frei erreichbar. Eine Figur arbeitet mit **Elektronik**, loest die Verkleidung und legt den Kontakt frei. Danach soll das Schloss digital geoeffnet werden.

### Eingesetzte Elemente
- Vorarbeit: **Elektronik / physisch freigelegt**
- Quickhack: `Sicherheitsschloss freischalten`
- Quelle: `onsite_link` oder `prepared_access`

### Ergebnis
**Trifft den gewuenschten Cyberpunk-Ton sehr gut.**
Der Ablauf fuehlt sich sinnvoll an:
1. Vor-Ort-Arbeit schafft den Angriffspunkt.
2. Der Hack nutzt genau dieses Fenster.
3. Das Ergebnis ist lokal, nützlich und nicht weltbrechend.

### Was gut funktioniert
- Elektronik und Quickhack greifen sauber ineinander.
- Der Hack ersetzt die Vorarbeit nicht.
- Risiko ueber `trace/alarm/collateral` passt gut.

### Offene Kante
- Keine grobe Kante. Das ist derzeit einer der staerksten und glaubwuerdigsten Referenzfaelle.

### Urteil
**Bestanden.**
Soll spaeter als Musterfall fuer "Vorarbeit -> Hackwirkung" dienen.

---

## Testszenario 2 – Kamera und Turret im Korridor
### Lage
Die Gruppe will durch einen gesicherten Korridor.
- Eine Kamera soll die Gruppe ignorieren.
- Ein Autoturret soll entweder pausieren oder auf freundlich kippen.

### Eingesetzte Elemente
- `Kamera auf freundlich`
- `Autoturret auf freundlich`
- Zugang: `same_network` oder `prepared_access`

### Ergebnis
**Im Grundsatz funktioniert das gut, aber mit unterschiedlicher Schwere.**
- Die Kamera als Basis-Eingriff fuehlt sich passend an.
- Das Turret als volles Manoever fuehlt sich ebenfalls passend an.

### Was gut funktioniert
- Die Trennung Kamera = kleinerer Systemeingriff / Turret = haertere Umschreibung ist stimmig.
- Netznaehe oder vorbereiteter Zugang fuehlen sich hier viel glaubwuerdiger an als freier Gedankenhack.
- Teamplay bleibt erhalten, wenn die Gruppe erst an Netznaehe oder an einen Knoten kommen muss.

### Offene Kante
Der Ausdruck **"auf freundlich"** ist stark. Er kann drei sehr unterschiedliche Staerken meinen:
1. ignoriert die Gruppe kurz
2. priorisiert andere Ziele
3. wechselt aktiv die Seite

Fuer Kameras ist das noch ok.
Fuer Turrets und schwere Drohnen ist das ohne Abstufung schnell zu stark.

### Urteil
**Im Kern bestanden, aber begrifflich zu grob.**
Spaeter sinnvoll:
- bei Kamera darf "freundlich" weit gelesen werden
- bei Turret eher staffeln in `ignoriert`, `pausiert`, `IFF verschoben`, `Feindbild kippt`

---

## Testszenario 3 – Personenhack im Feuergefecht
### Lage
Ein Gegner mit Smartgun-Link und Reflexbooster wird im Feuergefecht erst gescannt. Danach versucht der Hacker:
- `Waffe sperren`
- alternativ `Systemschock`

### Eingesetzte Elemente
- Vorstufe: `Scan & Markieren`
- Ziel: Person mit vernetzter Cyberware
- Cyberware-Exposition aus `URoP_Cyberware.json`: wireless/high ist angreifbarer als local/none

### Ergebnis
**Funktioniert grundsaetzlich, ist aber die weichste Stelle des Moduls.**
Die Idee ist stark und genrepassend.
Aber genau hier droht Quickhacking zu frei zu werden, wenn `scanned_marked` allein zu oft als voller Zugang zaehlt.

### Was gut funktioniert
- Gegen stark vercyberte Ziele fuehlt sich Quickhacking sehr cyberpunkig an.
- `Waffe sperren` als Manoever ist passend.
- `Systemschock` als harter digitaler Druck ist passend.

### Offene Kanten
- Reicht **Scan + Markierung** schon fuer jeden Personenhack? Das fuehlt sich schnell zu gross an.
- `network_exposure` aus Cyberware ist richtig angelegt, aber im Spieltext noch nicht stark genug mit dem Hackzugang verbunden.
- Gegen wenig vernetzte oder bewusst abgeschirmte Gegner muss der Erzähler klar haerter werden duerfen.

### Urteil
**Teilweise bestanden.**
Der Block ist gut genug fuer den Arbeitsstand, braucht spaeter aber eine klarere Tischleitlinie:
- `scanned_marked` eher fuer kleine/schnelle Eingriffe
- fuer harte Kampfhacks oft zusaetzlich echte Angriffsoberflaeche, Netznaehe oder bekannter Link sinnvoll

---

## Testszenario 4 – Fahrzeugdiebstahl unter Druck
### Lage
Ein Auto soll schnell uebernommen werden. Von aussen ist es normal verriegelt. Die Gruppe schafft erst einen Zugang ueber Elektronik oder einen Serviceport. Danach soll `Fahrzeugsicherheit umgehen` laufen.

### Eingesetzte Elemente
- Vorarbeit: Elektronik / physisch freigelegt / direkter Link
- Quickhack: `Fahrzeugsicherheit umgehen`
- moegliche Folge: Fahrzeug starten, Wegfahrsperre umgehen, Nutzerprofil kippen

### Ergebnis
**Trifft den Stil sehr gut.**
Das fuehlt sich nach Cyberpunk und nicht nach Fantasy-Diebstahl an.

### Was gut funktioniert
- Das Fahrzeug ist kein Sonderminispiel, sondern bleibt im gleichen Kern.
- Vor-Ort-Link und freigelegte Systeme geben klare Teamplay-Momente.
- Auch unter Zeitdruck bleibt die Szene gut lesbar.

### Offene Kante
- Fuer spaeter koennte man unterscheiden zwischen
  - Tuer auf
  - Wegfahrsperre weg
  - Besitzerprofil umgehen
  - Fernortung / Sicherungsalarm unterdruecken

Aktuell ist das aber noch kein Problem, eher nur grob gebuendelt.

### Urteil
**Bestanden.**
Einer der besten Referenzfaelle fuer spaetere Vehicles-Regeln.

---

## Testszenario 5 – Drohne im Sicherheitsnetz
### Lage
Eine Sicherheitsdrohne patrouilliert im Innenraum und haengt im selben Netz wie Kamera und Turret. Ein Hacker will sie mit `Drohne umflaggen` aus dem Netzverbund heraus gegen die Betreiberlogik drehen.

### Eingesetzte Elemente
- `Drohne umflaggen`
- Zugang: `same_network`, `prepared_access` oder `scanned_marked`

### Ergebnis
**Grundsaetzlich gut, aber mit derselben Kante wie das Turret.**
Leichte oder halbautonome Drohnen kann man sich so gut vorstellen.
Bei harten Sicherheitsdrohnen fuehlt sich ein voller Seitenwechsel schnell zu stark an, wenn kein vorbereiteter Zugriff oder echter Netzvorteil da ist.

### Was gut funktioniert
- Als Manoever ist es richtig eingeordnet.
- Es produziert schoenes Cyberpunk-Teamplay.
- Es skaliert gut mit dem Setting: einfache Drohne leichter, Militärdrohne schwerer.

### Offene Kante
- `scanned_marked` ist hier als Zugang wahrscheinlich zu grosszuegig fuer schwere Drohnen.
- Der Spieltext darf staerker sagen: fuer schwere Drohnen ist `prepared_access`, `same_network` mit echter Netznaehe oder `direct_link` die glaubwuerdigere Spur.

### Urteil
**Bestanden mit Vorbehalt.**
Die Richtung passt, der Zugang fuer harte Ziele sollte spaeter etwas enger kommentiert werden.

---

## Gesamtfazit
Der Quickhack-Block **traegt bereits**.
Er fuehlt sich nicht wie Magie an, sondern wie:
- digitaler Zugriff
- situativer Eingriff
- Teamplay mit Elektronik, Cyberware und Infiltration

### Was schon gut sitzt
- Schloesser, Tueren, Kameras
- Fahrzeugsicherheit
- Netznaehe als glaubwuerdiger Hebel
- Vor-Ort-Link / freigelegt / vorbereiteter Zugang
- Risiko ueber Trace, Alarm und Gegenwehr statt Mana

### Wo die Weichheit sitzt
1. **Personenhacks im Kampf**
   - vor allem bei `scanned_marked` als moeglich zu freiem Zugang
2. **"Auf freundlich stellen"**
   - als Formulierung fuer Turrets und starke Drohnen noch zu grob
3. **Verknuepfung zu Cyberware-Exposition**
   - `network_exposure` ist in den Daten gut, im Lesefluss aber noch nicht stark genug als Tischleitlinie verankert

### Arbeitsurteil
**Quickhacks sind fuer eine Vorabfassung bereits brauchbar.**
Sie muessen jetzt nicht in ein starres Minispiel gezwungen werden.
Der richtige naechste Schritt waere eher:
- 1–2 kurze Tischleitlinien zur Zugriffshaerte gegen Personen / schwere Systeme
- danach lieber weiter zu **Netrunning** oder **Vehicles**, statt Quickhacks zu totnormieren

---

## Kurzempfehlung fuer den aktuellen Spielstand
Fuer jetzt reicht am Tisch im Zweifel diese einfache Leitlinie:
- **kleine Systemhacks** gehen oft schon mit plausibler Netznaehe oder Vorarbeit
- **harte Personen- und Kampfhacks** brauchen meist mehr als nur Sichtkontakt
- **schwere Sicherheitsziele** sollten selten ohne vorbereiteten Zugang oder echten Netzvorteil kippen
- wenn etwas zu leicht wirkt, nicht neue Unterregeln bauen, sondern die Zugriffshuerde in der Fiktion hoeher setzen
