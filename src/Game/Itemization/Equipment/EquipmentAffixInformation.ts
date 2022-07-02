import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";
import StatEnum from '../../Enums/StatEnum';

// Information about equipment affixes
class EquipmentAffixInformation {

    // Properties
    slot: EquipmentAffixSlotEnum;
    requiredLevel: number;
    minValue: number;
    maxValue: number;
    modifiedStat: StatEnum;
    tier: number;

    // Constructor
    constructor(
        slot: EquipmentAffixSlotEnum,
        modifiedStat: StatEnum,
        tier: number,
        requiredLevel: number,
        minValue: number,
        maxValue: number
    ) {
        this.slot = slot;
        this.requiredLevel = requiredLevel;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.modifiedStat = modifiedStat;
        this.tier = tier;
    }
}

// Helpful vars
var pfx = EquipmentAffixSlotEnum.Prefix;
var sfx = EquipmentAffixSlotEnum.Suffix;
var affixInformations = new Array<EquipmentAffixInformation>();

// Physical Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 1, 1, 1, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 2, 10, 11, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 3, 20, 21, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 4, 30, 31, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 5, 40, 41, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 6, 50, 51, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 7, 60, 61, 70));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 8, 70, 71, 80));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 9, 80, 81, 90));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.PhysicalPower, 10, 90, 91, 100));

// Cold Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 1, 1, 1, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 2, 10, 11, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 3, 20, 21, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 4, 30, 31, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 5, 40, 41, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 6, 50, 51, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 7, 60, 61, 70));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 8, 70, 71, 80));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 9, 80, 81, 90));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.ColdPower, 10, 90, 91, 100));

// Fire Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 1, 1, 1, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 2, 10, 11, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 3, 20, 21, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 4, 30, 31, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 5, 40, 41, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 6, 50, 51, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 7, 60, 61, 70));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 8, 70, 71, 80));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 9, 80, 81, 90));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.FirePower, 10, 90, 91, 100));

// Lightning Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 1, 1, 1, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 2, 10, 11, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 3, 20, 21, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 4, 30, 31, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 5, 40, 41, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 6, 50, 51, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 7, 60, 61, 70));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 8, 70, 71, 80));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 9, 80, 81, 90));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.LightningPower, 10, 90, 91, 100));

// Heal Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 1, 1, 1, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 2, 10, 11, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 3, 20, 21, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 4, 30, 31, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 5, 40, 41, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 6, 50, 51, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 7, 60, 61, 70));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 8, 70, 71, 80));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 9, 80, 81, 90));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.HealPower, 10, 90, 91, 100));

// Crit Chance Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 1, 1, 20, 25));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 2, 10, 26, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 3, 20, 31, 35));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 4, 30, 36, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 5, 40, 41, 45));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 6, 50, 46, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 7, 60, 51, 55));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 8, 70, 56, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 9, 80, 61, 65));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.CritChance, 10, 90, 66, 70));

// Hp Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 1, 1, 1, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 2, 10, 11, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 3, 20, 21, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 4, 30, 31, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 5, 40, 41, 50));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 6, 50, 51, 60));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 7, 60, 61, 70));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 8, 70, 71, 80));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 9, 80, 81, 90));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Hp, 10, 90, 91, 100));

// Mp Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 1, 1, 1, 5));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 2, 10, 6, 10));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 3, 20, 11, 15));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 4, 30, 16, 20));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 5, 40, 21, 25));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 6, 50, 26, 30));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 7, 60, 31, 35));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 8, 70, 36, 40));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 9, 80, 41, 45));
affixInformations.push(new EquipmentAffixInformation(pfx, StatEnum.Mp, 10, 90, 46, 50));

// Physical Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 1, 1, 1, 25));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 2, 10, 26, 50));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 3, 20, 51, 75));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 4, 30, 76, 100));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 5, 40, 101, 125));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 6, 50, 126, 150));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 7, 60, 151, 175));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 8, 70, 176, 200));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 9, 80, 201, 225));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.PhysicalResistance, 10, 90, 226, 250));

// Cold Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 1, 1, 1, 25));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 2, 10, 26, 50));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 3, 20, 51, 75));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 4, 30, 76, 100));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 5, 40, 101, 125));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 6, 50, 126, 150));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 7, 60, 151, 175));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 8, 70, 176, 200));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 9, 80, 201, 225));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.ColdResistance, 10, 90, 226, 250));

// Fire Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 1, 1, 1, 25));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 2, 10, 26, 50));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 3, 20, 51, 75));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 4, 30, 76, 100));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 5, 40, 101, 125));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 6, 50, 126, 150));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 7, 60, 151, 175));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 8, 70, 176, 200));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 9, 80, 201, 225));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.FireResistance, 10, 90, 226, 250));

// Lightning Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 1, 1, 1, 25));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 2, 10, 26, 50));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 3, 20, 51, 75));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 4, 30, 76, 100));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 5, 40, 101, 125));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 6, 50, 126, 150));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 7, 60, 151, 175));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 8, 70, 176, 200));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 9, 80, 201, 225));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.LightningResistance, 10, 90, 226, 250));

// Status Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 1, 1, 1, 15));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 2, 10, 16, 30));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 3, 20, 31, 45));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 4, 30, 46, 60));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 5, 40, 61, 75));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 6, 50, 76, 90));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 7, 60, 91, 105));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 8, 70, 106, 120));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 9, 80, 121, 135));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.StatusResistance, 10, 90, 136, 150));

// Resiliency Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 1, 1, 20, 25));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 2, 10, 26, 30));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 3, 20, 31, 35));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 4, 30, 36, 40));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 5, 40, 41, 45));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 6, 50, 46, 50));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 7, 60, 51, 55));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 8, 70, 56, 60));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 9, 80, 61, 65));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.Resiliency, 10, 90, 66, 70));

// Increased HP Percent Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 1, 1, 1, 5));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 2, 10, 6, 10));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 3, 20, 11, 15));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 4, 30, 16, 20));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 5, 40, 21, 25));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 6, 50, 26, 30));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 7, 60, 31, 35));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 8, 70, 36, 40));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 9, 80, 41, 45));
affixInformations.push(new EquipmentAffixInformation(sfx, StatEnum.IncreasedHpPercent, 10, 90, 46, 50));

export { EquipmentAffixInformation, affixInformations };