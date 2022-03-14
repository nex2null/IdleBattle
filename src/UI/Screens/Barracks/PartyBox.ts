// Imports
const blessed = require('blessed');
import Game from "../../../Game/Game";
import Town from "../../../Game/Town";

//
// Party box functionality for barracks screen
//
class PartyBox {

  // Properties
  town: Town;
  screen: any;
  screenElements: any = {};
  
  //
  // Constructor
  //
  constructor() {
    this.screen = null;
    this.screenElements = null;
    this.town = Game.getInstance().town;
  }

  //
  // Initialize the party box
  //
  initialize(screen: any, screenElements: any) {

    // Initialize props
    this.screen = screen;
    this.screenElements = screenElements;

    // Party display
    this.screenElements.partyBox = blessed.box({
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

    // Roster list
    this.screenElements.rosterList = blessed.list({
      parent: this.screenElements.partyBox,
      top: 0,
      left: 1,
      width: 37,
      height: 30,
      border: {
        type: 'line'
      },
      label: 'Roster',
      style: {
        border: {
          fg: 'white'
        },
        selected: {
          bg: 'black',
          fg: 'white'
        },
        focus: {
          border: {
            fg: 'blue'
          },
          selected: {
            bg: 'white',
            fg: 'black'
          }
        }
      },
      keys: true
    });

    // Currenty party list
    this.screenElements.currentPartyList = blessed.list({
      parent: this.screenElements.partyBox,
      top: 0,
      left: 40,
      width: 37,
      height: 30,
      border: {
        type: 'line'
      },
      label: 'Party',
      style: {
        border: {
          fg: 'white'
        },
        selected: {
          bg: 'black',
          fg: 'white'
        },
        focus: {
          border: {
            fg: 'blue'
          },
          selected: {
            bg: 'white',
            fg: 'black'
          }
        }
      },
      keys: true
    });

    // Party ok button
    this.screenElements.partyOkButton = blessed.button({
      parent: this.screenElements.partyBox,
      tags: true,
      content: '{center}Ok{/center}',
      top: 42,
      left: 14,
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

    // Party cancel button
    this.screenElements.partyCancelButton = blessed.button({
      parent: this.screenElements.partyBox,
      tags: true,
      content: '{center}Cancel{/center}',
      top: 42,
      left: 44,
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
    this.screenElements.rosterList.key(['right'], () => this.screenElements.currentPartyList.focus());
    this.screenElements.rosterList.key(['escape'], () => this.hidePartyBox());
    this.screenElements.rosterList.on('select', (el: any) => this.onRosterListSelect(el));
    this.screenElements.currentPartyList.key(['left'], () => this.screenElements.rosterList.focus());
    this.screenElements.currentPartyList.key(['right'], () => this.screenElements.partyOkButton.focus());
    this.screenElements.currentPartyList.key(['escape'], () => this.hidePartyBox());
    this.screenElements.currentPartyList.on('select', (el: any) => this.onCurrentPartyListSelect(el));
    this.screenElements.partyOkButton.key(['left'], () => this.screenElements.currentPartyList.focus());
    this.screenElements.partyOkButton.key(['up'], () => this.screenElements.rosterList.focus());
    this.screenElements.partyOkButton.key(['right'], () => this.screenElements.partyCancelButton.focus());
    this.screenElements.partyOkButton.key(['escape'], () => this.hidePartyBox());
    this.screenElements.partyOkButton.key(['enter', 'space'], () => this.saveParty());
    this.screenElements.partyCancelButton.key(['left'], () => this.screenElements.partyOkButton.focus());
    this.screenElements.partyCancelButton.key(['up'], () => this.screenElements.currentPartyList.focus());
    this.screenElements.partyCancelButton.key(['escape', 'enter', 'space'], () => this.hidePartyBox());

    // Append items to screen
    this.screen.append(this.screenElements.partyBox);

    // Load party lists
    this.reloadRosterList();
    this.reloadPartyList();
  }

  //
  // Show party box
  //
  public showPartyBox() {

    // Reload party lists
    this.reloadRosterList();
    this.reloadPartyList();

    // Handle UI
    this.screenElements.partyBox.show();
    this.screenElements.rosterList.focus();
    this.screen.render();
  }

  //
  // Hide party box
  //
  private hidePartyBox() {
    this.screenElements.partyBox.hide();
    this.screenElements.mainMenu.focus();
    this.screen.render();
  }

  //
  // Reload the roster list from the characters not in the party
  //
  private reloadRosterList() {

    // Grab the characters not in the current party
    var charactersNotInParty = this.town.getCharactersNotInParty();

    // Set the roster list based on characters not in the current party
    var items: any = [];
    charactersNotInParty.forEach(x => items.push(x.name));
    this.screenElements.rosterList.setItems(items);
  }

  //
  // Reload the party list from the characters in the party
  //
  private reloadPartyList() {

    // Grab the characters in the current party
    var charactersInParty = this.town.getCharactersInParty();

    // Set the party list based on characters in the current party
    var items: any = [];
    charactersInParty.forEach(x => items.push(x.name));
    this.screenElements.currentPartyList.setItems(items);
  }

  //
  // Handle the roster list item being selected
  //
  private onRosterListSelect(el: any) {

    // Remove element from roster list and add to party list
    this.screenElements.rosterList.removeItem(el);
    this.screenElements.currentPartyList.pushItem(el);

    // Render the screen
    this.screen.render();
  }

  //
  // Handle the party list item being selected
  //
  private onCurrentPartyListSelect(el: any) {

    // Remove element from party list and add to roster list
    this.screenElements.currentPartyList.removeItem(el);
    this.screenElements.rosterList.pushItem(el);

    // Render the screen
    this.screen.render();
  }

  //
  // Saves the current party
  //
  private saveParty() {

    var currentParty: Array<string> = [];

    // Build up list of the current party
    var items = this.screenElements.currentPartyList.items;
    items.forEach((item: any) => {
      var character = this.town.roster.find(x => x.name === item.getText());
      if (!character) return;
      currentParty.push(character.uid);
    });

    // Set town current party
    this.town.currentParty = currentParty;

    // Hide party box
    this.hidePartyBox();
  }
}

export default PartyBox;