---
title: THoC Suno Prompt Engineering Notes
version: 1.0.0
project: thoc
file: suno_prompt_engineering_notes.md
type: band-research
tags: [band, suno, prompt-engineering, v5.5, experimental]
created: 2026-05-17
status: INTERPRETATION
---

# THoC Suno Prompt Engineering Notes

## Suno v5.5 Prompt-Tipps (Basierend auf Recherche & Best Practice)

### 1. Voice Naming Convention (Experimentell)

**Ansatz**: Stimme explizit benennen, _bevor_ sie definiert wird.

**Best Practice für THoC:**
```
German 80s dark metal, rough female contralto lead named Lauri,
[rest of description]
```

**Auswirkung (hypothetisch)**:
- Suno v5.5 kann damit Voice als "Charakter" erkennen
- Über Workspace-Notizen kann man später auf "Lauri voice" referenzieren
- Konsistenz über mehrere Songs sollte verbessert werden

**Caveat**: Nicht offiziell dokumentiert; empirisches Testen nötig.

---

### 2. Narrative Style Instructions (Bewährt)

**Quelle**: Suno v4.5 "Detailed Style Instructions" → gilt auch für v5.5

**Alt (nicht optimal)**:
```
80s metal, female contralto, aggressive, intimate, dark, close-mic'd, reverb
```

**Neu (besser)**:
```
German 80s dark metal, rough female contralto lead named Lauri,
her voice is dangerously controlled, intimate yet commanding.
Close-mic'd production with sharp vocal attack, raging undertones.
The guitars build behind her: heavy, distorted, dark atmospheric.
```

**Vorteil**: Suno v5.5 versteht contextuale Zusammenhänge besser.

---

### 3. Voice vor Instrumente Nennen (THoC-Spezifisch)

**Struktur für Multi-Band-Setup:**

Wenn alle 3 Stimmen im selben Song:

```
German 80s metal. Lead vocal: Lauri (rough contralto), 
George (warm tenor supporting), Ely (bright soprano harmony).

Lauri's voice dominates: aggressive, dangerously intimate.
George supports with anthemic warmth, George's voice adds depth.
Ely's soprano soars above, crystalline and precise.

Instrumentation: heavy guitars, driving bassline, pounding drums.
```

**Why it works**: Suno versteht Vocal-Hierarchy + Charaktere als Team.

---

### 4. Klammer-Referenzierung in Lyrics (Experimentell)

**Ansatz**: Voice-Namen in Lyrics mit Klammern kennzeichnen.

**Beispiel** (für Multi-Stimm-Song):
```
[Verse - Lauri]
Ich war Feuer
ohne Ziel
zu viel Wut
und viel zu viel

[Verse - George]
Standing strong beside you
Never letting go
Hold the line...

[Chorus - All]
Bleibt bei mir...
```

**Auswirkung**: Suno kann damit Vocals-Arrangement besser verstehen.

**Caveat**: Nicht experimentiert; könnte auch ignoriert werden. Testen!

---

### 5. Avoided Styles Präzise (Negativ-Prompting)

**Struktur**:
- Was die Stimme _nicht_ sein soll (opposite Timbre)
- Was das Arrangement _nicht_ sein soll (opposite Genre)
- Was der Mix _nicht_ sein soll (opposite Production)

**Für Lauri Beispiel:**
```
bright soprano vocals, male vocals, polished pop production,
uplifting or happy melody, ethereal or airy vocal quality,
backing vocals that compete with lead, lo-fi bedroom production,
slick auto-tune, clean smooth singing, ballad pacing or energy
```

**Why it works**: Negative Anchors helfen Suno, Nicht-Ziele zu vermeiden.

---

### 6. Workspace-Tracking (Manuell, organisatorisch)

**Nach erfolgreichem Generate:**

Markiere in deinem Workspace:
```
[LAURI-VOICE-REFERENCE-V1]
Song: Bleibt bei mir
Prompt-Key: "rough female contralto lead named Lauri, close-mic'd, sharp attack"
Result: ★★★★ (4/5 Treffer)
Reuse: Reference in future songs as "like Lauri in Bleibt bei mir"
```

**Zweck**: Du kurierst deine eigene Voice-Bibliothek (Community von Best-Prompts).

**Suno-Support**: Nicht offiziell, aber praktisch für dein Team.

---

### 7. Slider-Tuning (v5.5)

**Empfehlung für Stimm-fokussierte Solo-Songs:**

