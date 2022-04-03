import BattleDamage from '../BattleDamage';
import BattleCharacter from '../BattleCharacter';
import IEffect from './IEffect';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import BattleLog from '../BattleLog';

class BaseEffect implements IEffect {

  // Properties
  character: BattleCharacter;
  type: BattleEffectEnum;
  uiCode: string;
  readonly isNegative: boolean;

  // Constructor
  constructor(character: BattleCharacter, type: BattleEffectEnum, uiCode: string, isNegative: boolean) {
    this.character = character;
    this.type = type;
    this.uiCode = uiCode;
    this.isNegative = isNegative;
  }

  // Get the message to display when a character is inflicted with this effect
  getInflictedMessage(characterName: string): string {
    return `TODO: IMPLEMENT INFLICT EFFECT MESSAGE FOR ${this.type}`;
  }

  // Whether the effect can be applied
  canApply(): boolean {
    return true;
  }

  // Handle when the effect is applied
  onApply(): void {
    this.character.effects.push(this);
  }

  // Handle when the effect is removed
  onRemove(): void {
  }

  // Handle before an action is performed
  beforeActionPerformed(battleLog: BattleLog): void {
  }

  // Handle after an action is performed
  afterActionPerformed(): void {
  }

  // Handle being targeted for damage
  // Returns: A new target
  onDamageTarget(damage: BattleDamage): BattleCharacter | null {
    return null;
  }

  // Handle before damage is dealt
  beforeDamageDealt(damage: BattleDamage, target: BattleCharacter): void {
  }

  // Handle after damage is dealt
  afterDamageDealt(damage: BattleDamage, target: BattleCharacter, battleLog: BattleLog): void {
  }

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage, attacker: BattleCharacter, battleLog: BattleLog): void {
  }

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage, attacker: BattleCharacter, battleLog: BattleLog): void {
  }

  // Process charge being ticked
  processChargeTick(charge: number): void {
  }

  // Determine if charge can be gained
  canGainCharge(): boolean {
    return true;
  }
}

export default BaseEffect;