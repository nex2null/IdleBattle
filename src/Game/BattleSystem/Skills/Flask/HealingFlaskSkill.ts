import BattleCharacter from '../../BattleCharacter';
import BattleLog from '../../BattleLog';
import TargetTypeEnum from '../../Enums/TargetTypeEnum';
import IFlaskSkill from './IFlaskSkill';

class HealingFlaskSkill implements IFlaskSkill {

  // Properties
  name: string;
  targetType: TargetTypeEnum;
  baseAmount: number;

  // Constructor
  constructor(baseAmount: number) {
    this.name = 'Healing Flask';
    this.targetType = TargetTypeEnum.Single;
    this.baseAmount = baseAmount;
  }

  // Get the skill description
  getDescription(): string {
    return `Heals a single target.`;
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
    battleLog: BattleLog
  ) {

    // Only first target is ever relevant
    var target = targets[0];

    // Heal the target
    target.receiveHeal(this.baseAmount, battleLog);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.currentStats.hp < target.currentStats.maxHp;
  }
}

export default HealingFlaskSkill;