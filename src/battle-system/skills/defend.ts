import DefenseEffect from '../battle-effects/defense-effect';
import TargetTypeEnum from '../enums/target-type-enum';
import ISkill from './i-skill';
import BattleCharacter from '../battle-character';
import BattleLog from '../battle-log';

class DefendSkill implements ISkill {

    // Properties
    name: string;
    targetType: TargetTypeEnum;

    // Constructor
    constructor() {
        this.name = 'Defend';
        this.targetType = TargetTypeEnum.Self;
    }

    // Use the skill
    use(
        character: BattleCharacter,
        targets: Array<BattleCharacter>,
        battleLog: BattleLog
    ) {
        // Add a defense effect to the character
        var defenseEffect = new DefenseEffect(character);
        character.addEffect(defenseEffect);

        // Log that the character is defending
        battleLog.addMessage(`${character.name} defends`);
    }

    // Determine if the skill is benefecial
    isBeneficialOn(target: BattleCharacter) {
        return true;
    }
}

export default DefendSkill;