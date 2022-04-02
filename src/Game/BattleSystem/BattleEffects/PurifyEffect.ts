import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class PurifyEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  addedResistance: number;

  // Constructor
  constructor(character: BattleCharacter, addedResistance: number, turns: number) {
    super(character, BattleEffectEnum.Purify, '{green-bg}{white-fg}PUR{/white-fg}{/green-bg}', false);
    this.addedResistance = addedResistance;
    this.turnsLeft = turns;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName}'s resistance to ailments is bolstered`;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle when the effect is applied
  onApply() {

    // Add the status resistance
    this.character.currentStats.statusResistance += this.addedResistance;

    // Process base apply
    super.onApply();
  }

  // Handle when the effect is removed
  onRemove() {
    // Remove the added resistance
    this.character.currentStats.statusResistance -= this.addedResistance;
  }

  // Handle before an action is performed
  beforeActionPerformed() {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }
}

export default PurifyEffect;