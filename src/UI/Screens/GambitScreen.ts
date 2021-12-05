// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";

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

    gambitMenu.on('select', (el: any, selected: any) => {

      var selectedItem = el.getText();

      if (selectedItem === 'Exit')
        this.exitScreen();
    });

    gambitMenu.setItems([
      'Exit'
    ]);

    gambitMenu.key(['escape'], () => gambitMenu.select(gambitMenu.fuzzyFind('Exit')));

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
}

export default GambitScreen;