# Foundry Ruleset Entwicklungsleitfaden

Dieser Leitfaden fasst die offiziellen Foundry-VTT-Dokumentationspunkte zusammen, die fuer die Entwicklung und Pflege des URoP-Systems relevant sind. Er ergaenzt die projektspezifischen Regeln in `README.md` und `../../foundryurop/start_foundryurop.md`.

## Offizielle Referenzen

- Systementwicklung: https://foundryvtt.com/article/system-development/
- Foundry v14 API: https://foundryvtt.com/api/v14/
- DataModel-Architektur: https://foundryvtt.com/article/v10-data-model/
- Offener Beispielcode: https://github.com/foundryvtt/dnd5e

Die API-Dokumentation ist versionsgebunden. Fuer dieses Ruleset ist die v14-API die primaere Referenz. Aeltere API-Artikel duerfen nur fuer Migrations- oder Hintergrundfragen herangezogen werden.

## 1. Systemstruktur und lokales Testen

Foundry erkennt ein System als Unterordner von `{userData}/Data/systems`. Die Datei `system.json` muss direkt im Wurzelverzeichnis dieses Systemordners liegen. Der Ordnername muss dem Wert von `system.json`-`id` entsprechen.

Fuer die Entwicklung ist es sinnvoll, das Repository oder mindestens den Systemordner direkt unter dem lokalen Foundry-Systempfad zu verwenden. So kann Foundry die Dateien ohne ZIP-Zwischenschritt laden. Fuer dieses Repository bleibt `foundryurop/system-urop/` die Quellstruktur.

Empfohlene Grundstruktur:

- `system.json`: Manifest und Einstiegspunkte
- `template.json`: aktuelles URoP-Datenmodell fuer Actor- und Item-Felder
- `scripts/`: ES-Module und Sheet-Logik
- `templates/`: Handlebars-Templates
- `styles/`: CSS
- `lang/`: Lokalisierung
- `packs/`: Compendium-Inhalte
- `tests/`: Node-Test-Suite fuer regelrelevante Kernlogik

## 2. Manifest-Regeln

`system.json` ist Pflicht und muss valides JSON enthalten. Fuer URoP besonders wichtig:

- `id`: eindeutig, kleingeschrieben und passend zum Systemordner
- `title`, `description`: sichtbare Paketinformationen
- `version`: Update-Signal fuer Foundry; bei jeder Ruleset-Aenderung erhoehen
- `compatibility.minimum`, `compatibility.verified`: getestete Foundry-Versionen
- `esmodules`: bevorzugter Einstiegspunkt fuer JavaScript-Module
- `styles`: CSS-Dateien, die Foundry laden soll
- `languages`: Lokalisierungsdateien
- `documentTypes`: eigene Actor- und Item-Typen
- `packs`: Compendium-Metadaten, falls Packs ausgeliefert werden
- `manifest`, `download`: URLs fuer Update-Pruefung und ZIP-Download

URoP verwendet derzeit insbesondere:

- `esmodules: ["scripts/urop.mjs"]`
- `styles: ["styles/urop.css"]`
- Actor-Typ `character`
- Item-Typen wie `skill`, `maneuver`, `weapon` und `armor`

Bei einer Manifest-Aenderung immer auch pruefen, ob der referenzierte Pfad im ZIP wirklich vorhanden ist.

## 3. Dokumente, `system`-Daten und Datenmodelle

In Foundry v10 und spaeter liegt systemeigenes Dokument-Datenmodell unter `document.system`, zum Beispiel:

```js
actor.system.attributes
item.system.level
await actor.update({ "system.attributes.staerke": 4 });
```

Alte Muster wie `actor.data.data` oder Update-Pfade mit `data.data` gehoeren nicht mehr in neuen Code. Bei Erweiterungen muss die vorhandene Struktur unter `system` beibehalten werden.

Die modernere DataModel-Architektur beschreibt strukturierte Felder, Standardwerte, Typen und Validierung. Das ist besonders relevant, wenn URoP spaeter von einem losen `template.json`-Schema auf explizite Modelklassen oder strengere Felder umgestellt wird.

