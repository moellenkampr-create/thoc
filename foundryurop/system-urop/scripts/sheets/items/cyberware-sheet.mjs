import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet fuer Cyberware-Items (cyberware). */
export class UropCyberwareSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/cyberware-sheet.hbs"
    });
  }
}