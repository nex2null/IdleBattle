<template>
    <div id="town-details">
        <div>
            <strong>Experience: {{game.town.totalExperience}}</strong>
        </div>
        <div>
            <strong>Gold: {{game.town.totalGold}}</strong>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Game from "../Game/Game";

@Component({})
export default class TownComponent extends Vue {
    game: Game;

    constructor() {
        super();
        this.game = Game.getInstance();
    }
}
</script>

<style>
</style>
