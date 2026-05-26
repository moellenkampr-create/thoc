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

## Update-Workflow (Kurzfassung)

1. Aenderungen in Datenmodell, Sheets, Logik und Lokalisierung umsetzen.
2. Version in `system.json` erhoehen.
3. `urop-system.zip` neu bauen.
4. Release Notes aktualisieren (`RELEASE_NOTES.md`).
5. Commit + Push.
6. In Foundry ueber Manifest-URL aktualisieren.

## Release-Checkliste

- [ ] Version in `system.json` erhoeht
- [ ] Aenderungen in `RELEASE_NOTES.md` dokumentiert
- [ ] Migration noetig geprueft (bei Feldumbenennungen/-verschiebungen)
- [ ] `urop-system.zip` neu gebaut
- [ ] Manifest-URL und Download-URL weiterhin gueltig

### Build-Befehl fuer ZIP (PowerShell)

```powershell
Set-Location "f:\repos\thoc\foundryurop\system-urop"
Remove-Item "urop-system.zip" -ErrorAction SilentlyContinue
Compress-Archive -Path .gitignore,README.md,lang,packs,scripts,styles,system.json,template.json,templates -DestinationPath urop-system.zip -Force
```

### Manifest-URL fuer Foundry

https://raw.githubusercontent.com/moellenkampr-create/thoc/main/foundryurop/system-urop/system.json
