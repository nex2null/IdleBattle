import SkillEnum from "../Enums/SkillEnum";
import AttackSkill from "./AttackSkill";
import DefendSkill from "./DefendSkill";
import IceBoltSkill from "./IceBoltSkill";
import ISkill from "./ISkill";
import PowerStrikeSkill from "./PowerStrikeSkill";
import WebShootSkill from "./WebShootSkill";

class SkillFactory {
  static getSkill(skill: SkillEnum, slvl: number, mastered: boolean): ISkill {
    switch (skill) {
      case SkillEnum.Attack: return new AttackSkill();
      case SkillEnum.Defend: return new DefendSkill();
      case SkillEnum.PowerStrike: return new PowerStrikeSkill();
      case SkillEnum.WebShoot: return new WebShootSkill();
      case SkillEnum.IceBolt: return new IceBoltSkill(slvl, mastered);
    }
  }
}

export default SkillFactory;