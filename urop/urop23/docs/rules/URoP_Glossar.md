# URoP – Glossar
Stand: 2026-05-30

Dieses Glossar definiert die aktive Nomenklatur fuer den aktuellen Regelstand.

---

## 1. Leitattribut
Ein Leitattribut ist die zusammenfassende Klammer einer Attributgruppe.

Aktive Leitattribute:
- Koerper
- Geist
- Praesenz

Berechnungslogik (Arbeitsstand):
- Ein Leitattribut ergibt sich aus den vier zugeordneten Attributen als arithmetischer Mittelwert.
- Formel: (Attribut 1 + Attribut 2 + Attribut 3 + Attribut 4) / 4

Ableitungsregel:
- Das Leitattribut selbst bleibt als Dezimalwert erhalten.
- Erst bei abgeleiteten Werten (z. B. Widerstand, Initiativebasis) wird gerundet.
- Rundung ist kaufmaennisch mit Vorzeichen-Erhalt: 1.5 -> 2, -1.5 -> -2.

---

## 2. Attribut
Ein Attribut ist eine konkrete Auspraegung eines Charakters innerhalb eines Leitattributs.

Beispiele:
- Koerper: Staerke, Grobmotorik, Feinmotorik, Konstitution
- Geist: Analyse, Willenskraft, Aufmerksamkeit, Intuition
- Praesenz: Ausdruck, Empathie, Dominanz, Resonanz

Leitgedanke:
- Attribute beschreiben die feinere Auspraegung eines Charakters.
- Leitattribute beschreiben die gebuendelte Richtung dieser Attribute.

Wertebereich:
- Bei Erschaffung kann kein Attributwert mit 0 oder kleiner gewaehlt werden.
- Im Spiel kann ein Attribut durch Mali (z. B. Konsequenzen, Ausruestung, Weltzustaende) auf 0 oder darunter fallen.

Aktionsfaehigkeit:
- Faellt mindestens ein Attribut auf 0 oder darunter, ist der Charakter aktionsunfaehig.
- Temporaere Senkungen fuehren zu temporaerer Aktionsunfaehigkeit bis zur Stabilisierung.
- Bleibt ein Wert dauerhaft in diesem Bereich, kann das zum dauerhaften Ausfall des Charakters fuehren.

---

## 3. Hauptattribut / Hauptattribute (Fokus)
Hauptattribute sind die gewaehlten Fokus-Leitattribute fuer den Charakterbau.

Regelstand:
- Es kann ein oder zwei Leitattribute als Hauptattribute geben.
- Der Fokus beeinflusst die Kostenmodifikatoren gemaess den aktiven Kostenregeln.

Beispiel:
- Hauptattribut Koerper
- Hauptattribute Koerper und Geist

---

## 4. Begriffszuordnung (Alt -> Neu)
- Bisherige "Attribute" (Koerper/Geist/Praesenz) -> Leitattribute
- Bisherige "Facetten" (Staerke etc.) -> Attribute
- "Hauptattribute" -> Fokusauswahl auf Leitattribut-Ebene

---

## 5. Abgeleitete Kampf- und Probenwerte
Abgeleitete Kampf-/Probenwerte:
- Koerperwiderstand = gerundetes Leitattribut Koerper + Boni - Mali
- Geistwiderstand = gerundetes Leitattribut Geist + Boni - Mali
- Praesenzwiderstand = gerundetes Leitattribut Praesenz + Boni - Mali
- Initiativebasis je Bereich = gerundetes Leitattribut des gewaehlten Bereichs + Boni - Mali

Balance-Hinweis:
- Attributwerte ueber 6 bleiben als Ausnahme durch Vorteile, Zauber, Kraefte, Cyberware oder Ausruestung erlaubt.
- Ein harter Deckel ist aktuell bewusst nicht gesetzt und wird ueber Spieltest beobachtet.

---

## 6. Item-/Manoever-Feldbegriffe (Sheet + Datenkern)

### 6.1 Gemeinsame Kernbegriffe
- Tier: Einordnung der Staerke-/Komplexitaetsstufe (z. B. T0 bis T3).
- Lernkosten EP (`learnCostEp`): Erwerbskosten in Entwicklungspunkten fuer den Eintrag oder Rank.
- Aktionskosten (`actionCost`): Einsatzaufwand im Konflikt; aktiv: `free`, `small_action`, `action`, `two_actions`, `three_actions`, `four_actions`.
- Einsatzfenster (`usageWindow`): Nutzungsfenster je Konflikt/Szene oder vorbereitete Anwendung; aktiv: `unlimited`, `once_per_conflict`, `once_per_scene`, `prepared`.
- Wiederholungs-Eskalation (`reuseEscalation` / `reuseEscalationProfile`): Konsequenzprofil bei Re-Einsatz in derselben Szene.
- Kurztext (`rulesShort`): Kurze Regelfassung fuer schnellen Zugriff.
- Beschreibung (`description`): Volltext mit Wirkung, Risiko und Einsatzkontext.
- Interne Notiz (`notes`): Interner Arbeits-/SL-Kommentar, nicht als Regeltext fuer Spieler gedacht.

### 6.2 Fertigkeitsspezifische Begriffe
- Stufe (`level`): Aktueller Auspraegungsgrad der Fertigkeit.
- Fertigkeitsebene (`type`): Sammelfertigkeit, Standardfertigkeit oder Spezialisierung.
- Anwendungsklasse (`applicationClass`): Kampf, Aktion oder Fluff.
- Regelanker 1-3 (`ruleAnchors`): Attribut-/Leitattribut-Anbindung fuer die Regelauflosung.
- Voraussetzungen (`prerequisitesText`): Lesbare Vorbedingungen im Freitext.

### 6.3 Waffen- und Ruestungsbegriffe
- Wirkungsbasis (`damageBaseline`): Basiswert fuer Waffenwirkung.
- Gebaut fuer Groessenstufe (`designedForSizeClass`): Konstruktion der Waffe je Nutzer-/Systemgroesse.
- Wirksam gegen Groessenstufe (`effectiveAgainstClass`): Zielgroesse, gegen die die Waffe optimal arbeitet.
- Reichweite Nah/Mittel/Weit/Extrem (`rangeBands`): Distanzbaender in Metern.
- Schutzwert (`protectionValue`): Reduktions-/Schutzwirkung von Ruestung.
- Nominale Nutzergroesse (`userSizeNominal`): Groessenklasse, fuer die die Ruestung ausgelegt ist.
- Qualitaet (`quality`): Verarbeitungs- und Zustandsqualitaet.

### 6.4 Namenskonsistenz
- Gleich benannte Felder mit gleicher Bedeutung bleiben bewusst gleich benannt.
- Aktueller Stand: `Qualitaet` ist in mehreren Item-Typen semantisch gleich und bleibt daher einheitlich.
- Fuer den aktuellen Feldkern sind keine aktiven Doppelbezeichnungen mit unterschiedlicher Bedeutung vorgesehen.