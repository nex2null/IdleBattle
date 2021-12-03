import DefenseEffect from '../BattleEffects/DefenseEffect';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';

class DefendSkill implements ISkill {

  // Properties
  name: string;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Defend';
    this.targetType = TargetTypeEnum.Self;
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
    var defenseEffect = new DefenseEffect(character);
    character.addEffect(defenseEffect);

    // Log that the character is defending
    battleLog.addMessage(`${character.name} defends`);
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return true;
  }
}

export default DefendSkill;