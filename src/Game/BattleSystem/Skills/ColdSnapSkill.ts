import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import FrozenEffect from '../BattleEffects/FrozenEffect';
import { calculateStatusEffectHit } from '../BattleFormulas';

class ColdSnapSkill implements ISkill {

  // Constants
  readonly frozenArmorTurns: number = 4;

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.ColdSnap;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 20 - this.level * 2;
    this.name = 'Cold Snap';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Immediately freezes a target. Can only be used on an enemy with the 'chilled' status.`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 18;
      case 1: return 22;
      case 2: return 26;
      case 3: return 30;
      case 4: return 34;
      case 5: return 38;
      case 6: return 42;
      case 7: return 46;
      case 8: return 50;
      case 9: return 54;
      default: return 1000;
    }
  }

  // Get a valid target given a list of targets
  getValidTargets(targets: Array<BattleCharacter>) {
    return targets.filter(x => x.getEffect(BattleEffectEnum.Chilled));
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {

    // If we don't have enough mp we can't cast
    if (!character.canSpendMp(this.mpCost))
      return false;

    // If this skill is on cooldown we can't cast it
    if (character.isOnCooldown(this.skillEnum))
      return false;

    // Make sure there is a valid target
    return this.getValidTargets(targets).length > 0;
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog
  ) {

    // Grab the first valid target
    var target = this.getValidTargets(targets)[0];

    // Log
    battleLog.addMessage(`${character.name} uses cold snap on ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine if the freeze is resisted
    var freezeResisted = !calculateStatusEffectHit(character, target);
    if (freezeResisted) {
      battleLog.addMessage(`${target.name} resists!`);
      return;
    }

    // Remove the chilled effect
    var chillEffect = target.getEffect(BattleEffectEnum.Chilled);
    if (chillEffect)
      target.removeEffect(chillEffect);
    
    // Freeze the target
    var frozenEffect = new FrozenEffect(target);
    character.inflictEffect(frozenEffect, target, battleLog);

    // If this skill is mastered, the character immediately gains 125 charge
    if (this.isMastered)
      character.increaseCharge(125);

    // Add a cooldown for this skill for 5 full turns
    character.addCooldown(this.skillEnum, 6);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.Frozen) == null && target.getEffect(BattleEffectEnum.Chilled) != null;
  }
}

export default ColdSnapSkill;