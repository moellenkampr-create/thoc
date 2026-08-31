import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const systemRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.resolve(systemRoot, "..", "..", "urop", "urop23", "data", "URoP_Manoever.json");
const outputDirectory = path.join(systemRoot, "src", "packs", "urop-maneuvers");
const folderId = "uRoPManeuvers001";

function stableId(sourceId) {
  let hash = 2166136261;
  for (const character of sourceId) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `uRoPMan${(hash >>> 0).toString(36).padStart(9, "0")}`.slice(0, 16);
}

function writeDocument(document, filename) {
  fs.writeFileSync(path.join(outputDirectory, filename), `${JSON.stringify(document, null, 2)}\n`);
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

writeDocument({
  _id: folderId,
  _key: `!folders!${folderId}`,
  name: "Manöver",
  type: "Item",
  folder: null,
  sorting: "a",
  sort: 100000,
  color: null,
  flags: {}
}, `folder_maneuvers_${folderId}.json`);

const maneuvers = JSON.parse(fs.readFileSync(sourcePath, "utf8")).entries;
const tierValue = (tier) => Number(String(tier || "T0").replace(/^T/, "")) || 0;
const orderedManeuvers = [...maneuvers].sort((left, right) => {
  const tierDifference = tierValue(left.tier) - tierValue(right.tier);
  if (tierDifference !== 0) return tierDifference;
  return left.name.localeCompare(right.name, "de", { sensitivity: "base" });
});

for (const [index, maneuver] of orderedManeuvers.entries()) {
  const itemId = stableId(maneuver.id);
  const document = {
    _id: itemId,
    _key: `!items!${itemId}`,
    name: maneuver.name,
    type: "maneuver",
    img: "icons/svg/combat.svg",
    folder: folderId,
    sort: (index + 1) * 100000,
    ownership: { default: 0 },
    flags: { urop: { maneuverId: maneuver.id } },
    system: {
      tier: tierValue(maneuver.tier),
      skillItemId: "",
      learnCostEp: maneuver.learnCostEp ?? 0,
      actionCost: maneuver.actionCost || "action",
      usageWindow: maneuver.usageWindow || "once_per_conflict",
      reuseEscalation: maneuver.reuseEscalationProfile || "none",
      rulesShort: maneuver.rulesShort || "",
      description: maneuver.description || "",
      notes: maneuver.activationNotes || ""
    }
  };
  const slug = maneuver.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "maneuver";
  writeDocument(document, `maneuver_${slug}_${itemId}.json`);
}

console.log(`Generated ${orderedManeuvers.length} maneuvers.`);
