import BattleCharacterType from '../battle-character-type';
import BattleCharacter from '../battle-character';
import GambitAction from '../gambits/gambit-action';
import GambitType from '../gambits/gambit-type';
import EnemyAnyCondition from '../gambits/conditions/enemy-any';

class Hero extends BattleCharacter {
    constructor(name) {
        super({
            name: name,
            level: 1,
            hp: 175,
            mp: 0,
            str: 15,
            def: 17,
            spd: 5,
            eva: 3,
            characterType: BattleCharacterType.PlayerParty,
            hostileToCharacterType: BattleCharacterType.EnemyParty,
            gambits: [
                new GambitAction(EnemyAnyCondition, null, GambitType.Skill, 'Attack')
            ]
        })
    }
}

export default Hero;