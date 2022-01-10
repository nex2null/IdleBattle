import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

interface IEffect {

  // The character the effect is applied to
  character: BattleCharacter;

  // The type of effect
  type: BattleEffectEnum;

  // The ui code of the effect (3 characters, tags allowed)
  uiCode: string;

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string;

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

  // Handle before damage is dealt
  beforeDamageDealt(damage: BattleDamage, target: BattleCharacter): void;

  // Handle after damage is dealt
  afterDamageDealt(damage: BattleDamage, target: BattleCharacter, battleLog: BattleLog): void;

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage): void;

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage): void;

  // Process charge being ticked
  processChargeTick(charge: number): void;
}

export default IEffect;