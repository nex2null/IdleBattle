#!/usr/bin/env node

// Imports
import GameSaver from "./IO/GameSaver";
import ScreenManager from "./UI/ScreenManager";
import TownScreen from "./UI/Screens/TownScreen";

// Load the game
GameSaver.loadGame();

// Initialize the screen manager
var screenManager = ScreenManager.getInstance();

// Load the town screen
screenManager.loadScreen(new TownScreen());