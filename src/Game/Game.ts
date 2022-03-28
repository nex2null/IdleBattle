import Town from './Town';
import Battle from './BattleSystem/Battle';
import Dungeon from './BattleSystem/Dungeon/Dungeon';
import BattleLog from './BattleSystem/BattleLog';
import { LootGenerator } from './Itemization/LootGenerator';
import GameOptions from './GameOptions';
import GameSaver from '../IO/GameSaver';

class Game {

  // Properties
  public town: Town;
  public currentBattle: Battle | null;
  public options: GameOptions;

  // Singleton boiler plate
  private static instance: Game;
  static getInstance() { return Game.instance || (Game.instance = new Game()); }

  // Constructor
  private constructor() {
    this.town = new Town();
    this.currentBattle = null;
    this.options = new GameOptions();
  }

  // Start a new battle
  startBattle(dungeon: Dungeon): Battle {

    // Verify a battle is not already started
    if (this.currentBattle != null)
      return this.currentBattle;

    // Create the battle
    var battleLog = new BattleLog();
    var playerBattleCharacters = this.town.getCharactersInParty().map(x => x.toBattleCharacter());
    this.currentBattle = new Battle(playerBattleCharacters, dungeon, battleLog);
    return this.currentBattle;
  }

  // Leave the current battle
  // TODO: Get this out of here
  leaveBattle() {

    // Make sure we're in a battle
    if (!this.currentBattle)
      return;

    // If we didn't lose the battle then get rewards
    if (!this.currentBattle.isBattleLost()) {

      // Grab defeated enemies
      var dungeon = this.currentBattle.dungeon;
      var defeatedEnemies = dungeon.getDefeatedEnemies();

      // Get items, experience, and gold
      var defeatedEnemies = dungeon.getDefeatedEnemies();
      for (var i = 0; i < defeatedEnemies.length; i++) {
        var enemy = defeatedEnemies[i];
        var items = LootGenerator.generateLoot(
          enemy.maxNumberOfItemsToDrop,
          enemy.lootGenerationOptions);
        this.town.inventory.addItems(items);
        this.town.totalGold += enemy.goldWorth;
        this.town.totalExperience += enemy.xpWorth;
      }
    }

    // Leave the battle
    this.currentBattle = null;

    // Save the game
    GameSaver.saveGame();
  }

  //
  // Serializes the object
  //
  serialize() {
    return JSON.stringify(this);
  }

  //
  // Loads from saved data
  //
  load(savedData: any) {
    this.options = new GameOptions(savedData.options);
    this.town = new Town(savedData.town);
  }
}

export default Game;