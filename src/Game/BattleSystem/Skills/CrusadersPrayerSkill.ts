import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import { processHeal } from '../BattleFormulas';
import CrusadersPrayerEffect from '../BattleEffects/CrusadersPrayerEffect';

class CrusadersPrayerSkill implements ISkill {

  // Constants
  readonly effectTurns: number = 4;

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.CrusadersPrayer;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 13 + (this.level * 2);
    this.name = "Crusader's Prayer";
    this.targetType = this.isMastered ? TargetTypeEnum.Single : TargetTypeEnum.Self;
  }

  // Get the skill description
  getDescription(): string {
    return `Bless yourself with the Crusade's fervor, replenishing health every turn.`;
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

  // Calculate the heal amount
  calculateAmount(user: BattleCharacter, target: BattleCharacter) {

    // Calculate base heal
    var baseHealAmount = 15 + (this.level * 10);

    // Return the processed heal amount
    return processHeal(user, target, baseHealAmount);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog
  ) {

    // If the skill is unmastered the target is always the caster, otherwise
    // grab the first target
    var target = this.isMastered ? targets[0] : character;

    // Log
    if (target === character)
      battleLog.addMessage(`${character.name} uses crusader's prayer`);
    else
      battleLog.addMessage(`${character.name} uses crusader's prayer on ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Calculate heal amount
    var healAmount = this.calculateAmount(character, target);

    // Inflict crusader's prayer effect on target
    var crusadersPrayerEffect = new CrusadersPrayerEffect(target, this.effectTurns, healAmount);
    character.inflictEffect(crusadersPrayerEffect, target, battleLog);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.CrusadersPrayer) == null;
  }
}

export default CrusadersPrayerSkill;