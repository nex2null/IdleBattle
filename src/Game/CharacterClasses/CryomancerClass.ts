import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import CharacterClassEnum from "../Enums/CharacterClassEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";
import ICharacterClass from "./ICharacterClass";

class CryomancerClass implements ICharacterClass {

  // Gets the CharacterClassEnum for the class
  getEnum(): CharacterClassEnum {
    return CharacterClassEnum.Cryomancer;
  }

  // Gets the name of the class
  getName(): string {
    return 'Cryomancer'
  }

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