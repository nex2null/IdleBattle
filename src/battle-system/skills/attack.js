import DamageType from '../damage-type';
import TargetType from '../target-type';
import BattleFormulas from '../battle-formulas';
import Damage from '../battle-damage';
import BaseSkill from './base-skill';

class AttackSkill extends BaseSkill {

    constructor() {
        super('Attack', TargetType.Single);
        this.power = 16;
        this.damageType = DamageType.Physical;
    }

    calculateHit(user, target) {
        return BattleFormulas.calculateHit(user, target);
    }

    calculateDamage(user, target) {
        var damageAmount = BattleFormulas.calculateDamage(user, target, this.power);
        return new Damage(damageAmount, this.damageType);
    }

    use(character, targets, battleLog) {

        // Only first target is ever relevant
        var target = targets[0];

        // Determine if the attack hits
        var attackHits = this.calculateHit(character, target);

        // If the attack hits calculate damage
        if (attackHits) {
            // Calculate the damage on the target
            var damageToDo = this.calculateDamage(character, target);

            // Apply the damage
            target.applyDamage(damageToDo);

            // Log
            battleLog.addMessage(`${character.name} attacks ${target.name} for ${damageToDo.amount} damage`);
            if (!target.isAlive()) battleLog.addMessage(`${target.name} has died`);
        }
        else {
            battleLog.addMessage(`${character.name} attacks ${target.name}, but misses!`)
        }
    }

    isBeneficialOn(target) {
        return target.isAlive();
    }
}

export default AttackSkill;