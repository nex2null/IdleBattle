import DefenseEffect from '../battle-effects/defense-effect';
import TargetType from '../target-type';

export default class {

    constructor() {
        this.name = 'Defend';
        this.power = 0;
        this.damageType = null;
        this.targetType = TargetType.Self;
    }

    performSkill(character, targets, battleLog) {

        // Add a defense effect to the character
        var defenseEffect = new DefenseEffect(character);
        character.addEffect(defenseEffect);

        // Log that the character is defending
        battleLog.addMessage(`${character.name} defends`);
    }

    isBeneficialOn(target) {
        return true;
    }
}