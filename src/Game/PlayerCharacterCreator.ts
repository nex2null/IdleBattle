import GambitConditionEnum from "./BattleSystem/Enums/GambitConditionEnum";
import SkillEnum from "./BattleSystem/Enums/SkillEnum";
import Gambit from "./BattleSystem/Gambits/Gambit";
import CharacterClassFactory from "./CharacterClasses/CharacterClassFactory";
import CharacterClassEnum from "./Enums/CharacterClassEnum";
import PlayerCharacter from "./PlayerCharacter";
import PlayerSkill from "./PlayerSkill";
import Stats from "./Stats";

class PlayerCharacterCreator {

  static createPlayerCharacter(
    characterClassEnum: CharacterClassEnum,
    characterName: string): PlayerCharacter {

    // Basic skills for all characters
    var skills = [
      new PlayerSkill(SkillEnum.Attack, 1, false),
      new PlayerSkill(SkillEnum.Defend, 1, false)
    ];

    // Add class-specific skills
    var characterClass = CharacterClassFactory.getCharacterClass(characterClassEnum);
    skills = skills.concat(characterClass.getStartingSkills());

    // Grab starting stats
    var stats = characterClass.getStartingStats();

    // Setup some default gambits
    var defaultGambits = [
      new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack)
    ];

    return new PlayerCharacter({
      name: characterName,
      level: 1,
      stats: stats,
      gambits: defaultGambits,
      primaryClass: characterClassEnum,
      skills: skills
    })
  }
}

export default PlayerCharacterCreator;