import { UropCharacterSheet } from "./sheets/character-sheet.mjs";
import { UropSkillSheet } from "./sheets/items/skill-sheet.mjs";
import { UropManeuverSheet } from "./sheets/items/maneuver-sheet.mjs";
import { UropWeaponSheet } from "./sheets/items/weapon-sheet.mjs";
import { UropArmorSheet } from "./sheets/items/armor-sheet.mjs";
import { UropGearSheet } from "./sheets/items/gear-sheet.mjs";
import { UropConsumableSheet } from "./sheets/items/consumable-sheet.mjs";

async function runSystemMigrations(fromVersion, toVersion) {
  console.log(`URoP | Migration gestartet: ${fromVersion} -> ${toVersion}`);

  const migrateSizeAndRangeFields = async () => {
    for (const actor of game.actors) {
      if (actor.type !== "character") continue;

      const actorUpdates = {};
      if (!foundry.utils.hasProperty(actor, "system.sizeClass")) {
        actorUpdates["system.sizeClass"] = "G3";
      }

      if (Object.keys(actorUpdates).length > 0) {
        await actor.update(actorUpdates);
      }

      for (const item of actor.items) {
        const itemUpdates = {};

        if (item.type === "weapon") {
          if (!foundry.utils.hasProperty(item, "system.designedForSizeClass")) itemUpdates["system.designedForSizeClass"] = "G3";
          if (!foundry.utils.hasProperty(item, "system.effectiveAgainstClass")) itemUpdates["system.effectiveAgainstClass"] = "G3";
          if (!foundry.utils.hasProperty(item, "system.rangeBands.nah")) itemUpdates["system.rangeBands.nah"] = 0;
          if (!foundry.utils.hasProperty(item, "system.rangeBands.mittel")) itemUpdates["system.rangeBands.mittel"] = 0;
          if (!foundry.utils.hasProperty(item, "system.rangeBands.weit")) itemUpdates["system.rangeBands.weit"] = 0;
          if (!foundry.utils.hasProperty(item, "system.rangeBands.extrem")) itemUpdates["system.rangeBands.extrem"] = 0;
        }

        if (item.type === "armor") {
          if (!foundry.utils.hasProperty(item, "system.userSizeNominal")) itemUpdates["system.userSizeNominal"] = "G3";
        }

        if (Object.keys(itemUpdates).length > 0) {
          await item.update(itemUpdates);
        }
      }
    }

    for (const item of game.items) {
      const itemUpdates = {};

      if (item.type === "weapon") {
        if (!foundry.utils.hasProperty(item, "system.designedForSizeClass")) itemUpdates["system.designedForSizeClass"] = "G3";
        if (!foundry.utils.hasProperty(item, "system.effectiveAgainstClass")) itemUpdates["system.effectiveAgainstClass"] = "G3";
        if (!foundry.utils.hasProperty(item, "system.rangeBands.nah")) itemUpdates["system.rangeBands.nah"] = 0;
        if (!foundry.utils.hasProperty(item, "system.rangeBands.mittel")) itemUpdates["system.rangeBands.mittel"] = 0;
        if (!foundry.utils.hasProperty(item, "system.rangeBands.weit")) itemUpdates["system.rangeBands.weit"] = 0;
        if (!foundry.utils.hasProperty(item, "system.rangeBands.extrem")) itemUpdates["system.rangeBands.extrem"] = 0;
      }

      if (item.type === "armor") {
        if (!foundry.utils.hasProperty(item, "system.userSizeNominal")) itemUpdates["system.userSizeNominal"] = "G3";
      }

      if (Object.keys(itemUpdates).length > 0) {
        await item.update(itemUpdates);
      }
    }
  };

  const steps = [migrateSizeAndRangeFields];

  for (const step of steps) {
    await step();
  }

  console.log("URoP | Migration abgeschlossen");
}

Hooks.once("init", () => {
  console.log("URoP | Initialisiere System");

  game.settings.register("urop", "schemaVersion", {
    name: "URoP Schema Version",
    hint: "Intern verwaltete Datenversionsmarke fuer Migrationen.",
    scope: "world",
    config: false,
    type: String,
    default: "0.0.0"
  });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("urop", UropCharacterSheet, {
    types: ["character"],
    makeDefault: true,
    label: "URoP.CharacterSheet"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("urop", UropSkillSheet,      { types: ["skill"],       makeDefault: true, label: "URoP.Sheet.Skill" });
  Items.registerSheet("urop", UropManeuverSheet,   { types: ["maneuver"],    makeDefault: true, label: "URoP.Sheet.Maneuver" });
  Items.registerSheet("urop", UropWeaponSheet,     { types: ["weapon"],      makeDefault: true, label: "URoP.Sheet.Weapon" });
  Items.registerSheet("urop", UropArmorSheet,      { types: ["armor"],       makeDefault: true, label: "URoP.Sheet.Armor" });
  Items.registerSheet("urop", UropGearSheet,       { types: ["gear"],        makeDefault: true, label: "URoP.Sheet.Gear" });
  Items.registerSheet("urop", UropConsumableSheet, { types: ["consumable"],  makeDefault: true, label: "URoP.Sheet.Consumable" });

  Handlebars.registerHelper("uropEq", function (a, b) {
    return a === b;
  });
});

Hooks.once("ready", async () => {
  if (!game.user?.isGM) return;

  const storedVersion = game.settings.get("urop", "schemaVersion") || "0.0.0";
  const currentVersion = game.system.version;

  if (!foundry.utils.isNewerVersion(currentVersion, storedVersion)) return;

  ui.notifications.info(`URoP Migration ${storedVersion} -> ${currentVersion} gestartet.`);
  await runSystemMigrations(storedVersion, currentVersion);
  await game.settings.set("urop", "schemaVersion", currentVersion);
  ui.notifications.info(`URoP Migration auf ${currentVersion} abgeschlossen.`);
});
