#!/usr/bin/env node

const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from './Game/Game';

// Create a screen object.
var screen = blessed.screen();
var grid = new contrib.grid({ rows: 24, cols: 24, screen: screen });

// Create a box and attach to grid
var box = grid.set(0, 0, 12, 12, blessed.box, {
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
    }
  }
});

//grid.set(row, col, rowSpan, colSpan, obj, opts)

// Append some gauges to the grid
var gauge = grid.set(2, 9, 3, 3, contrib.gauge, { label: 'Charge', percent: 80, showLabel: false, stroke: 'green' });
var gauge_two = grid.set(8, 10, 3, 2, contrib.gauge, { label: 'Charge', percent: 20, showLabel: false, stroke: 'green' });

// Handle screen resizes
screen.on('resize', function () {
  gauge.emit('attach');
  gauge_two.emit('attach');
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'C-c'], () => {
  return process.exit(0);
});

// Render the screen.
screen.render();