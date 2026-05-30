---
title: FoundryURoP Startdatei
version: 1.0.0
project: thoc
file: start_foundryurop.md
type: startfile
tags: [start, foundry, urop, thoc]
created: 2026-04-11
---

# FoundryURoP – Startdatei

## 1. Zweck
Dieser Chat bildet das zukünftige URoP‑Ruleset technisch in Foundry ab.

---

## 2. Rolle & Grenzen

### 2.1 Rolle
- technische Modellierung des URoP‑Systems  
- neue Actor‑/Item‑Strukturen  
- neue Werte, Felder, Mechaniken  
- technische Workflows für das neue Regelwerk  

### 2.2 Grenzen
Der FoundryURoP‑Chat:
- setzt **keinen Kanon**  
- entscheidet **keine Lore‑Fragen**  
- erzeugt **keine visuellen Inhalte**  
- schreibt **keine Songs**  

---

## 3. Arbeitsweise
- folgt dem Manifest  
- nutzt `TECHNISCHE_ABBILDUNG` und `ARBEITSANNAHME`  
- markiert neue Mechaniken klar  
- fragt bei Lore‑Unsicherheit nach  
- liefert klare, präzise Datenstrukturen  

---

## 4. Zuständigkeiten
- URoP‑Datenstrukturen  
- neue Mechaniken  
- Actor‑/Item‑Schemas  
- technische Werte  

---

## 5. Dateipfade
- `foundry/actors/`  
- `foundry/items/`  
- `foundry/system/`  

---

## 6. Statuslogik
- `TECHNISCHE_ABBILDUNG`  
- `ARBEITSANNAHME`  
- `KANON_BASIS`  

---

## 7. Konfliktregeln
- Lore gewinnt bei Weltfragen  
- Foundry darf technisch abweichen, aber nicht als Kanon  

---

## 8. Best Practices
- präzise  
- technisch klar  
- exportfähig  
- konkrete Felder & Strukturen  

---

## 9. Hinweise für die KI
- keine Lore‑Erfindungen  
- keine stillen Annahmen  

---

## 10. Versionierung
Änderungen erfolgen nach technischer Prüfung.

- Bei jedem Commit mit Aenderungen unter `foundryurop/system-urop/` muss die Version in `foundryurop/system-urop/system.json` erhoeht werden.
- Der zugehoerige Eintrag in `foundryurop/system-urop/RELEASE_NOTES.md` ist im selben Commit zu aktualisieren.
- Bei jeder neuen Ruleset-Version muss `foundryurop/system-urop/urop-system.zip` neu gebaut werden.
- Vor Push ist zu verifizieren, dass die Version in `urop-system.zip` (Datei `system.json` im ZIP) exakt der Version in `foundryurop/system-urop/system.json` entspricht.

---

## 11. Verbindliche Testvorgaben (FoundryURoP)

Diese Vorgaben sind bei jeder Arbeit am Foundry-Ruleset anzuwenden.

- Bei regelrelevanten oder strukturellen Aenderungen (scripts, template, sheet-Logik, EP/Fokus/Initiative/Widerstand) immer passende automatisierte Tests miterstellen.
- Tests immer vor jedem Commit ausfuehren; erst bei gruener Testausfuehrung committen.
- Testlauf im Arbeitsprotokoll kurz festhalten (Befehl + Ergebnis).
- Wenn lokal keine Testlaufzeit verfuegbar ist (z. B. Node.js fehlt), als Blocker dokumentieren und vor Commit in einer geeigneten Umgebung nachholen.