---
title: THoC Lore Importschema
version: 1.0.0
project: thoc
file: lore_import_schema.md
type: lore
tags: [lore, import, schema]
created: 2026-04-11
---

# Lore - Importschema

## 1. Zweck
Dieses Schema standardisiert neue Lore-Importe mit vier Perspektiven:
- Ely
- Lauri
- George
- Spielleiter / Erzaehler

Das Ziel ist, Faktverlust und Tonverlust gleichzeitig zu verhindern.

## 2. Dateistruktur pro Import

### 2.1 Rohdatei
- Pfad: `lore/raw/lore_import_<datum>_<quelle>.md`
- Inhalt: unveraenderte Quelle

### 2.2 Importsicht-Datei
- Pfad: `lore/imports/import_<datum>_<slug>.md`
- Inhalt: perspektivische Aufbereitung nach diesem Schema

## 3. Pflichtfelder in jeder Importsicht-Datei
- Import-ID
- Datum
- Quelle
- Statusmix (`KANON`, `ARBEITSSTAND`, `INTERPRETATION`)
- Zuordnung in Strukturdateien
- offene Konflikte / Rueckfragen

## 4. Perspektivbloecke

### 4.1 Ely-Sicht
- Kernwahrnehmung
- emotionale Marker
- woertliche oder tonnahe Schluesselformulierungen
- Fakten aus Elys Sicht
- Unsicherheiten

### 4.2 Lauri-Sicht
- Kernwahrnehmung
- emotionale Marker
- woertliche oder tonnahe Schluesselformulierungen
- Fakten aus Lauris Sicht
- Unsicherheiten

### 4.3 George-Sicht
- Kernwahrnehmung
- emotionale Marker
- woertliche oder tonnahe Schluesselformulierungen
- Fakten aus Georges Sicht
- Unsicherheiten

### 4.4 Spielleiter-/Erzaehler-Sicht
- Metaeinordnung und Szenenrahmen
- harte Weltfakten
- dramaturgische Absicht
- steuernde Hinweise
- Unsicherheiten oder bewusst offene Hooks

## 5. Konsolidierungsteil
Nach den vier Perspektivbloecken folgt die konsolidierte Ableitung:
- Gemeinsame Schnittmenge (stabil)
- Perspektivkonflikte
- Statusentscheidung pro Aussage
- Zielmapping:
  - `lore/lore_world.md`
  - `lore/lore_characters.md`
  - `lore/lore_factions.md`
  - `lore/lore_relationships.md`
  - `lore/lore_timeline.md`
  - `lore/lore_locations.md`
  - `lore/lore_plots.md`
  - `lore/lore_open_threads.md`
  - `lore/lore_flair_quotes.md`

## 6. Pflichtregel fuer Flair und Zitate
Wenn eine Formulierung fuer Figurenton, Beziehungston oder Szenenwucht wichtig ist, wird sie zusaetzlich in `lore/lore_flair_quotes.md` uebernommen.

## 7. Vorlage

```md
# Import: <import_id>

## Meta
- Import-ID: <import_id>
- Datum: <YYYY-MM-DD>
- Quelle: <datei oder chat>
- Vorlaeufiger Statusmix: <...>

## Ely-Sicht
- Kernwahrnehmung:
- Emotionale Marker:
- Schluesselformulierungen / Zitate:
- Fakten:
- Unsicherheiten:

## Lauri-Sicht
- Kernwahrnehmung:
- Emotionale Marker:
- Schluesselformulierungen / Zitate:
- Fakten:
- Unsicherheiten:

## George-Sicht
- Kernwahrnehmung:
- Emotionale Marker:
- Schluesselformulierungen / Zitate:
- Fakten:
- Unsicherheiten:

## Spielleiter-/Erzaehler-Sicht
- Metaeinordnung:
- Harte Weltfakten:
- Dramaturgische Absicht:
- Steuernde Hinweise:
- Unsicherheiten / offene Hooks:

## Konsolidierung
- Gemeinsame Schnittmenge:
- Perspektivkonflikte:
- Statusentscheidungen:

## Zielmapping
- lore_world:
- lore_characters:
- lore_factions:
- lore_relationships:
- lore_timeline:
- lore_locations:
- lore_plots:
- lore_open_threads:
- lore_flair_quotes:

## Offene Fragen an Spielleitung
-
```