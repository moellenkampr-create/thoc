import { UropItemSheetBase } from "./item-sheet-base.mjs";

export class UropVehicleModuleSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/vehicle-module-sheet.hbs"
    });
  }

  getData(options) {
    const data = super.getData(options);
    const sections = this.item.parent?.system?.settings?.sections;
    data.sectionOptions = Array.isArray(sections) ? sections : [];
    return data;
  }
}
