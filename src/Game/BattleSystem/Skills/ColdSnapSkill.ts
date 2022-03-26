import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import FrozenEffect from '../BattleEffects/FrozenEffect';

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

    // Remove the chilled effect
    var chillEffect = target.getEffect(BattleEffectEnum.Chilled);
    if (chillEffect)
      target.removeEffect(chillEffect);
    
    // Freeze the target
    var frozenEffect = new FrozenEffect(target);
    character.inflictEffect(frozenEffect, target, battleLog);

    // If this skill is mastered, the character immediately gains 250 charge
    if (this.isMastered)
      character.increaseCharge(250);
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.getEffect(BattleEffectEnum.Frozen) == null && target.getEffect(BattleEffectEnum.Chilled) != null;
  }
}

export default ColdSnapSkill;