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
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkRobe, StatEnum.Intelligence, 1, 5));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkRobe, StatEnum.Mp, 1, 5));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangDagger, StatEnum.Speed, 5, 5));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangDagger, StatEnum.PhysicalPower, 1, 2));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangHammer, StatEnum.Speed, 1, 1));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangHammer, StatEnum.PhysicalPower, 4, 5));

export { EquipmentImplicitInformation, implicitInformations };