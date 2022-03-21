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

class LevelUpScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentCharacter?: PlayerCharacter;
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

    // Character box
    this.screenElements.characterBox = blessed.box({
      top: 0,
      left: 21,
      width: 80,
      height: 50,
      hidden: true,
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

    // Set key bindings
    this.screenElements.menu.key(['escape'], () => this.screenElements.menu.select(this.screenElements.menu.fuzzyFind('Exit')));
    this.screenElements.menu.on('select', (el: any) => this.onMenuSelect(el));
    this.screenElements.characterBox.key(['escape'], () => this.hideCharacterBox());

    // Append items to screen
    this.screen.append(this.screenElements.menu);
    this.screen.append(this.screenElements.characterBox);

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
    var items = this.town.roster.map(x => x.name);
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
    var playerCharacter = Game.getInstance().town.roster.find(x => x.name === selectedItem);
    if (!playerCharacter)
      return;

    // Keep track of current character
    this.currentCharacter = playerCharacter;

    // Show the character box
    this.showCharacterBox();
  }

  // Show character box
  private showCharacterBox() {

    // Sanity check
    if (!this.currentCharacter)
      return;

    // TODO: Everything
    this.screenElements.characterBox.setContent(this.currentCharacter.name);
    this.screenElements.characterBox.show();
    this.screenElements.characterBox.focus();

    // Render the screen
    this.screen.render();
  }

  // Hide character box
  private hideCharacterBox() {
    this.currentCharacter = undefined;
    this.screenElements.characterBox.hide();
    this.screenElements.menu.focus();
    this.screen.render();
  }
}

export default LevelUpScreen;