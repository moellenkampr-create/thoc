---
title: THoC Lauri Solo – Suno Prompt v5.5
version: 1.0.0
project: thoc
file: lauri_solo_prompt_v1.md
type: band-suno-prompt
tags: [band, lauri, suno, v5.5, solo, prompt]
created: 2026-05-17
status: EXPERIMENTIEREND
---

# THoC Lauri Solo – Suno Prompt v5.5

## Song-Info
- **Titel**: Bleibt bei mir (Lauri Solo)
- **Stimme**: Lauri (Lead)
- **Sprache**: Deutsch
- **Genre**: 80s Heavy Metal / Hard Rock
- **Vorlage**: Lokale Deutschlyrics, emotionale Tiefe, Bindungsthema
- **Status**: Experimental v1 (Voice Naming + Klammer-Referenzierung testen)

---

## Prompt-Format: 3 Copyboxes (Copy & Paste in Suno)

### COPYBOX 1: LYRICS

```
[Verse 1]
Ich war Feuer
ohne Ziel
zu viel Wut
und viel zu viel
doch ich spür
ich fall nicht mehr
wenn ich weiß
ihr seid hier

[Chorus]
Bleibt bei mir
wenn es brennt
wenn mein Herz
sich selbst nicht kennt
Bleibt bei mir
zieh mich zurück
bis aus Sturm
wieder ich wird

[Verse 2]
Ich geh weit
doch nicht verlor'n
an euch zwei
halt ich mich fest
und egal
wie laut ich bin
ihr seid das
was in mir bleibt

[Chorus]
Bleibt bei mir
wenn es brennt
wenn mein Herz
sich selbst nicht kennt
Bleibt bei mir
zieh mich zurück
bis aus Sturm
wieder ich wird
```

---

### COPYBOX 2: STYLE

```
German 80s heavy metal, BPM 120-130, rough female contralto lead named Lauri, aggressive and intimate vocals. Dark, dangerously controlled voice over heavy distorted electric guitar, steady electric bass, and pounding drums. Minimal synthesizers. Close-mic'd production with sharp vocal attack and dark reverb. Burning passion, coiled aggression.
```

---

### COPYBOX 3: AVOID

```
bright soprano vocals, male vocals, polished pop production, uplifting melody, ethereal vocals, backing vocals competing with lead, lo-fi production, heavy synthesizer leads, synth-dominated sound, slick auto-tune, clean smooth singing, ballad pacing, orchestral softness, whispered delivery, slow BPM
```

---

## Anwendung in Suno

1. **Custom Mode wählen**
2. **Title**: `[LAURI-TEST-BLEIBT-BEI-MIR-V2]`
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
German 80s heavy metal, BPM 110-120, rough female contralto lead named Lauri, aggressive vocals. Dark voice over heavy guitar, steady bass, pounding drums. Minimal synths. Close-mic'd, sharp attack, dark reverb. Burning passion.
```
(Versuche 110–120 oder 125–135 je nach Feedback)

### Iteration B: Synthesizer noch expliziter limitieren
```
German 80s heavy metal, BPM 120-130, rough female contralto lead named Lauri. Dark voice dominates over heavy electric guitar, tight electric bass, pounding drums—NO synthesizers. Sharp vocal attack, dark reverb. Aggressive, coiled.
```

### Iteration C: Deutschlichkeit & Emotion betonen
```
German 80s heavy metal, BPM 120-130, rough German female contralto named Lauri, raw and intimate vocals. Fierce voice over heavy guitar, bass, drums. Minimal atmosphere only. Dark reverb, sharp attack. Burning desperation and coiled rage.
```

### Iteration D: Stimme weniger rau/düster, mehr Power-Focus
```
German 80s heavy metal, BPM 120-130, rough female contralto lead named Lauri, powerful and intimate vocals. Powerful, clearly controlled voice over heavy distorted electric guitar, steady electric bass, and pounding drums. Minimal synthesizers. Close-mic'd production with sharp vocal attack and focused reverb. Burning passion, focused intensity.
```

---

## Evaluierungsraster (nach Generierung)

| Kriterium | 1–5 | Notizen |
|-----------|-----|---------|
| **Stimm-Klarheit** (Contralto erkennbar?) | — | |
| **Timbre-Match** (rau + gefährlich?) | — | |
| **Vocal-Platzierung** (nah, sharp attack?) | — | |
| **Delivery** (Intensität, Kontrolle, Gefühl?) | — | |
| **Instruments** (Trio-Balance, keine Synth-Dominanz?) | — | |
| **Gesamteindruck** | — | |

**Erfolg**: ≥ 4/5 → Workspace-Note anlegen; < 4/5 → Iteration versuchen

---

## Workspace-Notiz (nach erfolgreichem Generate)

Falls erfolgreich (Gesamt ≥ 4):

```
[LAURI-VOICE-REFERENCE-V2]
Song: Bleibt bei mir
Prompt-Kern: "German 80s heavy metal, BPM 120-130, rough female contralto lead named Lauri"
Characteristics: Close-mic'd rough contralto, sharp attack, dark reverb, aggressive-intimate tone
Generation-Erfolg: ✅ (Stimme passend, Trio-Balance gut, Synthesizer minimal)
Reuse für George/Ely: Struktur kopiert, Stimm-Namen/BPM angepasst
```

---

## V2 Merkmale (Kompression für Suno)

### ✅ BESTÄTIGT (V1 Test)
1. **Voice Naming funktioniert**: "Lauri" im Style = stimme war passend ✅
2. **BPM essentiell**: Ohne BPM zu viel Variabilität. V2 hält BPM 120-130 ✅
3. **Instrument-Klarheit reduziert Synth**: V1 Synth-Überfluss → V2 limitiert auf "minimal" ✅

### V2 Kompression (Suno 1000-Zeichen-Limit)
- **V1 Style-Länge**: ~850 Zeichen (zu lang, zu viele Absätze)
- **V2 Style-Länge**: ~320 Zeichen (kompakt, 1 Fließtext-Linie)
- **Struktur**: Genre + BPM + Stimme → Voice über Trio → Production/Mood (alles in einer Zeile)
- **Skalierbarkeit**: Für Multi-Voice (George + Ely hinzufügen) bleibt noch ~180 Zeichen Platz

---

## Nächste Schritte

1. ✅ Lauri V2 in Suno generieren (3 Copyboxes)
2. ✅ Evaluieren gegen Raster oben
3. ✅ Workspace-Note anlegen (Template im Dokument)
4. □ **george_solo_prompt_v1.md** erstellen (gleiche Struktur, "warm male tenor named George")
5. □ **ely_solo_prompt_v1.md** erstellen (gleiche Struktur, "bright soprano named Ely")
6. □ George & Ely generieren & evaluieren
7. □ Multi-Voice Song-Prompt testen (alle 3 Stimmen in kompaktem Format)

---

**Status**: V2 KOMPRIMIERT – Ready für Suno, optimiert für 1000-Zeichen-Limit und Multi-Voice Skalierbarkeit.
