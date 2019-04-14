import BattleCharacter from '../../BattleCharacter';

interface IGambitCondition {
  name: string;
  requiresInput: boolean;
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter>;
}

export default IGambitCondition;