import DamageTypeEnum from './Enums/DamageTypeEnum';

class BattleDamage {

  // Properties
  amounts: Map<DamageTypeEnum, number> = new Map<DamageTypeEnum, number>();

  // Constructor
  constructor(amount: number, type: DamageTypeEnum) {
    this.amounts.set(type, amount);
  }

  // Gets damage by type
  getDamageByType(type: DamageTypeEnum): number {
    return this.amounts.get(type) || 0;
  }

  // Adds damage
  addDamage(amount: number, type: DamageTypeEnum): void {
    var oldValue = this.getDamageByType(type);
    this.amounts.set(type, oldValue + amount);
  }

  // Rounds all damage
  round() {
    this.amounts.forEach((amount, type) => {
      this.amounts.set(type, Math.round(amount));
    });
  }

  // Reduces all damage by a percent
  // NOTE: percent should be a decimal value (ie: .5 = 50%)
  reduceByPercentage(percent: number) {
    this.amounts.forEach((amount, type) => {
      this.amounts.set(type, amount * percent);
    });
  }

  // Gets the total amount of all damage
  getTotalAmount() {
    var total = 0;
    this.amounts.forEach(amount => total += amount);
    return total;
  }
}

export default BattleDamage;