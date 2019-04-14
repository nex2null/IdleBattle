import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import GambitAction from '../Gambits/GambitAction';
import GambitTypeEnum from '../Enums/GambitTypeEnum';
import EnemyAnyCondition from '../Gambits/Conditions/EnemyAnyCondition';

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