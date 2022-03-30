import { calculateHit, processHeal } from '../BattleFormulas';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';

class HealSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.Heal;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + ((this.level - 1) * 2);
    this.name = 'Heal';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Heals a single target.`;
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

  // Calculate the heal amount
  calculateAmount(user: BattleCharacter, target: BattleCharacter) {

    // Calculate base heal
    var baseHealAmount = 25 * (this.level + 1);

    // Return the processed heal amount
    return processHeal(user, target, baseHealAmount);
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
    battleLog: BattleLog,
    damageTracker: DamageTracker
  ) {

    // Only first target is ever relevant
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} heals ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine if the heal hits
    var healHits = calculateHit(character, target);

    // If the heal hits then heal the character
    if (healHits) {

      // Calculate the amount to heal
      var healAmount = this.calculateAmount(character, target);

      // Heal the character
      character.healCharacter(target, healAmount, battleLog);
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive() && target.currentStats.hp < target.currentStats.maxHp;
  }
}

export default HealSkill;