// Imports
import StatEnum from "./Enums/StatEnum";
import EquipmentSlotEnum from "./Itemization/Enums/EquipmentSlotEnum";
import Equipment from "./Itemization/Equipment/Equipment";

class PlayerEquipment {

  // Properties
  weapon: Equipment | null;
  chest: Equipment | null;
  boots: Equipment | null;

  //
  // Constructor
  //
  constructor() {
    this.weapon = null;
    this.chest = null;
    this.boots = null;
  }

  //
  // Load from saved data
  //
  static load(savedData: any) {
    var playerEquipment = new PlayerEquipment();
    playerEquipment.weapon = savedData.weapon ? Equipment.load(savedData.weapon) : null;
    playerEquipment.chest = savedData.chest ? Equipment.load(savedData.chest) : null;
    playerEquipment.boots = savedData.boots ? Equipment.load(savedData.boots) : null;
    return playerEquipment;
  }

  //
  // Gets the equipment for a given slot
  //
  getBySlot(slot: EquipmentSlotEnum): Equipment | null {
    switch (slot) {
      case EquipmentSlotEnum.Boots: return this.boots;
      case EquipmentSlotEnum.ChestPiece: return this.chest;
      case EquipmentSlotEnum.Weapon: return this.weapon;
      default: return null;
    }
  }

  //
  // Sets the equipment
  //
  set(equipment: Equipment) {
    switch (equipment.slot) {
      case EquipmentSlotEnum.Boots:
        this.boots = equipment;
        break;
      case EquipmentSlotEnum.ChestPiece:
        this.chest = equipment;
        break;
      case EquipmentSlotEnum.Weapon:
        this.weapon = equipment;
        break;
    }
  }

  //
  // Unequip the given slot
  //
  unequip(slot: EquipmentSlotEnum) {
    switch (slot) {
      case EquipmentSlotEnum.Boots:
        this.boots = null;
        break;
      case EquipmentSlotEnum.ChestPiece:
        this.chest = null;
        break;
      case EquipmentSlotEnum.Weapon:
        this.weapon = null;
        break;
    }
  }

  //
  // Gets total value of stat on all equipment
  //
  getStatValue(stat: StatEnum) {
    var amt = 0;
    if (this.weapon) amt += this.weapon.getStatValue(stat);
    if (this.chest) amt + this.chest.getStatValue(stat);
    if (this.boots) amt += this.boots.getStatValue(stat);
    return amt;
  }
}

export default PlayerEquipment;