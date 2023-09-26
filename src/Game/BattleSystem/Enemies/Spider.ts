import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import Gambit from '../Gambits/Gambit';
import { LootGenerationOption } from '../../Itemization/LootGenerator';
import ItemTypeEnum from '../../Itemization/Enums/ItemTypeEnum';
import Stats from '../../Stats';
import SkillEnum from '../Enums/SkillEnum';
import GambitConditionEnum from '../Enums/GambitConditionEnum';
import PlayerSkill from '../../PlayerSkill';

class Spider extends BattleCharacter {
  constructor(name: string) {
    super({
      name: name,
      level: 1,
      baseStats: new Stats({
        maxHp: 25,
        maxMp: 0,
        strength: 3,
        speed: 14,
        physicalResistance: 20
      }),
      characterType: BattleCharacterTypeEnum.EnemyParty,
      hostileToCharacterType: BattleCharacterTypeEnum.PlayerParty,
      gambits: [
        new Gambit(GambitConditionEnum.Self, null, SkillEnum.Defend, 0.1),
        new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.WebShoot, 0.1),
        new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
      ],
      skills: [
        new PlayerSkill(SkillEnum.Attack, 1, false),
        new PlayerSkill(SkillEnum.Defend, 1, false),
        new PlayerSkill(SkillEnum.WebShoot, 1, false)
      ],
      equipment: null,
      maxNumberOfItemsToDrop: 1,
      lootGenerationOptions: [
        new LootGenerationOption(ItemTypeEnum.SpiderFang, 1, 25),
        new LootGenerationOption(ItemTypeEnum.SpiderIchor, 1, 2)
      ],
      goldWorth: 75,
      xpWorth: 25
    });
  }
}

export default Spider;