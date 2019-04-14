import TargetTypeEnum from '../enums/target-type-enum';
import BattleCharacter from '../battle-character';
import BattleLog from '../battle-log';

interface ISkill {

  // The name of the skill
  name: string;

  // The target type of the skill
  targetType: TargetTypeEnum;

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter): boolean;

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog): void;
}

export default ISkill;