<template>
  <div id="inventory-details">
    <select @change="selectItem($event)">
      <option value="">Select an item...</option>
      <option
        v-for="(item, index) in game.town.inventory.items"
        :key="index"
        :value="index"
        :selected="isItemSelected(item)"
      >
        {{ item.type }}
      </option>
    </select>
    <br />
    You selected: {{ selectedItem ? selectedItem.type : "" }}
    <br />
    Quantity:
    {{ selectedItem ? selectedItem.amount : "" }}
  </div>
</template>

<script lang="ts">
import Item from "@/Game/Itemization/Item";
import { Component, Vue } from "vue-property-decorator";
import Game from "../Game/Game";

@Component({})
export default class InventoryComponent extends Vue {
  game: Game;
  selectedItem: Item | null;

  constructor() {
    super();
    this.game = Game.getInstance();
    this.selectedItem = null;
  }

  isItemSelected(item: Item | null) {
    return this.selectedItem == item;
  }

  selectItem(event: any) {
    if (
      !event.target.value ||
      event.target.value >= this.game.town.inventory.items.length
    ) {
      this.selectedItem = null;
      return;
    }

    this.selectedItem = this.game.town.inventory.items[event.target.value];
  }
}
</script>

<style>
</style>