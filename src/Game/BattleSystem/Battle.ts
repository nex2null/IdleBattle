import BattleStateEnum from './Enums/BattleStateEnum';
import BattleCharacter from './BattleCharacter';
import BattleLog from './BattleLog';
import Dungeon from './Dungeon/Dungeon';

class Battle {

  // Properties
  playerCharacters: Array<BattleCharacter>;
  allCharactersInCurrentLevel: Array<BattleCharacter> = [];
  dungeon: Dungeon;
  battleLog: BattleLog;
  currentState: BattleStateEnum;

  // Constructor
  constructor(
    playerCharacters: Array<BattleCharacter>,
    dungeon: Dungeon,
    battleLog: BattleLog
  ) {
    this.playerCharacters = playerCharacters;
    this.dungeon = dungeon;
    this.battleLog = battleLog;
    this.currentState = BattleStateEnum.BattleBegin;
    this.updateCharactersInCurrentLevel();
  }

  // Process the battle
  public processBattle() {

    // Make sure we are in the battle state
    if (this.currentState !== BattleStateEnum.InBattle)
      return;

    // Find ready characters, and if none are ready then update charges
    var readyCharacters = this.allCharactersInCurrentLevel.filter(x => x.isReadyToAct());
    if (!readyCharacters.length) {
      this.updateAllCharges();
      return;
    }

    // Grab the character with the most charge and let them act
    var readyCharacter = readyCharacters.sort((a, b) => b.currentCharge - a.currentCharge)[0];
    readyCharacter.act(this.allCharactersInCurrentLevel, this.battleLog);

    // Determine the next battle state post-action
    this.currentState = this.determineStateAfterAction();
  }

  // Gets all the characters in the current dungeon level
  private updateCharactersInCurrentLevel(): void {
    this.allCharactersInCurrentLevel = this.playerCharacters.concat(this.dungeon.currentLevel.enemies);
  }

  // Update all the charges of the characters
  private updateAllCharges(): void {
    this.allCharactersInCurrentLevel.forEach(x => x.updateCharge());
  }

  // Determine if the battle is over
  private determineStateAfterAction(): BattleStateEnum {

    // If all the player characters are dead, then the battle is lost
    if (this.playerCharacters.find(x => x.isAlive()) == null) {
      this.battleLog.addMessage('The party is defeated...');
      return BattleStateEnum.BattleLost;
    }

    // If we have cleared the dungeon then we have won
    if (this.dungeon.isCleared()) {
      this.battleLog.addMessage('The dungeon has been cleared!');
      return BattleStateEnum.BattleWon;
    }

    // If we can advance to the next level then check for advancement
    if (this.dungeon.canAdvanceToNextLevel()) {
      this.battleLog.addMessage('The dungeon level has been cleared');
      return BattleStateEnum.LevelCleared;
    }

    // We are still fighting on the current level
    return BattleStateEnum.InBattle;
  }

  // Determine if the battle is won
  public isBattleWon(): boolean {
    return this.currentState === BattleStateEnum.BattleWon;
  }

  // Determine if the battle is lost
  public isBattleLost(): boolean {
    return this.currentState === BattleStateEnum.BattleLost;
  }

  // Determine if we are waiting for the user to advance
  public isWaitingOnUserAdvancement(): boolean {
    return this.currentState === BattleStateEnum.LevelCleared;
  }

  // Advance to the next level
  public advanceLevel(): void {

    // Verify we can advance
    if (this.currentState !== BattleStateEnum.LevelCleared)
      return;

    // Advance to the next level
    this.dungeon.advanceToNextLevel();
    this.updateCharactersInCurrentLevel();

    // Return to battle
    this.currentState = BattleStateEnum.InBattle;
  }
}

export default Battle;