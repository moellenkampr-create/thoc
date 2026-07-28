// URoP GM macro: rolls 3d6 and posts the result using the currently active roll mode.
// Works with Foundry roll modes (public, gm, blind, self) and respects Dice Tray mode selection.

(async () => {
  const modeFromChat = ui.chat?.element?.find?.('select[name="rollMode"]')?.val?.();
  const rollMode = modeFromChat || game.settings.get("core", "rollMode") || CONST.DICE_ROLL_MODES.PUBLIC;

  const rollModeLabels = {
    [CONST.DICE_ROLL_MODES.PUBLIC]: "Public",
    [CONST.DICE_ROLL_MODES.PRIVATE]: "GM",
    [CONST.DICE_ROLL_MODES.BLIND]: "Blind",
    [CONST.DICE_ROLL_MODES.SELF]: "Self"
  };
  const rollModeLabel = rollModeLabels[rollMode] || rollMode;

  const speaker = ChatMessage.getSpeaker({ alias: game.user?.name || "GM" });
  const roll = await (new Roll("3d6")).evaluate({ async: true });

  function outcomeFor(total) {
    if (total <= 5) {
      return {
        title: "Schlechter",
        text: "Unter dem gesetzten Standardoutcome; die Lage kippt eher zu Nachteilen.",
        toneClass: "outcome-worse"
      };
    }

    if (total <= 8) {
      return {
        title: "Unter Standard",
        text: "Leicht unter dem gesetzten Standardoutcome; es entsteht meist ein Preis oder Haken.",
        toneClass: "outcome-below-standard"
      };
    }

    if (total <= 12) {
      return {
        title: "Standard",
        text: "Entspricht dem vorab gesetzten Standardoutcome der Szene.",
        toneClass: "outcome-standard"
      };
    }

    if (total <= 15) {
      return {
        title: "Über Standard",
        text: "Über dem gesetzten Standardoutcome; ein klarer Vorteil ist plausibel.",
        toneClass: "outcome-above-standard"
      };
    }

    return {
      title: "Besser",
      text: "Deutlich über dem Standardoutcome; starke positive Wirkung im Rahmen der Szene.",
      toneClass: "outcome-better"
    };
  }

  const outcome = outcomeFor(roll.total);
  const extremeClass = roll.total === 3 ? "outcome-extreme-low" : roll.total === 18 ? "outcome-extreme-high" : "";

  const content = `
    <div class="urop-roll-text ${outcome.toneClass} ${extremeClass}">
      <h3>URoP Probe (GM)</h3>
      <p><strong>${outcome.title}</strong> (${roll.total})</p>
      <p>${outcome.text}</p>
      <p><em>Wurfmodus: ${rollModeLabel}</em></p>
    </div>
  `;

  await roll.toMessage(
    {
      speaker,
      flavor: `URoP Probe (GM) · Modus: ${rollModeLabel}`,
      content
    },
    {
      rollMode
    }
  );
})();
