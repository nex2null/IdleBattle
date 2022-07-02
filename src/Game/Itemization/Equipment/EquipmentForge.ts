// Imports
import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";
import { affixInformations } from './EquipmentAffixInformation';
import Equipment from './Equipment';
import ItemTypeEnum from '../Enums/ItemTypeEnum';
import ItemRarityEnum from '../Enums/ItemRarityEnum';
import EquipmentAffix from './EquipmentAffix';
import EquipmentImplicit from './EquipmentImplicit';
import { implicitInformations } from './EquipmentImplicitInformation';
import RandomHelpers from '../../Utilities/RandomHelpers';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import { EquipmentInformation, itemInformations } from "../ItemInformation";
import Game from "../../Game";

//
// A cost to use a forge action
//
class ForgeCost {

  // Properties
  gold: number;
  reagents: Array<ForgeReagentCost>;

  // Constructor
  constructor(
    gold: number,
    reagents: Array<ForgeReagentCost>
  ) {
    this.gold = gold;
    this.reagents = reagents;
  }
}

//
// A cost in reagents to use a forge action
//
class ForgeReagentCost {

  // Properties
  itemType: ItemTypeEnum;
  itemName: string;
  amountRequired: number;

  // Constructor
  constructor(
    itemType: ItemTypeEnum,
    itemName: string,
    amountRequired: number
  ) {
    this.itemType = itemType;
    this.itemName = itemName;
    this.amountRequired = amountRequired;
  }
}

//
// The actions you can perform at the forge
//
enum ForgeActionsEnum {
  CraftEquipment = 'Craft Equipment',
  ReRollAffixes = 'Re-roll Affixes',
  UpgradeRarity = 'Upgrade Rarity'
}

class EquipmentForge {

  //
  // Get the cost for an action
  //
  static getActionCost(equipment: Equipment, action: ForgeActionsEnum): ForgeCost | null {

    // Grab the equipment information
    var equipmentInformation = itemInformations
      .find(x => x.itemType === equipment?.type) as EquipmentInformation;

    // Handle re-roll affixes
    if (action == ForgeActionsEnum.ReRollAffixes) {

      // Action is not allowed for normal equipment
      if (equipment.rarity === ItemRarityEnum.Normal)
        return null;

      // Set the rarity modifier
      var rarityModifier = equipment.rarity == ItemRarityEnum.Rare ? 3 : 1;

      // Return cost
      return new ForgeCost(100 * equipment.ilvl * rarityModifier, equipmentInformation.baseForgeReagents);
    }

    // Handle upgrade rarity affixes
    else if (action == ForgeActionsEnum.UpgradeRarity) {

      // Action is only allowed for normal and magic equipment
      if (equipment.rarity !== ItemRarityEnum.Normal && equipment.rarity !== ItemRarityEnum.Magic)
        return null;

      // Set the rarity modifier
      var rarityModifier = equipment.rarity == ItemRarityEnum.Magic ? 5 : 1;

      // Return cost
      return new ForgeCost(500 * equipment.ilvl * rarityModifier, equipmentInformation.baseForgeReagents);
    }

    return null;
  }

  //
  // Determine if forge costs can be afforded
  //
  static canAffordForgeCost(cost: ForgeCost): boolean {

    // Grab the town
    var town = Game.getInstance().town;

    // Can the gold be afforded?
    if (town.totalGold < cost.gold)
      return false;

    // Can the reagents be afforded?
    for (var i = 0; i < cost.reagents.length; i++) {
      var reagent = cost.reagents[i];
      if (town.inventory.getItemCount(reagent.itemType) < reagent.amountRequired)
        return false;
    }

    // If we make it here we can afford the cost
    return true;
  }

  //
  // Spends forge costs from town inventory
  //
  static spendForgeCost(cost: ForgeCost) {

    // Grab the town
    var town = Game.getInstance().town;

    // Decrement the gold cost from the town's gold
    town.totalGold -= cost.gold;

    // Decrement the reagents from the inventory item
    cost.reagents.forEach(x => town.inventory.removeItem(x.itemType, x.amountRequired));
  }

  // Creates a new piece of equipment
  public static createEquipment(
    baseType: ItemTypeEnum,
    rarity: ItemRarityEnum,
    ilvl: number
  ): Equipment {

    // Get the equipment information for the base type
    var equipmentInformation = itemInformations.find(x => x.itemType == baseType) as EquipmentInformation;

    // Create a normal item of the given base type
    var equipment = new Equipment(
      baseType,
      ItemRarityEnum.Normal,
      ilvl,
      equipmentInformation.itemName,
      equipmentInformation.slot,
      this.generateImplicits(baseType),
      [],
      equipmentInformation.requiredLvl
    );

    // If the rarity is magic or rare then upgrade the item to it
    if (rarity == ItemRarityEnum.Magic || rarity == ItemRarityEnum.Rare)
      this.upgradeEquipmentToRarity(equipment, rarity);

    return equipment;
  }

