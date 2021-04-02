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

    <div>
      Quantity: {{ selectedItem ? selectedItem.amount : "" }}
    </div>

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

      <div style="margin-top: 20px;">
        <strong>Character: </strong>
        <select @change="selectCharacter($event)">
          <option value="">Select a character...</option>
          <option
            v-for="(character, index) in game.town.playerCharacters"
            :key="index"
            :value="index"
            :selected="isCharacterSelected(character)"
          >
            {{ character.name }}
          </option>
        </select>
      </div>

      <div v-if="selectedCharacter" style="margin-top: 10px;">
        <button v-on:click="equipItem()">Equip</button>
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
import PlayerCharacter from "@/Game/PlayerCharacter";
import Equipper from "@/Game/Itemization/Equipment/Equipper";
import PlayerCharacterEquipmentSlotEnum from "@/Game/Enums/PlayerCharacterEquipmentSlotEnum";
import Equipment from "@/Game/Itemization/Equipment/Equipment";
import EquipmentSlotEnum from "@/Game/Itemization/Enums/EquipmentSlotEnum";

@Component({})
export default class InventoryComponent extends Vue {
  game: Game;
  selectedItem: Item | null;
  selectedCharacter: PlayerCharacter | null;
  isEquipment: boolean;
  characters: Array<PlayerCharacter>;

  constructor() {
    super();
    this.game = Game.getInstance();
    this.selectedItem = null;
    this.selectedCharacter = null;
    this.isEquipment = false;
    this.characters = this.game.town.playerCharacters;
  }

  isItemSelected(item: Item | null) {
    return this.selectedItem == item;
  }

  isCharacterSelected(character: PlayerCharacter | null) {
    return this.selectedCharacter == character;
  }

  selectItem(event: any) {
    if (!event.target.value || event.target.value >= this.game.town.inventory.items.length) {
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

  selectCharacter(event: any) {
    if (!event.target.value || event.target.value >= this.game.town.playerCharacters.length) {
      this.selectedCharacter = null;
      return;
    }

    this.selectedCharacter = this.game.town.playerCharacters[event.target.value];
  }

  equipItem() {

    // Sanity check
    if (this.selectedItem == null || this.selectedCharacter == null || !this.isEquipment)
      return;

    // Determine slot
    var equipment: any = this.selectedItem;
    var slot: PlayerCharacterEquipmentSlotEnum;
    if (equipment.slot == EquipmentSlotEnum.ChestPiece)
      slot = PlayerCharacterEquipmentSlotEnum.ChestPiece;
    else if (equipment.slot == EquipmentSlotEnum.Boots)
      slot = PlayerCharacterEquipmentSlotEnum.Boots;
    else if (equipment.slot == EquipmentSlotEnum.TwoHanded)
      slot = PlayerCharacterEquipmentSlotEnum.BothHands;
    else if (equipment.slot == EquipmentSlotEnum.MainHand)
      slot = PlayerCharacterEquipmentSlotEnum.MainHand;
    else if (equipment.slot == EquipmentSlotEnum.OffHand)
      slot = PlayerCharacterEquipmentSlotEnum.OffHand;
    else if (equipment.slot == EquipmentSlotEnum.OneHanded)
      slot = PlayerCharacterEquipmentSlotEnum.MainHand;
    else
      return;

    // Equip the item
    var equipper = new Equipper();
    equipper.equipItem(equipment, this.selectedCharacter, slot);

    // Select no item
    this.isEquipment = false;
    this.selectedItem = null;
  }
}
</script>

<style>
</style>