---
title: THoC George Solo – Suno Prompt v5.5 (Komprimiert)
version: 1.0.0
project: thoc
file: george_solo_prompt_v1.md
type: band-suno-prompt
tags: [band, george, suno, v5.5, solo, prompt, compact]
created: 2026-05-17
status: V1 READY
---

# THoC George Solo – Suno Prompt v5.5

## Song-Info
- **Titel**: Trag mich weiter (George Solo)
- **Stimme**: George (Lead)
- **Sprache**: Deutsch
- **Genre**: 80s Heavy Metal / Hard Rock
- **Vorlage**: Lokale Deutschlyrics, Halt, Vertrauen, Wiederaufrichtung
- **Status**: V1 – Komprimiertes Format (< 500 Zeichen Style für Suno-Limit)

---

## Prompt-Format: 3 Copyboxes (Copy & Paste in Suno)

### COPYBOX 1: LYRICS

```
[Verse 1]
Ich stand still
viel zu lang
hab gelernt
nicht aufzuatmen
doch mit euch
seh ich klar
dass ich nicht
mehr fallen muss

[Chorus]
Trag mich weiter
durch die Nacht
bis mein Herz
wieder an mich glaubt
Trag mich weiter
Stück für Stück
bis aus Schweigen
Leben wird

[Verse 2]
Was mich hielt
lässt jetzt los
was mich formte
ist nicht mehr ich
und was bleibt
wenn alles bricht
seid am Ende
ihr und Licht

[Chorus]
Trag mich weiter
durch die Nacht
bis mein Herz
wieder an mich glaubt
Trag mich weiter
Stück für Stück
bis aus Schweigen
Leben wird
```

---

### COPYBOX 2: STYLE

```
German 80s heavy metal, BPM 120-130, young warm male tenor lead named George, agile and controlled vocals. Clear, energetic tenor over heavy distorted electric guitar, steady electric bass, and pounding drums. Minimal synthesizers. Crisp vocal definition, focused reverb, confident phrasing. Forward-driving energy, resilience, trust, and rising conviction.
```

**Zeichenzahl**: ~320 Zeichen (Suno-Limit: 1000) ✅

---

### COPYBOX 3: AVOID

```
bright soprano vocals, rough dark contralto vocals, aged male tone, gravelly old-man timbre, heavy wobbling vibrato, polished pop production, overly melancholic delivery, whispered vocals, backing vocals competing with lead, lo-fi production, heavy synthesizer leads, synth-dominated sound, slick auto-tune, breathy delivery, ballad pacing, orchestral softness, slow BPM
```

---

## Anwendung in Suno

1. **Vor dem Test**: Logout + Login in Suno (reduziert Voice-Übertrag zwischen Songs)
2. **Custom Mode wählen**
3. **Title**: `[GEORGE-TEST-TRAG-MICH-WEITER-V1]`
4. **Lyrics**: COPYBOX 1 kopieren & einfügen
5. **Style of Music**: COPYBOX 2 komplett kopieren & einfügen
6. **Advanced Options → Exclude**: COPYBOX 3 kopieren & einfügen
7. **Sliders**:
   - **Style Influence**: 0.8-0.9
   - **Weirdness**: 0.5
   - **Audio Influence** (falls Voices aktiv): 0.7-0.8
8. **Generate**

---

## Iterationsplan (bei Bedarf)

Falls Generierung < 4/5 Gesamteindruck:

### Iteration A: BPM anpassen
```
German 80s heavy metal, BPM 115-125, warm male tenor lead named George, powerful and controlled vocals. Warm, anthemic voice over heavy guitar, steady bass, pounding drums. Minimal synths. Clear definition, focused reverb. Resilience and conviction.
```
(Versuche 115-125 oder 125-135 je nach Feedback)

### Iteration B: Tenor-Warmth stärken
```
German 80s heavy metal, BPM 120-130, warm male tenor lead named George, warm and anthemic vocals. Controlled, supportive power over heavy electric guitar, tight electric bass, pounding drums, NO synthesizers. Clear phrasing, focused reverb. Trust, lift, and resolve.
```

### Iteration C: Deutschlichkeit & Klarheit betonen
```
German 80s heavy metal, BPM 120-130, warm German male tenor named George, clear and anthemic vocals. Warm voice over heavy guitar, bass, drums. Minimal atmosphere only. Focused reverb, precise diction. Forward energy, confidence, and renewal.
```

### Iteration D: Junger, agiler Tenor (weniger alt klingend)
```
German 80s heavy metal, BPM 125-135, young warm male tenor lead named George, agile and clear vocals. Youthful, energetic tenor over heavy distorted electric guitar, steady electric bass, and pounding drums. Minimal synthesizers. Crisp articulation, light controlled vibrato, focused reverb. Confident lift, resilience, and forward motion.
```

---

## Evaluierungsraster (nach Generierung)

| Kriterium | 1-5 | Notizen |
|-----------|-----|---------|
| **Stimm-Klarheit** (Tenor erkennbar?) | - | |
| **Timbre-Match** (warm + anthemic?) | - | |
| **Vocal-Platzierung** (klar, tragend?) | - | |
| **Delivery** (Vertrauen, Aufrichtung, Kraft?) | - | |
| **Instruments** (Trio-Balance, keine Synth-Dominanz?) | - | |
| **Gesamteindruck** | - | |

**Erfolg**: >= 4/5 -> Workspace-Note anlegen; < 4/5 -> Iteration versuchen

---

## Workspace-Notiz (nach erfolgreichem Generate)

Falls erfolgreich (Gesamt >= 4):

```
[GEORGE-VOICE-REFERENCE-V1]
Song: Trag mich weiter
Prompt-Kern: "German 80s heavy metal, BPM 120-130, young warm male tenor lead named George"
Characteristics: Young agile tenor, controlled power, crisp phrasing, focused reverb, resilient emotional arc
Generation-Erfolg: ✅ (Stimme passend, Trio-Balance gut, Synthesizer minimal)
Reuse für Multi-Voice: Struktur kopiert, Stimm-Namen/BPM angepasst
```

---

## George Voice-Profil (aus voice_profiles.md)

**Baseline Charakterisierung:**
- **Timbre**: Warm male tenor, clear and anthemic
- **Emotion**: Controlled, resilient, trustworthy
- **Style**: Supportive power, forward motion, verbindende Energie
- **Song-Thema**: "Trag mich weiter" = getragen werden, wieder vertrauen, von Stille in Leben

**BPM-Wahl**: 120-130 (klassisches 80s Heavy-Metal-Tempo, passend für anthemic tenor delivery)

---

**Status**: V1 READY FOR TESTING – Ely/Lauri Learnings übernommen, George-spezifische Tenor-Parameter gesetzt.
