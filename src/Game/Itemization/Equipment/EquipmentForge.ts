import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";
import { affixInformations, EquipmentAffixInformation } from './EquipmentAffixInformation';
import Equipment from './Equipment';
import ItemTypeEnum from '../Enums/ItemTypeEnum';
import ItemRarityEnum from '../Enums/ItemRarityEnum';
import EquipmentSlotEnum from '../Enums/EquipmentSlotEnum';
import EquipmentAffix from './EquipmentAffix';
import EquipmentImplicit from './EquipmentImplicit';
import { implicitInformations } from './EquipmentImplicitInformation';
import RandomHelpers from '../../Utilities/RandomHelpers';
import EquipmentAffixTypeEnum from '../Enums/EquipmentAffixTypeEnum';

class EquipmentForge {

    // Creates a new piece of equipment
    static createEquipment(
        baseType: ItemTypeEnum,
        rarity: ItemRarityEnum,
        ilvl: number
    ): Equipment {

        // Create a normal item of the given base type
        var equipment = new Equipment(
            baseType,
            ItemRarityEnum.Normal,
            ilvl,
            'Test Equipment',
            this.getEquipmentSlot(baseType),
            this.generateImplicits(baseType),
            [],
            this.getEquipmentLevel(baseType)
        );

        // If the rarity is magic or rare then upgrade the item to it
        if (rarity == ItemRarityEnum.Magic || rarity == ItemRarityEnum.Rare)
            this.upgradeEquipmentToRarity(equipment, rarity);

        return equipment;
    }

    // Gets the slot for a given base type of equipment
    private static getEquipmentSlot(baseType: ItemTypeEnum): EquipmentSlotEnum {
        switch (baseType) {
            case ItemTypeEnum.FrayedClothRobe: return EquipmentSlotEnum.ChestPiece;
            case ItemTypeEnum.RustedChainmail: return EquipmentSlotEnum.ChestPiece;
            case ItemTypeEnum.WornLeatherChest: return EquipmentSlotEnum.ChestPiece;
            default: throw new Error(`Could not find slot for item type: ${baseType}`);
        }
    }

    // Gets the level for a given base type of equipment
    private static getEquipmentLevel(baseType: ItemTypeEnum): number {
        switch (baseType) {
            case ItemTypeEnum.FrayedClothRobe: return 1;
            case ItemTypeEnum.RustedChainmail: return 1;
            case ItemTypeEnum.WornLeatherChest: return 1;
            default: throw new Error(`Could not find required level for item type: ${baseType}`);
        }
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
        ilvl: number
    ): Array<EquipmentAffix> {

        // Keep track of generated affixes
        var generatedAffixes: Array<EquipmentAffix> = [];

        // Get a list of all possible affixes for the affix slot and level
        var filteredAffixes = affixInformations.filter(x =>
            x.requiredLevel <= ilvl &&
            x.slot == affixSlot);

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
            generatedAffixes.push(new EquipmentAffix(randomAffix.type, affixValue));
        }

