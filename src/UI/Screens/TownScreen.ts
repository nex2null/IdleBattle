

// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import BattleScreen from "./BattleScreen";
import EquipmentScreen from "./EquipmentScreen";
import IScreen from "./IScreen";

class TownScreen implements IScreen {

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

    var goldBox = blessed.box({
      top: 0,
      left: '40',
      width: '25%',
      height: 7,
      label: 'Town',
      content: `
  Experience: {green-fg}${Game.getInstance().town.totalExperience}{/green-fg}\n
  Gold: {yellow-fg}${Game.getInstance().town.totalGold}{/yellow-fg}`,
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

    var townMenu = blessed.list({
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

    townMenu.on('select', (el: any, selected: any) => {

      var selectedItem = el.getText();

      if (selectedItem === 'Battle')
        this.StartBattle();

      if (selectedItem === 'Equipment')
        ScreenManager.getInstance().loadScreen(new EquipmentScreen());

      else if (selectedItem === 'Exit')
        process.exit(0);
    });

    townMenu.setItems([
      'Battle',
      'Equipment',
      'Exit'
    ]);

    this.screen.append(goldBox);
    this.screen.append(townMenu);

    townMenu.focus();
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
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