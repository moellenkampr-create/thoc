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
    combat: "uRoPSkillsCombat1",
    action: "uRoPSkillsAction1",
    fluff: "uRoPSkillsFluff01"
  };

  assert.equal(folders.length, 3);
  assert.equal(skills.length, 73);
  for (const skill of skills) {
    assert.equal(skill.type, "skill");
    assert.equal(skill.folder, folderByClass[skill.system.applicationClass]);
    assert.match(skill._key, /^!items![A-Za-z0-9]{16}$/);
  }
});