import TargetTypeEnum from '../Enums/TargetTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';

interface ISkill {

  // The name of the skill
  name: string;

  // The enum of the skill
  skillEnum: SkillEnum;

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

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter): boolean;

  // Get the skill description
  getDescription(): string;

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number;

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