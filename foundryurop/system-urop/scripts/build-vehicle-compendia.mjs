import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const systemRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.resolve(systemRoot, "..", "..", "urop", "urop23", "data");
const packs = [
  { name: "urop-vehicles", source: "URoP_Vehicles_foundry_import.json", key: "actors", folder: "Fahrzeuge" },
  { name: "urop-vehicle-modules", source: "URoP_Vehicle_Modules_foundry_import.json", key: "items", folder: "Fahrzeugmodule" }
];

function stableId(seed) {
  let hash = 2166136261;
  for (const character of seed) { hash ^= character.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return `uRoPVeh${(hash >>> 0).toString(36).padStart(9, "0")}`.slice(0, 16);
}

for (const pack of packs) {
  const outputDirectory = path.join(systemRoot, "src", "packs", pack.name);
  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });
  const documents = JSON.parse(fs.readFileSync(path.join(sourceRoot, pack.source), "utf8"));
  const folderId = stableId(`${pack.name}-folder`);
  const folderDocument = { _id: folderId, _key: `!folders!${folderId}`, name: pack.folder, type: pack.key === "actors" ? "Actor" : "Item", folder: null, sorting: "a", sort: 100000, color: null, flags: {} };
  fs.writeFileSync(path.join(outputDirectory, `folder_${pack.name}.json`), `${JSON.stringify(folderDocument, null, 2)}\n`);
  for (const [index, source] of documents.entries()) {
    const id = stableId(`${pack.name}-${source.name}`);
    const document = { ...source, _id: id, _key: `!${pack.key}!${id}`, folder: folderId, sort: (index + 1) * 100000, ownership: { default: 0 }, flags: { urop: { source: pack.name } } };
    fs.writeFileSync(path.join(outputDirectory, `${source.type}_${id}.json`), `${JSON.stringify(document, null, 2)}\n`);
  }
  console.log(`Generated ${documents.length} ${pack.name} documents.`);
}
