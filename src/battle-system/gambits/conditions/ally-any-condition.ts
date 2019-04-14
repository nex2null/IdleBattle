import IGambitCondition from './i-gambit-condition';
import BattleCharacter from '../../battle-character';

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