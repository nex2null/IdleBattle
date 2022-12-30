import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class WickerManEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  increasedFirePower: number = 0;
  isMastered: boolean;

  // Constructor
  constructor(character: BattleCharacter, increasedFirePower: number, isMastered: boolean, turnsLeft: number) {
    super(character, BattleEffectEnum.WickerMan, '{#FFA500-fg}WCK{/}', true);
    this.increasedFirePower = increasedFirePower;
    this.isMastered = isMastered;
    this.turnsLeft = turnsLeft;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return '';
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle when the effect is applied
  onApply() {

    // Increase the character's fire power
    this.character.currentStats.firePower += this.increasedFirePower;

    // Process base apply
    super.onApply();
  }

  // Handle when the effect is removed
  onRemove() {
    // Decrease the character's fire power
    if (this.increasedFirePower)
      this.character.currentStats.firePower -= this.increasedFirePower;
  }

  // Handle after an action is performed
  afterActionPerformed() {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }
}

export default WickerManEffect;