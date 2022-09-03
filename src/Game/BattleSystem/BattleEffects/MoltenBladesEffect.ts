import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleDamage from '../BattleDamage';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import RandomHelpers from '../../Utilities/RandomHelpers';
import BattleLog from '../BattleLog';
import BurningEffect from './BurningEffect';

class MoltenBladesEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  addedFireDamage: number;

  // Constructor
  constructor(character: BattleCharacter, turns: number, addedFireDamage: number) {
    super(character, BattleEffectEnum.MoltenBlades, '{#FFA500-fg}MLB{/}', false);
    this.turnsLeft = turns;
    this.addedFireDamage = addedFireDamage;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName}'s weapon is enchanted with flame`;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle before damage is dealt
  beforeDamageDealt(damage: BattleDamage, target: BattleCharacter): void {

    // If there is a physical damage component, add fire damage to it
    var physicalDamage = damage.getDamageByType(DamageTypeEnum.Physical);
    var addedFireDamage = physicalDamage * this.addedFireDamage;
    damage.addDamage(addedFireDamage, DamageTypeEnum.Fire);
  }

  // Handle after damage is dealt
  afterDamageDealt(damage: BattleDamage, target: BattleCharacter, battleLog: BattleLog): void {

    // If there is no physical damage, there is nothing to do
    var physicalDamage = damage.getDamageByType(DamageTypeEnum.Physical);
    if (!physicalDamage)
      return;

    // Check for burn
    var applyBurn = target.isAlive() && RandomHelpers.getRandomInt(1, 100) <= 25;
    if (applyBurn) {
      var baseBurnDamage = physicalDamage * .5;
      var burningEffect = new BurningEffect(target, this.character, 4, baseBurnDamage);
      this.character.inflictEffect(burningEffect, target, battleLog);
    }
  }

  // Handle after an action is performed
  afterActionPerformed() {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }
}

export default MoltenBladesEffect;