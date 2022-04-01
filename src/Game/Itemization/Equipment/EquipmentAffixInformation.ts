import EquipmentAffixSlotEnum from "../Enums/EquipmentAffixSlotEnum";
import EquipmentAffixTypeEnum from '../Enums/EquipmentAffixTypeEnum';
import StatEnum from '../../Enums/StatEnum';

// Information about equipment affixes
class EquipmentAffixInformation {

    // Properties
    slot: EquipmentAffixSlotEnum;
    type: EquipmentAffixTypeEnum;
    requiredLevel: number;
    minValue: number;
    maxValue: number;
    modifiedStat: StatEnum;

    // Constructor
    constructor(
        slot: EquipmentAffixSlotEnum,
        type: EquipmentAffixTypeEnum,
        requiredLevel: number,
        minValue: number,
        maxValue: number,
        modifiedStat: StatEnum
    ) {
        this.slot = slot;
        this.type = type;
        this.requiredLevel = requiredLevel;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.modifiedStat = modifiedStat;
    }
}

// Helpful vars
var pfx = EquipmentAffixSlotEnum.Prefix;
var sfx = EquipmentAffixSlotEnum.Suffix;
var affixInformations = new Array<EquipmentAffixInformation>();

// Physical Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Rusty, 1, 1, 10, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Heavy, 10, 11, 20, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Sharpened, 20, 21, 30, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Serrated, 30, 31, 40, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Wicked, 40, 41, 50, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Vicious, 50, 51, 60, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Bloodthirsty, 60, 61, 70, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Cruel, 70, 71, 80, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Tyrranical, 80, 81, 90, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Merciless, 90, 91, 100, StatEnum.PhysicalPower));

// Cold Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Frosted, 1, 1, 10, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Chilled, 10, 11, 20, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Icy, 20, 21, 30, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Arctic, 30, 31, 40, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Frigid, 40, 41, 50, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Freezing, 50, 51, 60, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Frozen, 60, 61, 70, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Glaciated, 70, 71, 80, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Polar, 80, 81, 90, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Numbing, 90, 91, 100, StatEnum.ColdPower));

// Fire Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Heated, 1, 1, 10, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Smoldering, 10, 11, 20, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Smoking, 20, 21, 30, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Sizzling, 30, 31, 40, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Burning, 40, 41, 50, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Flaming, 50, 51, 60, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Scorching, 60, 61, 70, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Incinerating, 70, 71, 80, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Blasting, 80, 81, 90, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Cremating, 90, 91, 100, StatEnum.FirePower));

// Lightning Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Humming, 1, 1, 10, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Buzzing, 10, 11, 20, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Snapping, 20, 21, 30, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Popping, 30, 31, 40, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Crackling, 40, 41, 50, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Sparking, 50, 51, 60, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Arcing, 60, 61, 70, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Shocking, 70, 71, 80, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Discharging, 80, 81, 90, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Electrocuting, 90, 91, 100, StatEnum.LightningPower));

// Heal Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Refreshing, 1, 1, 10, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Rejuvenating, 10, 11, 20, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Replenishing, 20, 21, 30, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Revitalizing, 30, 31, 40, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Renewing, 40, 41, 50, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Restoring, 50, 51, 60, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Priestly, 60, 61, 70, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Saintly, 70, 71, 80, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Heavenly, 80, 81, 90, StatEnum.HealPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Angelic, 90, 91, 100, StatEnum.HealPower));

// Physical Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Rock, 1, 1, 5, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Stone, 10, 6, 10, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Iron, 20, 11, 15, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Steel, 30, 16, 20, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Barriers, 40, 21, 25, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Garrison, 50, 26, 30, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Fortress, 60, 31, 35, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Castle, 70, 36, 40, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Mountain, 80, 41, 45, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Earth, 90, 46, 50, StatEnum.PhysicalResistance));

// Cold Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Snow, 1, 1, 5, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Hale, 10, 6, 10, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Rime, 20, 11, 15, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Yeti, 30, 16, 20, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Blizzard, 40, 21, 25, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Avalanche, 50, 26, 30, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Tundra, 60, 31, 35, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Winter, 70, 36, 40, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Hibernation, 80, 41, 45, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.AbsoluteZero, 90, 46, 50, StatEnum.ColdResistance));

// Fire Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Kindling, 1, 1, 5, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Embers, 10, 6, 10, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Drake, 20, 11, 15, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Ashes, 30, 16, 20, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Cinders, 40, 21, 25, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Furnace, 50, 26, 30, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Magma, 60, 31, 35, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Inferno, 70, 36, 40, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Volcano, 80, 41, 45, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Nova, 90, 46, 50, StatEnum.FireResistance));

// Lightning Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Clouds, 1, 1, 5, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Squall, 10, 6, 10, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Thunder, 20, 11, 15, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Lightning, 30, 16, 20, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Bolts, 40, 21, 25, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Gale, 50, 26, 30, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Tempest, 60, 31, 35, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Tornado, 70, 36, 40, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Vortex, 80, 41, 45, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Maelstrom, 90, 46, 50, StatEnum.LightningResistance));

// Status Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Snuffing, 1, 1, 5, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Vitiation, 10, 6, 10, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Revoking, 20, 11, 15, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Rebuttal, 30, 16, 20, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Abjuration, 40, 21, 25, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Cancelling, 50, 26, 30, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Dismissal, 60, 31, 35, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Expunging, 70, 36, 40, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Annulment, 80, 41, 45, StatEnum.StatusResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Nullification, 90, 46, 50, StatEnum.StatusResistance));

export { EquipmentAffixInformation, affixInformations };