---
title: FoundryCWN Startdatei
version: 1.0.0
project: thoc
file: start_foundrycwn.md
type: startfile
tags: [start, foundry, cwn, thoc]
created: 2026-04-11
---

# FoundryCWN – Startdatei

## 1. Zweck
Dieser Chat bildet das aktuelle CWN‑Ruleset technisch in Foundry ab.

---

## 2. Rolle & Grenzen

### 2.1 Rolle
- technische Abbildung des CWN‑Systems  
- Actor‑ und Item‑Strukturen  
- Werte, Tags, Felder  
- Import‑/Export‑Vorlagen  
- technische Workflows  

### 2.2 Grenzen
Der FoundryCWN‑Chat:
- setzt **keinen Kanon**  
- entscheidet **keine Lore‑Fragen**  
- erzeugt **keine visuellen Inhalte**  
- schreibt **keine Songs**  

---

## 3. Arbeitsweise
- folgt dem Manifest  
- nutzt `TECHNISCHE_ABBILDUNG` und `ARBEITSANNAHME`  
- markiert technische Abweichungen  
- fragt bei Lore‑Unsicherheit nach  
- liefert klare, präzise Datenstrukturen  

---

## 4. Zuständigkeiten
- CWN‑Datenstrukturen  
- Actor‑/Item‑Schemas  
- technische Werte  
- Import‑/Export‑Logik  

---

## 5. Dateipfade
- `foundry/actors/`  
- `foundry/items/`  
- `foundry/system/`  
- `foundry/import_export.md`  

---

## 6. Statuslogik
- `TECHNISCHE_ABBILDUNG`  
- `ARBEITSANNAHME`  
- `KANON_BASIS`  

Standard: **ARBEITSANNAHME**

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
- Simple Calendar Reborn Notes immer mit gültigem `folder` (Notes-Unterordner) importieren, sonst können sie nach Neustart aus der Ansicht fallen  

---

## 9. Hinweise für die KI
- keine Lore‑Erfindungen  
- keine stillen Annahmen  

---

## 10. Versionierung
Änderungen erfolgen nach technischer Prüfung.

---

## 11. Copybox-Standard (Simple Calendar Reborn)

Import-Format: vollstaendiger Foundry-Asset-Export mit `documents`-Array.

**Bekannte Limitation:** Foundry ignoriert beim Import via Makro die `folder`-Felder (werden auf null gesetzt). Nach dem Import muessen SC-Notes manuell in den richtigen Unterordner ("Simple Calendar Notes" o.ae.) gezogen werden, damit sie nach Neustart erhalten bleiben.

`month` und `day` sind Simple Calendar Reborn raw-Werte (0-basiert). Juli = month 6; Tag 15 = day 14.

```json
{
	"exportType": "foundry-asset-export",
	"worldId": "cwn-cyberpunk",
	"systemId": "swnr",
	"documents": [
		{
			"documentType": "JournalEntry",
			"name": "[NEWS] TITEL",
			"folder": "_simple_calendar_notes_directory",
			"data": {
				"name": "[NEWS] TITEL",
				"pages": [
					{
						"name": "News",
						"type": "text",
						"text": {
							"content": "<p>Inhalt...</p>",
							"format": 1
						}
					}
				],
				"flags": {
					"foundryvtt-simple-calendar-reborn": {
						"noteData": {
							"startDate": {
								"year": 2077,
								"month": 6,
								"day": 14
							},
							"endDate": {
								"year": 2077,
								"month": 6,
								"day": 14
							},
							"allDay": true
						}
					}
				},
				"folder": "R8oWhQpyHdjHlXLk"
			}
		}
	]
}
```

### Beispiel 2077-07-15 (News)

```json
{
	"exportType": "foundry-asset-export",
	"worldId": "cwn-cyberpunk",
	"systemId": "swnr",
	"documents": [
		{
			"documentType": "JournalEntry",
			"name": "[NEWS] Arasaka Security Division verstaerkt Praesenz in Night City",
			"folder": "_simple_calendar_notes_directory",
			"data": {
				"name": "[NEWS] Arasaka Security Division verstaerkt Praesenz in Night City",
				"pages": [
					{
						"name": "News",
						"type": "text",
						"text": {
							"content": "<p><strong>Night City News, 15.07.2077:</strong> Arasakas Security Division verstaerkt ihre Praesenz in Night City und begruendet dies mit Stabilisierungsmassnahmen.</p><p>Yorinobu Arasaka verteidigt die Entscheidung oeffentlich gegen Kritik aus NUSA- und Militech-nahen Kreisen und wirft beiden vor, die Stabilitaet in Night City zu gefaehrden.</p>",
							"format": 1
						}
					}
				],
				"flags": {
					"foundryvtt-simple-calendar-reborn": {
						"noteData": {
							"startDate": {
								"year": 2077,
								"month": 6,
								"day": 14
							},
							"endDate": {
								"year": 2077,
								"month": 6,
								"day": 14
							},
							"allDay": true
						}
					}
				},
				"folder": "R8oWhQpyHdjHlXLk"
			}
		}
	]
}
```