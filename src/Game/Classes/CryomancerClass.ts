import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import PlayerSkill from "../PlayerSkill";
import IClass from "./IClass";

class CryomancerClass implements IClass {

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[] {
    return [
      new PlayerSkill(SkillEnum.IceBolt, 1, false)
    ];
  }
}

export default CryomancerClass;