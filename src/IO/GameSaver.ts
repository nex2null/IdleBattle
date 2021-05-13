const fs = require('fs');
import Game from "../Game/Game";

//
// Helper class for handling game saves
//
class GameSaver {

  //
  // Saves the game
  //
  static saveGame() {
    fs.writeFileSync('game.json', Game.getInstance().serialize());
  }

  //
  // Loads the game
  //
  static loadGame() {
    try {
      var json = fs.readFileSync('game.json');
      Game.getInstance().load(JSON.parse(json));
    }
    catch {
      // Nom
    }
  }
}

export default GameSaver;