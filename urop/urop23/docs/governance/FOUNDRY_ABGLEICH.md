# Foundry-Abgleich URoP

Stand: 2026-08-22

Dieses Dokument trennt bestaetigte Regelentscheidungen von noch nicht angepasster Foundry-Technik. Die Regeltexte in `docs/rules/` sind fuehrend. Das Foundry-Ruleset wird erst nach Abschluss der jeweiligen Regelueberarbeitung angepasst.

## Bestaetigter Regelstand

- Menschliche Charaktere starten grundsaetzlich mit Attributwert 2.
- Natuerliche Attributveraenderungen kosten linear 30 EP pro Stufe.
- Attributsenkungen schreiben 30 EP pro Stufe gut und sollten mit einem passenden Nachteil begruendet werden.
- Normale Attribute koennen natuerlich nur bis 6 gesteigert werden.
- Vorteile koennen diese Grenze in begruendeten Faellen erweitern.
- Anpassbarkeit ist ein Sonderattribut mit menschlichem Standardwert 6.
- Anpassbarkeit misst nicht natuerliche Veraenderungen an Koerper und Attributen.
- Anpassbarkeitskosten sind je Eingriff variabel und koennen kleiner als 1 sein.
- Verlust von Anpassbarkeit ist dauerhaft.
- Bei niedriger Anpassbarkeit koennen zufaellige bleibende Folgen eintreten.
- Bei Anpassbarkeit 0 kann teilweise oder vollstaendige Spielleiterkontrolle eintreten.

## Noch nicht im Foundry-Ruleset umgesetzt

### Datenmodell

- `system.adaptability` beziehungsweise ein noch zu bestaetigender Feldname fehlt.
- Felder fuer Anpassbarkeitskosten bei Cyberware, Kraeften, Magie und Talismaneffekten fehlen.
- Ein strukturiertes Feld fuer natuerliche oder nicht natuerliche Veraenderungsart fehlt.
- Die Zuordnung von Attributsenkungen zu erklaerenden Nachteilen ist noch nicht modelliert.
- Andere Startwerte fuer Spezies oder Herkuenfte sind noch nicht modelliert.

### Berechnung

- Foundry nutzt noch die alte nichtlineare Attributkostentabelle.
- Die neue lineare Kostenregel von 30 EP pro veraenderter Stufe ist noch nicht implementiert.
- EP-Gutschriften fuer Attributsenkungen fehlen.
- Die konkrete Kostenwirkung der Ausrichtung auf Attributveraenderungen ist noch offen.
- Vorteile, die die natuerliche Grenze ueber 6 erweitern, sind noch nicht als Berechnungsregel umgesetzt.
- Anpassbarkeitsverbrauch und Folgen bei niedrigen Werten fehlen.

### UI und Migration

- Ein eigener Rahmen fuer Anpassbarkeit fehlt im Character Sheet.
- Cyberware-, Kraft- und Magie-Sheets zeigen noch keine Anpassbarkeitskosten.
- Eine Migration fuer neue Actor-/Item-Felder existiert noch nicht.
- Zufallsfolgen, Kontrollverlust und Spielleiteruebernahme sind bewusst noch nicht automatisiert, weil ihre Detailregeln offen sind.

## Naechster technischer Schritt

Nach Abschluss der Regeldefinition:

1. Feldnamen und Datenmodell bestaetigen.
2. Attributkosten- und Gutschriftenfunktion neu testen.
3. Anpassbarkeit in Actor- und Item-Schemas aufnehmen.
4. Migration fuer bestehende Dokumente schreiben.
5. Sheet-Anzeigen und Eingaben ergaenzen.
6. Automatisierung der Folgen erst nach Festlegung der Tabellen und Schwellen umsetzen.
7. Foundry-Pack, Version und Release Notes aktualisieren.
