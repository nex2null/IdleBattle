import ItemTypeEnum from "./Enums/ItemTypeEnum";
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';

// Information about items
class ItemInformation {

    // Properties
    itemType: ItemTypeEnum;
    itemSuperType: ItemSuperTypeEnum;
    ilvl: number;
    stackSize: number;

    // Constructor
    constructor(
        itemType: ItemTypeEnum,
        itemSuperType: ItemSuperTypeEnum,
        ilvl: number,
        stackSize: number
    ) {
        this.itemType = itemType;
        this.itemSuperType = itemSuperType;
        this.ilvl = ilvl;
        this.stackSize = stackSize;
    }
}

// Collection of item informations
var itemInformations = new Array<ItemInformation>();

// Equipment
itemInformations.push(new ItemInformation(ItemTypeEnum.FrayedClothRobe, ItemSuperTypeEnum.Equipment, 1, 1));
itemInformations.push(new ItemInformation(ItemTypeEnum.RustedChainmail, ItemSuperTypeEnum.Equipment, 1, 1));
itemInformations.push(new ItemInformation(ItemTypeEnum.WornLeatherChest, ItemSuperTypeEnum.Equipment, 1, 1));

export { ItemInformation, itemInformations };