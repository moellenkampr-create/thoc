import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("character template exposes Adaptability without the retired modifier fields", () => {
  const template = JSON.parse(read("template.json"));
  const character = template.Actor.character;
  const sheet = read("templates/actors/character-sheet.hbs");

  assert.equal(character.specialAttributes.adaptability, 6);
  assert.equal("attributeModifiers" in character, false);
  assert.equal("leadAttributeModifiers" in character, false);
  assert.equal("modifiersText" in character, false);
  assert.match(sheet, /system\.specialAttributes\.adaptability/);
  const renderedSheet = sheet.replace(/<!--[\s\S]*?-->/g, "");
  assert.equal((renderedSheet.match(/<div class="tab"[^>]+data-tab="attributes"/g) || []).length, 1);
  assert.doesNotMatch(renderedSheet, /attributeModifiers|leadAttributeModifiers|modifiersText/);
});

test("character sheet offers direct item creation and context-menu deletion", () => {
  const template = read("templates/actors/character-sheet.hbs");
  const sheet = read("scripts/sheets/character-sheet.mjs");

  for (const type of ["skill", "quickhack", "maneuver", "gear", "consumable", "weapon", "armor", "cyberware"]) {
    assert.match(template, new RegExp(`data-item-type=\\"${type}\\"`));
  }
  assert.match(sheet, /createEmbeddedDocuments\("Item"/);
  assert.match(sheet, /deleteEmbeddedDocuments\("Item"/);
  assert.match(sheet, /_saveFormBeforeItemAction/);
});

test("migration removes retired modifier data and supplies Adaptability", () => {
  const migration = read("scripts/urop.mjs");

  assert.match(migration, /system\.specialAttributes\.adaptability/);
  assert.match(migration, /-=system\.attributeModifiers/);
  assert.match(migration, /-=system\.leadAttributeModifiers/);
  assert.match(migration, /-=system\.modifiersText/);
});

test("skill compendium contains every imported skill in the matching application-class folder", () => {
  const sourceDirectory = path.join(root, "src", "packs", "urop-skills");
  const sourceFiles = fs.readdirSync(sourceDirectory).filter((filename) => filename.endsWith(".json"));
  const folders = sourceFiles.filter((filename) => filename.startsWith("folder_"));
  const skills = sourceFiles
    .filter((filename) => filename.startsWith("skill_"))
    .map((filename) => JSON.parse(read(path.join("src", "packs", "urop-skills", filename))));
  const folderByClass = {
    combat: "uRoPSkillCombat1",
    action: "uRoPSkillAction1",
    fluff: "uRoPSkillFluff01"
  };

  assert.equal(folders.length, 3);
  assert.equal(skills.length, 73);
  for (const skill of skills) {
    assert.equal(skill.type, "skill");
    assert.equal(skill.folder, folderByClass[skill.system.applicationClass]);
    assert.match(skill._key, /^!items![A-Za-z0-9]{16}$/);
  }
});

test("quickhack detail fields are unique to prevent duplicate form values", () => {
  const template = read("templates/items/quickhack-sheet.hbs");

  assert.equal((template.match(/name="system\.skillItemId"/g) || []).length, 1);
  assert.equal((template.match(/name="system\.tier"/g) || []).length, 1);
  assert.equal((template.match(/>Fertigkeit</g) || []).length, 1);
  assert.equal((template.match(/name="system\.learnCostEp"/g) || []).length, 0);
});

test("maneuver details and compendium use numeric tiers with local skill assignment", () => {
  const template = JSON.parse(read("template.json"));
  const sheet = read("templates/items/maneuver-sheet.hbs");
  const sourceDirectory = path.join(root, "src", "packs", "urop-maneuvers");
  const sources = fs.readdirSync(sourceDirectory).filter((filename) => filename.startsWith("maneuver_"));

  assert.equal(template.Item.maneuver.tier, 1);
  assert.equal(template.Item.maneuver.skillItemId, "");
  assert.equal((sheet.match(/name="system\.skillItemId"/g) || []).length, 1);
  assert.equal((sheet.match(/name="system\.tier"/g) || []).length, 1);
  assert.match(sheet, /name="system\.prerequisitesText"/);
  assert.equal(sources.length, 38);
  for (const filename of sources) {
    const maneuver = JSON.parse(read(path.join("src", "packs", "urop-maneuvers", filename)));
    assert.equal(maneuver.type, "maneuver");
    assert.equal(typeof maneuver.system.tier, "number");
    assert.ok(maneuver.system.tier >= 0 && maneuver.system.tier <= 6);
    assert.equal("learnCostEp" in maneuver.system, false);
    assert.equal(typeof maneuver.system.prerequisitesText, "string");
  }
});

test("structured maneuver data uses the shared numeric tier range", () => {
  const maneuvers = JSON.parse(read("../../urop/urop23/data/URoP_Manoever.json"));

  assert.deepEqual(maneuvers.enums.tier, [0, 1, 2, 3, 4, 5, 6]);
  for (const maneuver of maneuvers.entries) {
    assert.equal(typeof maneuver.tier, "number");
    assert.ok(maneuver.tier >= 0 && maneuver.tier <= 6);
  }
});

test("software items use prerequisites instead of active EP fields", () => {
  const template = JSON.parse(read("template.json"));
  const quickhackImports = JSON.parse(read("../../urop/urop23/data/URoP_Quickhacks_foundry_import.json"));

  assert.equal("learnCostEp" in template.Item.maneuver, false);
  assert.equal("learnCostEp" in template.Item.quickhack, false);
  assert.equal(template.Item.maneuver.prerequisitesText, "");
  for (const quickhack of quickhackImports) {
    assert.equal("learnCostEp" in quickhack.system, false);
  }
});

test("vehicles are modular actors with configurable structure consequences", () => {
  const template = JSON.parse(read("template.json"));
  const manifest = JSON.parse(read("system.json"));
  const vehicleSheet = read("templates/actors/vehicle-sheet.hbs");
  const characterSheet = read("templates/actors/character-sheet.hbs");
  const vehicleSources = fs.readdirSync(path.join(root, "src", "packs", "urop-vehicles"))
    .filter((filename) => filename.startsWith("vehicle_"));
  const moduleSources = fs.readdirSync(path.join(root, "src", "packs", "urop-vehicle-modules"))
    .filter((filename) => filename.startsWith("vehicle_module_"));

  assert.ok(template.Actor.types.includes("vehicle"));
  assert.ok(template.Item.types.includes("vehicle_module"));
  assert.ok("vehicle" in manifest.documentTypes.Actor);
  assert.ok("vehicle_module" in manifest.documentTypes.Item);
  assert.match(vehicleSheet, /system\.settings\.sections/);
  assert.match(vehicleSheet, /system\.consequences\.light/);
  assert.match(characterSheet, /data-vehicle-select/);
  assert.equal(vehicleSources.length, 3);
  assert.equal(moduleSources.length, 8);
  const truck = JSON.parse(read(path.join("src", "packs", "urop-vehicles", vehicleSources.find((filename) => filename.includes("Box-Truck")) || vehicleSources[2])));
  assert.equal(truck.system.settings.consequenceSlots.light, 5);
  for (const filename of moduleSources) {
    const module = JSON.parse(read(path.join("src", "packs", "urop-vehicle-modules", filename)));
    assert.equal(module.type, "vehicle_module");
    assert.ok(module.system.tier >= 0 && module.system.tier <= 6);
    assert.equal(typeof module.system.price, "number");
    assert.equal(typeof module.system.availability, "string");
  }
});