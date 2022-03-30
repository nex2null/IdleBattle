import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

class AllyAnyCondition implements IGambitCondition {

  // Properties
  conditionEnum: GambitConditionEnum = GambitConditionEnum.AllyAny;
  requiresInput: boolean = false;

  // Get valid targets for the gambit condition
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
    return characters.filter(x => x.characterType !== user.hostileToCharacterType);
  }

  // Get valid inputs for the gambit condition
  getValidInputs(): Array<string> {
    return [];
  }
}

export default AllyAnyCondition;