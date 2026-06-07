# URoP Backlog
Stand: 2026-05-14

## Hoch
1. ~~Kampfwirkungs-Endlinie finalisieren und in ADR-001 entscheiden~~ ? ERLEDIGT (ADR-001 entschieden: Hybrid/Dominanz B; Grundregeln.md und Vorabregelwerk v07 nachgezogen)
2. Referenzdatenbanken gegen Spielgefuehl testen (Fertigkeiten, Vor-/Nachteile, Manoever, Waffen, Schutz, Items, Cyberware, Quickhacks, Vehicles)
3. Quickhack-Grundlogik gegen Cyberware, Elektronik, Sicherheitssysteme und Szenenzugriff pruefen
4. Metadateien bei Merges konsistent halten (Governance, Index, Backlog, Export)
5. Laufenden Regelwerks-Review einpflegen: Auffaelligkeiten aus Lesedurchgang zeitnah in Regeln und Metadateien nachziehen
6. Voraussetzungen-Matrix fuer Faehigkeiten finalisieren (Sammelfertigkeit/Standardfertigkeit/Spezialisierung)
7. Lernstufen je Faehigkeit ausserhalb der Manoever als Kernschema festlegen (z. B. I-III); Manoever-Ranks sind jetzt als Pilotmodell angelegt
8. Re-Einsatz-Eskalation (Risiko/Konsequenzen) per Praxistest feinjustieren
9. Quickhack-Einsatzprofil nach Schaerfung im Spieltest verproben und mit Grundregel 5.x weiter abgleichen (actionCost, usageWindow, reuseEscalationProfile, requirementsText, internalRefs)
10. Sprengstoffe und Spezialmunition im Spieltest pruefen (Granaten-Typen, Raketensysteme, narrative Munitions-Flexibilitaet; Balancing gegen Szenenkippereffekt)
11. Neue Leitattribut-Ableitung in Spieltests verproben (kaufmaennische Rundung fuer Ableitungen, Aktionsunfaehigkeit bei Attribut <= 0, Widerstand/Initiative aus gerundetem Leitattribut)
12. Konsequenz-Slots pro Stufe ueber Vor- und Nachteile modifizierbar machen (z. B. zusaetzliche/verminderte leichte, schwere, kritische Slots)
13. Fertigkeiten-Excel als Arbeitsgrundlage weiterverfeinern und daraus neue Fertigkeiten robust anlegen/zuordnen koennen (deutsche Namen, Anwendungsklasse, Domain, ParentIds, Regelanker, Importstatus)
14. Fertigkeiten-Domain erweitern oder bestaetigen, falls Social/Kunst/Business nicht sauber in die aktuelle Domain-Liste passen (insbesondere Ausdruck/Performance, Verwaltung, Recht, Markt, kuenstlerische Sonderfaelle)
15. Regelanker-Freigabe praezisieren: attributeAnchor ist nur typischer Leitanker; ruleAnchors duerfen auch freie Attributnamen oder wiederholte Werte enthalten, solange sie regeltechnisch sinnvoll sind
16. Fertigkeiten-Importkonvention festziehen: welche ParentIds muessen echte JSON-IDs sein, welche duerfen Vorstufen-/Alias-Eintraege bleiben, und wann ist Mehrfachzuordnung gewuenscht

## Mittel
1. Preisniveaus fuer Items gegen Spielgefuehl pruefen
2. Foundry-Handoff fuer Datenbloecke konkretisieren
3. Chassis-Workflow fuer Plattform-Actors finalisieren (Actor -> Chassis -> Slots -> Module)
4. Cross-Ref-ID-Strategie fuer JSON-Gruppen pruefen
5. Referenzkarten fuer Konsequenzen als kompakte Druckfassung auskoppeln
6. Exportfilter fuer interne Cross-Ref-Felder verbindlich setzen (internalRefs und internal_* niemals in Druck-/Regelbuchausgaben)
7. Mapping-Regel zwischen Kampfwirkungslinie (W/R) und Daten-Skalen (Waffen effectScale / Ruestung protectionScale) festziehen
8. Fertigkeiten-Textfassungen und Excel-Mapping nach den besprochenen Definitionsentscheidungen synchron halten

## Noch unklar / zu entscheiden
1. Welche Fertigkeiten sollen im Regelfall Kampf-, Aktions- oder Flufffertigkeiten sein, wenn mehrere Lesarten moeglich sind?
2. Welche Domains sind kanonisch erlaubt, und ob eine neue Domain wie expression/gestaltung/kuenstlerisch formal ergaenzt werden soll.
3. Welche deutschen Anzeigenamen sollen als verbindliche Kurzbezeichnungen gelten, wenn die englischen CP2020-Bezeichnungen uneindeutig sind.
4. Ob spezielle Sammelfertigkeiten wie Business und Kunst als echte Breitebene mit eigenen Spezialisierungen weiterlaufen oder eher als Domain-/Filtergruppen gedacht sind.
5. Ob ruleAnchors nur aus Leitattributen bestehen sollen oder auch normale Attribute, Freitext-Anker und Wiederholungen enthalten duerfen.

## Spaeter
1. Matrix-/Astralraum als tieferes Szenenmodul
2. Vehicles mit Chase-Feinschliff, Fahrzeugwaffen und Tuning
3. Bioware
4. Psi
5. Magie
6. Spezies/Herkunft
