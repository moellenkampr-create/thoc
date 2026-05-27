# THoC Foundry Import Rules

This note captures the default JSON conventions for THoC imports so exports can be generated consistently across chats.

## 1) Universal Importer Baseline

- Preferred macro: `foundrycwn/universal_import_update_v4.js`.
- v4 supports legacy actor payloads and broader upsert behavior.
- Keep payloads in the shape expected by the macro mode (avoid ad-hoc wrappers unless required).

## 2) Simple Calendar Reborn JournalEntry JSON

Use flat JournalEntry import JSON (no `exportType` wrapper).

Required fields:

- `name`
- `flags.core.sheetClass = "foundryvtt-simple-calendar-reborn.NoteSheet"`
- `flags.foundryvtt-simple-calendar-reborn.noteData`

Required `noteData` keys:

- `calendarId`
- `startDate`
- `endDate`
- `allDay`
- `repeats`
- `order`
- `categories`
- `remindUsers`
- `macro`
- `fromPredefined`

Date rule:

- month/day are 0-based in noteData.
- Example: 2077-07-18 => `month: 6`, `day: 17`.

## 3) THoC Delivery Defaults

- Provide SC exports as single-entry copyboxes (one JSON object per import).
- Include only plot-relevant entries unless explicitly asked for full dumps.

## 4) Visibility/Persistence Troubleshooting

- If a note is imported but not visible in the calendar:
  - move it into the correct Notes subfolder in Journals,
  - then reload Foundry (F5).
- For better persistence across restarts, include a valid Journal `folder` id when known.

## 5) Minimal SC Template

```json
{
  "name": "[EVENT] Example",
  "flags": {
    "core": {
      "sheetClass": "foundryvtt-simple-calendar-reborn.NoteSheet"
    },
    "foundryvtt-simple-calendar-reborn": {
      "noteData": {
        "calendarId": "default",
        "startDate": { "year": 2077, "month": 6, "day": 17, "hour": 0, "minute": 0, "seconds": 0 },
        "endDate": { "year": 2077, "month": 6, "day": 17, "hour": 0, "minute": 0, "seconds": 0 },
        "allDay": true,
        "repeats": 0,
        "order": 0,
        "categories": ["EVENT"],
        "remindUsers": [],
        "macro": "none",
        "fromPredefined": false
      }
    }
  },
  "pages": [
    {
      "name": "Inhalt",
      "type": "text",
      "text": { "content": "<p>Example content</p>", "format": 1 },
      "title": { "show": true, "level": 1 }
    }
  ]
}
```
