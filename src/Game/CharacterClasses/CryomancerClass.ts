import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";
import ICharacterClass from "./ICharacterClass";

class CryomancerClass implements ICharacterClass {

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[] {
    return [
      new PlayerSkill(SkillEnum.IceBolt, 1, false)
    ];
  }

  // Get stats the class starts with
  getStartingStats(): Stats {
    return new Stats({
      hp: 50,
      mp: 75,
      strength: 2,
      intelligence: 6
    });
  }
}

export default CryomancerClass;