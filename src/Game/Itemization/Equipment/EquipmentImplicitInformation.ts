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
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkRobe, StatEnum.Hp, 1, 10));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderSilkRobe, StatEnum.Mp, 1, 5));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangDagger, StatEnum.Speed, 20, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangDagger, StatEnum.Strength, 1, 15));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangWand, StatEnum.Speed, 20, 20));
implicitInformations.push(new EquipmentImplicitInformation(ItemTypeEnum.SpiderFangWand, StatEnum.Intelligence, 1, 15));

export { EquipmentImplicitInformation, implicitInformations };