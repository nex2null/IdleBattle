#!/usr/bin/env node

import chalk from 'chalk';
import Game from './Game/Game';

console.log(`Total Gold: ${chalk.yellow(Game.getInstance().town.totalGold)}`);

