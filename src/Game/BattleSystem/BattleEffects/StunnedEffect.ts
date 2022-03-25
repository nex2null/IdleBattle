import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class StunnedEffect extends BaseEffect {

  // Properties
  stunLength: number;

  // Constructor
  constructor(character: BattleCharacter, stunLength: number) {
    super(character, BattleEffectEnum.Stunned, '{white-bg}{black-fg}STN{/black-fg}{/white-bg}');
    this.stunLength = stunLength;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} is stunned`;
  }

  // Whether the effect can be applied
  canApply() {

    // TODO: Refresh stun
    return this.character.getEffect(this.type) == null;
  }

  // Determine if charge can be gained
  canGainCharge(): boolean {
    return false;
  }

  // Process charge being ticked
  processChargeTick(): void {

    // Figure out if the effect should be removed
    this.stunLength--;
    if (this.stunLength <= 0)
      this.character.removeEffect(this);
  }
}

export default StunnedEffect;