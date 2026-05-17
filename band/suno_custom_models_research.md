---
title: Suno Custom Models - Forschungsergebnisse
version: 1.0.0
project: thoc
file: suno_custom_models_research.md
type: band-research
tags: [band, suno, custom-models, v5.5, research]
created: 2026-05-17
status: INTERPRETATION
---

# Suno Custom Models – Forschungsergebnisse

## Quelle & Gültigkeitsbereich
- **Datum**: Mai 2026
- **Suno-Version**: v5.5 (März 2026 Release)
- **Quellen**: Offizielle Suno Help Center, Blog, Terms of Service
- **Gültig bis**: Nächste Major Suno-Update oder Model-Change

---

## 1. Custom Models – Technische Grundlagen

### Was sind Custom Models?
Personalisierte Varianten von Suno v5.5, die aus deinen eigenen Trainings-Songs aufgebaut werden.
Sie „tunen" das Basis-Modell auf deinen persönlichen Stil und Sound.

### Verfügbarkeit & Limits
- **Zugang**: Pro und Premier Subscriber nur
- **Anzahl**: Bis zu 3 Custom Models pro Account
- **Trainings-Datenmenge**: Mindestens 6 Songs pro Modell
- **Training-Dauer**: 2-5 Minuten (typisch)
- **Sichtbarkeit**: Privat; nicht zwischen Nutzern teilbar

### Trainings-Anforderungen
- Du musst die vollständigen Rechte an allen hochgeladenen Songs haben
- Bulk Upload verfügbar (Datei oder Mehrfach-Auswahl)
- Keine explizite Dokumentation zu Audioformat oder Länge; Best Practice: gute Produktionsqualität, konsistente Genre/Tempo

---

## 2. Wirkung auf Genre, Stimmen, Setup

### Genre & Stil
**Ja, deutlich.** Custom Models tunen das Modell auf deinen Sound.
- Wenn dein Trainingsset konsistent 80s Metal ist → Modell generiert von Grund auf Metal-affiner
- Stilistische Drift gegenüber Base v5.5 ist messbar (A/B-Test nötig zur Quantifizierung)
- **Risiko**: Mixed Genres in Trainingsset → Modell wird stilistisch unschärfer

### Stimmen
**Nur indirekt.** Custom Models beeinflussen nicht die Stimmlichkeit direkt.
- Für spezifische Stimmen-Konsistenz ist **Voices** das primäre Werkzeug (nicht Custom Models)
- Custom Models können _gesamte Produktionsästhetik_ (Vocal-Mix, Raum, Kompression) lernen
- **Aber**: Keine Garantie, dass „Lauri-Raue-Stimme" in neuem Song gleicht

