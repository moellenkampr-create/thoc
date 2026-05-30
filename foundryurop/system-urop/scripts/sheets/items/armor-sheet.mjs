import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet für Rüstungen (armor). */
export class UropArmorSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/armor-sheet.hbs"
    });
  }
}
