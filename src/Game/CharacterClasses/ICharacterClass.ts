import CharacterClassEnum from "../Enums/CharacterClassEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";

interface ICharacterClass {

  // Gets the CharacterClassEnum for the class
  getEnum(): CharacterClassEnum;

  // Gets the name of the class
  getName(): string;

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[];

  // Get stats the class starts with
  getStartingStats(): Stats;

  // Get the stat increases on level up
  getLevelUpStatIncreases(newLevel: number): Stats;

  // Get the required amount of XP to level up
  getRequiredXpToLevel(newLevel: number): number;
}

export default ICharacterClass;