        return generatedAffixes;
    }

    // Get the minimum number of affixes (per slot) for an item rarity
    private static getMinAffixCountPerSlot(rarity: ItemRarityEnum): number {
        switch (rarity) {
            case ItemRarityEnum.Normal: return 0;
            case ItemRarityEnum.Magic: return 1;
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

    // Upgrades a normal equipment to magic
    public static upgradeEquipmentToRarity(equipment: Equipment, rarity: ItemRarityEnum): void {

        // Can't set items to normal rarity, downgrade rarity, or set an item to its own rarity
        if (rarity == ItemRarityEnum.Normal ||
            rarity == ItemRarityEnum.Magic && equipment.rarity == ItemRarityEnum.Rare ||
            rarity == equipment.rarity)
            return;

        // If the item is a normal item the generate a cool name for it
        // TODO

        // Set the item rarity
        equipment.rarity = rarity;

        // Populate the affixes
        this.populateEquipmentAffixes(equipment, false);
    }

    // Gets the affix information for a given type
    private static getEquipmentAffixInformation(affixType: EquipmentAffixTypeEnum): EquipmentAffixInformation {

        // Grab the affix information and sanity check
        var affixInformation = affixInformations.find(x => x.type == affixType);
        if (!affixInformation)
            throw new Error(`Could not find affix information for type ${affixType}`);

        return affixInformation;
    }

    // Populates equipment affixes
    private static populateEquipmentAffixes(equipment: Equipment, clearExistingAffixes: boolean): void {

        // Clear existing affixes if we should
        if (clearExistingAffixes)
            equipment.affixes = [];

        // Get existing prefix/suffix counts on the item
        var existingPrefixCount = equipment.affixes.filter(x =>
            this.getEquipmentAffixInformation(x.type).slot == EquipmentAffixSlotEnum.Prefix).length;
        var existingSuffixCount = equipment.affixes.filter(x =>
            this.getEquipmentAffixInformation(x.type).slot == EquipmentAffixSlotEnum.Suffix).length;

        // Figure out how many prefixes / suffixes to generate
        var prefixCount = RandomHelpers.getRandomInt(existingPrefixCount ? 0 : this.getMinAffixCountPerSlot(equipment.rarity),
            this.getMaxAffixCountPerSlot(equipment.rarity) - existingPrefixCount);
        var suffixCount = RandomHelpers.getRandomInt(existingSuffixCount ? 0 : this.getMinAffixCountPerSlot(equipment.rarity),
            this.getMaxAffixCountPerSlot(equipment.rarity) - existingSuffixCount);

        // Make sure we always generate at least 1 new prefix/suffix if we are upgrading
        if (prefixCount + suffixCount == 0) {
            if (RandomHelpers.getRandomInt(0, 1) == 0) prefixCount++;
            else suffixCount++;
        }

        // Ensure rare items will always have at least 3 affixes total
        if (equipment.rarity == ItemRarityEnum.Rare && prefixCount + existingPrefixCount + suffixCount + existingSuffixCount < 3) {
            if (RandomHelpers.getRandomInt(0, 1) == 0) prefixCount++;
            else suffixCount++;
        }

        // Generate prefixes and suffixes
        var prefixes = this.generateAffixes(EquipmentAffixSlotEnum.Prefix, prefixCount, equipment.ilvl);
        var suffixes = this.generateAffixes(EquipmentAffixSlotEnum.Suffix, suffixCount, equipment.ilvl);
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
        var existingPrefixCount = equipment.affixes.filter(x =>
            this.getEquipmentAffixInformation(x.type).slot == EquipmentAffixSlotEnum.Prefix).length;
        var existingSuffixCount = equipment.affixes.filter(x =>
            this.getEquipmentAffixInformation(x.type).slot == EquipmentAffixSlotEnum.Suffix).length;

        // Sanity check that we are not at the max affixes already
        var maxAffixCountPerSlot = this.getMaxAffixCountPerSlot(equipment.rarity);
        if (existingPrefixCount == maxAffixCountPerSlot && existingSuffixCount == maxAffixCountPerSlot)
            return;

        // We need to determine which affix slot we will generate
        var slotToGenerate: EquipmentAffixSlotEnum;
        if (existingPrefixCount == maxAffixCountPerSlot)
            slotToGenerate = EquipmentAffixSlotEnum.Suffix;
        else if (existingSuffixCount == maxAffixCountPerSlot)
            slotToGenerate = EquipmentAffixSlotEnum.Prefix;
        else
            slotToGenerate = RandomHelpers.getRandomInt(0, 1) == 1 ? EquipmentAffixSlotEnum.Prefix : EquipmentAffixSlotEnum.Suffix;

        // Generate the affix and add to the equipment
        var generatedAffix = this.generateAffixes(slotToGenerate, 1, equipment.ilvl);
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
            var affixInformation = affixInformations.find(x => x.type == currentAffix.type);
            if (!affixInformation)
                continue;

            // Re-roll the affix value
            currentAffix.value = RandomHelpers.getRandomInt(affixInformation.minValue, affixInformation.maxValue);
        }
    }
}

export default EquipmentForge;