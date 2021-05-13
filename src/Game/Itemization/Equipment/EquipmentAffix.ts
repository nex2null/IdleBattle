import StatEnum from "../../Enums/StatEnum";
import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";
import EquipmentAffixTypeEnum from "../Enums/EquipmentAffixTypeEnum";

class EquipmentAffix {

  // Properties
  type: EquipmentAffixTypeEnum;
  slot: EquipmentAffixSlotEnum;
  modifiedStat: StatEnum;
  value: number;

  // Constructor
  constructor(type: EquipmentAffixTypeEnum, slot: EquipmentAffixSlotEnum, modifiedStat: StatEnum, value: number) {
    this.type = type;
    this.modifiedStat = modifiedStat;
    this.slot = slot;
    this.value = value;
  }

  // Load from saved data
  static load(savedData: any) {
    return new EquipmentAffix(
      savedData.type,
      savedData.slot,
      savedData.modifiedStat,
      savedData.value
    );
  }
}

export default EquipmentAffix;