| Slider | Wert | Begründung |
|--------|------|-----------|
| **Style Influence** | 0.8–0.9 | Narrative Style soll stabil durchkommen |
| **Weirdness** | 0.5 (normal) | Nicht zu experimental; Fokus auf Stimm-Treffer |
| **Audio Influence** (Voices) | 0.7–0.8 | Wenn Voices-Profile genutzt: hoher Influence für Stimm-Konsistenz |

**Slider-Details**:
- **Weirdness**: 50% = "normal expected result" (Suno-Doku)
- **Style Influence**: Tight adherence zu Style-Text; für Stimme essenziell
- **Audio Influence**: Wenn Voices aktiv: wie stark Voice-Profil durchkommt

---

### 8. BPM-Angabe (KRITISCH – Empirisch Bestätigt)

**Ansatz**: BPM explizit im Style nennen.

**Format**:
```
German 80s dark metal, BPM 120-130, rough female contralto lead named Lauri...
```

**Auswirkung**:
- BPM steuert Tempo & Energie des Songs konsistent
- Ohne BPM: zu viel Variabilität bei Tempi über Generierungen
- **Empirisch bestätigt in Lauri V1**: User gab Feedback, dass BPM essentiell ist ✅

**Best Practice für THoC**:
- Solo-Songs: Always specify BPM
- Multi-Voice-Songs: Same BPM für alle 3 Stimmen nennen
- 80s Metal Standard: 110-140 BPM (110-120 für Dark/Slow, 120-130 Standard, 130-140 für Fast/Anthemic)

---
---

### 10. Experimentelle Fragen für nächste Phase (V1 Test abgeschlossen)

**Abgeschlossene Tests aus Lauri V1:**

1. ✅ **Voice Naming funktioniert**: "Lauri" im Style = passende Stimme. BESTÄTIGT.
2. ✅ **BPM ist essentiell**: Ohne BPM zu viel Variabilität. User Feedback bestätigt. KRITISCH.
3. ✅ **Instrument-Spezifizierung limitiert Synth**: "Minimal synths" + "core trio" = weniger Synth-dominanz. BESTÄTIGT.

**Offene Tests für George/Ely & Multi-Voice:**

1. Funktioniert Klammer-Referenzierung in Lyrics `[Verse - George]`?
2. Wie transferiert sich "named Lauri" zu "named George" & "named Ely"?
3. Sind George (tenor warm) und Ely (soprano bright) gleich einfach zu triggern mit Voice Naming?
4. Funktionieren Member-spezifische Instrument-Zuweisungen? ("Electric guitar played by George" etc.)

---

---

### 11. Experimentelle Fragen für nächste Phase (V1 Test abgeschlossen)

**Abgeschlossene Tests aus Lauri V1/V2:**

1. ✅ **Voice Naming funktioniert**: "Lauri" im Style = passende Stimme. BESTÄTIGT.
2. ✅ **BPM ist essentiell**: Ohne BPM zu viel Variabilität. User Feedback bestätigt. KRITISCH.
3. ✅ **Instrument-Spezifizierung limitiert Synth**: "Minimal synths" + "core trio" = weniger Synth-dominanz. BESTÄTIGT.
4. ✅ **Kompression möglich ohne Info-Verlust**: V1 ~850 Zeichen → V2 ~320 Zeichen; alles Essenzielle erhalten. BESTÄTIGT.

**Offene Tests für George/Ely & Multi-Voice:**

1. Funktioniert Kompression auch für Tenor (George: "warm male tenor") und Soprano (Ely: "bright soprano")?
2. Wie funktioniert "named George" / "named Ely" im gleichen kompakten Format?
3. Können alle 3 Stimmen in ~500–600 Zeichen beschrieben werden für Multi-Voice Songs?

---

### 12. THoC-Spezifische Best Practice (Live, wird durch Tests aktualisiert)
### 9. Instrument-Spezifizierung (KRITISCH – Empirisch Bestätigt)

**Ansatz**: Konkrete Instrumentenliste statt generisch.

**Alt (nicht optimal)**:
```
...heavy guitars, dark synths, driving bassline, pounding drums...
```

**Neu (besser)**:
```
The instrumental core: heavy distorted electric guitar (sharp, driving),
steady heavy electric bass (low, solid foundation), pounding drums.
Minimal synthesizers—only atmospheric layers in background, never competing
with core trio. Guitars, bass, drums dominate.
```

**Auswirkung**:
- Explizite Instrument-Nennungen limitieren Synth-dominanz
- Zwingt Suno, Kern-Trio (Guitar/Bass/Drums) zu priorisieren
- **Empirisch bestätigt in Lauri V1**: V1 hatte zu viel Synth → V2 limitierte Synths → klarer Fokus ✅

