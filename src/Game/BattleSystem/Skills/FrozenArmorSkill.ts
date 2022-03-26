import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import { getRequiredResistanceForPercentReduction } from '../BattleFormulas';
import FrozenArmorEffect from '../BattleEffects/FrozenArmorEffect';

class FrozenArmorSkill implements ISkill {

  // Constants
  readonly frozenArmorTurns: number = 4;

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.FrozenArmor;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + ((this.level - 1) * 2);
    this.name = 'Frozen Armor';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Enchants a target's armor with frost, increasing cold resistance and chilling attackers on hit.`;
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
    return character.canSpendMp(this.mpCost);
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
    battleLog.addMessage(`${character.name} uses frozen armor on ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // We want to add 5% to total cold resistance per skill level
    var addedColdResistance = getRequiredResistanceForPercentReduction(target, this.level * 5);

    // Inflict frozen armor on the target
    var frozenArmorEffect = new FrozenArmorEffect(target, this.frozenArmorTurns, addedColdResistance, this.isMastered);
    character.inflictEffect(frozenArmorEffect, target, battleLog);
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.getEffect(BattleEffectEnum.FrozenArmor) == null;
  }
}

export default FrozenArmorSkill;