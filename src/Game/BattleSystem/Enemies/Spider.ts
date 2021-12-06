import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import Gambit from '../Gambits/Gambit';
import { LootGenerationOption } from '../../Itemization/LootGenerator';
import ItemTypeEnum from '../../Itemization/Enums/ItemTypeEnum';
import Stats from '../../Stats';
import SkillEnum from '../Enums/SkillEnum';
import GambitConditionEnum from '../Enums/GambitConditionEnum';

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
        physicalResistance: 50
      }),
      characterType: BattleCharacterTypeEnum.EnemyParty,
      hostileToCharacterType: BattleCharacterTypeEnum.PlayerParty,
      gambits: [
        new Gambit(GambitConditionEnum.Self, null, SkillEnum.Defend, 0.1),
        new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.WebShoot, 0.1),
        new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
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