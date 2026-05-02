/**
 * Universal Import / Update Macro V3
 *
 * Improvements over V2:
 * - Supports root JSON arrays (multiple entries in one paste)
 * - Supports mixed payloads in arrays (raw docs + wrapped docs)
 * - Better error reporting per entry
 * - Optional update matching modes (UUID+ID, Name+Type, ID only)
 * - Keeps Actor embedded Item/Effect handling
 */

function deepClone(obj) {
  return foundry.utils.deepClone(obj);
}

function stripMetaRecursive(value) {
  if (Array.isArray(value)) {
    return value.map(stripMetaRecursive);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const out = {};
  for (const [k, v] of Object.entries(value)) {
    if (["_stats", "folder", "sort", "ownership", "permission", "pack", "uuid"].includes(k)) continue;

    if (k === "flags" && v?.core?.sourceId) {
      const flags = deepClone(v);
      delete flags.core.sourceId;
      out[k] = stripMetaRecursive(flags);
      continue;
    }

    out[k] = stripMetaRecursive(v);
  }

  return out;
}

function adjustSimpleCalendarNoteDate(dateObj, dateMode) {
  if (!dateObj || typeof dateObj !== "object") return;
  if (dateMode !== "human") return;

  if (Number.isInteger(dateObj.month)) {
    dateObj.month = Math.max(0, dateObj.month - 1);
  }

  if (Number.isInteger(dateObj.day)) {
    dateObj.day = Math.max(0, dateObj.day - 1);
  }
}

function applyDateModeTransforms(data, dateMode) {
  if (!data || typeof data !== "object") return data;

  const noteData = data?.flags?.["foundryvtt-simple-calendar-reborn"]?.noteData;
  if (!noteData) return data;

  adjustSimpleCalendarNoteDate(noteData.startDate, dateMode);
  adjustSimpleCalendarNoteDate(noteData.endDate, dateMode);
  return data;
}

function inferDocumentType(data) {
  if (data?.documentName) return data.documentName;
  if (data?.prototypeToken || data?.items) return "Actor";
  if (data?.pages) return "JournalEntry";
  if (data?.background || data?.grid) return "Scene";
  if (data?.results) return "RollTable";
  if (data?.sounds) return "Playlist";
  return "Item";
}

function getWorldCollection(documentType) {
  const map = {
    Actor: game.actors,
    Item: game.items,
    Scene: game.scenes,
    JournalEntry: game.journal,
    RollTable: game.tables,
    Playlist: game.playlists,
    Macro: game.macros,
    Cards: game.cards,
    Folder: game.folders
  };
  return map[documentType] ?? null;
}

function wrapEntry(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid entry: expected object");
  }

  if (raw?.documentType && raw?.data) {
    return {
      documentType: raw.documentType,
      _id: raw._id ?? raw.data?._id ?? null,
      uuid: raw.uuid ?? null,
      name: raw.name ?? raw.data?.name ?? "Unnamed",
      data: raw.data
    };
  }

  if (raw?.exportType === "foundry-asset-export" && Array.isArray(raw.documents)) {
    return raw.documents.map(doc => wrapEntry(doc));
  }

  return {
    documentType: inferDocumentType(raw),
    _id: raw._id ?? null,
    uuid: raw.uuid ?? null,
    name: raw.name ?? "Unnamed",
    data: raw
  };
}

function normalizePayload(parsed) {
  if (Array.isArray(parsed)) {
    const entries = [];
    for (const element of parsed) {
      const wrapped = wrapEntry(element);
      if (Array.isArray(wrapped)) entries.push(...wrapped);
      else entries.push(wrapped);
    }
    return entries;
  }

  const wrapped = wrapEntry(parsed);
  return Array.isArray(wrapped) ? wrapped : [wrapped];
}

async function readFiles(files) {
  const texts = [];
  for (const file of files) {
    texts.push(await file.text());
  }
  return texts;
}

async function resolveExistingWorldDoc(entry, matchMode) {
  if (matchMode !== "name") {
    if (entry.uuid) {
      try {
        const byUuid = await fromUuid(entry.uuid);
        if (byUuid) return byUuid;
      } catch {
        // Ignore UUID lookup errors and continue.
      }
    }

    const collection = getWorldCollection(entry.documentType);
    if (entry._id && collection?.get(entry._id)) {
      return collection.get(entry._id);
    }
  }

  if (matchMode !== "id") {
    const collection = getWorldCollection(entry.documentType);
    if (!collection) return null;
    return collection.find(d => d.name === entry.name && d.type === entry.data?.type);
  }

  return null;
}

