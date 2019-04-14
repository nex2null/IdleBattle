import { calculateHit, processDamage } from '../battle-formulas';
import ISkill from './i-skill';
import DamageTypeEnum from '../enums/damage-type-enum';
import BattleCharacter from '../battle-character';
import BattleDamage from '../battle-damage';
import BattleLog from '../battle-log';
import TargetTypeEnum from '../enums/target-type-enum';

class AttackSkill implements ISkill {

    // Properties
    name: string;
    targetType: TargetTypeEnum;

    // Constructor
    constructor() {
        this.name = 'Attack';
        this.targetType = TargetTypeEnum.Single;
    }

    // Calculate the attack damage
    calculateDamage(user: BattleCharacter, target: BattleCharacter) {

        // Base damage is just the strength of the attacker * 5
        var baseDamageAmount = user.str * 5;
        var baseDamage = new BattleDamage(baseDamageAmount, DamageTypeEnum.Physical);

        // Process the base damage
        return processDamage(user, target, baseDamage);
    }

    // Use the skill
    use(
        character: BattleCharacter,
        targets: Array<BattleCharacter>,
        battleLog: BattleLog
    ) {
        // Only first target is ever relevant
        var target = targets[0];

        // Determine if the attack hits
        var attackHits = calculateHit(character, target);

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

    // Determine if the skill is benefecial
    isBeneficialOn(target: BattleCharacter) {
        return target.isAlive();
    }
}

export default AttackSkill;