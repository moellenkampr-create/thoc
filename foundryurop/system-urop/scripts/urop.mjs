import { UropCharacterSheet } from "./sheets/character-sheet.mjs";
import { UropSkillSheet } from "./sheets/items/skill-sheet.mjs";
import { UropManeuverSheet } from "./sheets/items/maneuver-sheet.mjs";
import { UropWeaponSheet } from "./sheets/items/weapon-sheet.mjs";
import { UropArmorSheet } from "./sheets/items/armor-sheet.mjs";
import { UropCyberwareSheet } from "./sheets/items/cyberware-sheet.mjs";
import { UropQuickhackSheet } from "./sheets/items/quickhack-sheet.mjs";
import { UropGearSheet } from "./sheets/items/gear-sheet.mjs";
import { UropConsumableSheet } from "./sheets/items/consumable-sheet.mjs";

async function runSystemMigrations(fromVersion, toVersion) {
  console.log(`URoP | Migration gestartet: ${fromVersion} -> ${toVersion}`);

  const createEmptyProtectionOverride = () => ({
    damageType: "",
    value: 0
  });

  const migrateSizeAndRangeFields = async () => {
    for (const actor of game.actors) {
      if (actor.type !== "character") continue;

      const actorUpdates = {};
      if (!foundry.utils.hasProperty(actor, "system.sizeClass")) {
        actorUpdates["system.sizeClass"] = "G3";
      }
      if (!foundry.utils.hasProperty(actor, "system.settings.consequenceSlots.light")) {
        actorUpdates["system.settings.consequenceSlots.light"] = 3;
      }
      if (!foundry.utils.hasProperty(actor, "system.settings.consequenceSlots.heavy")) {
        actorUpdates["system.settings.consequenceSlots.heavy"] = 2;
      }
      if (!foundry.utils.hasProperty(actor, "system.settings.consequenceSlots.critical")) {
        actorUpdates["system.settings.consequenceSlots.critical"] = 1;
      }
      if (!foundry.utils.hasProperty(actor, "system.settings.combatDisplay.showCombatSkills")) {
        actorUpdates["system.settings.combatDisplay.showCombatSkills"] = true;
      }
      if (!foundry.utils.hasProperty(actor, "system.settings.combatDisplay.showWeapons")) {
        actorUpdates["system.settings.combatDisplay.showWeapons"] = true;
      }
      if (!foundry.utils.hasProperty(actor, "system.settings.combatDisplay.showArmor")) {
        actorUpdates["system.settings.combatDisplay.showArmor"] = true;
      }

      if (Object.keys(actorUpdates).length > 0) {
        await actor.update(actorUpdates);
      }

      for (const item of actor.items) {
        const itemUpdates = {};

        if (item.type === "weapon") {
          if (!foundry.utils.hasProperty(item, "system.damageType")) itemUpdates["system.damageType"] = "";
          if (!foundry.utils.hasProperty(item, "system.initiativeModifier")) itemUpdates["system.initiativeModifier"] = 0;
          if (!foundry.utils.hasProperty(item, "system.prerequisitesText")) itemUpdates["system.prerequisitesText"] = "";
          if (!foundry.utils.hasProperty(item, "system.designedForSizeClass")) itemUpdates["system.designedForSizeClass"] = "G3";
          if (!foundry.utils.hasProperty(item, "system.effectiveAgainstClass")) itemUpdates["system.effectiveAgainstClass"] = "G3";
          if (!foundry.utils.hasProperty(item, "system.rangeBands.nah")) itemUpdates["system.rangeBands.nah"] = 0;
          if (!foundry.utils.hasProperty(item, "system.rangeBands.mittel")) itemUpdates["system.rangeBands.mittel"] = 0;
          if (!foundry.utils.hasProperty(item, "system.rangeBands.weit")) itemUpdates["system.rangeBands.weit"] = 0;
          if (!foundry.utils.hasProperty(item, "system.rangeBands.extrem")) itemUpdates["system.rangeBands.extrem"] = 0;
        }

        if (item.type === "armor") {
          if (!foundry.utils.hasProperty(item, "system.price")) itemUpdates["system.price"] = 0;
          if (!foundry.utils.hasProperty(item, "system.prerequisitesText")) itemUpdates["system.prerequisitesText"] = "";
          if (!foundry.utils.hasProperty(item, "system.userSizeNominal")) itemUpdates["system.userSizeNominal"] = "G3";
          const protectionByDamageType = item.system?.protectionByDamageType;
          if (!Array.isArray(protectionByDamageType) || protectionByDamageType.length === 0) {
            itemUpdates["system.protectionByDamageType"] = [createEmptyProtectionOverride()];
          }
        }

        if (item.type === "cyberware") {
          if (!foundry.utils.hasProperty(item, "system.tier")) itemUpdates["system.tier"] = "T0";
          if (!foundry.utils.hasProperty(item, "system.activationType")) itemUpdates["system.activationType"] = "passive";
          if (!foundry.utils.hasProperty(item, "system.hasModSlots")) itemUpdates["system.hasModSlots"] = false;
          if (!foundry.utils.hasProperty(item, "system.price")) itemUpdates["system.price"] = 0;
          if (!foundry.utils.hasProperty(item, "system.availabilityLegality")) itemUpdates["system.availabilityLegality"] = "";
          if (!foundry.utils.hasProperty(item, "system.prerequisitesText")) itemUpdates["system.prerequisitesText"] = "";
          if (!foundry.utils.hasProperty(item, "system.description")) itemUpdates["system.description"] = "";
          if (!foundry.utils.hasProperty(item, "system.specificEffectDescription")) itemUpdates["system.specificEffectDescription"] = "";
          if (!foundry.utils.hasProperty(item, "system.installationProfile")) itemUpdates["system.installationProfile"] = "";
          if (!foundry.utils.hasProperty(item, "system.operationProfile")) itemUpdates["system.operationProfile"] = "";
          if (!foundry.utils.hasProperty(item, "system.sideEffects")) itemUpdates["system.sideEffects"] = "";
        }

        if (item.type === "quickhack") {
          if (!foundry.utils.hasProperty(item, "system.hackClass")) itemUpdates["system.hackClass"] = "info";
          if (!foundry.utils.hasProperty(item, "system.actionCost")) itemUpdates["system.actionCost"] = "action";
          if (!foundry.utils.hasProperty(item, "system.usageWindow")) itemUpdates["system.usageWindow"] = "once_per_scene";
          if (!foundry.utils.hasProperty(item, "system.reuseEscalationProfile")) itemUpdates["system.reuseEscalationProfile"] = "none";
          if (!foundry.utils.hasProperty(item, "system.availability")) itemUpdates["system.availability"] = "common";
          if (!foundry.utils.hasProperty(item, "system.scope")) itemUpdates["system.scope"] = "single_target";
          if (!foundry.utils.hasProperty(item, "system.sourceTypePrimary")) itemUpdates["system.sourceTypePrimary"] = "os";
          if (!foundry.utils.hasProperty(item, "system.targetTypePrimary")) itemUpdates["system.targetTypePrimary"] = "device";
          if (!foundry.utils.hasProperty(item, "system.accessRoutePrimary")) itemUpdates["system.accessRoutePrimary"] = "open_wireless";
          if (!foundry.utils.hasProperty(item, "system.requirementsText")) itemUpdates["system.requirementsText"] = "";
          if (!foundry.utils.hasProperty(item, "system.riskProfileText")) itemUpdates["system.riskProfileText"] = "";
          if (!foundry.utils.hasProperty(item, "system.typicalEffectsText")) itemUpdates["system.typicalEffectsText"] = "";
          if (!foundry.utils.hasProperty(item, "system.learnCostEp")) itemUpdates["system.learnCostEp"] = 0;
        }

        if (Object.keys(itemUpdates).length > 0) {
          await item.update(itemUpdates);
        }
      }
    }

    for (const item of game.items) {
      const itemUpdates = {};

      if (item.type === "weapon") {
        if (!foundry.utils.hasProperty(item, "system.damageType")) itemUpdates["system.damageType"] = "";
        if (!foundry.utils.hasProperty(item, "system.initiativeModifier")) itemUpdates["system.initiativeModifier"] = 0;
        if (!foundry.utils.hasProperty(item, "system.prerequisitesText")) itemUpdates["system.prerequisitesText"] = "";
        if (!foundry.utils.hasProperty(item, "system.designedForSizeClass")) itemUpdates["system.designedForSizeClass"] = "G3";
        if (!foundry.utils.hasProperty(item, "system.effectiveAgainstClass")) itemUpdates["system.effectiveAgainstClass"] = "G3";
        if (!foundry.utils.hasProperty(item, "system.rangeBands.nah")) itemUpdates["system.rangeBands.nah"] = 0;
        if (!foundry.utils.hasProperty(item, "system.rangeBands.mittel")) itemUpdates["system.rangeBands.mittel"] = 0;
        if (!foundry.utils.hasProperty(item, "system.rangeBands.weit")) itemUpdates["system.rangeBands.weit"] = 0;
        if (!foundry.utils.hasProperty(item, "system.rangeBands.extrem")) itemUpdates["system.rangeBands.extrem"] = 0;
      }

      if (item.type === "armor") {
        if (!foundry.utils.hasProperty(item, "system.price")) itemUpdates["system.price"] = 0;
        if (!foundry.utils.hasProperty(item, "system.prerequisitesText")) itemUpdates["system.prerequisitesText"] = "";
        if (!foundry.utils.hasProperty(item, "system.userSizeNominal")) itemUpdates["system.userSizeNominal"] = "G3";
        const protectionByDamageType = item.system?.protectionByDamageType;
        if (!Array.isArray(protectionByDamageType) || protectionByDamageType.length === 0) {
          itemUpdates["system.protectionByDamageType"] = [createEmptyProtectionOverride()];
        }
      }

      if (item.type === "cyberware") {
        if (!foundry.utils.hasProperty(item, "system.tier")) itemUpdates["system.tier"] = "T0";
        if (!foundry.utils.hasProperty(item, "system.activationType")) itemUpdates["system.activationType"] = "passive";
        if (!foundry.utils.hasProperty(item, "system.hasModSlots")) itemUpdates["system.hasModSlots"] = false;
        if (!foundry.utils.hasProperty(item, "system.price")) itemUpdates["system.price"] = 0;
        if (!foundry.utils.hasProperty(item, "system.availabilityLegality")) itemUpdates["system.availabilityLegality"] = "";
        if (!foundry.utils.hasProperty(item, "system.prerequisitesText")) itemUpdates["system.prerequisitesText"] = "";
        if (!foundry.utils.hasProperty(item, "system.description")) itemUpdates["system.description"] = "";
        if (!foundry.utils.hasProperty(item, "system.specificEffectDescription")) itemUpdates["system.specificEffectDescription"] = "";
        if (!foundry.utils.hasProperty(item, "system.installationProfile")) itemUpdates["system.installationProfile"] = "";
        if (!foundry.utils.hasProperty(item, "system.operationProfile")) itemUpdates["system.operationProfile"] = "";
        if (!foundry.utils.hasProperty(item, "system.sideEffects")) itemUpdates["system.sideEffects"] = "";
      }

      if (item.type === "quickhack") {
        if (!foundry.utils.hasProperty(item, "system.hackClass")) itemUpdates["system.hackClass"] = "info";
        if (!foundry.utils.hasProperty(item, "system.actionCost")) itemUpdates["system.actionCost"] = "action";
        if (!foundry.utils.hasProperty(item, "system.usageWindow")) itemUpdates["system.usageWindow"] = "once_per_scene";
        if (!foundry.utils.hasProperty(item, "system.reuseEscalationProfile")) itemUpdates["system.reuseEscalationProfile"] = "none";
        if (!foundry.utils.hasProperty(item, "system.availability")) itemUpdates["system.availability"] = "common";
        if (!foundry.utils.hasProperty(item, "system.scope")) itemUpdates["system.scope"] = "single_target";
        if (!foundry.utils.hasProperty(item, "system.sourceTypePrimary")) itemUpdates["system.sourceTypePrimary"] = "os";
        if (!foundry.utils.hasProperty(item, "system.targetTypePrimary")) itemUpdates["system.targetTypePrimary"] = "device";
        if (!foundry.utils.hasProperty(item, "system.accessRoutePrimary")) itemUpdates["system.accessRoutePrimary"] = "open_wireless";
        if (!foundry.utils.hasProperty(item, "system.requirementsText")) itemUpdates["system.requirementsText"] = "";
        if (!foundry.utils.hasProperty(item, "system.riskProfileText")) itemUpdates["system.riskProfileText"] = "";
        if (!foundry.utils.hasProperty(item, "system.typicalEffectsText")) itemUpdates["system.typicalEffectsText"] = "";
        if (!foundry.utils.hasProperty(item, "system.learnCostEp")) itemUpdates["system.learnCostEp"] = 0;
      }

      if (Object.keys(itemUpdates).length > 0) {
        await item.update(itemUpdates);
      }
    }
  };

  const migratePreparedFinisherWindow = async () => {
    const migrateItem = async (item) => {
      if (item.type !== "maneuver") return;
      if (item.system?.usageWindow !== "once_per_scene") return;
      if (!/^Finisher/i.test(item.name ?? "")) return;
      await item.update({ "system.usageWindow": "prepared" });
    };

    for (const actor of game.actors) {
      for (const item of actor.items) {
        await migrateItem(item);
      }
    }

    for (const item of game.items) {
      await migrateItem(item);
    }
  };

  const steps = [migrateSizeAndRangeFields, migratePreparedFinisherWindow];

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
  Items.registerSheet("urop", UropCyberwareSheet,  { types: ["cyberware"],   makeDefault: true, label: "URoP.Sheet.Cyberware" });
  Items.registerSheet("urop", UropQuickhackSheet,  { types: ["quickhack"],   makeDefault: true, label: "URoP.Sheet.Quickhack" });
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
