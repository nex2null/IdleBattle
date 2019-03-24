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
            await this.sleep(10);

            // Update all charges
            this.updateAllCharges();

            // Grab the next character to act
            var readyCharacter = this.characters.find(x => x.isReadyToAct());

            // If no character was found then continue
            if (!readyCharacter)
                continue;

            // Do any pre-action work that needs to happen on the character
            readyCharacter.beforeActionPerformed();

            // Check that the character is still ready to act
            if (!readyCharacter.isReadyToAct())
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