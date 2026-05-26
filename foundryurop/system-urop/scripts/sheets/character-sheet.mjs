export class UropCharacterSheet extends ActorSheet {
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

    data.itemGroups = {
      gear: allItems.filter((i) => i.type === "gear"),
      weapon: allItems.filter((i) => i.type === "weapon"),
      armor: allItems.filter((i) => i.type === "armor"),
      maneuver: allItems.filter((i) => i.type === "maneuver")
    };

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('[data-action="roll-urop"]').on("click", this._onRollUrop.bind(this));
    html.find('[data-action="roll-initiative"]').on("click", this._onRollInitiative.bind(this));
    html.find('[data-action="recalc-ep"]').on("click", this._onRecalculateEp.bind(this));
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
    const attributes = Object.values(this.actor.system.attributes || {}).reduce(
      (sum, entry) => sum + Number(entry?.value || 0),
      0
    );
    const facets = Object.values(this.actor.system.facets || {}).reduce(
      (sum, value) => sum + Number(value || 0),
      0
    );
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
