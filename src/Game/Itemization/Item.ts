import ItemRarityEnum from "./Enums/ItemRarityEnum";
import ItemTypeEnum from './Enums/ItemTypeEnum';

class Item {

    // Properties
    type: ItemTypeEnum;
    rarity: ItemRarityEnum;
    ilvl: number;
    amount: number;
    tags: Array<string> = [];

    // Constructor
    constructor(
        type: ItemTypeEnum,
        rarity: ItemRarityEnum,
        ilvl: number,
        amount: number
    ) {
        this.type = type;
        this.rarity = rarity;
        this.ilvl = ilvl;
        this.amount = amount;
    }
}

export default Item;