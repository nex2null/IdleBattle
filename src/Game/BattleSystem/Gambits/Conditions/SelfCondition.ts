import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

class SelfCondition implements IGambitCondition {

  // Properties
  conditionEnum: GambitConditionEnum = GambitConditionEnum.Self;
  requiresInput: boolean = false;

  // Get valid targets for the gambit condition
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
    return [user];
  }

  // Get valid inputs for the gambit condition
  getValidInputs(): Array<string> {
    return [];
  }
}

export default SelfCondition;