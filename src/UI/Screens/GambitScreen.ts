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
import GambitConditionEnum from "../../Game/BattleSystem/Enums/GambitConditionEnum";
import Gambit from "../../Game/BattleSystem/Gambits/Gambit";
import SkillEnum from "../../Game/BattleSystem/Enums/SkillEnum";

class GambitScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentCharacter?: PlayerCharacter;
  currentGambit?: Gambit;
  town: Town;
  gambitConditions: Array<string> = new Array<string>();

  // const color: Color = Color[colorString as keyof typeof Color];
  // BLAH this.gambitConditions.push(enumMember as keyof typeof GambitConditionEnum);

  // Constructor
  constructor() {
    this.screen = null;
    this.town = Game.getInstance().town;
    
    // Populate gambits
    for (var enumMember in GambitConditionEnum) {
      this.gambitConditions.push(GambitConditionEnum[enumMember as keyof typeof GambitConditionEnum]);
    }
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

    // Gambit table
    this.screenElements.gambitTable = contrib.table({
      top: 0,
      left: 21,
      width: 68,
      height: 50,
      keys: true,
      fg: 'white',
      selectedFg: 'white',
      selectedBg: 'blue',
      interactive: true,
      hidden: true,
      columnSpacing: 5, // in chars
      columnWidth: [20, 20, 20], // in chars
      scrollbar: {
        style: {
          bg: 'white'
        }
      },
      border: {
        type: 'line'
      }
    });

    // Edit gambit box
    this.screenElements.editGambitBox = blessed.box({
      top: 0,
      left: 21,
      width: 68,
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

    // Gambit condition list
    this.screenElements.gambitConditionList = blessed.list({
      parent: this.screenElements.editGambitBox,
      top: 0,
      left: 0,
      width: 20,
      height: 40,
      border: {
        type: 'line'
      },
      label: 'Condition',
      style: {
        selected: {
          bg: 'white',
          fg: 'black'
        },
        border: {
          fg: 'white'
        },
        focus: {
          border: {
            fg: 'blue'
          }
        }
      },
      keys: true
    });

    // Set key bindings
    this.screenElements.menu.key(['escape'], () => this.screenElements.menu.select(this.screenElements.menu.fuzzyFind('Exit')));
    this.screenElements.menu.on('select', (el: any) => this.onMenuSelect(el));
    this.screenElements.gambitTable.rows.key(['escape'], () => this.unloadCharacterGambits());
    this.screenElements.gambitTable.rows.key(['e'], () => this.editSelectedGambit());

    // Append items to screen
    this.screen.append(this.screenElements.menu);
    this.screen.append(this.screenElements.gambitTable);
    this.screen.append(this.screenElements.editGambitBox);

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

    // Keep track of current character
    this.currentCharacter = playerCharacter;

    // Load character gambits
    this.loadCharacterGambits(this.currentCharacter);
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

  //
  // Edit the selected gambit
  //
  private editSelectedGambit() {

    // Sanity check current character
    if (!this.currentCharacter) return;

    // Grab the gambit being edited
    var gambitIndex = this.screenElements.gambitTable.rows.selected;
    var gambit = this.currentCharacter.gambits[gambitIndex];
    this.currentGambit = gambit;

    // Render gambit edit details
    this.renderGambitEditDetails(gambit);

    // Hide the gambit table and show the edit form
    this.screenElements.gambitTable.hide();
    this.screenElements.editGambitBox.show();

    // Focus on the condition list
    this.screenElements.gambitConditionList.focus();
    this.screen.render();
  }

  //
  // Render the edit gambit details box
  //
  private renderGambitEditDetails(gambit?: Gambit) {

    // If we don't have an existing gambit, just start with a default one
    gambit = gambit || new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack);

    // Set the condition items
    this.screenElements.gambitConditionList.setItems(this.gambitConditions);
  }
}

export default GambitScreen;