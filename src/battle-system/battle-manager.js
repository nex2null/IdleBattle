import BattleCharacterType from './battle-character-type';
import BattleStates from './battle-states';

export default class battleManager {

    constructor(characters, battleLog) {
        this.currentState = BattleStates.BattleBegin;
        this.characters = characters;
        this.battleLog = battleLog;
    }

    async startBattle() {
        while (this.currentState != BattleStates.BattleOver) {

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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateAllCharges() {
        this.characters.forEach(x => x.updateCharge());
    }

    determineBattleOver() {
        var playerCharacters = this.characters.filter(x => x.characterType == BattleCharacterType.PlayerParty);
        var enemyCharacters = this.characters.filter(x => x.characterType == BattleCharacterType.EnemyParty);

        if (!playerCharacters.find(x => x.isAlive()) || !enemyCharacters.find(x => x.isAlive()))
            this.currentState = BattleStates.BattleOver;
    }
}