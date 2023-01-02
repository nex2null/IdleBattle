import Item from "../Item";
import EquipmentAffix from './EquipmentAffix';
import ItemTypeEnum from '../Enums/ItemTypeEnum';
import ItemRarityEnum from '../Enums/ItemRarityEnum';
import EquipmentSlotEnum from '../Enums/EquipmentSlotEnum';
import EquipmentImplicit from './EquipmentImplicit';
import { Guid } from "guid-typescript";
import ItemSuperTypeEnum from "../Enums/ItemSuperTypeEnum";
import StatEnum from "../../Enums/StatEnum";
import EquipmentTagEnum from "../Enums/EquipmentTagEnum";

class Equipment extends Item {

  // Properties
  name: string;
  slot: EquipmentSlotEnum;
  tags: Array<EquipmentTagEnum>;
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
    tags: Array<EquipmentTagEnum>,
    implicits: Array<EquipmentImplicit>,
    affixes: Array<EquipmentAffix>,
    requiredLevel: number,
    id: string | null = null
  ) {
    super(type, ItemSuperTypeEnum.Equipment, rarity, ilvl, 1);
    this.name = name;
    this.slot = slot;
    this.tags = tags;
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

  // Get stat value
  getStatValue(stat: StatEnum) {

    // Grab implicit amount
    var implicitValues = this.implicits.filter(x => x.stat === stat).map(x => x.value);
    var implicitAmount = implicitValues.length ? implicitValues.reduce((a, b) => a + b) : 0;

    // Grab affix amount
    var affixValues = this.affixes.filter(x => x.modifiedStat === stat).map(x => x.value);
    var affixAmount = affixValues.length ? affixValues.reduce((a, b) => a + b) : 0;

    return implicitAmount + affixAmount;
  }
}

export default Equipment;