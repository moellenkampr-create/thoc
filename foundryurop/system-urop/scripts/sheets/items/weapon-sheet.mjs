import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet für Waffen (weapon). */
export class UropWeaponSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/weapon-sheet.hbs"
    });
  }
}
