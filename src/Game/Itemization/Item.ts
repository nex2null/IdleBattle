import ItemRarityEnum from "./Enums/ItemRarityEnum";
import ItemTypeEnum from './Enums/ItemTypeEnum';

class Item {

    // Properties
    type: ItemTypeEnum;
    rarity: ItemRarityEnum;
    ilvl: number;

    // Constructor
    constructor(
        type: ItemTypeEnum,
        rarity: ItemRarityEnum,
        ilvl: number
    ) {
        this.type = type;
        this.ilvl = ilvl;
        this.rarity = rarity;
    }
}

export default Item;