import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleLog from '../BattleLog';

class CrusadersPrayerEffect extends BaseEffect {

  // Properties
  startingTurns: number;
  turnsLeft: number;
  healAmount: number = 0;

  // Constructor
  constructor(character: BattleCharacter, turns: number, healAmount: number) {
    super(character, BattleEffectEnum.CrusadersPrayer, '{white-bg}{green-fg}CPR{/green-fg}{/white-bg}');
    this.startingTurns = this.turnsLeft = turns;
    this.healAmount = healAmount;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} receives the crusade's blessing`;
  }

  // Handle before an action is performed
  beforeActionPerformed(battleLog: BattleLog) {

    // Heal the character
    this.character.receiveHeal(this.healAmount, battleLog);

    // Reduce the turns
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }

  // Refreshes the number of turns 
  refreshTurns() {
    this.turnsLeft = this.startingTurns;
  }
}

export default CrusadersPrayerEffect;