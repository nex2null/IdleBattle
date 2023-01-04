import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class LastStandEffect extends BaseEffect {

  // Properties
  turnsLeft: number;
  addedHp: number;
  minimumHpPercent: number | null;

  // Constructor
  constructor(character: BattleCharacter, addedHp: number, turns: number, minimumHpPercent: number | null) {
    super(character, BattleEffectEnum.LastStand, '{white-bg}{green-fg}LST{/}', false);
    this.turnsLeft = turns;
    this.addedHp = Math.round(addedHp);
    this.minimumHpPercent = minimumHpPercent;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} makes their last stand`;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Handle when the effect is applied
  onApply() {

    // Add maximum / current hp to the character
    this.character.currentStats.hp += this.addedHp;
    this.character.currentStats.maxHp += this.addedHp;

    // Process base apply
    super.onApply();
  }

  // Handle when the effect is removed
  onRemove() {

    // Remove the current / maximum hp that was added to the character
    this.character.currentStats.hp -= this.addedHp;
    this.character.currentStats.maxHp -= this.addedHp;

    // If there is a minimum hp percent then ensure we do not
    // reduce the characters hp below it
    if (this.minimumHpPercent != null) {
      var minimumHp = Math.round(this.character.currentStats.maxHp * this.minimumHpPercent);
      if (this.character.currentStats.hp < minimumHp) {
        this.character.currentStats.hp = minimumHp;
      }
    }
  }

  // Handle before an action is performed
  beforeActionPerformed() {
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }
}

export default LastStandEffect;