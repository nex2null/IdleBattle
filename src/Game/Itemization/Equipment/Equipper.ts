import Game from '../../Game';
import PlayerCharacter from '../../PlayerCharacter';
import EquipmentSlotEnum from '../Enums/EquipmentSlotEnum';
import Equipment from './Equipment';

//
// Handle equipping and unequipping items
// 
class Equipper {

  //
  // Handle equipping an item to a player character
  //
  public static equipItem(equipment: Equipment, character: PlayerCharacter) {

    // Check if the character is of the required level
    if (character.level < equipment.requiredLevel)
      return;

    // If there is already an item equipped in the slot, unequip it
    var equippedItem = character.equipment.getBySlot(equipment.slot);
    if (equippedItem != null)
      this.unequipItem(character, equipment.slot);

    // Equip the item
    character.equipment.set(equipment);

    // Remove the equipment from the inventory
    Game.getInstance().town.inventory.removeEquipment(equipment);
  }

  //
  // Handle unequipping an item from a player character
  //
  public static unequipItem(character: PlayerCharacter, equipmentSlot: EquipmentSlotEnum) {

    // Get the equipped item
    var equippedItem = character.equipment.getBySlot(equipmentSlot);
    if (equippedItem == null)
      return;

    // Remove the equipped item
    character.equipment.unequip(equipmentSlot);

    // Add the equipped item back to the inventory
    Game.getInstance().town.inventory.addItem(equippedItem);
  }
}

export default Equipper;