import { calculateHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import RandomHelpers from '../../Utilities/RandomHelpers';
import DamageTracker from '../DamageTracker';
import ChilledEffect from '../BattleEffects/ChilledEffect';

class IceBoltSkill implements ISkill {

  // TODO: Figure MP Cost
  readonly mpCost: number;

  // Properties
  slvl: number;
  isMastered: boolean;
  name: string;
  targetType: TargetTypeEnum;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.slvl = slvl;
    this.isMastered = isMastered;
    this.mpCost = 5 + ((this.slvl - 1) * 2);
    this.name = 'Ice Bolt';
    this.targetType = TargetTypeEnum.Single;
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  // Calculate the attack damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    var multiplier = 1.5 + this.slvl * .2;
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

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine if the attack hits
    var attackHits = calculateHit(character, target);

    // If the attack hits calculate damage
    if (attackHits) {

      // Calculate the damage on the target
      var damageToDo = this.calculateDamage(character, target);

      // Apply the damage
      target.applyDamage(damageToDo, damageTracker);

      // If the target is alive determine if they are chilled
      var chillRollSuccess = this.isMastered || RandomHelpers.getRandomInt(1, 100) <= 50;
      var applyChill = target.isAlive() && chillRollSuccess;
      if (applyChill) {
        var chillEffect = new ChilledEffect(target);
        target.addEffect(chillEffect);
      }

      // Log
      battleLog.addMessage(`${character.name} shoots an ice bolt at ${target.name} for ${damageToDo.getTotalAmount()} damage`);
      if (applyChill) battleLog.addMessage(`${target.name} is chilled!`)
      if (!target.isAlive()) battleLog.addMessage(`${target.name} has died`);
    }
    else {
      battleLog.addMessage(`${character.name} shoots an ice bolt at ${target.name}, but misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default IceBoltSkill;