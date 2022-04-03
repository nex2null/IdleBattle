import TargetTypeEnum from '../Enums/TargetTypeEnum';
import BattleCharacter from '../BattleCharacter';
import SkillEnum from '../Enums/SkillEnum';
import SkillFactory from '../Skills/SkillFactory';
import GambitAction from './GambitAction';
import GambitConditionEnum from '../Enums/GambitConditionEnum';
import GambitConditionFactory from './Conditions/GambitConditionFactory';

class Gambit {

  // Properties
  conditionEnum: GambitConditionEnum;
  conditionInput: string | null;
  skillEnum: SkillEnum;
  activationChance: number;

  // Constructor
  constructor(
    conditionEnum: GambitConditionEnum,
    conditionInput: string | null,
    skillEnum: SkillEnum,
    activationChance?: number | null
  ) {
    this.conditionEnum = conditionEnum;
    this.conditionInput = conditionInput;
    this.skillEnum = skillEnum;
    this.activationChance = activationChance || 1;
  }

  // Load from saved data
  static load(savedData: any) {
    return new Gambit(
      savedData.conditionEnum,
      savedData.conditionInput,
      savedData.skillEnum,
      savedData.activationChance);
  }

  // Get the action to perform
  getAction(user: BattleCharacter, characters: Array<BattleCharacter>): GambitAction | null {

    // Verify the user possesses the skill to use
    var skillInfo = user.skills.find(x => x.skill === this.skillEnum);
    if (!skillInfo)
      return null;

    // Instantiate the skill and condition
    var skill = SkillFactory.getSkill(this.skillEnum, skillInfo.level, skillInfo.mastered);
    var condition = GambitConditionFactory.getGambitCondition(this.conditionEnum);

    // Determine if we can activate
    if (this.activationChance < 1 && Math.random() > this.activationChance)
      return null;

    // Grab the potential matches for the condition
    var potentialTargets = condition.getTargets(user, characters, this.conditionInput);

    // Filter the targets by which ones the action can be beneficial on
    var targets = potentialTargets.filter(x => skill.isBeneficialOn(x));

    // If the skill target is 'self' then only alow the target to be the caster
    if (skill.targetType === TargetTypeEnum.Self)
      targets = targets.filter(x => x === user);

    // If the skill target is 'not-self' then remove the caster from the targets list
    if (skill.targetType === TargetTypeEnum.NotSelf)
      targets = targets.filter(x => x !== user);

    // If there are no targets left then the action cannot be performed
    if (targets.length === 0)
      return null;

    // Determine if the action can be used
    if (!skill.canUse(user, targets))
      return null;

    // Return the action
    return new GambitAction(skill, targets);
  }
}

export default Gambit;