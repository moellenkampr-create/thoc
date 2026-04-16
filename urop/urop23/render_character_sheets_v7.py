from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(r"E:\repos\thoc\urop\urop23")
PLAYTEST_DIR = ROOT / "docs" / "playtests"
PLAYTEST_DIR.mkdir(parents=True, exist_ok=True)

TOTAL_W = 523
BORDER = colors.HexColor("#94a3b8")
GRID = colors.HexColor("#cbd5e1")
HEAD_BG = colors.HexColor("#e2e8f0")
ROW_BG = colors.HexColor("#f8fafc")
ALT_BG = colors.HexColor("#eef2f7")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CellHead", parent=styles["Normal"], fontSize=8.5, leading=10))
styles.add(ParagraphStyle(name="CellSmall", parent=styles["Normal"], fontSize=7.5, leading=9))
styles.add(ParagraphStyle(name="CellTiny", parent=styles["Normal"], fontSize=7, leading=8))


def section(title):
    table = Table([[title]], colWidths=[TOTAL_W])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HEAD_BG),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 11),
        ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#0f172a")),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
    ]))
    return table


def box_table(data, widths, row_heights=None, header_rows=1, small=False):
    style_name = "CellSmall" if small else "CellHead"
    rendered = []
    for row in data:
        rendered_row = []
        for cell in row:
            if isinstance(cell, str):
                rendered_row.append(Paragraph(cell.replace("\n", "<br/>"), styles[style_name]) if cell else "")
            else:
                rendered_row.append(cell)
        rendered.append(rendered_row)
    table = Table(rendered, colWidths=widths, rowHeights=row_heights, repeatRows=header_rows)
    commands = [
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, GRID),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]
    if header_rows:
        commands += [
            ("BACKGROUND", (0, 0), (-1, header_rows - 1), ROW_BG),
            ("FONTNAME", (0, 0), (-1, header_rows - 1), "Helvetica-Bold"),
        ]
    table.setStyle(TableStyle(commands))
    return table


def label_value_table(rows):
    data = []
    for left_label, left_value, right_label, right_value in rows:
        data.append([
            Paragraph(left_label, styles["CellHead"]),
            Paragraph(left_value, styles["CellHead"]) if left_value else "",
            Paragraph(right_label, styles["CellHead"]),
            Paragraph(right_value, styles["CellHead"]) if right_value else "",
        ])
    table = Table(data, colWidths=[95, 166, 95, 167], rowHeights=[28] * len(data))
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BACKGROUND", (0, 0), (0, -1), ROW_BG),
        ("BACKGROUND", (2, 0), (2, -1), ROW_BG),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, GRID),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def single_field_rows(labels, values=None):
    values = values or [""] * len(labels)
    data = []
    for label, value in zip(labels, values):
        data.append([Paragraph(label, styles["CellHead"]), Paragraph(value, styles["CellHead"]) if value else ""])
    table = Table(data, colWidths=[132, 391], rowHeights=[28] * len(data))
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BACKGROUND", (0, 0), (0, -1), ROW_BG),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, GRID),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def attributes_table(rows):
    data = [["Attribut", "Wert", "Marker", "Notiz"]]
    data.extend(rows)
    return box_table(data, [110, 50, 145, 218], row_heights=[22] + [24] * len(rows))


def resistances_table(rows):
    data = [["Widerstand", "Wert", "Notiz"]]
    data.extend(rows)
    return box_table(data, [110, 45, 106], row_heights=[22] + [24] * len(rows), small=True)


def states_table(rows):
    data = [["Kurzzeit-Zustaende", "Status", "Hinweis"]]
    data.extend(rows)
    return box_table(data, [95, 44, 123], row_heights=[22] + [20] * len(rows), small=True)


def side_by_side(left, right):
    table = Table([[left, right]], colWidths=[261, 262])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def consequence_block(title, slots):
    data = [[title], ["Slot", "Eintrag"]]
    data.extend([[str(index + 1), ""] for index in range(slots)])
    table = Table(data, colWidths=[40, 134], rowHeights=[24, 20] + [22] * slots)
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)),
        ("BACKGROUND", (0, 0), (1, 0), ROW_BG),
        ("BACKGROUND", (0, 1), (1, 1), ALT_BG),
        ("FONTNAME", (0, 0), (1, 1), "Helvetica-Bold"),
        ("BOX", (0, 0), (1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (1, -1), 0.35, GRID),
        ("LEFTPADDING", (0, 0), (1, -1), 6),
        ("RIGHTPADDING", (0, 0), (1, -1), 6),
        ("VALIGN", (0, 0), (1, -1), "MIDDLE"),
    ]))
    return table


