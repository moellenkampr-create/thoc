---
title: THoC Suno Prompting Guide
version: 1.0.0
project: thoc
file: suno_prompting.md
type: band-notes
tags: [band, suno, prompting, thoc]
created: 2026-04-20
---

# THoC - Suno Prompting Guide

## Status
INTERPRETATION

## Zweck
Diese Datei sammelt die praktischen Suno-Regeln fuer stabile, wiedererkennbare THoC-Ausgaben.

## Kernziel
- klare Wiedererkennbarkeit ueber mehrere Songs
- stabile Stimmrollen fuer George, Ely und Lauri
- kurze, belastbare Prompts statt ueberladener Stilprosa

## Suno-Stabilitaetsdefaults
- stabile Wiedererkennbarkeit entsteht eher ueber wiederholte, knappe Rollenbeschreibung als ueber lange Prosatexte
- dieselben Stimmbeschreibungen moeglichst wortgleich zwischen Songs wiederverwenden
- Lead und Support immer explizit benennen
- pro Song moeglichst nur eine klare Leadstimme setzen; weitere Stimmen eher als Harmony, Chorus oder Callbacks fuehren
- wenn Suno mehrere Stimmen unsauber trennt, Arrangement vereinfachen statt Prompt weiter aufzublasen
- Persona-Workflow bevorzugen, wenn verfuegbar: pro Hauptstimme eine wiederverwendbare Persona als Basis aufbauen

## Prompt-Prioritaet
1. Genre / Era / Energy
2. Leadstimme und Harmoniestimmen
3. Instrumentierung / Groove
4. Atmosphaere / Emotion
5. Mix- oder Produktionshinweise nur knapp

## Prompt-Disziplin
- keine Figurenbiografie in den Style-Block schreiben
- keine widerspruechlichen Genre-Mischungen in einem Prompt
- keine langen Listen mit 20+ Adjektiven
- fuer wiederkehrende Charakterstimmen lieber feste Formulierungen als staendig neue Synonyme
- Chorus-Harmonien klar benennen, damit Leadrollen in den Strophen stabil bleiben

## Prompt-Format fuer Ausgaben
Jede Suno-Anweisung in drei getrennten Bloecken:
1. Lyrics
2. Style
3. Avoided Styles

## Arbeitsregel fuer Mehrstimmigkeit
- wenn Unterscheidbarkeit Vorrang hat, zuerst Einzel-Lead plus Chorus-Harmonien testen
- zwei Stimmen sind meist stabiler als drei klar getrennte Stimmen
- Rollenwechsel zwischen Strophe und Chorus nur gezielt und knapp ansagen
- wenn Suno den Chorus verschmiert, Harmoniestimmen reduzieren statt mehr Adjektive hinzuzufuegen

## Persona-Hinweis
- wenn Suno Personas verfuegbar sind, pro Hauptstimme eine feste Persona aufbauen
- Personas sind fuer Cross-Song-Konsistenz meist verlaesslicher als rein textbasierte Feinsteuerung
