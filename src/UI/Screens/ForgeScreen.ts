// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import ItemSuperTypeEnum from "../../Game/Itemization/Enums/ItemSuperTypeEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";
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
      }
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
    this.screenElements.forgeMenu.setItems([
      'Load Equipment',
      'Unload Equipment',
      'Exit'
    ]);

    // Set menu callback
    this.screenElements.forgeMenu.on('select', (el: any, idx: any) => this.processMenuSelection(el, idx));

    // Set focus to character name
    this.screenElements.forgeMenu.focus();

    // Render the equipment being forged
    this.renderEquipmentBeingForged();
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

    // Destroy all the children of the equipment table details
    var i = this.screenElements.equipmentTableDetails.children.length;
    while (--i > 0) this.screenElements.equipmentTableDetails.children[i].destroy();

    // Display the equipment
    UIHelpers.renderEquipmentDetailsToBox(equipment, this.screenElements.equipmentTableDetails);
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

    // Grab the equipment being forged
    var equipment = this.town.equipmentBeingForged;

    // If there is no equipment being forged then no need to process further
    if (!equipment) {
      this.screenElements.loadedEquipmentDisplay.setContent('No Equipment Loaded');
      this.screen.render();
      return;
    }

    // Render the equipment
    this.screenElements.loadedEquipmentDisplay.setContent(equipment.name);
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