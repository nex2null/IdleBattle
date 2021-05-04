

// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import EquipmentAffixSlotEnum from "../../Game/Itemization/Enums/EquipmentAffixSlotEnum";
import EquipmentSlotEnum from "../../Game/Itemization/Enums/EquipmentSlotEnum";
import ItemSuperTypeEnum from "../../Game/Itemization/Enums/ItemSuperTypeEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";
import Equipper from "../../Game/Itemization/Equipment/Equipper";
import Town from "../../Game/Town";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";

class EquipmentScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentPlayerIndex: number = 0;
  town: Town;
  displayedEquipment: Array<Equipment> = [];

  // Constructor
  constructor() {
    this.screen = null;
    this.town = Game.getInstance().town;
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    this.screen = screen;

    // Character's equipment box
    this.screenElements.characterBox = blessed.box({
      top: 0,
      left: 0,
      width: 30,
      height: 50,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    });

    // Switch labels for the character name
    this.screenElements.characterSwitchLabels = blessed.box({
      parent: this.screenElements.characterBox,
      top: 1,
      height: 1,
      width: 24,
      left: 'center',
      content: '<<{|}>>',
      tags: true
    });

    // Character name
    this.screenElements.characterNameLabel = blessed.box({
      parent: this.screenElements.characterBox,
      top: 1,
      height: 1,
      width: 18,
      left: 'center',
      content: '',
      tags: true,
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      },
    });

    // Line under the character name
    this.screenElements.characterNameLine = blessed.line({
      parent: this.screenElements.characterBox,
      top: 2,
      left: 'center',
      orientation: 'horizontal',
      width: 24
    });

    // Equipped chestpiece box
    this.screenElements.chestBox = blessed.box({
      parent: this.screenElements.characterBox,
      top: 5,
      height: 5,
      width: 26,
      left: 'center',
      border: {
        type: 'line'
      },
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      },
      label: 'Chest',
      content: 'Empty',
      tags: true
    });

    // Equipped boots box
    this.screenElements.bootsBox = blessed.box({
      parent: this.screenElements.characterBox,
      top: 11,
      height: 5,
      width: 26,
      left: 'center',
      border: {
        type: 'line'
      },
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      },
      label: 'Boots',
      content: 'Empty',
      tags: true
    });

    // Container for equipment list
    this.screenElements.equipmentListBox = blessed.box({
      top: 0,
      left: 31,
      width: 40,
      height: 50,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    });

    // List of available equipment for selected slot
    this.screenElements.equipmentListBox = blessed.list({
      top: 0,
      left: 31,
      width: 40,
      height: 50,
      border: {
        type: 'line'
      },
      label: 'Equipment',
      style: {
        border: {
          fg: 'white'
        },
        selected: {
          bg: 'white',
          fg: 'black'
        }
      },
      keys: true
    });

    // Details about the selected equipment in the list
    this.screenElements.selectedEquipmentDetailsBox = blessed.box({
      top: 0,
      left: 72,
      height: 25,
      width: 40,
      content: '',
      label: 'Selected Equipment',
      border: {
        type: 'line'
      }
    });

    // Details about the equipped equipment
    this.screenElements.currentEquipmentDetailsBox = blessed.box({
      top: 25,
      left: 72,
      height: 25,
      width: 40,
      content: '',
      label: 'Current Equipment',
      border: {
        type: 'line'
      }
    });

    // Set key bindings
    this.screenElements.characterNameLabel.key(['down'], () => this.screenElements.chestBox.focus());
    this.screenElements.characterNameLabel.key(['right'], () => this.setCurrentPlayer(this.currentPlayerIndex + 1));
    this.screenElements.characterNameLabel.key(['left'], () => this.setCurrentPlayer(this.currentPlayerIndex - 1));
    this.screenElements.characterNameLabel.key(['escape'], () => this.exitScreen());
    this.screenElements.chestBox.key(['up'], () => this.screenElements.characterNameLabel.focus());
    this.screenElements.chestBox.key(['down'], () => this.screenElements.bootsBox.focus());
    this.screenElements.chestBox.key(['enter'], () => this.loadEquipmentList(EquipmentSlotEnum.ChestPiece));
    this.screenElements.chestBox.key(['escape'], () => this.exitScreen());
    this.screenElements.chestBox.key(['u'], () => this.unequipEquipment(EquipmentSlotEnum.ChestPiece));
    this.screenElements.bootsBox.key(['up'], () => this.screenElements.chestBox.focus());
    this.screenElements.bootsBox.key(['enter'], () => this.loadEquipmentList(EquipmentSlotEnum.Boots));
    this.screenElements.bootsBox.key(['escape'], () => this.exitScreen());
    this.screenElements.bootsBox.key(['u'], () => this.unequipEquipment(EquipmentSlotEnum.Boots));
    this.screenElements.equipmentListBox.key(['escape'], () => this.unloadEquipmentList());
    this.screenElements.equipmentListBox.on('select', (el: any, sel: any) => this.handleEquipmentListSelected(el, sel));
    this.screenElements.equipmentListBox.on('select item', (el: any, sel: any) => this.handleEquipmentListFocused(el, sel));

    // Handle events
    this.screenElements.characterNameLabel.on('focus', () => this.clearCurrentEquipmentDetails());
    this.screenElements.chestBox.on('focus', () => this.handleEquippedItemFocused(EquipmentSlotEnum.ChestPiece));
    this.screenElements.bootsBox.on('focus', () => this.handleEquippedItemFocused(EquipmentSlotEnum.Boots));

    // Append items to screen
    this.screen.append(this.screenElements.characterBox);
    this.screen.append(this.screenElements.equipmentListBox);
    this.screen.append(this.screenElements.selectedEquipmentDetailsBox);
    this.screen.append(this.screenElements.currentEquipmentDetailsBox);

    // Set focus to character name
    this.screenElements.characterNameLabel.focus();

    // Set current player
    this.setCurrentPlayer(0);
  }

  //
  // Exits the current screen
  //
  private exitScreen() {
    ScreenManager.getInstance().loadScreen(new TownScreen());
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
  }

  //
  // Sets the current player
  //
  private setCurrentPlayer(index: number) {

    this.currentPlayerIndex = index;

    // If index is less than 0, set index to the last character
    if (this.currentPlayerIndex < 0)
      this.currentPlayerIndex = this.town.playerCharacters.length - 1;

    // If index is equal to or greater than the player characters length
    // then set it to the first character
    else if (this.currentPlayerIndex >= this.town.playerCharacters.length)
      this.currentPlayerIndex = 0;

    // Refresh the equipped equipment
    this.refreshEquippedEquipment();
  }

  //
  // Refreshes the equipped equipment
  //
  private refreshEquippedEquipment() {

    // Grab the current character
    var character = this.town.playerCharacters[this.currentPlayerIndex];

    // Update the name of the character
    this.screenElements.characterNameLabel.setContent(`{center}${character.name}{/}`);

    // Update the chest piece name
    var equippedChestPiece = character.equipment.get(EquipmentSlotEnum.ChestPiece);
    this.screenElements.chestBox.setContent(equippedChestPiece ? equippedChestPiece.name : 'Empty');

    // Update the boots name
    var equippedBoots = character.equipment.get(EquipmentSlotEnum.Boots);
    this.screenElements.bootsBox.setContent(equippedBoots ? equippedBoots.name : 'Empty');

    // Render the screen
    this.screen.render();
  }

  //
  // Loads all the equipment for a given slot
  //
  private loadEquipmentList(slot: EquipmentSlotEnum) {

    // Grab all the items of the given equipment slot
    this.displayedEquipment = this.town.inventory.items
      .filter(x => x.superType === ItemSuperTypeEnum.Equipment)
      .map(x => x as Equipment)
      .filter(x => x.slot === slot)

    // Set the items
    this.screenElements.equipmentListBox.setItems(this.displayedEquipment.map(x => x.name));

    // Grab the current focused element and set it's border to green
    this.screen.focused.style.border.fg = 'green';

    // Focus on the list
    this.screen.focusPush(this.screenElements.equipmentListBox);
  }

  //
  // Unloads the list of equipment
  //
  private unloadEquipmentList() {

    // Unload the list of items
    this.screenElements.equipmentListBox.clearItems();
    this.screenElements.equipmentListBox._listInitialized = false;

    // Clear the equipment details
    this.clearSelectedEquipmentDetails();

    // Pop the focus and set the focused element's border to white
    this.screen.focusPop();
    this.screen.focused.style.border.fg = 'white';

    // Refresh the equipped equipment
    this.refreshEquippedEquipment();
  }

  //
  // Handles when an equipment is focused
  //
  private handleEquipmentListFocused(element: any, index: any) {

    // Clear the selected equipment details 
    this.clearSelectedEquipmentDetails();

    // Render the selected equipment
    var equipment = this.displayedEquipment[index];
    this.renderEquipmentDetailsToBox(equipment, this.screenElements.selectedEquipmentDetailsBox);
  }

  //
  // Handles when an equipment is selected
  //
  private handleEquipmentListSelected(element: any, index: any) {

    // Grab the selected equipment
    var equipment = this.displayedEquipment[index];
    if (!equipment)
      return;

    // Grab the current character
    var character = this.town.playerCharacters[this.currentPlayerIndex];

    // Equip the item to the character
    Equipper.equipItem(equipment, character);

    // Unload the equipment list
    this.unloadEquipmentList();
  }

  //
  // Clears the selected equipment details box
  //
  private clearSelectedEquipmentDetails() {
    // Clear all the selected equipment box's children
    var i = this.screenElements.selectedEquipmentDetailsBox.children.length;
    while (--i > 0) this.screenElements.selectedEquipmentDetailsBox.children[i].detach();
    this.screen.render();
  }

  //
  // Clears the current equipment details box
  //
  private clearCurrentEquipmentDetails() {
    // Clear all the selected equipment box's children
    var i = this.screenElements.currentEquipmentDetailsBox.children.length;
    while (--i > 0) this.screenElements.currentEquipmentDetailsBox.children[i].detach();
    this.screen.render();
  }

  //
  // Handle when an equipped item is focused
  //
  private handleEquippedItemFocused(slot: EquipmentSlotEnum) {

    // Clear the current equipment details 
    this.clearCurrentEquipmentDetails();

    // Grab the current character
    var character = this.town.playerCharacters[this.currentPlayerIndex];

    // Render the equipment
    var equipment = character.equipment.get(slot);
    if (equipment)
      this.renderEquipmentDetailsToBox(equipment, this.screenElements.currentEquipmentDetailsBox);

    // Render the screen
    this.screen.render();
  }

  //
  // Unequips an equipment in the given slot
  //
  private unequipEquipment(slot: EquipmentSlotEnum) {

    // Grab the current character
    var character = this.town.playerCharacters[this.currentPlayerIndex];

    // Unequip the slot
    Equipper.unequipItem(character, slot);

    // Clear the equipped item details
    this.clearCurrentEquipmentDetails();

    // Refresh the equipped equipment
    this.refreshEquippedEquipment();
  }

  //
  // Renders equipment details to a blessed box
  //
  private renderEquipmentDetailsToBox(equipment: Equipment, blessedBox: any) {

    // Start at the 0th line
    var currentLine = 0;

    // Name
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: 38,
      content: `Name: ${equipment.name}`
    });

    // Type
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: 38,
      content: `Type: ${equipment.type}`
    });

    // Rarity
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: 38,
      content: `Rarity: ${equipment.rarity}`
    });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      left: 'center',
      orientation: 'horizontal',
      width: 38
    });

    // Implicits label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: 38,
      content: `Implicits:`
    });

    // Implicits
    equipment.implicits.forEach(implicit => {
      blessed.box({
        parent: blessedBox,
        top: currentLine++,
        height: 1,
        width: 38,
        content: `${implicit.stat} - ${implicit.value}`
      });
    });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      left: 'center',
      orientation: 'horizontal',
      width: 38
    });

    // Prefixes label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: 38,
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
          width: 38,
          content: `${prefix.modifiedStat} - ${prefix.value}`
        });
      });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      left: 'center',
      orientation: 'horizontal',
      width: 38
    });

    // Suffixes label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: 38,
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
          width: 38,
          content: `${suffix.modifiedStat} - ${suffix.value}`
        });
      });

    // Render the screen
    this.screen.render();
  }
}

export default EquipmentScreen;