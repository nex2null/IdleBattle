import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';

class AllyHealthLessThanCondition implements IGambitCondition {

  // Properties
  conditionEnum: GambitConditionEnum = GambitConditionEnum.AllyHealthLessThan;
  requiresInput: boolean = false;

  // Get valid targets for the gambit condition
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>, input: string | null): Array<BattleCharacter> {

    // Sanity check input
    input = input || '';

    // Remove trailing % from input
    if (input.endsWith('%'))
      input = input.slice(0, -1);

    // Parse input
    var healthPercent = +input / 100;

    // Filter characters with health less than or equal to the given input %
    return characters.filter(x =>
      x.characterType !== user.hostileToCharacterType &&
      x.currentStats.hp <= x.currentStats.maxHp * healthPercent);
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

export default AllyHealthLessThanCondition;