import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class TauntedEffect extends BaseEffect {

  // Properties
  remainingTurns: number;
  taunter: BattleCharacter;

  // Constructor
  constructor(character: BattleCharacter, taunter: BattleCharacter, turns: number) {
    super(character, BattleEffectEnum.Taunted, '{white-bg}{black-fg}TNT{/black-fg}{/white-bg}', false);
    this.remainingTurns = turns;
    this.taunter = taunter;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} is taunted`;
  }

  // Set the remaining turns
  setRemainingTurns(turns: number) {
    this.remainingTurns = turns;
  }

  // Handle when the effect is applied
  onApply(): void {

    // If an existing taunt was found then remove it
    var existingTaunt = this.character.effects.find(x => x.type == this.type);
    if (existingTaunt) {
      this.character.removeEffect(existingTaunt);
    }

    // Apply this effect
    super.onApply();
  }

  // Handle after an action is performed
  afterActionPerformed() {
    this.remainingTurns--;
    if (this.remainingTurns <= 0) {
      this.character.removeEffect(this);
    }
  }

  // Determine if this character must target a character with actions
  getForceTarget(): BattleCharacter | null {
    return this.taunter;
  }
}

export default TauntedEffect;