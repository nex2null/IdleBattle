import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import Gambit from '../Gambits/Gambit';
import { LootGenerationOption } from '../../Itemization/LootGenerator';
import ItemTypeEnum from '../../Itemization/Enums/ItemTypeEnum';
import Stats from '../../Stats';
import SkillEnum from '../Enums/SkillEnum';
import GambitConditionEnum from '../Enums/GambitConditionEnum';
import PlayerSkill from '../../PlayerSkill';

class HardSpider extends BattleCharacter {
  constructor(name: string) {
    super({
      name: name,
      level: 1,
      baseStats: new Stats({
        maxHp: 125,
        maxMp: 0,
        strength: 18,
        speed: 20,
        physicalResistance: 50,
        fireResistance: 50,
        coldResistance: 50,
        lightningResistance: 50,
        physicalPower: 45
      }),
      characterType: BattleCharacterTypeEnum.EnemyParty,
      hostileToCharacterType: BattleCharacterTypeEnum.PlayerParty,
      gambits: [
        new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.WebShoot, 0.1),
        new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
      ],
      skills: [
        new PlayerSkill(SkillEnum.Attack, 1, false),
        new PlayerSkill(SkillEnum.WebShoot, 1, false)
      ],
      maxNumberOfItemsToDrop: 1,
      lootGenerationOptions: [
        new LootGenerationOption(ItemTypeEnum.SpiderFang, 1, 50)
      ],
      goldWorth: 150,
      xpWorth: 75
    });
  }
}

export default HardSpider;