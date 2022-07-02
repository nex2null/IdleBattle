import { calculateHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import RandomHelpers from '../../Utilities/RandomHelpers';
import CrusadersPrayerEffect from '../BattleEffects/CrusadersPrayerEffect';

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

      // If the skill is mastered and we have an active crusader's prayer on ourself
      // then there is a 20% chance to refresh it
      var crusadersPrayerEffect = character.getEffect(BattleEffectEnum.CrusadersPrayer);
      var shouldRefresh = RandomHelpers.getRandomInt(1, 100) <= 20;
      if (this.isMastered && shouldRefresh && crusadersPrayerEffect)
        (<CrusadersPrayerEffect>crusadersPrayerEffect).refreshTurns();
    }
    else {
      battleLog.addMessage(`${character.name} misses!`)
    }
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive();
  }
}

export default HolyStrikeSkill;