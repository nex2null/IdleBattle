import EquipmentAffixSlotEnum from "./Enums/EquipmentAffixSlotEnum";
import { affixInformations } from './EquipmentAffixInformation';
import Equipment from './Equipment';
import ItemTypeEnum from './Enums/ItemTypeEnum';
import ItemRarityEnum from './Enums/ItemRarityEnum';
import EquipmentSlotEnum from './Enums/EquipmentSlotEnum';
import EquipmentAffix from './EquipmentAffix';
import EquipmentImplicit from './EquipmentImplicit';
import { implicitInformations } from './EquipmentImplicitInformation';

class EquipmentForge {

    createEquipment(
        baseType: ItemTypeEnum,
        rarity: ItemRarityEnum,
        ilvl: number): Equipment {

        // Generate prefixes and suffixes
        var prefixes = this.generateAffixes(rarity, EquipmentAffixSlotEnum.Prefix, ilvl);
        var suffixes = this.generateAffixes(rarity, EquipmentAffixSlotEnum.Suffix, ilvl);
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
            1)
    }

    // Gets the slot for a given base type of equipment
    private getEquipmentSlot(baseType: ItemTypeEnum): EquipmentSlotEnum {
        switch (baseType) {
            case ItemTypeEnum.FrayedClothRobe: return EquipmentSlotEnum.ChestPiece;
            case ItemTypeEnum.RustedChainmail: return EquipmentSlotEnum.ChestPiece;
            case ItemTypeEnum.WornLeatherChest: return EquipmentSlotEnum.ChestPiece;
            default: throw new Error(`Could not find slot for item type: ${baseType}`);
        }
    }

    // Gets the level for a given base type of equipment
    private getEquipmentLevel(baseType: ItemTypeEnum): number {
        switch (baseType) {
            case ItemTypeEnum.FrayedClothRobe: return 1;
            case ItemTypeEnum.RustedChainmail: return 1;
            case ItemTypeEnum.WornLeatherChest: return 1;
            default: throw new Error(`Could not find required level for item type: ${baseType}`);
        }
    }

    // Generates all implicits for a piece of equipment
    private generateImplicits(baseType: ItemTypeEnum): Array<EquipmentImplicit> {

        // Keep track of generated implicits
        var generatedImplicits: Array<EquipmentImplicit> = [];

        // Grab all the implicits for the base type
        var baseTypeImplicits = implicitInformations.filter(x => x.itemType == baseType);

        // Generate the implicits
        for (var i = 0; i < baseTypeImplicits.length; i++) {

            var implicit = baseTypeImplicits[i];

            // Get the implicit value
            var implicitValue = this.getRandomIntBetween(implicit.minValue, implicit.maxValue);

            // Create the implicit
            generatedImplicits.push(new EquipmentImplicit(implicit.modifiedStat, implicitValue))
        }

        return generatedImplicits;
    }

    // Generates a random number of affixes for a piece of equipment
    private generateAffixes(
        rarity: ItemRarityEnum,
        affixSlot: EquipmentAffixSlotEnum,
        ilvl: number
    ): Array<EquipmentAffix> {

        // Keep track of generated affixes
        var generatedAffixes: Array<EquipmentAffix> = [];

        // Get a list of all possible affixes for the affix slot and level
        var filteredAffixes = affixInformations.filter(x =>
            x.requiredLevel <= ilvl &&
            x.slot == affixSlot);

        // Figure out how many affixes we want to generate
        var amountToGenerate = this.getRandomIntBetween(
            this.getMinAffixCountPerSlot(rarity),
            this.getMaxAffixCountPerSlot(rarity));

        // Generate the affixes
        for (var i = 0; i < amountToGenerate; i++) {

            // Grab a random affix from our list of available ones
            var randomAffix = filteredAffixes[this.getRandomInt(filteredAffixes.length)];
            if (randomAffix == null)
                break;

            // Remove all other affixes from our filtered affix list that
            // have the same modified stat as the affix we chose
            filteredAffixes = filteredAffixes.filter(x => x.modifiedStat != randomAffix.modifiedStat);

            // Roll a random number between the affix min/max
            var affixValue = this.getRandomIntBetween(randomAffix.minValue, randomAffix.maxValue);

            // Generate our affix
            generatedAffixes.push(new EquipmentAffix(randomAffix.type, affixValue));
        }

        return generatedAffixes;
    }

    // Get the minimum number of affixes (per slot) for an item rarity
    private getMinAffixCountPerSlot(rarity: ItemRarityEnum): number {
        switch (rarity) {
            case ItemRarityEnum.Normal: return 0;
            case ItemRarityEnum.Magic: return 1;
            case ItemRarityEnum.Rare: return 1;
            default: throw new Error(`Could not find max affix count for item rarity: ${rarity}`);
        }
    }

    // Get the maximum number of affixes (per slot) of an item rarity
    private getMaxAffixCountPerSlot(rarity: ItemRarityEnum): number {
        switch (rarity) {
            case ItemRarityEnum.Normal: return 0;
            case ItemRarityEnum.Magic: return 1;
            case ItemRarityEnum.Rare: return 3;
            default: throw new Error(`Could not find max affix count for item rarity: ${rarity}`);
        }
    }

    // Get a random number between 0 and max
    private getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Get a random number between two numbers (inclusive)
    private getRandomIntBetween(min: number, max: number) {
        return this.getRandomInt(max - min) + min;
    }
}

export default EquipmentForge;