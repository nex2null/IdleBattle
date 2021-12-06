// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import Town from "../../Game/Town";

class GambitScreen implements IScreen {

  // Properties
  screen: any;

  // Constructor
  constructor() {
    this.screen = null;
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    this.screen = screen;

    var gambitMenu = blessed.list({
      top: 8,
      left: '40',
      width: '25%',
      height: '25%+1',
      tags: true,
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

    // Set menu items
    var items = Game.getInstance().town.playerCharacters.map(x => x.name);
    items.push('Exit');
    gambitMenu.setItems(items);

    // Handle escape keybind on menu
    gambitMenu.key(['escape'], () => gambitMenu.select(gambitMenu.fuzzyFind('Exit')));
    gambitMenu.on('select', (el: any) => this.onMenuSelect(el));

    // Add menu to screen
    this.screen.append(gambitMenu);
    gambitMenu.focus();
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

    // TODO: Load gambits
  }
}

export default GambitScreen;