<template>
    <div id="inventory-details">
        <ul>
            <li
                v-for="(item, index) in game.town.inventory.items"
                :key="`item-${index}`"
            >{{item.type}} x{{item.amount}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Game from "../Game/Game";

@Component({})
export default class InventoryComponent extends Vue {
    game: Game;

    constructor() {
        super();
        this.game = Game.getInstance();
    }
}
</script>

<style>
</style>