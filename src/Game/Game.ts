import Town from './Town';
import Battle from './BattleSystem/Battle';
import Dungeon from './BattleSystem/Dungeon/Dungeon';
import Spider from './BattleSystem/Enemies/Spider';
import DungeonLevel from './BattleSystem/Dungeon/DungeonLevel';
import BattleLog from './BattleSystem/BattleLog';

class Game {

    // Properties
    public town: Town;
    public currentBattle: Battle | null;

    // Singleton boiler plate
    private static instance: Game;
    static getInstance() { return Game.instance || (Game.instance = new Game()); }

    // Constructor
    private constructor() {
        this.town = new Town();
        this.currentBattle = null;
    }

    // Start a new battle
    startBattle(dungeonId: number) {

        // Verify a battle is not already started
        if (this.currentBattle != null)
            return;

        // Create the dungeon
        var dungeon = new Dungeon([
            new DungeonLevel([new Spider('Spider 1'), new Spider('Spider 2')]),
            new DungeonLevel([new Spider('Spider 3'), new Spider('Spider 4'), new Spider('Spider 5')]),
            new DungeonLevel([new Spider('Spider 6'), new Spider('Spider 7'), new Spider('Spider 8'), new Spider('Spider 9')])
        ]);

        // Create the battle
        var battleLog = new BattleLog();
        var playerBattleCharacters = this.town.playerCharacters.map(x => x.toBattleCharacter());
        this.currentBattle = new Battle(playerBattleCharacters, dungeon, battleLog);

        // Lets go
        this.currentBattle.startBattle();
    }

    // Leave the current battle
    leaveBattle() {
        // TODO: Loot here?
        this.currentBattle = null;
        this.town.totalExperience += 100;
    }
}

export default Game;