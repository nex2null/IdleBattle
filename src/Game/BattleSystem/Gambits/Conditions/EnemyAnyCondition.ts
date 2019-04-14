import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';

class EnemyAnyCondition implements IGambitCondition {
    name: string = 'Enemy: any';
    requiresInput: boolean = false;
    getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
        return characters.filter(x =>
            x !== user &&
            x.characterType === user.hostileToCharacterType);
    }
}

export default EnemyAnyCondition;