def filled_consequence_block(title, entries):
    data = [[title], ["Slot", "Eintrag"]]
    for index, entry in enumerate(entries, start=1):
        data.append([str(index), Paragraph(entry, styles["CellSmall"])])
    table = Table(data, colWidths=[40, 134], rowHeights=[24, 20] + [22] * len(entries))
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)),
        ("BACKGROUND", (0, 0), (1, 0), ROW_BG),
        ("BACKGROUND", (0, 1), (1, 1), ALT_BG),
        ("FONTNAME", (0, 0), (1, 1), "Helvetica-Bold"),
        ("BOX", (0, 0), (1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (1, -1), 0.35, GRID),
        ("LEFTPADDING", (0, 0), (1, -1), 6),
        ("RIGHTPADDING", (0, 0), (1, -1), 6),
        ("VALIGN", (0, 0), (1, -1), "MIDDLE"),
    ]))
    return table


def consequence_layout(light, heavy, critical):
    left = filled_consequence_block("Leichte Konsequenzen (3)", light)
    middle = filled_consequence_block("Schwere Konsequenzen (2)", heavy)
    right = filled_consequence_block("Kritische Konsequenz (1)", critical)
    table = Table([[left, middle, right]], colWidths=[174, 174, 175])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def blank_consequence_layout():
    table = Table(
        [[consequence_block("Leichte Konsequenzen (3)", 3), consequence_block("Schwere Konsequenzen (2)", 2), consequence_block("Kritische Konsequenz (1)", 1)]],
        colWidths=[174, 174, 175],
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def skill_table(title, rows, filled=True):
    data = [[title, "Wert", "Notiz"]]
    if filled:
        data.extend(rows)
    else:
        data.extend([["", "", ""] for _ in range(rows)])
    row_heights = [24] + [20] * (len(rows) if filled else rows)
    return box_table(data, [286, 55, 182], row_heights=row_heights)


def ability_table(title, rows, filled=True):
    data = [[title, "Timing", "Kosten", "Limit", "Voraussetzung / Hook", "Effekt / Re-Einsatz"]]
    if filled:
        data.extend(rows)
        row_count = len(rows)
    else:
        row_count = rows
        data.extend([["", "", "", "", "", ""] for _ in range(rows)])
    return box_table(data, [95, 52, 58, 58, 110, 150], row_heights=[24] + [30] * row_count, small=True)


def notes_box(title, lines, filled=True, row_h=22):
    if filled:
        data = [[title]] + [[Paragraph(line, styles["CellHead"])] for line in lines]
        row_heights = [24] + [row_h] * len(lines)
    else:
        data = [[title]] + [[""] for _ in range(lines)]
        row_heights = [24] + [row_h] * lines
    table = Table(data, colWidths=[TOTAL_W], rowHeights=row_heights)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ROW_BG),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, GRID),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return table


