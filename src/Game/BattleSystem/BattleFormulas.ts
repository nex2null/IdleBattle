import BattleCharacter from "./BattleCharacter";
import BattleDamage from './BattleDamage';
import DamageTypeEnum from "./Enums/DamageTypeEnum";

// Determine if a hit is calculated
export function calculateHit(attacker: BattleCharacter, defender: BattleCharacter): boolean {

  // The base miss % is 5%
  var baseMissPercent = 5;

  // Level difference adds to the percent
  var levelModifier = (defender.level - attacker.level) * .5;
  var missPercent = baseMissPercent + levelModifier;

  // TODO: Accuracy / Evasion

  // Roll a number 0 to 100 and if it is less than the miss percent the attack misses
  var roll = Math.random() * 100;
  return roll > Math.round(missPercent);
}

// Calculate if a status effect can hit the defender
export function calculateStatusEffectHit(attacker: BattleCharacter, defender: BattleCharacter): boolean {

  // Get the status resistance percent
  var statusResistance = defender.currentStats.statusResistance;
  var resistancePercent = getResistancePercent(statusResistance, attacker, defender);

  // TODO: Give attacker a way to negate the resistance

  // Roll a number 0 to 1, and we need to beat the resistance percent
  return Math.random() > resistancePercent;
}

// Does any damage processing given a base damage
export function processDamage(attacker: BattleCharacter, defender: BattleCharacter, baseDamage: BattleDamage): BattleDamage {

  // Increase damage by attacker power
  baseDamage.amounts.forEach((amount, type) => {
    var powerValue = getPowerValue(type, attacker);
    var increasePercent = getDamageIncreasePercent(powerValue, attacker);
    baseDamage.amounts.set(type, amount * (1 + increasePercent))
  });

  // Reduce damage by defender resistance
  baseDamage.amounts.forEach((amount, type) => {
    var defenseValue = getDefenseValue(type, defender);
    var resistancePercent = getResistancePercent(defenseValue, attacker, defender);
    baseDamage.amounts.set(type, amount * (1 - resistancePercent));
  });

  return baseDamage;
}

// Does any heal processing given a base heal
export function processHeal(healer: BattleCharacter, target: BattleCharacter, baseAmount: number): number {

  // Factor in heal power
  var increasePercent = getHealIncreasePercent(healer.currentStats.healPower, healer);

  // Augment base amount by percent
  return baseAmount * (1 + increasePercent);
}

// Get the defense value a defender has to a given damage type
function getDefenseValue(damageType: DamageTypeEnum, defender: BattleCharacter): number {
  switch (damageType) {
    case DamageTypeEnum.Physical: return defender.currentStats.physicalResistance;
    case DamageTypeEnum.Fire: return defender.currentStats.fireResistance;
    case DamageTypeEnum.Cold: return defender.currentStats.coldResistance;
    case DamageTypeEnum.Lightning: return defender.currentStats.lightningResistance;
    default: return 0;
  }
}

// Get the power value an attacker has for a given damage type
function getPowerValue(damageType: DamageTypeEnum, attacker: BattleCharacter): number {
  switch (damageType) {
    case DamageTypeEnum.Physical: return attacker.currentStats.physicalPower;
    case DamageTypeEnum.Fire: return attacker.currentStats.firePower;
    case DamageTypeEnum.Cold: return attacker.currentStats.coldPower;
    case DamageTypeEnum.Lightning: return attacker.currentStats.lightningPower;
    default: return 0;
  }
}

// Get the damage increase percentage that a power value will provide
function getDamageIncreasePercent(power: number, attacker: BattleCharacter) {

  // TODO: Figure out a divisor that makes sense
  var divisor = 1;

  // Divide defense by divisor to get the damage reduction percentage
  var increasePercent = +((power / divisor / 100).toFixed(2));

  // TODO: Augment this with other stats
  return increasePercent;
}

// Get the heal increase percentage that a power value will provide
function getHealIncreasePercent(power: number, healer: BattleCharacter) {

  // TODO: Figure out a divisor that makes sense
  var divisor = 1;

  // Divide defense by divisor to get the damage reduction percentage
  var increasePercent = +((power / divisor / 100).toFixed(2));

  // TODO: Augment this with other stats
  return increasePercent;
}

// Get the damage reduction percentage that a defense value will provide against a given attacker
function getResistancePercent(defense: number, attacker: BattleCharacter, defender: BattleCharacter) {

  // The divisor scales by the character's level, a higher level requires a
  // larger amount of defense to achieve a high resistance percent
  // every 5 levels increases the divisor by 1
  var divisor = 1 + .2 * defender.level;

  // Add .1 to the divisor for every level the attacker is above the defender
  // which makes a higher level attacker naturally have more penetration
  // against lower level defenders
  if (attacker.level > defender.level)
    divisor += .1 * (attacker.level - defender.level)

  // Divide defense by divisor to get the resistance percentage
  var resistancePercent = +((defense / divisor / 100).toFixed(2));

  // Resistance percent is capped at 75%
  // TODO: Augment this with other stats
  return resistancePercent > .75 ? .75 : resistancePercent;
}

// Gets the amount of resistance a defender would need to achieve a desired level of percent resistance
export function getRequiredResistanceForPercentReduction(target: BattleCharacter, desiredReductionPercent: number) {

  // The divisor scales by the character's level, a higher level requires a
  // larger amount of defense to achieve a high damage reduction percent
  // every 5 levels increases the divisor by 1
  var divisor = 1 + .2 * target.level;

  // The required resistance is the desired overall reduction multiplied by the divisor
  return desiredReductionPercent * divisor;
}