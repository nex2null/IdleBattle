import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import GambitAction from '../Gambits/GambitAction';
import GambitTypeEnum from '../Enums/GambitTypeEnum';
import EnemyAnyCondition from '../Gambits/Conditions/EnemyAnyCondition';
import SelfCondition from '../Gambits/Conditions/SelfCondition';
import { LootGenerationOption } from '../../Itemization/LootGenerator';
import ItemTypeEnum from '../../Itemization/Enums/ItemTypeEnum';
import Stats from '../../Stats';

class Spider extends BattleCharacter {
  constructor(name: string) {
    super({
      name: name,
      level: 1,
      baseStats: new Stats({
        hp: 25,
        mp: 0,
        strength: 3,
        speed: 14,
      }),
      characterType: BattleCharacterTypeEnum.EnemyParty,
      hostileToCharacterType: BattleCharacterTypeEnum.PlayerParty,
      gambits: [
        new GambitAction(new SelfCondition(), null, GambitTypeEnum.Skill, 'Defend', 0.1),
        new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Web Shoot', 0.1),
        new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Attack')
      ],
      maxNumberOfItemsToDrop: 1,
      lootGenerationOptions: [
        new LootGenerationOption(ItemTypeEnum.SpiderFang, 1, 25)
      ],
      goldWorth: 75
    });
  }
}

export default Spider;