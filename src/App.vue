<template>
  <div id="app">
    <div v-for="(character, index) in playerCharacters" :key="`player-character-${index}`">
      <h1>{{character.name}}</h1>
      <div><strong>Charge: </strong>{{character.currentCharge}}</div>
      <div><strong>HP: </strong>{{character.hp}}</div>
    </div>
    <div v-for="(character, index) in enemyCharacters" :key="`enemy-character-${index}`">
      <h1>{{character.name}}</h1>
      <div><strong>Charge: </strong>{{character.currentCharge}}</div>
      <div><strong>HP: </strong>{{character.hp}}</div>
    </div>
    <ul id="example-1">
      <li v-for="(message, index) in battleLog.messages" :key="`message-${index}`">
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script>

import BattleCharacterType from './battle-system/battle-character-type';
import BattleManager from './battle-system/battle-manager';
import BattleLog from './battle-system/battle-log';
import Spider from './battle-system/enemies/spider';
import Hero from './battle-system/enemies/hero';

var battleLog = new BattleLog();
var characters = [
  new Spider('Spider 1'),
  new Spider('Spider 2'),
  new Spider('Spider 3'),
  new Hero('Hero')
];
var battleManager = new BattleManager(characters, battleLog);

battleManager.startBattle();

export default {
  name: 'app',
  data: function() {
    return {
      battleLog,
      characters
    }
  },
  computed: {
    playerCharacters: function() {
      return this.characters.filter(x => x.characterType === BattleCharacterType.PlayerParty);
    },
    enemyCharacters: function() {
      return this.characters.filter(x => x.characterType === BattleCharacterType.EnemyParty);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
