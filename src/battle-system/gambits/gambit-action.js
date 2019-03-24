import GambitType from './gambit-type';
import TargetType from '../target-type';
import AttackSkill from '../skills/attack';
import DefendSkill from '../skills/defend';

export default class {

    constructor(condition, conditionInput, type, actionName) {
        this.condition = condition;
        this.conditionInput = conditionInput;
        this.type = type;
        this.actionName = actionName;
        this.action = this.findAction(actionName);
    }

    getAction(user, characters) {

        // Grab the potential matches for the condition
        var potentialTargets = this.condition.getTargets(user, characters);

        // Filter the targets by which ones the action can be beneficial on
        var targets = potentialTargets.filter(x => this.action.isBeneficialOn(x));

        // If this is a skill action, and the skill target is 'self' then
        // only alow the target to be the caster
        if (this.type === GambitType.Skill && this.action.targetType === TargetType.Self)
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

    findAction(actionName) {
        if (actionName === 'Attack') return new AttackSkill();
        if (actionName === 'Defend') return new DefendSkill();
    }
}