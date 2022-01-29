import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleDamage from '../BattleDamage';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import RandomHelpers from '../../Utilities/RandomHelpers';

class FrozenEffect extends BaseEffect {

  // Properties
  freezeLength: number;

  // Constructor
  constructor(character: BattleCharacter) {
    super(character, BattleEffectEnum.Frozen, '{white-bg}{blue-fg}FRZ{/blue-fg}{/white-bg}');
    this.freezeLength = 40;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `${characterName} is frozen`;
  }

  // Whether the effect can be applied
  canApply() {
    return this.character.getEffect(this.type) == null;
  }

  // Process charge being ticked
  processChargeTick(charge: number): void {

    // Undo the added charge
    this.character.currentCharge -= charge;

    // Figure out if the effect should be removed
    this.freezeLength--;
    if (this.freezeLength <= 0)
      this.character.removeEffect(this);
  }

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage) {

    // Fire damage always breaks freeze
    var fireDamage = damage.amounts.get(DamageTypeEnum.Fire);
    var freezeBroken = fireDamage && fireDamage > 0;

    // Physical damage has a chance to break freeze
    if (!freezeBroken) {
      var physicalDamage = damage.amounts.get(DamageTypeEnum.Physical);
      freezeBroken = physicalDamage && physicalDamage > 0 && RandomHelpers.getRandomInt(1, 100) <= 20;
    }

    // If the freeze is broken, remove it
    if (freezeBroken)
      this.character.removeEffect(this);
  }
}

export default FrozenEffect;