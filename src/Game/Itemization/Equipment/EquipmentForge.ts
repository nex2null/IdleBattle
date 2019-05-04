import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";
import { affixInformations } from './EquipmentAffixInformation';
import Equipment from './Equipment';
import ItemTypeEnum from '../Enums/ItemTypeEnum';
import ItemRarityEnum from '../Enums/ItemRarityEnum';
import EquipmentSlotEnum from '../Enums/EquipmentSlotEnum';
import EquipmentAffix from './EquipmentAffix';
import EquipmentImplicit from './EquipmentImplicit';
import { implicitInformations } from './EquipmentImplicitInformation';
import { getRandomInt } from '@/Utilities/RandomHelpers';

class EquipmentForge {

    static createEquipment(
        baseType: ItemTypeEnum,
        rarity: ItemRarityEnum,
        ilvl: number): Equipment {

        // Figure out how many prefixes / suffixes to generate
        var prefixCount = getRandomInt(this.getMinAffixCountPerSlot(rarity), this.getMaxAffixCountPerSlot(rarity));
        var suffixCount = getRandomInt(this.getMinAffixCountPerSlot(rarity), this.getMaxAffixCountPerSlot(rarity));

        // Ensure rare items will always have at least 3 affixes
        if (rarity == ItemRarityEnum.Rare && prefixCount + suffixCount < 3) {
            if (getRandomInt(0, 1) == 0) prefixCount++;
            else suffixCount++;
        }

        // Generate prefixes and suffixes
        var prefixes = this.generateAffixes(EquipmentAffixSlotEnum.Prefix, prefixCount, ilvl);
        var suffixes = this.generateAffixes(EquipmentAffixSlotEnum.Suffix, suffixCount, ilvl);
        var affixes = prefixes.concat(suffixes);

        // Create the base equipment
        return new Equipment(
            baseType,
            rarity,
            ilvl,
            'Test Equipment',
            this.getEquipmentSlot(baseType),
            this.generateImplicits(baseType),
            affixes,
            this.getEquipmentLevel(baseType))
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
            var implicitValue = getRandomInt(implicit.minValue, implicit.maxValue);

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
            var randomAffix = filteredAffixes[getRandomInt(0, filteredAffixes.length)];
            if (randomAffix == null)
                break;

            // Remove all other affixes from our filtered affix list that
            // have the same modified stat as the affix we chose
            filteredAffixes = filteredAffixes.filter(x => x.modifiedStat != randomAffix.modifiedStat);

            // Roll a random number between the affix min/max
            var affixValue = getRandomInt(randomAffix.minValue, randomAffix.maxValue);

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
}

export default EquipmentForge;