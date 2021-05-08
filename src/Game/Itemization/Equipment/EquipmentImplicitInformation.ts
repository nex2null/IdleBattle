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

export { EquipmentImplicitInformation, implicitInformations };