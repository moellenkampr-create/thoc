export const ATTRIBUTE_TO_LEAD_ATTRIBUTE = {
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

export function toFiniteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

export function getLeadAttributeGroups() {
  return {
    koerper: ["staerke", "grobmotorik", "feinmotorik", "konstitution"],
    geist: ["analyse", "willenskraft", "aufmerksamkeit", "intuition"],
    praesenz: ["ausdruck", "empathie", "dominanz", "resonanz"]
  };
}

export function readAttributeBaseValue(attributeValues = {}, attributeKey) {
  const raw = attributeValues?.[attributeKey];
  if (raw && typeof raw === "object") {
    return toFiniteNumber(raw.value);
  }

  return toFiniteNumber(raw);
}

export function readModifierValue(modifierEntry = {}, key) {
  return toFiniteNumber(modifierEntry?.[key]);
}

export function applyModifierPair(value, modifierEntry = {}) {
  return toFiniteNumber(value) + readModifierValue(modifierEntry, "bonus") - readModifierValue(modifierEntry, "malus");
}

export function buildDerivedLeadAttributes(attributeValues = {}, attributeModifiers = {}) {
  const derived = {};
  const groups = getLeadAttributeGroups();

  for (const [leadAttributeKey, attributeKeys] of Object.entries(groups)) {
    const sum = attributeKeys.reduce(
      (total, attributeKey) => {
        const baseValue = readAttributeBaseValue(attributeValues, attributeKey);
        const modifiedValue = applyModifierPair(baseValue, attributeModifiers?.[attributeKey]);
        return total + modifiedValue;
      },
      0
    );
    derived[leadAttributeKey] = sum / attributeKeys.length;
  }

  return derived;
}

export function buildLeadAttributeValues(derivedLeadAttributes = {}, leadAttributeModifiers = {}) {
  return {
    koerper: applyModifierPair(toFiniteNumber(derivedLeadAttributes?.koerper), leadAttributeModifiers?.koerper),
    geist: applyModifierPair(toFiniteNumber(derivedLeadAttributes?.geist), leadAttributeModifiers?.geist),
    praesenz: applyModifierPair(toFiniteNumber(derivedLeadAttributes?.praesenz), leadAttributeModifiers?.praesenz)
  };
}

export function roundCommercial(value) {
  const numeric = toFiniteNumber(value, 0);
  if (numeric >= 0) return Math.floor(numeric + 0.5);
  return Math.ceil(numeric - 0.5);
}

export function buildResistanceValues(derivedLeadAttributes = {}) {
  return {
    koerper: roundCommercial(toFiniteNumber(derivedLeadAttributes?.koerper)),
    geist: roundCommercial(toFiniteNumber(derivedLeadAttributes?.geist)),
    praesenz: roundCommercial(toFiniteNumber(derivedLeadAttributes?.praesenz))
  };
}

export function buildInitiativeValues(derivedLeadAttributes = {}) {
  return {
    koerper: roundCommercial(toFiniteNumber(derivedLeadAttributes?.koerper)),
    geist: roundCommercial(toFiniteNumber(derivedLeadAttributes?.geist)),
    praesenz: roundCommercial(toFiniteNumber(derivedLeadAttributes?.praesenz))
  };
}

export function focusModifierForAttribute(attributeKey, focusLeadAttributes = []) {
  const leadAttributeKey = ATTRIBUTE_TO_LEAD_ATTRIBUTE[attributeKey];
  const focus = Array.from(focusLeadAttributes || []);

  if (focus.length === 1) {
    return focus.includes(leadAttributeKey) ? -0.2 : 0.1;
  }

  if (focus.length === 2) {
    return focus.includes(leadAttributeKey) ? -0.1 : 0.2;
  }

  return 0;
}

export function applyFocusModifier(cost, modifier) {
  const result = Number(cost || 0) * (1 + Number(modifier || 0));
  return roundCommercial(result);
}

export function isSkillAnchorMatchingFocus(anchorValue, focusLeadAttributes = []) {
  if (!anchorValue) return false;

  const focus = Array.from(focusLeadAttributes || []);
  if (focus.length === 0) return false;

  if (focus.includes(anchorValue)) return true;

  const mappedAttribute = ATTRIBUTE_TO_LEAD_ATTRIBUTE[anchorValue];
  return Boolean(mappedAttribute && focus.includes(mappedAttribute));
}

export function readSkillRuleAnchors(item) {
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

export function resolveLeadAttributeAnchor(anchorValue) {
  if (!anchorValue) return null;
  if (anchorValue === "koerper" || anchorValue === "geist" || anchorValue === "praesenz") return anchorValue;

  const mappedAttribute = ATTRIBUTE_TO_LEAD_ATTRIBUTE[anchorValue];
  return mappedAttribute || null;
}

export function resolveSkillPrimaryAttribute(item) {
  const ruleAnchors = readSkillRuleAnchors(item);
  for (const anchor of ruleAnchors) {
    const attrKey = resolveLeadAttributeAnchor(anchor);
    if (attrKey) return attrKey;
  }

  return resolveLeadAttributeAnchor(item?.system?.attributeAnchor);
}

export function calculateAttributeCost(value) {
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

export function skillFocusModifier(item, focusLeadAttributes = []) {
  const focus = Array.from(focusLeadAttributes || []);
  if (focus.length === 0) return 0;

  const anchors = readSkillRuleAnchors(item);
  const hasMatchingAnchor = anchors.some((anchor) => isSkillAnchorMatchingFocus(anchor, focus));

  if (focus.length === 1) {
    return hasMatchingAnchor ? -0.2 : 0.1;
  }

  if (focus.length === 2) {
    return hasMatchingAnchor ? -0.1 : 0.2;
  }

  return 0;
}

export function skillOverhangCost(item, derivedLeadAttributes = {}) {
  const level = toFiniteNumber(item?.system?.level ?? item?.system?.rank ?? 0);
  const attrKey = resolveSkillPrimaryAttribute(item);
  if (!attrKey) return 0;

  const attrValue = toFiniteNumber(derivedLeadAttributes?.[attrKey] || 0);
  const overhang = level - attrValue;

  if (overhang <= 0) return 0;
  if (overhang === 1) return 30;

  return 90;
}

export function calculateSpentEpBreakdown({
  attributes = {},
  attributeModifiers = {},
  leadAttributeModifiers = {},
  skills = {},
  skillItems = [],
  maneuverItems = [],
  focusLeadAttributes = [],
  readLearnCostEp = (item) => toFiniteNumber(item?.system?.learnCostEp ?? 0)
} = {}) {
  const attributeTotal = Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).reduce((sum, attrKey) => {
    const baseValue = readAttributeBaseValue(attributes, attrKey);
    const baseCost = calculateAttributeCost(baseValue);
    const modifier = focusModifierForAttribute(attrKey, focusLeadAttributes);
    return sum + applyFocusModifier(baseCost, modifier);
  }, 0);

  const derivedLeadAttributes = buildDerivedLeadAttributes(attributes, attributeModifiers);
  const leadAttributeValues = buildLeadAttributeValues(derivedLeadAttributes, leadAttributeModifiers);

  const skillTotal = Object.values(skills).reduce((sum, value) => sum + toFiniteNumber(value || 0), 0);

  const skillItemTotal = skillItems.reduce((sum, item) => {
    const baseCost = readLearnCostEp(item);
    return sum + toFiniteNumber(baseCost);
  }, 0);

  const maneuverEp = maneuverItems.reduce((sum, item) => sum + readLearnCostEp(item), 0);

  return {
    attributes: attributeTotal,
    skills: skillTotal,
    skillItems: skillItemTotal,
    maneuverEp,
    total: Math.max(0, toFiniteNumber(attributeTotal + skillTotal + skillItemTotal + maneuverEp))
  };
}

export function calculateInitiativeBase({
  initiative = {},
  attributeValues = {},
  attributeModifiers = {},
  leadAttributeModifiers = {}
} = {}) {
  const derivedLeadAttributes = buildDerivedLeadAttributes(attributeValues, attributeModifiers);
  const leadAttributeValues = buildLeadAttributeValues(derivedLeadAttributes, leadAttributeModifiers);
  const leadAttributeKey = initiative.leadAttribute;
  return Number(initiative.baseMod || 0) + roundCommercial(toFiniteNumber(leadAttributeValues?.[leadAttributeKey] || 0));
}