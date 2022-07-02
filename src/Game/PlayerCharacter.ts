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
  masteryPoints: number;

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
    this.masteryPoints = args.masteryPoints || 0;
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
      skillPoints: savedData.skillPoints,
      masteryPoints: savedData.masteryPoints
    });
  }

  // Create a battle character representation of this player character
  toBattleCharacter(): BattleCharacter {

    // Calculate max hp
    var maxHp = this.stats.maxHp + this.equipment.getStatValue(StatEnum.Hp);
    var increasedHpPercent = this.equipment.getStatValue(StatEnum.IncreasedHpPercent);
    if (increasedHpPercent > 0)
      maxHp *= (1 + increasedHpPercent / 100);

    // Return the battle character
    return new BattleCharacter({
      name: this.name,
      level: this.level,
      baseStats: new Stats({
        maxHp: maxHp,
        maxMp: this.stats.maxMp + this.equipment.getStatValue(StatEnum.Mp),
        strength: this.stats.strength + this.equipment.getStatValue(StatEnum.Strength),
        intelligence: this.stats.intelligence + this.equipment.getStatValue(StatEnum.Intelligence),
        speed: this.equipment.weapon ? this.equipment.getStatValue(StatEnum.Speed) : this.equipment.getStatValue(StatEnum.Speed) + 20,
        firePower: this.stats.firePower + this.equipment.getStatValue(StatEnum.FirePower),
        coldPower: this.stats.coldPower + this.equipment.getStatValue(StatEnum.ColdPower),
        lightningPower: this.stats.lightningPower + this.equipment.getStatValue(StatEnum.LightningPower),
        physicalPower: this.stats.physicalPower + this.equipment.getStatValue(StatEnum.PhysicalPower),
        healPower: this.stats.healPower + this.equipment.getStatValue(StatEnum.HealPower),
        fireResistance: this.stats.fireResistance + this.equipment.getStatValue(StatEnum.FireResistance),
        coldResistance: this.stats.coldResistance + this.equipment.getStatValue(StatEnum.ColdResistance),
        lightningResistance: this.stats.lightningResistance + this.equipment.getStatValue(StatEnum.LightningResistance),
        physicalResistance: this.stats.physicalResistance + this.equipment.getStatValue(StatEnum.PhysicalResistance),
        statusResistance: this.stats.statusResistance + this.equipment.getStatValue(StatEnum.StatusResistance),
        increasedHpPercent: this.stats.increasedHpPercent + this.equipment.getStatValue(StatEnum.IncreasedHpPercent)
      }),
      characterType: BattleCharacterTypeEnum.PlayerParty,
      hostileToCharacterType: BattleCharacterTypeEnum.EnemyParty,
      gambits: this.gambits,
      skills: this.skills
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

  // Master a skill
  masterSkill(skillEnum: SkillEnum) {

    // Ensure we have mastery points
    if (this.masteryPoints < 1)
      return;

    // Find the skill and ensure it isn't already mastered
    var playerSkill = this.getPlayerSkill(skillEnum);
    if (!playerSkill || playerSkill.mastered)
      return;

    // Verify the skill can be mastered
    var skill = SkillFactory.getSkill(playerSkill.skill, playerSkill.level, playerSkill.mastered);
    if (skill.level != skill.maxLevel)
      return;

    // Master the skill
    playerSkill.mastered = true;
    this.masteryPoints--;
  }

  // Level up the character
  levelUp(levelUpStats: Stats, levelUpSkills: Array<SkillEnum>) {

    // Increase level and skill points
    this.level++;
    this.skillPoints++;

    // Add stats
    this.stats.adjust(levelUpStats);

    // Learn new skills
    levelUpSkills.forEach(x => this.learnSkill(x));

    // If the current level is divisable by 10, gain a mastery point
    if (this.level % 10 === 0)
      this.masteryPoints++;
  }
}

export default PlayerCharacter;