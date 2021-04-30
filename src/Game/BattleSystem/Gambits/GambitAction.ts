import GambitTypeEnum from '../Enums/GambitTypeEnum';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import IGambitCondition from './Conditions/IGambitCondition';
import AttackSkill from '../Skills/AttackSkill';
import DefendSkill from '../Skills/DefendSkill';
import WebShootSkill from '../Skills/WebShootSkill';
import BattleCharacter from '../BattleCharacter';

class GambitAction {

    // Properties
    condition: IGambitCondition;
    conditionInput: string | null;
    type: GambitTypeEnum;
    action: any;
    activationChance: number;

    // Constructor
    constructor(
        condition: IGambitCondition,
        conditionInput: string | null,
        type: GambitTypeEnum,
        actionName: string,
        activationChance?: number | null
    ) {
        this.condition = condition;
        this.conditionInput = conditionInput;
        this.type = type;
        this.action = this.findAction(actionName);
        this.activationChance = activationChance || 1;
    }

    // Get the action to perform
    getAction(user: BattleCharacter, characters: Array<BattleCharacter>) {

        // Determine if we can activate
        if (this.activationChance < 1 && Math.random() > this.activationChance)
            return null;

        // Grab the potential matches for the condition
        var potentialTargets = this.condition.getTargets(user, characters);

        // Filter the targets by which ones the action can be beneficial on
        var targets = potentialTargets.filter(x => this.action.isBeneficialOn(x));

        // If this is a skill action, and the skill target is 'self' then
        // only alow the target to be the caster
        if (this.type === GambitTypeEnum.Skill && this.action.targetType === TargetTypeEnum.Self)
            targets = targets.filter(x => x === user);

        // If there are no targets left then the action cannot be performed
        if (targets.length === 0)
            return null;

        // Return the action
        return {
            action: this.action,
            targets: targets,
            type: this.type
        }
    }

    // Find the action to perform based on name
    findAction(actionName: string) {
        if (actionName === 'Attack') return new AttackSkill();
        if (actionName === 'Defend') return new DefendSkill();
        if (actionName === 'Web Shoot') return new WebShootSkill();
        return null;
    }
}

export default GambitAction;