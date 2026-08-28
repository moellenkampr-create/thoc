import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet fuer Quickhacks (quickhack). */
export class UropQuickhackSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/quickhack-sheet.hbs"
    });
  }

  getData(options) {
    const data = super.getData(options);
    const actor = this.item.parent;
    data.skillOptions = actor?.items
      ? Array.from(actor.items.values())
        .filter((item) => item.type === "skill")
        .sort((left, right) => left.name.localeCompare(right.name, "de", { sensitivity: "base" }))
        .map((item) => item.toObject())
      : [];
    return data;
  }
}
