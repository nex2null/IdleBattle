import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';

class StunEffect extends BaseEffect {

  // Properties
  stunLength: number;

  // Constructor
  constructor(character: BattleCharacter, stunLength: number) {
    super(character, 'Stunned', '{white-bg}{black-fg}STN{/black-fg}{/white-bg}');
    this.stunLength = stunLength;
  }

  // Whether the effect can be applied
  canApply() {

    // TODO: Refresh stun
    return this.character.getEffect(this.name) == null;
  }

  // Process charge being ticked
  processChargeTick(charge: number): void {

    // Undo the added charge
    this.character.currentCharge -= charge;

    // Figure out if the effect should be removed
    this.stunLength--;
    if (this.stunLength <= 0)
      this.character.removeEffect(this);
  }
}

export default StunEffect;