import { calculateHit, processDamage } from '../BattleFormulas';
import ISkill from './ISkill';
import DamageTypeEnum from '../Enums/DamageTypeEnum';
import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';

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

        // Base damage is just the weapon damage plus the user's strength
        var baseDamageAmount = user.currentStats.strength + user.currentStats.weaponBaseDamage;
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