import GambitConditionEnum from "../BattleSystem/Enums/GambitConditionEnum";
import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import Gambit from "../BattleSystem/Gambits/Gambit";
import CharacterClassEnum from "../Enums/CharacterClassEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";
import ICharacterClass from "./ICharacterClass";

class PaladinClass implements ICharacterClass {

  // Gets the CharacterClassEnum for the class
  getEnum(): CharacterClassEnum {
    return CharacterClassEnum.Paladin;
  }

  // Gets the name of the class
  getName(): string {
    return 'Paladin'
  }

  // Gets the description of the class
  getDescription(): string {
    return 'A Paladin is a holy warrior.\n\nThey augment their melee attacks with fire, and heal their allies.'
  }

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[] {
    return [
      new PlayerSkill(SkillEnum.HolyStrike, 1, false)
    ];
  }

  // Gets the starting gambits
  getStartingGambits(): Gambit[] {
    return [
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.HolyStrike),
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
    ];
  }

  // Get stats the class starts with
  getStartingStats(): Stats {
    return new Stats({
      maxHp: 70,
      maxMp: 50,
      strength: 5,
      intelligence: 4
    });
  }

  // Get the stat increases on level up
  getLevelUpStatIncreases(newLevel: number): Stats {
    return new Stats({
      maxHp: 4,
      maxMp: 4,
      intelligence: 1,
      strength: 1
    });
  }

  // Get new skills on level up
  getLevelUpSkills(newLevel: number): Array<SkillEnum> {
    switch (newLevel) {
      case 6: return [SkillEnum.Heal];
      case 12: return [SkillEnum.CrusadersPrayer];
      case 18: return [SkillEnum.Purify];
      case 24: return [SkillEnum.Martyrdom];
      case 30: return [SkillEnum.SacredFlame];
      default: return [];
    }
  }

  // Get the required amount of XP to level up
  getRequiredXpToLevel(newLevel: number): number {
    return newLevel * newLevel * newLevel + 200;
  }
}

export default PaladinClass;