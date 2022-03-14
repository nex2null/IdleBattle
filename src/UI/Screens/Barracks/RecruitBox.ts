// Imports
const blessed = require('blessed');
import CharacterClassFactory from "../../../Game/CharacterClasses/CharacterClassFactory";
import ICharacterClass from "../../../Game/CharacterClasses/ICharacterClass";
import Game from "../../../Game/Game";
import PlayerCharacterCreator from "../../../Game/PlayerCharacterCreator";
import Town from "../../../Game/Town";
import { stringCompareIgnoreCase } from "../../Helpers/StringHelper";

//
// Recruit box functionality for barracks screen
//
class RecruitBox {

  // Properties
  town: Town;
  screen: any;
  screenElements: any = {};
  recruitClasses: Array<ICharacterClass> = [];
  currentRecruitClassIndex: number = 0;
  
  //
  // Constructor
  //
  constructor() {
    this.screen = null;
    this.screenElements = null;
    this.town = Game.getInstance().town;

    // Load character classes
    this.recruitClasses = this.town.unlockedClasses.map(x => CharacterClassFactory.getCharacterClass(x));
  }

  //
  // Initialize the recruit box
  //
  initialize(screen: any, screenElements: any) {

    // Initialize props
    this.screen = screen;
    this.screenElements = screenElements;

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

    // Recruit ok button
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

    // Recruit cancel button
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
    this.screen.append(this.screenElements.recruitBox);
  }

  //
  // Show recruit box
  //
  public showRecruitBox() {

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

    // Grab the character name
    var characterName = this.screenElements.recruitNameBox.getValue() || '';
    characterName = characterName.trim();

    // Ensure a character name was provided
    if (!characterName) {
      this.screenElements.messageDialog.setFront();
      this.screenElements.messageDialog.display('Character Name is required', 0);
      this.screenElements.messageDialog.focus();
      return;
    }

    // Verify the name doesn't already exist
    if (this.town.roster.find(x => stringCompareIgnoreCase(x.name, characterName))) {
      this.screenElements.messageDialog.setFront();
      this.screenElements.messageDialog.display('A character with that name already exists', 0);
      this.screenElements.messageDialog.focus();
      return;
    }

    // Create the character
    var classToRecruit = this.recruitClasses[this.currentRecruitClassIndex];
    this.town.roster.push(PlayerCharacterCreator.createPlayerCharacter(classToRecruit.getEnum(), characterName));

    // Done recruiting
    this.hideRecruitBox();
  }
}

export default RecruitBox;