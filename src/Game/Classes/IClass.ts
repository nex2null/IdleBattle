import PlayerSkill from "../PlayerSkill";

interface IClass {

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[];
}

export default IClass;