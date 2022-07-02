import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import { getRequiredResistanceForPercentReduction } from '../BattleFormulas';
import FrozenArmorEffect from '../BattleEffects/FrozenArmorEffect';
import PurifyEffect from '../BattleEffects/PurifyEffect';

class PurifySkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.Purify;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + this.level;
    this.name = 'Purify';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Purifies a target, removing negative status effects.\nRemoves 2 effects at level 5, and 3 effects at level 10.`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
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

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  getNumberOfEffectsToRemove(): number {
    if (this.level < 5) return 1;
    if (this.level < 10) return 2;
    return 3;
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
    battleLog.addMessage(`${character.name} uses purify on ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Remove negative effects
    for (var i = 0; i < this.getNumberOfEffectsToRemove(); i++) {
      var effectToRemove = target.effects.find(x => x.isNegative);
      if (!effectToRemove)
        break;
      target.removeEffect(effectToRemove);
    }

    // If the skill is mastered, apply the purify effect for 4 turns
    // increasing status resistance by 25%
    if (this.isMastered) {
      var addedResistance = getRequiredResistanceForPercentReduction(target, 25);
      var purifyEffect = new PurifyEffect(target, addedResistance, 4);
      character.inflictEffect(purifyEffect, target, battleLog);
    }
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && (this.isMastered || target.effects.filter(x => x.isNegative).length > 0);
  }
}

export default PurifySkill;