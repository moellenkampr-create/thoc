# URoP – Waffenstrukturpass 2026-04-10

## Ziel
Die Waffenstruktur wurde auf einen spielorientierten Kern gezogen, der fuer URoP, Foundry-Unterordner und spaetere Folgepflege tragfaehig ist.

## Kernentscheidungen
- Waffen bleiben strukturierter als allgemeine Items.
- Kategorien sind **Spielklassen**, keine vollstaendige Waffenkunde.
- `skill_link`, Tags, Availability und Legalitaet sind keine Pflichtfelder mehr.
- Das zweite Groessenfeld wird als **Ziel-/Wirkungsreferenz** gelesen, nicht als zweiter Schadenswert.
- Nahkampfreichweite wird ueber `melee_reach_classes` als Mehrfachliste gefuehrt.
- Fernkampfreichweite wird ueber `range_bands` mit `nah`, `mittel`, `weit`, `extrem` gefuehrt.

## Aktive Kategorien
### Nahkampf
- `kleinwaffe`
- `nahkampfwaffe`
- `zweihandwaffe`
- `stangenwaffe`

### Fernkampf
- `handfeuerwaffe`
- `shotgun`
- `gewehr`
- `sniper`
- `schwere_waffe`
- `wurfwaffe`
- `bogen`
- `armbrust`

## Aktiver Feldkern
- `id`
- `name`
- `category`
- `combat_mode`
- `description`
- `rules_short`
- `price_eb`
- `designed_for_size_class`
- `effective_against_class`
- `damage_baseline`
- `quality`
- `magazine_capacity` *(optional)*
- `fire_modes` *(optional)*
- `melee_reach_classes` *(optional)*
- `range_bands` *(optional)*

## Bewusst nicht aktiv
- `skill_links`
- `tags`
- `availability`
- `legal_status`
- `hands_required`
- `ammo_type`
- gesonderte Schnitt-/Stich-/Schlag-Felder
- zweiter Schadenswert fuer andere Zielgroessen

## Folgepunkt
Das Vorabregelwerk-DOCX ist nach diesem Pass nicht der fuehrende Stand. Fuer Folgechats gelten die JSON- und MD-Dateien als autoritativ.
