import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleDamage from '../BattleDamage';

class TauntedEffect extends BaseEffect {

  // Properties
  remainingTurns: number;
  taunter: BattleCharacter;
  taunterDamageReductionPercent: number | null;

  // Constructor
  constructor(character: BattleCharacter, taunter: BattleCharacter, turns: number, taunterDamageReductionPercent: number | null) {
    super(character, BattleEffectEnum.Taunted, '{white-bg}{black-fg}TNT{/black-fg}{/white-bg}', false);
    this.remainingTurns = turns;
    this.taunter = taunter;
    this.taunterDamageReductionPercent = taunterDamageReductionPercent;
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

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage, attacker: BattleCharacter | null): void {
    
    // If the attacker is dealing the damage, then reduce the damage by the amount specified
    if (attacker == this.taunter && this.taunterDamageReductionPercent) {
      damage.reduceByPercentage(this.taunterDamageReductionPercent);
    }
  }
}

export default TauntedEffect;