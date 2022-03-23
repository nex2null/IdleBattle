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
import CharacterClassFactory from "../../Game/CharacterClasses/CharacterClassFactory";

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

    // Town XP label
    this.screenElements.townXpLabel = blessed.box({
      parent: this.screenElements.characterBox,
      top: 1,
      height: 1,
      width: 22,
      left: 16,
      tags: true
    });

    // Required XP label
    this.screenElements.requiredXpLabel = blessed.box({
      parent: this.screenElements.characterBox,
      top: 2,
      height: 1,
      width: 22,
      left: 16,
      tags: true
    });

    // Remaining XP label
    this.screenElements.remainingXpLabel = blessed.box({
      parent: this.screenElements.characterBox,
      top: 3,
      height: 1,
      width: 22,
      left: 16,
      tags: true
    });

    // Level up button
    this.screenElements.levelUpButton = blessed.button({
      parent: this.screenElements.characterBox,
      tags: true,
      content: '{center}LEVEL UP{/center}',
      top: 1,
      left: 40,
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

    // Set key bindings
    this.screenElements.menu.key(['escape'], () => this.screenElements.menu.select(this.screenElements.menu.fuzzyFind('Exit')));
    this.screenElements.menu.on('select', (el: any) => this.onMenuSelect(el));
    this.screenElements.levelUpButton.key(['escape'], () => this.hideCharacterBox());
    this.screenElements.levelUpButton.key(['enter', 'space'], () => this.levelUp());

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

    // Figure out the level we want to go to
    var nextLevel = this.currentCharacter.level + 1;

    // Get details about the character's class
    var currentClass = CharacterClassFactory.getCharacterClass(this.currentCharacter.primaryClass);
    var requiredXp = currentClass.getRequiredXpToLevel(nextLevel);

    // Update labels
    this.screenElements.townXpLabel.setContent(`Available XP: ${this.town.totalExperience}`);
    this.screenElements.requiredXpLabel.setContent(` Required XP: ${requiredXp}`);
    this.screenElements.remainingXpLabel.setContent(`Remaining XP: ${this.town.totalExperience - requiredXp}`);

    // TODO: Everything else
    this.screenElements.characterBox.show();
    this.screenElements.levelUpButton.focus();

    // Render the screen
    this.screen.render();
  }

  private levelUp() {

    // Sanity check
    if (!this.currentCharacter)
      return;

    // Figure out the level we want to go to
    var nextLevel = this.currentCharacter.level + 1;

    // Grab required XP
    var currentClass = CharacterClassFactory.getCharacterClass(this.currentCharacter.primaryClass);
    var requiredXp = currentClass.getRequiredXpToLevel(nextLevel);

    // Verify we have required XP
    if (requiredXp > this.town.totalExperience) {
      // TODO SHOW ERROR MESSAGE
      return;
    }

    // Grab the stats
    var levelUpStats = currentClass.getLevelUpStatIncreases(nextLevel);

    // Level up the character
    this.currentCharacter.level++;
    this.currentCharacter.stats.adjust(levelUpStats);

    // Remove the required XP from the town xp
    this.town.totalExperience -= requiredXp;

    // Re-draw the character box
    this.showCharacterBox();
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