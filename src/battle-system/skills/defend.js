import DefenseEffect from '../battle-effects/defense-effect';
import TargetType from '../target-type';
import BaseSkill from './base-skill';

class DefendSkill extends BaseSkill {

    constructor() {
        super('Defend', TargetType.Self);
        this.power = 0;
        this.damageType = null;
        this.targetType = TargetType.Self;
    }

    use(character, targets, battleLog) {

        // Add a defense effect to the character
        var defenseEffect = new DefenseEffect(character);
        character.addEffect(defenseEffect);

        // Log that the character is defending
        battleLog.addMessage(`${character.name} defends`);
    }

    isBeneficialOn() {
        return true;
    }
}

export default DefendSkill;