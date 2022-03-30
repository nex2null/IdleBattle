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
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Sharpened, 19, 21, 30, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Serrated, 27, 31, 40, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Wicked, 34, 41, 50, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Vicious, 40, 51, 60, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Bloodthirsty, 45, 61, 70, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Cruel, 50, 71, 80, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Tyrranical, 55, 81, 90, StatEnum.PhysicalPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Merciless, 60, 91, 100, StatEnum.PhysicalPower));

// Cold Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Frosted, 1, 1, 10, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Chilled, 10, 11, 20, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Icy, 19, 21, 30, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Arctic, 27, 31, 40, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Frigid, 34, 41, 50, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Freezing, 40, 51, 60, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Frozen, 45, 61, 70, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Glaciated, 50, 71, 80, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Polar, 55, 81, 90, StatEnum.ColdPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Numbing, 60, 91, 100, StatEnum.ColdPower));

// Fire Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Heated, 1, 1, 10, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Smoldering, 10, 11, 20, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Smoking, 19, 21, 30, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Sizzling, 27, 31, 40, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Burning, 34, 41, 50, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Flaming, 40, 51, 60, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Scorching, 45, 61, 70, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Incinerating, 50, 71, 80, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Blasting, 55, 81, 90, StatEnum.FirePower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Cremating, 60, 91, 100, StatEnum.FirePower));

// Lightning Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Humming, 1, 1, 10, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Buzzing, 10, 11, 20, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Snapping, 19, 21, 30, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Popping, 27, 31, 40, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Crackling, 34, 41, 50, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Sparking, 40, 51, 60, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Arcing, 45, 61, 70, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Shocking, 50, 71, 80, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Discharging, 55, 81, 90, StatEnum.LightningPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Electrocuting, 60, 91, 100, StatEnum.LightningPower));

// Healing Power Prefixes
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Refreshing, 1, 1, 10, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Rejuvenating, 10, 11, 20, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Replenishing, 19, 21, 30, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Revitalizing, 27, 31, 40, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Renewing, 34, 41, 50, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Restoring, 40, 51, 60, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Priestly, 45, 61, 70, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Saintly, 50, 71, 80, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Heavenly, 55, 81, 90, StatEnum.HealingPower));
affixInformations.push(new EquipmentAffixInformation(pfx, EquipmentAffixTypeEnum.Angelic, 60, 91, 100, StatEnum.HealingPower));

// Physical Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Rock, 1, 1, 5, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Stone, 10, 6, 10, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Iron, 19, 11, 15, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Steel, 27, 16, 20, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Barriers, 34, 21, 25, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Garrison, 40, 26, 30, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Fortress, 45, 31, 35, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Castle, 50, 36, 40, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Mountain, 55, 41, 45, StatEnum.PhysicalResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Earth, 60, 46, 50, StatEnum.PhysicalResistance));

// Cold Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Snow, 1, 1, 5, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Hale, 10, 6, 10, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Rime, 19, 11, 15, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Yeti, 27, 16, 20, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Blizzard, 34, 21, 25, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Avalanche, 40, 26, 30, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Tundra, 45, 31, 35, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Winter, 50, 36, 40, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Hibernation, 55, 41, 45, StatEnum.ColdResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.AbsoluteZero, 60, 46, 50, StatEnum.ColdResistance));

// Fire Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Kindling, 1, 1, 5, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Embers, 10, 6, 10, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Drake, 19, 11, 15, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Ashes, 27, 16, 20, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Cinders, 34, 21, 25, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Furnace, 40, 26, 30, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Magma, 45, 31, 35, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Inferno, 50, 36, 40, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Volcano, 55, 41, 45, StatEnum.FireResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Nova, 60, 46, 50, StatEnum.FireResistance));

// Lightning Resistance Suffixes
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Clouds, 1, 1, 5, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Squall, 10, 6, 10, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Thunder, 19, 11, 15, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Lightning, 27, 16, 20, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Bolts, 34, 21, 25, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Gale, 40, 26, 30, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Tempest, 45, 31, 35, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Tornado, 50, 36, 40, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Vortex, 55, 41, 45, StatEnum.LightningResistance));
affixInformations.push(new EquipmentAffixInformation(sfx, EquipmentAffixTypeEnum.Maelstrom, 60, 46, 50, StatEnum.LightningResistance));

export { EquipmentAffixInformation, affixInformations };