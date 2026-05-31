import { UropItemSheetBase } from "./item-sheet-base.mjs";

/** Sheet für Rüstungen (armor). */
export class UropArmorSheet extends UropItemSheetBase {
  static MAX_PROTECTION_OVERRIDES = 20;

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/armor-sheet.hbs"
    });
  }

  getData(options) {
    const data = super.getData(options);
    const list = this._normalizeProtectionByDamageType(this.item.system?.protectionByDamageType || []);
    data.protectionByDamageType = list;
    data.canAddProtectionOverride = list.length < UropArmorSheet.MAX_PROTECTION_OVERRIDES;
    data.canRemoveProtectionOverride = list.length > 1;
    return data;
  }

  _createEmptyProtectionOverride() {
    return {
      damageType: "",
      value: 0
    };
  }

  _normalizeProtectionByDamageType(entries = []) {
    const list = Array.isArray(entries) ? entries : [];
    const normalized = list.map((entry) => ({
      damageType: typeof entry?.damageType === "string" ? entry.damageType : "",
      value: Number.isFinite(Number(entry?.value)) ? Number(entry.value) : 0
    }));

    return normalized.length > 0 ? normalized : [this._createEmptyProtectionOverride()];
  }

  _collectProtectionByDamageTypeFromFormData(formData = {}) {
    const rows = [];

    for (const [path, value] of Object.entries(formData)) {
      const match = /^system\.protectionByDamageType\.(\d+)\.(damageType|value)$/.exec(path);
      if (!match) continue;

      const index = Number(match[1]);
      const field = match[2];
      if (!rows[index]) rows[index] = this._createEmptyProtectionOverride();

      if (field === "damageType") {
        rows[index].damageType = String(value ?? "");
      } else {
        rows[index].value = Number.isFinite(Number(value)) ? Number(value) : 0;
      }
    }

    return this._normalizeProtectionByDamageType(rows);
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[data-action="add-protection-override"]').on("click", this._onAddProtectionOverride.bind(this));
    html.find('[data-action="remove-protection-override"]').on("click", this._onRemoveProtectionOverride.bind(this));
  }

  async _onAddProtectionOverride(event) {
    event.preventDefault();

    const current = this._normalizeProtectionByDamageType(this.item.system?.protectionByDamageType || []);
    if (current.length >= UropArmorSheet.MAX_PROTECTION_OVERRIDES) return;

    current.push(this._createEmptyProtectionOverride());
    await this.item.update({ "system.protectionByDamageType": current });
  }

  async _onRemoveProtectionOverride(event) {
    event.preventDefault();

    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;

    const current = this._normalizeProtectionByDamageType(this.item.system?.protectionByDamageType || []);
    if (current.length <= 1) return;

    const confirmed = await Dialog.confirm({
      title: game.i18n.localize("URoP.Field.ConfirmRemoveProtectionOverrideTitle"),
      content: `<p>${game.i18n.localize("URoP.Field.ConfirmRemoveProtectionOverridePrompt")}</p>`
    });
    if (!confirmed) return;

    current.splice(index, 1);
    await this.item.update({ "system.protectionByDamageType": this._normalizeProtectionByDamageType(current) });
  }

  async _updateObject(event, formData) {
    const updateData = { ...formData };

    for (const key of Object.keys(updateData)) {
      if (key.startsWith("system.protectionByDamageType.")) {
        delete updateData[key];
      }
    }

    updateData["system.protectionByDamageType"] = this._collectProtectionByDamageTypeFromFormData(formData);

    await this.item.update(updateData);
  }
}
