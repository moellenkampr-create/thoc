export class UropCharacterSheet extends ActorSheet {
  static FACET_TO_ATTRIBUTE = {
    staerke: "koerper",
    grobmotorik: "koerper",
    feinmotorik: "koerper",
    konstitution: "koerper",
    analyse: "geist",
    willenskraft: "geist",
    aufmerksamkeit: "geist",
    intuition: "geist",
    ausdruck: "praesenz",
    empathie: "praesenz",
    dominanz: "praesenz",
    resonanz: "praesenz"
  };

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
    const facets = this.actor.system.facets || {};
    const focusAttributes = this.actor.system.meta?.focus?.attributes || [];

    data.itemGroups = {
      gear: allItems.filter((i) => i.type === "gear"),
      consumable: allItems.filter((i) => i.type === "consumable"),
      weapon: allItems.filter((i) => i.type === "weapon"),
      armor: allItems.filter((i) => i.type === "armor"),
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
    data.combatSkills = data.itemGroups.skill.filter((i) => i.system?.applicationClass === "combat");

    data.facetTotals = this._buildFacetTotals(attributes, facets);
    data.isKoerperFocus = focusAttributes.includes("koerper");
    data.isGeistFocus = focusAttributes.includes("geist");
    data.isPraesenzFocus = focusAttributes.includes("praesenz");
    data.isFocusSelectionLocked = this.actor.system.meta?.focus?.selectionLocked !== false;

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[data-action="roll-urop"]').on("click", this._onRollUrop.bind(this));
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

    // Apply initial lock visual state
    this._applyLockState(html);
  }

  _buildFacetTotals(attributes, facets) {
    const totals = {};

    for (const [facetKey, attrKey] of Object.entries(UropCharacterSheet.FACET_TO_ATTRIBUTE)) {
      const attrValue = Number(attributes?.[attrKey]?.value || 0);
      const facetDelta = Number(facets?.[facetKey] || 0);
      totals[facetKey] = attrValue + facetDelta;
    }

    return totals;
  }

  _toFiniteNumber(value, fallback = 0) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : fallback;
  }

  _readLearnCostEp(item) {
    return this._toFiniteNumber(item?.system?.learnCostEp ?? item?.system?.learn_cost_ep ?? 0);
  }

  _readSkillLevel(item) {
    return this._toFiniteNumber(item?.system?.level ?? item?.system?.rank ?? 0);
  }

  _readSkillRuleAnchors(item) {
    const fromRuleAnchors = item?.system?.ruleAnchors;
    const fromRuleAnchorsSnake = item?.system?.rule_anchors;

    const rawAnchors = Array.isArray(fromRuleAnchors)
      ? fromRuleAnchors
      : Array.isArray(fromRuleAnchorsSnake)
        ? fromRuleAnchorsSnake
        : [];

    const anchors = rawAnchors.filter((anchor) => typeof anchor === "string" && anchor.trim().length > 0);

    const attributeAnchor = item?.system?.attributeAnchor ?? item?.system?.attribute_anchor;
    if (typeof attributeAnchor === "string" && attributeAnchor.trim().length > 0) {
      anchors.push(attributeAnchor);
    }

    return anchors;
  }

  _attributeCost(value) {
    const rawNumeric = Number(value || 0);
    const numeric = Math.max(0, rawNumeric);

    if (numeric === 2) return 0;
    if (numeric === 1) return -40;
    if (numeric === 0) return -90;

    const table = {
      3: 40,
      4: 90,
      5: 160,
      6: 260
    };

    if (table[numeric] !== undefined) return table[numeric];
    if (numeric > 6) return table[6] + (numeric - 6) * 100;

    return 0;
  }

  _focusModifierForAttribute(attributeKey) {
    const focus = Array.from(this.actor.system.meta?.focus?.attributes || []);

    if (focus.length === 1) {
      return focus.includes(attributeKey) ? -0.2 : 0.1;
    }

    if (focus.length === 2) {
      return focus.includes(attributeKey) ? -0.1 : 0.2;
    }

    return 0;
  }

  _applyFocusModifier(cost, modifier) {
    const result = Number(cost || 0) * (1 + Number(modifier || 0));
    // Rundung zugunsten des Spielers.
    return Math.floor(result);
  }

  _isSkillAnchorMatchingFocus(anchorValue) {
    if (!anchorValue) return false;

    const focus = Array.from(this.actor.system.meta?.focus?.attributes || []);
    if (focus.length === 0) return false;

    if (focus.includes(anchorValue)) return true;

    const mappedAttribute = UropCharacterSheet.FACET_TO_ATTRIBUTE[anchorValue];
    if (mappedAttribute && focus.includes(mappedAttribute)) return true;

    return false;
  }

  _skillFocusModifier(item) {
    const focus = Array.from(this.actor.system.meta?.focus?.attributes || []);
    if (focus.length === 0) return 0;

    const anchors = this._readSkillRuleAnchors(item);

    const hasMatchingAnchor = anchors.some((anchor) => this._isSkillAnchorMatchingFocus(anchor));

    if (focus.length === 1) {
      return hasMatchingAnchor ? -0.2 : 0.1;
    }

    if (focus.length === 2) {
      return hasMatchingAnchor ? -0.1 : 0.2;
    }

    return 0;
  }

  _resolveAnchorAttribute(anchorValue) {
    if (!anchorValue) return null;

    if (this.actor.system.attributes?.[anchorValue]) return anchorValue;

    const mappedAttribute = UropCharacterSheet.FACET_TO_ATTRIBUTE[anchorValue];
    if (mappedAttribute) return mappedAttribute;

    return null;
  }

  _resolveSkillPrimaryAttribute(item) {
    const ruleAnchors = this._readSkillRuleAnchors(item);
    for (const anchor of ruleAnchors) {
      const attrKey = this._resolveAnchorAttribute(anchor);
      if (attrKey) return attrKey;
    }

    return this._resolveAnchorAttribute(item.system?.attributeAnchor ?? item.system?.attribute_anchor);
  }

  _skillOverhangCost(item) {
    const level = this._readSkillLevel(item);
    const attrKey = this._resolveSkillPrimaryAttribute(item);
    if (!attrKey) return 0;

    const attrValue = this._toFiniteNumber(this.actor.system.attributes?.[attrKey]?.value || 0);
    const overhang = level - attrValue;

    if (overhang <= 0) return 0;
    if (overhang === 1) return 30;

    // +2 and above is exception area in rules; EP logic currently applies the highest defined surcharge.
    return 90;
  }

  _calculateSpentEpBreakdown() {
    const attributes = Object.entries(this.actor.system.attributes || {}).reduce((sum, [attrKey, entry]) => {
      const baseCost = this._attributeCost(entry?.value || 0);
      const modifier = this._focusModifierForAttribute(attrKey);
      return sum + this._toFiniteNumber(this._applyFocusModifier(baseCost, modifier));
    }, 0);

    const facets = Object.entries(this.actor.system.facets || {}).reduce((sum, [facetKey, value]) => {
      const attrKey = UropCharacterSheet.FACET_TO_ATTRIBUTE[facetKey];
      const baseCost = this._toFiniteNumber(value || 0) * 40;
      const modifier = this._focusModifierForAttribute(attrKey);
      return sum + this._toFiniteNumber(this._applyFocusModifier(baseCost, modifier));
    }, 0);

    const skills = Object.values(this.actor.system.skills || {}).reduce(
      (sum, value) => sum + this._toFiniteNumber(value || 0),
      0
    );

    const skillItems = Array.from(this.actor.items.values())
      .filter((item) => item.type === "skill")
      .reduce((sum, item) => {
        const baseCost = this._readLearnCostEp(item);
        const modifier = this._skillFocusModifier(item);
        const overhangCost = this._skillOverhangCost(item);
        return sum + this._toFiniteNumber(this._applyFocusModifier(baseCost, modifier)) + this._toFiniteNumber(overhangCost);
      }, 0);

    const maneuverEp = Array.from(this.actor.items.values())
      .filter((item) => item.type === "maneuver")
      .reduce((sum, item) => sum + this._readLearnCostEp(item), 0);

    return {
      attributes,
      facets,
      skills,
      skillItems,
      maneuverEp,
      total: Math.max(0, this._toFiniteNumber(attributes + facets + skills + skillItems + maneuverEp))
    };
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

    const current = Array.from(this.actor.system.meta?.focus?.attributes || []);
    const has = current.includes(attrKey);
    const next = has ? current.filter((key) => key !== attrKey) : [...current, attrKey];

    if (next.length > 2) {
      checkbox.checked = false;
      ui.notifications.warn(game.i18n.localize("URoP.Notification.FocusMaxTwo"));
      return;
    }

    await this.actor.update({ "system.meta.focus.attributes": next });
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

  async _onRollInitiative(event) {
    event.preventDefault();

    const init = this.actor.system.initiative;
    const base = Number(init.baseMod || 0) + Number(this.actor.system.attributes?.[init.anchor]?.value || 0);
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
