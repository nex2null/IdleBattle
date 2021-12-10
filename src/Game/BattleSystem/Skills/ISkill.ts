import TargetTypeEnum from '../Enums/TargetTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import DamageTracker from '../DamageTracker';

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
    battleLog: BattleLog,
    damageTracker: DamageTracker): void;

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean;
}

export default ISkill;