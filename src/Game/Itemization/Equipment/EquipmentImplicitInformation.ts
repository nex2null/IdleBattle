import ItemTypeEnum from "../Enums/ItemTypeEnum";
import StatEnum from '../../Enums/StatEnum';

// Information about equipment implicits
class EquipmentImplicitInformation {

  // Properties
  itemType: ItemTypeEnum;
  modifiedStat: StatEnum;
  minValue: number;
  maxValue: number;

  // Constructor
  constructor(
    itemType: ItemTypeEnum,
    modifiedStat: StatEnum,
    minValue: number,
    maxValue: number
  ) {
    this.itemType = itemType;
    this.modifiedStat = modifiedStat;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
}

// Collection of equipment implicits
var implicitInformations = new Array<EquipmentImplicitInformation>();

// Spider Silk Robe
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkRobe, StatEnum.Hp, 1, 10));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkRobe, StatEnum.Mp, 1, 5));

// Spider Silk Boots
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkBoots, StatEnum.Hp, 1, 10));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkBoots, StatEnum.StatusResistance, 1, 15));

// Spider Silk Cap
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkCap, StatEnum.Hp, 1, 10));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkCap, StatEnum.Resiliency, 15, 25));

// Spider Silk Armlets
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkArmlets, StatEnum.Hp, 1, 10));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkArmlets, StatEnum.CritChance, 15, 25));

// Spider Fang Dagger
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangDagger, StatEnum.Speed, 20, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangDagger, StatEnum.Strength, 1, 15));

// Spider Fang Wand
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangWand, StatEnum.Speed, 20, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangWand, StatEnum.Intelligence, 1, 15));

// Spider Fang Shield
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangShield, StatEnum.PhysicalResistance, 5, 15));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangShield, StatEnum.IncreasedHpPercent, 5, 10));

export { EquipmentImplicitInformation, implicitInformations };