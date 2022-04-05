import { calculateHit, calculateStatusEffectHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import RandomHelpers from '../../Utilities/RandomHelpers';
import DamageTracker from '../DamageTracker';
import ChilledEffect from '../BattleEffects/ChilledEffect';
import SkillEnum from '../Enums/SkillEnum';

class IceBoltSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.IceBolt;
  readonly mpCost: number;
  targetType: TargetTypeEnum;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 5 + ((this.level - 1) * 2);
    this.name = 'Ice Bolt';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Shoot a bolt of ice, dealing cold damage to a single target.\n\nBase Damage Formula: Intelligence * (1.5 + (slvl * .2))`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 1: return 2;
      case 2: return 3;
      case 3: return 4;
      case 4: return 5;
      case 5: return 6;
      case 6: return 7;
      case 7: return 8;
      case 8: return 9;
      case 9: return 10;
      default: return 1000;
    }
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  // Calculate the attack damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    var multiplier = 1.5 + this.level * .2;
    var baseDamageAmount = user.currentStats.intelligence * multiplier;
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Cold);

    // Process the base damage
    return processDamage(user, target, baseDamage);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog,
    damageTracker: DamageTracker
  ) {
    // Only first target is ever relevant
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} shoots an ice bolt at ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine if the attack hits
    var attackHits = calculateHit(character, target);

    // If the attack hits calculate damage
    if (attackHits) {

      // Calculate the damage on the target
      var damageToDo = this.calculateDamage(character, target);

      // Deal the damage
      character.dealDamage(damageToDo, target, battleLog, damageTracker);

      // If the target is alive determine if they are chilled
      var chillRollSuccess = this.isMastered || RandomHelpers.getRandomInt(1, 100) <= 50;
      var chillHits = calculateStatusEffectHit(character, target);
      var applyChill = target.isAlive() && chillRollSuccess && chillHits;
      if (applyChill) {
        var chillEffect = new ChilledEffect(target);
        character.inflictEffect(chillEffect, target, battleLog);
      }
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default IceBoltSkill;