import TargetTypeEnum from '../Enums/TargetTypeEnum';
import SlowedEffect from '../BattleEffects/SlowedEffect';
import ISkill from './ISkill';
import { calculateHit, calculateStatusEffectHit } from '../BattleFormulas';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';

class WebShootSkill implements ISkill {

  // Properties
  name: string;
  skillEnum: SkillEnum = SkillEnum.WebShoot;
  level: number = 1;
  maxLevel: number = 1;
  isMastered: boolean = false;
  isGeneric: boolean = false;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Web Shoot';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `TODO: WEB SHOOT`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 1: return 2;
      case 2: return 3;
      case 3: return 4;
      case 4: return 5;
      case 5: return 6;
      case 6: return 7;
      case 7: return 8;
      case 8: return 9;
      case 9: return 10;
      default: return 1000;
    }
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return true;
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog
  ) {
    // Only first target is ever relevant
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} shoots a sticky web at ${target.name}.`);

    // Determine if the slow hits
    var slowHits = calculateStatusEffectHit(character, target);

    // If the slow hits then apply the slow
    if (slowHits) {
      var slowedEffect = new SlowedEffect(target, 3);
      character.inflictEffect(slowedEffect, target, battleLog);
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.Slowed) == null;
  }
}

export default WebShootSkill;