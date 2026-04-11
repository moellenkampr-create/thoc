# URoP Struktur- und Aufraeumplan
Stand: 2026-04-11

## Ziel
Diese Datei ordnet den vorhandenen Bestand in stabile Arbeitsbereiche und trennt klar zwischen:
- Steuerung
- Kernregeln
- Fuehrende Datenquellen
- Lesefassungen
- Tests
- Archive

## 1) Ist-Stand in Arbeitsbereichen

### A. Steuerdateien (prozessrelevant)
- 00_meta/URoP_MASTER_Folgechat.md
- 00_meta/URoP_MANIFEST.md
- 00_meta/URoP_TASKS.md
- 00_meta/URoP_FOLGECHAT_EXPORT_2026-04-10.md

### B. Kernregelwerk (regelrelevant)
- 10_core/URoP_Grundregeln.md
- 10_core/URoP_Charaktererschaffung.md
- 10_core/URoP_Module_und_Welten.md

### C. Fuehrende Datenquellen (Source of Truth)
- 20_data_json/URoP_Fertigkeiten.json
- 20_data_json/URoP_Vor_und_Nachteile.json
- 20_data_json/URoP_Manoever.json
- 20_data_json/URoP_Items.json
- 20_data_json/URoP_Waffen.json
- 20_data_json/URoP_Schutz_und_Ruestung.json
- 20_data_json/URoP_Cyberware.json
- 20_data_json/URoP_Quickhacks.json
- 20_data_json/URoP_Vehicles.json

### D. Lesefassungen zu Datenquellen
- 30_readable_md/URoP_Fertigkeiten.md
- 30_readable_md/URoP_Vor_und_Nachteile.md
- 30_readable_md/URoP_Manoever.md
- 30_readable_md/URoP_Items.md
- 30_readable_md/URoP_Waffen.md
- 30_readable_md/URoP_Schutz_und_Ruestung.md
- 30_readable_md/URoP_Quickhacks.md
- 30_readable_md/URoP_Vehicles.md

### E. Praxistests und Referenzen
- 40_tests/URoP_Manoever_Praxistest_2026-04-09.md
- 40_tests/URoP_Quickhacks_Praxistest_2026-04-09.md
- 40_tests/URoP_Vehicles_Praxistest_2026-04-09.md
- 40_tests/URoP_Beispielcharaktere.md
- 40_tests/URoP_Beispielcharaktere_Settings.md
- 40_tests/URoP_Waffenstrukturpass_2026-04-10.md

### F. Alt-/Exportmaterial
- 99_archive/URoP_Vorabregelwerk_2026-04-09_v06_konsolidiert.docx

## 2) Zielstruktur (empfohlen)
Keine Regelinhalte aendern, nur Struktur und Auffindbarkeit verbessern.

- 00_meta/
  - MASTER, MANIFEST, TASKS, Folgechat-Export
- 10_core/
  - Grundregeln, Charaktererschaffung, Module_und_Welten
- 20_data_json/
  - alle fuehrenden JSON-Dateien
- 30_readable_md/
  - alle spiegelnden MD-Lesefassungen
- 40_tests/
  - Praxistests, Beispielcharaktere, Strukturpaesse
- 99_archive/
  - alte konsolidierte Fassung (docx)

## 3) Priorisierte Aufraeum-Reihenfolge
1. Dateinamen stabilisieren (keine inhaltlichen Aenderungen)
2. Ordnerstruktur anlegen
3. Dateien in Zielordner verschieben
4. MANIFEST und MASTER auf neue Pfade aktualisieren
5. Konsistenzcheck: Fuehrende JSON gegen MD-Lesefassung

## 4) Regeln fuer die weitere Pflege
- JSON bleibt bei Datenbloecken immer die fuehrende Quelle.
- MD beschreibt, erklaert und dokumentiert, dupliziert aber keine konkurrierende Logik.
- Neue Regelidee erst in Grundregeln/Modul pruefen, danach in JSON uebernehmen.
- Jede Struktur-Aenderung zieht immer MANIFEST, MASTER und TASKS nach.

## 5) Ergebnis dieses Schritts
- Bestand ist gesichtet.
- Arbeitsbereiche sind festgelegt.
- Eine sichere, migrationsfaehige Zielstruktur steht.

Naechster technischer Schritt:
Ordnerstruktur anlegen und dann Dateien kontrolliert in die Zielpfade verschieben.

