---
title: THoC Lore Erhaltungslogik
version: 1.0.0
project: thoc
file: lore_preservation.md
type: lore
tags: [lore, preservation, workflow]
created: 2026-04-11
---

# Lore - Erhaltungslogik

## 1. Zweck
Diese Datei definiert, wie Lore im Repo erhalten, ueberfuehrt und spaeter weiterentwickelt wird, ohne Ton, Kausalitaet oder praegnante Formulierungen zu verlieren.

## 2. Schichtenmodell

### 2.1 Rohschicht
- Pfad: `lore/raw/`
- enthaelt importierte Quelldateien unveraendert oder nur mit technischer Importmarkierung
- ist die Verlustsicherung
- wird nicht verdichtet, umgeschrieben oder statusbereinigt

### 2.2 Strukturschicht
- Pfade: `lore/lore_world.md`, `lore/lore_characters.md`, `lore/lore_factions.md`, `lore/lore_relationships.md`, `lore/lore_timeline.md`, `lore/lore_locations.md`, `lore/lore_plots.md`, `lore/lore_open_threads.md`
- dient Navigation, Arbeitsfaehigkeit und Konfliktpruefung
- darf aus der Rohschicht ableiten, ersetzt diese aber nicht

### 2.3 Flair- und Zitatschicht
- Pfad: `lore/lore_flair_quotes.md`
- sichert Tonfall, Schluesselformulierungen, Spitznamen, Regelphrasen, Szenenflair und atmosphaerische Marker
- wird getrennt von reinen Fakten gepflegt

### 2.4 Importsicht-Schicht
- Pfad: `lore/imports/`
- nutzt das Standardschema in `lore/lore_import_schema.md`
- fuehrt neue Importe in vier Perspektiven:
	- Ely
	- Lauri
	- George
	- Spielleiter / Erzaehler
- dient als Bruecke zwischen Rohschicht und Strukturschicht

## 3. Erhaltungsregeln
- Ein Import gilt erst dann als sicher uebernommen, wenn Rohschicht und Strukturschicht vorliegen.
- Wenn ein Abschnitt sprachlich oder dramaturgisch stark traegt, wird er zusaetzlich in die Flair- und Zitatschicht uebernommen.
- Zitate und Formulierungen werden moeglichst nah am Wortlaut erhalten.
- Verdichtung darf Bedeutung, Ton und Kausalitaet nicht still entfernen.
- Wenn unklar ist, ob etwas nur Stimmung oder harter Kanon ist, bleibt es zunaechst in Rohschicht plus Flair- und Zitatschicht und wird nicht vorschnell in harte Faktform gepresst.
- Bei mehrperspektivischen Quellen werden Ely-, Lauri-, George- und Spielleiter-Sicht vor jeder Endkonsolidierung getrennt dokumentiert.
- Perspektivkonflikte werden nicht still geglaettet, sondern sichtbar als Konfliktpunkt gefuehrt.
- Nummerierung in `lore/lore_open_threads.md` ist standardmaessig append-only: neue Punkte werden am Ende der jeweiligen Liste angehaengt.
- Beim Entfernen erledigter Punkte bleiben Nummernluecken bewusst bestehen; keine automatische Voll-Neunummerierung im Tagesbetrieb.
- Gelegentliche Reorganisation mit Neunummerierung ist erlaubt, aber nur als expliziter Pflege-/Strukturschritt.

## 4. Mindestfragen bei jedem neuen Import
- Welche Fakten muessen strukturiert abgelegt werden?
- Welche Passagen tragen Stimmung oder Figurenwahrheit und duerfen nicht verflachen?
- Welche Zitate, Spitznamen oder Regelphrasen muessen wortnah erhalten bleiben?
- Welche Teile sind `KANON`, welche `ARBEITSSTAND`, welche nur `INTERPRETATION`?

## 5. Fraktions-Dossier Format

### 5.1 Struktur für etablierte Fraktionen (mit offizieller Quelle)
Wenn eine Fraktion in Cyberpunk-Wiki/Fandom dokumentiert ist:

```
## [Fraktionsname]

**Status: [KANON / ARBEITSSTAND / gemischt]**

### Offizielle Quelle
[Link zur Wiki]

### Weltkontext
[Kurze Beschreibung: Ursprünge, Territorium, Bekannt für, Struktur/Hierarchie]

### THoC-spezifisch
[Was wissen wir über diese Fraktion aus THoC-Spiellauf? Kontakte, Plotbindungen, operative Erscheinung]
```

### 5.2 Struktur für Custom/nicht-dokumentierte Fraktionen
Für Fraktionen ohne offizielle Quelle (z.B. Bluttrinker-Fanatiker):

```
## [Fraktionsname]

**Status: [KANON / ARBEITSSTAND / INTERPRETATION]**

**Status: Custom Fraktion (kein Wiki-Eintrag)**

### Basisinformation
[Wer sind sie? Ideologie? Struktur? Territorium? Was definiert sie?]
[Falls Untergruppe: Bindung zur Muttergruppe explizit machen]

### THoC-spezifisch
[Spiellauf-Daten, Kontakte, operative Rolle]
```

### 5.3 Untergruppen-Handling
- Untergruppen werden **nicht als separate Top-Einträge** erfasst
- Untergruppen stehen unter ihrer **Muttergruppe** als Subsection
- Beispiel: `## 4. Raffen Shiv` → `### Untergruppe: Wraiths`
- Jede Untergruppe erhält: Basisinfo + THoC-spezifisch

### 5.4 Hierarchie-Konventionen
- **Übergeordnete Struktur**: Name, Ideologie, Territorialität, Organisationsprinzipien
- **Untergruppe**: Spezialisierung, Unterscheidung zur Muttergruppe, lokale Rolle
- **Bindung explizit**: Wenn Untergruppe nur in Kontext der Muttergruppe verstehbar ist, in der Muttergruppe-THoC-Section verankern

### 5.5 Wiki-Links
- Für offizielle Fraktionen: Immer `[Cyberpunk Wiki - NAME](Link)` unter "Offizielle Quelle" eintragen
- Format: `https://cyberpunk.fandom.com/wiki/[FaktionName]`
- Nicht verlinken, wenn noch unklar, dass Wiki-Eintrag existiert

## 6. Empfehlung
- Rohtext nie loeschen, nur ergaenzen.
- Struktur fuer Arbeit nutzen.
- Flair- und Zitatebene fuer Charaktertreue und Szenengefuehl aktiv mitfuehren.
- Importsicht-Dateien als Pflichtschritt zwischen Rohimport und Endablage verwenden.
- Fraktionen nach Dossier-Schema erfassen, um konsistente Lesbarkeit und Wiki-Brauchbarkeit zu sichern.