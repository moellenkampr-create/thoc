import { UropItemSheetBase } from "./item-sheet-base.mjs";

/**
 * Sheet für Fertigkeiten (skill).
 * Beinhaltet den Stufe-Stepper mit Sperr-Funktion.
 */
export class UropSkillSheet extends UropItemSheetBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/urop/templates/items/skill-sheet.hbs"
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    const levelInput = html.find('.skill-level-input');
    const lockBtn = html.find('[data-action="toggle-skill-level-lock"]');
    const decrementBtn = html.find('[data-action="skill-level-decrement"]');
    const incrementBtn = html.find('[data-action="skill-level-increment"]');

    // Standardmäßig gesperrt
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
