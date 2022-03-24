// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import Town from "../../Game/Town";
import ScreenManager from "../ScreenManager";
import BarracksScreen from "./BarracksScreen";
import BattleScreen from "./BattleScreen";
import EquipmentScreen from "./EquipmentScreen";
import ForgeScreen from "./ForgeScreen";
import GambitScreen from "./GambitScreen";
import IScreen from "./IScreen";
import LevelUpScreen from "./LevelUpScreen";

class TownScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
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

    // Build the town gold box
    this.screenElements.goldBox = blessed.box({
      top: 0,
      left: '40',
      width: '25%',
      height: 7,
      label: 'Town',
      content: `
  Experience: {green-fg}${this.town.totalExperience}{/green-fg}\n
  Gold: {yellow-fg}${this.town.totalGold}{/yellow-fg}`,
      tags: true,
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

    // Build the town menu
    this.screenElements.townMenu = blessed.list({
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

    // Handle escape key on town menu
    this.screenElements.townMenu.key(['escape'], () =>
      this.screenElements.townMenu.select(this.screenElements.townMenu.fuzzyFind('Exit')));

    // Handle a town menu item being selected
    this.screenElements.townMenu.on('select', (el: any) => this.onMenuSelect(el));

    // Set menu items
    this.setMenuItems();

    // Append screen elements to screen
    this.screen.append(this.screenElements.goldBox);
    this.screen.append(this.screenElements.townMenu);

    // Focus on town menu
    this.screenElements.townMenu.focus();
  }

  // Set menu items
  setMenuItems() {

    var items = [];

    // Handle menu items only available if you have a party
    if (this.town.currentParty.length > 0) {
      items.push('Battle');
    }

    // Handle menu items only available if characters exist
    if (this.town.roster.length > 0) {
      items.push('Equipment');
      items.push('Gambits');
      items.push('Level Up');
    }

    // Handle items always available
    items.push('Forge');
    items.push('Barracks');
    items.push('Exit');

    // Set menu items
    this.screenElements.townMenu.setItems(items);
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

    // Handle battle
    if (selectedItem === 'Battle')
      this.StartBattle();

    // Handle equipment
    else if (selectedItem === 'Equipment')
      ScreenManager.getInstance().loadScreen(new EquipmentScreen());

    // Handle Forge
    else if (selectedItem === 'Forge')
      ScreenManager.getInstance().loadScreen(new ForgeScreen());

    // Handle Barracks
    else if (selectedItem === 'Barracks')
      ScreenManager.getInstance().loadScreen(new BarracksScreen());

    // Handle Gambits
    else if (selectedItem === 'Gambits')
      ScreenManager.getInstance().loadScreen(new GambitScreen());

    // Handle Level Up
    else if (selectedItem === 'Level Up')
      ScreenManager.getInstance().loadScreen(new LevelUpScreen());

    // Handle Exit
    else if (selectedItem === 'Exit')
      process.exit(0);
  }

  //
  // Starts a new battle
  //
  private StartBattle() {

    // Initialize a new battle
    var battle = Game.getInstance().startBattle(1);

    // Switch to the battle screen
    ScreenManager.getInstance().loadScreen(new BattleScreen(battle));
  }
}

export default TownScreen;