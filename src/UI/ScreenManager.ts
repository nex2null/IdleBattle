// Imports
const blessed = require('blessed');
import IScreen from "./Screens/IScreen";

class ScreenManager {

  // Properties
  public blessedScreen: any;
  public loadedScreen: IScreen | null;

  // Singleton boiler plate
  private static instance: ScreenManager;
  static getInstance() { return ScreenManager.instance || (ScreenManager.instance = new ScreenManager()); }

  // Constructor
  private constructor() {
    this.initializeScreen();
    this.loadedScreen = null;
  }

  //
  // Initializes the screen
  //
  private initializeScreen() {

    // Create a screen
    this.blessedScreen = blessed.screen({
      terminal: 'xterm-256color',
      fullUnicode: true
    });

    // Quit on Control-C.
    this.blessedScreen.key(['C-c'], () => {
      return process.exit(0);
    });
  }

  //
  // Loads a new screen
  //
  public loadScreen(screenToLoad: IScreen) {
    this.unloadCurrentScreen();
    screenToLoad.initializeScreen(this.blessedScreen);
    this.loadedScreen = screenToLoad;
    this.blessedScreen.render();
  }

  //
  // Unloads the current screen
  //
  private unloadCurrentScreen() {

    if (!this.loadedScreen)
      return;

    // Detach all the screen's children from the blessed screen
    var i = this.blessedScreen.children.length;
    while (i--) this.blessedScreen.children[i].detach();
    this.blessedScreen.realloc();
    this.blessedScreen.render();
  }
}

export default ScreenManager;