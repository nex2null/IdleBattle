import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleDamage from '../BattleDamage';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import RandomHelpers from '../../Utilities/RandomHelpers';
import ChilledEffect from './ChilledEffect';
import BattleLog from '../BattleLog';
import FrozenEffect from './FrozenEffect';

class FrozenBladesEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  addedColdDamage: number;
  canFreeze: boolean;

  // Constructor
  constructor(character: BattleCharacter, turns: number, addedColdDamage: number, canFreeze: boolean) {
    super(character, BattleEffectEnum.FrozenBlades, '{blue-bg}{white-fg}FZB{/white-fg}{/blue-bg}', false);
    this.turnsLeft = turns;
    this.addedColdDamage = addedColdDamage;
    this.canFreeze = canFreeze;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName}'s weapon is enchanted with frost`;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle before damage is dealt
  beforeDamageDealt(damage: BattleDamage, target: BattleCharacter): void {

    // If there is a physical damage component, add cold damage to it
    var physicalDamage = damage.getDamageByType(DamageTypeEnum.Physical);
    var addedColdDamage = physicalDamage * this.addedColdDamage;
    damage.addDamage(addedColdDamage, DamageTypeEnum.Cold);
  }

  // Handle after damage is dealt
  afterDamageDealt(damage: BattleDamage, target: BattleCharacter, battleLog: BattleLog): void {

    // If there is no physical damage, there is nothing to do
    if (!damage.getDamageByType(DamageTypeEnum.Physical))
      return;

    // Check for frozen
    var applyFrozen = target.isAlive() && this.canFreeze && RandomHelpers.getRandomInt(1, 100) <= 5;
    if (applyFrozen) {
      var frozenEffect = new FrozenEffect(target);
      this.character.inflictEffect(frozenEffect, target, battleLog);
    }

    // Check for chill
    var applyChill = target.isAlive() && !applyFrozen && RandomHelpers.getRandomInt(1, 100) <= 25;
    if (applyChill) {
      var chillEffect = new ChilledEffect(target);
      this.character.inflictEffect(chillEffect, target, battleLog);
    }
  }

  // Handle after an action is performed
  afterActionPerformed() {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }
}

export default FrozenBladesEffect;