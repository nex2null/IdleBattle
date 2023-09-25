import GambitConditionEnum from "../BattleSystem/Enums/GambitConditionEnum";
import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import Gambit from "../BattleSystem/Gambits/Gambit";
import CharacterClassEnum from "../Enums/CharacterClassEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";
import ICharacterClass from "./ICharacterClass";

class CryomancerClass implements ICharacterClass {

  // Gets the CharacterClassEnum for the class
  getEnum(): CharacterClassEnum {
    return CharacterClassEnum.Cryomancer;
  }

  // Gets the name of the class
  getName(): string {
    return 'Cryomancer'
  }

  // Gets the description of the class
  getDescription(): string {
    return 'A Cryomancer is an expert in cold magic.\n\nThey control the battlefield with various chilling effects and offensive spells.'
  }

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[] {
    return [
      new PlayerSkill(SkillEnum.IceBolt, 1, false)
    ];
  }

  // Gets the starting gambits
  getStartingGambits(): Gambit[] {
    return [
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.IceBolt),
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
    ];
  }

  // Get stats the class starts with
  getStartingStats(): Stats {
    return new Stats({
      maxHp: 50,
      maxMp: 75,
      strength: 2,
      intelligence: 6,
      mpRegen: 2
    });
  }

  // Get the stat increases on level up
  getLevelUpStatIncreases(newLevel: number): Stats {
    return new Stats({
      maxHp: 3,
      maxMp: 5,
      intelligence: 2,
      mpRegen: 1,
    });
  }

  // Get new skills on level up
  getLevelUpSkills(newLevel: number): Array<SkillEnum> {
    switch (newLevel) {
      case 6: return [SkillEnum.FrozenBlades];
      case 12: return [SkillEnum.FrozenArmor];
      case 18: return [SkillEnum.ColdSnap];
      default: return [];
    }
  }

  // Get the required amount of XP to level up
  getRequiredXpToLevel(newLevel: number): number {
    return newLevel * newLevel * newLevel + 200;
  }
}

export default CryomancerClass;