TRIO = {
    "George": {
        "file": PLAYTEST_DIR / "THoC_Testcharakter_George_Testlayout_v7.pdf",
        "identity_pairs": [
            ("Name", "George Willbur Smith III", "Spieler", "Testbuild"),
            ("Charakter-ID", "THOC-GEO-2077", "Datum", "2026-04-16"),
        ],
        "identity_fields": [
            ("Konzept / Rolle", "Allrounder / Frontline Support / Gitarrist"),
            ("Archetyp", "Urban Ranger"),
            ("Beruf", "Edgerunner"),
            ("Ausrichtung", "Koerper / Geist"),
            ("Herkunft / Kultur", "New York -> Night City"),
            ("Kampagnenton", "Druck von oben, Loyalitaet im Trio"),
        ],
        "attributes": [
            ["Koerper", "5", "Athletikfokus", "kraftvoll, robust"],
            ["Geist", "3", "Taktikfokus", "situationsklar"],
            ["Praesenz", "4", "Sozialdruck", "kontrollierte Aussenwirkung"],
        ],
        "resistances": [
            ["Koerperwiderstand", "4", "trainiert"],
            ["Geistwiderstand", "3", "stabil unter Druck"],
            ["Praesenzwiderstand", "3", "maskiert Unsicherheit"],
            ["Reaktionsfenster", "1", "pro eigenem Zyklus"],
        ],
        "states": [
            ["Offen", "-", "nach riskanten Pushes"],
            ["Instabil", "-", "bei Fehltritt / Sturz"],
            ["Erschoepft", "-", "nach harten Spitzen"],
            ["Alarmiert", "nein", "digital selten"],
            ["Signaturspur", "0", "nur bei Link-Nutzung"],
            ["Gegenhack-offen", "nein", "lokal-only Profil"],
        ],
        "consequences": {
            "light": ["Prellungen", "Muedigkeit", "Ablenkung"],
            "heavy": ["Ueberlasteter Arm", "Anhaltender Tremor"],
            "critical": ["Familienhebel ausgeliefert"],
        },
        "broad_skills": [
            ["Athletik", "2", "Sprints, Klettern"],
            ["Fernkampf", "1", "stabile Trefferquote"],
            ["Nahkampf", "1", "kontrollierter Druck"],
            ["Wahrnehmung", "2", "frueh Gefahren erkennen"],
            ["Fahrzeuge", "1", "Bike/Auto"],
            ["Einfluss", "1", "vermittelt im Team"],
            ["Heimlichkeit", "1", "praeziser Zugang"],
            ["Technik", "1", "Basisreparaturen"],
            ["Ueberleben", "1", "Badlands-Routine"],
        ],
        "focused_skills": [
            ["Kurzwaffen", "3", "sauberes Ziehen"],
            ["Pistole", "3", "Nah-Mittel-Distanz"],
            ["Gewehr", "2", "gedeckte Feuerlinie"],
            ["Reflexschuss", "2", "bei Ueberraschung"],
            ["Motorradfahren", "1", "Flucht / Verfolgung"],
            ["Einschuechtern", "1", "ohne Eskalation"],
            ["Taktik", "1", "Rollenabsprachen"],
            ["Musik (Gitarre)", "2", "Bandkern"],
            ["Performance", "1", "Buehnenpraesenz"],
        ],
        "extra_skills": [
            ["Erste Hilfe", "1", "stabilisiert Ely/Lauri"],
            ["Mechanik", "1", "Notfall-Fixes"],
            ["Sicherheit", "1", "Zugaenge erkennen"],
            ["Koerpersprache lesen", "1", "fruehe Eskalation"],
            ["Funkkoordination", "1", "Teamcalls"],
            ["Situationsfokus", "1", "nicht tunneln"],
            ["Kraftausdauer", "1", "lange Einsaetze"],
        ],
        "advantages": [
            ["Loyaler Anker", "2", "haelt Team zusammen"],
            ["Feldroutine", "2", "funktioniert unter Feuer"],
            ["Schutzinstinkt", "2", "deckt Rueckzug"],
        ],
        "disadvantages": [
            ["People Pleaser", "2", "uebernimmt zu viel"],
            ["Familienkontrolle", "3", "Elias als Druckhebel"],
            ["Ueberwachungsdruck", "2", "handelt manchmal zu vorsichtig"],
        ],
        "weapons": [
            ["Liberty 9mm", "3", "schneller Zugriff"],
            ["Unity Gewehr", "2", "Deckungsfeuer"],
            ["Teleskopschlagstock", "2", "nicht-lethal Option"],
        ],
        "equipment": [
            ["Bike (Street Setup)", "1", "Hauptmobilitaet"],
            ["Med-Kit kompakt", "1", "Notversorgung"],
            ["Werkzeugrollset", "1", "Mechanik light"],
            ["Signalbooster", "1", "stabile Teamcalls"],
            ["Gitarrentasche", "1", "Cover + Musik"],
        ],
        "maneuvers": [
            ["Schnellziehen", "reaktiv", "0 EP", "beliebig", "Kurzwaffen 2 / Pistole 2", "zieht oder wechselt ohne Aktionsverlust; nur 1x pro eigener Runde"],
            ["Reaktionsschuss", "reaktiv", "30 EP", "1x pro Kampf", "sichtbare Bewegung / offenes Peek", "bremst Exposition; Re-Einsatz: leicht Offen oder Instabil"],
            ["Unterdrueckungsfeuer", "aktiv", "30 EP", "1x pro Szene", "Gewehrlinie + Deckung", "kontrolliert Raum; Re-Einsatz: Erschoepft oder Deckung verloren"],
        ],
        "cyberware": [
            ["Kyroshi Cyberoptics MK IV (mod)", "Pro", "shared special optics line"],
            ["Dynalar OS", "Aktiv", "primaere Stabilitaet"],
            ["Raven Microcyber MK IV Beta", "Aktiv", "sekundaerer Modus"],
            ["Techhair", "Aktiv", "Persona-Switch"],
            ["Firmware Hardening", "Pro", "keine Parent-Control"],
        ],
        "system_pairs": [
            ("OS vorhanden", "Dynalar + Raven MK IV Beta", "Cyberdeck vorhanden", "Nein"),
            ("Quickhack-Profil aktiv", "Basis / Utility", "Netzoffenheit / Hook", "lokal-only bei sensiblen Szenen"),
        ],
        "specials": [
            ["Ping", "aktiv", "10 EP", "beliebig", "lokaler Sensorpfad", "markiert Ziele / Winkel; kaum Trace bei lokaler Nutzung"],
            ["Reboot Optics", "aktiv", "25 EP", "1x pro Szene", "kurzer Sichtpfad", "Blendfenster; Re-Einsatz: Signaturspur 2 oder Ziel alarmiert"],
        ],
        "notes": [
            "Startet meist als mobile Rueckendeckung.",
            "Prioritaet: Team in Bewegung halten.",
            "Bei Triggern Atemroutine vor Push.",
        ],
        "contacts": [
            "Viktor Vektor: medizinischer Fixpunkt.",
            "Donny: externer Support-Hub.",
            "Oggy: familiaenahe Bezugsperson.",
            "Bindungslinie: George <-> Ely <-> Lauri.",
        ],
        "loadout": [
            ("Aktive Waffe", "Liberty 9mm", "Zweite Waffe", "Unity Dienstgewehr"),
            ("Getragener Schutz", "Leichte Verbundweste", "Spezialschutz / Notiz", "beweglich, unauffaellig"),
        ],
    },
    "Ely": {
        "file": PLAYTEST_DIR / "THoC_Testcharakter_Ely_Testlayout_v7.pdf",
        "identity_pairs": [
            ("Name", "Eleonore Pretty von Eichner", "Spieler", "Testbuild"),
            ("Charakter-ID", "THOC-ELY-2077", "Datum", "2026-04-16"),
        ],
        "identity_fields": [
            ("Konzept / Rolle", "Scharfschuetzin / Chemie-Expertin / Bassistin"),
            ("Archetyp", "Precision Controller"),
            ("Beruf", "Edgerunnerin"),
            ("Ausrichtung", "Geist / Praesenz"),
            ("Herkunft / Kultur", "Night City (Biotechnica-Umfeld)"),
            ("Kampagnenton", "selbstbestimmt gegen alte Kontrolle"),
        ],
        "attributes": [
            ["Koerper", "2", "mobil statt brachial", "agil"],
            ["Geist", "5", "Analysefokus", "hohe Genauigkeit"],
            ["Praesenz", "4", "ruhige Steuerung", "deutliches Auftreten"],
        ],
        "resistances": [
            ["Koerperwiderstand", "2", "nicht frontline"],
            ["Geistwiderstand", "4", "stark in Planung"],
            ["Praesenzwiderstand", "3", "lernt Nein zu sagen"],
            ["Reaktionsfenster", "1", "pro eigenem Zyklus"],
        ],
        "states": [
            ["Offen", "-", "nach ueberzogenem Schussfenster"],
            ["Instabil", "-", "bei Sandy-Spitzen"],
            ["Erschoepft", "-", "nach Chemie- oder Fokuspeaks"],
            ["Alarmiert", "nein", "Quickhack-Folge moeglich"],
            ["Signaturspur", "0", "steigt bei Re-Einsatz"],
            ["Gegenhack-offen", "nein", "nur bei digitalem Push"],
        ],
        "consequences": {
            "light": ["Ueberfokussiert", "zittrige Haende", "milder Tinnitus"],
            "heavy": ["Cyberload-Spitze", "emotionale Uebersteuerung"],
            "critical": ["Rueckfall in Fremdsteuerungsmodus"],
        },
        "broad_skills": [
            ["Fernkampf", "1", "praezise Linien"],
            ["Wahrnehmung", "1", "fruehe Marker"],
            ["Technik", "1", "chem./elektr. Setup"],
            ["Einfluss", "1", "ruhige Fuehrung"],
            ["Heimlichkeit", "", "sauberer Zugang"],
            ["Medizin", "1", "stabile Hilfen"],
            ["Recherche", "1", "schnelle Muster"],
            ["Athletik", "1", "Basisbewegung"],
            ["Ueberleben", "1", "kurze Badlands-Slots"],
        ],
        "focused_skills": [
            ["Gewehr", "4", "Hauptwaffe"],
            ["Praezisionsschuss", "3", "gezielte Neutralisierung"],
            ["Pistole", "2", "Backup auf kurze Distanz"],
            ["Kurzwaffen", "1", "schneller Waffenwechsel"],
            ["Chemie", "3", "Mischungen/Analyse"],
            ["Elektronik", "1", "Sensorik/Fallen"],
            ["Auftreten", "1", "social calm pressure"],
            ["Musik (Bass)", "1", "Bandkern"],
            ["Quickhack", "2", "gezielte Utility"],
            ["Forschung", "", "Laborniveau"],
        ],
        "extra_skills": [
            ["Deckung geben", "", "Aufklaerungsdeckel"],
            ["Zielanalyse", "1", "Priorisierung"],
            ["Grenzwertkontrolle", "", "Sandy-Timing"],
            ["Verhandeln", "", "nuechterne Deals"],
            ["Luegen erkennen", "", "Mikroindikatoren"],
            ["Datenhygiene", "", "Spuren minimieren"],
            ["Routinen bauen", "", "Stabilisierung"],
        ],
        "advantages": [
            ["Praezisionsschuetzin", "3", "hohe Trefferqualitaet"],
            ["Chemie-Expertin", "3", "breite Nutzoptionen"],
            ["Wachsame Sinne", "2", "fruehe Warnzeichen"],
        ],
        "disadvantages": [
            ["Familienbindung", "2", "Biotechnica-Druck"],
            ["Kontrollnachhall", "2", "Restmuster triggern"],
            ["Selbstzweifel", "1", "zuviel Selbstkritik"],
        ],
        "weapons": [
            ["Nekomata", "4", "Praezision auf Distanz"],
            ["Unity", "2", "Backup"],
            ["Chem-Injector", "2", "situativ"],
        ],
        "equipment": [
            ["Analysekit Chemie", "1", "Feldproben"],
            ["Sensorpaket", "1", "fruehe Marker"],
            ["Silencer Set", "1", "diskret"],
            ["Stabilisierungspatch", "2", "Notfall"],
            ["Bass Case", "1", "Bandgear"],
        ],
        "maneuvers": [
            ["Praezisionsschuss", "aktiv", "15 EP", "beliebig", "Gewehr 3 + klare Linie", "gezielte Teilbereichswirkung; teuer ueber Stellung statt Counter"],
            ["Zielfenster setzen", "aktiv", "30 EP", "1x pro Kampf", "Zielanalyse 2", "setzt Ziel Offen fuer Folgeangriff; Re-Einsatz: Erschoepft oder selbst Offen"],
            ["Sicherheits-Bypass", "aktiv", "30 EP", "1x pro Szene", "Elektronik 3 / Sicherheit 2", "oeffnet Zugang statt Schaden; Re-Einsatz: Alarmiert oder schlechte Position"],
        ],
        "cyberware": [
            ["Kyroshi Cyberoptics MK IV (mod)", "Pro", "shared special optics line"],
            ["Sandevistan (Raven)", "Aktiv", "short burst speed"],
            ["Techhair", "Aktiv", "persona switch"],
            ["Cybertattoos", "Aktiv", "Street persona"],
            ["Firmware Hardening", "Pro", "keine Parent-Control"],
        ],
        "system_pairs": [
            ("OS vorhanden", "Sandevistan Raven", "Cyberdeck vorhanden", "Teilweise / Utility"),
            ("Quickhack-Profil aktiv", "Praezisions-Utility", "Netzoffenheit / Hook", "begrenzt offen, taktisch"),
        ],
        "specials": [
            ["Ping", "aktiv", "10 EP", "beliebig", "offene Sensorik / Markierung", "line-up fuer Schussfenster; fast kostenloser Utility-Hook"],
            ["Reboot Optics", "aktiv", "25 EP", "1x pro Szene", "markiertes Cyberziel", "Kurzfenster; Re-Einsatz: Signaturspur 2 oder Ziel alarmiert"],
            ["Weapon Glitch", "aktiv", "25 EP", "1x pro Kampf", "Smartgun-Link / Kennung", "nimmt Druck raus; Re-Einsatz: gegenhack-offen"],
        ],
        "notes": [
            "Opening ueber Sichtlinie + Priorziel.",
            "Sandevistan nur fuer kritische Fenster.",
            "Chemie-Support vor purem Schaden.",
        ],
        "contacts": [
            "Donny: Datenhilfe/Infra.",
            "Viktor: medizinische Rueckfallebene.",
            "Familienlinie bleibt latent riskant.",
            "Bindungslinie: Ely <-> George <-> Lauri.",
        ],
        "loadout": [
            ("Aktive Waffe", "Nekomata Praezisionsgewehr", "Zweite Waffe", "Unity Pistole"),
            ("Getragener Schutz", "Leichte Tarnweste", "Spezialschutz / Notiz", "sniper mobility priorisiert"),
        ],
    },
    "Lauri": {
        "file": PLAYTEST_DIR / "THoC_Testcharakter_Lauri_Testlayout_v7.pdf",
        "identity_pairs": [
            ("Name", "Meredith Laurette Henshaw", "Spieler", "Testbuild"),
            ("Charakter-ID", "THOC-LAU-2077", "Datum", "2026-04-16"),
        ],
        "identity_fields": [
            ("Konzept / Rolle", "Streetsamurai / Drummerin / Breacher"),
            ("Archetyp", "Aggressive Vanguard"),
            ("Beruf", "Edgerunnerin"),
            ("Ausrichtung", "Koerper"),
            ("Herkunft / Kultur", "Night City (Arasaka-nahes Umfeld)"),
            ("Kampagnenton", "dominant, direkt, beschuetzend"),
        ],
        "attributes": [
            ["Koerper", "5", "Nahkampffokus", "explosive Aktionen"],
            ["Geist", "3", "Lagecheck", "ausreichend stabil"],
            ["Praesenz", "3", "Druckaufbau", "einschuechternd"],
        ],
        "resistances": [
            ["Koerperwiderstand", "4", "sehr robust"],
            ["Geistwiderstand", "3", "schwankt bei Triggern"],
            ["Praesenzwiderstand", "2", "impulsiv in Konflikten"],
            ["Reaktionsfenster", "1", "pro eigenem Zyklus"],
        ],
        "states": [
            ["Offen", "-", "nach Wuchtschlag / Peak"],
            ["Instabil", "-", "nach Sweep oder Fehlsprung"],
            ["Erschoepft", "-", "nach Burstserien"],
            ["Alarmiert", "nein", "digital fast nie"],
            ["Signaturspur", "0", "nur lokale Overlays"],
            ["Gegenhack-offen", "nein", "Firmware hardening aktiv"],
        ],
        "consequences": {
            "light": ["zuckende Finger", "Kurzatmigkeit", "Tunnelblick"],
            "heavy": ["Adrenalin-Crash", "Schmerzspitzen"],
            "critical": ["Kontrollverlust in Triggerlage"],
        },
        "broad_skills": [
            ["Nahkampf", "2", "prim. Zugriff"],
            ["Athletik", "2", "breach movement"],
            ["Fernkampf", "1", "solide sidearm"],
            ["Wahrnehmung", "1", "raumnahe Gefahr"],
            ["Heimlichkeit", "1", "kurzer Zugriff"],
            ["Fahrzeuge", "1", "badlands fit"],
            ["Einfluss", "1", "knapp, direkt"],
            ["Technik", "1", "nur Notfix"],
            ["Ueberleben", "1", "hoch unter Stress"],
        ],
        "focused_skills": [
            ["Klingenwaffen", "4", "hohe Dominanz"],
            ["Waffenlos", "3", "kontrollierter Zugriff"],
            ["Pistole", "2", "backup"],
            ["Reflexkampf", "2", "enge Distanzen"],
            ["Einschuechtern", "2", "deutliche Praesenz"],
            ["Akrobatik", "1", "schnelle Winkel"],
            ["Musik (Drums)", "1", "Bandkern"],
            ["Berserksteuerung", "1", "OS-Handling"],
            ["Deeskalationsrituale", "1", "Erdung nach Peak"],
        ],
        "extra_skills": [
            ["Breach Entry", "2", "erste durch Tuer"],
            ["Schutzkoerper", "1", "schirmt Team"],
            ["Grapple", "1", "Fixierung"],
            ["Improvisierte Waffen", "1", "nichts ungenutzt"],
            ["Druckresistenz", "1", "harter Kontakt"],
            ["Mikroerholung", "1", "kurz resetten"],
            ["Lagewechsel", "1", "schnelle Reposition"],
        ],
        "advantages": [
            ["Zaeh", "3", "hohe Durchhaltefaehigkeit"],
            ["Kampfintuition", "2", "fruehe Angriffsfenster"],
            ["Schutzinstinkt", "2", "haelt Linie fuer Team"],
        ],
        "disadvantages": [
            ["Impulsivitaet", "2", "geht zu frueh rein"],
            ["Triggerlage", "3", "Kontrollspitzen moeglich"],
            ["Verlustangst", "2", "ueberzieht fuer Trio"],
        ],
        "weapons": [
            ["Monoblade", "4", "hoher Nahkampfdruck"],
            ["Lexington", "2", "schnelle Sekundaerlinie"],
            ["Wurfmesser", "2", "silent opener"],
        ],
        "equipment": [
            ["Breach-Kit", "1", "mechan. Einstieg"],
            ["Stims", "2", "kurzer Push"],
            ["Bandagen/Freeze", "2", "Self-recovery"],
            ["Drum Sticks", "1", "Bandgear"],
            ["Marker-Tattoo Set", "1", "Ritual/Bindung"],
        ],
        "maneuvers": [
            ["Wuchtschlag", "aktiv", "15 EP", "beliebig", "Klingenwaffen 3", "mehr Schaden, aber du wirst Offen bis zum naechsten Angriff"],
            ["Rippenoeffner", "aktiv", "15 EP", "1x pro Kampf", "Nahkampf 4 / gute Linie", "geringer Schaden, setzt Ziel Offen fuer Finisher"],
            ["Kometenbrecher", "nachsetzend", "50 EP", "1x pro Szene", "Ziel ist Offen", "Finisher; Re-Einsatz: Adrenalin-Crash oder schwere Selbstoeffnung"],
            ["Schutzkoerper", "aktiv", "15 EP", "1x pro Kampf", "Teamnaehe", "zieht Druck auf sich; Re-Einsatz: Erschoepft oder Instabil"],
        ],
        "cyberware": [
            ["Kyroshi Cyberoptics MK IV (mod)", "Pro", "shared special optics line"],
            ["Biodyne Berserker OS", "Aktiv", "burst melee windows"],
            ["Techhair", "Aktiv", "persona shift"],
            ["Cybertattoos + echte Tattoos", "Aktiv", "left-side + navel area"],
            ["Firmware Hardening", "Pro", "keine Parent-Control"],
        ],
        "system_pairs": [
            ("OS vorhanden", "Biodyne Berserker", "Cyberdeck vorhanden", "Nein"),
            ("Quickhack-Profil aktiv", "None / anti-control focus", "Netzoffenheit / Hook", "maximal lokal, minimiert Exposition"),
        ],
        "specials": [
            ["Combat Overlay", "aktiv", "10 EP", "beliebig", "lokales HUD", "Zielpriorisierung lokal; kein Remote-Trace"],
            ["Firmware Hardening", "reaktiv", "10 EP", "1x pro Szene", "eingehender digitaler Druck", "bricht Gegenhackfenster; Re-Einsatz: gegenhack-offen"],
        ],
        "notes": [
            "Nimmt erste Kontaktwelle.",
            "Rueckzug nur auf Teamcall.",
            "Nach Peak zwingend Erdungsroutine.",
        ],
        "contacts": [
            "Meister Ming: mentale Referenz.",
            "Aldecaldo-Linie: Camp als Stabilisierung.",
            "Ely/George sind direkte Deeskalationsanker.",
            "Viktor fuer med. Follow-up nach Peaks.",
        ],
        "loadout": [
            ("Aktive Waffe", "Katana (Monoblade)", "Zweite Waffe", "Lexington Pistole"),
            ("Getragener Schutz", "Verstaerkte Combatjacke", "Spezialschutz / Notiz", "mobil + stossabsorbierend"),
        ],
    },
}


