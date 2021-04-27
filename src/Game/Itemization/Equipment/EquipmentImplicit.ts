import StatEnum from '../../Enums/StatEnum';

class EquipmentImplicit {

    // Properties
    stat: StatEnum;
    value: number;

    // Constructor
    constructor(stat: StatEnum, value: number) {
        this.stat = stat;
        this.value = value;
    }
}

export default EquipmentImplicit;