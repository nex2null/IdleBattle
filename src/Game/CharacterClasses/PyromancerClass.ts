import GambitConditionEnum from "../BattleSystem/Enums/GambitConditionEnum";
import SkillEnum from "../BattleSystem/Enums/SkillEnum";
import Gambit from "../BattleSystem/Gambits/Gambit";
import CharacterClassEnum from "../Enums/CharacterClassEnum";
import PlayerSkill from "../PlayerSkill";
import Stats from "../Stats";
import ICharacterClass from "./ICharacterClass";

class PyromancerClass implements ICharacterClass {

  // Gets the CharacterClassEnum for the class
  getEnum(): CharacterClassEnum {
    return CharacterClassEnum.Pyromancer;
  }

  // Gets the name of the class
  getName(): string {
    return 'Pyromancer'
  }

  // Gets the description of the class
  getDescription(): string {
    return 'A Pyromancer is a maniacal user of fire magic.\n\nThey wield incredibly offensive spells that inflict lingering burns on their victims.'
  }

  // Gets skills the class starts with
  getStartingSkills(): PlayerSkill[] {
    return [
      new PlayerSkill(SkillEnum.Fireball, 1, false)
    ];
  }

  // Gets the starting gambits
  getStartingGambits(): Gambit[] {
    return [
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Fireball),
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
    ];
  }

  // Get stats the class starts with
  getStartingStats(): Stats {
    return new Stats({
      maxHp: 50,
      maxMp: 75,
      strength: 2,
      intelligence: 6
    });
  }

  // Get the stat increases on level up
  getLevelUpStatIncreases(newLevel: number): Stats {
    return new Stats({
      maxHp: 3,
      maxMp: 2,
      intelligence: 2
    });
  }

  // Get new skills on level up
  getLevelUpSkills(newLevel: number): Array<SkillEnum> {
    switch (newLevel) {
      case 6: return [SkillEnum.MoltenBlades];
      case 12: return [SkillEnum.WickerMan];
      case 18: return [SkillEnum.SnuffOut];
      default: return [];
    }
  }

  // Get the required amount of XP to level up
  getRequiredXpToLevel(newLevel: number): number {
    return newLevel * newLevel * newLevel + 200;
  }
}

export default PyromancerClass;