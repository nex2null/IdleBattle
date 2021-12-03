import BattleCharacter from "../BattleCharacter";
import ISkill from "../Skills/ISkill";

class GambitAction {
  skill: ISkill;
  targets: Array<BattleCharacter>;

  constructor(skill: ISkill, targets: Array<BattleCharacter>) {
    this.skill = skill;
    this.targets = targets;
  }
}

export default GambitAction;