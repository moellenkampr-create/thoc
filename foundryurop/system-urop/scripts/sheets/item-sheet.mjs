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
          initial: "effects"
        }
      ]
    });
  }

  getData(options) {
    const data = super.getData(options);
    data.itemTypeLabel = game.i18n.localize(`URoP.ItemType.${this.item.type}`);
    data.isGear = this.item.type === "gear";
    data.isConsumable = this.item.type === "consumable";
    data.isWeapon = this.item.type === "weapon";
    data.isArmor = this.item.type === "armor";
    data.isManeuver = this.item.type === "maneuver";
    data.isSkill = this.item.type === "skill";
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    const levelInput = html.find('.skill-level-input');
    const lockBtn = html.find('[data-action="toggle-skill-level-lock"]');
    const decrementBtn = html.find('[data-action="skill-level-decrement"]');
    const incrementBtn = html.find('[data-action="skill-level-increment"]');

    // Start locked
    levelInput.prop('readonly', true);
    decrementBtn.prop('disabled', true);
    incrementBtn.prop('disabled', true);

    lockBtn.on('click', (ev) => {
      ev.preventDefault();
      const isLocked = levelInput.prop('readonly');
      levelInput.prop('readonly', !isLocked);
      decrementBtn.prop('disabled', !isLocked);
      incrementBtn.prop('disabled', !isLocked);
      lockBtn.text(isLocked ? '\uD83D\uDD13' : '\uD83D\uDD12');
      lockBtn.toggleClass('unlocked', isLocked);
    });

    decrementBtn.on('click', async (ev) => {
      ev.preventDefault();
      if (levelInput.prop('readonly')) return;
      const current = parseInt(levelInput.val()) || 1;
      const next = Math.max(0, current - 1);
      levelInput.val(next);
      await this.item.update({ 'system.level': next });
    });

    incrementBtn.on('click', async (ev) => {
      ev.preventDefault();
      if (levelInput.prop('readonly')) return;
      const current = parseInt(levelInput.val()) || 1;
      const next = current + 1;
      levelInput.val(next);
      await this.item.update({ 'system.level': next });
    });
  }
}
