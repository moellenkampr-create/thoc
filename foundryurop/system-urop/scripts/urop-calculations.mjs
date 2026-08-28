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

export const RULE_ANCHOR_LABELS = {
  koerper: "Körper",
  geist: "Geist",
  praesenz: "Präsenz",
  staerke: "Stärke",
  grobmotorik: "Grobmotorik",
  feinmotorik: "Feinmotorik",
  konstitution: "Konstitution",
  analyse: "Analyse",
  willenskraft: "Willenskraft",
  aufmerksamkeit: "Aufmerksamkeit",
  intuition: "Intuition",
  ausdruck: "Ausdruck",
  empathie: "Empathie",
  dominanz: "Dominanz",
  resonanz: "Resonanz"
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

export function buildDerivedLeadAttributes(attributeValues = {}) {
  const derived = {};
  const groups = getLeadAttributeGroups();

  for (const [leadAttributeKey, attributeKeys] of Object.entries(groups)) {
    const sum = attributeKeys.reduce(
      (total, attributeKey) => {
        const baseValue = readAttributeBaseValue(attributeValues, attributeKey);
        return total + baseValue;
      },
      0
    );
    derived[leadAttributeKey] = sum / attributeKeys.length;
  }

  return derived;
}

export function buildLeadAttributeValues(derivedLeadAttributes = {}) {
  return {
    koerper: toFiniteNumber(derivedLeadAttributes?.koerper),
    geist: toFiniteNumber(derivedLeadAttributes?.geist),
    praesenz: toFiniteNumber(derivedLeadAttributes?.praesenz)
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

export function formatRuleAnchorLabel(anchorValue) {
  if (typeof anchorValue !== "string" || anchorValue.trim().length === 0) return "–";
  return RULE_ANCHOR_LABELS[anchorValue] || anchorValue;
}

export function buildSkillRollLabel(item) {
  const level = toFiniteNumber(item?.system?.level ?? item?.system?.rank ?? 0);
  return `Probe: Stufe ${level}`;
}

export function buildQuickhackRollLabel(quickhack, skill) {
  const skillTypeLabels = {
    broad: "Sammelfertigkeit",
    standard: "Standardfertigkeit",
    specialization: "Spezialfertigkeit"
  };
  const quickhackTier = toFiniteNumber(quickhack?.system?.tier, 0);
  const skillName = skill?.name || "Keine Fertigkeit";
  const skillType = skillTypeLabels[skill?.system?.type] || "nicht zugeordnet";
  const skillLevel = skill ? toFiniteNumber(skill.system?.level ?? skill.system?.rank ?? 0) : "-";
  return `Cyberkampf – ${quickhack?.name || "Quickhack"} (${quickhackTier}) mit ${skillName} (${skillType}) (${skillLevel}) ausgeführt.`;
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
  return (toFiniteNumber(value) - 2) * 30;
}

export function skillApplicationClassMultiplier(applicationClass) {
  switch (applicationClass) {
    case "combat":
      return 1.25;
    case "fluff":
      return 0.5;
    case "action":
    default:
      return 1;
  }
}

export function calculateSpentEpBreakdown({
  attributes = {},
  skillItems = [],
  maneuverItems = [],
  readLearnCostEp = (item) => toFiniteNumber(item?.system?.learnCostEp ?? 0)
} = {}) {
  const attributeTotal = Object.keys(ATTRIBUTE_TO_LEAD_ATTRIBUTE).reduce((sum, attrKey) => {
    const baseValue = readAttributeBaseValue(attributes, attrKey);
    const baseCost = calculateAttributeCost(baseValue);
    return sum + baseCost;
  }, 0);

  const skillItemTotal = skillItems.reduce((sum, item) => {
    const baseCost = readLearnCostEp(item);
    const level = Math.max(0, toFiniteNumber(item?.system?.level ?? item?.system?.rank ?? 1));
    const applicationClass = item?.system?.applicationClass;
    const multiplier = skillApplicationClassMultiplier(applicationClass);
    const adjustedCost = roundCommercial(toFiniteNumber(baseCost) * level * multiplier);
    return sum + adjustedCost;
  }, 0);

  const maneuverEp = maneuverItems.reduce((sum, item) => sum + readLearnCostEp(item), 0);

  return {
    attributes: attributeTotal,
    skills: 0,
    skillItems: skillItemTotal,
    maneuverEp,
    total: Math.max(0, toFiniteNumber(attributeTotal + skillItemTotal + maneuverEp))
  };
}

export function calculateInitiativeBase({
  initiative = {},
  attributeValues = {}
} = {}) {
  const derivedLeadAttributes = buildDerivedLeadAttributes(attributeValues);
  const leadAttributeValues = buildLeadAttributeValues(derivedLeadAttributes);
  const leadAttributeKey = initiative.leadAttribute;
  return Number(initiative.baseMod || 0) + roundCommercial(toFiniteNumber(leadAttributeValues?.[leadAttributeKey] || 0));
}