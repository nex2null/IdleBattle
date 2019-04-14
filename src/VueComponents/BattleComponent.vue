<template>
    <div>
        <div v-if="currentBattle">
            <div class="character-windows">
                <div class="ui-window player-window">
                    <div
                        v-for="(character, index) in playerCharacters"
                        :key="`player-character-${index}`"
                    >
                        <h1>{{character.name}}</h1>
                        <div>
                            <strong>Charge:</strong>
                            {{character.currentCharge}}
                        </div>
                        <div>
                            <strong>HP:</strong>
                            {{character.hp}}
                        </div>
                    </div>
                </div>
                <div class="ui-window enemy-window">
                    <div
                        v-for="(character, index) in enemyCharacters"
                        :key="`enemy-character-${index}`"
                    >
                        <h1>{{character.name}}</h1>
                        <div>
                            <strong>Charge:</strong>
                            {{character.currentCharge}}
                        </div>
                        <div>
                            <strong>HP:</strong>
                            {{character.hp}}
                        </div>
                    </div>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="ui-window message-log">
                <ul id="battle-log">
                    <li
                        v-for="(message, index) in battleLog.messages"
                        :key="`message-${index}`"
                    >{{ message }}</li>
                </ul>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="ui-buttons">
            <div v-if="!currentBattle">
                <button @click="startBattle()">Start battle</button>
            </div>
            <div v-if="isWaitingOnAdvancement">
                <button @click="advanceLevel()">Advance Level</button>
            </div>
            <div v-if="isBattleWon || isBattleLost">
                <button @click="leaveBattle()">Leave Battle</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Battle from "../Game/BattleSystem/Battle";
import Game from "../Game/Game";
import BattleCharacter from "../Game/BattleSystem/BattleCharacter";
import BattleLog from "../Game/BattleSystem/BattleLog";

@Component
export default class BattleComponent extends Vue {
    game: Game;

    constructor() {
        super();
        this.game = Game.getInstance();
    }

    get currentBattle(): Battle | null {
        return this.game.currentBattle;
    }

    get isBattling(): boolean {
        return this.currentBattle != null;
    }

    get battleLog(): BattleLog {
        return this.currentBattle == null
            ? new BattleLog()
            : this.currentBattle.battleLog;
    }

    get playerCharacters(): Array<BattleCharacter> {
        return this.currentBattle == null
            ? []
            : this.currentBattle.playerCharacters;
    }

    get enemyCharacters(): Array<BattleCharacter> {
        return this.currentBattle == null
            ? []
            : this.currentBattle.dungeon.currentLevel.enemies;
    }

    get isBattleWon(): boolean {
        return this.currentBattle != null && this.currentBattle.isBattleWon();
    }

    get isBattleLost(): boolean {
        return this.currentBattle != null && this.currentBattle.isBattleLost();
    }

    get isWaitingOnAdvancement(): boolean {
        return (
            this.currentBattle != null &&
            this.currentBattle.isWaitingOnUserAdvancement()
        );
    }

    startBattle(): void {
        this.game.startBattle(1);
    }

    advanceLevel(): void {
        if (this.currentBattle) this.currentBattle.advanceLevel();
    }

    leaveBattle(): void {
        this.game.leaveBattle();
    }
}
</script>

<style>
.ui-window {
    float: left;
    padding: 20px 20px 20px 20px;
    border-radius: 20px;
    border: 2px solid black;
}

.character-windows {
    margin-left: auto;
    margin-right: auto;
}

.player-window {
    background-color: rgba(82, 179, 217, 0.5);
    width: 45%;
}

.enemy-window {
    background-color: rgba(236, 100, 75, 0.5);
    width: 45%;
}

.message-log {
    background-color: rgba(189, 195, 199, 0.5);
    width: 80%;
    margin: auto;
}

.ui-buttons {
    margin-top: 10px;
}
</style>
