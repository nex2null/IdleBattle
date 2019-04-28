import ItemTypeEnum from './Enums/ItemTypeEnum';
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import ItemRarityEnum from './Enums/ItemRarityEnum';
import Item from './Item';
import { itemInformations } from './ItemInformation';
import { getRandomInt } from '@/Utilities/RandomHelpers';
import EquipmentForge from './EquipmentForge';

// An option for generating a piece of loot
class LootGenerationOption {

    // Properties
    itemType: ItemTypeEnum | null;
    itemSuperType: ItemSuperTypeEnum;
    itemRarity: ItemRarityEnum | null;
    ilvl: number;
    chance: number;

    // Constructor
    constructor(
        itemType: ItemTypeEnum | null,
        itemSuperType: ItemSuperTypeEnum,
        itemRarity: ItemRarityEnum | null,
        ilvl: number,
        chance: number
    ) {
        this.itemType = itemType;
        this.itemSuperType = itemSuperType;
        this.itemRarity = itemRarity;
        this.ilvl = ilvl;
        this.chance = chance;
    }
}

// Generates loot
class LootGenerator {

    public static generateLoot(
        maxItemsToGenerate: number,
        options: Array<LootGenerationOption>
    ): Array<Item> {

        // Copy the generation options
        var availableOptions = [...options];

        // Determine how many items to generate
        var itemsToGenerate = getRandomInt(0, maxItemsToGenerate);

        // Keep track of generated items
        var generatedItems: Array<Item> = [];

        // Keep track of the loot generation option we last generated an item from
        var lastUsedOption: LootGenerationOption | null = null;

        // Generate the items        
        for (var i = 0; i < itemsToGenerate; i++) {

            // Loop through the available loot generation options until we generate an item
            // or we run have enumerated all the options
            for (var j = 0; j < availableOptions.length; j++) {
                var item = this.generateSingleLoot(availableOptions[j]);
                if (item) {
                    generatedItems.push(item);
                    lastUsedOption = availableOptions[j];
                    break;
                }
            }

            // If we used an option from the list then ensure we don't use it again
            if (lastUsedOption != null) {
                availableOptions = availableOptions.filter(x => x != lastUsedOption);
                lastUsedOption = null;
            }
        }

        return generatedItems;
    }

    // Generates a single piece of loot (or nothing) given an option
    private static generateSingleLoot(option: LootGenerationOption): Item | null {

        // Determine if we are going to generate anything
        if (Math.random() * 100 > option.chance)
            return null;

        // Determine the item type
        var itemType = option.itemType || this.GetRandomItemType(option.itemSuperType);

        // Determine the item rarity
        var itemRarity = option.itemRarity || this.GetRandomItemRarity(option.itemSuperType);

        // Determine the item ilvl
        var ilvl = option.itemSuperType == ItemSuperTypeEnum.Currency ? 1 : option.ilvl;

        // If the item super type is an equipment then forge the equipment
        if (option.itemSuperType == ItemSuperTypeEnum.Equipment)
            return EquipmentForge.createEquipment(itemType, itemRarity, ilvl);

        // Return the item

        return new Item(itemType, itemRarity, ilvl, 1);
    }

    // Gets a random item type given a super type
    private static GetRandomItemType(superType: ItemSuperTypeEnum): ItemTypeEnum {
        // TODO: Make this not completely random, obviously
        var validItems = itemInformations.filter(x => x.itemSuperType == superType);
        return validItems[getRandomInt(0, validItems.length)].itemType;
    }

    // Gets a random item rarity given a super type
    private static GetRandomItemRarity(superType: ItemSuperTypeEnum): ItemRarityEnum {
        // TODO: Make this make more sense, obviously

        // Currency items are always normal
        if (superType == ItemSuperTypeEnum.Currency)
            return ItemRarityEnum.Normal;

        // Figure out the item rarity
        var randomNumber = getRandomInt(1, 100);
        if (randomNumber <= 50) return ItemRarityEnum.Normal;
        else if (randomNumber <= 85) return ItemRarityEnum.Magic;
        else return ItemRarityEnum.Rare;
    }
}

export { LootGenerationOption, LootGenerator };