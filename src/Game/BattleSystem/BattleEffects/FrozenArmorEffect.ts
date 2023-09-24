import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleDamage from '../BattleDamage';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import RandomHelpers from '../../Utilities/RandomHelpers';
import BattleLog from '../BattleLog';
import ChilledEffect from './ChilledEffect';

class FrozenArmorEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  addedColdResistance: number = 0;
  applyToAllDamage: boolean;

  // Constructor
  constructor(character: BattleCharacter, turns: number, addedColdResistance: number, applyToAllDamage: boolean) {
    super(character, BattleEffectEnum.FrozenArmor, '{blue-bg}{white-fg}FZA{/white-fg}{/blue-bg}', false);
    this.turnsLeft = turns;
    this.addedColdResistance = addedColdResistance;
    this.applyToAllDamage = applyToAllDamage;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName}'s armor is enchanted with frost`;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle when the effect is applied
  onApply() {

    // Add cold resistance to the character
    this.character.currentStats.coldResistance += this.addedColdResistance;

    // Process base apply
    super.onApply();
  }

  // Handle when the effect is removed
  onRemove() {
    this.character.currentStats.coldResistance -= this.addedColdResistance;
  }

  // Handle after an action is performed
  afterActionPerformed(): void {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage, attacker: BattleCharacter | null, battleLog: BattleLog) {

    // Determine if the damage can chill
    var physicalDamage = damage.amounts.get(DamageTypeEnum.Physical);
    var canChill = damage.getTotalAmount() > 0 && (this.applyToAllDamage || (physicalDamage && physicalDamage > 0));

    // If we can chill, then roll for chill
    if (canChill && attacker) {
      var chillSuccess = RandomHelpers.getRandomInt(1, 100) <= 50;
      if (chillSuccess) {
        var chillEffect = new ChilledEffect(attacker);
        this.character.inflictEffect(chillEffect, attacker, battleLog);
      }
    }
  }
}

export default FrozenArmorEffect;