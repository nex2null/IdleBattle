import ItemTypeEnum from './Enums/ItemTypeEnum';
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import Item from './Item';
import { itemInformations, MaterialInformation } from './ItemInformation';
import RandomHelpers from '../Utilities/RandomHelpers';

// An option for generating a piece of loot
class LootGenerationOption {

  // Properties
  itemType: ItemTypeEnum;
  chance: number;
  amount: number;

  // Constructor
  constructor(
    itemType: ItemTypeEnum,
    amount: number,
    chance: number
  ) {
    this.itemType = itemType;
    this.chance = chance;
    this.amount = amount;
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

    // Determine how many items to attempt to generate
    var itemsToGenerate = RandomHelpers.getRandomInt(1, maxItemsToGenerate);

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

    // Grab the item information
    var itemInformation = itemInformations.filter(x => x.itemType == option.itemType)[0];

    // If the item super type is a material then return the amount of it
    if (itemInformation.itemSuperType == ItemSuperTypeEnum.Material) {
      var materialInformation = itemInformation as MaterialInformation;
      return new Item(
        materialInformation.itemType,
        materialInformation.itemSuperType,
        materialInformation.rarity,
        materialInformation.ilvl,
        option.amount);
    }

    throw new Error("Should never get here");
  }
}

export { LootGenerationOption, LootGenerator };