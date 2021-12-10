import BattleCharacter from "./BattleCharacter";

class DamageTracker {

  // Properties
  damageTaken: { [uid: string]: number };

  // Constructor
  constructor() {
    this.damageTaken = {};
  }

  // Reset
  reset() {
    this.damageTaken = {};
  }

  // Set that damage was taken
  setDamageTaken(character: BattleCharacter, damage: number) {
    var oldDamage = this.damageTaken[character.uid] || 0;
    this.damageTaken[character.uid] = damage + oldDamage;
  }

  // Determine if damage was dealt
  hasDamage(): boolean {
    return Object.keys(this.damageTaken).length > 0;
  }
}

export default DamageTracker;