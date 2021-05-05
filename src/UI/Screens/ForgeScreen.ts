// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import ItemSuperTypeEnum from "../../Game/Itemization/Enums/ItemSuperTypeEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";
import Town from "../../Game/Town";
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

    // Forge display
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
      height: 20,
      columnSpacing: 5, // in chars
      columnWidth: [15, 10, 25], // in chars
      hidden: true,
      scrollbar: {
        style: {
          bg: 'white'
        }
      }
    });

    // Set key bindings
    this.screenElements.forgeMenu.key(['escape'], () => this.screenElements.forgeMenu.select(this.screenElements.forgeMenu.fuzzyFind('Exit')));
    this.screenElements.equipmentTable.rows.key(['escape'], () => this.hideEquipmentTable());

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

    // Hide the loaded equipment display and show the equipment table
    this.screenElements.loadedEquipmentDisplay.hide();
    this.screenElements.equipmentTable.show();

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

    // Hide the equipment table and show the loaded equipment display
    this.screenElements.equipmentTable.hide();
    this.screenElements.loadedEquipmentDisplay.show();

    // Focus on the forge menu
    this.screenElements.forgeMenu.focus();

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