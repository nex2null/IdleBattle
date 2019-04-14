import DamageTypeEnum from '../enums/damage-type-enum';
import BaseEffect from './base-effect';
import BattleCharacter from '../battle-character';
import BattleDamage from '../battle-damage';

class DefenseEffect extends BaseEffect {

    // Constructor
    constructor(character: BattleCharacter) {
        super(character, 'Defended');
    }

    // Handle before an action is performed
    beforeActionPerformed() {
        this.character.removeEffect(this);
    }

    // Handle before damage is taken
    beforeDamageTaken(damage: BattleDamage) {
        // Physical damage taken is halved while this effect is applied
        if (damage.type === DamageTypeEnum.Physical)
            damage.amount = damage.amount * .5;
    }
}

export default DefenseEffect;