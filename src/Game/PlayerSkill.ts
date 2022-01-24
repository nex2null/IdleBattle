import SkillEnum from "./BattleSystem/Enums/SkillEnum";

//
// Options for the game
//
class PlayerSkill {

  // Properties
  skill: SkillEnum;
  level: number;
  mastered: boolean;

  // Constructor
  constructor(skill: SkillEnum, level: number, mastered: boolean) {
    this.skill = skill;
    this.level = level;
    this.mastered = mastered;
  }

  // Load from saved data
  static load(savedData: any) {
    return new PlayerSkill(
      savedData.skill,
      savedData.level,
      savedData.mastered
    );
  }
}

export default PlayerSkill;