export class UropItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["urop", "sheet", "item"],
      template: "systems/urop/templates/items/item-sheet.hbs",
      width: 720,
      height: 640,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "details"
        }
      ]
    });
  }

  getData(options) {
    const data = super.getData(options);
    data.itemTypeLabel = game.i18n.localize(`URoP.ItemType.${this.item.type}`);
    return data;
  }
}
