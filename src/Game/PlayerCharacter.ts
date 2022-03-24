import BattleCharacter from "./BattleSystem/BattleCharacter";
import BattleCharacterTypeEnum from './BattleSystem/Enums/BattleCharacterTypeEnum';
import Gambit from './BattleSystem/Gambits/Gambit';
import PlayerEquipment from "./PlayerEquipment";
import Stats from "./Stats";
import StatEnum from "./Enums/StatEnum";
import CharacterClassEnum from "./Enums/CharacterClassEnum";
import PlayerSkill from "./PlayerSkill";
import { Guid } from "guid-typescript";
import SkillEnum from "./BattleSystem/Enums/SkillEnum";
import SkillFactory from "./BattleSystem/Skills/SkillFactory";

class PlayerCharacter {

  // Properties
  uid: string;
  name: string;
  level: number;
  stats: Stats;
  gambits: Array<Gambit>;
  primaryClass: CharacterClassEnum;
  skills: Array<PlayerSkill>;
  skillPoints: number;

  // Equipment
  equipment: PlayerEquipment;

  // Constructor
  constructor(args: any) {
    this.uid = args.uid || Guid.create().toString();
    this.name = args.name;
    this.level = args.level;
    this.stats = args.stats;
    this.equipment = args.equipment || new PlayerEquipment();
    this.gambits = args.gambits;
    this.primaryClass = args.primaryClass;
    this.skills = args.skills;
    this.skillPoints = args.skillPoints || 0;
  }

  // Load from saved data
  static load(savedData: any) {
    return new PlayerCharacter({
      uid: savedData.uid,
      name: savedData.name,
      level: savedData.level,
      stats: Stats.load(savedData.stats),
      equipment: savedData.equipment ? PlayerEquipment.load(savedData.equipment) : null,
      gambits: savedData.gambits.map((x: any) => Gambit.load(x)),
      primaryClass: savedData.primaryClass,
      skills: savedData.skills.map((x: any) => PlayerSkill.load(x)),
      skillPoints: savedData.skillPoints
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
      gambits: this.gambits
    });
  }

  // Get player skill
  getPlayerSkill(skillEnum: SkillEnum) {
    return this.skills.find(x => x.skill === skillEnum);
  }

  // Learn a new skill
  learnSkill(skillEnum: SkillEnum) {

    // If we already know this skill, do nothing
    if (this.getPlayerSkill(skillEnum))
      return;
    
    // Add the skill as a level 1 skill
    this.skills.push(new PlayerSkill(skillEnum, 1, false));
  }

  // Level up a skill
  levelSkill(skillEnum: SkillEnum) {

    // Ensure we have skill points
    if (this.skillPoints < 1)
      return;

    // Find the skill
    var playerSkill = this.getPlayerSkill(skillEnum);
    if (!playerSkill)
      return;

    // Verify the skill can be leveled
    var skill = SkillFactory.getSkill(playerSkill.skill, playerSkill.level, playerSkill.mastered);
    if (skill.level >= skill.maxLevel)
      return;

    // Level the skill
    playerSkill.level++;
    this.skillPoints--;
  }
}

export default PlayerCharacter;