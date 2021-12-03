import BattleDamage from '../BattleDamage';
import BattleCharacter from '../BattleCharacter';
import IEffect from './IEffect';

class BaseEffect implements IEffect {

  // Properties
  character: BattleCharacter;
  name: string;

  // Constructor
  constructor(character: BattleCharacter, name: string) {
    this.character = character;
    this.name = name;
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
  beforeActionPerformed(): void {
  }

  // Handle after an action is performed
  afterActionPerformed(): void {
  }

  // Handle before damage is taken
  beforeDamageTaken(damage: BattleDamage): void {
  }

  // Handle after damage is taken
  afterDamageTaken(damage: BattleDamage): void {
  }

  // Process charge being ticked
  processChargeTick(charge: number): void {
  }
}

export default BaseEffect;