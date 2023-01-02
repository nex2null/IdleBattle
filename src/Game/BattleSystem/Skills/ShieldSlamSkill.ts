import { calculateHit, calculateStatusEffectHit, processDamage } from '../BattleFormulas';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import RandomHelpers from '../../Utilities/RandomHelpers';
import StunnedEffect from '../BattleEffects/StunnedEffect';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';
import EquipmentTagEnum from '../../Itemization/Enums/EquipmentTagEnum';
import StatEnum from '../../Enums/StatEnum';
import Equipment from '../../Itemization/Equipment/Equipment';

class ShieldSlamSkill implements ISkill {

  // Properties
  name: string;
  skillEnum: SkillEnum = SkillEnum.ShieldSlam;
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.name = 'Shield Slam';
    this.level = slvl;
    this.isMastered = isMastered;
    this.targetType = TargetTypeEnum.Single;
    this.mpCost = 10 + ((this.level - 1) * 2);
  }

  // Get the skill description
  getDescription(): string {
    return `Requires a shield. Deals damage based on the physical resistance values of the shield.\n\nDamage = (100% + (25% * slvl)) * Physical Resistance Value of Shield`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 6;
      case 1: return 10;
      case 2: return 14;
      case 3: return 18;
      case 4: return 22;
      case 5: return 26;
      case 6: return 30;
      case 7: return 34;
      case 8: return 38;
      case 9: return 42;
      default: return 1000;
    }
  }

  // Grab the character's shield
  getCharacterShield(character: BattleCharacter): Equipment | null {

    // Grab the character's off-hand equipment, if any
    var offhand = character.equipment?.offHand;

    // Return the offhand if it is a shield
    return offhand?.tags.includes(EquipmentTagEnum.Shield) ? offhand : null;
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {

      // Grab the character's shield, if any
      var shield = this.getCharacterShield(character);

      // The character can use the skill if they can afford the MP cost
      // and if they have a shield
      return character.canSpendMp(this.mpCost) && shield != null;
  }

  // Calculate the attack damage
  calculateDamage(user: BattleCharacter, target: BattleCharacter) {

    // Grab the character's shield, if any, and sanity check
    var shield = this.getCharacterShield(user);
    if (shield == null) {
      return new BattleDamage(0, DamageTypeEnum.Physical);
    }

    // Grab the physical resistance stat of the shield
    var physicalResistance = shield.getStatValue(StatEnum.PhysicalResistance);

    // Calculate the base damage amount
    var baseDamageAmount = (1 + (.25 * this.level)) * physicalResistance;
    var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Physical);

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
    battleLog.addMessage(`${character.name} shield slam's ${target.name}`);

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

      // If the target is alive, and this skill is mastered
      // then determine if the target is stunned
      var applyStun = target.isAlive() && this.isMastered && RandomHelpers.getRandomInt(1, 100) <= 25;
      var stunHits = calculateStatusEffectHit(character, target);
      if (applyStun && stunHits) {
        var stunEffect = new StunnedEffect(target, 10);
        character.inflictEffect(stunEffect, target, battleLog);
      }
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

export default ShieldSlamSkill;