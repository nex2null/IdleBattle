import BattleDamage from '../BattleDamage';
import BattleCharacter from '../BattleCharacter';
import IEffect from './IEffect';
import BattleEffectEnum from '../Enums/BattleEffectEnum';

class BaseEffect implements IEffect {

  // Properties
  character: BattleCharacter;
  type: BattleEffectEnum;
  uiCode: string;

  // Constructor
  constructor(character: BattleCharacter, type: BattleEffectEnum, uiCode: string) {
    this.character = character;
    this.type = type;
    this.uiCode = uiCode;
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