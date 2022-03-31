// Imports
const blessed = require('blessed');
import Game from "../../Game/Game";
import ScreenManager from "../ScreenManager";
import GameSaver from "../../IO/GameSaver";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import Town from "../../Game/Town";
import PlayerCharacter from "../../Game/PlayerCharacter";
import CharacterClassFactory from "../../Game/CharacterClasses/CharacterClassFactory";
import ISkill from "../../Game/BattleSystem/Skills/ISkill";
import SkillFactory from "../../Game/BattleSystem/Skills/SkillFactory";

class LevelUpScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  currentCharacter?: PlayerCharacter;
  currentSkillIndex: number = 0;
  currentSkill?: ISkill;
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

    // Skills box
    this.screenElements.skillsBox = blessed.box({
      parent: this.screenElements.characterBox,
      label: 'Skills',
      top: 7,
      left: 2,
      width: 74,
      height: 30,
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

    // Switch labels for the current skill
    this.screenElements.skillSwitchLabels = blessed.box({
      parent: this.screenElements.skillsBox,
      top: 1,
      height: 1,
      width: 44,
      left: 'center',
      content: '<<{|}>>',
      tags: true
    });

    // Skill name
    this.screenElements.skillNameLabel = blessed.box({
      parent: this.screenElements.skillsBox,
      top: 1,
      height: 1,
      width: 38,
      left: 'center',
      content: '',
      tags: true,
      style: {
        focus: {
          bg: 'white',
          fg: 'black'
        }
      }
    });

    // Line under the skill name
    this.screenElements.skillNameLine = blessed.line({
      parent: this.screenElements.skillsBox,
      top: 2,
      left: 'center',
      orientation: 'horizontal',
      width: 44
    });

    // Description box
    this.screenElements.skillDescription = blessed.box({
      parent: this.screenElements.skillsBox,
      top: 4,
      height: 12,
      width: 68,
      left: 2,
      content: '',
      tags: true,
      label: ' Description ',
      border: {
        type: 'line'
      }
    });

    // Skill level box
    this.screenElements.skillLevelBox = blessed.box({
      parent: this.screenElements.skillsBox,
      top: 17,
      height: 8,
      width: 68,
      left: 2,
      content: '',
      tags: true,
      label: ' Level ',
      border: {
        type: 'line'
      }
    });

    // Current skill level label
    this.screenElements.skillLevelLabel = blessed.box({
      parent: this.screenElements.skillLevelBox,
      top: 1,
      height: 1,
      width: 38,
      left: 11,
      content: '',
      tags: true
    });

    // Max skill level label
    this.screenElements.maxSkillLevelLabel = blessed.box({
      parent: this.screenElements.skillLevelBox,
      top: 2,
      height: 1,
      width: 38,
      left: 11,
      content: '',
      tags: true
    });

    // Skill points label
    this.screenElements.skillPointsLabel = blessed.box({
      parent: this.screenElements.skillLevelBox,
      top: 3,
      height: 1,
      width: 38,
      left: 11,
      content: '',
      tags: true
    });

    // Mastery points label
    this.screenElements.masteryPointsLabel = blessed.box({
      parent: this.screenElements.skillLevelBox,
      top: 4,
      height: 1,
      width: 38,
      left: 11,
      content: '',
      tags: true
    });

    // Level skill button
    this.screenElements.levelSkillButton = blessed.button({
      parent: this.screenElements.skillLevelBox,
      tags: true,
      content: '{center}LEVEL SKILL{/center}',
      top: 1,
      left: 34,
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

    // Master skill button
    this.screenElements.masterSkillButton = blessed.button({
      parent: this.screenElements.skillLevelBox,
      tags: true,
      content: '{center}MASTER SKILL{/center}',
      top: 1,
      left: 34,
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
    this.screenElements.levelUpButton.key(['down'], () => this.screenElements.skillNameLabel.focus());
    this.screenElements.skillNameLabel.key(['up'], () => this.screenElements.levelUpButton.focus());
    this.screenElements.skillNameLabel.key(['down'], () => this.tryFocusSkillLevelOrMasterButton());
    this.screenElements.skillNameLabel.key(['right'], () => this.setCurrentSkill(this.currentSkillIndex + 1));
    this.screenElements.skillNameLabel.key(['left'], () => this.setCurrentSkill(this.currentSkillIndex - 1));
    this.screenElements.skillNameLabel.key(['escape'], () => this.hideCharacterBox());
    this.screenElements.levelSkillButton.key(['up'], () => this.screenElements.skillNameLabel.focus());
    this.screenElements.levelSkillButton.key(['enter', 'space'], () => this.levelUpCurrentSkill());
    this.screenElements.levelSkillButton.key(['escape'], () => this.hideCharacterBox());
    this.screenElements.masterSkillButton.key(['up'], () => this.screenElements.skillNameLabel.focus());
    this.screenElements.masterSkillButton.key(['enter', 'space'], () => this.masterCurrentSkill());
    this.screenElements.masterSkillButton.key(['escape'], () => this.hideCharacterBox());

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

    // Update skills
    this.setCurrentSkill(0);

    // Show and focus the character box
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
    if (requiredXp > this.town.totalExperience)
      return;

    // Grab the stats
    var levelUpStats = currentClass.getLevelUpStatIncreases(nextLevel);

    // Grab the skills
    var levelUpSkills = currentClass.getLevelUpSkills(nextLevel);

    // Level up the character
    this.currentCharacter.levelUp(levelUpStats, levelUpSkills);

    // Remove the required XP from the town xp
    this.town.totalExperience -= requiredXp;

    // Re-draw the character box
    this.showCharacterBox();
  }

  // Set the current skill
  private setCurrentSkill(index: number) {

    // Sanity check
    if (!this.currentCharacter)
      return;

    this.currentSkillIndex = index;

    // If index is less than 0, set index to the last skill
    if (this.currentSkillIndex < 0)
      this.currentSkillIndex = this.currentCharacter.skills.length - 1;

    // If index is equal to or greater than the number of skills
    // then set it to the first skill
    else if (this.currentSkillIndex >= this.currentCharacter.skills.length)
      this.currentSkillIndex = 0;

    // Set the current skill
    var playerSkill = this.currentCharacter.skills[this.currentSkillIndex];
    this.currentSkill = SkillFactory.getSkill(playerSkill.skill, playerSkill.level, playerSkill.mastered);

    // Update the name of the skills
    this.screenElements.skillNameLabel.setContent(`{center}${this.currentSkill.name}{/}`);

    // Refresh the skill information
    this.refreshSkillInformation();
  }

  // Refresh the skill information
  private refreshSkillInformation() {

    // Sanity check
    if (!this.currentSkill || !this.currentCharacter)
      return;

    // Update the skill / mastery points
    this.screenElements.skillPointsLabel.setContent(`  Skill Points: ${this.currentCharacter.skillPoints}`);
    this.screenElements.masteryPointsLabel.setContent(`Mastery Points: ${this.currentCharacter.masteryPoints}`);

    // Set the skill levels
    this.screenElements.skillLevelLabel.setContent(` Current Level: ${this.currentSkill.level}`);
    this.screenElements.maxSkillLevelLabel.setContent(` Maximum Level: ${this.currentSkill.maxLevel}`);

    // Set the skill description
    this.screenElements.skillDescription.setContent(this.currentSkill.getDescription());

    // Determine if the level up skill button is visible
    var canLevelSkill = !this.currentSkill.isGeneric && this.currentSkill.level < this.currentSkill.maxLevel;
    if (canLevelSkill)
      this.screenElements.levelSkillButton.show();
    else
      this.screenElements.levelSkillButton.hide();

    // Determine if the master skill button is visible
    var skillIsMastered = this.currentCharacter.getPlayerSkill(this.currentSkill.skillEnum)?.mastered;
    var canMasterSkill = !this.currentSkill.isGeneric && !skillIsMastered && this.currentSkill.level === this.currentSkill.maxLevel;
    if (canMasterSkill)
      this.screenElements.masterSkillButton.show();
    else
      this.screenElements.masterSkillButton.hide();

    // Render the screen
    this.screen.render();
  }

  // Attempt to focus on the skill level button
  private tryFocusSkillLevelOrMasterButton() {

    // Try to focus skill level button
    if (!this.screenElements.levelSkillButton.hidden)
      this.screenElements.levelSkillButton.focus();

    // Try to focus skill mastery button
    if (!this.screenElements.masterSkillButton.hidden)
      this.screenElements.masterSkillButton.focus();
  }

  // Levels up the current skill
  private levelUpCurrentSkill() {

    // Sanity check
    if (!this.currentSkill || !this.currentCharacter)
      return;

    // Level the skill
    this.currentCharacter.levelSkill(this.currentSkill.skillEnum);

    // Reset the skill
    this.setCurrentSkill(this.currentSkillIndex);

    // If the level up skill button is hidden then focus on the skill name label instead
    if (this.screenElements.levelSkillButton.hidden)
      this.screenElements.skillNameLabel.focus();
  }

  // Masters the current skill
  private masterCurrentSkill() {

    // Sanity check
    if (!this.currentSkill || !this.currentCharacter)
      return;

    // Master the skill
    this.currentCharacter.masterSkill(this.currentSkill.skillEnum);

    // Reset the skill
    this.setCurrentSkill(this.currentSkillIndex);

    // If the master skill button is hidden then focus on the skill name label instead
    if (this.screenElements.masterSkillButton.hidden)
      this.screenElements.skillNameLabel.focus();
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