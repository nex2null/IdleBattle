import TargetTypeEnum from '../Enums/TargetTypeEnum';
import SlowedEffect from '../BattleEffects/SlowedEffect';
import ISkill from './ISkill';
import { calculateHit } from '../BattleFormulas';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class WebShootSkill implements ISkill {

  // Properties
  name: string;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Web Shoot';
    this.targetType = TargetTypeEnum.Single;
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

    // Determine if the attack hits
    var attackHits = calculateHit(character, target);

    // If the attack hits then apply the slow
    if (attackHits) {
      var slowedEffect = new SlowedEffect(target, 3);
      character.inflictEffect(slowedEffect, target, battleLog);
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.getEffect(BattleEffectEnum.Slowed) == null;
  }
}

export default WebShootSkill;