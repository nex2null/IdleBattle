import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';

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