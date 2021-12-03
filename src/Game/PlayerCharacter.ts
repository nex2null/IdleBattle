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
  stats: Stats;

  // Equipment
  equipment: PlayerEquipment;

  // Constructor
  constructor(args: any) {
    this.name = args.name;
    this.level = args.level;
    this.stats = args.stats;
    this.equipment = args.equipment || new PlayerEquipment();
  }

  // Load from saved data
  static load(savedData: any) {
    return new PlayerCharacter({
      name: savedData.name,
      level: savedData.level,
      stats: Stats.load(savedData.stats),
      equipment: savedData.equipment ? PlayerEquipment.load(savedData.equipment) : null
    });
  }

  // Create a battle character representation of this player character
  toBattleCharacter(): BattleCharacter {
    return new BattleCharacter({
      name: this.name,
      level: this.level,
      baseStats: new Stats({
        hp: this.stats.hp + this.equipment.getStatValue(StatEnum.Hp),
        mp: this.stats.mp + this.equipment.getStatValue(StatEnum.Mp),
        strength: this.stats.strength + this.equipment.getStatValue(StatEnum.Strength),
        intelligence: this.stats.intelligence + this.equipment.getStatValue(StatEnum.Intelligence),
        speed: this.equipment.weapon ? this.equipment.getStatValue(StatEnum.Speed) : this.equipment.getStatValue(StatEnum.Speed) + 20,
        firePower: this.equipment.getStatValue(StatEnum.FirePower),
        coldPower: this.equipment.getStatValue(StatEnum.ColdPower),
        lightningPower: this.equipment.getStatValue(StatEnum.LightningPower),
        physicalPower: this.equipment.getStatValue(StatEnum.PhysicalPower),
        fireResistance: this.equipment.getStatValue(StatEnum.FireResistance),
        coldResistance: this.equipment.getStatValue(StatEnum.ColdResistance),
        lightningResistance: this.equipment.getStatValue(StatEnum.LightningResistance),
        physicalResistance: this.equipment.getStatValue(StatEnum.PhysicalResistance)
      }),
      characterType: BattleCharacterTypeEnum.PlayerParty,
      hostileToCharacterType: BattleCharacterTypeEnum.EnemyParty,
      gambits: [
        new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Power Strike'),
        new GambitAction(new EnemyAnyCondition(), null, GambitTypeEnum.Skill, 'Attack')
      ]
    });
  }
}

export default PlayerCharacter;