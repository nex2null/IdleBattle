import BattleCharacter from "./BattleCharacter";
import BattleDamage from './BattleDamage';
import DamageTypeEnum from "./Enums/DamageTypeEnum";

// Determine if a hit is calculated
export function calculateHit(attacker: BattleCharacter, defender: BattleCharacter) {

  //   // The base miss % is 5%
  //   var baseMissPercent = 5;

  //   // Level difference adds to the percent
  //   var levelModifier = (defender.level - attacker.level) * .5;
  //   var missPercent = baseMissPercent + levelModifier;

  //   // The speed of the defender can add an additional 10%
  //   var evasionModifier = (defender.spd / 100) * 10;
  //   missPercent += evasionModifier;

  //   // Roll a number 0 to 100 and if it is less than the miss percent the attack misses
  //   var roll = Math.random() * 100;
  //   return roll > Math.round(missPercent);

  return true;
}

// Does any damage processing given a base damage
export function processDamage(attacker: BattleCharacter, defender: BattleCharacter, baseDamage: BattleDamage): BattleDamage {

  // TODO: Damage Increases

  // Reduce damage by player defenses
  baseDamage.amounts.forEach((amount, type) => {
    var defenseValue = getDefenseValue(type, defender);
    var reductionPercent = getDamageReductionPercent(defenseValue, attacker, defender);
    baseDamage.amounts.set(type, amount * (1 - reductionPercent));
  });

  return baseDamage;
}

function getDefenseValue(damageType: DamageTypeEnum, defender: BattleCharacter): number {
  switch (damageType) {
    case DamageTypeEnum.Physical: return defender.currentStats.physicalResistance;
    case DamageTypeEnum.Fire: return defender.currentStats.fireResistance;
    case DamageTypeEnum.Cold: return defender.currentStats.coldResistance;
    case DamageTypeEnum.Lightning: return defender.currentStats.lightningResistance;
    default: return 0;
  }
}

function getDamageReductionPercent(defense: number, attacker: BattleCharacter, defender: BattleCharacter) {

  // The divisor scales by the character's level, a higher level requires a
  // larger amount of defense to achieve a high damage reduction percent
  // every 5 levels increases the divisor by 1
  var divisor = 1 + .2 * defender.level;

  // Add .1 to the divisor for every level the attacker is above the defender
  // which makes a higher level attacker naturally have more damage penetration
  // against lower level defenders
  if (attacker.level > defender.level)
    divisor += .1 * (attacker.level - defender.level)

  // Divide defense by divisor to get the damage reduction percentage
  var reductionPercent = +((defense / divisor / 100).toFixed(2));

  // Reduction percent is capped at 75%
  // TODO: Augment this with other stats
  return reductionPercent > .75 ? .75 : reductionPercent;
}