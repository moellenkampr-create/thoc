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
        "file": PLAYTEST_DIR / "THoC_Testcharakter_George_Testlayout_v8.pdf",
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
            ["Athletik", "2", ""],
            ["Fernkampf", "1", ""],
            ["Nahkampf", "1", ""],
            ["Wahrnehmung", "2", ""],
            ["Fahrzeuge", "1", ""],
            ["Einfluss", "1", ""],
            ["Heimlichkeit", "1", ""],
            ["Technik", "1", ""],
            ["Ueberleben", "1", ""],
        ],
        "focused_skills": [
            ["Kurzwaffen", "3", ""],
            ["Pistole", "3", ""],
            ["Gewehr", "2", ""],
            ["Reflexschuss", "2", ""],
            ["Motorradfahren", "1", ""],
            ["Einschuechtern", "1", ""],
            ["Taktik", "1", ""],
            ["Musik (Gitarre)", "2", "Bandkern"],
            ["Performance", "1", ""],
        ],
        "extra_skills": [
            ["Erste Hilfe", "1", ""],
            ["Mechanik", "1", ""],
            ["Sicherheit", "1", ""],
            ["Koerpersprache lesen", "1", ""],
            ["Funkkoordination", "1", ""],
            ["Situationsfokus", "1", ""],
            ["Kraftausdauer", "1", ""],
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
            ["Liberty 9mm", "3", ""],
            ["Unity Gewehr", "2", ""],
            ["Teleskopschlagstock", "2", ""],
        ],
        "equipment": [
            ["Bike (Street Setup)", "1", ""],
            ["Med-Kit kompakt", "1", ""],
            ["Werkzeugrollset", "1", ""],
            ["Signalbooster", "1", ""],
            ["Gitarrentasche", "1", "Cover + Musik"],
        ],
        "maneuvers": [
            ["Schnellziehen", "reaktiv", "0 EP", "beliebig", "Kurzwaffen 2 / Pistole 2", "zieht oder wechselt ohne Aktionsverlust; nur 1x pro eigener Runde"],
            ["Reaktionsschuss", "reaktiv", "30 EP", "1x pro Kampf", "sichtbare Bewegung / offenes Peek", "bremst Exposition; Re-Einsatz: leicht Offen oder Instabil"],
            ["Unterdrueckungsfeuer", "aktiv", "30 EP", "1x pro Szene", "Gewehrlinie + Deckung", "kontrolliert Raum; Re-Einsatz: Erschoepft oder Deckung verloren"],
        ],
        "cyberware": [
            ["Kyroshi Cyberoptics MK IV (mod)", "Passiv", "Targeting + Smartlink + Zoom + Threat-Highlight"],
            ["Dynalar OS", "Aktiv", "primaere Stabilitaet"],
            ["Raven Microcyber MK IV Beta", "Aktiv", "sekundaerer Modus"],
            ["Techhair", "Aktiv", "Persona-Switch"],
            ["Firmware Hardening", "Passiv", "keine Parent-Control"],
        ],
        "system_pairs": [
            ("OS vorhanden", "Dynalar + Raven MK IV Beta", "Cyberdeck vorhanden", "Nein"),
            ("Quickhack-Profil aktiv", "Nein", "Netzoffenheit / Hook", "lokal-only bei sensiblen Szenen"),
        ],
        "specials": [
            ["Sensor-Overlay", "aktiv", "0 EP", "beliebig", "lokaler Sensorpfad", "markiert Ziele / Winkel ohne Remote-Eingriff"],
            ["Optik-Reset (lokal)", "aktiv", "0 EP", "1x pro Szene", "direkter Nahlink", "kurzes Blendfenster; kein Netz-Hook"],
        ],
        "notes": [
            "",
            "",
            "",
        ],
        "contacts": [
            "Viktor Vektor: medizinischer Fixpunkt.",
            "Donny: externer Support-Hub.",
            "Oggy: familiaenahe Bezugsperson.",
            "Bindungslinie: George <-> Ely <-> Lauri.",
        ],
        "loadout": [
            ("Aktive Waffe", "Liberty 9mm", "Zweite Waffe", "Unity Dienstgewehr"),
            ("Getragener Schutz", "Leichte Verbundweste", "Spezialschutz / Notiz", ""),
        ],
    },
    "Ely": {
        "file": PLAYTEST_DIR / "THoC_Testcharakter_Ely_Testlayout_v8.pdf",
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
            ["Koerper", "2", "", ""],
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
            ["Offen", "nein", ""],
            ["Instabil", "nein", ""],
            ["Erschoepft", "nein", ""],
            ["Alarmiert", "nein", ""],
            ["Signaturspur", "0", ""],
            ["Gegenhack-offen", "nein", ""],
        ],
        "consequences": {
            "light": ["", "", ""],
            "heavy": ["", ""],
            "critical": [""],
        },
        "broad_skills": [
            ["Fernkampf", "1", ""],
            ["Wahrnehmung", "1", ""],
            ["Technik", "1", ""],
            ["Einfluss", "1", ""],
            ["Heimlichkeit", "", ""],
            ["Medizin", "1", ""],
            ["Recherche", "1", ""],
            ["Athletik", "1", ""],
            ["Ueberleben", "1", ""],
        ],
        "focused_skills": [
            ["Gewehr", "4", ""],
            ["Praezisionsschuss", "3", ""],
            ["Pistole", "2", ""],
            ["Kurzwaffen", "1", ""],
            ["Chemie", "3", ""],
            ["Elektronik", "1", ""],
            ["Auftreten", "1", ""],
            ["Musik (Bass)", "1", "Bandkern"],
            ["Forschung", "", ""],
        ],
        "extra_skills": [
            ["Verhandeln", "", ""],
            ["Luegen erkennen", "", ""],
            ["Biotechnica-Protokolle", "1", ""],
            ["Laborpraxis", "1", ""],
            ["Bandorga", "1", ""],
            ["Heimlichkeit", "", ""],
            ["Forschung", "", ""],
        ],
        "advantages": [
            ["Agil", "2", "schnelle Positionswechsel"],
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
            ["Nekomata", "4", ""],
            ["Unity", "2", ""],
            ["Chem-Injector", "2", ""],
        ],
        "equipment": [
            ["Analysekit Chemie", "1", ""],
            ["Sensorpaket", "1", ""],
            ["Silencer Set", "1", ""],
            ["Stabilisierungspatch", "2", ""],
            ["Bass Case", "1", "Bandgear"],
        ],
        "maneuvers": [
            ["Deckung geben", "reaktiv", "0 EP", "1x pro Runde", "Sichtlinie zum Team", "gewahrt Verbunddeckung fuer 1 Verbundeten bis zu deinem naechsten Zug"],
            ["Zielanalyse", "aktiv", "15 EP", "beliebig", "Geist 4 / freie Sicht", "analysiert Priorziel; naechster Praezisionsschuss gegen dieses Ziel mit Vorteil"],
            ["Grenzwertkontrolle", "reaktiv", "15 EP", "1x pro Szene", "Sandevistan aktiv", "kappst Uebersteuerung; verhindert Instabil fuer die laufende Sequenz"],
            ["Praezisionsschuss", "aktiv", "15 EP", "beliebig", "Gewehr 3 + klare Linie", "gezielte Teilbereichswirkung; teuer ueber Stellung statt Counter"],
            ["Zielfenster setzen", "aktiv", "30 EP", "1x pro Kampf", "Gewehr 4 / ruhige Lage", "setzt Ziel Offen fuer Folgeangriff; Re-Einsatz: Erschoepft oder selbst Offen"],
            ["Sicherheits-Bypass", "aktiv", "30 EP", "1x pro Szene", "Elektronik 3 / Sicherheit 2", "oeffnet Zugang statt Schaden; Re-Einsatz: Alarmiert oder schlechte Position"],
        ],
        "cyberware": [
            ["Kyroshi Cyberoptics MK IV (mod)", "Passiv", "Targeting + Smartlink + Zoom + Threat-Highlight"],
            ["Sandevistan (Raven)", "Aktiv", "short burst speed"],
            ["Techhair", "Aktiv", "persona switch"],
            ["Cybertattoos", "Aktiv", "Street persona"],
            ["Firmware Hardening", "Passiv", "keine Parent-Control"],
        ],
        "system_pairs": [
            ("OS vorhanden", "Sandevistan Raven", "Cyberdeck vorhanden", "Nein"),
            ("Quickhack-Profil aktiv", "Nein", "Netzoffenheit / Hook", "lokal-only"),
        ],
        "specials": [
            ["Sandevistan Burst", "aktiv", "30 EP", "1x pro Szene", "Sandevistan aktiv", "kurzes Tempofenster fuer Positionierung oder praezisen Winkel"],
            ["Fokuslinie", "aktiv", "15 EP", "beliebig", "ruhige Lage / Zielfenster", "stabilisiert den Schussaufbau; hebt situative Mali auf Distanz teilweise auf"],
            ["Chemie-Push", "aktiv", "15 EP", "1x pro Kampf", "passende Mischung verfuegbar", "kurzer Selbst- oder Team-Buff; Re-Einsatz: Erschoepft"],
        ],
        "notes": [
            "",
            "",
            "",
        ],
        "contacts": [
            "Donny: Datenhilfe/Infra.",
            "Viktor: medizinische Rueckfallebene.",
            "Familienlinie bleibt latent riskant.",
            "Bindungslinie: Ely <-> George <-> Lauri.",
        ],
        "loadout": [
            ("Aktive Waffe", "Nekomata Praezisionsgewehr", "Zweite Waffe", "Unity Pistole"),
            ("Getragener Schutz", "Leichte Tarnweste", "Spezialschutz / Notiz", ""),
        ],
    },
    "Lauri": {
        "file": PLAYTEST_DIR / "THoC_Testcharakter_Lauri_Testlayout_v8.pdf",
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
            ["Nahkampf", "2", ""],
            ["Athletik", "2", ""],
            ["Fernkampf", "1", ""],
            ["Wahrnehmung", "1", ""],
            ["Heimlichkeit", "1", ""],
            ["Fahrzeuge", "1", ""],
            ["Einfluss", "1", ""],
            ["Technik", "1", ""],
            ["Ueberleben", "1", ""],
        ],
        "focused_skills": [
            ["Klingenwaffen", "4", ""],
            ["Waffenlos", "3", ""],
            ["Pistole", "2", ""],
            ["Reflexkampf", "2", ""],
            ["Einschuechtern", "2", ""],
            ["Akrobatik", "1", ""],
            ["Musik (Drums)", "1", "Bandkern"],
            ["Berserksteuerung", "1", ""],
            ["Deeskalationsrituale", "1", ""],
        ],
        "extra_skills": [
            ["Breach Entry", "2", ""],
            ["Schutzkoerper", "1", ""],
            ["Grapple", "1", ""],
            ["Improvisierte Waffen", "1", ""],
            ["Druckresistenz", "1", ""],
            ["Mikroerholung", "1", ""],
            ["Lagewechsel", "1", ""],
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
            ["Monoblade", "4", ""],
            ["Lexington", "2", ""],
            ["Wurfmesser", "2", ""],
        ],
        "equipment": [
            ["Breach-Kit", "1", ""],
            ["Stims", "2", ""],
            ["Bandagen/Freeze", "2", ""],
            ["Drum Sticks", "1", "Bandgear"],
            ["Marker-Tattoo Set", "1", ""],
        ],
        "maneuvers": [
            ["Wuchtschlag", "aktiv", "15 EP", "beliebig", "Klingenwaffen 3", "mehr Schaden, aber du wirst Offen bis zum naechsten Angriff"],
            ["Rippenoeffner", "aktiv", "15 EP", "1x pro Kampf", "Nahkampf 4 / gute Linie", "geringer Schaden, setzt Ziel Offen fuer Finisher"],
            ["Kometenbrecher", "nachsetzend", "50 EP", "1x pro Szene", "Ziel ist Offen", "Finisher; Re-Einsatz: Adrenalin-Crash oder schwere Selbstoeffnung"],
            ["Schutzkoerper", "aktiv", "15 EP", "1x pro Kampf", "Teamnaehe", "zieht Druck auf sich; Re-Einsatz: Erschoepft oder Instabil"],
        ],
        "cyberware": [
            ["Kyroshi Cyberoptics MK IV (mod)", "Passiv", "Targeting + Smartlink + Zoom + Threat-Highlight"],
            ["Biodyne Berserker OS", "Aktiv", "burst melee windows"],
            ["Techhair", "Aktiv", "persona shift"],
            ["Cybertattoos + echte Tattoos", "Aktiv", "left-side + navel area"],
            ["Firmware Hardening", "Passiv", "keine Parent-Control"],
        ],
        "system_pairs": [
            ("OS vorhanden", "Biodyne Berserker", "Cyberdeck vorhanden", "Nein"),
            ("Quickhack-Profil aktiv", "Nein", "Netzoffenheit / Hook", "maximal lokal, minimiert Exposition"),
        ],
        "specials": [
            ["Combat Overlay", "aktiv", "10 EP", "beliebig", "lokales HUD", "Zielpriorisierung lokal; kein Remote-Trace"],
            ["Firmware Hardening", "reaktiv", "10 EP", "1x pro Szene", "eingehender digitaler Druck", "bricht Gegenhackfenster; Re-Einsatz: gegenhack-offen"],
        ],
        "notes": [
            "",
            "",
            "",
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
    build_character_sheet(PLAYTEST_DIR / "URoP_Charaktersheet_Wireframe_v8.pdf")
    for character in TRIO.values():
        build_character_sheet(character["file"], character)
    for path in [PLAYTEST_DIR / "URoP_Charaktersheet_Wireframe_v8.pdf"] + [entry["file"] for entry in TRIO.values()]:
        print(path)


if __name__ == "__main__":
    main()