  // Generates all implicits for a piece of equipment
  private static generateImplicits(baseType: ItemTypeEnum): Array<EquipmentImplicit> {

    // Keep track of generated implicits
    var generatedImplicits: Array<EquipmentImplicit> = [];

    // Grab all the implicits for the base type
    var baseTypeImplicits = implicitInformations.filter(x => x.itemType == baseType);

    // Generate the implicits
    for (var i = 0; i < baseTypeImplicits.length; i++) {

      var implicit = baseTypeImplicits[i];

      // Get the implicit value
      var implicitValue = RandomHelpers.getRandomInt(implicit.minValue, implicit.maxValue);

      // Create the implicit
      generatedImplicits.push(new EquipmentImplicit(implicit.modifiedStat, implicitValue))
    }

    return generatedImplicits;
  }

  // Generates a random number of affixes for a piece of equipment
  private static generateAffixes(
    affixSlot: EquipmentAffixSlotEnum,
    amountToGenerate: number,
    ilvl: number,
    existingAffixes: Array<EquipmentAffix>
  ): Array<EquipmentAffix> {

    // Keep track of generated affixes
    var generatedAffixes: Array<EquipmentAffix> = [];

    // Get a list of all possible affixes for the affix slot and level
    var filteredAffixes = affixInformations.filter(x =>
      x.requiredLevel <= ilvl &&
      x.slot == affixSlot);

    // Remove the existing affix stats from the possibilities
    existingAffixes.forEach(x => filteredAffixes = filteredAffixes.filter(y => y.modifiedStat != x.modifiedStat));

    // Generate the affixes
    for (var i = 0; i < amountToGenerate; i++) {

      // Grab a random affix from our list of available ones
      var randomAffix = filteredAffixes[RandomHelpers.getRandomInt(0, filteredAffixes.length - 1)];
      if (randomAffix == null)
        break;

      // Remove all other affixes from our filtered affix list that
      // have the same modified stat as the affix we chose
      filteredAffixes = filteredAffixes.filter(x => x.modifiedStat != randomAffix.modifiedStat);

      // Roll a random number between the affix min/max
      var affixValue = RandomHelpers.getRandomInt(randomAffix.minValue, randomAffix.maxValue);

      // Generate our affix
      generatedAffixes.push(new EquipmentAffix(randomAffix.slot, randomAffix.modifiedStat, randomAffix.tier, affixValue));
    }

    return generatedAffixes;
  }

  // Get the minimum number of affixes (per slot) for an item rarity
  private static getMinAffixCountPerSlot(rarity: ItemRarityEnum): number {
    switch (rarity) {
      case ItemRarityEnum.Normal: return 0;
      case ItemRarityEnum.Magic: return 0;
      case ItemRarityEnum.Rare: return 1;
      default: throw new Error(`Could not find max affix count for item rarity: ${rarity}`);
    }
  }

  // Get the maximum number of affixes (per slot) of an item rarity
  private static getMaxAffixCountPerSlot(rarity: ItemRarityEnum): number {
    switch (rarity) {
      case ItemRarityEnum.Normal: return 0;
      case ItemRarityEnum.Magic: return 1;
      case ItemRarityEnum.Rare: return 3;
      default: throw new Error(`Could not find max affix count for item rarity: ${rarity}`);
    }
  }

  // Resets a piece of equipment back to normal status
  public static resetEquipmentToNormal(equipment: Equipment): void {
    equipment.affixes = [];
    equipment.rarity = ItemRarityEnum.Normal;
    equipment.craftingTags = [];
  }

  //
  // Upgrades an equipment's rarity
  //
  public static upgradeEquipmentRarity(equipment: Equipment): void {

    // Normal equipments upgrade to magic
    if (equipment.rarity === ItemRarityEnum.Normal)
      this.upgradeEquipmentToRarity(equipment, ItemRarityEnum.Magic);

    // Magic equipments upgrade to rare
    else if (equipment.rarity === ItemRarityEnum.Magic)
      this.upgradeEquipmentToRarity(equipment, ItemRarityEnum.Rare);
  }

