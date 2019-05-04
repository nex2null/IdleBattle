<template>
    <div id="inventory-details"></div>
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
