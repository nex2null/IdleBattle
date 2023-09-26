import TargetTypeEnum from '../../Enums/TargetTypeEnum';
import BattleCharacter from '../../BattleCharacter';
import BattleLog from '../../BattleLog';
import DamageTracker from '../../DamageTracker';

interface IFlaskSkill {

  // The target type of the skill
  targetType: TargetTypeEnum;

  // Determine if the flask is valid for a target
  isValidTarget(target: BattleCharacter): boolean;

  // Get the flask skill description
  getDescription(): string;

  // Use the flask
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog,
    damageTracker: DamageTracker,
    allCharacters: Array<BattleCharacter>): void;

  // Determine if the flask can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean;
}

export default IFlaskSkill;