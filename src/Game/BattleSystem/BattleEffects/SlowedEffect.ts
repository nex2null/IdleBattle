import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class SlowedEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  removedSpeed: number = 0;

  // Constructor
  constructor(character: BattleCharacter, turnsToSlow: number) {
    super(character, BattleEffectEnum.Slowed, '{white-bg}{blue-fg}SLW{/blue-fg}{/white-bg}');
    this.turnsLeft = turnsToSlow;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle when the effect is applied
  onApply() {

    // Remove 25% of the character's base speed
    this.removedSpeed = Math.floor(this.character.baseStats.speed * .25);
    this.character.currentStats.speed -= this.removedSpeed;

    // Process base apply
    super.onApply();
  }

  // Handle when the effect is removed
  onRemove() {
    // Give the character its speed back
    if (this.removedSpeed)
      this.character.currentStats.speed += this.removedSpeed;
  }

  // Handle before an action is performed
  beforeActionPerformed() {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }
}

export default SlowedEffect;