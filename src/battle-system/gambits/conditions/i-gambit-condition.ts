import BattleCharacter from '../../battle-character';

interface IGambitCondition {
  name: string;
  requiresInput: boolean;
  getTargets(user: BattleCharacter, characters: Array<BattleCharacter>): Array<BattleCharacter>;
}

export default IGambitCondition;