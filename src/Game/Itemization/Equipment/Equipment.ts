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
    requiredLevel: number,
    id: string | null = null
  ) {
    super(type, ItemSuperTypeEnum.Equipment, rarity, ilvl, 1);
    this.name = name;
    this.slot = slot;
    this.implicits = implicits;
    this.affixes = affixes;
    this.requiredLevel = requiredLevel;
    this.id = id || Guid.create().toString();
  }

  // Load from saved data
  static load(savedData: any) {
    return new Equipment(
      savedData.type,
      savedData.rarity,
      savedData.ilvl,
      savedData.name,
      savedData.slot,
      savedData.implicits.map((x: any) => EquipmentImplicit.load(x)),
      savedData.affixes.map((x: any) => EquipmentAffix.load(x)),
      savedData.requiredLevel,
      savedData.id
    );
  }
}

export default Equipment;