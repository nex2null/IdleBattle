import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import SkillEnum from '../Enums/SkillEnum';
import TauntedEffect from '../BattleEffects/TauntedEffect';

class TauntSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.Taunt;
  targetType: TargetTypeEnum;
  readonly mpCost: number;
  turns: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 5 + ((this.level - 1) * 2);
    this.name = 'Taunt';
    this.targetType = TargetTypeEnum.Single;
    this.turns = Math.ceil(slvl / 2);
  }

  // Get the skill description
  getDescription(): string {
    return `Taunts an enemy. Any action the enemy takes that would target a single target will target you.\n\nDuration = slvl / 2 (rounded up)`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 0;
      case 1: return 4;
      case 2: return 8;
      case 3: return 12;
      case 4: return 16;
      case 5: return 20;
      case 6: return 24;
      case 7: return 28;
      case 8: return 32;
      case 9: return 36;
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
    battleLog.addMessage(`${character.name} taunts ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Inflict taunted on the target
    var damageReductionPercent = this.isMastered ? .25 : null;
    var tauntedEffect = new TauntedEffect(target, character, this.turns, damageReductionPercent);
    character.inflictEffect(tauntedEffect, target, battleLog);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default TauntSkill;