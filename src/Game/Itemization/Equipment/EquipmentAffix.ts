import StatEnum from "../../Enums/StatEnum";
import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";

class EquipmentAffix {

  // Properties
  slot: EquipmentAffixSlotEnum;
  modifiedStat: StatEnum;
  tier: number;
  value: number;

  // Constructor
  constructor(slot: EquipmentAffixSlotEnum, modifiedStat: StatEnum, tier: number, value: number) {
    this.slot = slot;
    this.modifiedStat = modifiedStat;
    this.tier = tier;
    this.value = value;
  }

  // Load from saved data
  static load(savedData: any) {
    return new EquipmentAffix(
      savedData.slot,
      savedData.modifiedStat,
      savedData.tier,
      savedData.value
    );
  }
}

export default EquipmentAffix;