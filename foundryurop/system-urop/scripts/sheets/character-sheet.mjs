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
      weapon: allItems.filter((i) => i.type === "weapon"),
      armor: allItems.filter((i) => i.type === "armor"),
      maneuver: allItems.filter((i) => i.type === "maneuver")
    };

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

  _attributeCost(value) {
    const numeric = Number(value || 0);

    if (numeric <= 2) return 0;

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

  async _onRollUrop(event) {
    event.preventDefault();

    const label = event.currentTarget.dataset.label || game.i18n.localize("URoP.Roll.Generic");
    const roll = await new Roll("3d6", {}).evaluate();
    const outcome = this._getProbeOutcome(roll.total);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="urop-roll-text"><h3>${label}</h3><p><strong>${outcome.title}</strong></p><p>${outcome.text}</p></div>`
    });
  }

  _getProbeOutcome(total) {
    if (total <= 5) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.CritSuccessTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.CritSuccessText")
      };
    }

    if (total <= 8) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.StrongSuccessTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.StrongSuccessText")
      };
    }

    if (total <= 11) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.SuccessTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.SuccessText")
      };
    }

    if (total <= 14) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.MixedTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.MixedText")
      };
    }

    if (total <= 17) {
      return {
        title: game.i18n.localize("URoP.Roll.Outcome.FailureTitle"),
        text: game.i18n.localize("URoP.Roll.Outcome.FailureText")
      };
    }

    return {
      title: game.i18n.localize("URoP.Roll.Outcome.CritFailureTitle"),
      text: game.i18n.localize("URoP.Roll.Outcome.CritFailureText")
    };
  }

  _calculateSpentEp() {
    const attributes = Object.entries(this.actor.system.attributes || {}).reduce((sum, [attrKey, entry]) => {
      const baseCost = this._attributeCost(entry?.value || 0);
      const modifier = this._focusModifierForAttribute(attrKey);
      return sum + this._applyFocusModifier(baseCost, modifier);
    }, 0);

    const facets = Object.entries(this.actor.system.facets || {}).reduce((sum, [facetKey, value]) => {
      const attrKey = UropCharacterSheet.FACET_TO_ATTRIBUTE[facetKey];
      const baseCost = Number(value || 0) * 40;
      const modifier = this._focusModifierForAttribute(attrKey);
      return sum + this._applyFocusModifier(baseCost, modifier);
    }, 0);
    const skills = Object.values(this.actor.system.skills || {}).reduce(
      (sum, value) => sum + Number(value || 0),
      0
    );
    const maneuverEp = Array.from(this.actor.items.values())
      .filter((item) => item.type === "maneuver")
      .reduce((sum, item) => sum + Number(item.system?.learnCostEp || 0), 0);

    return Math.max(0, attributes + facets + skills + maneuverEp);
  }

  async _onRecalculateEp(event) {
    event.preventDefault();

    const epSpent = this._calculateSpentEp();
    await this.actor.update({ "system.resources.epSpent": epSpent });

    ui.notifications.info(game.i18n.format("URoP.Notification.EPSpentUpdated", { value: epSpent }));
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
  }

  async _onToggleFocusLock(event) {
    event.preventDefault();
    const isFocusLocked = this.actor.system.meta?.focus?.selectionLocked !== false;
    await this.actor.update({ "system.meta.focus.selectionLocked": !isFocusLocked });
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