Vor einer Schema-Aenderung klaeren:

1. Ist das Feld neu oder wird ein bestehendes Feld umbenannt?
2. Welche Actor- und Item-Dokumente enthalten das Feld bereits?
3. Brauchen bestehende Welten eine Migration?
4. Muss die Berechnung, das Sheet, die Lokalisierung oder ein Pack angepasst werden?
5. Ist das Feld nullable, optional, numerisch, Text oder eine Liste?

Feldumbenennungen und Verschiebungen sind keine reine UI-Aenderung. Sie benoetigen eine Migration in `scripts/urop.mjs` und passende Tests.

## 4. JavaScript und Laden des Systems

`esmodules` ist der bevorzugte Manifest-Eintrag fuer modernen JavaScript-Code. Die Dateien werden als ES-Module geladen. Relative Importpfade muessen deshalb korrekt sein und auf vorhandene Dateien zeigen.

`system-urop/scripts/urop.mjs` ist der zentrale Einstiegspunkt. Dort werden unter anderem:

- Character- und Item-Sheets registriert
- Handlebars-Helfer registriert
- Migrationsschritte beim Start ausgefuehrt
- Foundry-Hooks angebunden

Neue Funktionalitaet sollte moeglichst in der zustaendigen Sheet-, Berechnungs- oder Migrationsdatei liegen. `urop.mjs` bleibt der Registrierungs- und Einstiegspunkt.

## 5. Sheets und Templates

Actor- und Item-Sheets bestehen bei URoP aus drei Teilen:

- Sheet-Klasse unter `scripts/sheets/`
- Handlebars-Template unter `templates/`
- Styles unter `styles/urop.css`

Beim Hinzufuegen eines Feldes muessen typischerweise alle betroffenen Ebenen geprueft werden:

1. Datenmodell oder Default unter `template.json`
2. Sheet-Klasse und `getData()`
3. Handlebars-Feld oder Anzeige
4. Event-Listener fuer Aktionen
5. CSS fuer Layout und Responsive-Verhalten
6. Lokalisierung in `lang/de.json` und `lang/en.json`
7. Migration fuer bereits vorhandene Dokumente
8. Tests fuer die Regel- oder Berechnungslogik

Buttons mit `data-action` brauchen eine passende Registrierung in `activateListeners()` und eine Methode in der Sheet-Klasse. Eine sichtbare Schaltflaeche ohne Listener ist keine vollstaendige Funktion.

## 6. Compendium-Packs

Compendium-Packs werden im Manifest unter `packs` beschrieben. Bei systemeigenen Actor-, Item- oder Adventure-Packs muss das Pack das zugehoerige `system` angeben. Packnamen sollten kleingeschrieben, eindeutig und ohne Sonderzeichen sein.

### URoP Release-Notes-Pack

URoP verwendet fuer die Release-Dokumentation das Journal-Pack `urop-documentation`. Es wird im Foundry-Compendium-Folder `URoP System` angezeigt.

- Editierbare Quelle: `src/packs/urop-documentation/release_notes_<stable-id>.yml`
- Ausgeliefertes Pack: `packs/urop-documentation/`
- Dokumenttyp: `JournalEntry`
- Pack-Key in Foundry: `urop.urop-documentation`
- Die Journal- und Page-IDs bleiben stabil, damit spaetere Automatisierung oder Links nicht brechen.

Das Pack wird nicht als einzelne JSON-Datei ausgeliefert. Ab Foundry v11 wird ein Compendium als kompiliertes LevelDB-Verzeichnis gebaut. Fuer die Kompilierung wird `@foundryvtt/foundryvtt-cli` verwendet.

Minimaler Build-Schritt fuer das Journal-Pack:

```powershell
Set-Location "f:\repos\thoc\foundryurop\system-urop"
npx --yes @foundryvtt/foundryvtt-cli@3 package pack --type System --id urop --compendiumName urop-documentation --inputDirectory src/packs/urop-documentation --outputDirectory packs --yaml --recursive
```

