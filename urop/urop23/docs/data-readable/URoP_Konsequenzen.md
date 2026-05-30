# URoP â€“ Zustaende und Konsequenzen
Stand: 2026-04-17

## 1. Fuehrende Datenquelle
Fuehrend ist:
- `URoP_Konsequenzen.json`

Lesefassung:
- `URoP_Konsequenzen.md`

Der Bereich trennt taktische Kurzzeit-Zustaende von anhaltenden Konsequenzen.

## 2. Kernprinzip [GELOCKT]
URoP nutzt zwei Ebenen:
- **Zustaende**: kurzfristig, in der Szene, meist mit klarer Aktion abhandelbar
- **Konsequenzen**: stufenbasiert, ueber Szene hinaus wirksam

Konsequenzstufen:
- `shortTerm`
- `light`
- `heavy`
- `critical`

## 3. Abhandlung am Tisch [GELOCKT]
1. DomÃ¤ne bestimmen
2. Eintrag auswaehlen (state oder consequence)
3. `clearCondition` anwenden
4. Falls consequence: `recoveryTrack` + `minimumRecovery Time` beachten

Faustregel:
- In 1 Aktion loesbar -> eher Zustand
- Tragt ueber die Szene hinaus -> Konsequenz

## 4. Zustaende [ARBEITSSTAND]

### 4.1 Combat

**Offen**
- Effekt: Gegnerische Angriffe gegen dich sind deutlich erleichtert.
- Abhandlung: endet nach naechstem Angriff gegen dich oder durch Deckungsaktion.
- Aktion: Deckung suchen oder Distanz neu aufbauen (`minor`).

**Liegend**
- Effekt: Bewegung stark eingeschraenkt; viele Angriffe und Reaktionen sind erschwert.
- Abhandlung: Aufstehen als Aktion; beim Aufstehen giltst du bis Ende der Aktion als Offen.
- Aktion: Aufstehen (`major`).

### 4.2 Gear

**Waffe verloren**
- Effekt: betroffene Waffe nicht nutzbar bis Aufnahme/Wechsel.
- Abhandlung: Waffe aufnehmen oder Ersatzwaffe ziehen.
- Aktion: Aufheben oder Wechsel (`minor`).

**Schusswaffe klemmt**
- Effekt: mit der betroffenen Waffe keine Angriffe moeglich.
- Abhandlung: Freimachaktion; bei Fehlschlag bleibt Zustand.
- Aktion: Klemmer freimachen (`major`).

**Bogensehne gerissen**
- Effekt: Bogenangriffe unmoeglich bis Material ersetzt/gespannt ist.
- Abhandlung: Sehne ersetzen ausserhalb direkter Bedrohung.
- Aktion: neue Sehne anbringen (`fullTurn`).

### 4.3 Quickhack

**Alarmiert**
- Effekt: Folgeaktionen mit verdeckter Methode sind erschwert.
- Abhandlung: Ablenkung, Lagewechsel oder glaubwuerdige Beruhigung.
- Aktion: Signatur decken und Lage beruhigen (`major`).

## 5. Konsequenzen nach DomÃ¤ne und Stufe [ARBEITSSTAND]

### 5.1 Combat
- `shortTerm`: **Kurzfristige Blessur**
- `light`: **Verstauchung**
- `heavy`: **Gebrochener Arm**
- `critical`: **Kritisches Trauma**

### 5.2 Gear
- `shortTerm`: **Ausrichtung verrutscht**
- `light`: **Waffe beschaedigt**
- `heavy`: **Primaerausruestung ausgefallen**
- `critical`: **Katastrophaler Ausruestungsbruch**

### 5.3 Quickhack
- `shortTerm`: **Signaturflare**
- `light`: **Teiltrace**
- `heavy`: **Trace bestaetigt (Identitaet kompromittiert)**, **Gegenhack-Fenster (akut)**
- `critical`: **ICE-Lock**

### 5.4 Cyberware
- `shortTerm`: **Interface-Glitch**
- `light`: **Cyberware-Desync**
- `heavy`: **Motorik-Drift**
- `critical`: **Cyberware-Blackout**

### 5.5 Vehicle
- `shortTerm`: **Kurzer Kontrollverlust**
- `light`: **Lenkung driftet**
- `heavy`: **Antrieb beschaedigt**
- `critical`: **Systemausfall Fahrzeug**

### 5.6 Environment
- `shortTerm`: **Rauch in den Lungen**
- `light`: **Hitzestress**
- `heavy`: **Toxische Belastung**
- `critical`: **Akute Erstickungsgefahr**

### 5.7 Mental
- `shortTerm`: **Tunnelblick**
- `light`: **Erschuettert**
- `heavy`: **Panikspirale**
- `critical`: **Dissoziativer Bruch**

### 5.8 Social
- `shortTerm`: **Sozialer Fehltritt**
- `light`: **Oeffentliche Bloesse**
- `heavy`: **Geruecht verhaertet**
- `critical`: **Sozial geaechtet**

### 5.9 Magic
- `shortTerm`: **Fokusflimmern**
- `light`: **Arkaner Ausbrennimpuls**
- `heavy`: **Resonanz-Rueckschlag**
- `critical`: **Wirkkanal-Riss**

### 5.10 Psi
- `shortTerm`: **Mentales Echo**
- `light`: **Synaptische Ueberdehnung**
- `heavy`: **Psi-Rueckkopplung**
- `critical`: **Psi-Identitaetsbruch**

## 6. Recovery-Track Referenz [TESTSTAND]
- `autoEnd Of Exchange`: endet innerhalb der laufenden Austauschfolge
- `autoEnd Of Scene`: endet spaetestens mit Szenenende
- `firstAid`: erfordert einfache Versorgung
- `stabilization`: erfordert aktive Stabilisierung vor voller Belastung
- `medicalCare`: professionelle medizinische Behandlung noetig
- `repair`: technische Instandsetzung noetig
- `downtime`: braucht Zeitfenster zwischen Szenen
- `longRecovery`: laengerer Erholungsbogen, oft mehrere Szenen

## 7. Noch offen
- optionale SL-Karten aus den JSON-Eintraegen automatisch ableiten
- Spieltest-Balancing fuer neue Gear/Magic/Psi-Eintraege (Dauer, Recovery, Sperren)
