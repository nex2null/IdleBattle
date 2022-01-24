import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";

interface ICharacterClass {

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[];

  // Get stats the class starts with
  getStartingStats(): Stats;
}

export default ICharacterClass;