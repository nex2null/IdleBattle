import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

class SelfCondition implements IGambitCondition {
    conditionEnum: GambitConditionEnum = GambitConditionEnum.Self;
    requiresInput: boolean = false;
    getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
        return [user];
    }
}

export default SelfCondition;