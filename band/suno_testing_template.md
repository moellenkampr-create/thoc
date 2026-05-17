---
title: THoC Suno Testing Template
version: 1.0.0
project: thoc
file: suno_testing_template.md
type: band-workflow
tags: [band, suno, testing, workflow, v5.5]
created: 2026-05-17
status: INTERPRETATION
---

# THoC Suno Testing Template

## Zweck
Strukturiertes Template zur Optimierung der Stimm-Profile (George, Ely, Lauri) über dedizierte Solo-Songs.

---

## Phase 1: Solo-Song Setup

### 1.1 George-Solo-Test

**Song-Konzept:**
- Titel: `[GEORGE-TEST-01]`
- Genre: 80s Metal / Power Metal
- Länge: Vers (4-8 Zeilen) + Chorus (4-6 Zeilen) = ~1:30 Zielzeit
- Tempo: Medium-Fast (120-130 BPM impliziert)
- Vibe: Powerful, anthemic, heroic

**Test-Lyrics (English oder Deutsch):**

```
[Verse]
Burning bright in the night sky
Standing tall, I won't back down
Voices calling from the heights

[Chorus]
This is the fire inside
Burning, burning, burning bright
Hold the line, we survive
This is the power we ignite
```

**Suno Prompt – Iteration 1 (Baseline):**

**Lyrics:**
```
[Verse]
Burning bright in the night sky
Standing tall, I won't back down
Voices calling from the heights

[Chorus]
This is the fire inside
Burning, burning, burning bright
Hold the line, we survive
This is the power we ignite
```

**Style:**
```
80s power metal, warm male tenor lead, clear and anthemic, 
gritty but controlled, slight metal rasp, 
upfront vocal placement, powerful sustained delivery, 
confident male singer, electric guitars, dramatic energy
```

**Avoid:**
```
aggressive growl, screaming vocals, auto-tuned smoothness, 
high female vocals, ballad pacing
```

---

**Evaluierungsformular nach Generierung:**

| Kriterium | Skala (1-5) | Notizen |
|-----------|------------|---------|
| Stimm-Klarheit (Tenor erkennbar?) | 1-5 | |
| Timbre-Match (warm + gritty?) | 1-5 | |
| Vocal-Platzierung (upfront, sauberer Mix?) | 1-5 | |
| Delivery (Power, Kontrolle?) | 1-5 | |
| Gesamt-Treffer-Gefühl | 1-5 | |
| **Anmerkungen** | | Welche Wörter sollten schärfer sein? Welche zu viel? |

**Feedback-Loop:**
- Wenn Skore < 4: Style-Wording präzisieren, bis es konstant 4+ ist
- 3-5 Iterationen typisch pro Stimme
- Best-Version merken (Screenshot/Export für Referenz)

---

### 1.2 Lauri-Solo-Test

**Song-Konzept:**
- Titel: `[LAURI-TEST-01]`
- Genre: 80s Dark Metal / Hard Rock
- Länge: Vers (4-8 Zeilen) + Chorus (4-6 Zeilen) = ~1:30 Zielzeit
- Tempo: Medium oder etwas langsamer (100-120 BPM impliziert)
- Vibe: Aggressive, intimate, dangerous edge

**Test-Lyrics:**

```
[Verse]
Shadows creep into my mind
Walking edges, drawing lines
Trust is fragile, pain runs deep

[Chorus]
Dark and deadly, close and real
Sharp and twisted, I can feel
Edge of reason, edge of pain
Dark and deadly, here again
```

**Suno Prompt – Iteration 1 (Baseline):**

**Lyrics:**
```
[Verse]
Shadows creep into my mind
Walking edges, drawing lines
Trust is fragile, pain runs deep

[Chorus]
Dark and deadly, close and real
Sharp and twisted, I can feel
Edge of reason, edge of pain
Dark and deadly, here again
```