**Best Practice für THoC Band**:
- Solo-Phase: "electric guitar, electric bass, drums" + minimale Synths
- Multi-Voice-Phase: "Electric guitar (George), electric bass (Ely), drums (Lauri)" + evtl. minimal ambient pads
- Custom Models: Training-Songs mit dieser Instrument-Clarity = bessere Model-Tuning

---

### 10. Experimentelle Fragen für nächste Phase (V1 Test abgeschlossen)

1. **Funktioniert Klammer-Referenzierung in Lyrics?**
   - Test: `[Verse - Lauri]` vs. nur Lyrics ohne Klammern
   - Vermutung: Suno könnte damit Vocals-Tracking besser machen

2. **Wie sehr hilft "Voice Named X" im Style?**
   - Test: Mit "named Lauri" vs. ohne
   - Vermutung: Mit Name = bessere Konsistenz über Läufe

3. **Beeinflussen Workspace-Noten die Generierung?**
   - Test: Reuse Prompt mit Workspace-Note vs. ohne
   - Vermutung: Nein (Suno hat keinen Zugriff auf Notes), aber gut für dein Memory

4. **Narrative vs. Keywords: Wieviel besser ist Narrative?**
   - Test: "rough, intimate, dark, close-mic'd" vs. "Lauri's voice is... [narrative]"
   - Vermutung: Narrative sollte ~20-30% bessere Konsistenz geben

---

### 9. THoC-Spezifische Best Practice (In Arbeit)

**Solo-Phase** (jetzt):
- Pro Stimme: Narrative Voice-Intro im Style
- Voice Name in Style nennen
- Avoid-Styles anti-Timbre

**Multi-Voice-Phase** (später):
- Alle 3 Stimmen im Style nennen
- Hierarchy (Lauri Lead, George Support, Ely Harmony)
- Optional: Klammer-Referenzierung in Lyrics versuchen

**Custom Models Phase** (noch später):
- Best Lauri/George/Ely Prompts als Vorlagen speichern
- **1.1.0** (2026-05-17): Post-Lauri V1 Test – BPM & Instrument-Spezifizierung als KRITISCH bestätigt. Voice Naming BESTÄTIGT.
- Trainings-Songs nach bewährten Prompt-Namen taggen
- Custom Model: "tuned für THoC Dark Metal (Lauri-focused)" etc.

---

## Ressourcen & Quellen

| Thema | Quelle |
|-------|--------|
| Detailed Style Instructions (v4.5+) | https://help.suno.com/en/articles/5782849 |
| Creative Sliders | https://help.suno.com/en/articles/6141377 |
| Suno Help Center | https://help.suno.com/en/categories/550017-making-music |
| Custom Mode (iOS/Android) | https://help.suno.com/en/articles/3197377 |

---

## Versionshistorie

- **1.0.0** (2026-05-17): Initial notes on v5.5 prompt engineering, experimental voice naming & workspace tracking

---

## Neue Erkenntnis aus Live-Tests (2026-05-17)

- **Session Carryover beobachtet**: Trotz Verschieben von Songs in den Trash wirkten vorherige Songs auf Stimmcharakter/Vibrato nach.
- **Empirischer Hinweis**: Ely-Session beeinflusste danach Lauri-Take (Vibrato klang Ely-ähnlicher).
- **Arbeitsregel für Tests**: Vor jedem neuen Solo-Test `Logout -> Login` durchführen, um Voice-Übertrag zwischen Läufen zu reduzieren.
- **Hinweis**: Nicht offiziell dokumentiert; aktuell als praxisbasierte THoC-Testregel behandeln.

## Neue Erkenntnis aus Live-Tests (2026-05-19) – Lauri Final

- **BPM und Stimmcharakter hängen zusammen**: BPM 120-130 erzeugte falsche Stimmqualität bei Lauri. BPM 90-95 traf den Charakter. Für tiefe/raue Stimmen = niedrigeres BPM testen.
- **Timbre-Adjektive sind entscheidend**: "smokey" und "low contralto" lieferte besseres Ergebnis als "rough contralto". Präzisere Timbre-Wörter > generische Adjektive.
- **"controlled" statt "dangerously controlled"**: Reduziert Rauhheit-Overload ohne Power zu verlieren.
- **Lauri-Ankerpunkt final bestätigt**: `BPM 90-95, smokey female low contralto named Lauri` ist das stabile Stimmprofil für alle zukünftigen Lauri-Songs.

---

**Status**: EXPERIMENTIEREND – wird durch THoC Test-Ergebnisse aktualisiert.
