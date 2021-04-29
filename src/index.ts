#!/usr/bin/env node

const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from './Game/Game';
import BattleScreen from './Screens/BattleScreen';

var battle = Game.getInstance().startBattle(1);
var screen = new BattleScreen(null, battle);
screen.initializeScreen();

battle.startBattle();