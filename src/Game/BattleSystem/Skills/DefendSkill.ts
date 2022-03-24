import DefendedEffect from '../BattleEffects/DefendedEffect';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';

class DefendSkill implements ISkill {

  // Properties
  name: string;
  level: number = 1;
  maxLevel: number = 1;
  isMastered: boolean = false;
  isGeneric: boolean = true;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Defend';
    this.targetType = TargetTypeEnum.Self;
  }

  // Get the skill description
  getDescription(): string {
    return `Enter into a defensive stance, halving all damage taken until your next turn`;
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
    // Add a defense effect to the character
    var defenseEffect = new DefendedEffect(character);
    character.applyEffect(defenseEffect, battleLog);
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return true;
  }
}

export default DefendSkill;