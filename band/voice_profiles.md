---
title: THoC Voice Profiles
version: 1.0.0
project: thoc
file: voice_profiles.md
type: band-notes
tags: [band, voices, vocals, thoc]
created: 2026-04-20
---

# THoC - Voice Profiles

## Status
INTERPRETATION

## Zweck
Diese Datei definiert die festen Rollenformeln fuer Suno und andere Song-Prompts.

## Grundregel
Die Formulierungen moeglichst wortgleich wiederverwenden, damit Stimmcharakter und Rollen ueber mehrere Songs stabil bleiben.

## George
- Rolle: male tenor support or co-lead
- Kurzformel: warm grit, anthemic support
- Deutschprofil: klarer maennlicher Tenor, tragfaehig, warm, mit leichtem Metal-Grit wenn passend
- Einsatz: Support, Call-and-response, tiefe Chorus-Stuetze, gelegentlich Co-Lead
- Vermeiden: zu tiefes Grunzen, dauerhafte Hauptrolle in Songs mit Lauri- oder Ely-Fokus

### George Test-Profil (Solo-Fokus)
**Style-Template für dedizierte George-Solo-Songs:**
```
Lead: warm male tenor, clear and anthemic
Tone: gritty but controlled, slight metal rasp
Vocal Treatment: dry, upfront, prominent in mix
Energy: powerful, sustained, confident delivery
Avoid: aggressive growl, screaming, auto-tuned smoothness
```

---

## Lauri
- Rolle: low female lead
- Kurzformel: rough tone, intimate but dangerous, angry undertone
- Deutschprofil: tiefere weibliche Leadstimme, rau, nah, kontrolliert, gefaehrlich, mit latent aggressivem Unterton
- Einsatz: dominante Leadstimme fuer intime, bedrohliche, direkte oder koerperliche Songs
- Vermeiden: zu sauberes Pop-Timbre, zu hohe oder zu leichte Delivery

### Lauri Test-Profil (Solo-Fokus)
**Style-Template für dedizierte Lauri-Solo-Songs:**
```
Lead: rough contralto female, aggressive edge
Tone: raw, intimate, dangerously controlled
Vocal Treatment: close-mic'd, intimate, sharp attack
Energy: dark, intense, coiled tension, released power
Avoid: bright soprano sound, polished pop vocals, sweet delivery
```

---

## Ely
- Rolle: high female support or co-lead
- Kurzformel: clear bright soprano, airy or operatic lift
- Deutschprofil: helle klare Sopranstimme, leuchtend, praezise, mit luftiger oder fast opernhafter Hebung
- Einsatz: hohe Harmony, klangliche Aufhellung, feine Gegenlinie, gelegentlich Co-Lead
- Vermeiden: zu raues Lead-Timbre in Songs, die klar auf Lauri oder George gebaut sind

### Ely Test-Profil (Solo-Fokus)
**Style-Template für dedizierte Ely-Solo-Songs:**
```
Lead: clear bright soprano, precise and operatic
Tone: luminous, crystalline, slight ethereal quality
Vocal Treatment: spacious, high mix, sustained tone
Energy: soaring, precise phrasing, light but powerful
Avoid: aggressive rasp, dark contralto timbre, breathy/whispered style
```

## Standard-Aufstellungen

### Lauri-Fokus
- Strophen: Lauri Lead
- Chorus: Lauri Lead, George tiefe Harmonie, Ely hohe Harmonie

### George-Fokus
- Strophen: George Lead
- Chorus: George Lead, Ely hohe Harmonie oder Lauri dunkle Gegenstuetze

### Ely-Fokus
- Strophen: Ely Lead
- Chorus: Ely Lead, George warme Tiefe, Lauri dunklere Erdung wenn noetig

---

## Test-Workflow: Solo-Song pro Stimme

### Ziel
Reine Stimm-Charakteristik isoliert testen und Style-Vorgaben iterativ verfeinern, bevor Multi-Stimm-Arrangements gebaut werden.

### Ablauf pro Stimme (z.B. George)
1. **Song-Konzept**: Mini-Song (Vers + Chorus, einfache Struktur)
2. **Lyrics**: Neutral/Test-Lyrics, die Stimmlichkeit zeigen (Tonumfang, Intensität, Charakter)
3. **Erste Generierung**: Base v5.5, George Test-Profil (oben)
4. **Evaluierung**:
   - Stimm-Klarheit (kommt die Stimme raus?)
   - Timbre-Match (rau? warm? klar? wie erwartet?)
   - Vocal-Platzierung (Nähe, Mix, Raum-Verhalten)
   - Delivery (Energie, Phrasierung, Kontrolle)
5. **Iteration**: Style-Wording schärfen, 2-3 Varianten durchlaufen
6. **Finalisierung**: Bestes Ergebnis als George-Referenz speichern + Style-Template aktualisieren

### Success Criteria
- Stimme ist sofort erkennbar (George vs. Lauri vs. Ely deutlich unterscheidbar)
- Timbre-Eigenschaften konsistent über 3+ Durchläufe
- Style-Template kann ohne Zusatz-Wort-Salat wiederholt werden

---

## Arbeitsregel
Wenn Suno die Stimmen unsauber trennt, Arrangement vereinfachen und nur die wirklich noetigen Stimmen benennen.
