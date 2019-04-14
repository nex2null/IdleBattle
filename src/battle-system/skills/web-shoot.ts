import TargetTypeEnum from '../enums/target-type-enum';
import SlowedEffect from '../battle-effects/slowed-effect';
import ISkill from './i-skill';
import { calculateHit } from '../battle-formulas';
import BattleCharacter from '../battle-character';
import BattleLog from '../battle-log';

class WebShootSkill implements ISkill {

    // Properties
    name: string;
    targetType: TargetTypeEnum;

    // Constructor
    constructor() {
        this.name = 'Web Shoot';
        this.targetType = TargetTypeEnum.Single;
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

        // If the attack hits then apply the slow
        if (attackHits) {
            var slowedEffect = new SlowedEffect(target, 3);
            target.addEffect(slowedEffect);
            battleLog.addMessage(`${character.name} shoots a sticky web at ${target.name}, they are slowed!`);
        }
        else {
            battleLog.addMessage(`${character.name} shoots a sticky web at ${target.name}, but misses!`)
        }
    }

    // Determine if the skill is benefecial
    isBeneficialOn(target: BattleCharacter) {
        return target.getEffect('Slowed') == null;
    }
}

export default WebShootSkill;