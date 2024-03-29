import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class DefendedEffect extends BaseEffect {

  // Constructor
  constructor(character: BattleCharacter) {
    super(character, BattleEffectEnum.Defended, '{white-bg}{black-fg}DFN{/black-fg}{/white-bg}', false);
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} defends`;
  }

  // Handle before an action is performed
  beforeActionPerformed() {
    this.character.removeEffect(this);
  }

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage) {
    // Physical damage taken is halved while this effect is applied
    var physicalDamageAmount = damage.amounts.get(DamageTypeEnum.Physical);
    if (physicalDamageAmount)
      damage.amounts.set(DamageTypeEnum.Physical, physicalDamageAmount * .5);
  }
}

export default DefendedEffect;