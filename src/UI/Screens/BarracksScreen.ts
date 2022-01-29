// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import Town from "../../Game/Town";
import ICharacterClass from "../../Game/CharacterClasses/ICharacterClass";
import CharacterClassFactory from "../../Game/CharacterClasses/CharacterClassFactory";

//
// Barracks Screen
//
class BarracksScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  town: Town;
  recruitClasses: Array<ICharacterClass> = [];
  currentRecruitClassIndex: number = 0;

  //
  // Constructor
  //
  constructor() {
    this.screen = null;
    this.town = Game.getInstance().town;

    // Load character classes
    this.recruitClasses = this.town.unlockedClasses.map(x => CharacterClassFactory.getCharacterClass(x));
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


    // Recruit display
    this.screenElements.recruitBox = blessed.box({
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

    // Switch labels for the recruit class name
    this.screenElements.recruitClassSwitchLabels = blessed.box({
      parent: this.screenElements.recruitBox,
      top: 1,
      height: 1,
      width: 74,
      left: 'center',
      content: '<<{|}>>',
      tags: true
    });

    // Recruit class label
    this.screenElements.recruitClassLabel = blessed.box({
      parent: this.screenElements.recruitBox,
      top: 1,
      height: 1,
      width: 68,
      left: 'center',
      content: '',
      tags: true,
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      },
    });

    // Line under the recruit class
    this.screenElements.recruitClassLine = blessed.line({
      parent: this.screenElements.recruitBox,
      top: 2,
      left: 'center',
      orientation: 'horizontal',
      width: 74
    });

    // Recruit name label
    this.screenElements.recruitNameLabel = blessed.text({
      parent: this.screenElements.recruitBox,
      top: 36,
      left: 2,
      content: 'Name:'
    });

    // Recruit name box
    this.screenElements.recruitNameBox = blessed.textbox({
      parent: this.screenElements.recruitBox,
      top: 37,
      left: 2,
      height: 3,
      inputOnFocus: true,
      border: {
        type: 'line'
      },
      style: {
        focus: {
          border: {
            fg: 'blue'
          }
        }
      }
    });

    // Ok button
    this.screenElements.recruitOkButton = blessed.button({
      parent: this.screenElements.recruitBox,
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
    this.screenElements.recruitCancelButton = blessed.button({
      parent: this.screenElements.recruitBox,
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
    this.screenElements.mainMenu.key(['escape'], () => this.screenElements.mainMenu.select(this.screenElements.mainMenu.fuzzyFind('Exit')));
    this.screenElements.mainMenu.on('select', (el: any) => this.onMenuSelect(el));
    this.screenElements.recruitClassLabel.key(['escape'], () => this.hideRecruitBox());
    this.screenElements.recruitClassLabel.key(['down'], () => this.screenElements.recruitNameBox.focus());
    this.screenElements.recruitClassLabel.key(['right'], () => this.setCurrentRecruitClass(this.currentRecruitClassIndex + 1));
    this.screenElements.recruitClassLabel.key(['left'], () => this.setCurrentRecruitClass(this.currentRecruitClassIndex - 1));
    this.screenElements.recruitNameBox.key(['up'], () => { this.screenElements.recruitNameBox.cancel(); this.screenElements.recruitClassLabel.focus(); });
    this.screenElements.recruitNameBox.key(['down'], () => { this.screenElements.recruitNameBox.cancel(); this.screenElements.recruitOkButton.focus(); });
    this.screenElements.recruitNameBox.key(['escape'], () => this.hideRecruitBox());
    this.screenElements.recruitOkButton.key(['up'], () => this.screenElements.recruitNameBox.focus());
    this.screenElements.recruitOkButton.key(['right'], () => this.screenElements.recruitCancelButton.focus());
    this.screenElements.recruitOkButton.key(['escape'], () => this.hideRecruitBox());
    this.screenElements.recruitOkButton.key(['enter', 'space'], () => this.recruitNewCharacter());
    this.screenElements.recruitCancelButton.key(['up'], () => this.screenElements.recruitNameBox.focus());
    this.screenElements.recruitCancelButton.key(['left'], () => this.screenElements.recruitOkButton.focus());
    this.screenElements.recruitCancelButton.key(['enter', 'space', 'escape'], () => this.hideRecruitBox());

    // Append items to screen
    this.screen.append(this.screenElements.mainMenu);
    this.screen.append(this.screenElements.recruitBox);

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
    var items = [];
    items.push('Recruit');
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
      this.showRecruitBox();

    // Render the screen
    this.screen.render();
  }

  //
  // Show recruit box
  //
  private showRecruitBox() {

    // Reset form inputs
    this.setCurrentRecruitClass(0);
    this.screenElements.recruitNameBox.clearValue();

    // Handle UI
    this.screenElements.recruitBox.show();
    this.screenElements.recruitClassLabel.focus();
    this.screen.render();
  }

  //
  // Hide recruit box
  //
  private hideRecruitBox() {
    this.screenElements.recruitBox.hide();
    this.screenElements.mainMenu.focus();
    this.screen.render();
  }

  //
  // Sets the current player
  //
  private setCurrentRecruitClass(index: number) {

    this.currentRecruitClassIndex = index;

    // If index is less than 0, set index to the last class
    if (this.currentRecruitClassIndex < 0)
      this.currentRecruitClassIndex = this.recruitClasses.length - 1;

    // If index is equal to or greater than the recruitable classes length
    // then set it to the first recruitable class
    else if (this.currentRecruitClassIndex >= this.recruitClasses.length)
      this.currentRecruitClassIndex = 0;

    // Grab the current class to recruit
    var classToRecruit = this.recruitClasses[this.currentRecruitClassIndex];

    // Update the name of the class
    this.screenElements.recruitClassLabel.setContent(`{center}${classToRecruit.getName()}{/}`);

    // Render
    this.screen.render();
  }

  //
  // Recruits a new character
  //
  private recruitNewCharacter() {

    // TODO
  }
}

export default BarracksScreen;