Falls sich die CLI-Syntax aendert, ist die installierte CLI-Hilfe und die offizielle Packaging-Dokumentation zu pruefen. Das Quellverzeichnis `src/` wird nicht in das Ruleset-ZIP aufgenommen; das kompilierte Verzeichnis unter `packs/` muss dagegen enthalten sein.

### Release Notes als Journal

Das Journal enthaelt mindestens:

- eine sichtbare Seite mit der aktuellen Changelog-Fassung
- eine kurze Erklaerung des Versionierungsschemas
- den vollstaendigen Release-Workflow fuer Tests, Manifest, Pack, ZIP, Commit und Push

Die Markdown-Datei `RELEASE_NOTES.md` bleibt die technische Quelle der Release-Historie. Beim Erstellen einer neuen Ruleset-Version wird ihr Inhalt in die editierbare Journal-Quelle uebertragen und das Pack anschliessend neu kompiliert.

Vor einem Pack-Release pruefen:

- Ist der Packpfad im ZIP enthalten?
- Stimmen Packname, Typ und System-ID mit `system.json` ueberein?
- Sind die enthaltenen Dokumente mit dem aktuellen `template.json` und den aktuellen Document-Typen kompatibel?
- Brauchen bestehende Inhalte eine Migration?

## 7. Installation und Verteilung

Foundry unterstuetzt drei relevante Verteilungswege:

1. Manuelle Installation: Systemordner als ZIP in den lokalen `systems`-Ordner entpacken.
2. Manifest-Installation: Foundry bekommt die URL zu `system.json` und verwendet dessen `download`-URL.
3. Package Browser: Eintrag im offiziellen Foundry-Paketverzeichnis, falls das System eingereicht wird.

Fuer URoP ist aktuell die Manifest-Installation vorgesehen:

`https://raw.githubusercontent.com/moellenkampr-create/thoc/main/foundryurop/system-urop/system.json`

Der `download`-Wert im Manifest zeigt auf:

`https://raw.githubusercontent.com/moellenkampr-create/thoc/main/foundryurop/system-urop/urop-system.zip`

Manifest und ZIP muessen dieselbe Version enthalten. Ein geaendertes Manifest ohne neu gebautes ZIP fuehrt zu einem veralteten oder unvollstaendigen Foundry-Update.

## 8. Release- und Update-Checkliste

1. Kernlogik, Sheet, Template, Styles oder Datenmodell aendern.
2. Betroffene Tests ergaenzen oder aktualisieren.
3. Tests ausfuehren:

```powershell
Set-Location "f:\repos\thoc\foundryurop\system-urop"
node --test tests\urop-calculations.test.mjs
```

4. Version in `system.json` erhoehen.
5. `RELEASE_NOTES.md` aktualisieren.
6. ZIP neu bauen:

```powershell
Remove-Item "urop-system.zip" -ErrorAction SilentlyContinue
Compress-Archive -Path .gitignore,FOUNDRY_DEVELOPMENT_GUIDE.md,README.md,lang,packs,scripts,styles,system.json,template.json,templates -DestinationPath urop-system.zip -Force
```

7. Version im ZIP gegen die Version im Manifest vergleichen.
8. `git diff --check` und `git status` ausfuehren.
9. Commit und Push erst nach gruener Testausfuehrung und erfolgreicher Paketpruefung.
10. In Foundry den Manifest-Update ausfuehren und die Systemversion kontrollieren.

## 9. Sicherheits- und Qualitaetshinweise

- Manifest- und JSON-Dateien vor dem Release validieren.
- Keine geheimen Daten, lokalen Pfade oder Zugangsdaten in das ZIP aufnehmen.
- HTML aus Benutzer- oder Dokumentfeldern nicht ungeprueft in eigene HTML-Fragmente einsetzen.
- Event-Listener nach jedem Template-Update auf passende `data-action`-Attribute pruefen.
- API-Aufrufe gegen die v14-Dokumentation pruefen, wenn Foundry aktualisiert wird.
- Bei Foundry-Migrationsfehlern zuerst die Browser-Konsole und die Systemversion im Manifest kontrollieren.
