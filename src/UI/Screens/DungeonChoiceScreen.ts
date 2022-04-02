// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import Town from "../../Game/Town";
import BattleScreen from "./BattleScreen";
import DungeonEnum from "../../Game/BattleSystem/Dungeon/DungeonEnum";

//
// Dungeon Choice Screen
//
class DungeonChoiceScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  town: Town;

  //
  // Constructor
  //
  constructor() {
    this.screen = null;
    this.town = Game.getInstance().town;
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    this.screen = screen;

    // Main menu
    this.screenElements.mainMenu = blessed.list({
      top: 0,
      left: 0,
      width: 30,
      height: 50,
      border: {
        type: 'line'
      },
      label: 'Dungeons',
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

    // Set key bindings
    this.screenElements.mainMenu.key(['escape'], () => this.screenElements.mainMenu.select(this.screenElements.mainMenu.fuzzyFind('Exit')));
    this.screenElements.mainMenu.on('select', (el: any) => this.onMenuSelect(el));

    // Append items to screen
    this.screen.append(this.screenElements.mainMenu);

    // Load the menu
    this.loadMenu();

    // Focus
    this.screenElements.mainMenu.focus();
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

  //
  // Load the main menu items
  //
  private loadMenu() {

    // Init items
    var items = [];

    // Populate list of dungeons
    for (var enumMember in DungeonEnum) {
      items.push(DungeonEnum[enumMember as keyof typeof DungeonEnum]);
    }

    // Add exit item
    items.push('Exit');

    // Set menu
    this.screenElements.mainMenu.setItems(items);
  }

  //
  // Handle the main menu item being selected
  //
  private onMenuSelect(el: any) {

    // Grab selected item text
    var selectedItem = el.getText();

    // Handle exiting the screen
    if (selectedItem === 'Exit') {
      this.exitScreen();
      return;
    }

    // Switch to the battle screen
    var dungeonEnum = selectedItem as DungeonEnum;
    ScreenManager.getInstance().loadScreen(new BattleScreen(dungeonEnum));
  }
}

export default DungeonChoiceScreen;