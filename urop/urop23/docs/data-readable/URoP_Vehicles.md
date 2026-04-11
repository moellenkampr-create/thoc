# URoP – Vehicles
Stand: 2026-04-09

## Zweck dieser Datei
Diese Datei beschreibt die **einfach gehaltene Fahrzeugschicht** fuer das Cyberpunk-Modul.  
`URoP_Vehicles.json` ist die fuehrende Datenquelle. Diese MD-Datei bleibt die erklaerende Lesefassung.

---

## 1. Leitidee
Vehicles sollen **kein eigenes Rennspiel** aufmachen.

Sie erweitern den vorhandenen Kern fuer:
- Bewegung unter Druck
- Verfolgung und Flucht
- mobile Gefechte
- Crewspiel im Fahrzeug
- Transport, Last und mobile Deckung

Der Grundsatz bleibt:
**Leistungswert -> Wurf -> Ergebnis -> Wirkung/Konsequenz**

---

## 2. Wann Fahrzeugregeln ueberhaupt greifen
Nicht jede Fahrt braucht einen Regelblock.

### Meist regelarm
- normale Fahrt
- Anreise
- Verfolgung ohne echten Widerstand
- Routinepilotierung

### Eigentliche Fahrzeugszene
- enge Verfolgung
- Flucht unter Feuer
- schwierige Route, Schutt, Wetter oder Verkehrsdruck
- Rammen, Blocken, Boarding
- Bordwaffen oder Drive-by
- Hacking auf Fahrzeugfunktionen waehrend der Fahrt

---

## 3. Die vier Leselagen
### 3.1 Transit
Einfaches Bewegen von A nach B.  
Meist keine Sonderlogik noetig.

### 3.2 Druckfahrt
Heikle Fahrt unter Gefahr oder Zeitdruck.  
Oft reicht eine einzelne Probe oder ein kurzer Schlagabtausch.

### 3.3 Verfolgung
Hier zaehlen **Position, Linie, Sicht, Hindernisse und Kontrolle** mehr als exakte Meter.

### 3.4 Fahrzeugkampf
Bordwaffen, Drive-bys, Rammen, Wegdruecken, Aussteigen unter Druck oder Boarding.

---

## 4. Position statt Meter
Verfolgungen sollten in URoP eher ueber **Lagewechsel** als ueber genaue Distanzwerte laufen.

Die einfache Arbeitsleiter:
- **Kontakt**
- **Nah**
- **Gleichauf**
- **Vorsprung**
- **Abgesetzt**

Das reicht fuer die meisten Szenen schon aus.

---

## 5. Rollen im Fahrzeug
Vehicles werden interessanter, wenn nicht nur der Fahrer etwas tun darf.

Typische Rollen:
- **Fahrer / Pilot** – haelt Kontrolle, Linie, Tempo und Risiko
- **Schuetze** – nutzt Bordwaffen oder offene Feuerwinkel
- **Navigator / Spotter** – Route, Sicht, Warnung, Zielhilfe
- **Hacker** – Fahrzeugfunktionen, fremde Systeme, Verfolgungsnetz
- **Mechaniker / Tech** – Notreparatur, Ueberbrueckung, Stabilisierung
- **Passagier** – kann normal handeln, aber unter Fahrzeugdruck

---

## 6. Was ein Fahrzeugprofil abbilden soll
Die JSON-Daten fuehren Fahrzeuge nicht als Technikporno, sondern als **spielrelevante Plattformen**.

Wichtige Lesefelder:
- **vehicle_class**
- **terrain_profile**
- **role_focus**
- **crew_min / crew_optimal**
- **passenger_capacity**
- **control**
- **speed**
- **protection_value**
- **durability**
- **network_exposure**
- **hardpoints_or_mounts**

Das reicht fuer eine Vorabfassung.

---

## 7. Was Werte am Tisch bedeuten
### Control
Wie gut das Fahrzeug unter Druck gefuehrt werden kann.

### Speed
Wie gut es Tempo aufbaut, haelt oder Abstand veraendert.

### Protection Value
Wie viel Schutz gegen Einschlaege, Splitter und Kleinkaliber plausibel ist.

### Durability
Wie viel strukturellen Missbrauch das Fahrzeug noch verkraftet.

### Network Exposure
Wie offen oder gehaertet Bordnetz, Sensorik, Autopilot, IFF oder Komfortsysteme sind.

---

## 8. Cyberpunk-Hook
Vehicles muessen im Cyberpunk nicht nur fahren koennen, sondern an digitale Systeme andocken.

Typische Hooks:
- Wegfahrsperre
- Telematik
- Fuhrpark-Tracking
- Bordsensorik
- IFF / Freund-Feind-Logik
- Turrets oder Waffenmounts
- Tueren, Fenster, Verriegelung
- Autopilot oder Spurhaltehilfen

Wichtig:
Nicht jedes Fahrzeug ist gleich offen.  
Ein improvisierter Buggy kann **weniger** hackbar sein als eine voll vernetzte Luxuslimousine.

---

## 9. Verhaeltnis zu Quickhacks und Netrunning
- **Quickhacks** decken schnelle Eingriffe auf einzelne Funktionen ab.
- **Direktlink** kann reichen, um PC, Konsole oder Fahrzeug lokal anzugehen.
- **Netrunning** wird erst wichtig, wenn man tiefer in Netzstruktur, Fuhrpark-Hosts, Drohnennetze oder groessere Verkehrslogik eintaucht.

Vehicles sollen daher **andocken**, aber kein Fremdsystem bauen.

---

## 10. Was noch bewusst offen bleibt
Noch nicht hart geregelt:
- exakte Chase-Manoever
- Rammregeln im Detail
- Schadensstufen fuer Fahrzeuge
- Crewaktionen im gleichen Takt wie Bodenaktionen
- spezielle Flug- und Wasserfahrzeugausnahmen
- Fahrzeugwaffen als eigene Datenebene
- Tuning, Mods und illegale Umbauten

Das ist Absicht.  
Fuer die Vorabfassung reicht eine **einfache, belastbare Grundarchitektur**.

---

## 11. Aktueller Referenzbestand
`URoP_Vehicles.json` fuehrt aktuell **10 Referenzfahrzeuge**:
- City Scooter
- Street Bike
- Compact Runabout
- Pursuit Sedan
- Cargo Van
- Armored SUV
- Box Truck
- Offroad Buggy
- Patrol AV
- Corporate Limo

Diese Liste ist keine Endfassung, aber als Cyberpunk-Arbeitsstand bereits nutzbar.
