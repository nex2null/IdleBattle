<template>
  <div id="app">
    <div v-for="(character, index) in playerCharacters" :key="`player-character-${index}`">
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
    <div v-for="(character, index) in enemyCharacters" :key="`enemy-character-${index}`">
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
    <ul id="example-1">
      <li v-for="(message, index) in battleLog.messages" :key="`message-${index}`">{{ message }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BattleManager from "./battle-system/battle-manager";
import BattleLog from "./battle-system/battle-log";
import Spider from "./battle-system/enemies/spider";
import Hero from "./battle-system/enemies/hero";
import BattleCharacterTypeEnum from "./battle-system/enums/battle-character-type-enum";

var battleLog = new BattleLog();
var characters = [
  new Spider("Spider 1"),
  new Spider("Spider 2"),
  new Spider("Spider 3"),
  new Hero("Hero")
];
var battleManager = new BattleManager(characters, battleLog);

battleManager.startBattle();

export default Vue.extend({
  name: "app",
  data() {
    return {
      battleLog,
      characters
    };
  },
  computed: {
    playerCharacters(): any {
      return this.characters.filter(
        x => x.characterType === BattleCharacterTypeEnum.PlayerParty
      );
    },
    enemyCharacters(): any {
      return this.characters.filter(
        x => x.characterType === BattleCharacterTypeEnum.EnemyParty
      );
    }
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
