import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet für Manöver (maneuver). */
export class UropManeuverSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/maneuver-sheet.hbs"
    });
  }
}
