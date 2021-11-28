import BattleCharacter from "./BattleSystem/BattleCharacter";
import BattleCharacterTypeEnum from './BattleSystem/Enums/BattleCharacterTypeEnum';
import GambitAction from './BattleSystem/Gambits/GambitAction';
import EnemyAnyCondition from './BattleSystem/Gambits/Conditions/EnemyAnyCondition';
import GambitTypeEnum from './BattleSystem/Enums/GambitTypeEnum';
import PlayerEquipment from "./PlayerEquipment";
import Stats from "./Stats";
import StatEnum from "./Enums/StatEnum";

class PlayerCharacter {

  // Properties
  name: string;
  level: number;
  hp: number;
  mp: number;
  str: number;
  int: number;

  // Equipment
  equipment: PlayerEquipment;

  // Constructor
  constructor(args: any) {
    this.name = args.name;
    this.level = args.level;
    this.hp = args.hp;
    this.mp = args.mp;
    this.str = args.str;
    this.int = args.int;
    this.equipment = args.equipment || new PlayerEquipment();
  }

  // Load from saved data
  static load(savedData: any) {
    return new PlayerCharacter({
      name: savedData.name,
      level: savedData.level,
      hp: savedData.hp,
      mp: savedData.mp,
      str: savedData.str,
      int: savedData.int,
      spd: savedData.spd,
      equipment: savedData.equipment ? PlayerEquipment.load(savedData.equipment) : null
    });
  }

  // Create a battle character representation of this player character
  toBattleCharacter(): BattleCharacter {
    
    return new BattleCharacter({
      name: this.name,
      level: this.level,
      baseStats: new Stats({
        hp: this.hp,
        mp: this.mp,
        strength: this.str + (this.equipment.weapon ? this.equipment.weapon?.getStatValue(StatEnum.Strength) : 0),
        speed: this.equipment.weapon ? this.equipment.weapon.getStatValue(StatEnum.Speed) : 20
      }),
      characterType: BattleCharacterTypeEnum.PlayerParty,
      hostileToCharacterType: BattleCharacterTypeEnum.EnemyParty,
      gambits: [
        new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Attack')
      ]
    });
  }
}

export default PlayerCharacter;