**Style:**
```
80s dark metal, rough female contralto lead, aggressive edge,
raw and intimate, dangerously controlled voice,
close-mic'd delivery, intense and coiled energy,
sharp attack, female growl undertones, heavy guitars,
dark and powerful atmosphere
```

**Avoid:**
```
bright soprano, polished pop vocals, sweet singing,
ethereal or airy quality, male vocals, uplifting energy
```

---

**Evaluierungsformular nach Generierung:**

| Kriterium | Skala (1-5) | Notizen |
|-----------|------------|---------|
| Stimm-Klarheit (Kontralto erkennbar?) | 1-5 | |
| Timbre-Match (rau + gefährlich?) | 1-5 | |
| Vocal-Platzierung (nah, attackiert?) | 1-5 | |
| Delivery (Intensität, Kontrolle, Gefahr?) | 1-5 | |
| Gesamt-Treffer-Gefühl | 1-5 | |
| **Anmerkungen** | | Zu hart/zu weich? Timing der Aggression? |

---

### 1.3 Ely-Solo-Test

**Song-Konzept:**
- Titel: `[ELY-TEST-01]`
- Genre: 80s Metal / Melodic Hard Rock
- Länge: Vers (4-8 Zeilen) + Chorus (4-6 Zeilen) = ~1:30 Zielzeit
- Tempo: Medium (120-130 BPM impliziert)
- Vibe: Luminous, powerful, soaring, precise

**Test-Lyrics:**

```
[Verse]
Crystal light cuts through the dark
Rising high above the fray
Reaching far beyond the stars

[Chorus]
Shining bright, I rise above
Pure and clear, I am enough
Soaring high on heaven's wing
Shining bright, I'm everything
```

**Suno Prompt – Iteration 1 (Baseline):**

**Lyrics:**
```
[Verse]
Crystal light cuts through the dark
Rising high above the fray
Reaching far beyond the stars

[Chorus]
Shining bright, I rise above
Pure and clear, I am enough
Soaring high on heaven's wing
Shining bright, I'm everything
```

**Style:**
```
80s metal with melodic elements, clear bright soprano lead,
precise and operatic, luminous crystalline voice,
soaring and precise phrasing, light but powerful,
spacious vocal placement, high in mix, ethereal yet commanding,
female soprano vocals, dramatic orchestral energy
```

**Avoid:**
```
aggressive rasp, dark contralto timbre, breathy whispered style,
male vocals, close-mic'd intimate sound, low register
```

---

**Evaluierungsformular nach Generierung:**

| Kriterium | Skala (1-5) | Notizen |
|-----------|------------|---------|
| Stimm-Klarheit (Sopran erkennbar?) | 1-5 | |
| Timbre-Match (klar + hell?) | 1-5 | |
| Vocal-Platzierung (spacious, oben im Mix?) | 1-5 | |
| Delivery (Präzision, Kraft, Soar-Qualität?) | 1-5 | |
| Gesamt-Treffer-Gefühl | 1-5 | |
| **Anmerkungen** | | Zu ethereal/zu kraftlos? Tonhöhe gut? |

---

## Phase 2: Vergleichende Testmatrix (Optional, nach Solo-Optimierung)

### Setup
- **Testlied**: Ein identisches, neutrales Lyrics-Fragment (z.B. 8 Zeilen)
- **Modelle**: Base v5.5 (Baseline) vs. George/Lauri/Ely optimiert nach Phase 1
- **Läufe**: 3-5 Durchläufe pro Konfiguration
- **Fokus**: Welches Model/Voice-Setup liefert beste Separation und Konsistenz?

### Test-Lyrics (Neutral, alle 3 Stimmen möglich):
```
Walking down a lonely road
Searching for the light
Standing at the edge of night
Voices echoing inside
Hold me, guide me, light the way
Take me to the break of day
```

### Testmatrix-Template

