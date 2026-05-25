# URoP Foundry System (v14 scaffold)

Dieses Verzeichnis enthaelt ein erstes Foundry VTT Systemgeruest fuer URoP.

## Ziele der ersten Version

- Foundry v14 kompatibel
- Primaere Sprache Deutsch, Englisch vorbereitet
- Unterstuetzende Automatisierung (nicht erzwingend)
- Mehrseitiges Charakterblatt mit viel Platz fuer Wachstum
- Itemhandling inkl. Manoever-Typ

## Struktur

- system.json: Systemmanifest
- template.json: Basisdatenmodell fuer Actor/Item
- scripts/: Initialisierung und Sheet-Logik
- templates/: HBS-Templates fuer Actor/Item Sheets
- styles/: Basisdesign
- lang/: de/en Lokalisierung

## Aktueller Funktionsumfang

- Charakterblatt mit Tabs (Uebersicht, Attribute, Fertigkeiten, Konsequenzen, Items, Manoever, Notizen, Erweitert)
- Itemblatt fuer gear/weapon/armor/maneuver
- 3W6 Probe Button
- Initiative-Vergleichsprobe Button (unterstuetzend)

## Naechste sinnvolle Schritte

1. Datenmodell auf finale URoP-Felder erweitern
2. Eigene Item-Typen fuer Vor-/Nachteile, Cyberware, Quickhacks
3. Import-Pipeline fuer externe JSON Daten bauen
4. Rechte-/Sperrlogik pro Feld aktiv schaltbar machen
5. Pack-Inhalte (Compendium) fuer Startdaten erzeugen