### Setup & Prompting
- **Deine Style-Prompts bleiben zentral** (Custom Model ist nicht „Autopilot")
- Custom Model setzt nur einen besseren Startpunkt: „klingt eher wie dein Sound"
- Weiterhin volle Kontrolle über Lyrics, Style Text, Sliders (Audio Influence, Style Influence, Weirdness)

### My Taste (Personalisierung der Generierung)
- Separat zu Custom Models; lernt deine Hörer-/Creator-Vorlieben
- Für reproduzierbare Tests: Better kontrollieren oder temporär deaktivieren (über Avatar → My Taste)

---

## 3. Voices (Die Stimmen-Komponente)

### Was ist Voices?
Evolution von Personas (v4.x). Erfasst deine Stimme und ermöglicht Generierung mit deiner eigenen Stimmlage.

### Setup
1. Audio hochladen/aufnehmen (15 Sekunden – 4 Min; 2 Min werden genutzt)
2. Verifikation: Du sprichst einen Satz vor, um zu verifizieren, dass es deine Stimme ist
3. Profil-Optionen: Skill Level, Bild, Name
4. **Wichtig**: Nur deine eigene Stimme; Voice-Kloning anderer Personen nicht erlaubt

### Anwendung in Suno
- Nur mit v5.5-Modell
- Audio Influence Slider ist zentral (regelt „wie stark deine Stimme durchkommt")
- Acapella-Aufnahmen liefern beste Ergebnisse; Suno macht automatisch Stem-Splitting

### Relevanz für THoC
**Nicht direkt anwendbar für George, Ely, Lauri als separate Künstler-Stimmen.**
- Voices erfordert, dass _der Ersteller_ die Stimme selbst ausspricht/singt
- Denkbar: Wenn ihr echte Singer aufnehmt (Gesangsaufnahmen von George/Ely/Lauri) → könntet ihr Voices-Profile erstellen
- **Alternative**: Stabile Rollenformeln + Style Personas nutzen (siehe voice_profiles.md)

---

## 4. Personas (Style Personas)

### Status nach v5.5
- Im Create-Menü durch Voices-Button ersetzt
- Style Personas bleiben erhalten und sind weiterhin zugänglich
- Dienen der schnellen Stil-/Song-Charakter-Wiederverwendung

### Anwendung für THoC
- Kann George-/Ely-/Lauri-Song als Style-Persona speichern
- Spätere Songs können diese Persona als Stil-Basis laden
- **Limitierung**: Erfasst nur „Vibe"/Style, nicht spezifische Stimme

---

## 5. THoC – Empfohlenes Training & Workflow

### Phase 1: Daten-Vorbereitung (jetzt)
**Pro Stimme einen referenziellen Solo-Song:**
- George: Lead-Song (Tenor, warm, gritty)
- Ely: Lead-Song (Sopran, klar, hell)
- Lauri: Lead-Song (rau, nah, gefährlich)

**Ziel**: Reine Stimm-Identität feststellen, bevor man Modelle trainiert

### Phase 2: Stil-Optimierung
- Jede Stimme testen gegen aktuelle Style-Vorgaben
- Iterativ verfeinern (3-5 Generierungen pro Stimme + Konfiguration)
- Best-Practice dokumentieren in updated voice_profiles.md

### Phase 3: Modell-Training
**Strategie für 3 Custom Models:**
1. **Model A – THoC Core**: 6+ Beste, konsistente THoC-Songs (gemischt, Band-DNA)
2. **Model B – Heavy/Dark**: 6+ Songs mit tieferer, aggresiverer Kante
3. **Model C – Anthemic/Pop**: 6+ Songs mit melodischerer, hellerem Arrangement

### Phase 4: Testing & Bewertung
- Pro Modell + Base v5.5: Identische Test-Lyrics über alle 4 Varianten
- Bewertungsmatrix: Stimmtrennschärfe, Chorus-Kohärenz, Genre-Treu, Produktions-Stabilität

---

## 6. Bekannte Grenzen & Nicht-Dokumentiertes

### Was Suno offiziell nicht dokumentiert:
- Genaue Mechanik, welche Merkmale Custom Models lernen (Black Box)
- Wie lange Trainings-Effekt anhält (wird es schwächer mit neuen Generierungen?)
- Wie sehr Genre-Mix im Trainingsset Modell-Schärfe beeinflusst
- Lern-Kurve: Wieviel besser ist 6 Songs vs. 12 vs. 20?

### Best Practice – Datenauswahl:
- Konservativ: Gleich viele Songs pro Stimme im Trainingsset (Balance)
- Produktionsqualität: Hochwertige Aufnahmen führen zu besserem Modell
- Genre-Konsistenz: 80s Metal + Dark Rock OK; 80s Metal + lo-fi Bedroom Pop problematisch

---

## 7. Rights & Ownership (Für Custom Models)

### Upload-Rechte
- **Bedingung**: Du besitzt alle Rechte an den hochgeladenen Songs
- Suno-Terms: Gibt dir Recht, Trainings-Material zu nutzen; du behältst Eigentum über deine Input-Songs

### Generated Content aus Custom Models
- **Pro/Premier Plan**: Du erhältst volle kommerzielle Rechte am Generated Output
- Output kann monetarisiert, auf Streaming-Plattformen distribuiert, in Projekten genutzt werden
- Suno macht keine Ansprüche geltend

### Voice Models (separate Komponente)
- Ähnliche Bestimmungen: Du behältst Kontrolle über Voice Profile (privat, nur du nutzt es)
- Andere Nutzer können Remix/Cover nur, wenn du Song veröffentlichst + Remix-Sharing aktivierst

---

## 8. Architektur-Zusammenfassung für THoC

```
┌─ v5.5 Base Model ──────┐
│ (alle Pro/Premier-User)|
└───────┬────────────────┘
        │
        ├─ Custom Models (3 Varianten)
        │  └─ Tuned auf THoC Genre/Sound
        │
        ├─ Voices (optional, nur echte Sänger)
        │  └─ George/Ely/Lauri (wenn echte Aufnahmen)
        │
        ├─ Style Personas (Band-Vibe Schnellstart)
        │  └─ Pro Song 1 Persona speichern
        │
        └─ My Taste (User-Learnings, optional deaktivieren für Tests)
           └─ Personalisiert Generierungsverhalten
```

---

## 9. Nächste Schritte für THoC

1. ✅ Voice-Profile schärfen (in voice_profiles.md)
2. ✅ Pro Stimme: Einen Test-Song erstellen & iterieren
3. □ Trainings-Datensatz kuratieren (6+ beste Songs pro Modell)
4. □ Custom Models bauen & testen
5. □ A/B-Matrix fahren (Test-Lyrics über Base + 3 Models)
6. □ Best Practices dokumentieren & in Workflow integrieren

---

## Quellen (Stand Mai 2026)

| Thema | URL |
|-------|-----|
| Custom Models in v5.5 | https://help.suno.com/en/articles/11362497 |
| What's New in v5.5 | https://help.suno.com/en/articles/11362305 |
| Voices: Use Your Voice | https://help.suno.com/en/articles/11362369 |
| Voices FAQ | https://help.suno.com/en/articles/11362433 |
| What are Personas? | https://help.suno.com/en/articles/3484161 |
| My Taste | https://help.suno.com/en/articles/11362561 |
| Creative Sliders | https://help.suno.com/en/articles/6141377 |
| Model Timeline | https://help.suno.com/en/articles/5782721 |
| Rights – Paid Subscription | https://help.suno.com/en/articles/9601665 |
| Non-Commercial Use | https://help.suno.com/en/articles/9602241 |
| Suno Terms of Service | https://suno.com/terms |
| Suno Blog – v5.5 Launch | https://suno.com/blog/v5-5 |

---

## Versionshistorie
- **1.0.0** (2026-05-17): Initial research summary, Suno v5.5 + Custom Models
