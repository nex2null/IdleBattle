import { calculateHit, calculateStatusEffectHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import RandomHelpers from '../../Utilities/RandomHelpers';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';
import BurningEffect from '../BattleEffects/BurningEffect';

class FireballSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.Fireball;
  readonly mpCost: number;
  targetType: TargetTypeEnum;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 5 + ((this.level - 1) * 2);
    this.name = 'Fireball';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Shoot a ball of fire, dealing fire damage to a single target.\n\nBase Damage Formula: Intelligence * (1.5 + (slvl * .2))`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 0;
      case 1: return 4;
      case 2: return 8;
      case 3: return 12;
      case 4: return 16;
      case 5: return 20;
      case 6: return 24;
      case 7: return 28;
      case 8: return 32;
      case 9: return 36;
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
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Fire);

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
    battleLog.addMessage(`${character.name} shoots a fireball at ${target.name}`);

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

      // If the target is alive determine if they are burned
      var burnRollSuccess = this.isMastered || RandomHelpers.getRandomInt(1, 100) <= 35;
      var burnHits = calculateStatusEffectHit(character, target);
      var applyBurn = target.isAlive() && burnRollSuccess && burnHits;
      if (applyBurn) {
        var burnDamage = damageToDo.getTotalAmount() * .5;
        var burnEffect = new BurningEffect(target, character, 4, burnDamage);
        character.inflictEffect(burnEffect, target, battleLog);
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

export default FireballSkill;