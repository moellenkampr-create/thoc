import assert from "node:assert/strict";
import test from "node:test";

import {
  ATTRIBUTE_TO_LEAD_ATTRIBUTE,
  buildDerivedLeadAttributes,
  buildInitiativeValues,
  buildLeadAttributeValues,
  buildResistanceValues,
  calculateAttributeCost,
  calculateInitiativeBase,
  calculateSpentEpBreakdown,
  focusModifierForAttribute,
  resolveLeadAttributeAnchor,
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

test("attribute and lead modifiers are applied to effective lead values", () => {
  const derived = buildDerivedLeadAttributes(
    {
      staerke: 2,
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
    },
    {
      staerke: { bonus: 2, malus: 0 },
      aufmerksamkeit: { bonus: 0, malus: 1 }
    }
  );

  const leadValues = buildLeadAttributeValues(derived, {
    koerper: { bonus: 1, malus: 0 },
    geist: { bonus: 0, malus: 1 }
  });

  assert.equal(derived.koerper, 2.5);
  assert.equal(derived.geist, 1.75);
  assert.equal(leadValues.koerper, 3.5);
  assert.equal(leadValues.geist, 0.75);
});

test("focus modifiers follow the selected lead attributes", () => {
  assert.equal(focusModifierForAttribute("staerke", ["koerper"]), -0.2);
  assert.equal(focusModifierForAttribute("analyse", ["koerper"]), 0.1);
  assert.equal(focusModifierForAttribute("analyse", ["geist", "praesenz"]), -0.1);
  assert.equal(focusModifierForAttribute("staerke", ["geist", "praesenz"]), 0.2);
});

test("attribute cost table matches the active progression", () => {
  assert.equal(calculateAttributeCost(0), -90);
  assert.equal(calculateAttributeCost(1), -40);
  assert.equal(calculateAttributeCost(2), 0);
  assert.equal(calculateAttributeCost(3), 40);
  assert.equal(calculateAttributeCost(4), 90);
  assert.equal(calculateAttributeCost(6), 260);
  assert.equal(calculateAttributeCost(8), 460);
});

test("spent EP breakdown combines attributes, skills, items, and maneuvers", () => {
  const attributes = Object.fromEntries(Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).map((key) => [key, 2]));
  attributes.staerke = 3;
  attributes.analyse = 3;
  attributes.willenskraft = 3;

  const breakdown = calculateSpentEpBreakdown({
    attributes,
    skills: { athletik: 3 },
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
    focusLeadAttributes: ["koerper"]
  });

  assert.equal(breakdown.attributes, 120);
  assert.equal(breakdown.skills, 3);
  assert.equal(breakdown.skillItems, 10);
  assert.equal(breakdown.maneuverEp, 4);
  assert.equal(breakdown.total, 137);
});

test("spent EP uses direct learnCostEp for skill items without focus or overhang modifiers", () => {
  const breakdown = calculateSpentEpBreakdown({
    attributes: Object.fromEntries(Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).map((key) => [key, 2])),
    skillItems: [
      {
        type: "skill",
        system: {
          learnCostEp: 20,
          level: 6,
          ruleAnchors: ["analyse"]
        }
      }
    ],
    focusLeadAttributes: ["koerper"]
  });

  assert.equal(breakdown.skillItems, 20);
});

test("spent EP uses base attribute values, not temporary bonuses or penalties", () => {
  const attributes = Object.fromEntries(Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).map((key) => [key, 2]));
  attributes.staerke = 3;

  const breakdown = calculateSpentEpBreakdown({
    attributes,
    attributeModifiers: {
      staerke: { bonus: 3, malus: 0 },
      konstitution: { bonus: 0, malus: 2 }
    },
    leadAttributeModifiers: {
      koerper: { bonus: 2, malus: 1 }
    }
  });

  assert.equal(breakdown.attributes, 40);
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