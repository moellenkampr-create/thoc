import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet für allgemeine Ausrüstung (gear). */
export class UropGearSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/gear-sheet.hbs"
    });
  }
}
