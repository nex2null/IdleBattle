import { calculateHit, processDamage } from '../BattleFormulas';
import ISkill from './ISkill';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import DamageTracker from '../DamageTracker';

class AttackSkill implements ISkill {

  // Properties
  name: string;
  level: number = 1;
  maxLevel: number = 1;
  isMastered: boolean = false;
  isGeneric: boolean = true;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Attack';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Attack a single target dealing base damage equal to the attacker's strength`;
  }

  // Calculate the attack damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    // Base damage is user strength
    var baseDamageAmount = user.currentStats.strength;
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Physical);

    // Process the base damage
    return processDamage(user, target, baseDamage);
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return true;
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
    battleLog.addMessage(`${character.name} attacks ${target.name}`);

    // Determine if the attack hits
    var attackHits = calculateHit(character, target);

    // If the attack hits calculate damage
    if (attackHits) {

      // Calculate the damage on the target
      var damageToDo = this.calculateDamage(character, target);

      // Deal the damage
      character.dealDamage(damageToDo, target, battleLog, damageTracker);
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

export default AttackSkill;