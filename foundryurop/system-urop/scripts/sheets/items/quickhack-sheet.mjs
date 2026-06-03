import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet fuer Quickhacks (quickhack). */
export class UropQuickhackSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/quickhack-sheet.hbs"
    });
  }
}
