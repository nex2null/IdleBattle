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

  // Get the stat increases on level up
  getLevelUpStatIncreases(newLevel: number): Stats {
    return new Stats({
      hp: 3,
      mp: 5,
      intelligence: 2
    });
  }

  // Get new skills on level up
  getLevelUpSkills(newLevel: number): Array<SkillEnum> {
    switch (newLevel) {
      case 6: return [SkillEnum.FrozenBlades];
      case 12: return [SkillEnum.FrozenArmor];
      case 18: return [SkillEnum.ColdSnap];
      default: return [];
    }
  }

  // Get the required amount of XP to level up
  getRequiredXpToLevel(newLevel: number): number {
    return newLevel * 100;
  }
}

export default CryomancerClass;