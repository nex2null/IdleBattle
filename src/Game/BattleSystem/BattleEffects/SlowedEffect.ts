import BaseEffect from './BaseEffect';
import BattleCharacter from '../BattleCharacter';

class SlowedEffect extends BaseEffect {

    // Properties
    turnsLeft: number;
    removedSpeed: number = 0;

    // Constructor
    constructor(character: BattleCharacter, turnsToSlow: number) {
        super(character, 'Slowed');
        this.turnsLeft = turnsToSlow;
    }

    // Whether the effect can be applied
    canApply() {
        return this.character.getEffect(this.name) == null;
    }

    // Handle when the effect is applied
    onApply() {
        // Remove 50% of the character's speed
        this.removedSpeed = Math.floor(this.character.currentStats.speed * .5);
        this.character.currentStats.speed -= this.removedSpeed;
    }

    // Handle when the effect is removed
    onRemove() {
        // Give the character its speed back
        if (this.removedSpeed)
            this.character.currentStats.speed += this.removedSpeed;
    }

    // Handle before an action is performed
    beforeActionPerformed() {
        this.turnsLeft--;
        if (this.turnsLeft <= 0)
            this.character.removeEffect(this);
    }
}

export default SlowedEffect;