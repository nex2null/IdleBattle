import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

interface IGambitCondition {
  conditionEnum: GambitConditionEnum;
  requiresInput: boolean;
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter>;
}

export default IGambitCondition;