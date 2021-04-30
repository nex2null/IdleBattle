// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Battle from "../../Game/BattleSystem/Battle";
import BattleStateEnum from "../../Game/BattleSystem/Enums/BattleStateEnum";
import Game from "../../Game/Game";
import UIHelpers from "../Helpers/UIHelpers";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";

class BattleScreen implements IScreen {

  // Properties
  screen: any;
  battle: Battle;
  screenElements: any;
  messageCount: number = 0;

  // Constructor
  constructor(battle: Battle) {
    this.screen = null;
    this.battle = battle;
    this.screenElements = {};
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

    // Render battle log and characters
    this.renderLog();
    this.renderBattleCharacters();

    // Render the screen
    this.screen.render();

    // Start the battle loop
    this.startBattleLoop();
  }

  //
  // Starts the battle processing loop
  //
  private async startBattleLoop() {
    while (this.battle.currentState === BattleStateEnum.InBattle) {
      await UIHelpers.delay(250);
      this.processBattle();
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
      this.screenElements.continuePrompt.ask('Level Cleared! Continue?', (err: any, data: any) => {
        if (err) throw err;
        if (!data) this.leaveBattle();
        if (data) this.advanceLevel();
      });
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
      top: 37,
      left: 0,
      width: 99,
      height: 15,
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
  // Renders the battle characters
  //
  private renderBattleCharacters() {

    // If we already have screen elements, remove them before initializing
    if (this.screenElements.playersBox)
      this.screen.remove(this.screenElements.playersBox);
    if (this.screenElements.enemiesBox)
      this.screen.remove(this.screenElements.enemiesBox);

    this.screenElements.playersBox = blessed.box({
      top: 0,
      left: 0,
      width: 49,
      height: 36,
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
      }
    });

    this.screenElements.playerCharacters = {};

    this.battle.playerCharacters.forEach((character, index) => {

      var playerElements: any = {};
      this.screenElements.playerCharacters[character.name] = playerElements;

      var topBase = index * 5;

      playerElements.playerNameBox = blessed.text({
        parent: this.screenElements.playersBox,
        top: topBase,
        left: 0,
        content: `${character.name}`,
        tags: true
      });

      playerElements.chargeGauge = contrib.gauge({
        parent: this.screenElements.playersBox,
        top: topBase + 1,
        left: 0,
        width: 15,
        height: 3,
        label: 'Charge',
        showLabel: false,
        stroke: 'green',
        border: { type: 'line', fg: 'cyan' }
      });

      playerElements.hpGauge = contrib.gauge({
        parent: this.screenElements.playersBox,
        top: topBase + 1,
        left: 16,
        width: 15,
        height: 3,
        label: 'HP',
        showLabel: false,
        stroke: 'red',
        border: { type: 'line', fg: 'cyan' }
      });

      playerElements.mpGauge = contrib.gauge({
        parent: this.screenElements.playersBox,
        top: topBase + 1,
        left: 32,
        width: 15,
        height: 3,
        label: 'MP',
        showLabel: false,
        stroke: 'blue',
        border: { type: 'line', fg: 'cyan' }
      });

      this.screen.append(this.screenElements.playersBox);
    });

    this.screenElements.enemiesBox = blessed.box({
      top: 0,
      left: 50,
      width: 49,
      height: 36,
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
      }
    });

    this.screenElements.enemyCharacters = {};

    this.battle.dungeon.currentLevel.enemies.forEach((character, index) => {

      var playerElements: any = {};
      this.screenElements.enemyCharacters[character.name] = playerElements;

      var topBase = index * 5;

      playerElements.playerNameBox = blessed.text({
        parent: this.screenElements.enemiesBox,
        top: topBase,
        left: 0,
        content: `${character.name}`,
        tags: true
      });

      playerElements.chargeGauge = contrib.gauge({
        parent: this.screenElements.enemiesBox,
        top: topBase + 1,
        left: 0,
        width: 15,
        height: 3,
        label: 'Charge',
        showLabel: false,
        stroke: 'green',
        border: { type: 'line', fg: 'cyan' }
      });

      playerElements.hpGauge = contrib.gauge({
        parent: this.screenElements.enemiesBox,
        top: topBase + 1,
        left: 16,
        width: 15,
        height: 3,
        label: 'HP',
        showLabel: false,
        stroke: 'red',
        border: { type: 'line', fg: 'cyan' }
      });

      playerElements.mpGauge = contrib.gauge({
        parent: this.screenElements.enemiesBox,
        top: topBase + 1,
        left: 32,
        width: 15,
        height: 3,
        label: 'MP',
        showLabel: false,
        stroke: 'blue',
        border: { type: 'line', fg: 'cyan' }
      });

      this.screen.append(this.screenElements.enemiesBox);
    });

    this.updateBattleCharacters();
  }

  //
  // Updates the battle characters after each turn
  //
  private updateBattleCharacters() {

    this.battle.playerCharacters.forEach((character) => {

      // Grab the elements for this player
      var playerElements = this.screenElements.playerCharacters[character.name];

      // Update name if character has died
      if (!character.isAlive()) {
        playerElements.playerNameBox.setContent(`{gray-fg}${character.name}{/gray-fg}`);
      }

      // Update gauge values
      playerElements.chargeGauge.setPercent(character.currentCharge);
      playerElements.hpGauge.setPercent((character.hp / character.maxHp) * 100);
      playerElements.mpGauge.setPercent((character.mp / character.maxMp) * 100);

      // Update labels
      playerElements.chargeGauge.setLabel(`Charge: ${character.currentCharge}`);
      playerElements.hpGauge.setLabel(`HP: ${character.hp}`);
      playerElements.mpGauge.setLabel(`MP: ${character.mp}`);
    });

    this.battle.dungeon.currentLevel.enemies.forEach((character) => {

      // Grab the elements for this player
      var playerElements: any = this.screenElements.enemyCharacters[character.name];

      // Update name if character has died
      if (!character.isAlive()) {
        playerElements.playerNameBox.setContent(`{gray-fg}${character.name}{/gray-fg}`);
      }

      // Update gauge values
      playerElements.chargeGauge.setPercent(character.currentCharge);
      playerElements.hpGauge.setPercent((character.hp / character.maxHp) * 100);
      playerElements.mpGauge.setPercent((character.mp / character.maxMp) * 100);

      // Update labels
      playerElements.chargeGauge.setLabel(`Charge: ${character.currentCharge}`);
      playerElements.hpGauge.setLabel(`HP: ${character.hp}`);
      playerElements.mpGauge.setLabel(`MP: ${character.mp}`);
    });
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