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
    equipItem(item: Equipment, character: PlayerCharacter) {

        // Check if the character is of the required level
        if (character.level < item.requiredLevel)
            return;

        // If there is already an item equipped in the slot, unequip it
        var equippedItem = character.equipment.get(item.slot);
        if (equippedItem != null)
            this.unequipItem(character, item.slot);

        // Equip the item
        character.equipment.set(item.slot, item);

        // Remove the item from the inventory
        Game.getInstance().town.inventory.removeItem(item);
    }

    //
    // Handle unequipping an item from a player character
    //
    unequipItem(character: PlayerCharacter, equipmentSlot: EquipmentSlotEnum) {

        // Get the equipped item
        var equippedItem = character.equipment.get(equipmentSlot);
        if (equippedItem == null)
            return;

        // Remove the equipped item
        character.equipment.set(equipmentSlot, null);

        // Add the equipped item back to the inventory
        Game.getInstance().town.inventory.addItem(equippedItem);
    }
}

export default Equipper;