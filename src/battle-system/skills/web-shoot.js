import TargetType from '../target-type';
import BattleFormulas from '../battle-formulas';
import SlowedEffect from '../battle-effects/slowed-effect';
import BaseSkill from './base-skill';

class WebShootSkil extends BaseSkill {

    constructor() {
        super('Web Shoot', TargetType.Single);
    }

    calculateHit(user, target) {
        return BattleFormulas.calculateHit(user, target);
    }

    use(character, targets, battleLog) {

        // Only first target is ever relevant
        var target = targets[0];

        // Determine if the attack hits
        var attackHits = this.calculateHit(character, target);

        // If the attack hits then apply the slow
        if (attackHits) {
            // Add a slowed effect to the character
            var slowedEffect = new SlowedEffect(target, 3);
            target.addEffect(slowedEffect);

            // Log
            battleLog.addMessage(`${character.name} shoots a sticky web at ${target.name}, they are slowed!`);
        }
        else {
            battleLog.addMessage(`${character.name} shoots a sticky web at ${target.name}, but misses!`)
        }
    }

    isBeneficialOn(target) {
        return target.getEffect('Slowed') == null;
    }
}

export default WebShootSkil;