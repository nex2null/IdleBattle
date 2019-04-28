import Item from './Item';
import { itemInformations } from './ItemInformation';

class Inventory {

    // Properties
    items: Array<Item> = [];

    // Constructor
    constructor() { }

    // Add an item
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

    // Add a list of items
    public addItems(items: Array<Item>): void {
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }
    }
}

export default Inventory;