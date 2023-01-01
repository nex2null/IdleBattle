import IGambitCondition from './IGambitCondition';
import BattleCharacter from '../../BattleCharacter';
import GambitConditionEnum from '../../Enums/GambitConditionEnum';
import BattleEffectEnum from '../../Enums/BattleEffectEnum';

class EnemyWithoutEffectCondition implements IGambitCondition {

  // Properties
  conditionEnum: GambitConditionEnum = GambitConditionEnum.AllyHealthLessThan;
  requiresInput: boolean = true;
  effects: Array<string> = new Array<string>();

  // Constructor
  constructor() {
    
    // Populate effects
    for (var enumMember in BattleEffectEnum) {
      this.effects.push(BattleEffectEnum[enumMember as keyof typeof BattleEffectEnum]);
    }
  }

  // Get valid targets for the gambit condition
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>, input: string | null): Array<BattleCharacter> {

    // Sanity check input
    input = input || '';

    // Parse input and sanity check
    var effectEnum: BattleEffectEnum | undefined = (<any>BattleEffectEnum)[input];
    if (!effectEnum) {
      return [];
    }

    // Filter characters without the given effect
    return characters.filter(x => 
      x.characterType === user.hostileToCharacterType &&
      x.getEffect(effectEnum!) == null);
  }

  // Get valid inputs for the gambit condition
  getValidInputs(): Array<string> {
    return this.effects;
  }
}

export default EnemyWithoutEffectCondition;