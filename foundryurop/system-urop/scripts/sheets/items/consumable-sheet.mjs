import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet für Verbrauchsgegenstände (consumable). */
export class UropConsumableSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/consumable-sheet.hbs"
    });
  }
}