| Stimme | Modell | Iteration | Stimm-Klarheit | Timbre-Match | Vokal-Qualität | Mixing | Notizen |
|--------|--------|-----------|----------------|--------------|----------------|--------|---------|
| George | Base v5.5 | 1 | 4 | 3 | 4 | 3 | Warm aber nicht genug Grit |
| George | George-Optimiert | 1 | 5 | 5 | 4 | 4 | Deutlich besser, gritty dabei |
| Lauri | Base v5.5 | 1 | 3 | 2 | 3 | 3 | Zu poliert, nicht rau genug |
| Lauri | Lauri-Optimiert | 1 | 5 | 5 | 4 | 4 | Aggressiver Edge kommt raus |
| Ely | Base v5.5 | 1 | 4 | 3 | 4 | 4 | Hell, aber nicht opernhaft |
| Ely | Ely-Optimiert | 1 | 5 | 5 | 5 | 5 | Soaring, klar, perfekt |

---

## Phase 3: Custom Model Vorbereitung (Later)

### Welche Songs ins Trainingsset?

**Selektion-Kriterien:**
- Stilistisch konsistent (80s Metal DNA)
- Produktionsqualität hoch (klare Vocals, guter Mix)
- Repräsentativ für „THoC Sound"
- Pro Modell: 6-12 Songs (mindestens 6 erforderlich)

**Beispiel-Modell A (THoC Core):**
- 2-3 George-Leads
- 2-3 Lauri-Leads
- 2-3 Ely-Leads
- 1-2 Multi-Voice-Tracks (Band-Vibe)

**Beispiel-Modell B (Heavy/Dark):**
- 4-5 Lauri-Heavy-Songs
- 2-3 George-Support in Dark-Context
- 1-2 Ely-unterstützend in Dark-Sound

**Beispiel-Modell C (Anthemic/Melodic):**
- 3-4 George-Anthemic
- 2-3 Ely-Melodic-Solos
- 2-3 Multi-Voice mit hellem Focus

---

## Checkliste: Pre-Testing

- [ ] voice_profiles.md gelesen und verstanden
- [ ] Suno v5.5 aktiv (nicht v4.5 oder älter)
- [ ] Pro/Premier Plan aktiv (Custom Models später)
- [ ] Pro Stimme mindestens 1 Test-Song geplant
- [ ] Style-Templates aus diesem Dokument vorbereitet
- [ ] Audio Influence Slider-Werte notiert (für Voices, wenn anwendbar)
- [ ] My Taste temporär deaktiviert (optional, für reproduzierbare Tests)

---

## Nächste Schritte

1. **George-Test Song erstellen** (Iteration 1-3)
2. **Lauri-Test Song erstellen** (Iteration 1-3)
3. **Ely-Test Song erstellen** (Iteration 1-3)
4. **Beste Versionen speichern & Personas erstellen** (optional)
5. **Style-Templates in voice_profiles.md aktualisieren** (basierend auf Best-Practice)
6. **Custom Models bauen** (wenn optimal kalibriert)

---

## Tipps & Tricks

- **Acapella-Only**: Wenn möglich, Vocals-Only-Pausen nutzen, um Suno auf Stimme zu fokussieren
- **Slider-Management**: Audio Influence bei Voices Tests eher HIGH halten (0.7-0.9), um Stimm-Eigenschaft zu testen
- **Reject Early**: Wenn Iteration 1 völlig falsch → nicht iterieren, sofort Style umschreiben
- **Konsistenz-Check**: Gleiche Lyrics, 3 Durchläufe → sollten qualitativ ähnlich sein, nicht identisch
- **Admin**: Alle Test-Songs mit `[GEORGE-TEST-XX]` o.ä. labeln für einfaches Finden später

---

## Ressourcen

- voice_profiles.md (Rollenformeln & Test-Profile)
- suno_custom_models_research.md (Technischer Hintergrund)
- production_notes.md (General THoC Band Conventions)
- suno_prompting.md (Suno Prompt Best Practice)

---

**Versionierungsnotiz**: Dieses Template wird iterativ aktualisiert basierend auf Test-Ergebnissen.
Neue Erkenntnisse werden sofort in voice_profiles.md reflected.
