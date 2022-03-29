import { calculateHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';

class HolyStrikeSkill implements ISkill {

  // Properties
  name: string;
  skillEnum: SkillEnum = SkillEnum.HolyStrike;
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.name = 'Holy Strike';
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 5 + this.level - 1;
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Channels your faith into your weapon dealing physical damage as well as fire damage.`;
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

  // Calculate the attack damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    // Calculate physical component
    var physicalModifier = 1 + (this.level * .2);
    var physicalDamage = user.currentStats.strength * physicalModifier;

    // Calculate fire component
    var fireModifier = .5 + (this.level * .2);
    var fireDamage = user.currentStats.intelligence * fireModifier;

    // Create the damage
    var baseDamage = new BattleDamage(physicalDamage, DamageTypeEnum.Physical);
    baseDamage.addDamage(fireDamage, DamageTypeEnum.Fire);

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
    // Only first target is ever relevant
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} holy strike's ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine if the attack hits
    var attackHits = calculateHit(character, target);

    // If the attack hits calculate damage
    if (attackHits) {

      // Calculate the damage on the target
      var damageToDo = this.calculateDamage(character, target);

      // Deal damage
      character.dealDamage(damageToDo, target, battleLog, damageTracker);

      // TODO: Mastery
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is benefecial
  isBeneficialOn(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default HolyStrikeSkill;