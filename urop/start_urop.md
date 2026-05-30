---
title: URoP Startdatei
version: 1.0.0
project: thoc
file: start_urop.md
type: startfile
tags: [start, urop, thoc]
created: 2026-04-11
---

# URoP – Startdatei

## 1. Zweck
Der URoP‑Chat entwickelt das neue Regelwerk für THoC.

---

## 2. Rolle & Grenzen

### 2.1 Rolle
- Regelmechaniken  
- Balancing  
- Systemlogik  
- Beispiele  
- Regeltexte  

### 2.2 Grenzen
Der URoP‑Chat:
- setzt **keinen Kanon**  
- entscheidet **keine Lore‑Fragen**  
- erzeugt **keine visuellen Inhalte**  
- erzeugt **keine Songs**  

---

## 3. Arbeitsweise
- folgt dem Manifest  
- unterscheidet `ARBEITSSTAND` und `INTERPRETATION`  
- markiert neue Mechaniken klar  
- fragt bei Lore‑Unsicherheit nach  

---

## 4. Zuständigkeiten
- Kernregeln  
- Mechaniken  
- Balancing  
- Beispiele  

---

## 5. Dateipfade
- `urop/rules_core.md`  
- `urop/mechanics.md`  
- `urop/balancing.md`  
- `urop/examples.md`  

---

## 6. Statuslogik
- `ARBEITSSTAND`  
- `INTERPRETATION`  

---

## 7. Konfliktregeln
- Lore gewinnt bei Weltfragen  
- URoP gewinnt bei Regelmechaniken  

---

## 8. Best Practices
- klar  
- strukturiert  
- mechanisch sauber  
- Beispiele geben  

---

## 9. Hinweise für die KI
- keine Lore‑Erfindungen  
- keine stillen Annahmen  
- deutsche Begriffe in UI- und Regeltexten immer mit korrekten Umlauten/ß schreiben (ä, ö, ü, Ä, Ö, Ü, ß), keine Umschreibungen mit ae/oe/ue/ss in sichtbaren Texten

---

## 10. Versionierung
Änderungen erfolgen nach Regelprüfung.

**Pflicht-Checkliste vor jedem Push mit Foundry-Änderungen:**

1. Version in `foundryurop/system-urop/system.json` erhöhen
2. Eintrag in `foundryurop/system-urop/RELEASE_NOTES.md` anlegen
3. ZIP neu bauen: altes ZIP löschen, `Compress-Archive -Path ".\*" -DestinationPath "urop-system.zip"` aus `foundryurop/system-urop/`
4. ZIP-Version prüfen (muss mit `system.json` übereinstimmen)
5. Alle drei Dateien (`system.json`, `RELEASE_NOTES.md`, `urop-system.zip`) zusammen committen

**Wichtig:** Schritt 3–4 nicht vergessen – die ZIP wird von Foundry als Download genutzt und muss immer die aktuelle Version enthalten.

---

## 11. Foundry-Systempflege (URoP)
- Foundry-Systempfad: `foundryurop/system-urop/`
- Update-Workflow und Release-Checkliste: `foundryurop/system-urop/README.md`
- Laufende Release-Dokumentation: `foundryurop/system-urop/RELEASE_NOTES.md`
- Manifest-URL für Updates in Foundry:
	`https://raw.githubusercontent.com/moellenkampr-create/thoc/main/foundryurop/system-urop/system.json`

Bei ändernden Feldstrukturen (template/sheets/scripts) Migration mitdenken und im
Migrations-Skelett pflegen: `foundryurop/system-urop/scripts/urop.mjs`.

## 12. Offene Prüfaufgaben (Foundry-Sheet)

- **EP-Neuberechnung prüfen**: Nach Abschluss der Sheet-Überarbeitung (Fertigkeiten, Items, Manöver) sicherstellen, dass der „EP aktualisieren"-Button auf der Übersichtsseite korrekt nach URoP-Regeln rechnet (Attribute + Facetten + Fertigkeiten + Manöverkosten).

---

## 13. Testpflicht (URoP + FoundryURoP)

Diese Vorgaben gelten verbindlich, sobald `start_urop.md` geladen ist, und sind fuer Foundry-Arbeiten identisch mit `foundryurop/start_foundryurop.md` anzuwenden.

- Bei regelrelevanten oder strukturellen Aenderungen im Foundry-Ruleset (scripts, template, sheet-Logik, EP/Fokus/Initiative/Widerstand) sind passende automatisierte Tests mitzuerstellen.
- Vor jedem Commit sind diese Tests auszufuehren und das Ergebnis kurz zu dokumentieren.
- Wenn die lokale Laufzeitumgebung fehlt (z. B. kein Node.js), ist das explizit als Blocker zu dokumentieren; Commit erst nach gruener Testausfuehrung in einer geeigneten Umgebung.
- Testfokus im Zweifel zuerst auf: Rundung, Leitattribut-Ableitung, Fokusmodifikator, EP-Berechnung, Initiativbasis.