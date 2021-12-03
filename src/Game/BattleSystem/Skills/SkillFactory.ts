import SkillEnum from "../Enums/SkillEnum";
import AttackSkill from "./AttackSkill";
import DefendSkill from "./DefendSkill";
import ISkill from "./ISkill";
import PowerStrikeSkill from "./PowerStrikeSkill";
import WebShootSkill from "./WebShootSkill";

class SkillFactory {
  static getSkill(skill: SkillEnum): ISkill {
    switch (skill) {
      case SkillEnum.Attack: return new AttackSkill();
      case SkillEnum.Defend: return new DefendSkill();
      case SkillEnum.PowerStrike: return new PowerStrikeSkill();
      case SkillEnum.WebShoot: return new WebShootSkill();
    }
  }
}

export default SkillFactory;