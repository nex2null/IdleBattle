import { calculateHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import RandomHelpers from '../../Utilities/RandomHelpers';
import StunnedEffect from '../BattleEffects/StunnedEffect';
import DamageTracker from '../DamageTracker';

class PowerStrikeSkill implements ISkill {

  // TODO: Figure MP Cost
  readonly mpCost: number = 10;

  // Properties
  name: string;
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  targetType: TargetTypeEnum;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.name = 'Power Strike';
    this.level = slvl;
    this.isMastered = isMastered;
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `POWER STRIKE!`;
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  // Calculate the attack damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    // Base damage is 1.5x strength
    var baseDamageAmount = user.currentStats.strength * 1.5;
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Physical);

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
    battleLog.addMessage(`${character.name} power strike's ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine if the attack hits
    var attackHits = calculateHit(character, target);

    // If the attack hits calculate damage
    if (attackHits) {

      // Calculate the damage on the target
      var damageToDo = this.calculateDamage(character, target);

      // Deal damage
      character.dealDamage(damageToDo, target, battleLog, damageTracker);

      // If the target is alive determine if they are stunned
      var applyStun = target.isAlive() && RandomHelpers.getRandomInt(1, 100) <= 50;
      if (applyStun) {
        // TODO: Determine stun length
        var stunEffect = new StunnedEffect(target, 10);
        character.inflictEffect(stunEffect, target, battleLog);
      }
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default PowerStrikeSkill;