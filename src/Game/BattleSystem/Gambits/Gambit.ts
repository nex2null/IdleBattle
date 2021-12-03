import TargetTypeEnum from '../Enums/TargetTypeEnum';
import IGambitCondition from './Conditions/IGambitCondition';
import BattleCharacter from '../BattleCharacter';
import SkillEnum from '../Enums/SkillEnum';
import ISkill from '../Skills/ISkill';
import SkillFactory from '../Skills/SkillFactory';
import GambitAction from './GambitAction';

class Gambit {

  // Properties
  condition: IGambitCondition;
  conditionInput: string | null;
  skillName: SkillEnum;
  skill: ISkill;
  activationChance: number;

  // Constructor
  constructor(
    condition: IGambitCondition,
    conditionInput: string | null,
    skillName: SkillEnum,
    activationChance?: number | null
  ) {
    this.condition = condition;
    this.conditionInput = conditionInput;
    this.skillName = skillName;
    this.skill = SkillFactory.getSkill(skillName);
    this.activationChance = activationChance || 1;
  }

  // Get the action to perform
  getAction(user: BattleCharacter, characters: Array<BattleCharacter>): GambitAction | null {

    // Determine if we can activate
    if (this.activationChance < 1 && Math.random() > this.activationChance)
      return null;

    // Grab the potential matches for the condition
    var potentialTargets = this.condition.getTargets(user, characters);

    // Filter the targets by which ones the action can be beneficial on
    var targets = potentialTargets.filter(x => this.skill.isBeneficialOn(x));

    // If the skill target is 'self' then only alow the target to be the caster
    if (this.skill.targetType === TargetTypeEnum.Self)
      targets = targets.filter(x => x === user);

    // If there are no targets left then the action cannot be performed
    if (targets.length === 0)
      return null;

    // Determine if the action can be used
    if (!this.skill.canUse(user, targets))
      return null;

    // Return the action
    return new GambitAction(this.skill, targets);
  }
}

export default Gambit;