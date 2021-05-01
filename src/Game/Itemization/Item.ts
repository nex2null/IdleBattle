import ItemRarityEnum from "./Enums/ItemRarityEnum";
import ItemSuperTypeEnum from "./Enums/ItemSuperTypeEnum";
import ItemTypeEnum from './Enums/ItemTypeEnum';

class Item {

    // Properties
    type: ItemTypeEnum;
    superType: ItemSuperTypeEnum;
    rarity: ItemRarityEnum;
    ilvl: number;
    amount: number;

    // Constructor
    constructor(
        type: ItemTypeEnum,
        superType: ItemSuperTypeEnum,
        rarity: ItemRarityEnum,
        ilvl: number,
        amount: number
    ) {
        this.type = type;
        this.superType = superType;
        this.rarity = rarity;
        this.ilvl = ilvl;
        this.amount = amount;
    }
}

export default Item;