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

    // Load from saved data
    static load(savedData: any) {
        return new EquipmentImplicit(savedData.stat, savedData.value);
    }
}

export default EquipmentImplicit;