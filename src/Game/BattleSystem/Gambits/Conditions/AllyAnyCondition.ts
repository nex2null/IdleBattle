import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';

class AllyAnyCondition implements IGambitCondition {
    name: string = 'Ally: any';
    requiresInput: boolean = false;
    getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter> {
        return characters.filter(x =>
            x !== user &&
            x.characterType !== user.hostileToCharacterType);
    }
}

export default AllyAnyCondition;