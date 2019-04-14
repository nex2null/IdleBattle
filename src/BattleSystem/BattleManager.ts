import BattleCharacterType from './Enums/BattleCharacterTypeEnum';
import BattleStateEnum from './Enums/BattleStateEnum';
import BattleCharacter from './BattleCharacter';
import BattleLog from './BattleLog';

class BattleManager {

    // Properties
    characters: Array<BattleCharacter>;
    currentState: BattleStateEnum;
    battleLog: BattleLog;

    // Constructor
    constructor(characters: Array<BattleCharacter>, battleLog: BattleLog) {
        this.currentState = BattleStateEnum.BattleBegin;
        this.characters = characters;
        this.battleLog = battleLog;
    }

    // Starts the battle
    async startBattle() {
        while (this.currentState != BattleStateEnum.BattleOver) {

            // Sleep for a bit
            await this.sleep(50);

            // Update all charges
            this.updateAllCharges();

            // Grab the next character to act and verify we can find one
            var readyCharacter = this.characters.find(x => x.isReadyToAct());
            if (!readyCharacter)
                continue;

            // Have the character act
            readyCharacter.act(this.characters, this.battleLog);

            // Determine if the battle is over
            this.determineBattleOver();
        }

        this.battleLog.addMessage('The battle has ended!');
    }

    // Sleep for a given number of milliseconds
    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Update all the charges of the characters
    updateAllCharges(): void {
        this.characters.forEach(x => x.updateCharge());
    }

    // Determine if the battle is over
    determineBattleOver(): void {
        var playerCharacters = this.characters.filter(x => x.characterType == BattleCharacterType.PlayerParty);
        var enemyCharacters = this.characters.filter(x => x.characterType == BattleCharacterType.EnemyParty);

        if (!playerCharacters.find(x => x.isAlive()) || !enemyCharacters.find(x => x.isAlive()))
            this.currentState = BattleStateEnum.BattleOver;
    }
}

export default BattleManager;