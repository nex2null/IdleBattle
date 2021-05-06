// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import EquipmentAffixSlotEnum from "../../Game/Itemization/Enums/EquipmentAffixSlotEnum";
import ItemRarityEnum from "../../Game/Itemization/Enums/ItemRarityEnum";
import ItemSuperTypeEnum from "../../Game/Itemization/Enums/ItemSuperTypeEnum";
import ItemTypeEnum from "../../Game/Itemization/Enums/ItemTypeEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";
import EquipmentForge from "../../Game/Itemization/Equipment/EquipmentForge";
import Item from "../../Game/Itemization/Item";
import Town from "../../Game/Town";
import UIHelpers from "../Helpers/UIHelpers";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";

class ForgeScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
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

    // Forge menu
    this.screenElements.forgeMenu = blessed.list({
      top: 0,
      left: 0,
      width: 40,
      height: 50,
      border: {
        type: 'line'
      },
      label: 'Menu',
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

    // Forge display
    this.screenElements.forgeDisplay = blessed.box({
      top: 0,
      left: 41,
      width: 70,
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

    // Loaded equipment display
    this.screenElements.loadedEquipmentDisplay = blessed.box({
      parent: this.screenElements.forgeDisplay,
      width: 68,
      height: 48,
      content: 'No Equipment Loaded',
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    });

    // Equipment table
    this.screenElements.equipmentTable = contrib.table({
      parent: this.screenElements.forgeDisplay,
      keys: true,
      fg: 'white',
      selectedFg: 'white',
      selectedBg: 'blue',
      interactive: true,
      width: 68,
      height: 21,
      columnSpacing: 5, // in chars
      columnWidth: [15, 10, 25], // in chars
      hidden: true,
      scrollbar: {
        style: {
          bg: 'white'
        }
      }
    });

    // Equipment table details container
    this.screenElements.equipmentTableDetails = blessed.box({
      parent: this.screenElements.forgeDisplay,
      top: 21,
      left: 3,
      width: 62,
      height: 25,
      hidden: true,
      border: {
        type: 'line'
      },
      label: 'Equipment Details'
    });

    // Set key bindings
    this.screenElements.forgeMenu.key(['escape'], () => this.screenElements.forgeMenu.select(this.screenElements.forgeMenu.fuzzyFind('Exit')));
    this.screenElements.equipmentTable.rows.key(['escape'], () => this.hideEquipmentTable());

    // Set equipment table callbacks
    this.screenElements.equipmentTable.rows.on('select', (el: any, sel: any) => this.handleEquipmentSelected(el, sel));
    this.screenElements.equipmentTable.rows.on('select item', (el: any, sel: any) => this.handleEquipmentFocused(el, sel));

    // Append items to screen
    this.screen.append(this.screenElements.forgeMenu);
    this.screen.append(this.screenElements.forgeDisplay);

    // Set menu items
    this.setMenuItems();

    // Set menu callback
    this.screenElements.forgeMenu.on('select', (el: any, idx: any) => this.processMenuSelection(el, idx));

    // Set focus to character name
    this.screenElements.forgeMenu.focus();

    // Render the equipment being forged
    this.renderEquipmentBeingForged();
  }

  private setMenuItems() {

    // Start with the base items
    var items = [
      'Load Equipment',
      'Unload Equipment'
    ];

    // Grab all the currencies
    var currencies = this.town.inventory.items.filter(x => x.superType === ItemSuperTypeEnum.Currency);

    // Add currency menu items
    items.push(`Orb of Pandemonium - ${this.getCurrencyCount(currencies, ItemTypeEnum.OrbOfPandemonium)}`)

    // Add the exit item
    items.push('Exit');

    // Set the menu items
    this.screenElements.forgeMenu.setItems(items);
  }

  //
  // Gets the count of a given currency
  //
  private getCurrencyCount(currencies: Array<Item>, currencyType: ItemTypeEnum): number {

    var amounts = currencies
      .filter(x => x.type === currencyType)
      .map(x => x.amount);

    return amounts.length == 0 ? 0 : amounts.reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  //
  // Processes menu selections
  //
  private processMenuSelection(element: any, index: any) {

    // Handle exit
    if (element.getText() === 'Exit')
      this.exitScreen();

    // Handle load
    else if (element.getText() === 'Load Equipment')
      this.displayEquipmentTable();

    // Handle unload
    else if (element.getText() === 'Unload Equipment')
      this.unloadEquipment();

    // Handle orb of pandemonium
    else if (element.getText().match(/orb of pandemonium/i))
      this.useOrbofPandemonium();
  }

  private useOrbofPandemonium() {

    // Grab an orb from the inventory
    var orb = this.town.inventory.items.find(x => x.type === ItemTypeEnum.OrbOfPandemonium);
    if (!orb)
      return;

    // Make sure the loaded equipment is rare
    var loadedEquipment = this.town.equipmentBeingForged;
    if (!loadedEquipment || loadedEquipment.rarity !== ItemRarityEnum.Rare)
      return;

    // Re-roll the equipment
    EquipmentForge.reRollEquipmentAffixes(loadedEquipment);

    // Remove the orb from the inventory
    this.town.inventory.removeItem(orb);

    // Update menu items
    this.setMenuItems();

    // Render the forged equipment
    this.renderEquipmentBeingForged();

    // Render the screen
    this.screen.render();
  }

  //
  // Displays the equipment table
  //
  private displayEquipmentTable() {

    // Refresh equipment
    this.displayedEquipment = this
      .town
      .inventory
      .items
      .filter(x => x.superType === ItemSuperTypeEnum.Equipment)
      .map(x => x as Equipment);

    // Set the tables data
    this.screenElements.equipmentTable.setData({
      headers: [' Slot', ' iLvl', ' Name'],
      data: this.displayedEquipment.map(x => [x.slot, x.ilvl, x.name])
    });

    // Hide the loaded equipment display, and show the equipment table and details
    this.screenElements.loadedEquipmentDisplay.hide();
    this.screenElements.equipmentTable.show();
    this.screenElements.equipmentTableDetails.show();

    // Select the top element on the table
    this.screenElements.equipmentTable.rows.select(0);

    // Focus on the table
    this.screenElements.equipmentTable.focus();

    // Render
    this.screen.render();
  }

  //
  // Hide equipment table
  //
  private hideEquipmentTable() {

    // Hide the equipment table and details, and show the loaded equipment display
    this.screenElements.equipmentTable.hide();
    this.screenElements.equipmentTableDetails.hide();
    this.screenElements.loadedEquipmentDisplay.show();

    // Focus on the forge menu
    this.screenElements.forgeMenu.focus();

    // Render
    this.screen.render();
  }

  //
  // Handles equipment being selected
  //
  private handleEquipmentSelected(element: any, index: any) {

    // Grab equipment and sanity check
    var equipment = this.displayedEquipment[index];
    if (!equipment)
      return;

    // Load the equipment
    this.loadEquipment(equipment);
  }

  //
  // Handles equipment being focused
  //
  private handleEquipmentFocused(element: any, index: any) {

    // Grab equipment and sanity check
    var equipment = this.displayedEquipment[index];
    if (!equipment)
      return;

    // Clear the equipment table details
    UIHelpers.clearBlessedElement(this.screenElements.equipmentTableDetails, true);

    // Display the equipment
    UIHelpers.renderEquipmentDetailsToBox(equipment, this.screenElements.equipmentTableDetails, 1);
  }

  //
  // Load equipment
  //
  private loadEquipment(equipment: Equipment) {

    // Unload any loaded equipment
    this.unloadEquipment();

    // Load the equipment in the town forge
    this.town.equipmentBeingForged = equipment;

    // Remove the equipment from the inventory
    this.town.inventory.removeItem(equipment);

    // Render the equipment and hide the equipment table
    this.renderEquipmentBeingForged();
    this.hideEquipmentTable();
  }

  //
  // Unloads the currently loaded equipment
  //
  private unloadEquipment() {

    // Check that equipment is loaded
    var equipmentBeingForged = this.town.equipmentBeingForged;
    if (!equipmentBeingForged)
      return;

    // Clear the forge and add the equipment back to the inventory
    this.town.equipmentBeingForged = null;
    this.town.inventory.addItem(equipmentBeingForged);

    // Render the equipment
    this.renderEquipmentBeingForged();
  }

  //
  // Render the equipment being forged
  //
  private renderEquipmentBeingForged() {

    // Box to render to
    var blessedBox = this.screenElements.loadedEquipmentDisplay;

    // Clear the box
    UIHelpers.clearBlessedElement(blessedBox);

    // Grab the equipment being forged
    var equipment = this.town.equipmentBeingForged;

    // If there is no equipment being forged then no need to process further
    if (!equipment) {
      blessedBox.setContent('No Equipment Loaded');
      this.screen.render();
      return;
    }

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

    // Slot
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Slot: ${equipment.slot}`
    });

    // Rarity
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Rarity: ${equipment.rarity}`
    });

    // iLvl
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `iLvl: ${equipment.ilvl}`
    });

    // Required level
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Required Lvl: ${equipment.requiredLevel}`
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
          content: `${prefix.type} (${prefix.modifiedStat}) - ${prefix.value}`
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
          content: `${suffix.type} (${suffix.modifiedStat}) - ${suffix.value}`
        });
      });

    // Render
    this.screen.render();
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
}

export default ForgeScreen;