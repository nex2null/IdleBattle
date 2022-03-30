import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

interface IGambitCondition {
  conditionEnum: GambitConditionEnum;
  requiresInput: boolean;
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>, input: string | null): Array<BattleCharacter>;
  getValidInputs(): Array<string>;
}

export default IGambitCondition;