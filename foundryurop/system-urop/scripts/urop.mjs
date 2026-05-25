import { UropCharacterSheet } from "./sheets/character-sheet.mjs";
import { UropItemSheet } from "./sheets/item-sheet.mjs";

Hooks.once("init", () => {
  console.log("URoP | Initialisiere System");

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
