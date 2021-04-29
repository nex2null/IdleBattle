// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Battle from "../Game/BattleSystem/Battle";
import BattleStateEnum from "../Game/BattleSystem/Enums/BattleStateEnum";

class BattleScreen {

  // Properties
  battle: Battle;
  program: any;
  screenElements: any;
  screen: any;

  // Constructor
  constructor(program: any, battle: Battle) {
    this.battle = battle;
    this.program = program;
    this.screenElements = {};
  }

  //
  // Initializes the screen
  //
  public initializeScreen() {

    // Create a screen
    this.screen = blessed.screen({
      terminal: 'xterm-256color',
      fullUnicode: true
    });

    // Quit on Control-C.
    this.screen.key(['C-c'], () => {
      return process.exit(0);
    });

    // Process battle on space
    this.screen.key(['space'], () => {
      this.processBattle();
    });

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
  }

  //
  // Processes the battle
  //
  private processBattle() {

    if (this.battle.currentState === BattleStateEnum.InBattle) {
      this.battle.processBattle();
      this.updateBattleCharacters();
    }

    if (this.battle.currentState === BattleStateEnum.LevelCleared) {
      this.screenElements.continuePrompt.ask('Level Cleared! Continue?', (err: any, data: any) => {
        if (err) throw err;
        if (!data) process.exit(0);
        if (data) this.advanceLevel();
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

    var x = 0;
    this.battle.battleLog.callback = (msg) => {
      this.screenElements.logBox.insertBottom(`${x++}: ${msg}`);
      this.screenElements.logBox.setScrollPerc(100);
      this.screen.render();
    }

    this.screen.key(['pageup'], () => {
      this.screenElements.logBox.scroll(-10);
      this.screen.render();
    });

    this.screen.key(['pagedown'], () => {
      this.screenElements.logBox.scroll(10);
      this.screen.render();
    });
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
}

export default BattleScreen;