import SkillEnum from "../Enums/SkillEnum";
import AttackSkill from "./AttackSkill";
import ColdSnapSkill from "./ColdSnapSkill";
import CombustSkill from "./CombustSkill";
import CrusadersPrayerSkill from "./CrusadersPrayerSkill";
import DefendSkill from "./DefendSkill";
import FireballSkill from "./FireballSkill";
import FocusSkill from "./FocusSkill";
import FrozenArmorSkill from "./FrozenArmorSkill";
import FrozenBladesSkill from "./FrozenBladesSkill";
import HealSkill from "./HealSkill";
import HolyStrikeSkill from "./HolyStrikeSkill";
import IceBoltSkill from "./IceBoltSkill";
import ISkill from "./ISkill";
import MartyrdomSkill from "./MartyrdomSkill";
import MoltenBladesSkill from "./MoltenBladesSkill";
import PowerStrikeSkill from "./PowerStrikeSkill";
import PurifySkill from "./PurifySkill";
import SacredFlameSkill from "./SacredFlameSkill";
import WebShootSkill from "./WebShootSkill";
import WickerManSkill from "./WickerManSkill";

class SkillFactory {
  static getSkill(skill: SkillEnum, slvl: number, mastered: boolean): ISkill {
    switch (skill) {
      case SkillEnum.Attack: return new AttackSkill();
      case SkillEnum.Defend: return new DefendSkill();
      case SkillEnum.Focus: return new FocusSkill();
      case SkillEnum.PowerStrike: return new PowerStrikeSkill(slvl, mastered);
      case SkillEnum.WebShoot: return new WebShootSkill();
      case SkillEnum.IceBolt: return new IceBoltSkill(slvl, mastered);
      case SkillEnum.FrozenBlades: return new FrozenBladesSkill(slvl, mastered);
      case SkillEnum.FrozenArmor: return new FrozenArmorSkill(slvl, mastered);
      case SkillEnum.ColdSnap: return new ColdSnapSkill(slvl, mastered);
      case SkillEnum.HolyStrike: return new HolyStrikeSkill(slvl, mastered);
      case SkillEnum.Heal: return new HealSkill(slvl, mastered);
      case SkillEnum.CrusadersPrayer: return new CrusadersPrayerSkill(slvl, mastered);
      case SkillEnum.Purify: return new PurifySkill(slvl, mastered);
      case SkillEnum.Martyrdom: return new MartyrdomSkill(slvl, mastered);
      case SkillEnum.SacredFlame: return new SacredFlameSkill(slvl, mastered);
      case SkillEnum.Fireball: return new FireballSkill(slvl, mastered);
      case SkillEnum.MoltenBlades: return new MoltenBladesSkill(slvl, mastered);
      case SkillEnum.WickerMan: return new WickerManSkill(slvl, mastered);
      case SkillEnum.Combust: return new CombustSkill(slvl, mastered);
    }
  }
}

export default SkillFactory;