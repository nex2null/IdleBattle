#!/usr/bin/env node

import chalk from 'chalk';
import blessed from 'blessed';
import Game from './Game/Game';

console.log(`Total Gold: ${chalk.yellow(Game.getInstance().town.totalGold)}`);

// Initialize the screen widget.
var screen = blessed.screen({
  smartCSR: true,
  title: 'Hello World'
});

screen.key('q', () => {
  screen.destroy();
});

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
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

screen.render();