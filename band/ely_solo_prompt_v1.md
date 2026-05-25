---
title: THoC Ely Solo – Suno Prompt v5.5 (Komprimiert)
version: 1.0.0
project: thoc
file: ely_solo_prompt_v1.md
type: band-suno-prompt
tags: [band, ely, suno, v5.5, solo, prompt, compact]
created: 2026-05-17
status: V1 READY
---

# THoC Ely Solo – Suno Prompt v5.5

## Song-Info
- **Titel**: Ich bleib hier (Ely Solo)
- **Stimme**: Ely (Lead)
- **Sprache**: Deutsch
- **Genre**: 80s Heavy Metal / Hard Rock
- **Vorlage**: Lokale Deutschlyrics, Selbstbewusstsein, Authentizität
- **Status**: V1 – Komprimiertes Format (< 500 Zeichen Style für Suno-Limit)

---

## Prompt-Format: 3 Copyboxes (Copy & Paste in Suno)

### COPYBOX 1: LYRICS

```
[Verse 1]
Ich war leise
viel zu lang
hab mein Herz
vor mir versteckt
doch ich seh jetzt
wo ich steh
und ich geh
nicht mehr zurück

[Chorus]
Ich bleib hier
ich bleib wahr
auch wenn alles
um mich fällt
ich bleib hier
ganz und klar
und ich trag
mein eigenes Licht

[Verse 2]
Keine Angst
hält mich fest
keine Hand
zieht mich klein
was ich fühle
was ich bin
darf jetzt endlich
bei mir sein

[Chorus]
Ich bleib hier
ich bleib wahr
auch wenn alles
um mich fällt
ich bleib hier
ganz und klar
und ich trag
mein eigenes Licht
```

---

### COPYBOX 2: STYLE

```
Band: Three Hearts of Chrome. German 80s heavy metal hard rock, 80s German metal, BPM 125-130, driving mood. Vocals: Ely, young female high soprano, crystalline luminous opera-trained voice. Instrumentation: electric guitar, strong electric bass, driving heavy drums. Confident, precise phrasing, focused reverb.
```

**Zeichenzahl**: ~340 Zeichen (Suno-Limit: 1000) ✅

---

### COPYBOX 3: AVOID

```
indie rock, modern pop, folk, death metal, black metal, country, lo-fi production, heavy synthesizer leads, synth-dominated sound, electronic dance
```

---

## Anwendung in Suno

1. **Custom Mode wählen**
2. **Title**: `[ELY-TEST-ICH-BLEIB-HIER-V1]`
3. **Lyrics**: COPYBOX 1 kopieren & einfügen
4. **Style of Music**: COPYBOX 2 komplett kopieren & einfügen
5. **Advanced Options → Exclude**: COPYBOX 3 kopieren & einfügen
6. **Sliders**:
   - **Style Influence**: 0.8–0.9 (Style soll strong durchkommen)
   - **Weirdness**: 0.5 (normal)
   - **Audio Influence** (falls Voices aktiv): 0.7–0.8
7. **Generate**

---

## Iterationsplan (bei Bedarf)

Falls Generierung < 4/5 Gesamteindruck:

### Iteration A: BPM anpassen
```
German 80s heavy metal, BPM 115-125, bright soprano lead named Ely, powerful and crystalline vocals. Clear, luminous voice over heavy guitar, steady bass, pounding drums. Minimal synths. Sharp definition, focused reverb. Self-assurance, authenticity.
```
(Versuche 115–125 oder 130–140 je nach Feedback)

### Iteration B: Operatic Clarity stärken
```
German 80s heavy metal, BPM 125-135, bright soprano lead named Ely, operatic and crystalline vocals. Luminous, powerfully clear voice dominates over heavy electric guitar, tight electric bass, pounding drums—NO synthesizers. Sharp vocal precision, focused reverb. Uncompromising authenticity.
```

### Iteration C: Deutschlichkeit & Power betonen
```
German 80s heavy metal, BPM 125-135, bright German soprano named Ely, powerful and authentic vocals. Clear, luminous voice over heavy guitar, bass, drums. Minimal atmosphere only. Sharp definition, focused reverb. Self-assured power and crystalline clarity.
```

### Iteration D: Jünger, heller, präzises Vibrato (vs. Lauri's raues Vibrato)
```
German 80s heavy metal, BPM 125-135, bright young soprano lead named Ely, powerful and crystalline vocals. Youthful, luminous voice with precise vibrato over heavy distorted electric guitar, steady electric bass, and pounding drums. Minimal synthesizers. Clear soprano precision, sharp definition, focused reverb. Uncompromising authenticity, youthful power.
```

---

## Evaluierungsraster (nach Generierung)

| Kriterium | 1–5 | Notizen |
|-----------|-----|---------|
| **Stimm-Klarheit** (Soprano erkennbar?) | — | |
| **Timbre-Match** (hell + präzise?) | — | |
| **Vocal-Platzierung** (klar, operatic?) | — | |
| **Delivery** (Kraft, Selbstbewusstsein, Authentizität?) | — | |
| **Instruments** (Trio-Balance, keine Synth-Dominanz?) | — | |
| **Gesamteindruck** | — | |

**Erfolg**: ≥ 4/5 → Workspace-Note anlegen; < 4/5 → Iteration versuchen

---

## Workspace-Notiz (nach erfolgreichem Generate)

Falls erfolgreich (Gesamt ≥ 4):

```
[ELY-VOICE-REFERENCE-V1]
Song: Ich bleib hier
Prompt-Kern: "German 80s heavy metal, BPM 125-135, bright soprano lead named Ely"
Characteristics: Clear luminous soprano, operatic precision, sharp definition, focused reverb, powerful self-assurance
Generation-Erfolg: ✅ (Stimme passend, Trio-Balance gut, Synthesizer minimal)
Reuse für Multi-Voice: Struktur kopiert, Stimm-Namen/BPM angepasst
```

---

## Ely Voice-Profil (aus voice_profiles.md)

**Baseline Charakterisierung:**
- **Timbre**: Bright soprano, clear and operatic
- **Emotion**: Precise, luminous, crystalline
- **Style**: Authentic power, self-assured clarity
- **Song-Thema**: "Ich bleib hier" = Standing ground, authenticity, uncompromising self-assertion (vs. Lauri's emotional binding, vs. George's supportive warmth)

**BPM-Wahl**: 125-135 (Soprano kann höher/schneller als Contralto oder Tenor; authentisches Power-Tempo für Selbstbewusstseins-Theme)

---

## Template-Notizen für George (nächst)

Für **george_solo_prompt_v1.md** später:
- **Voice**: "warm male tenor lead named George"
- **BPM**: 120-130 (Tenor-Standard, wie Lauri)
- **Characteristics**: Warm, anthemic, supportive depth, controlled power
- **Song-Thema**: TBD (George-Lyrics notwendig)
- **Avoid**: Bright vocals, high notes, polished pop, ethereal quality, etc.

---

**Status**: V1 READY FOR TESTING – Template vollständig, Lauri v1-Erfahrungen übernommen, Soprano-Spezifika berücksichtigt.
