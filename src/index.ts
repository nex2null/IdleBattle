#!/usr/bin/env node

const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from './Game/Game';

// Create a screen object.
var screen = blessed.screen();
var grid = new contrib.grid({ rows: 36, cols: 48, screen: screen });

// Create a box and attach to grid
var box = grid.set(0, 0, 26, 24, blessed.box, {
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    }
  }
});

//grid.set(row, col, rowSpan, colSpan, obj, opts)
var text_one = grid.set(1, 28, 3, 10, blessed.text, { content: 'Brian' });
var charge_one = grid.set(2, 1, 3, 6, contrib.gauge, { label: 'Charge', percent: 80, showLabel: false, stroke: 'green' });
var hp_one = grid.set(2, 9, 3, 6, contrib.gauge, { label: 'HP', percent: 80, showLabel: false, stroke: 'red' });
var ap_one = grid.set(2, 17, 3, 6, contrib.gauge, { label: 'AP', percent: 80, showLabel: false, stroke: 'blue' });
var charge_two = grid.set(7, 1, 3, 6, contrib.gauge, { label: 'Charge', percent: 20, showLabel: false, stroke: 'green' });
var charge_three = grid.set(12, 1, 3, 6, contrib.gauge, { label: 'Charge', percent: 80, showLabel: false, stroke: 'green' });
var charge_four = grid.set(17, 1, 3, 6, contrib.gauge, { label: 'Charge', percent: 20, showLabel: false, stroke: 'green' });
var charge_five = grid.set(22, 1, 3, 6, contrib.gauge, { label: 'Charge', percent: 80, showLabel: false, stroke: 'green' });

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'C-c'], () => {
  return process.exit(0);
});

// Render the screen.
screen.render();