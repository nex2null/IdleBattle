import SkillEnum from "../Enums/SkillEnum";
import AttackSkill from "./AttackSkill";
import ColdSnapSkill from "./ColdSnapSkill";
import CrusadersPrayerSkill from "./CrusadersPrayerSkill";
import DefendSkill from "./DefendSkill";
import FrozenArmorSkill from "./FrozenArmorSkill";
import FrozenBladesSkill from "./FrozenBladesSkill";
import HealSkill from "./HealSkill";
import HolyStrikeSkill from "./HolyStrikeSkill";
import IceBoltSkill from "./IceBoltSkill";
import ISkill from "./ISkill";
import PowerStrikeSkill from "./PowerStrikeSkill";
import WebShootSkill from "./WebShootSkill";

class SkillFactory {
  static getSkill(skill: SkillEnum, slvl: number, mastered: boolean): ISkill {
    switch (skill) {
      case SkillEnum.Attack: return new AttackSkill();
      case SkillEnum.Defend: return new DefendSkill();
      case SkillEnum.PowerStrike: return new PowerStrikeSkill(slvl, mastered);
      case SkillEnum.WebShoot: return new WebShootSkill();
      case SkillEnum.IceBolt: return new IceBoltSkill(slvl, mastered);
      case SkillEnum.FrozenBlades: return new FrozenBladesSkill(slvl, mastered);
      case SkillEnum.FrozenArmor: return new FrozenArmorSkill(slvl, mastered);
      case SkillEnum.ColdSnap: return new ColdSnapSkill(slvl, mastered);
      case SkillEnum.HolyStrike: return new HolyStrikeSkill(slvl, mastered);
      case SkillEnum.Heal: return new HealSkill(slvl, mastered);
      case SkillEnum.CrusadersPrayer: return new CrusadersPrayerSkill(slvl, mastered);
    }
  }
}

export default SkillFactory;