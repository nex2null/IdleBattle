import ItemTypeEnum from "./Enums/ItemTypeEnum";
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import ItemRarityEnum from "./Enums/ItemRarityEnum";

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

// Information about a material
class MaterialInformation extends ItemInformation {

  // Properties
  rarity: ItemRarityEnum;

  // Constructor
  constructor(
    itemType: ItemTypeEnum,
    rarity: ItemRarityEnum,
    ilvl: number
  ) {
    super(itemType, ItemSuperTypeEnum.Material, ilvl, 100000);
    this.rarity = rarity;
  }
}

// Collection of item informations
var itemInformations = new Array<ItemInformation>();

// Material items
itemInformations.push(new MaterialInformation(ItemTypeEnum.SpiderFang, ItemRarityEnum.Normal, 1));

// Equipment
itemInformations.push(new ItemInformation(ItemTypeEnum.FrayedClothRobe, ItemSuperTypeEnum.Equipment, 1, 1));
itemInformations.push(new ItemInformation(ItemTypeEnum.RustedChainmail, ItemSuperTypeEnum.Equipment, 1, 1));
itemInformations.push(new ItemInformation(ItemTypeEnum.WornLeatherChest, ItemSuperTypeEnum.Equipment, 1, 1));

export { MaterialInformation, ItemInformation, itemInformations };