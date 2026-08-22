import {
  ATTRIBUTE_TO_LEAD_ATTRIBUTE,
  buildDerivedLeadAttributes,
  buildLeadAttributeValues,
  buildInitiativeValues,
  buildResistanceValues,
  buildSkillRollLabel,
  calculateAttributeCost,
  calculateInitiativeBase,
  calculateSpentEpBreakdown,
  formatRuleAnchorLabel,
  readSkillRuleAnchors,
  roundCommercial,
  toFiniteNumber
} from "../urop-calculations.mjs";

export class UropCharacterSheet extends ActorSheet {
  static ATTRIBUTE_TO_LEAD_ATTRIBUTE = ATTRIBUTE_TO_LEAD_ATTRIBUTE;
  static ATTRIBUTE_KEYS = Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE);
  static LEAD_ATTRIBUTE_KEYS = ["koerper", "geist", "praesenz"];
  static MAX_MONEY_STORES = 10;
  static CONSEQUENCE_TYPES = ["light", "heavy", "critical"];
  static DEFAULT_CONSEQUENCE_SLOTS = {
    light: 3,
    heavy: 2,
    critical: 1
  };
  static MAX_CONSEQUENCE_SLOTS = 12;

  static APPLICATION_CLASS_ORDER = {
    combat: 0,
    action: 1,
    fluff: 2
  };

  static SKILL_TYPE_ORDER = {
    broad: 0,
    standard: 1,
    specialization: 2
  };

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["urop", "sheet", "actor", "character"],
      template: "systems/urop/templates/actors/character-sheet.hbs",
      width: 1080,
      height: 840,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "overview"
        }
      ],
      scrollY: [".sheet-body"]
    });
  }

  getData(options) {
    const data = super.getData(options);
    const allItems = Array.from(this.actor.items.values()).map((i) => i.toObject());
    const attributes = this.actor.system.attributes || {};
    const moneyStores = this._normalizeMoneyStores(this.actor.system.resources?.moneyStores || []);
    const focusLeadAttributes = this.actor.system.meta?.focus?.leadAttributes || [];
    const consequenceSlotConfig = this._normalizeConsequenceSlotConfig(this.actor.system.settings?.consequenceSlots || {});
    const combatDisplaySettings = this._normalizeCombatDisplaySettings(this.actor.system.settings?.combatDisplay || {});
    const consequences = this._normalizeConsequences(this.actor.system.consequences || {}, consequenceSlotConfig);

    data.itemGroups = {
      gear: allItems.filter((i) => i.type === "gear"),
      consumable: allItems.filter((i) => i.type === "consumable"),
      weapon: allItems.filter((i) => i.type === "weapon"),
      armor: allItems.filter((i) => i.type === "armor"),
      cyberware: allItems.filter((i) => i.type === "cyberware"),
      quickhack: allItems.filter((i) => i.type === "quickhack"),
      maneuver: allItems.filter((i) => i.type === "maneuver"),
      skill: allItems
        .filter((i) => i.type === "skill")
        .sort((a, b) => {
          const classOrderA = UropCharacterSheet.APPLICATION_CLASS_ORDER[a.system?.applicationClass] ?? 99;
          const classOrderB = UropCharacterSheet.APPLICATION_CLASS_ORDER[b.system?.applicationClass] ?? 99;
          if (classOrderA !== classOrderB) return classOrderA - classOrderB;

          const typeOrderA = UropCharacterSheet.SKILL_TYPE_ORDER[a.system?.type] ?? 99;
          const typeOrderB = UropCharacterSheet.SKILL_TYPE_ORDER[b.system?.type] ?? 99;
          if (typeOrderA !== typeOrderB) return typeOrderA - typeOrderB;

          return String(a.name || "").localeCompare(String(b.name || ""), "de", { sensitivity: "base" });
        })
    };
    data.adaptability = this._toFiniteNumber(this.actor.system.specialAttributes?.adaptability, 6);
    data.attributeGroups = [
      {
        key: "koerper",
        label: "Körper",
        help: "URoP.Attr.KoerperHelp",
        attributes: [
          ["staerke", "Stärke", "URoP.Facet.StaerkeHelp"],
          ["grobmotorik", "Grobmotorik", "URoP.Facet.GrobmotorikHelp"],
          ["feinmotorik", "Feinmotorik", "URoP.Facet.FeinmotorikHelp"],
          ["konstitution", "Konstitution", "URoP.Facet.KonstitutionHelp"]
        ]
      },
      {
        key: "geist",
        label: "Geist",
        help: "URoP.Attr.GeistHelp",
        attributes: [
          ["analyse", "Analyse", "URoP.Facet.AnalyseHelp"],
          ["willenskraft", "Willenskraft", "URoP.Facet.WillenskraftHelp"],
          ["aufmerksamkeit", "Aufmerksamkeit", "URoP.Facet.AufmerksamkeitHelp"],
          ["intuition", "Intuition", "URoP.Facet.IntuitionHelp"]
        ]
      },
      {
        key: "praesenz",
        label: "Präsenz",
        help: "URoP.Attr.PraesenzHelp",
        attributes: [
          ["ausdruck", "Ausdruck", "URoP.Facet.AusdruckHelp"],
          ["empathie", "Empathie", "URoP.Facet.EmpathieHelp"],
          ["dominanz", "Dominanz", "URoP.Facet.DominanzHelp"],
          ["resonanz", "Resonanz", "URoP.Facet.ResonanzHelp"]
        ]
      }
    ];
    data.skillRows = data.itemGroups.skill.map((item) => ({
      ...item,
      rollLabel: buildSkillRollLabel(item),
      ruleAnchorsDisplay: this._formatSkillRuleAnchors(item)
    }));
    data.skillGroups = [
      { key: "combat", label: "Kampffertigkeiten", rows: data.skillRows.filter((item) => item.system?.applicationClass === "combat") },
      { key: "action", label: "Aktionsfertigkeiten", rows: data.skillRows.filter((item) => item.system?.applicationClass === "action") },
      { key: "fluff", label: "Flufffertigkeiten", rows: data.skillRows.filter((item) => item.system?.applicationClass === "fluff") }
    ];
    data.combatSkills = data.itemGroups.skill.filter((i) => i.system?.applicationClass === "combat");

    data.attributeTotals = this._buildAttributeTotals(attributes);
    data.leadAttributeDerived = buildDerivedLeadAttributes(attributes);
    data.leadAttributeValues = buildLeadAttributeValues(data.leadAttributeDerived);
    this.leadAttributeValues = data.leadAttributeValues;
    data.resistanceValues = buildResistanceValues(data.leadAttributeValues);
    data.initiativeValues = buildInitiativeValues(data.leadAttributeValues);
    data.isKoerperFocus = focusLeadAttributes.includes("koerper");
    data.isGeistFocus = focusLeadAttributes.includes("geist");
    data.isPraesenzFocus = focusLeadAttributes.includes("praesenz");
    data.isFocusSelectionLocked = this.actor.system.meta?.focus?.selectionLocked !== false;
    data.moneyStores = moneyStores;
    data.canAddMoneyStore = moneyStores.length < UropCharacterSheet.MAX_MONEY_STORES;
    data.canRemoveMoneyStore = moneyStores.length > 1;
    data.consequenceSlotConfig = consequenceSlotConfig;
    data.combatDisplaySettings = combatDisplaySettings;
    data.consequenceFields = this._buildConsequenceFieldRows(consequences);

    return data;
  }

  _toBoundedInteger(value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.min(max, Math.max(min, Math.trunc(numeric)));
  }

  _toBoolean(value, fallback = false) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (["true", "1", "yes", "on"].includes(normalized)) return true;
      if (["false", "0", "no", "off"].includes(normalized)) return false;
    }

    if (typeof value === "number") return value !== 0;
    return fallback;
  }

  _buildAttributeTotals(attributes = {}) {
    const totals = {};

    for (const key of UropCharacterSheet.ATTRIBUTE_KEYS) {
      const baseValue = this._toFiniteNumber(attributes?.[key], 0);
      totals[key] = baseValue;
    }

    return totals;
  }

  _createEmptyMoneyStore() {
    return {
      label: "",
      contents: "",
      amount: 0
    };
  }

  _normalizeMoneyStores(moneyStores = []) {
    const list = Array.isArray(moneyStores) ? moneyStores : [];
    let normalized = list
      .map((entry) => ({
        label: String(entry?.label ?? "").trim(),
        contents: String(entry?.contents ?? "").trim(),
        amount: this._toFiniteNumber(entry?.amount, 0)
      }))
      .slice(0, UropCharacterSheet.MAX_MONEY_STORES);

    if (
      normalized.length === 1
      && normalized[0].label === "Geldbeutel"
      && normalized[0].contents === "EuroDollar"
      && normalized[0].amount === 0
    ) {
      normalized = [this._createEmptyMoneyStore()];
    }

    if (normalized.length === 0) normalized.push(this._createEmptyMoneyStore());

    return normalized;
  }

  _normalizeConsequenceSlotConfig(slotConfig = {}) {
    const defaults = UropCharacterSheet.DEFAULT_CONSEQUENCE_SLOTS;

    return {
      light: this._toBoundedInteger(slotConfig?.light, defaults.light, 0, UropCharacterSheet.MAX_CONSEQUENCE_SLOTS),
      heavy: this._toBoundedInteger(slotConfig?.heavy, defaults.heavy, 0, UropCharacterSheet.MAX_CONSEQUENCE_SLOTS),
      critical: this._toBoundedInteger(slotConfig?.critical, defaults.critical, 0, UropCharacterSheet.MAX_CONSEQUENCE_SLOTS)
    };
  }

  _normalizeCombatDisplaySettings(displaySettings = {}) {
    return {
      showCombatSkills: this._toBoolean(displaySettings?.showCombatSkills, true),
      showWeapons: this._toBoolean(displaySettings?.showWeapons, true),
      showArmor: this._toBoolean(displaySettings?.showArmor, true)
    };
  }

  _normalizeConsequences(consequences = {}, slotConfig = UropCharacterSheet.DEFAULT_CONSEQUENCE_SLOTS) {
    const normalized = {};

    for (const type of UropCharacterSheet.CONSEQUENCE_TYPES) {
      const rawList = Array.isArray(consequences?.[type]) ? consequences[type] : [];
      const slotCount = this._toBoundedInteger(slotConfig?.[type], UropCharacterSheet.DEFAULT_CONSEQUENCE_SLOTS[type], 0, UropCharacterSheet.MAX_CONSEQUENCE_SLOTS);
      normalized[type] = Array.from({ length: slotCount }, (_, index) => String(rawList[index] ?? ""));
    }

    return normalized;
  }

  _buildConsequenceFieldRows(consequences = {}) {
    const rows = {};

    for (const type of UropCharacterSheet.CONSEQUENCE_TYPES) {
      const values = Array.isArray(consequences?.[type]) ? consequences[type] : [];
      rows[type] = values.map((value, index) => ({ index, value }));
    }

    return rows;
  }

  _collectMoneyStoresFromFormData(formData = {}) {
    const buckets = new Map();

    for (const [path, rawValue] of Object.entries(formData)) {
      const match = /^system\.resources\.moneyStores\.(\d+)\.(label|contents|amount)$/.exec(path);
      if (!match) continue;

      const index = Number(match[1]);
      const field = match[2];
      if (!buckets.has(index)) buckets.set(index, this._createEmptyMoneyStore());

      const row = buckets.get(index);
      if (field === "amount") {
        row.amount = this._toFiniteNumber(rawValue, 0);
      } else {
        row[field] = String(rawValue ?? "");
      }
    }

    const rows = Array.from(buckets.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, row]) => row);

    return this._normalizeMoneyStores(rows);
  }

  _collectConsequencesFromFormData(formData = {}, slotConfig = UropCharacterSheet.DEFAULT_CONSEQUENCE_SLOTS) {
    const normalized = {
      light: Array.from({ length: slotConfig.light }, () => ""),
      heavy: Array.from({ length: slotConfig.heavy }, () => ""),
      critical: Array.from({ length: slotConfig.critical }, () => "")
    };

    for (const [path, rawValue] of Object.entries(formData)) {
      const match = /^system\.consequences\.(light|heavy|critical)\.(\d+)$/.exec(path);
      if (!match) continue;

      const type = match[1];
      const index = Number(match[2]);
      if (!Number.isInteger(index) || index < 0 || index >= normalized[type].length) continue;

      normalized[type][index] = String(rawValue ?? "");
    }

    return normalized;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[data-action="roll-urop"]').on("click", this._onRollUrop.bind(this));
    html.find('[data-action="roll-skill-probe"]').on("click", this._onRollSkillProbe.bind(this));
    html.find('[data-action="roll-initiative"]').on("click", this._onRollInitiative.bind(this));
    html.find('[data-action="recalc-ep"]').on("click", this._onRecalculateEp.bind(this));

    // Stepper buttons
    html.find('[data-action="attr-increment"]').on("click", (ev) => this._onStepValue(ev, 1));
    html.find('[data-action="attr-decrement"]').on("click", (ev) => this._onStepValue(ev, -1));
    html.find('[data-action="facet-increment"]').on("click", (ev) => this._onStepValue(ev, 1));
    html.find('[data-action="facet-decrement"]').on("click", (ev) => this._onStepValue(ev, -1));

    // Lock toggle
    html.find('[data-action="toggle-lock"]').on("click", this._onToggleLock.bind(this));
    html.find('[data-action="toggle-focus-attribute"]').on("change", this._onToggleFocusAttribute.bind(this));
    html.find('[data-action="toggle-focus-lock"]').on("click", this._onToggleFocusLock.bind(this));
    html.find('[data-action="open-item"]').on("click", this._onOpenItem.bind(this));
    html.find('[data-action="create-item"]').on("click", this._onCreateItem.bind(this));
    html.find('[data-action="open-item"]').on("contextmenu", this._onDeleteItemMenu.bind(this));
    html.find('[data-action="add-money-store"]').on("click", this._onAddMoneyStore.bind(this));
    html.find('[data-action="remove-money-store"]').on("click", this._onRemoveMoneyStore.bind(this));

    // Apply initial lock visual state
    this._applyLockState(html);
  }

  _getLeadAttributeGroups() {
    return {
      koerper: ["staerke", "grobmotorik", "feinmotorik", "konstitution"],
      geist: ["analyse", "willenskraft", "aufmerksamkeit", "intuition"],
      praesenz: ["ausdruck", "empathie", "dominanz", "resonanz"]
    };
  }

  _buildDerivedLeadAttributes(attributeValues) {
    return buildDerivedLeadAttributes(attributeValues);
  }

  _getDerivedLeadAttributeValue(attributeKey) {
    return toFiniteNumber(this.leadAttributeDerived?.[attributeKey] ?? 0);
  }

  _buildResistanceValues(derivedLeadAttributes) {
    return buildResistanceValues(derivedLeadAttributes);
  }

  _buildInitiativeValues(derivedLeadAttributes) {
    return buildInitiativeValues(derivedLeadAttributes);
  }

  _toFiniteNumber(value, fallback = 0) {
    return toFiniteNumber(value, fallback);
  }

  _readLearnCostEp(item) {
    return this._toFiniteNumber(item?.system?.learnCostEp ?? 0);
  }

  _readSkillLevel(item) {
    return this._toFiniteNumber(item?.system?.level ?? item?.system?.rank ?? 0);
  }

  _readSkillRuleAnchors(item) {
    const fromRuleAnchors = item?.system?.ruleAnchors;

    const rawAnchors = Array.isArray(fromRuleAnchors)
      ? fromRuleAnchors
      : [];

    const anchors = rawAnchors.filter((anchor) => typeof anchor === "string" && anchor.trim().length > 0);

    const attributeAnchor = item?.system?.attributeAnchor;
    if (typeof attributeAnchor === "string" && attributeAnchor.trim().length > 0) {
      anchors.push(attributeAnchor);
    }

    return anchors;
  }

  _formatSkillRuleAnchors(item) {
    const anchors = this._readSkillRuleAnchors(item);
    if (anchors.length === 0) return "–";
    return anchors.map((anchor) => formatRuleAnchorLabel(anchor)).join(" / ");
  }

  _attributeCost(value) {
    return calculateAttributeCost(value);
  }

  _roundCommercial(value) {
    return roundCommercial(value);
  }

  _calculateSpentEpBreakdown() {
    return calculateSpentEpBreakdown({
      attributes: this.actor.system.attributes || {},
      skillItems: Array.from(this.actor.items.values()).filter((item) => item.type === "skill"),
      maneuverItems: Array.from(this.actor.items.values()).filter((item) => item.type === "maneuver"),
      readLearnCostEp: (item) => this._readLearnCostEp(item)
    });
  }

  async _refreshEpSpent() {
    const breakdown = this._calculateSpentEpBreakdown();
    await this.actor.update({ "system.resources.epSpent": breakdown.total });
  }

  async _onRollUrop(event) {
    event.preventDefault();

    const label = event.currentTarget.dataset.label || game.i18n.localize("URoP.Roll.Generic");
    const roll = await new Roll("3d6", {}).evaluate();
    const outcome = this._getProbeOutcome(roll.total);
    const extremeClass = roll.total === 3 ? "outcome-extreme-low" : roll.total === 18 ? "outcome-extreme-high" : "";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="urop-roll-text ${outcome.toneClass} ${extremeClass}"><h3>${label}</h3><p><strong>${outcome.title}</strong> (${roll.total})</p><p>${outcome.text}</p></div>`
    });
  }

  async _onRollSkillProbe(event) {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const skillName = item.name || game.i18n.localize("URoP.Skill");
    const rollLabel = item.type === "quickhack" ? "Cyberkampfprobe" : buildSkillRollLabel(item);
    const label = `${skillName} · ${rollLabel}`;
    const roll = await new Roll("3d6", {}).evaluate();
    const outcome = this._getProbeOutcome(roll.total);
    const extremeClass = roll.total === 3 ? "outcome-extreme-low" : roll.total === 18 ? "outcome-extreme-high" : "";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="urop-roll-text ${outcome.toneClass} ${extremeClass}"><h3>${label}</h3><p><strong>${outcome.title}</strong> (${roll.total})</p><p>${outcome.text}</p></div>`
    });
  }

  _getProbeOutcome(total) {
    // Banding maps directly to URoP's 3W6 reading (schlecht/schwach/Standard/gut/sehr gut),
    // but labels are phrased relative to the scene's predefined standard outcome.
    if (total <= 5) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.WorseTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.WorseText"),
        toneClass: "outcome-worse"
      };
    }

    if (total <= 8) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.BelowStandardTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.BelowStandardText"),
        toneClass: "outcome-below-standard"
      };
    }

    if (total <= 12) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.StandardTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.StandardText"),
        toneClass: "outcome-standard"
      };
    }

    if (total <= 15) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.AboveStandardTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.AboveStandardText"),
        toneClass: "outcome-above-standard"
      };
    }

    return {
      title: game.i18n.localize("URoP.Roll.Outcome.BetterTitle"),
      text: game.i18n.localize("URoP.Roll.Outcome.BetterText"),
      toneClass: "outcome-better"
    };
  }

  async _onRecalculateEp(event) {
    event.preventDefault();

    const breakdown = this._calculateSpentEpBreakdown();
    await this.actor.update({ "system.resources.epSpent": breakdown.total });

    ui.notifications.info(game.i18n.format("URoP.Notification.EPSpentUpdated", { value: breakdown.total }));
  }

  _applyLockState(html) {
    html.find('[data-action="toggle-lock"]').each((_, btn) => {
      const path = btn.dataset.target;
      const input = html.find(`[name="${path}"]`);
      const isLocked = input.data("locked") !== false;
      const steppers = input.closest(".attr-header, .facet-row").find(".stepper-btn");

      if (isLocked) {
        input.prop("readonly", true);
        $(btn).removeClass("unlocked").text("🔒");
        steppers.prop("disabled", true);
      } else {
        input.prop("readonly", false);
        $(btn).addClass("unlocked").text("🔓");
        steppers.prop("disabled", false);
      }
    });

    const isFocusLocked = this.actor.system.meta?.focus?.selectionLocked !== false;
    html.find('[data-action="toggle-focus-attribute"]').prop("disabled", isFocusLocked);

    const focusLockBtn = html.find('[data-action="toggle-focus-lock"]');
    if (isFocusLocked) {
      focusLockBtn.removeClass("unlocked").text("🔒");
    } else {
      focusLockBtn.addClass("unlocked").text("🔓");
    }
  }

  _onToggleLock(event) {
    event.preventDefault();
    const btn = event.currentTarget;
    const path = btn.dataset.target;
    const html = $(this.element);
    const input = html.find(`[name="${path}"]`);
    const isCurrentlyLocked = input.prop("readonly");
    const steppers = input.closest(".attr-header, .facet-row").find(".stepper-btn");

    if (isCurrentlyLocked) {
      input.prop("readonly", false).data("locked", false);
      $(btn).addClass("unlocked").text("🔓");
      steppers.prop("disabled", false);
    } else {
      input.prop("readonly", true).data("locked", true);
      $(btn).removeClass("unlocked").text("🔒");
      steppers.prop("disabled", true);
    }
  }

  async _onStepValue(event, delta) {
    event.preventDefault();
    const btn = event.currentTarget;
    const path = btn.dataset.path;
    const html = $(this.element);
    const input = html.find(`[name="${path}"]`);

    if (input.prop("readonly")) return;

    const current = Number(input.val()) || 0;
    const next = current + delta;
    input.val(next);
    await this.actor.update({ [path]: next });
    await this._refreshEpSpent();
  }

  async _onToggleFocusAttribute(event) {
    const checkbox = event.currentTarget;
    const attrKey = checkbox.dataset.attribute;
    const isFocusLocked = this.actor.system.meta?.focus?.selectionLocked !== false;

    if (isFocusLocked) {
      checkbox.checked = !checkbox.checked;
      return;
    }

    const current = Array.from(this.actor.system.meta?.focus?.leadAttributes || []);
    const has = current.includes(attrKey);
    const next = has ? current.filter((key) => key !== attrKey) : [...current, attrKey];

    if (next.length > 2) {
      checkbox.checked = false;
      ui.notifications.warn(game.i18n.localize("URoP.Notification.FocusMaxTwo"));
      return;
    }

    await this.actor.update({ "system.meta.focus.leadAttributes": next });
    await this._refreshEpSpent();
  }

  async _onToggleFocusLock(event) {
    event.preventDefault();
    const isFocusLocked = this.actor.system.meta?.focus?.selectionLocked !== false;
    await this.actor.update({ "system.meta.focus.selectionLocked": !isFocusLocked });
  }

  _onOpenItem(event) {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    if (!itemId) return;

    const item = this.actor.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  async _onCreateItem(event) {
    event.preventDefault();

    const type = event.currentTarget.dataset.itemType;
    const allowedTypes = ["skill", "quickhack", "maneuver", "gear", "consumable", "weapon", "armor", "cyberware"];
    if (!allowedTypes.includes(type)) return;

    const labels = {
      skill: "Neue Fertigkeit",
      quickhack: "Neuer Quickhack",
      maneuver: "Neues Manöver",
      gear: "Neue Ausrüstung",
      consumable: "Neuer Verbrauchsgegenstand",
      weapon: "Neue Waffe",
      armor: "Neue Rüstung",
      cyberware: "Neue Cyberware"
    };
    await this._saveFormBeforeItemAction(event);
    const system = type === "skill" && event.currentTarget.dataset.itemApplicationClass
      ? { applicationClass: event.currentTarget.dataset.itemApplicationClass }
      : {};
    const [item] = await this.actor.createEmbeddedDocuments("Item", [{ name: labels[type], type, system }]);
    if (item) item.sheet.render(true);
  }

  async _onDeleteItemMenu(event) {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const confirmed = await Dialog.confirm({
      title: "Item löschen",
      content: `<p>„${item.name}“ wirklich aus diesem Charakter entfernen?</p>`
    });
    if (!confirmed) return;

    await this._saveFormBeforeItemAction(event);
    await this.actor.deleteEmbeddedDocuments("Item", [itemId]);
  }

  async _saveFormBeforeItemAction(event) {
    // Persist pending actor fields before an embedded item operation rerenders the sheet.
    const formData = this._getSubmitData();
    await this._updateObject(event, formData);
  }

  async _onAddMoneyStore(event) {
    event.preventDefault();

    const current = this._normalizeMoneyStores(this.actor.system.resources?.moneyStores || []);
    if (current.length >= UropCharacterSheet.MAX_MONEY_STORES) return;

    current.push(this._createEmptyMoneyStore());
    await this.actor.update({ "system.resources.moneyStores": current });
  }

  async _onRemoveMoneyStore(event) {
    event.preventDefault();

    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;

    const current = this._normalizeMoneyStores(this.actor.system.resources?.moneyStores || []);
    if (current.length <= 1) return;

    const confirmed = await Dialog.confirm({
      title: game.i18n.localize("URoP.Field.ConfirmRemoveMoneyStoreTitle"),
      content: `<p>${game.i18n.localize("URoP.Field.ConfirmRemoveMoneyStorePrompt")}</p>`
    });
    if (!confirmed) return;

    current.splice(index, 1);
    await this.actor.update({ "system.resources.moneyStores": current });
  }

  async _updateObject(event, formData) {
    const updateData = { ...formData };

    const consequenceSlotConfig = this._normalizeConsequenceSlotConfig({
      light: updateData["system.settings.consequenceSlots.light"] ?? this.actor.system.settings?.consequenceSlots?.light,
      heavy: updateData["system.settings.consequenceSlots.heavy"] ?? this.actor.system.settings?.consequenceSlots?.heavy,
      critical: updateData["system.settings.consequenceSlots.critical"] ?? this.actor.system.settings?.consequenceSlots?.critical
    });

    const combatDisplaySettings = this._normalizeCombatDisplaySettings({
      showCombatSkills: updateData["system.settings.combatDisplay.showCombatSkills"] ?? this.actor.system.settings?.combatDisplay?.showCombatSkills,
      showWeapons: updateData["system.settings.combatDisplay.showWeapons"] ?? this.actor.system.settings?.combatDisplay?.showWeapons,
      showArmor: updateData["system.settings.combatDisplay.showArmor"] ?? this.actor.system.settings?.combatDisplay?.showArmor
    });

    for (const key of Object.keys(updateData)) {
      if (key.startsWith("system.resources.moneyStores.")) {
        delete updateData[key];
      }

      if (key.startsWith("system.consequences.")) {
        delete updateData[key];
      }

      if (key.startsWith("system.settings.consequenceSlots.")) {
        delete updateData[key];
      }

      if (key.startsWith("system.settings.combatDisplay.")) {
        delete updateData[key];
      }
    }

    updateData["system.resources.moneyStores"] = this._collectMoneyStoresFromFormData(formData);
    updateData["system.settings.consequenceSlots"] = consequenceSlotConfig;
    updateData["system.settings.combatDisplay"] = combatDisplaySettings;
    updateData["system.consequences"] = this._collectConsequencesFromFormData(formData, consequenceSlotConfig);

    await this.actor.update(updateData);
  }

  async _onRollInitiative(event) {
    event.preventDefault();

    const init = this.actor.system.initiative;
    const base = calculateInitiativeBase({
      initiative: init,
      attributeValues: this.actor.system.attributes || {}
    });
    const target = Number(init.target || 0);
    const situational = Number(init.situational || 0);

    const roll = await new Roll("3d6 + @base + @situational - @target", {
      base,
      situational,
      target
    }).evaluate();

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.localize("URoP.Roll.InitiativeComparison")
    });
  }
}
