// Imports
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
      case EquipmentSlotEnum.Boots: this.boots = equipment;
      case EquipmentSlotEnum.ChestPiece: this.chest = equipment;
      case EquipmentSlotEnum.Weapon: this.weapon = equipment;
    }
  }

  //
  // Unequip the given slot
  //
  unequip(slot: EquipmentSlotEnum) {
    switch (slot) {
      case EquipmentSlotEnum.Boots: this.boots = null;
      case EquipmentSlotEnum.ChestPiece: this.chest = null;
      case EquipmentSlotEnum.Weapon: this.weapon = null;
    }
  }
}

export default PlayerEquipment;