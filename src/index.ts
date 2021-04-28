#!/usr/bin/env node

const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Battle from './Game/BattleSystem/Battle';
import Game from './Game/Game';

// Create a screen object.
var screen = blessed.screen({
  terminal: 'xterm-256color',
  fullUnicode: true
});

//renderGrid(screen);
renderNative(screen);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'C-c'], () => {
  return process.exit(0);
});

var battle = Game.getInstance().startBattle(1);
battle.processBattle();
renderLog(screen, battle);

// Render the screen.
screen.render();

function renderLog(screen: any, battle: Battle) {
  var box = blessed.box({
    label: 'Log',
    top: 37,
    left: 0,
    width: 100,
    height: 15,
    border: {
      type: 'line'
    },
    keys: true,
    style: {
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      },
      focus: {
        border: {
          fg: 'blue'
        }
      },
      scrollbar: {
        bg: 'red',
        fg: 'blue'
      }
    },
    scrollable: true,
    scrollbar: true
  });
  screen.append(box);

  // var log = blessed.log({
  //   parent: box,
  //   top: 0,
  //   left: 0
  // });



  box.focus();

  var x = 0;
  box.key(['f'], () => {
    box.setScrollPerc(100);
    box.insertBottom(`new log line: ${x++}`);
    box.setScrollPerc(100);
    screen.render();
  });
  screen.key(['left'], () => {
    screen.focusPrevious();
    screen.render();
  });
  screen.key(['right'], () => {
    screen.focusNext();
    screen.render();
  });
}

function renderNative(screen: any) {

  var box = blessed.box({
    top: 0,
    left: 0,
    width: 49,
    height: 36,
    keyable: true,
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

  blessed.text({
    parent: box,
    top: 0,
    left: 0,
    content: 'Brian {green-fg}PSN{/green-fg} {red-fg}BLD{/red-fg} {#FFA500-fg}IGN{/#FFA500-fg} {cyan-fg}FRZ{/cyan-fg}',
    tags: true
  })

  var chargeGauge = contrib.gauge({
    parent: box,
    top: 1,
    left: 0,
    width: 15,
    height: 3,
    label: 'Charge',
    showLabel: false,
    stroke: 'green',
    border: { type: 'line', fg: 'cyan' }
  });

  var hpGauge = contrib.gauge({
    parent: box,
    top: 1,
    left: 16,
    width: 15,
    height: 3,
    label: 'HP',
    showLabel: false,
    stroke: 'red',
    border: { type: 'line', fg: 'cyan' }
  });

  var apGauge = contrib.gauge({
    parent: box,
    top: 1,
    left: 32,
    width: 15,
    height: 3,
    label: 'AP',
    showLabel: false,
    stroke: 'blue',
    border: { type: 'line', fg: 'cyan' }
  });

  screen.append(box);
  chargeGauge.setPercent(45);
  chargeGauge.setLabel('Charge: 45')
  hpGauge.setPercent(1);
  apGauge.setPercent(50);
}