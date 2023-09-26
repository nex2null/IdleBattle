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

// Minor healing flask
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.MinorHealingFlask, StatEnum.HpRegen, 1, 3));

// Weaver Silk Robe
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkRobe, StatEnum.Hp, 11, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkRobe, StatEnum.Mp, 6, 10));

// Weaver Silk Boots
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkBoots, StatEnum.Hp, 11, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkBoots, StatEnum.StatusResistance, 16, 30));

// Weaver Silk Cap
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkCap, StatEnum.Hp, 11, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkCap, StatEnum.Resiliency, 20, 30));

// Weaver Silk Armlets
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkArmlets, StatEnum.Hp, 11, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverSilkArmlets, StatEnum.CritChance, 20, 30));

// Weaver Fang Dagger
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverFangDagger, StatEnum.Speed, 20, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverFangDagger, StatEnum.Strength, 21, 35));

// Weaver Fang Wand
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverFangWand, StatEnum.Speed, 20, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverFangWand, StatEnum.Intelligence, 21, 35));

// Weaver Fang Shield
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverFangShield, StatEnum.PhysicalResistance, 30, 40));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.WeaverFangShield, StatEnum.IncreasedHpPercent, 10, 15));

export { EquipmentImplicitInformation, implicitInformations };