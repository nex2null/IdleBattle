import BattleCharacterTypeEnum from '../Enums/BattleCharacterTypeEnum';
import BattleCharacter from '../BattleCharacter';
import Gambit from '../Gambits/Gambit';
import { LootGenerationOption } from '../../Itemization/LootGenerator';
import ItemTypeEnum from '../../Itemization/Enums/ItemTypeEnum';
import Stats from '../../Stats';
import SkillEnum from '../Enums/SkillEnum';
import GambitConditionEnum from '../Enums/GambitConditionEnum';
import PlayerSkill from '../../PlayerSkill';

class FunnelWeaver extends BattleCharacter {
  constructor(name: string) {
    super({
      name: name,
      level: 10,
      baseStats: new Stats({
        maxHp: 500,
        maxMp: 0,
        strength: 8,
        speed: 18,
        physicalResistance: 50,
        fireResistance: 30,
        coldResistance: 50
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
      equipment: null,
      maxNumberOfItemsToDrop: 1,
      lootGenerationOptions: [
        new LootGenerationOption(ItemTypeEnum.FunnelWeaverFang, 1, 25)
      ],
      goldWorth: 300,
      xpWorth: 150
    });
  }
}

export default FunnelWeaver;