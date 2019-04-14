import DamageTypeEnum from './Enums/DamageTypeEnum';

class BattleDamage {

    // Properties
    amount: number;
    type: DamageTypeEnum;

    // Constructor
    constructor(amount: number, type: DamageTypeEnum) {
        this.amount = amount;
        this.type = type;
    }
}

export default BattleDamage;