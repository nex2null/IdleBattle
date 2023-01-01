import BattleCharacter from '../BattleCharacter';
import BattleDamage from '../BattleDamage';
import BattleLog from '../BattleLog';
import DamageTracker from '../DamageTracker';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

interface IEffect {

  // The character the effect is applied to
  character: BattleCharacter;

  // The type of effect
  type: BattleEffectEnum;

  // The ui code of the effect (3 characters, tags allowed)
  uiCode: string;

  // Whether the effect is a negative effect
  isNegative: boolean;

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string;

  // Whether the effect can be applied
  canApply(): boolean;

  // Handle when the effect is applied
  onApply(): void;

  // Handle when the effect is removed
  onRemove(): void;

  // Handle before an action is performed
  beforeActionPerformed(battleLog: BattleLog, damageTracker: DamageTracker): void;

  // Handle after an action is performed
  afterActionPerformed(): void;

  // Handle being targeted for damage
  // Returns: A new target
  onDamageTarget(damage: BattleDamage): BattleCharacter | null;

  // Handle before damage is dealt
  beforeDamageDealt(damage: BattleDamage, target: BattleCharacter): void;

  // Handle after damage is dealt
  afterDamageDealt(damage: BattleDamage, target: BattleCharacter, battleLog: BattleLog): void;

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage, attacker: BattleCharacter | null, battleLog: BattleLog): void;

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage, attacker: BattleCharacter | null, battleLog: BattleLog): void;

  // Process charge being ticked
  processChargeTick(charge: number): void;

  // Determine if charge can be gained
  canGainCharge(): boolean;

  // Determine if this character must target a character with actions
  getForceTarget(): BattleCharacter | null;
}

export default IEffect;