import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";

interface ICharacterClass {

  // Gets the name of the class
  getName(): string;

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[];

  // Get stats the class starts with
  getStartingStats(): Stats;
}

export default ICharacterClass;