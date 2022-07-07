import ItemTypeEnum from "./Enums/ItemTypeEnum";
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import ItemRarityEnum from "./Enums/ItemRarityEnum";
import EquipmentSlotEnum from "./Enums/EquipmentSlotEnum";
import { ForgeCost, ForgeReagentCost } from "./Equipment/EquipmentForge";

// Information about items
class ItemInformation {

  // Properties
  itemType: ItemTypeEnum;
  itemName: string;
  itemSuperType: ItemSuperTypeEnum;
  ilvl: number;
  stackSize: number;

  // Constructor
  constructor(
    itemType: ItemTypeEnum,
    itemName: string,
    itemSuperType: ItemSuperTypeEnum,
    ilvl: number,
    stackSize: number
  ) {
    this.itemType = itemType;
    this.itemName = itemName;
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
    itemName: string,
    rarity: ItemRarityEnum,
    ilvl: number
  ) {
    super(itemType, itemName, ItemSuperTypeEnum.Material, ilvl, 100000);
    this.rarity = rarity;
  }
}

// Information about an equipment
class EquipmentInformation extends ItemInformation {

  // Properties
  requiredLvl: number;
  slot: EquipmentSlotEnum;
  craftable: boolean;
  craftingReagents: Array<ForgeReagentCost>;
  baseForgeReagents: Array<ForgeReagentCost>;
  isUnique: boolean;

  // Constructor
  constructor(
    itemType: ItemTypeEnum,
    equipmentName: string,
    ilvl: number,
    requiredLvl: number,
    slot: EquipmentSlotEnum,
    craftable: boolean,
    craftingReagents: Array<ForgeReagentCost>,
    baseForgeReagents: Array<ForgeReagentCost>,
    isUnique: boolean = false
  ) {
    super(itemType, equipmentName, ItemSuperTypeEnum.Equipment, ilvl, 1);
    this.requiredLvl = requiredLvl;
    this.slot = slot;
    this.craftable = craftable;
    this.craftingReagents = craftingReagents;
    this.baseForgeReagents = baseForgeReagents;
    this.isUnique = isUnique;
  }
}

// Collection of item informations
var itemInformations = new Array<ItemInformation>();

// Material items
itemInformations.push(new MaterialInformation(ItemTypeEnum.SpiderFang, "Spider Fang", ItemRarityEnum.Normal, 1));

//
// Equipment
//

// Spider silk robe
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderSilkRobe,
  'Spider Silk Robe',
  1,
  1,
  EquipmentSlotEnum.ChestPiece,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, "Spider Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, "Spider Fang", 1))
));

// Spider fang dagger
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderFangDagger,
  'Spider Fang Dagger',
  1,
  1,
  EquipmentSlotEnum.Weapon,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, 'Spider Fang', 5)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, 'Spider Fang', 1))
));

// Spider fang wand
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderFangWand,
  'Spider Fang Wand',
  1,
  1,
  EquipmentSlotEnum.Weapon,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, 'Spider Fang', 5)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, 'Spider Fang', 1))
));

export { MaterialInformation, EquipmentInformation, ItemInformation, itemInformations };