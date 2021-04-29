#!/usr/bin/env node

const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Battle from './Game/BattleSystem/Battle';
import BattleStateEnum from './Game/BattleSystem/Enums/BattleStateEnum';
import Game from './Game/Game';

// Create a screen object.
var screen = blessed.screen({
  terminal: 'xterm-256color',
  fullUnicode: true
});

// Quit on Control-C.
screen.key(['C-c'], () => {
  return process.exit(0);
});

var continuePrompt = contrib.question({
  parent: screen,
  border: 'line',
  height: 'shrink',
  width: 'half',
  top: 'center',
  left: 'center',
  okayText: 'Continue',
  cancelText: 'Escape'
});

var battle = Game.getInstance().startBattle(1);
battle.processBattle();
renderLog(screen, battle);

// Render battle characters
var screenElements: any = {};
renderBattleCharacters(screen, screenElements, battle);

screen.key(['space'], () => {

  if (battle.currentState === BattleStateEnum.InBattle) {
    battle.processBattle();
    updateBattleCharacters(screenElements, battle);
  }

  if (battle.currentState === BattleStateEnum.LevelCleared) {
    continuePrompt.ask('Level Cleared! Continue?', function (err: any, data: any) {
      if (err) throw err;
      if (!data) process.exit(0);
      if (data) advanceLevel(screen, screenElements, battle);
    });
  }

  screen.render();
});

// Render the screen.
screen.render();

// Start the battle
battle.startBattle();

function advanceLevel(screen: any, screenElements: any, battle: Battle) {
  battle.advanceLevel();
  renderBattleCharacters(screen, screenElements, battle);
  screen.render();
}

function renderLog(screen: any, battle: Battle) {
  var box = blessed.box({
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
  screen.append(box);

  box.focus();

  var x = 0;
  battle.battleLog.callback = (msg) => {
    box.insertBottom(`${x++}: ${msg}`);
    box.setScrollPerc(100);
    screen.render();
  }

  screen.key(['pageup'], () => {
    box.scroll(-10);
    screen.render();
  });

  screen.key(['pagedown'], () => {
    box.scroll(10);
    screen.render();
  });
}

function renderBattleCharacters(screen: any, screenElements: any, battle: Battle) {

  // If we already have screen elements, remove them before initializing
  if (screenElements.playersBox)
    screen.remove(screenElements.playersBox);
  if (screenElements.enemiesBox)
    screen.remove(screenElements.enemiesBox);

  screenElements.playersBox = blessed.box({
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

  screenElements.playerCharacters = {};

  battle.playerCharacters.forEach((character, index) => {

    var playerElements: any = {};
    screenElements.playerCharacters[character.name] = playerElements;

    var topBase = index * 5;

    playerElements.playerNameBox = blessed.text({
      parent: screenElements.playersBox,
      top: topBase,
      left: 0,
      content: `${character.name}`,
      tags: true
    });

    playerElements.chargeGauge = contrib.gauge({
      parent: screenElements.playersBox,
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
      parent: screenElements.playersBox,
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
      parent: screenElements.playersBox,
      top: topBase + 1,
      left: 32,
      width: 15,
      height: 3,
      label: 'MP',
      showLabel: false,
      stroke: 'blue',
      border: { type: 'line', fg: 'cyan' }
    });

    screen.append(screenElements.playersBox);
  });

  screenElements.enemiesBox = blessed.box({
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

  screenElements.enemyCharacters = {};

  battle.dungeon.currentLevel.enemies.forEach((character, index) => {

    var playerElements: any = {};
    screenElements.enemyCharacters[character.name] = playerElements;

    var topBase = index * 5;

    playerElements.playerNameBox = blessed.text({
      parent: screenElements.enemiesBox,
      top: topBase,
      left: 0,
      content: `${character.name}`,
      tags: true
    });

    playerElements.chargeGauge = contrib.gauge({
      parent: screenElements.enemiesBox,
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
      parent: screenElements.enemiesBox,
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
      parent: screenElements.enemiesBox,
      top: topBase + 1,
      left: 32,
      width: 15,
      height: 3,
      label: 'MP',
      showLabel: false,
      stroke: 'blue',
      border: { type: 'line', fg: 'cyan' }
    });

    screen.append(screenElements.enemiesBox);
  });

  updateBattleCharacters(screenElements, battle);
}

function updateBattleCharacters(screenElements: any, battle: Battle) {

  battle.playerCharacters.forEach((character) => {

    // Grab the elements for this player
    var playerElements: any = screenElements.playerCharacters[character.name];

    // Update gauge values
    playerElements.chargeGauge.setPercent(character.currentCharge);
    playerElements.hpGauge.setPercent((character.hp / character.maxHp) * 100);
    playerElements.mpGauge.setPercent((character.mp / character.maxMp) * 100);

    // Update labels
    playerElements.chargeGauge.setLabel(`Charge: ${character.currentCharge}`);
    playerElements.hpGauge.setLabel(`HP: ${character.hp}`);
    playerElements.mpGauge.setLabel(`MP: ${character.mp}`);
  });

  battle.dungeon.currentLevel.enemies.forEach((character) => {

    // Grab the elements for this player
    var playerElements: any = screenElements.enemyCharacters[character.name];

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