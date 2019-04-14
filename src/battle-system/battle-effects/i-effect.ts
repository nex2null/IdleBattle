import BattleCharacter from '../battle-character';
import BattleDamage from '../battle-damage';

interface IEffect {

  // The character the effect is applied to
  character: BattleCharacter;

  // The name of the effect
  name: string;

  // Whether the effect can be applied
  canApply(): boolean;

  // Handle when the effect is applied
  onApply(): void;

  // Handle when the effect is removed
  onRemove(): void;

  // Handle before an action is performed
  beforeActionPerformed(): void;

  // Handle after an action is performed
  afterActionPerformed(): void;

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage): void;

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage): void;
}

export default IEffect;