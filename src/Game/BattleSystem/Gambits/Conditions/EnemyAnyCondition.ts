import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

class EnemyAnyCondition implements IGambitCondition {
    conditionEnum: GambitConditionEnum = GambitConditionEnum.EnemyAny;
    requiresInput: boolean = false;
    getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
        return characters.filter(x =>
            x !== user &&
            x.characterType === user.hostileToCharacterType);
    }
}

export default EnemyAnyCondition;