import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class ChilledEffect extends BaseEffect {

  // Properties
  stacks: number;
  removedSpeed: number;
  decayTurns: number;

  // Constructor
  constructor(character: BattleCharacter) {
    super(character, BattleEffectEnum.Chilled, '{blue-bg}{white-fg}CHL{/white-fg}{/blue-bg}');
    this.stacks = 1;
    this.decayTurns = 3;
    this.removedSpeed = 0;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} is chilled`;
  }

  onApply(): void {

    // If no existing chill effect was found, then add this one
    var existingChill = this.character.effects.find(x => x.type == this.type);
    if (!existingChill) {
      this.handleSpeedReduction();
      super.onApply();
      return;
    }

    // If an existing chill effect was found, then add a stack
    (<ChilledEffect>existingChill).addStack();
  }

  // Add a stack of chill
  addStack() {

    // If the chill effect is not yet at 5 stacks, then add a stack
    // and process the speed reduction
    if (this.stacks < 5) {
      this.stacks++;
      this.handleSpeedReduction();
    }

    // Reset decay turns
    this.decayTurns = 3;
  }

  // Handle reducing the character's speed
  handleSpeedReduction() {

    // First give back any previously removed speed
    this.returnRemovedSpeed();

    // Remove speed based on current stacks - 5% off base speed per stack
    this.removedSpeed = Math.floor(this.character.baseStats.speed * .05 * this.stacks);
    this.character.currentStats.speed -= this.removedSpeed;

    // Update ui code based on stacks
    this.uiCode = `{blue-bg}{white-fg}CHL${this.stacks}{/white-fg}{/blue-bg}`;
  }

  // Return speed to character
  returnRemovedSpeed() {
    if (this.removedSpeed != 0) {
      this.character.currentStats.speed += this.removedSpeed;
      this.removedSpeed = 0;
    }
  }

  // Handle before an action is performed
  beforeActionPerformed() {

    // Reduce the turns it will take for a stack to decay
    this.decayTurns--;

    // If the turns are up, decay the stack by 1
    if (this.decayTurns <= 0) {
      this.stacks--;
      this.decayTurns = 3;
      this.handleSpeedReduction();
    }

    // If there are no more stacks, remove the effect
    if (this.stacks <= 0)
      this.character.removeEffect(this);
  }

  // Handle when the effect is removed
  onRemove() {
    this.returnRemovedSpeed();
  }
}

export default ChilledEffect;