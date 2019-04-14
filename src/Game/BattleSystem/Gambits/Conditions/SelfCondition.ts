import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';

class SelfCondition implements IGambitCondition {
    name: string = 'Self';
    requiresInput: boolean = false;
    getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
        return [user];
    }
}

export default SelfCondition;