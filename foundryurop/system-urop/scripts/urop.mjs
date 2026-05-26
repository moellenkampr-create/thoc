import { UropCharacterSheet } from "./sheets/character-sheet.mjs";
import { UropItemSheet } from "./sheets/item-sheet.mjs";

async function runSystemMigrations(fromVersion, toVersion) {
  console.log(`URoP | Migration gestartet: ${fromVersion} -> ${toVersion}`);

  // Hier spaeter konkrete Migrationsschritte eintragen (Actor/Item Datenpfade etc.).
  const steps = [];

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
  Items.registerSheet("urop", UropItemSheet, {
    types: ["gear", "weapon", "armor", "maneuver"],
    makeDefault: true,
    label: "URoP.ItemSheet"
  });

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
