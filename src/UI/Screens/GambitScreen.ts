// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import Town from "../../Game/Town";
import PlayerCharacter from "../../Game/PlayerCharacter";

class GambitScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentPlayerIndex: number = 0;
  town: Town;

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

    // Character menu
    this.screenElements.menu = blessed.list({
      top: 0,
      left: 0,
      width: 20,
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

    // Gambit display
    this.screenElements.gambitBox = blessed.box({
      top: 0,
      left: 21,
      width: 80,
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

    // Gambit table
    this.screenElements.gambitTable = contrib.table({
      parent: this.screenElements.gambitBox,
      keys: true,
      fg: 'white',
      selectedFg: 'white',
      selectedBg: 'blue',
      interactive: true,
      width: 68,
      height: 38,
      hidden: true,
      columnSpacing: 5, // in chars
      columnWidth: [20, 20, 20], // in chars
      scrollbar: {
        style: {
          bg: 'white'
        }
      }
    });

    // Set key bindings
    this.screenElements.menu.key(['escape'], () => this.screenElements.menu.select(this.screenElements.menu.fuzzyFind('Exit')));
    this.screenElements.menu.on('select', (el: any) => this.onMenuSelect(el));
    this.screenElements.gambitTable.rows.key(['escape'], () => this.unloadCharacterGambits());

    // Append items to screen
    this.screen.append(this.screenElements.menu);
    this.screen.append(this.screenElements.gambitBox);

    // Load the menu
    this.loadMenu();

    // Focus
    this.screenElements.menu.focus();
  }

  //
  // Exits the current screen
  //
  private exitScreen() {
    GameSaver.saveGame();
    ScreenManager.getInstance().loadScreen(new TownScreen());
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
  }

  private loadMenu() {
    var items = this.town.playerCharacters.map(x => x.name);
    items.push('Exit');
    this.screenElements.menu.setItems(items);
  }

  //
  // Handle the main menu item being selected
  //
  private onMenuSelect(el: any) {

    // Grab selected item text
    var selectedItem = el.getText();

    // Handle exiting the screen
    if (selectedItem === 'Exit')
      this.exitScreen();

    // Handle selecting the character
    var playerCharacter = Game.getInstance().town.playerCharacters.find(x => x.name === selectedItem);
    if (!playerCharacter)
      return;

    // Load character gambits
    this.loadCharacterGambits(playerCharacter);
    this.screenElements.gambitTable.show();
    this.screenElements.gambitTable.focus();

    // Render the screen
    this.screen.render();
  }

  //
  // Display the selected character gambits
  //
  private loadCharacterGambits(character: PlayerCharacter) {

    // Clear any existing rows in the table
    var tableItems = this.screenElements.gambitTable.rows;
    if (tableItems) {
      tableItems.clearItems();
      tableItems._listInitialized = false;
    }

    // Set the tables data
    this.screenElements.gambitTable.setData({
      headers: [' Condition', ' Input', ' Skill'],
      data: character.gambits.map(x => [x.conditionEnum, x.conditionInput || 'N/A', x.skillEnum])
    });
  }

  //
  // Unloads character gambits
  //
  private unloadCharacterGambits() {
    this.screenElements.gambitTable.hide();
    this.screenElements.menu.focus();
    this.screen.render();
  }
}

export default GambitScreen;