#!/usr/bin/env node

const blessed = require('blessed');
import Game from './Game/Game';

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
  title: 'Command Line Idle - RPG'
});

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: `
  {bold}UNDER CONSTRUCTION!{/bold} - Great things will be here soon.\n\n
  You currently have {yellow-fg}${Game.getInstance().town.totalGold} gold{/yellow-fg}.\n\n
  Please press {bold}ESCAPE{/bold} to exit.
  `,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Append our box to the screen.
screen.append(box);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'C-c'], () => {
  return process.exit(0);
});

// Render the screen.
screen.render();