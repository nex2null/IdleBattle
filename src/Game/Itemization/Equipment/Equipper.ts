import PlayerCharacterEquipmentSlotEnum from '@/Game/Enums/PlayerCharacterEquipmentSlotEnum';
import Game from '@/Game/Game';
import PlayerCharacter from '@/Game/PlayerCharacter';
import Equipment from './Equipment';

//
// Handle equipping and unequipping items
// 
class Equipper {

  //
  // Handle equipping an item to a player character
  //
  equipItem(item: Equipment, character: PlayerCharacter, characterSlot: PlayerCharacterEquipmentSlotEnum) {

    // First make sure the character doesn't already have an item equipped on that slot
    var equippedItem = character.equipment.get(characterSlot);
    if (equippedItem != null)
      return;

    // Check if the character is of the required level
    if (character.level < item.requiredLevel)
      return;

    // Equip the item
    character.equipment.set(characterSlot, item);

    // Remove the item from the inventory
    Game.getInstance().town.inventory.removeItem(item);
  }

  //
  // Handle unequipping an item from a player character
  //
  unequipItem(character: PlayerCharacter, characterSlot: PlayerCharacterEquipmentSlotEnum) {

    // Get the equipped item
    var equippedItem = character.equipment.get(characterSlot);
    if (equippedItem == null)
      return;

    // Remove the equipped item
    character.equipment.set(characterSlot, null);

    // Add the equipped item back to the inventory
    Game.getInstance().town.inventory.addItem(equippedItem);
  }
}

export default Equipper;