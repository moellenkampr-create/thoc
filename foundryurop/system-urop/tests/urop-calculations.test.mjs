import assert from "node:assert/strict";
import test from "node:test";

import {
  ATTRIBUTE_TO_LEAD_ATTRIBUTE,
  buildDerivedLeadAttributes,
  buildInitiativeValues,
  buildLeadAttributeValues,
  buildResistanceValues,
  buildSkillRollLabel,
  calculateAttributeCost,
  calculateInitiativeBase,
  calculateSpentEpBreakdown,
  formatRuleAnchorLabel,
  resolveLeadAttributeAnchor,
  skillApplicationClassMultiplier,
  roundCommercial
} from "../scripts/urop-calculations.mjs";

test("commercial rounding rounds halves away from zero", () => {
  assert.equal(roundCommercial(1.4), 1);
  assert.equal(roundCommercial(1.5), 2);
  assert.equal(roundCommercial(-1.4), -1);
  assert.equal(roundCommercial(-1.5), -2);
  assert.equal(roundCommercial(0.5), 1);
  assert.equal(roundCommercial(-0.5), -1);
});

test("lead attributes are averaged from four attributes each", () => {
  const derived = buildDerivedLeadAttributes({
    staerke: 3,
    grobmotorik: 2,
    feinmotorik: 2,
    konstitution: 2,
    analyse: 3,
    willenskraft: 3,
    aufmerksamkeit: 2,
    intuition: 2,
    ausdruck: 4,
    empathie: 2,
    dominanz: 2,
    resonanz: 2
  });

  assert.equal(derived.koerper, 2.25);
  assert.equal(derived.geist, 2.5);
  assert.equal(derived.praesenz, 2.5);
});

test("derived lead values round consistently for resistance and initiative", () => {
  const derived = { koerper: 2.25, geist: 2.5, praesenz: 2.5 };

  assert.deepEqual(buildResistanceValues(derived), { koerper: 2, geist: 3, praesenz: 3 });
  assert.deepEqual(buildInitiativeValues(derived), { koerper: 2, geist: 3, praesenz: 3 });
});

test("lead attributes use only their four natural attributes", () => {
  const derived = buildDerivedLeadAttributes({
    staerke: 3,
    grobmotorik: 2,
    feinmotorik: 2,
    konstitution: 2,
    analyse: 2,
    willenskraft: 2,
    aufmerksamkeit: 2,
    intuition: 2,
    ausdruck: 2,
    empathie: 2,
    dominanz: 2,
    resonanz: 2
  });

  assert.equal(derived.koerper, 2.25);
  assert.equal(derived.geist, 2);
  assert.equal(derived.praesenz, 2);
});

test("attribute cost table matches the active progression", () => {
  assert.equal(calculateAttributeCost(0), -60);
  assert.equal(calculateAttributeCost(1), -30);
  assert.equal(calculateAttributeCost(2), 0);
  assert.equal(calculateAttributeCost(3), 30);
  assert.equal(calculateAttributeCost(4), 60);
  assert.equal(calculateAttributeCost(6), 120);
  assert.equal(calculateAttributeCost(8), 180);
});

test("spent EP breakdown combines attributes, skill items, and maneuvers", () => {
  const attributes = Object.fromEntries(Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).map((key) => [key, 2]));
  attributes.staerke = 3;
  attributes.analyse = 3;
  attributes.willenskraft = 3;

  const breakdown = calculateSpentEpBreakdown({
    attributes,
    skillItems: [
      {
        type: "skill",
        system: {
          learnCostEp: 10,
          level: 2,
          ruleAnchors: ["staerke"]
        }
      }
    ],
    maneuverItems: [
      {
        type: "maneuver",
        system: { learnCostEp: 4 }
      }
    ],
  });

  assert.equal(breakdown.attributes, 90);
  assert.equal(breakdown.skills, 0);
  assert.equal(breakdown.skillItems, 20);
  assert.equal(breakdown.maneuverEp, 4);
  assert.equal(breakdown.total, 114);
});

test("spent EP applies application class multipliers to skill items", () => {
  const breakdown = calculateSpentEpBreakdown({
    attributes: Object.fromEntries(Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).map((key) => [key, 2])),
    skillItems: [
      {
        type: "skill",
        system: {
          learnCostEp: 20,
          applicationClass: "combat",
          level: 6,
          ruleAnchors: ["analyse"]
        }
      },
      {
        type: "skill",
        system: {
          learnCostEp: 20,
          applicationClass: "action",
          level: 2,
          ruleAnchors: ["analyse"]
        }
      },
      {
        type: "skill",
        system: {
          learnCostEp: 20,
          applicationClass: "fluff",
          level: 1,
          ruleAnchors: ["analyse"]
        }
      }
    ],
  });

  assert.equal(breakdown.skillItems, 200);
});

test("application class multipliers resolve to expected factors", () => {
  assert.equal(skillApplicationClassMultiplier("combat"), 1.25);
  assert.equal(skillApplicationClassMultiplier("action"), 1);
  assert.equal(skillApplicationClassMultiplier("fluff"), 0.5);
  assert.equal(skillApplicationClassMultiplier("unknown"), 1);
});

test("spent EP charges 30 per natural attribute step from human baseline 2", () => {
  const attributes = Object.fromEntries(Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).map((key) => [key, 2]));
  attributes.staerke = 3;

  const breakdown = calculateSpentEpBreakdown({
    attributes,
  });

  assert.equal(breakdown.attributes, 30);
});

test("initiative uses the rounded derived lead attribute", () => {
  const base = calculateInitiativeBase({
    initiative: { baseMod: 1, leadAttribute: "geist" },
    attributeValues: {
      analyse: 3,
      willenskraft: 3,
      aufmerksamkeit: 2,
      intuition: 2,
      staerke: 2,
      grobmotorik: 2,
      feinmotorik: 2,
      konstitution: 2,
      ausdruck: 2,
      empathie: 2,
      dominanz: 2,
      resonanz: 2
    }
  });

  assert.equal(base, 4);
});

test("skill roll labels include the skill name and level in a compact format", () => {
  assert.equal(
    buildSkillRollLabel({ name: "Schleichen", system: { level: 4 } }),
    "Probe: Stufe 4"
  );
  assert.equal(
    buildSkillRollLabel({ name: "Handel", system: { level: 1 } }),
    "Probe: Stufe 1"
  );
});

test("rule anchors display readable names in the skill table", () => {
  assert.equal(formatRuleAnchorLabel("koerper"), "Körper");
  assert.equal(formatRuleAnchorLabel("staerke"), "Stärke");
  assert.equal(formatRuleAnchorLabel(""), "–");
});