import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import Equipment from './Equipment/Equipment';
import Item from './Item';
import { itemInformations } from './ItemInformation';

class Inventory {

  // Properties
  items: Array<Item> = [];

  // Constructor
  constructor() { }

  //
  // Add an item to the inventory
  //
  public addItem(item: Item): void {

    // TODO: Make this whole thing handle stacking better

    // Grab the item information for the item being added
    var itemInformation = itemInformations.find(x => x.itemType == item.type);

    // Find an item in our list of items that has an amount that can
    // accomodate the amount of the item we are trying to drop
    var itemInInventory = this.items.find(x =>
      itemInformation != null &&
      x.type == item.type &&
      x.amount <= itemInformation.stackSize - item.amount);

    // If no matching item was found then add the item to the inventory
    // Otherwise just increase the amount of the item we found
    if (itemInInventory)
      itemInInventory.amount += item.amount;
    else
      this.items.push(item);
  }

  //
  // Add a list of items to the inventory
  //
  public addItems(items: Array<Item>): void {
    for (var i = 0; i < items.length; i++) {
      this.addItem(items[i]);
    }
  }

  //
  // Remove an item from the inventory
  //
  public removeItem(item: Item): void {

    // Grab the item information for the item being removed
    var itemInformation = itemInformations.find(x => x.itemType == item.type);
    if (!itemInformation)
      return;

    // If the item is an equipment, then just remove it
    if (itemInformation.itemSuperType == ItemSuperTypeEnum.Equipment) {
      this.spliceItem(item);
      return;
    }

    // If the item is a currency item, then find it in the inventory
    var itemInInventory = this.items.find(x => x.type == item.type);
    if (!itemInInventory)
      return;

    // Reduce it's stack size unless the stack size is only 1, then just remove the item entirely
    if (itemInInventory.amount == 1) {
      this.spliceItem(item);
    } else {
      itemInInventory.amount--;
    }
  }

  //
  // Splices an item out of the array
  //
  public spliceItem(item: Item): void {
    var index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}

export default Inventory;