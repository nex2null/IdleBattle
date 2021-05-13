import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import ItemTypeEnum from './Enums/ItemTypeEnum';
import Equipment from './Equipment/Equipment';
import Item from './Item';
import { itemInformations } from './ItemInformation';

class Inventory {

  // Properties
  items: Array<Item>;

  // Constructor
  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  //
  // Load from saved data
  //
  static load(savedData: any) {
    return new Inventory(
      savedData.items.map((x: any) => Item.load(x))
    );
  }

  //
  // Add an item to the inventory
  //
  public addItem(item: Item): void {

    // Grab the item information for the item being added
    var itemInformation = itemInformations.find(x => x.itemType == item.type);
    if (!itemInformation)
      return;

    // If the item is an equipment then add it to the inventory
    if (itemInformation?.itemSuperType === ItemSuperTypeEnum.Equipment) {
      this.items.push(item);
      return;
    }

    // Find the item in the inventory
    var itemInInventory = this.items.find(x => x.type === itemInformation?.itemType);

    // If no existing item was found in the inventory, then add the item
    if (!itemInInventory) {
      this.items.push(item);
      return;
    }

    // Add the item's stack size to the existing item
    itemInInventory.amount += item.amount;

    // If the item's current amount is greater than the allowed stack size
    // then set the amount to the stack size
    if (itemInInventory.amount >= itemInformation?.stackSize)
      itemInInventory.amount = itemInformation.stackSize;
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
  // Remove an equipment from the inventory
  //
  public removeEquipment(equipment: Equipment): void {
    this.spliceItem(equipment);
  }

  //
  // Remove an item from the inventory
  //
  public removeItem(itemType: ItemTypeEnum, amount: number) {

    // Grab the item information for the item being removed
    var itemInformation = itemInformations.find(x => x.itemType == itemType);
    if (!itemInformation)
      return;

    // If the item is an equipment then do nothing
    if (itemInformation.itemSuperType === ItemSuperTypeEnum.Equipment)
      return;

    // Grab the item from the inventory
    var item = this.items.find(x => x.type == itemType);
    if (!item)
      return;

    // Reduce the item's amount by the amount to remove
    item.amount -= amount;

    // If there is no item left, remove it from the inventory entirely
    if (item.amount <= 0)
      this.spliceItem(item);
  }

  //
  // Gets the count of an item
  //
  public getItemCount(itemType: ItemTypeEnum) {
    var items = this.items.filter(x => x.type === itemType).map(x => x.amount);
    return !items || items.length === 0 ? 0 : items.reduce((x: number, y: number) => x + y);
  }

  //
  // Splices an item out of the array
  //
  private spliceItem(item: Item): void {
    var index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}

export default Inventory;