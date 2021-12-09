// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Battle from "../../Game/BattleSystem/Battle";
import BattleCharacter from "../../Game/BattleSystem/BattleCharacter";
import BattleSpeedEnum from "../../Game/BattleSystem/Enums/BattleSpeedEnum";
import BattleStateEnum from "../../Game/BattleSystem/Enums/BattleStateEnum";
import Game from "../../Game/Game";
import GameOptions from "../../Game/GameOptions";
import UIHelpers from "../Helpers/UIHelpers";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";

class BattleScreen implements IScreen {

  // Properties
  screen: any;
  battle: Battle;
  gameOptions: GameOptions;
  screenElements: any;
  messageCount: number = 0;

  // Constructor
  constructor(battle: Battle) {
    this.screen = null;
    this.battle = battle;
    this.screenElements = {};
    this.gameOptions = Game.getInstance().options;
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    // Save the screen
    this.screen = screen;

    // Create a continue prompt
    this.screenElements.continuePrompt = contrib.question({
      parent: this.screen,
      border: 'line',
      height: 'shrink',
      width: 'half',
      top: 'center',
      left: 'center',
      okayText: 'Continue',
      cancelText: 'Escape'
    });

    // Render screen elements
    this.renderLog();
    this.renderBattleCharacters();
    this.renderBattleOptions();
    this.updateBattleOptions();

    // Render the screen
    this.screen.render();

    // Start the battle loop
    this.startBattleLoop();
  }

  //
  // Starts the battle processing loop
  //
  private async startBattleLoop() {

    // Grab the level
    var currentLevel = this.battle.dungeon.currentLevelNumber;

    // Loop while we're battling
    while (this.battle.currentState === BattleStateEnum.InBattle) {

      // Process the battle after a small delay
      await UIHelpers.delay(this.gameOptions.battleSpeed);
      this.processBattle();

      // If the level has changed when we are finished processing then break
      if (this.battle.dungeon.currentLevelNumber != currentLevel)
        break;
    }
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
  }

  //
  // Processes the battle
  //
  private processBattle() {

    if (this.battle.isBattleWon() || this.battle.isBattleLost())
      return;

    if (this.battle.currentState === BattleStateEnum.InBattle) {
      this.battle.processBattle();
      this.updateBattleCharacters();
    }

    if (this.battle.currentState === BattleStateEnum.LevelCleared) {

      // If we are not auto advancing then prompt
      // otherwise just advance the level
      if (!this.gameOptions.autoAdvanceBattles) {
        this.screenElements.continuePrompt.ask('Level Cleared! Continue?', (err: any, data: any) => {
          if (err) throw err;
          if (!data) this.leaveBattle();
          if (data) this.advanceLevel();
        });
      } else {
        this.advanceLevel();
      }
    }

    if (this.battle.isBattleWon() || this.battle.isBattleLost()) {
      this.logMessage("{red-fg}---- PRESS ESCAPE TO EXIT THE BATTLE ----{/red-fg}");
      this.screenElements.logBox.key(['escape'], () => {
        this.leaveBattle();
      });
    }

    this.screen.render();
  }

  //
  // Advances the battle to the next level
  //
  private advanceLevel() {
    this.battle.advanceLevel();
    this.renderBattleCharacters();
    this.screen.render();
    this.startBattleLoop();
  }

  //
  // Renders the battle log
  //
  private renderLog() {
    this.screenElements.logBox = blessed.box({
      label: 'Log',
      top: 38,
      left: 0,
      width: 99,
      height: 14,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        border: {
          fg: '#f0f0f0'
        },
        focus: {
          border: {
            fg: 'blue'
          }
        }
      },
      tags: true,
      keys: true,
      scrollable: true,
      scrollbar: {
        style: {
          bg: 'yellow'
        }
      }
    });
    this.screen.append(this.screenElements.logBox);

    this.screenElements.logBox.focus();

    this.battle.battleLog.callback = (msg) => {
      this.logMessage(msg);
    }

    this.screenElements.logBox.key(['pageup'], () => {
      this.screenElements.logBox.scroll(-10);
      this.screen.render();
    });

    this.screenElements.logBox.key(['pagedown'], () => {
      this.screenElements.logBox.scroll(10);
      this.screen.render();
    });

