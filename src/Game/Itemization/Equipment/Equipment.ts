import Item from "../Item";
import EquipmentAffix from './EquipmentAffix';
import ItemTypeEnum from '../Enums/ItemTypeEnum';
import ItemRarityEnum from '../Enums/ItemRarityEnum';
import EquipmentSlotEnum from '../Enums/EquipmentSlotEnum';
import EquipmentImplicit from './EquipmentImplicit';
import { Guid } from "guid-typescript";
import ItemSuperTypeEnum from "../Enums/ItemSuperTypeEnum";

class Equipment extends Item {

  // Properties
  name: string;
  slot: EquipmentSlotEnum;
  implicits: Array<EquipmentImplicit>;
  affixes: Array<EquipmentAffix>;
  requiredLevel: number;
  craftingTags: Array<string> = [];
  id: string;

  // Constructor
  constructor(
    type: ItemTypeEnum,
    rarity: ItemRarityEnum,
    ilvl: number,
    name: string,
    slot: EquipmentSlotEnum,
    implicits: Array<EquipmentImplicit>,
    affixes: Array<EquipmentAffix>,
    requiredLevel: number
  ) {
    super(type, ItemSuperTypeEnum.Equipment, rarity, ilvl, 1);
    this.name = name;
    this.slot = slot;
    this.implicits = implicits;
    this.affixes = affixes;
    this.requiredLevel = requiredLevel;
    this.id = Guid.create().toString();
  }
}

export default Equipment;