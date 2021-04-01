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
    <div v-if="isEquipment">
      <div><strong>Rarity:</strong> {{ selectedItem.rarity }}</div>
      <div>
        <strong>Implicits:</strong>
        <fieldset style="width: 300px; margin: auto;">
          <div
            v-for="(implicit, index) in selectedItem.implicits"
            :key="index"
            :value="index"
          >
            {{ implicit.stat }} : {{ implicit.value }}
          </div>
        </fieldset>
      </div>
      <div>
        <strong>Affixes:</strong>
        <fieldset style="width: 300px; margin: auto;">
          <div
            v-for="(affix, index) in selectedItem.affixes"
            :key="index"
            :value="index"
          >
            {{ affix.type }} : {{ affix.value }}
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Item from "@/Game/Itemization/Item";
import { itemInformations } from '@/Game/Itemization/ItemInformation';
import ItemSuperTypeEnum from '@/Game/Itemization/Enums/ItemSuperTypeEnum';
import { Component, Vue } from "vue-property-decorator";
import Game from "../Game/Game";

@Component({})
export default class InventoryComponent extends Vue {
  game: Game;
  selectedItem: Item | null;
  isEquipment: boolean;

  constructor() {
    super();
    this.game = Game.getInstance();
    this.selectedItem = null;
    this.isEquipment = false;
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

    var selectedItem = this.game.town.inventory.items[event.target.value];
    if (!selectedItem)
      return;
    
    this.selectedItem = selectedItem;
    var itemInformation = itemInformations.find(x => x.itemType == selectedItem.type);
    this.isEquipment = itemInformation != null && itemInformation.itemSuperType == ItemSuperTypeEnum.Equipment;
  }
}
</script>

<style>
</style>