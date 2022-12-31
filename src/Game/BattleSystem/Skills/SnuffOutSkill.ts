import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';
import BurningEffect from '../BattleEffects/BurningEffect';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import RandomHelpers from '../../Utilities/RandomHelpers';

class SnuffOutSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.SnuffOut;
  readonly mpCost: number;
  targetType: TargetTypeEnum;
  damageBonus: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 15 + ((this.level - 1) * 2);
    this.name = 'Snuff Out';
    this.targetType = TargetTypeEnum.Single;
    this.damageBonus = .5 + (.1 * slvl);
  }

  // Get the skill description
  getDescription(): string {
    return `Consumes a burning effect on target, immediately dealing its remaining damage.\n\nDamage Bonus: 50% + (slvl * 10%)`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 18;
      case 1: return 22;
      case 2: return 26;
      case 3: return 30;
      case 4: return 34;
      case 5: return 38;
      case 6: return 42;
      case 7: return 46;
      case 8: return 50;
      case 9: return 54;
      default: return 1000;
    }
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  // Calculate the damage
  calculateDamage(burningEffect: BurningEffect): BattleDamage {

    // Modify the damage by the damage bonus
    var damage = burningEffect.getRemainingDamage();
    damage *= (1 + this.damageBonus);

    // The damage will be dealt as fire
    return new BattleDamage(damage, DamageTypeEnum.Fire);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog,
    damageTracker: DamageTracker,
    allCharacters: Array<BattleCharacter>
  ) {
    // Only first target is ever relevant
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} snuffs out ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Grab the burning effect
    var burningEffect = target.getEffect(BattleEffectEnum.Burning) as BurningEffect;
    if (!burningEffect) {
      return;
    }

    // Calculate the damage on the target
    var damageToDo = this.calculateDamage(burningEffect);

    // Remove the burning effect from the target
    target.removeEffect(burningEffect);

    // Deal the damage
    character.dealDamage(damageToDo, target, battleLog, damageTracker);

    // If the target died reset the burn and re-apply to a random target
    if (this.isMastered && !target.isAlive()) {

      // Grab the valid targets for the burn
      var validTargets = allCharacters.filter(x =>
        x != target &&
        x.characterType == target.characterType &&
        x.isAlive());

      // If there are no valid targets we are done
      if (validTargets.length == 0) {
        return;
      }

      // Grab a random target from the list and apply a reset copy of the burn effect to it
      var burnTarget = RandomHelpers.getRandomElementFromArray(validTargets)!;
      var newBurnEffect = new BurningEffect(burnTarget, character, burningEffect.startingTurns, burningEffect.baseBurnAmount);
      burnTarget.applyEffect(newBurnEffect, battleLog);
    }
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.Burning) != null;
  }
}

export default SnuffOutSkill;