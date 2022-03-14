// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import Town from "../../Game/Town";
import PartyBox from "./Barracks/PartyBox";
import RecruitBox from "./Barracks/RecruitBox";

//
// Barracks Screen
//
class BarracksScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  town: Town;

  // Sub-screens
  partyBox: PartyBox;
  recruitBox: RecruitBox;

  //
  // Constructor
  //
  constructor() {
    this.screen = null;
    this.town = Game.getInstance().town;
    this.partyBox = new PartyBox();
    this.recruitBox = new RecruitBox();
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    this.screen = screen;

    // Message dialog
    this.screenElements.messageDialog = blessed.message({
      parent: this.screen,
      border: 'line',
      height: 'shrink',
      width: 'shrink',
      top: 'center',
      left: 'center',
      hidden: true,
      style: {
        border: {
          fg: 'red'
        }
      }
    });

    // Main menu
    this.screenElements.mainMenu = blessed.list({
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

    // Set key bindings
    this.screenElements.mainMenu.key(['escape'], () => this.screenElements.mainMenu.select(this.screenElements.mainMenu.fuzzyFind('Exit')));
    this.screenElements.mainMenu.on('select', (el: any) => this.onMenuSelect(el));

    // Append items to screen
    this.screen.append(this.screenElements.mainMenu);

    // Load the menu
    this.loadMenu();

    // Initialize sub-screens
    this.recruitBox.initialize(this.screen, this.screenElements);
    this.partyBox.initialize(this.screen, this.screenElements);

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
    var items = [];
    items.push('Recruit');
    items.push('Party');
    items.push('Exit');
    this.screenElements.mainMenu.setItems(items);
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

    // Handle recruiting
    if (selectedItem === 'Recruit')
      this.recruitBox.showRecruitBox();

    // Handle setting your party
    if (selectedItem === 'Party')
      this.partyBox.showPartyBox();

    // Render the screen
    this.screen.render();
  }
}

export default BarracksScreen;