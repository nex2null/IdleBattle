import DamageType from '../damage-type';
import BaseEffect from './base-effect';

class DefenseEffect extends BaseEffect {

    constructor(character) {
        super();
        this.character = character;
        this.name = 'Defended';
    }

    beforeActionPerformed() {
        this.character.removeEffect(this);
    }

    beforeDamageTaken(damage) {
        // Physical damage taken is halved while this effect is applied
        if (damage.type === DamageType.Physical)
            damage.amount = damage.amount * .5;
    }
}

export default DefenseEffect;