import TargetTypeEnum from '../Enums/TargetTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import DamageTracker from '../DamageTracker';

interface ISkill {

  // The name of the skill
  name: string;

  // The current skill level
  level: number;

  // The maximum skill level
  maxLevel: number;

  // Whether the skill is mastered
  isMastered: boolean;

  // Whether the skill is a generic skill that every class possesses
  isGeneric: boolean;

  // The target type of the skill
  targetType: TargetTypeEnum;

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter): boolean;

  // Get the skill description
  getDescription(): string;

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