import DungeonLevel from './DungeonLevel';

class Dungeon {

    // Properties
    levels: Array<DungeonLevel>;
    currentLevel: DungeonLevel;
    currentLevelNumber: number;

    // Constructor
    constructor(levels: Array<DungeonLevel>) {
        this.levels = levels;
        this.currentLevel = levels[0];
        this.currentLevelNumber = 1;
    }

    // Determine if the dungeon can be advanced to the next level
    public canAdvanceToNextLevel(): boolean {
        return this.currentLevel.isCleared() && this.levels.length > this.currentLevelNumber;
    }

    // Advance to the next level
    public advanceToNextLevel(): void {
        if (this.canAdvanceToNextLevel()) {
            this.currentLevelNumber++;
            this.currentLevel = this.levels[this.currentLevelNumber - 1];
        }
    }

    // Determine if the dungeon has been cleared
    public isCleared(): boolean {
        return this.levels[this.levels.length - 1].isCleared();
    }
}

export default Dungeon;