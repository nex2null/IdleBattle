import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

class SelfMpLessThanCondition implements IGambitCondition {

  // Properties
  conditionEnum: GambitConditionEnum = GambitConditionEnum.SelfMpLessThan;
  requiresInput: boolean = true;

  // Get valid targets for the gambit condition
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>, input: string | null): Array<BattleCharacter> {

    // Sanity check input
    input = input || '';

    // Remove trailing % from input
    if (input.endsWith('%'))
      input = input.slice(0, -1);

    // Parse input
    var mpPercent = +input / 100;

    // Return the user if their MP is less than or equal to the target percent
    // otherwise return an empty list
    return (user.currentStats.mp <= user.currentStats.maxMp * mpPercent) ? [user] : [];
  }

  // Get valid inputs for the gambit condition
  getValidInputs(): Array<string> {
    return [
      '90%',
      '80%',
      '70%',
      '60%',
      '50%',
      '40%',
      '30%',
      '20%',
      '10%',
    ];
  }
}

export default SelfMpLessThanCondition;