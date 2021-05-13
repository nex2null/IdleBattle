import ItemRarityEnum from "./Enums/ItemRarityEnum";
import ItemSuperTypeEnum from "./Enums/ItemSuperTypeEnum";
import ItemTypeEnum from './Enums/ItemTypeEnum';
import Equipment from "./Equipment/Equipment";

class Item {

  // Properties
  type: ItemTypeEnum;
  superType: ItemSuperTypeEnum;
  rarity: ItemRarityEnum;
  ilvl: number;
  amount: number;

  // Constructor
  constructor(
    type: ItemTypeEnum,
    superType: ItemSuperTypeEnum,
    rarity: ItemRarityEnum,
    ilvl: number,
    amount: number
  ) {
    this.type = type;
    this.superType = superType;
    this.rarity = rarity;
    this.ilvl = ilvl;
    this.amount = amount;
  }

  // Load from saved data
  static load(savedData: any) {

    // If the item is an equipment, return that
    if (savedData.superType === ItemSuperTypeEnum.Equipment)
      return Equipment.load(savedData);

    // Return the item
    return new Item(
      savedData.type,
      savedData.superType,
      savedData.rarity,
      savedData.ilvl,
      savedData.amount
    );
  }
}

export default Item;