import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import Gambit from '../Gambits/Gambit';
import EnemyAnyCondition from '../Gambits/Conditions/EnemyAnyCondition';
import SelfCondition from '../Gambits/Conditions/SelfCondition';
import { LootGenerationOption } from '../../Itemization/LootGenerator';
import ItemTypeEnum from '../../Itemization/Enums/ItemTypeEnum';
import Stats from '../../Stats';
import SkillEnum from '../Enums/SkillEnum';

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
        new Gambit(new SelfCondition(), null, SkillEnum.Defend, 0.1),
        new Gambit(new EnemyAnyCondition(), null, SkillEnum.WebShoot, 0.1),
        new Gambit(new EnemyAnyCondition(), null, SkillEnum.Attack)
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