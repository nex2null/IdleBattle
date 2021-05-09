#!/usr/bin/env node

// Imports
import Game from "./Game/Game";
import ItemRarityEnum from "./Game/Itemization/Enums/ItemRarityEnum";
import ItemSuperTypeEnum from "./Game/Itemization/Enums/ItemSuperTypeEnum";
import ItemTypeEnum from "./Game/Itemization/Enums/ItemTypeEnum";
import { EquipmentForge } from "./Game/Itemization/Equipment/EquipmentForge";
import Item from "./Game/Itemization/Item";
import ScreenManager from "./UI/ScreenManager";
import TownScreen from "./UI/Screens/TownScreen";

// Give the town 100k gold to play with
Game.getInstance().town.totalGold = 100000;

// Give the town some spider fangs
Game.getInstance().town.inventory.addItem(new Item(ItemTypeEnum.SpiderFang, ItemSuperTypeEnum.Material, ItemRarityEnum.Normal, 1, 100));

// Generate 10 rare equipments and add them to the inventory
for (var i = 0; i < 10; i++) {
  var item = EquipmentForge.createEquipment(
    ItemTypeEnum.SpiderSilkRobe,
    i % 2 == 0 ? ItemRarityEnum.Magic : ItemRarityEnum.Rare,
    1);

  Game.getInstance().town.inventory.addItem(item);
}

// Initialize the screen manager
var screenManager = ScreenManager.getInstance();

// Load the town screen
screenManager.loadScreen(new TownScreen());