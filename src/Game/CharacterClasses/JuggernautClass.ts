import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import CharacterClassEnum from "../Enums/CharacterClassEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";
import ICharacterClass from "./ICharacterClass";

class JuggernautClass implements ICharacterClass {

  // Gets the CharacterClassEnum for the class
  getEnum(): CharacterClassEnum {
    return CharacterClassEnum.Juggernaut;
  }

  // Gets the name of the class
  getName(): string {
    return 'Juggernaut'
  }

  // Gets the description of the class
  getDescription(): string {
    return 'A Juggernaut is a natural tank.\n\nThey specialize in damage mitigation and clever usage of shields.'
  }

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[] {
    return [
      new PlayerSkill(SkillEnum.Taunt, 1, false)
    ];
  }

  // Get stats the class starts with
  getStartingStats(): Stats {
    return new Stats({
      maxHp: 90,
      maxMp: 45,
      strength: 3,
      intelligence: 2
    });
  }

  // Get the stat increases on level up
  getLevelUpStatIncreases(newLevel: number): Stats {
    return new Stats({
      maxHp: 8,
      maxMp: 3,
      strength: 1
    });
  }

  // Get new skills on level up
  getLevelUpSkills(newLevel: number): Array<SkillEnum> {
    switch (newLevel) {
      default: return [];
    }
  }

  // Get the required amount of XP to level up
  getRequiredXpToLevel(newLevel: number): number {
    return newLevel * newLevel * newLevel + 200;
  }
}

export default JuggernautClass;