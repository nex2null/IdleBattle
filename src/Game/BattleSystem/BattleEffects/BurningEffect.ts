import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleLog from '../BattleLog';
import { processDamage } from '../BattleFormulas';
import BattleDamage from '../BattleDamage';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import DamageTracker from '../DamageTracker';
import WickerManEffect from './WickerManEffect';

class BurningEffect extends BaseEffect {

  // Properties
  sourceCharacter: BattleCharacter
  startingTurns: number;
  turnsLeft: number;
  baseBurnAmount: number = 0;

  // Constructor
  constructor(character: BattleCharacter, sourceCharacter: BattleCharacter, turns: number, baseBurnAmount: number) {
    super(character, BattleEffectEnum.Burning, '{#FFA500-bg}{black-fg}BRN{/}', true);
    this.sourceCharacter = sourceCharacter;
    this.startingTurns = this.turnsLeft = turns;
    this.baseBurnAmount = baseBurnAmount;

    // If the source character is under the effect of a mastered wicker man effect
    // then double the base burn amount unless the burn is being applied to the source character
    var wickerManEffect = sourceCharacter.getEffect(BattleEffectEnum.WickerMan) as WickerManEffect;
    if (wickerManEffect && wickerManEffect.isMastered && sourceCharacter != character) {
      this.baseBurnAmount *= 2;
    }
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} is burning!`;
  }

  // Handle when the effect is applied
  onApply(): void {

    // If no existing burn effect was found, then add this one
    var existingBurn = <BurningEffect>this.character.effects.find(x => x.type == this.type);
    if (!existingBurn) {
      super.onApply();
      return;
    }

    // If an existing burn was found, and we are going to burn for more damage, then reset the burn
    if (existingBurn.baseBurnAmount < this.baseBurnAmount)
      existingBurn.reset(this.baseBurnAmount);
  }

  // Handle before an action is performed
  beforeActionPerformed(battleLog: BattleLog, damageTracker: DamageTracker) {

    // Inflict the burn damage
    var baseDamage = new BattleDamage(this.baseBurnAmount, DamageTypeEnum.Fire);
    var damage = processDamage(this.sourceCharacter, this.character, baseDamage);
    this.character.takeDamage(damage, null, battleLog, damageTracker);

    // Reduce the turns
    this.turnsLeft--;
    if (this.turnsLeft <= 0)
      this.character.removeEffect(this);
  }

  // Reset the burn
  reset(baseBurnAmount: number) {
    this.turnsLeft = this.startingTurns;
    this.baseBurnAmount = baseBurnAmount;
  }

  getRemainingDamage(): number {

    // The remaining damage left to deal is the base damage multiplied
    // by the number of turns remaining
    return this.baseBurnAmount * this.turnsLeft;
  }
}

export default BurningEffect;