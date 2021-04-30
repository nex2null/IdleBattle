#!/usr/bin/env node

// Imports
import ScreenManager from "./UI/ScreenManager";
import TownScreen from "./UI/Screens/TownScreen";

// Initialize the screen manager
var screenManager = ScreenManager.getInstance();

// Load the town screen
screenManager.loadScreen(new TownScreen());