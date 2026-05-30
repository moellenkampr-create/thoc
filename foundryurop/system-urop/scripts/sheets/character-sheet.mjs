import {
  ATTRIBUTE_TO_LEAD_ATTRIBUTE,
  applyFocusModifier,
  buildDerivedLeadAttributes,
  buildInitiativeValues,
  buildResistanceValues,
  calculateAttributeCost,
  calculateInitiativeBase,
  calculateSpentEpBreakdown,
  focusModifierForAttribute,
  isSkillAnchorMatchingFocus,
  readSkillRuleAnchors,
  resolveLeadAttributeAnchor,
  skillFocusModifier,
  skillOverhangCost,
  roundCommercial,
  toFiniteNumber
} from "../urop-calculations.mjs";

export class UropCharacterSheet extends ActorSheet {
  static ATTRIBUTE_TO_LEAD_ATTRIBUTE = ATTRIBUTE_TO_LEAD_ATTRIBUTE;

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
    const focusLeadAttributes = this.actor.system.meta?.focus?.leadAttributes || [];

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

    data.leadAttributeDerived = buildDerivedLeadAttributes(attributes);
    this.leadAttributeDerived = data.leadAttributeDerived;
    data.resistanceValues = buildResistanceValues(data.leadAttributeDerived);
    data.initiativeValues = buildInitiativeValues(data.leadAttributeDerived);
    data.isKoerperFocus = focusLeadAttributes.includes("koerper");
    data.isGeistFocus = focusLeadAttributes.includes("geist");
    data.isPraesenzFocus = focusLeadAttributes.includes("praesenz");
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

  _attributeCost(value) {
    return calculateAttributeCost(value);
  }

  _focusModifierForAttribute(attributeKey) {
    return focusModifierForAttribute(attributeKey, this.actor.system.meta?.focus?.leadAttributes || []);
  }

  _roundCommercial(value) {
    return roundCommercial(value);
  }

  _applyFocusModifier(cost, modifier) {
    return applyFocusModifier(cost, modifier);
  }

  _isSkillAnchorMatchingFocus(anchorValue) {
    return isSkillAnchorMatchingFocus(anchorValue, this.actor.system.meta?.focus?.leadAttributes || []);
  }

  _skillFocusModifier(item) {
    return skillFocusModifier(item, this.actor.system.meta?.focus?.leadAttributes || []);
  }

  _resolveAnchorAttribute(anchorValue) {
    return resolveLeadAttributeAnchor(anchorValue);
  }

  _resolveSkillPrimaryAttribute(item) {
    const ruleAnchors = this._readSkillRuleAnchors(item);
    for (const anchor of ruleAnchors) {
      const attrKey = this._resolveAnchorAttribute(anchor);
      if (attrKey) return attrKey;
    }

    return this._resolveAnchorAttribute(item.system?.attributeAnchor);
  }

  _skillOverhangCost(item) {
    const level = this._readSkillLevel(item);
    const attrKey = this._resolveSkillPrimaryAttribute(item);
    if (!attrKey) return 0;

    return skillOverhangCost(item, this.leadAttributeDerived || {});
  }

  _calculateSpentEpBreakdown() {
    return calculateSpentEpBreakdown({
      attributes: this.actor.system.attributes || {},
      skills: this.actor.system.skills || {},
      skillItems: Array.from(this.actor.items.values()).filter((item) => item.type === "skill"),
      maneuverItems: Array.from(this.actor.items.values()).filter((item) => item.type === "maneuver"),
      focusLeadAttributes: this.actor.system.meta?.focus?.leadAttributes || [],
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
