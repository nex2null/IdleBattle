import { calculateHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';

class SacredFlameSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.SacredFlame;
  readonly mpCost: number;
  readonly lifePercent: number;
  targetType: TargetTypeEnum;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 0;
    this.lifePercent = .5 + (this.level * .05);
    this.name = 'Sacred Flame';
    this.targetType = TargetTypeEnum.All;
  }

  // Get the skill description
  getDescription(): string {
    return `Consumes your body in flames, dealing damage to yourself to damage all enemies.`;
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

  // Calculate the self damage
  calculateSelfDamage(user: BattleCharacter) {

    var baseDamageAmount = user.currentStats.maxHp * this.lifePercent;
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Fire);

    // Process the base damage (power is ignored)
    return processDamage(user, user, baseDamage, true);
  }

  // Calculate the damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    var baseDamageAmount = user.currentStats.maxHp * this.lifePercent;
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Fire);

    // Process the base damage
    return processDamage(user, target, baseDamage);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog,
    damageTracker: DamageTracker
  ) {

    // Log
    battleLog.addMessage(`${character.name} ignites in sacred flame!`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Damage yourself first
    var selfDamage = this.calculateSelfDamage(character);
    character.takeDamage(selfDamage, null, battleLog, damageTracker);

    // Loop through all targets and deal damage to them
    targets.forEach(target => {

      // Determine if the attack hits
      var attackHits = calculateHit(character, target);

      // If the attack hits calculate damage
      if (attackHits) {

        // Calculate the damage on the target
        var damageToDo = this.calculateDamage(character, target);

        // Deal the damage
        character.dealDamage(damageToDo, target, battleLog, damageTracker);

        // TODO: Mastery
      }
      else {
        battleLog.addMessage(`${target.name} dodges the inferno!`);
      }
    });
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default SacredFlameSkill;