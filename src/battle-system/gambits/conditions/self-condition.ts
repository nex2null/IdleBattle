import IGambitCondition from './i-gambit-condition';
import BattleCharacter from '../../battle-character';

class SelfCondition implements IGambitCondition {
    name: string = 'Self';
    requiresInput: boolean = false;
    getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
        return [user];
    }
}

export default SelfCondition;