import DamageTypeEnum from './Enums/DamageTypeEnum';

class BattleDamage {

  // Properties
  amounts: Map<DamageTypeEnum, number> = new Map<DamageTypeEnum, number>();

  // Constructor
  constructor(amount: number, type: DamageTypeEnum) {
    this.amounts.set(type, amount);
  }

  // Rounds all damage
  round() {
    this.amounts.forEach((amount, type) => {
      this.amounts.set(type, Math.round(amount));
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