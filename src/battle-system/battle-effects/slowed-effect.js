import BaseEffect from './base-effect';

class SlowedEffect extends BaseEffect {

    constructor(character, turnsToSlow) {
        super();
        this.character = character;
        this.turnsLeft = turnsToSlow;
        this.name = 'Slowed';
    }

    canApply() {
        return this.character.getEffect(this.name) == null;
    }
    
    onApply() {
        // Remove 50% of the character's speed
        this.removedSpeed = Math.floor(this.character.spd * .5);
        this.character.spd -= this.removedSpeed;
    }

    onRemove() {
        // Give the character its speed back
        if (this.removedSpeed)
            this.character.spd += this.removedSpeed;
    }

    beforeActionPerformed() {
        this.turnsLeft--;
        if (this.turnsLeft <= 0)
            this.character.removeEffect(this);
    }
}

export default SlowedEffect;