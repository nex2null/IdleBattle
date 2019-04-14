import BattleCharacter from '../BattleCharacter';

class DungeonLevel {

    // Properties
    enemies: Array<BattleCharacter>;

    // Constructor
    constructor(enemies: Array<BattleCharacter>) {
        this.enemies = enemies;
    }

    // Determine if the level is cleared
    public isCleared(): boolean {
        return this.enemies.find(x => x.isAlive()) == null;
    }
}

export default DungeonLevel;