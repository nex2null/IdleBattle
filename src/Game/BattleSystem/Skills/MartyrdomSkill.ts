import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import MartyrdomEffect from '../BattleEffects/MartyrdomEffect';

class MartyrdomSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.Martyrdom;
  targetType: TargetTypeEnum;
  readonly mpCost: number;
  readonly damageReductionAmount: number;
  readonly numberOfTimesToRedirect: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + ((this.level - 1) * 2);
    this.damageReductionAmount = .25 + (this.level * .025);
    this.numberOfTimesToRedirect = isMastered ? 2 : 1;
    this.name = "Martyrdom";
    this.targetType = TargetTypeEnum.NotSelf;
  }

  // Get the skill description
  getDescription(): string {
    return `Redirects the next source of damage a target would take. Also reduces the received damage.`;
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

    // Grab the first target
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} uses martyrdom on ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Inflict martyrdom effect on target
    var martyrdomEffect = new MartyrdomEffect(target, character, this.numberOfTimesToRedirect, this.damageReductionAmount);
    character.inflictEffect(martyrdomEffect, target, battleLog);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.Martyrdom) == null;
  }
}

export default MartyrdomSkill;