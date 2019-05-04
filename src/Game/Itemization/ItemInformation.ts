import ItemTypeEnum from "./Enums/ItemTypeEnum";
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';

// Information about items
class ItemInformation {

    // Properties
    itemType: ItemTypeEnum;
    itemSuperType: ItemSuperTypeEnum;
    ilvl: number;
    stackSize: number;

    // Constructor
    constructor(
        itemType: ItemTypeEnum,
        itemSuperType: ItemSuperTypeEnum,
        ilvl: number,
        stackSize: number
    ) {
        this.itemType = itemType;
        this.itemSuperType = itemSuperType;
        this.ilvl = ilvl;
        this.stackSize = stackSize;
    }
}

// Collection of item informations
var itemInformations = new Array<ItemInformation>();

// Currency
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfAbolition, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfImbuing, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfConjury, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfPromotion, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfMutation, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfPandemonium, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfThaumaturgy, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfFortune, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfBalance, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfDiscord, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.AlphaOrb, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OmegaOrb, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfExtraction, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfDistillation, ItemSuperTypeEnum.Currency, 1, 99));
itemInformations.push(new ItemInformation(ItemTypeEnum.OrbOfEmpowerment, ItemSuperTypeEnum.Currency, 1, 99));

// Equipment
itemInformations.push(new ItemInformation(ItemTypeEnum.FrayedClothRobe, ItemSuperTypeEnum.Equipment, 1, 1));
itemInformations.push(new ItemInformation(ItemTypeEnum.RustedChainmail, ItemSuperTypeEnum.Equipment, 1, 1));
itemInformations.push(new ItemInformation(ItemTypeEnum.WornLeatherChest, ItemSuperTypeEnum.Equipment, 1, 1));

export { ItemInformation, itemInformations };