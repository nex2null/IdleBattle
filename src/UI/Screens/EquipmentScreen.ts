

// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import EquipmentSlotEnum from "../../Game/Itemization/Enums/EquipmentSlotEnum";
import ItemSuperTypeEnum from "../../Game/Itemization/Enums/ItemSuperTypeEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";
import { itemInformations } from "../../Game/Itemization/ItemInformation";
import Town from "../../Game/Town";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";

class EquipmentScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentPlayerIndex: number = 0;
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

    this.screenElements.characterBox = blessed.box({
      top: 0,
      left: 0,
      width: 30,
      height: 50,
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

    this.screenElements.characterSwitchLabels = blessed.box({
      parent: this.screenElements.characterBox,
      top: 1,
      height: 1,
      width: 24,
      left: 'center',
      content: '<<{|}>>',
      tags: true
    });

    this.screenElements.characterNameLabel = blessed.box({
      parent: this.screenElements.characterBox,
      top: 1,
      height: 1,
      width: 18,
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

    this.screenElements.characterNameLine = blessed.line({
      parent: this.screenElements.characterBox,
      top: 2,
      left: 'center',
      orientation: 'horizontal',
      width: 24
    });

    this.screenElements.chestBox = blessed.box({
      parent: this.screenElements.characterBox,
      top: 5,
      height: 5,
      width: 26,
      left: 'center',
      border: {
        type: 'line'
      },
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      },
      label: 'Chest',
      content: 'Empty',
      tags: true
    });

    this.screenElements.bootsBox = blessed.box({
      parent: this.screenElements.characterBox,
      top: 11,
      height: 5,
      width: 26,
      left: 'center',
      border: {
        type: 'line'
      },
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      },
      label: 'Boots',
      content: 'Empty',
      tags: true
    });

    this.screenElements.equipmentListBox = blessed.box({
      top: 0,
      left: 31,
      width: 40,
      height: 50,
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

    this.screenElements.equipmentListBox = blessed.list({
      top: 0,
      left: 31,
      width: 40,
      height: 50,
      border: {
        type: 'line'
      },
      label: 'Equipment',
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

    this.screenElements.equipmentDetailsBox = blessed.box({
      top: 0,
      left: 72,
      width: 40,
      height: 50,
      border: {
        type: 'line'
      },
      label: 'Details',
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    });

    // Set key bindings
    this.screenElements.characterNameLabel.key(['down'], () => this.screenElements.chestBox.focus());
    this.screenElements.characterNameLabel.key(['right'], () => this.setCurrentPlayer(this.currentPlayerIndex + 1));
    this.screenElements.characterNameLabel.key(['left'], () => this.setCurrentPlayer(this.currentPlayerIndex - 1));
    this.screenElements.chestBox.key(['up'], () => this.screenElements.characterNameLabel.focus());
    this.screenElements.chestBox.key(['down'], () => this.screenElements.bootsBox.focus());
    this.screenElements.chestBox.key(['enter'], () => this.loadEquipment(EquipmentSlotEnum.ChestPiece));
    this.screenElements.bootsBox.key(['up'], () => this.screenElements.chestBox.focus());
    this.screenElements.equipmentListBox.key(['escape'], () => this.unloadEquipment());

    // Draw screen
    this.screen.append(this.screenElements.characterBox);
    this.screen.append(this.screenElements.equipmentListBox);
    this.screen.append(this.screenElements.equipmentDetailsBox);

    // Set focus to character name
    this.screenElements.characterNameLabel.focus();

    // Set current player
    this.setCurrentPlayer(0);
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
  }

  //
  // Sets the current player
  //
  private setCurrentPlayer(index: number) {

    this.currentPlayerIndex = index;

    // If index is less than 0, set index to the last character
    if (this.currentPlayerIndex < 0)
      this.currentPlayerIndex = this.town.playerCharacters.length - 1;

    // If index is equal to or greater than the player characters length
    // then set it to the first character
    else if (this.currentPlayerIndex >= this.town.playerCharacters.length)
      this.currentPlayerIndex = 0;

    // Grab the current character
    var character = this.town.playerCharacters[this.currentPlayerIndex];

    // Update the name of the character
    this.screenElements.characterNameLabel.setContent(`{center}${character.name}{/}`);

    // Render the screen
    this.screen.render();
  }

  private loadEquipment(slot: EquipmentSlotEnum) {

    // Grab all the items of the given equipment slot
    var allEquipmentOfSlot = this.town.inventory.items
      .filter(x => x.superType === ItemSuperTypeEnum.Equipment)
      .map(x => x as Equipment)
      .filter(x => x.slot === slot);

    // Set the items
    this.screenElements.equipmentListBox.setItems(allEquipmentOfSlot.map(x => x.name));

    // Focus on the list
    this.screen.focusPush(this.screenElements.equipmentListBox);
  }

  private unloadEquipment() {

    this.screenElements.equipmentListBox.setItems([]);
    this.screen.focusPop();
    this.screen.render();
  }
}

export default EquipmentScreen;