async function updateActorEmbedded(actor, items, effects) {
  if (items?.length) {
    await actor.createEmbeddedDocuments("Item", items.map(i => stripMetaRecursive(i)));
  }
  if (effects?.length) {
    await actor.createEmbeddedDocuments("ActiveEffect", effects.map(e => stripMetaRecursive(e)));
  }
}

async function importEntry(entry, mode, matchMode, dateMode, results) {
  const data = stripMetaRecursive(entry.data);
  applyDateModeTransforms(data, dateMode);

  // Simple Calendar Reborn notes must stay in their target Journal folder
  // to remain visible across restarts.
  const isSimpleCalendarJournalNote =
    entry.documentType === "JournalEntry" &&
    !!data?.flags?.["foundryvtt-simple-calendar-reborn"]?.noteData;
  const sourceFolder = entry.data?.folder;
  if (isSimpleCalendarJournalNote && sourceFolder) {
    data.folder = sourceFolder;
  }

  const existing = await resolveExistingWorldDoc(entry, matchMode);

  if (existing && mode === "create") {
    results.skipped.push(entry.name);
    return;
  }

  if (existing) {
    data._id = existing.id;
    await existing.update(data);
    results.updated.push(entry.name);
    return;
  }

  delete data._id;

  if (entry.documentType === "Actor") {
    const actorData = deepClone(data);
    const items = actorData.items ?? [];
    const effects = actorData.effects ?? [];
    delete actorData.items;
    delete actorData.effects;

    const actor = await Actor.create(actorData);
    await updateActorEmbedded(actor, items, effects);
    results.created.push(actor.name);
    return;
  }

  const cls = {
    Actor,
    Item,
    Scene,
    JournalEntry,
    RollTable,
    Playlist,
    Macro,
    Cards,
    Folder
  }[entry.documentType];

  if (!cls) {
    throw new Error(`Unsupported document type: ${entry.documentType}`);
  }

  const created = await cls.create(data);
  results.created.push(created.name);
}

new Dialog({
  title: "Import / Update V3",
  content: `
    <p>Paste JSON or upload files. Arrays are supported.</p>
    <textarea id="json" style="width:100%;height:220px;"></textarea>
    <input type="file" id="files" multiple />
    <hr/>
    <label>Mode:</label>
    <select id="mode">
      <option value="update">Create or Update</option>
      <option value="create">Create Only</option>
    </select>
    <label>Matching:</label>
    <select id="match">
      <option value="full">UUID + ID</option>
      <option value="name">Name + Type</option>
      <option value="id">ID only</option>
    </select>
    <label>Date mode:</label>
    <select id="dateMode">
      <option value="raw">Raw values (already module-formatted)</option>
      <option value="human">Human dates for Simple Calendar (month/day minus 1)</option>
    </select>
  `,
  buttons: {
    run: {
      label: "Run",
      callback: async html => {
        const raw = html.find("#json").val();
        const files = html.find("#files")[0].files;
        const mode = html.find("#mode").val();
        const matchMode = html.find("#match").val();
        const dateMode = html.find("#dateMode").val();

        let entries = [];

        if (raw?.trim()) {
          const parsed = JSON.parse(raw);
          entries = entries.concat(normalizePayload(parsed));
        }

        if (files.length) {
          const texts = await readFiles(files);
          for (const t of texts) {
            const parsed = JSON.parse(t);
            entries = entries.concat(normalizePayload(parsed));
          }
        }

        const results = { created: [], updated: [], skipped: [], errors: [] };

        for (const e of entries) {
          try {
            await importEntry(e, mode, matchMode, dateMode, results);
          } catch (err) {
            console.error("Import error:", e?.name, err);
            results.errors.push({ name: e?.name ?? "Unknown", message: err?.message ?? String(err) });
          }
        }

        ui.notifications.info(
          `Created: ${results.created.length}, Updated: ${results.updated.length}, Skipped: ${results.skipped.length}, Errors: ${results.errors.length}`
        );

        console.log("Import results:", results);
      }
    }
  }
}).render(true);
