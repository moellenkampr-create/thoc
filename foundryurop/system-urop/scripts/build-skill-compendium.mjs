import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const systemRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.resolve(systemRoot, "..", "..", "urop", "urop23", "data", "URoP_Fertigkeiten_foundry_import.json");
const outputDirectory = path.join(systemRoot, "src", "packs", "urop-skills");

const groups = [
  { key: "combat", id: "uRoPSkillsCombat1", name: "Kampffertigkeiten", sort: 100000 },
  { key: "action", id: "uRoPSkillsAction1", name: "Aktionsfertigkeiten", sort: 200000 },
  { key: "fluff", id: "uRoPSkillsFluff01", name: "Flufffertigkeiten", sort: 300000 }
];

function stableId(sourceId, prefix) {
  let hash = 2166136261;
  for (const character of sourceId) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}${(hash >>> 0).toString(36).padStart(10, "0")}`.slice(0, 16);
}

function writeDocument(document, filename) {
  fs.writeFileSync(path.join(outputDirectory, filename), `${JSON.stringify(document, null, 2)}\n`);
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const group of groups) {
  writeDocument({
    _id: group.id,
    _key: `!folders!${group.id}`,
    name: group.name,
    type: "Item",
    folder: null,
    sorting: "a",
    sort: group.sort,
    color: null,
    flags: {}
  }, `folder_${group.key}_${group.id}.json`);
}

const skills = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const groupByKey = new Map(groups.map((group) => [group.key, group]));
const orderedSkills = [...skills].sort((left, right) => {
  const groupOrder = groups.findIndex((group) => group.key === left.system.applicationClass)
    - groups.findIndex((group) => group.key === right.system.applicationClass);
  if (groupOrder !== 0) return groupOrder;

  const typeOrder = { broad: 0, standard: 1, specialization: 2 };
  const typeDifference = (typeOrder[left.system.type] ?? 99) - (typeOrder[right.system.type] ?? 99);
  if (typeDifference !== 0) return typeDifference;
  return left.name.localeCompare(right.name, "de", { sensitivity: "base" });
});

for (const [index, skill] of orderedSkills.entries()) {
  const sourceId = skill.flags?.urop?.skillId || skill.name;
  const itemId = stableId(sourceId, "uRoPSkill");
  const group = groupByKey.get(skill.system.applicationClass) || groupByKey.get("action");
  const document = {
    ...skill,
    _id: itemId,
    _key: `!items!${itemId}`,
    folder: group.id,
    sort: (index + 1) * 100000,
    ownership: { default: 0 }
  };
  const slug = skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "skill";
  writeDocument(document, `skill_${slug}_${itemId}.json`);
}

console.log(`Generated ${orderedSkills.length} skills in ${groups.length} groups.`);