    this.screenElements.logBox.key(['s'], () => this.toggleSpeed());
    this.screenElements.logBox.key(['a'], () => this.toggleAutoAdvance());
  }

  //
  // Logs a message
  //
  private logMessage(message: string) {
    this.screenElements.logBox.insertBottom(`${++this.messageCount}: ${message}`);
    this.screenElements.logBox.setScrollPerc(100);
    this.screen.render();
  }

  //
  // Renders the battle options
  //
  private renderBattleOptions() {

    // Battle options box
    this.screenElements.battleOptionsBox = blessed.box({
      top: 0,
      left: 0,
      width: 100,
      height: 1,
      tags: true
    });

    // Append to screen
    this.screen.append(this.screenElements.battleOptionsBox);
  }

  //
  // Update the battle options
  //
  private updateBattleOptions() {

    var content = "";

    // Set battle speed
    content += `{green-fg}S{/}peed: ${BattleSpeedEnum[this.gameOptions.battleSpeed]}`;

    // Set auto advance
    content += `\t{green-fg}A{/}uto advance: ${this.gameOptions.autoAdvanceBattles}`;

    // Set content
    this.screenElements.battleOptionsBox.setContent(content);
    this.screen.render();
  }

  //
  // Renders the battle characters
  //
  private renderBattleCharacters() {

    // If we already have screen elements, remove them before initializing
    if (this.screenElements.playersBox)
      this.screen.remove(this.screenElements.playersBox);
    if (this.screenElements.enemiesBox)
      this.screen.remove(this.screenElements.enemiesBox);

    // Create the box for the players
    this.screenElements.playersBox = blessed.box({
      top: 1,
      left: 0,
      width: 49,
      height: 36,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: '#f0f0f0'
        }
      }
    });

    // Render the player character ui elements
    this.screenElements.playerCharacters = {};
    this.battle.playerCharacters.forEach((character, index) => {
      var characterElements: any = {};
      this.screenElements.playerCharacters[character.name] = characterElements;
      this.renderCharacterElements(characterElements, this.screenElements.playersBox, index * 5);
      this.screen.append(this.screenElements.playersBox);
    });

    // Create the box for the enemies
    this.screenElements.enemiesBox = blessed.box({
      top: 1,
      left: 50,
      width: 49,
      height: 36,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: '#f0f0f0'
        },
      }
    });

    // Render the enemy character ui elements
    this.screenElements.enemyCharacters = {};
    this.battle.dungeon.currentLevel.enemies.forEach((character, index) => {
      var characterElements: any = {};
      this.screenElements.enemyCharacters[character.name] = characterElements;
      this.renderCharacterElements(characterElements, this.screenElements.enemiesBox, index * 5);
      this.screen.append(this.screenElements.enemiesBox);
    });

    // Update the UI
    this.updateBattleCharacters();
  }

  //
  // Renders the UI elements for a given character
  //
  private renderCharacterElements(characterElements: any, parent: any, topBase: number) {

    characterElements.playerNameBox = blessed.text({
      parent: parent,
      top: topBase,
      left: 0,
      content: '',
      tags: true
    });

    characterElements.chargeGauge = contrib.gauge({
      parent: parent,
      top: topBase + 1,
      left: 0,
      width: 15,
      height: 3,
      label: 'Charge',
      showLabel: false,
      stroke: 'green',
      border: { type: 'line', fg: 'cyan' }
    });

    characterElements.hpGauge = contrib.gauge({
      parent: parent,
      top: topBase + 1,
      left: 16,
      width: 15,
      height: 3,
      label: 'HP',
      showLabel: false,
      stroke: 'red',
      border: { type: 'line', fg: 'cyan' }
    });

    characterElements.mpGauge = contrib.gauge({
      parent: parent,
      top: topBase + 1,
      left: 32,
      width: 15,
      height: 3,
      label: 'MP',
      showLabel: false,
      stroke: 'blue',
      border: { type: 'line', fg: 'cyan' }
    });
  }

  //
  // Updates the battle characters after each turn
  //
  private updateBattleCharacters() {

    // Update player characters
    this.battle.playerCharacters.forEach((character) => {
      var characterElements = this.screenElements.playerCharacters[character.name];
      this.updateCharacterElements(characterElements, character);
    });

    // Update enemy characters
    this.battle.dungeon.currentLevel.enemies.forEach((character) => {
      var characterElements: any = this.screenElements.enemyCharacters[character.name];
      this.updateCharacterElements(characterElements, character);
    });
  }

  //
  // Updates the character elements
  //
  private updateCharacterElements(characterElements: any, character: BattleCharacter) {

    // If character has died, the name is gray
    var name = character.isAlive() ? character.name : `{gray-fg}${character.name}{/gray-fg}`;

    // Build up the list of effects
    var allEffects = character.effects.map(x => x.uiCode);
    var effectsString = allEffects.join(' ');

    // Update name
    characterElements.playerNameBox.setContent(`${name} ${effectsString}`);

    // Update gauge values
    characterElements.chargeGauge.setPercent(character.currentCharge / 250 * 100);
    characterElements.hpGauge.setPercent((character.currentStats.hp / character.baseStats.hp) * 100);
    characterElements.mpGauge.setPercent((character.currentStats.mp / character.baseStats.mp) * 100);

    // Update labels
    characterElements.chargeGauge.setLabel(`Charge: ${Math.round(character.currentCharge / 250 * 100)}%`);
    characterElements.hpGauge.setLabel(`HP: ${character.currentStats.hp}`);
    characterElements.mpGauge.setLabel(`MP: ${character.currentStats.mp}`);
  }

  //
  // Toggles the battle speed
  //
  private toggleSpeed() {

    // Set the new speed
    if (this.gameOptions.battleSpeed === BattleSpeedEnum.Slow)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Normal;
    else if (this.gameOptions.battleSpeed === BattleSpeedEnum.Normal)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Fast;
    else if (this.gameOptions.battleSpeed === BattleSpeedEnum.Fast)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Fastest;
    else if (this.gameOptions.battleSpeed === BattleSpeedEnum.Fastest)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Slow;

    // Update the battle options
    this.updateBattleOptions();
  }

  //
  // Toggles auto advancing through the dungeon
  //
  private toggleAutoAdvance() {

    // Toggle auto advance
    this.gameOptions.autoAdvanceBattles = !this.gameOptions.autoAdvanceBattles;

    // Update battle options
    this.updateBattleOptions();
  }

  //
  // Leaves the battle
  //
  private leaveBattle() {
    Game.getInstance().leaveBattle();
    ScreenManager.getInstance().loadScreen(new TownScreen());
  }
}

export default BattleScreen;