  // Upgrades a normal equipment to magic
  public static upgradeEquipmentToRarity(equipment: Equipment, rarity: ItemRarityEnum): void {

    // Can't set items to normal rarity, downgrade rarity, or set an item to its own rarity
    if (rarity == ItemRarityEnum.Normal ||
      rarity == ItemRarityEnum.Magic && equipment.rarity == ItemRarityEnum.Rare ||
      rarity == equipment.rarity)
      return;

    // If the item is a normal item the generate a cool name for it
    equipment.name = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: ' ',
      length: 2
    });

    // Set the item rarity
    equipment.rarity = rarity;

    // Populate the affixes
    this.populateEquipmentAffixes(equipment, false);
  }

  // Populates equipment affixes
  private static populateEquipmentAffixes(equipment: Equipment, clearExistingAffixes: boolean): void {

    // If the equipment is normal rarity then do nothing
    if (equipment.rarity === ItemRarityEnum.Normal)
      return;

    // Clear existing affixes if we should
    if (clearExistingAffixes)
      equipment.affixes = [];

    // Get existing prefix/suffix counts on the item
    var existingPrefixes = equipment.affixes.filter(x => x.slot === EquipmentAffixSlotEnum.Prefix);
    var existingSuffixes = equipment.affixes.filter(x => x.slot === EquipmentAffixSlotEnum.Suffix);

    // Figure out how many prefixes / suffixes to generate
    var prefixCount = RandomHelpers.getRandomInt(existingPrefixes.length ? 0 : this.getMinAffixCountPerSlot(equipment.rarity),
      this.getMaxAffixCountPerSlot(equipment.rarity) - existingPrefixes.length);
    var suffixCount = RandomHelpers.getRandomInt(existingSuffixes.length ? 0 : this.getMinAffixCountPerSlot(equipment.rarity),
      this.getMaxAffixCountPerSlot(equipment.rarity) - existingSuffixes.length);

    // Make sure we always generate at least 1 new prefix/suffix if we are upgrading
    if (prefixCount + suffixCount == 0) {
      if (RandomHelpers.getRandomInt(0, 1) == 0) prefixCount++;
      else suffixCount++;
    }

    // Ensure rare items will always have at least 3 affixes total
    if (equipment.rarity == ItemRarityEnum.Rare && prefixCount + existingPrefixes.length + suffixCount + existingSuffixes.length < 3) {
      if (RandomHelpers.getRandomInt(0, 1) == 0) prefixCount++;
      else suffixCount++;
    }

    // Generate prefixes and suffixes
    var prefixes = this.generateAffixes(EquipmentAffixSlotEnum.Prefix, prefixCount, equipment.ilvl, existingPrefixes);
    var suffixes = this.generateAffixes(EquipmentAffixSlotEnum.Suffix, suffixCount, equipment.ilvl, existingSuffixes);
    var generatedAffixes = prefixes.concat(suffixes);

    // Set the affixes on the equipment
    equipment.affixes = equipment.affixes.concat(generatedAffixes);
  }

  // Re-rolls all the affixes on a piece of equipment
  public static reRollEquipmentAffixes(equipment: Equipment): void {
    this.populateEquipmentAffixes(equipment, true);
  }

  // Adds a random affix to a piece of equipment
  public static addRandomAffixToEquipment(equipment: Equipment): void {

    // Get existing prefix/suffix counts on the item
    var existingPrefixes = equipment.affixes.filter(x => x.slot === EquipmentAffixSlotEnum.Prefix);
    var existingSuffixes = equipment.affixes.filter(x => x.slot === EquipmentAffixSlotEnum.Suffix);

    // Sanity check that we are not at the max affixes already
    var maxAffixCountPerSlot = this.getMaxAffixCountPerSlot(equipment.rarity);
    if (existingPrefixes.length == maxAffixCountPerSlot && existingSuffixes.length == maxAffixCountPerSlot)
      return;

    // We need to determine which affix slot we will generate
    var slotToGenerate: EquipmentAffixSlotEnum;
    if (existingPrefixes.length == maxAffixCountPerSlot)
      slotToGenerate = EquipmentAffixSlotEnum.Suffix;
    else if (existingSuffixes.length == maxAffixCountPerSlot)
      slotToGenerate = EquipmentAffixSlotEnum.Prefix;
    else
      slotToGenerate = RandomHelpers.getRandomInt(0, 1) == 1 ? EquipmentAffixSlotEnum.Prefix : EquipmentAffixSlotEnum.Suffix;

    // Generate the affix and add to the equipment
    var existingAffixes = slotToGenerate === EquipmentAffixSlotEnum.Prefix ? existingSuffixes : existingPrefixes;
    var generatedAffix = this.generateAffixes(slotToGenerate, 1, equipment.ilvl, existingAffixes);
    if (generatedAffix.length)
      equipment.affixes.push(generatedAffix[0]);
  }

  // Re-roll implicit values on equipment
  public static reRollEquipmentImplicitValues(equipment: Equipment): void {
    equipment.implicits = this.generateImplicits(equipment.type);
  }

  // Re-roll affix values on equipment
  public static reRollEquipmentAffixValues(equipment: Equipment): void {

    // Iterate through every affix
    for (var i = 0; i < equipment.affixes.length; i++) {

      // Grab the current affix
      var currentAffix = equipment.affixes[i];

      // Grab the affix information
      var affixInformation = affixInformations.find(x => x.modifiedStat == currentAffix.modifiedStat && x.tier == currentAffix.tier);
      if (!affixInformation)
        continue;

      // Re-roll the affix value
      currentAffix.value = RandomHelpers.getRandomInt(affixInformation.minValue, affixInformation.maxValue);
    }
  }
}

export { ForgeActionsEnum, ForgeCost, ForgeReagentCost, EquipmentForge };