def build_character_sheet(path, character=None):
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=36, rightMargin=36, topMargin=28, bottomMargin=26)
    story = []

    is_blank = character is None

    story.append(section("Seite 1 - Identitaet, Kernwerte, Fertigkeiten"))
    story.append(Spacer(1, 8))
    if is_blank:
        story.append(label_value_table([
            ("Name", "", "Spieler", ""),
            ("Charakter-ID", "", "Datum", ""),
        ]))
        story.append(Spacer(1, 8))
        story.append(single_field_rows(["Konzept / Rolle", "Archetyp", "Beruf", "Ausrichtung", "Herkunft / Kultur", "Kampagnenton"]))
        story.append(Spacer(1, 8))
        story.append(attributes_table([["Koerper", "", "", ""], ["Geist", "", "", ""], ["Praesenz", "", "", ""]]))
        story.append(Spacer(1, 8))
        story.append(side_by_side(
            resistances_table([["Koerperwiderstand", "", ""], ["Geistwiderstand", "", ""], ["Praesenzwiderstand", "", ""], ["Reaktionsfenster", "1", "pro eigenem Zyklus"]]),
            states_table([["Offen", "", ""], ["Instabil", "", ""], ["Erschoepft", "", ""], ["Alarmiert", "", ""], ["Signaturspur", "", ""], ["Gegenhack-offen", "", ""]]),
        ))
        story.append(Spacer(1, 8))
        story.append(blank_consequence_layout())
        story.append(Spacer(1, 8))
        story.append(skill_table("Allgemeine Fertigkeiten", 9, filled=False))
        story.append(Spacer(1, 6))
        story.append(skill_table("Standardfertigkeiten / Spezialisierungen", 9, filled=False))
    else:
        story.append(label_value_table(character["identity_pairs"]))
        story.append(Spacer(1, 8))
        story.append(single_field_rows([item[0] for item in character["identity_fields"]], [item[1] for item in character["identity_fields"]]))
        story.append(Spacer(1, 8))
        story.append(attributes_table(character["attributes"]))
        story.append(Spacer(1, 8))
        story.append(side_by_side(resistances_table(character["resistances"]), states_table(character["states"])))
        story.append(Spacer(1, 8))
        story.append(consequence_layout(character["consequences"]["light"], character["consequences"]["heavy"], character["consequences"]["critical"]))
        story.append(Spacer(1, 8))
        story.append(skill_table("Allgemeine Fertigkeiten", character["broad_skills"]))
        story.append(Spacer(1, 6))
        story.append(skill_table("Standardfertigkeiten / Spezialisierungen", character["focused_skills"]))

    story.append(PageBreak())
    story.append(section("Seite 2 - Fertigkeiten (Fortsetzung), Vor- und Nachteile"))
    story.append(Spacer(1, 8))
    if is_blank:
        story.append(skill_table("Weitere Fertigkeiten / Spezialisierungen", 14, filled=False))
        story.append(Spacer(1, 8))
        story.append(skill_table("Vorteile (Name, Wert/Tier, Kurzbeschreibung)", 11, filled=False))
        story.append(Spacer(1, 8))
        story.append(skill_table("Nachteile (Name, Wert/Tier, Kurzbeschreibung)", 11, filled=False))
    else:
        story.append(skill_table("Weitere Fertigkeiten / Spezialisierungen", character["extra_skills"]))
        story.append(Spacer(1, 8))
        story.append(skill_table("Vorteile (Name, Wert/Tier, Kurzbeschreibung)", character["advantages"] + [["" , "", ""], ["", "", ""], ["", "", ""]]))
        story.append(Spacer(1, 8))
        story.append(skill_table("Nachteile (Name, Wert/Tier, Kurzbeschreibung)", character["disadvantages"] + [["", "", ""], ["", "", ""], ["", "", ""]]))

    story.append(PageBreak())
    story.append(section("Seite 3 - Waffen, Schutz, Ausruestung, Manoever"))
    story.append(Spacer(1, 8))
    if is_blank:
        story.append(label_value_table([
            ("Aktive Waffe", "", "Zweite Waffe", ""),
            ("Getragener Schutz", "", "Spezialschutz / Notiz", ""),
        ]))
        story.append(Spacer(1, 8))
        story.append(skill_table("Waffenprofile (Name, Wert, Wirkung/Notiz)", 8, filled=False))
        story.append(Spacer(1, 8))
        story.append(skill_table("Ausrustung (Name, Menge/Wert, Notiz)", 8, filled=False))
        story.append(Spacer(1, 8))
        story.append(ability_table("Manoever / Kampfoptionen", 8, filled=False))
        story.append(Spacer(1, 8))
        story.append(notes_box("Kampfnotizen / Zielwahl / Trigger", 4, filled=False))
    else:
        story.append(label_value_table(character["loadout"]))
        story.append(Spacer(1, 8))
        story.append(skill_table("Waffenprofile (Name, Wert, Wirkung/Notiz)", character["weapons"]))
        story.append(Spacer(1, 8))
        story.append(skill_table("Ausrustung (Name, Menge/Wert, Notiz)", character["equipment"]))
        story.append(Spacer(1, 8))
        story.append(ability_table("Manoever / Kampfoptionen", character["maneuvers"] + [["", "", "", "", "", ""], ["", "", "", "", "", ""]]))
        story.append(Spacer(1, 8))
        story.append(notes_box("Kampfnotizen / Zielwahl / Trigger", character["notes"]))

    story.append(PageBreak())
    story.append(section("Seite 4 - Cyberware, Quickhacks, Kraefte / Zauber / Programme"))
    story.append(Spacer(1, 8))
    if is_blank:
        story.append(skill_table("Cyberware und Features", 8, filled=False))
        story.append(Spacer(1, 8))
        story.append(label_value_table([
            ("OS vorhanden", "", "Cyberdeck vorhanden", ""),
            ("Quickhack-Profil aktiv", "", "Netzoffenheit / Hook", ""),
        ]))
        story.append(Spacer(1, 8))
        story.append(ability_table("Quickhacks / Kraefte / Zauber / Programme", 10, filled=False))
        story.append(Spacer(1, 8))
        story.append(notes_box("Kontakte, Beziehungen, Szenenanker und Notizen", 5, filled=False))
    else:
        story.append(skill_table("Cyberware und Features", character["cyberware"]))
        story.append(Spacer(1, 8))
        story.append(label_value_table(character["system_pairs"]))
        story.append(Spacer(1, 8))
        story.append(ability_table("Quickhacks / Kraefte / Zauber / Programme", character["specials"] + [["", "", "", "", "", ""], ["", "", "", "", "", ""]]))
        story.append(Spacer(1, 8))
        story.append(notes_box("Kontakte, Beziehungen, Szenenanker und Notizen", character["contacts"]))

    doc.build(story)


def main():
    build_character_sheet(PLAYTEST_DIR / "URoP_Charaktersheet_Wireframe_v7.pdf")
    for character in TRIO.values():
        build_character_sheet(character["file"], character)
    for path in [PLAYTEST_DIR / "URoP_Charaktersheet_Wireframe_v7.pdf"] + [entry["file"] for entry in TRIO.values()]:
        print(path)


if __name__ == "__main__":
    main()