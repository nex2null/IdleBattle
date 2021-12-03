import { calculateHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import RandomHelpers from '../../Utilities/RandomHelpers';
import StunEffect from '../BattleEffects/StunEffect';

class PowerStrikeSkill implements ISkill {

  // TODO: Figure MP Cost
  readonly mpCost: number = 10;

  // Properties
  name: string;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Power Strike';
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
    battleLog: BattleLog
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
      target.applyDamage(damageToDo);

      // If the target is alive determine if they are stunned
      var applyStun = target.isAlive() && RandomHelpers.getRandomInt(1, 100) <= 50;
      if (applyStun) {
        // TODO: Determine stun length
        var stunEffect = new StunEffect(target, 10);
        target.addEffect(stunEffect);
      }

      // Log
      battleLog.addMessage(`${character.name} power strike's ${target.name} for ${damageToDo.getTotalAmount()} damage`);
      if (applyStun) battleLog.addMessage(`${target.name} is stunned!`)
      if (!target.isAlive()) battleLog.addMessage(`${target.name} has died`);
    }
    else {
      battleLog.addMessage(`${character.name} power strike's ${target.name}, but misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default PowerStrikeSkill;