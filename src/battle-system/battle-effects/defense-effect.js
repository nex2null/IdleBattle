import DamageType from '../damage-type';

export default class {

    constructor(character) {
        this.character = character;
    }
    
    onApply() {        
    }

    onRemove() {
    }

    beforeActionPerformed() {
        this.character.removeEffect(this);
    }

    afterActionPerformed() {        
    }

    beforeDamageTaken(damage) {
        // Physical damage taken is halved while this effect is applied
        if (damage.type === DamageType.Physical)
            damage.amount = damage.amount * .5;
    }

    afterDamageTaken() {
    }
}