import BattleCharacterTypeEnum from '../enums/battle-character-type-enum';
import BattleCharacter from '../battle-character';
import GambitAction from '../gambits/gambit-action';
import GambitTypeEnum from '../enums/gambit-type-enum';
import EnemyAnyCondition from '../gambits/conditions/enemy-any-condition';
import SelfCondition from '../gambits/conditions/self-condition';

class Spider extends BattleCharacter {
    constructor(name: string) {
        super({
            name: name,
            level: 1,
            hp: 200,
            mp: 0,
            str: 1,
            def: 5,
            spd: 7,
            eva: 4,
            characterType: BattleCharacterTypeEnum.EnemyParty,
            hostileToCharacterType: BattleCharacterTypeEnum.PlayerParty,
            gambits: [
                new GambitAction(new SelfCondition(), null, GambitTypeEnum.Skill, 'Defend', 0.1),
                new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Web Shoot', 0.1),
                new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Attack')
            ]
        })
    }
}

export default Spider;