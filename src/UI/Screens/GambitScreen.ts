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
import GambitConditionFactory from "../../Game/BattleSystem/Gambits/Conditions/GambitConditionFactory";

class GambitScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentCharacter?: PlayerCharacter;
  currentGambit?: Gambit;
  town: Town;
  gambitConditions: Array<string> = new Array<string>();
  skills: Array<string> = new Array<string>();

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
      width: 80,
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

    // Gambit condition list
    this.screenElements.gambitConditionList = blessed.list({
      parent: this.screenElements.editGambitBox,
      top: 0,
      left: 0,
      width: 25,
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

    // Gambit condition input
    this.screenElements.gambitConditionInputList = blessed.list({
      parent: this.screenElements.editGambitBox,
      top: 0,
      left: 26,
      width: 25,
      height: 40,
      border: {
        type: 'line'
      },
      label: 'Input',
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

    // Gambit skills
    this.screenElements.gambitSkillList = blessed.list({
      parent: this.screenElements.editGambitBox,
      top: 0,
      left: 52,
      width: 25,
      height: 40,
      border: {
        type: 'line'
      },
      label: 'Skill',
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

    // Ok button
    this.screenElements.okButton = blessed.button({
      parent: this.screenElements.editGambitBox,
      tags: true,
      content: '{center}Ok{/center}',
      top: 42,
      left: 15,
      width: 20,
      height: 3,
      padding: {
        top: 1
      },
      style: {
        bold: true,
        fg: 'white',
        bg: 'green',
        focus: {
          inverse: true
        }
      }
    });

    // Cancel button
    this.screenElements.cancelButton = blessed.button({
      parent: this.screenElements.editGambitBox,
      tags: true,
      content: '{center}Cancel{/center}',
      top: 42,
      left: 45,
      width: 20,
      height: 3,
      padding: {
        top: 1
      },
      style: {
        bold: true,
        fg: 'white',
        bg: 'red',
        focus: {
          inverse: true
        }
      }
    });

    // Set key bindings
    this.screenElements.menu.key(['escape'], () => this.screenElements.menu.select(this.screenElements.menu.fuzzyFind('Exit')));
    this.screenElements.menu.on('select', (el: any) => this.onMenuSelect(el));
    this.screenElements.gambitTable.rows.key(['escape'], () => this.unloadCharacterGambits());
    this.screenElements.gambitTable.rows.key(['enter'], () => this.editSelectedGambit());
    this.screenElements.gambitTable.rows.key(['a'], () => this.addNewGambit());
    this.screenElements.gambitTable.rows.key(['d'], () => this.deleteSelectedGambit());
    this.screenElements.gambitTable.rows.key(['left'], () => this.moveSelectedGambitUp());
    this.screenElements.gambitTable.rows.key(['right'], () => this.moveSelectedGambitDown());
    this.screenElements.gambitConditionList.key(['right'], () => this.screenElements.gambitConditionInputList.focus());
    this.screenElements.gambitConditionList.key(['escape'], () => this.hideGambitEdit());
    this.screenElements.gambitConditionList.key(['enter'], () => this.screenElements.okButton.focus());
    this.screenElements.gambitConditionInputList.key(['left'], () => this.screenElements.gambitConditionList.focus());
    this.screenElements.gambitConditionInputList.key(['right'], () => this.screenElements.gambitSkillList.focus());
    this.screenElements.gambitConditionInputList.key(['escape'], () => this.hideGambitEdit());
    this.screenElements.gambitConditionInputList.key(['enter'], () => this.screenElements.okButton.focus());
    this.screenElements.gambitSkillList.key(['left'], () => this.screenElements.gambitConditionInputList.focus());
    this.screenElements.gambitSkillList.key(['right'], () => this.screenElements.okButton.focus());
    this.screenElements.gambitSkillList.key(['escape'], () => this.hideGambitEdit());
    this.screenElements.gambitSkillList.key(['enter'], () => this.screenElements.okButton.focus());
    this.screenElements.okButton.key(['left'], () => this.screenElements.gambitSkillList.focus());
    this.screenElements.okButton.key(['right'], () => this.screenElements.cancelButton.focus());
    this.screenElements.okButton.key(['escape'], () => this.hideGambitEdit());
    this.screenElements.okButton.key(['enter', 'space'], () => this.saveGambit());
    this.screenElements.cancelButton.key(['left'], () => this.screenElements.okButton.focus());
    this.screenElements.cancelButton.key(['enter', 'space', 'escape'], () => this.hideGambitEdit());

    // Set ui callbacks
    this.screenElements.gambitConditionList.on('select item', (el: any, sel: any) => this.handleGambitConditionFocused(el, sel));

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

    // Update player skills
    this.skills = playerCharacter.skills.filter(x => x.level > 0).map(x => x.skill);

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
  // Add a new gambit
  //
  private addNewGambit() {

    // There is no current gambit being edited
    this.currentGambit = undefined;

    // Show gambit edit details
    this.showGambitEditDetails();
  }

  //
  // Delete the selected gambit
  //
  private deleteSelectedGambit() {
    
    // Sanity check current character
    if (!this.currentCharacter) return;

    // Splice the gambit
    var gambitIndex = this.screenElements.gambitTable.rows.selected;
    this.currentCharacter.gambits.splice(gambitIndex, 1);

    // Reload character gambits
    this.loadCharacterGambits(this.currentCharacter);

    // If the gambit index is now greater than the number of items
    // set it to the max item
    if (gambitIndex > this.currentCharacter.gambits.length - 1)
      gambitIndex = this.currentCharacter.gambits.length - 1;

    // Re-select the index
    if (gambitIndex > 0)
      this.screenElements.gambitTable.rows.select(gambitIndex);

    // Render
    this.screen.render();
  }

  //
  // Moves the selected gambit up one in the list
  //
  private moveSelectedGambitUp() {

    // Sanity check current character
    if (!this.currentCharacter) return;

    // Verify we are not at the top of the list
    var gambitIndex = this.screenElements.gambitTable.rows.selected;
    if (gambitIndex == 0) return;

    // Grab the gambit
    var gambit = this.currentCharacter.gambits[gambitIndex];

    // Remove it from the array
    this.currentCharacter.gambits.splice(gambitIndex, 1);

    // Splice the element back into the array
    this.currentCharacter.gambits.splice(gambitIndex - 1, 0, gambit);

    // Reload character gambits
    this.loadCharacterGambits(this.currentCharacter);

    // Select the new index
    this.screenElements.gambitTable.rows.select(gambitIndex - 1);

    // Render
    this.screen.render();
  }

  //
  // Moves the selected gambit down one in the list
  //
  private moveSelectedGambitDown() {

    // Sanity check current character
    if (!this.currentCharacter) return;

    // Verify we are not at the bottom of the list
    var gambitIndex = this.screenElements.gambitTable.rows.selected;
    if (gambitIndex >= this.currentCharacter.gambits.length) return;

    // Grab the gambit
    var gambit = this.currentCharacter.gambits[gambitIndex];

    // Remove it from the array
    this.currentCharacter.gambits.splice(gambitIndex, 1);

    // Splice the element back into the array
    this.currentCharacter.gambits.splice(gambitIndex + 1, 0, gambit);

    // Reload character gambits
    this.loadCharacterGambits(this.currentCharacter);

    // Select the new index
    this.screenElements.gambitTable.rows.select(gambitIndex + 1);

    // Render
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

    // Show gambit edit details
    this.showGambitEditDetails(gambit);
  }

  //
  // Render the edit gambit details box
  //
  private showGambitEditDetails(gambit?: Gambit) {

    // If we don't have an existing gambit, just start with a default one
    gambit = gambit || new Gambit(GambitConditionEnum.EnemyAny, null, SkillEnum.Attack);

    // Set the condition items
    this.screenElements.gambitConditionList.setItems(this.gambitConditions);
    var index = this.screenElements.gambitConditionList.fuzzyFind(gambit.conditionEnum || '');
    this.screenElements.gambitConditionList.select(index);

    // Set the condition inputs
    var gambitCondition = GambitConditionFactory.getGambitCondition(gambit.conditionEnum);
    this.screenElements.gambitConditionInputList.setItems(gambitCondition.getValidInputs());
    index = this.screenElements.gambitConditionInputList.fuzzyFind(gambit.conditionInput || '');
    this.screenElements.gambitConditionInputList.select(index);

    // Set the skills
    this.screenElements.gambitSkillList.setItems(this.skills);
    index = this.screenElements.gambitSkillList.fuzzyFind(gambit.skillEnum || '');
    this.screenElements.gambitSkillList.select(index);

    // Hide the gambit table and show the edit form
    this.screenElements.gambitTable.hide();
    this.screenElements.editGambitBox.show();

    // Focus on the condition list
    this.screenElements.gambitConditionList.focus();
    this.screen.render();
  }

  //
  // Handles gambit condition being focused
  //
  private handleGambitConditionFocused(element: any, index: any) {

    // Grab the condition
    var conditionText = this.screenElements.gambitConditionList.getItem(index).getText();
    var conditionEnum = conditionText as GambitConditionEnum;
    var condition = GambitConditionFactory.getGambitCondition(conditionEnum);

    // Set the condition inputs
    var conditionInputs = condition.getValidInputs();
    this.screenElements.gambitConditionInputList.setItems(conditionInputs);
    if (conditionInputs)
      this.screenElements.gambitConditionInputList.select(0);
  }

  //
  // Hide gambit editing
  //
  private hideGambitEdit() {

    // Hide the edit form and show the gambit table
    this.screenElements.editGambitBox.hide();
    this.screenElements.gambitTable.show();

    // Focus on the gambit table
    this.screenElements.gambitTable.focus();
    this.screen.render();
  }

  //
  // Saves gambit
  //
  private saveGambit() {

    // Sanity check current character
    if (!this.currentCharacter) return;

    // Grab the condition
    var conditionIndex = this.screenElements.gambitConditionList.selected;
    var condition = this.screenElements.gambitConditionList.getItem(conditionIndex).getText();
    var conditionEnum = condition as GambitConditionEnum;

    // Grab the input
    var conditionInputIndex = this.screenElements.gambitConditionInputList.selected;
    var conditionInputItem = this.screenElements.gambitConditionInputList.getItem(conditionInputIndex);
    var conditionInput = conditionInputItem ? conditionInputItem.getText() : '';

    // Grab the skill
    var skillIndex = this.screenElements.gambitSkillList.selected;
    var skill = this.screenElements.gambitSkillList.getItem(skillIndex).getText();
    var skillEnum = skill as SkillEnum;

    // If there is no gambit, create a new one and add it
    // Otherwise update the existing gambit
    if (!this.currentGambit) {
      this.currentCharacter.gambits.push(new Gambit(conditionEnum, conditionInput, skillEnum));
    } else {
      this.currentGambit.conditionEnum = conditionEnum;
      this.currentGambit.conditionInput = conditionInput;
      this.currentGambit.skillEnum = skillEnum;
    }

    // Reload character gambits
    var currentGambitIndex = this.screenElements.gambitTable.rows.selected;
    this.loadCharacterGambits(this.currentCharacter);
    this.screenElements.gambitTable.rows.select(currentGambitIndex);

    // Hide the gambit editing
    this.hideGambitEdit();
  }
}

export default GambitScreen;