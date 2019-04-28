<template>
    <div id="app">
        <div id="town-details">
            <div>
                <strong>Experience: {{game.town.totalExperience}}</strong>
            </div>
            <div>
                <strong>Gold: {{game.town.totalGold}}</strong>
            </div>
            <ul>
                <li
                    v-for="(item, index) in game.town.inventory.items"
                    :key="`item-${index}`"
                >{{item.type}}</li>
            </ul>
        </div>
        <div id="battle-details">
            <BattleComponent></BattleComponent>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BattleComponent from "./VueComponents/BattleComponent.vue";
import Game from "./Game/Game";

@Component({
    components: {
        BattleComponent
    }
})
export default class App extends Vue {
    game: Game;

    constructor() {
        super();
        this.game = Game.getInstance();
    }
}
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
#battle-details {
    margin-top: 10px;
}
</style>
