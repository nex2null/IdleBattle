import BattleCharacterTypeEnum from '../enums/battle-character-type-enum';
import BattleCharacter from '../battle-character';
import GambitAction from '../gambits/gambit-action';
import GambitTypeEnum from '../enums/gambit-type-enum';
import EnemyAnyCondition from '../gambits/conditions/enemy-any-condition';

class Hero extends BattleCharacter {
    constructor(name: string) {
        super({
            name: name,
            level: 1,
            hp: 175,
            mp: 0,
            str: 15,
            def: 17,
            spd: 5,
            eva: 3,
            characterType: BattleCharacterTypeEnum.PlayerParty,
            hostileToCharacterType: BattleCharacterTypeEnum.EnemyParty,
            gambits: [
                new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Attack', 100)
            ]
        })
    }
}

export default Hero;