# URoP – FOLGECHAT_EXPORT
Stand: 2026-04-10

## Führender Stand dieses Pakets
Dieses ZIP ist der aktuelle Folgechat-Export nach:
- Item-Verschlankung auf den 6-Feld-Kern
- Waffenstrukturpass mit neuen Hauptkategorien und Größen-/Reichweitenfeldern
- Schutz/Rüstung, Vor-/Nachteile, Fertigkeiten und Manöver auf schlankere Feldkerne gezogen
- Cyberpunk-Erweiterungen für Cyberware, Quickhacks und Vehicles; Matrix/Netrunning liegt aktuell als Regelmodul vor

## Wichtig für den Folgechat
- Für datengetriebene Blöcke ist **JSON führend**.
- MD-Dateien sind Lesefassungen oder Ergänzungen und werden nur nachgezogen, wenn sich Struktur, Regelbedeutung oder Folgepflege ändern.
- Das enthaltene Vorabregelwerk-DOCX ist **nicht** der aktuellste Strukturstand für Items und Waffen.
- Matrix/Netrunning und späterer Astralraum laufen aktuell **nicht** als eigene JSON-Kataloge, sondern als gemeinsamer Parallelraum-Hook im Regeltext.

## Aktive Feldkerne
- `20_data_json/URoP_Items.json`: `id`, `name`, `kind`, `description`, `rules_short`, `price_eb`
- `20_data_json/URoP_Vor_und_Nachteile.json`: `id`, `name`, `kind`, `tier`, `rules_short`, `description`, `requirements`, `incompatibilities`
- `20_data_json/URoP_Fertigkeiten.json`: `id`, `name`, `type`, `attribute_anchor`, `skill_domain`, `parent_ids`, `rules_short`, `description`
- `20_data_json/URoP_Manoever.json`: `id`, `name`, `tier`, `cost`, `rules_short`, `description`, `requirements`
- `20_data_json/URoP_Schutz_und_Ruestung.json`: `id`, `name`, `category`, `quality`, `user_size_nominal`, `protection_value`, `rules_short`, `description`, `price_eb`

## Besonders zu beachten
- `20_data_json/URoP_Waffen.json` führt spielorientierte Hauptklassen statt feiner Waffentaxonomie.
- `effective_against_class` beschreibt Ziel- bzw. Wirkungsreferenz und ersetzt keinen zweiten Schadenswert.
- Eine separate zentrale Tag-Datei ist nicht mehr Teil des aktiven Pakets.
- Cyberware führt `install_complexity`, `maintenance_level` und `network_exposure`; Availability, Legalität, Skill-Links und Mechanical Hooks sind nicht Teil des aktiven Feldkerns.
- Quickhacks behalten aktuell `access_routes` und `execution_mode`; Zugangsnotizen liegen im Beschreibungstext.
- Vehicles sind als Referenzblock noch breiter als andere Datenblöcke und vorerst nicht final bereinigt.

## Geparkte, aber wichtige Designlinie
Für spätere Foundry-Arbeit ist die Plattform-Architektur gesetzt:
- **Plattform-Actor anlegen**
- **Chassis-Item zuweisen**
- **Basiswerte und Slots freischalten**
- **Module als Items installieren**
- Das ist für Vehicles, Drohnen, Mechs und ähnliche Plattformen gedacht.
- Cyberdecks bleiben **Items am Nutzer-Actor**.

## Empfohlene nächste Prüfpunkte
1. Referenzdatenbanken im Spielgefühl testen
2. Quickhack-Logik gegen Cyberware, Elektronik und Sicherheitssysteme prüfen
3. Vehicles/Plattformen erst beim Foundry-/Ruleset-Bau tiefer anpacken
4. Vorabregelwerk später auf die neue Datenstruktur nachziehen

