// Imports
const blessed = require('blessed');
import EquipmentAffixSlotEnum from "../../Game/Itemization/Enums/EquipmentAffixSlotEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";

//
// UI Helpers
//
class UIHelpers {

  //
  // Delays a certain number of milliseconds
  //
  static delay(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //
  // Renders equipment details to a blessed box
  //
  static renderEquipmentDetailsToBox(equipment: Equipment, blessedBox: any) {

    // Start at the 0th line
    var currentLine = 0;

    // Name
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Name: ${equipment.name}`
    });

    // Type
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Type: ${equipment.type}`
    });

    // Rarity
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Rarity: ${equipment.rarity}`
    });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      orientation: 'horizontal',
      width: blessedBox.width - 2
    });

    // Implicits label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Implicits:`
    });

    // Implicits
    equipment.implicits.forEach(implicit => {
      blessed.box({
        parent: blessedBox,
        top: currentLine++,
        height: 1,
        width: blessedBox.width - 2,
        content: `${implicit.stat} - ${implicit.value}`
      });
    });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      orientation: 'horizontal',
      width: blessedBox.width - 2
    });

    // Prefixes label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Prefixes:`
    });

    // Prefixes
    equipment
      .affixes
      .filter(x => x.slot === EquipmentAffixSlotEnum.Prefix).forEach(prefix => {
        blessed.box({
          parent: blessedBox,
          top: currentLine++,
          height: 1,
          width: blessedBox.width - 2,
          content: `${prefix.modifiedStat} - ${prefix.value}`
        });
      });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      orientation: 'horizontal',
      width: blessedBox.width - 2
    });

    // Suffixes label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Suffixes:`
    });

    // Suffixes
    equipment
      .affixes
      .filter(x => x.slot === EquipmentAffixSlotEnum.Suffix).forEach(suffix => {
        blessed.box({
          parent: blessedBox,
          top: currentLine++,
          height: 1,
          width: blessedBox.width - 2,
          content: `${suffix.modifiedStat} - ${suffix.value}`
        });
      });
  }
}

export default UIHelpers;