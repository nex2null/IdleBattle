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
itemInformations.push(new MaterialInformation(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", ItemRarityEnum.Normal, 10));


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

// Spider silk boots
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderSilkBoots,
  'Spider Silk Boots',
  1,
  1,
  EquipmentSlotEnum.Boots,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, "Spider Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, "Spider Fang", 1))
));

// Spider silk cap
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderSilkCap,
  'Spider Silk Cap',
  1,
  1,
  EquipmentSlotEnum.Helmet,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, "Spider Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, "Spider Fang", 1))
));

// Spider silk armlets
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderSilkArmlets,
  'Spider Silk Armlets',
  1,
  1,
  EquipmentSlotEnum.Gloves,
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

// Spider fang shield
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.SpiderFangShield,
  'Spider Fang Shield',
  1,
  1,
  EquipmentSlotEnum.OffHand,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, 'Spider Fang', 5)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.SpiderFang, 'Spider Fang', 1))
));

// Weaver silk robe
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverSilkRobe,
  'Weaver Silk Robe',
  10,
  10,
  EquipmentSlotEnum.ChestPiece,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 1))
));

// Weaver silk boots
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverSilkBoots,
  'Weaver Silk Boots',
  10,
  10,
  EquipmentSlotEnum.Boots,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 1))
));

// Weaver silk cap
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverSilkCap,
  'Weaver Silk Cap',
  10,
  10,
  EquipmentSlotEnum.Helmet,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 1))
));

// Weaver silk armlets
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverSilkArmlets,
  'Weaver Silk Armlets',
  10,
  10,
  EquipmentSlotEnum.Gloves,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 10)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, "Funnel Weaver Fang", 1))
));

// Weaver fang dagger
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverFangDagger,
  'Weaver Fang Dagger',
  10,
  10,
  EquipmentSlotEnum.Weapon,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, 'Funnel Weaver Fang', 5)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, 'Funnel Weaver Fang', 1))
));

// Weaver fang wand
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverFangWand,
  'Weaver Fang Wand',
  10,
  10,
  EquipmentSlotEnum.Weapon,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, 'Funnel Weaver Fang', 5)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, 'Funnel Weaver Fang', 1))
));

// Weaver fang shield
itemInformations.push(new EquipmentInformation(
  ItemTypeEnum.WeaverFangShield,
  'Weaver Fang Shield',
  10,
  10,
  EquipmentSlotEnum.OffHand,
  true,
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, 'Funnel Weaver Fang', 5)),
  new Array<ForgeReagentCost>(new ForgeReagentCost(ItemTypeEnum.FunnelWeaverFang, 'Funnel Weaver Fang', 1))
));

export { MaterialInformation, EquipmentInformation, ItemInformation, itemInformations };