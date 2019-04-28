import EquipmentAffixTypeEnum from "./Enums/EquipmentAffixTypeEnum";

class EquipmentAffix {

    // Properties
    type: EquipmentAffixTypeEnum;
    value: number;

    // Constructor
    constructor(type: EquipmentAffixTypeEnum, value: number) {
        this.type = type;
        this.value = value;
    }
}

export default EquipmentAffix;