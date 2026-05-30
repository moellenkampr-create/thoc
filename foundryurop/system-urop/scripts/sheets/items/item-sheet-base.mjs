/**
 * Gemeinsame Basisklasse für alle URoP Item-Sheets.
 * Jede Item-Typ-Klasse erbt von hier und setzt nur noch das eigene Template
 * sowie typ-spezifische Listener.
 */
export class UropItemSheetBase extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["urop", "sheet", "item"],
      width: 720,
      height: 640,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "effects"
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
