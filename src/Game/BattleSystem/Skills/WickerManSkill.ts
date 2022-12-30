import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';
import BurningEffect from '../BattleEffects/BurningEffect';
import WickerManEffect from '../BattleEffects/WickerManEffect';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class WickerManSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.WickerMan;
  readonly mpCost: number;
  targetType: TargetTypeEnum;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + ((this.level - 1) * 2);
    this.name = 'Wicker Man';
    this.targetType = TargetTypeEnum.Self;
  }

  // Get the skill description
  getDescription(): string {
    return `Inflict burning on yourself to increase your fire power.`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 12;
      case 1: return 16;
      case 2: return 20;
      case 3: return 24;
      case 4: return 28;
      case 5: return 32;
      case 6: return 36;
      case 7: return 40;
      case 8: return 44;
      case 9: return 48;
      default: return 1000;
    }
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  // Calculate base damage
  calculateBurnDamage(user: BattleCharacter): number {
    return user.currentStats.maxHp * .05 * this.level;
  }

  // Calculate the increase to the character's fire power
  calculateFirePowerIncrease(user: BattleCharacter): number {
    return .05 * this.level * user.baseStats.firePower;
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog,
    damageTracker: DamageTracker
  ) {

    // Log
    battleLog.addMessage(`${character.name} uses Wicker Man!`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Apply the burn to yourself
    var burnDamage = this.calculateBurnDamage(character);
    var burnEffect = new BurningEffect(character, character, 4, burnDamage);
    character.inflictEffect(burnEffect, character, battleLog);

    // Apply wicker man effect - increasing fire power
    var increasedFirePower = this.calculateFirePowerIncrease(character);
    var wickerManEffect = new WickerManEffect(character, increasedFirePower, this.isMastered, 5);
    character.inflictEffect(wickerManEffect, character, battleLog);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.WickerMan) == null;
  }
}

export default WickerManSkill;