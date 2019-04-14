import TargetTypeEnum from '../Enums/TargetTypeEnum';
import SlowedEffect from '../BattleEffects/SlowedEffect';
import ISkill from './ISkill';
import { calculateHit } from '../BattleFormulas';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';

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