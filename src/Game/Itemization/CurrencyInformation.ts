import { ItemInformation, itemInformations } from "./ItemInformation";
import ItemTypeEnum from './Enums/ItemTypeEnum';
import Game from '../Game';
import Item from './Item';
import ItemSuperTypeEnum from './Enums/ItemSuperTypeEnum';
import Equipment from './Equipment/Equipment';
import ItemRarityEnum from './Enums/ItemRarityEnum';
import EquipmentForge from './Equipment/EquipmentForge';
import EquipmentCraftingTagEnum from './Enums/EquipmentCraftingTagEnum';

// Information about a currency item
class CurrencyInformation extends ItemInformation {

    // Properties
    isTargeted: boolean;
    targetItemSuperType: ItemSuperTypeEnum | null;
    use: (targetItem: Item | null) => boolean;

    // Constructor
    constructor(
        itemType: ItemTypeEnum,
        isTargeted: boolean,
        targetItemSuperType: ItemSuperTypeEnum | null,
        use: (targetItem: Item | null) => boolean
    ) {
        super(itemType, ItemSuperTypeEnum.Currency, 1, 99);
        this.isTargeted = isTargeted;
        this.targetItemSuperType = targetItemSuperType;
        this.use = use;
    }
}

// Orb of abolition
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfAbolition,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is not normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity == ItemRarityEnum.Normal)
            return false;

        // Reset the equipment back to normal
        EquipmentForge.resetEquipmentToNormal(targetEquipment);
        return true;
    })
);

// Orb of imbuing
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfImbuing,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Normal)
            return false;

        // Upgrade the equipment to magic
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Magic);
        return true;
    })
);

// Orb of conjury
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfImbuing,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Normal)
            return false;

        // Upgrade the equipment to rare
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Rare);
        return true;
    })
);

// Orb of conjury
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfImbuing,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Normal)
            return false;

        // Upgrade the equipment to rare
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Rare);
        return true;
    })
);

// Orb of promotion
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPromotion,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is magic
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Magic)
            return false;

        // Upgrade the equipment to rare
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Rare);
        return true;
    })
);

// Orb of mutation
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfMutation,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is magic
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Magic)
            return false;

        // Re-roll the equipment affixes
        EquipmentForge.reRollEquipmentAffixes(targetEquipment);
        return true;
    })
);

// Orb of pandemonium
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPandemonium,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is rare
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Rare)
            return false;

        // Re-roll the equipment affixes
        EquipmentForge.reRollEquipmentAffixes(targetEquipment);
        return true;
    })
);

// Orb of thaumaturgy
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfThaumaturgy,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment is magic
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Magic)
            return false;

        // Get the existing equipment affix count
        var existingAffixCount = targetEquipment.affixes.length;

        // Attempt to add an affix to the equipment
        EquipmentForge.addRandomAffixToEquipment(targetEquipment);

        // If an affix was added then the item was successful, otherwise it was not
        return existingAffixCount < targetEquipment.affixes.length;
    })
);

// Orb of fortune
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfThaumaturgy,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment is rare
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Rare)
            return false;

        // Get the existing equipment affix count
        var existingAffixCount = targetEquipment.affixes.length;

        // Attempt to add an affix to the equipment
        EquipmentForge.addRandomAffixToEquipment(targetEquipment);

        // If an affix was added then the item was successful, otherwise it was not
        return existingAffixCount < targetEquipment.affixes.length;
    })
);

// Orb of balance
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfBalance,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        var targetEquipment = <Equipment>targetItem;
        EquipmentForge.reRollEquipmentImplicitValues(targetEquipment);
        return true;
    })
);

// Orb of perfection
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPerfection,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment has affixes
        var targetEquipment = <Equipment>targetItem;
        if (!targetEquipment.affixes.length)
            return false;

        // Re-roll the affix values
        EquipmentForge.reRollEquipmentAffixValues(targetEquipment);
        return true;
    })
);

// Alpha orb
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPerfection,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment does not already have frozen prefixes
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.craftingTags.find(x => x == EquipmentCraftingTagEnum.PrefixesCannotBeChanged))
            return false;

        // Add the prefixes cannot be changed tag
        targetEquipment.craftingTags.push(EquipmentCraftingTagEnum.PrefixesCannotBeChanged);
        return true;
    })
);

// Omega orb
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPerfection,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment does not already have frozen suffixes
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.craftingTags.find(x => x == EquipmentCraftingTagEnum.SuffixesCannotBeChanged))
            return false;

        // Add the suffixes cannot be changed tag
        targetEquipment.craftingTags.push(EquipmentCraftingTagEnum.SuffixesCannotBeChanged);
        return true;
    })
);

// Orb of extraction
// TODO

// Orb of distillation
// TODO

// Orb of empowerment
// TODO