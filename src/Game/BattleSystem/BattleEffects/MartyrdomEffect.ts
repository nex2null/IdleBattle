import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleDamage from '../BattleDamage';

class MartyrdomEffect extends BaseEffect {

  // Properties
  redirectCharacter: BattleCharacter;
  numberOfTimesToRedirect: number;
  damageReduction: number;

  // Constructor
  constructor(character: BattleCharacter, redirectCharacter: BattleCharacter, numberOfTimesToRedirect: number, damageReduction: number) {
    super(character, BattleEffectEnum.Martyrdom, '{white-bg}{red-fg}MAR{/red-fg}{/white-bg}', false);
    this.redirectCharacter = redirectCharacter;
    this.numberOfTimesToRedirect = numberOfTimesToRedirect;
    this.damageReduction = damageReduction;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} is under ${this.redirectCharacter.name}'s protection`;
  }

  // Handle being targeted for damage
  onDamageTarget(damage: BattleDamage): BattleCharacter | null {

    // Reduce the damage by the reduction amount
    damage.reduceByPercentage(this.damageReduction);

    // Reduce the times to redirect
    this.numberOfTimesToRedirect--;
    if (this.numberOfTimesToRedirect <= 0)
      this.character.removeEffect(this);

    // Return the redirected character
    return this.redirectCharacter;
  }
}

export default MartyrdomEffect;