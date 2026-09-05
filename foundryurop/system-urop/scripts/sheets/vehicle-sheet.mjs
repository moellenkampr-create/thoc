export class UropVehicleSheet extends ActorSheet {
  static CONSEQUENCE_TYPES = ["light", "heavy", "critical"];
  static DEFAULT_CONSEQUENCE_SLOTS = { light: 3, heavy: 2, critical: 1 };
  static MAX_CONSEQUENCE_SLOTS = 12;

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["urop", "sheet", "actor", "vehicle"],
      template: "systems/urop/templates/actors/vehicle-sheet.hbs",
      width: 960,
      height: 760,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }],
      scrollY: [".sheet-body"]
    });
  }

  getData(options) {
    const data = super.getData(options);
    const allItems = Array.from(this.actor.items.values()).map((item) => item.toObject());
    const slotConfig = this._slotConfig(this.actor.system.settings?.consequenceSlots);
    const sections = this._sections(this.actor.system.settings?.sections);

    data.sections = sections;
    data.isGM = Boolean(game.user?.isGM);
    if (!data.isGM && data.actor?.system?.notes) data.actor.system.notes.gm = "";
    data.consequenceFields = this._consequenceFields(this.actor.system.consequences, slotConfig);
    data.itemGroups = {
      module: allItems.filter((item) => item.type === "vehicle_module"),
      weapon: allItems.filter((item) => item.type === "weapon"),
      armor: allItems.filter((item) => item.type === "armor"),
      gear: allItems.filter((item) => item.type === "gear"),
      consumable: allItems.filter((item) => item.type === "consumable")
    };
    data.sectionGroups = sections.map((section) => ({
      ...section,
      modules: data.itemGroups.module.filter((item) => item.system?.sectionId === section.id),
      weapons: data.itemGroups.weapon.filter((item) => item.system?.sectionId === section.id),
      armor: data.itemGroups.armor.filter((item) => item.system?.sectionId === section.id)
    }));
    data.unassignedItems = {
      modules: data.itemGroups.module.filter((item) => !sections.some((section) => section.id === item.system?.sectionId)),
      weapons: data.itemGroups.weapon.filter((item) => !sections.some((section) => section.id === item.system?.sectionId)),
      armor: data.itemGroups.armor.filter((item) => !sections.some((section) => section.id === item.system?.sectionId))
    };
    return data;
  }

  _boundedInteger(value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.min(max, Math.max(min, Math.trunc(numeric)));
  }

  _slotConfig(config = {}) {
    const defaults = UropVehicleSheet.DEFAULT_CONSEQUENCE_SLOTS;
    return Object.fromEntries(UropVehicleSheet.CONSEQUENCE_TYPES.map((type) => [
      type,
      this._boundedInteger(config?.[type], defaults[type], 0, UropVehicleSheet.MAX_CONSEQUENCE_SLOTS)
    ]));
  }

  _sections(sections = []) {
    const list = Array.isArray(sections) ? sections : [];
    const normalized = list.map((section, index) => ({
      id: String(section?.id || `section_${index + 1}`).replace(/[^A-Za-z0-9_-]/g, "_") || `section_${index + 1}`,
      name: String(section?.name || `Sektion ${index + 1}`),
      notes: String(section?.notes || "")
    }));
    return normalized.length > 0 ? normalized : [{ id: "main", name: "Hauptsektion", notes: "" }];
  }

  _consequenceFields(consequences = {}, slotConfig) {
    return Object.fromEntries(UropVehicleSheet.CONSEQUENCE_TYPES.map((type) => [
      type,
      Array.from({ length: slotConfig[type] }, (_, index) => ({ index, value: String(consequences?.[type]?.[index] || "") }))
    ]));
  }

  _sectionsFromFormData(formData = {}) {
    const sectionFields = new Map();

    for (const [path, value] of Object.entries(formData)) {
      const match = /^system\.settings\.sections\.(\d+)\.(id|name|notes)$/.exec(path);
      if (!match) continue;
      const index = Number(match[1]);
      if (!sectionFields.has(index)) sectionFields.set(index, {});
      sectionFields.get(index)[match[2]] = value;
    }

    if (sectionFields.size === 0) return this._sections(this.actor.system.settings?.sections);
    return this._sections(Array.from(sectionFields.entries())
      .sort(([left], [right]) => left - right)
      .map(([, section]) => section));
  }

  _consequencesFromFormData(formData = {}, slotConfig) {
    const consequences = {};
    for (const type of UropVehicleSheet.CONSEQUENCE_TYPES) {
      consequences[type] = Array.from({ length: slotConfig[type] }, (_, index) =>
        String(formData[`system.consequences.${type}.${index}`] ?? "")
      );
    }
    return consequences;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('[data-action="open-item"]').on("click", this._onOpenItem.bind(this));
    html.find('[data-action="create-item"]').on("click", this._onCreateItem.bind(this));
    html.find('[data-action="open-item"]').on("contextmenu", this._onDeleteItem.bind(this));
    html.find('[data-action="add-section"]').on("click", this._onAddSection.bind(this));
    html.find('[data-action="remove-section"]').on("click", this._onRemoveSection.bind(this));
  }

  async _saveForm(event) {
    const formData = this._getSubmitData();
    await this._updateObject(event, formData);
  }

  async _onOpenItem(event) {
    event.preventDefault();
    const item = this.actor.items.get(event.currentTarget.dataset.itemId);
    if (item) item.sheet.render(true);
  }

  async _onCreateItem(event) {
    event.preventDefault();
    await this._saveForm(event);
    const type = event.currentTarget.dataset.itemType;
    await this.actor.createEmbeddedDocuments("Item", [{ name: `Neues ${type}`, type }]);
  }

  async _onDeleteItem(event) {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    if (!itemId) return;
    await this._saveForm(event);
    const confirmed = await Dialog.confirm({ title: "Eintrag entfernen", content: "<p>Eintrag wirklich entfernen?</p>" });
    if (confirmed) await this.actor.deleteEmbeddedDocuments("Item", [itemId]);
  }

  async _onAddSection(event) {
    event.preventDefault();
    const sections = this._sectionsFromFormData(this._getSubmitData());
    let nextNumber = sections.length + 1;
    while (sections.some((section) => section.id === `section_${nextNumber}`)) nextNumber += 1;
    sections.push({ id: `section_${nextNumber}`, name: `Sektion ${nextNumber}`, notes: "" });
    await this.actor.update({ "system.settings.sections": sections });
  }

  async _onRemoveSection(event) {
    event.preventDefault();
    const index = Number(event.currentTarget.dataset.index);
    const sections = this._sectionsFromFormData(this._getSubmitData());
    if (sections.length <= 1 || !Number.isInteger(index)) return;
    sections.splice(index, 1);
    await this.actor.update({ "system.settings.sections": sections });
  }

  async _updateObject(event, formData) {
    const updateData = { ...formData };
    const slotConfig = this._slotConfig({
      light: formData["system.settings.consequenceSlots.light"] ?? this.actor.system.settings?.consequenceSlots?.light,
      heavy: formData["system.settings.consequenceSlots.heavy"] ?? this.actor.system.settings?.consequenceSlots?.heavy,
      critical: formData["system.settings.consequenceSlots.critical"] ?? this.actor.system.settings?.consequenceSlots?.critical
    });

    for (const key of Object.keys(updateData)) {
      if (key.startsWith("system.settings.sections.")
        || key.startsWith("system.settings.consequenceSlots.")
        || key.startsWith("system.consequences.")) delete updateData[key];
    }

    updateData["system.settings.sections"] = this._sectionsFromFormData(formData);
    updateData["system.settings.consequenceSlots"] = slotConfig;
    updateData["system.consequences"] = this._consequencesFromFormData(formData, slotConfig);
    await this.actor.update(updateData);
  }
}
