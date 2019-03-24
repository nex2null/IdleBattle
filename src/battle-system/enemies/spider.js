import BattleCharacterType from '../battle-character-type';
import BattleCharacter from '../battle-character';
import GambitAction from '../gambits/gambit-action';
import GambitType from '../gambits/gambit-type';
import EnemyAnyCondition from '../gambits/conditions/enemy-any';

class Spider extends BattleCharacter {
    constructor(name) {
        super({
            name: name,
            level: 1,
            hp: 200,
            mp: 0,
            str: 1,
            def: 5,
            spd: 7,
            eva: 4,
            characterType: BattleCharacterType.EnemyParty,
            hostileToCharacterType: BattleCharacterType.PlayerParty,
            gambits: [
                new GambitAction(EnemyAnyCondition, null, GambitType.Skill, 'Attack')
            ]
        })
    }
}

export default Spider;