import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import GambitAction from '../Gambits/GambitAction';
import GambitTypeEnum from '../Enums/GambitTypeEnum';
import EnemyAnyCondition from '../Gambits/Conditions/EnemyAnyCondition';
import SelfCondition from '../Gambits/Conditions/SelfCondition';
import { LootGenerationOption } from '@/Game/Itemization/LootGenerator';
import ItemSuperTypeEnum from '@/Game/Itemization/Enums/ItemSuperTypeEnum';

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
            ],
            maxNumberOfItemsToDrop: 1,
            lootGenerationOptions: [
                new LootGenerationOption(null, ItemSuperTypeEnum.Equipment, null, 1, 25),
                new LootGenerationOption(null, ItemSuperTypeEnum.Currency, null, 1, 100)
            ]
        })
    }
}

export default Spider;