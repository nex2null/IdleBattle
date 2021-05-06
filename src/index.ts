#!/usr/bin/env node

// Imports
import Game from "./Game/Game";
import ItemRarityEnum from "./Game/Itemization/Enums/ItemRarityEnum";
import ItemSuperTypeEnum from "./Game/Itemization/Enums/ItemSuperTypeEnum";
import ItemTypeEnum from "./Game/Itemization/Enums/ItemTypeEnum";
import EquipmentForge from "./Game/Itemization/Equipment/EquipmentForge";
import Item from "./Game/Itemization/Item";
import ScreenManager from "./UI/ScreenManager";
import TownScreen from "./UI/Screens/TownScreen";

// Generate 10 rare equipments and add them to the inventory
for (var i = 0; i < 50; i++) {
  var item = EquipmentForge.createEquipment(
    i % 3 == 0 ? ItemTypeEnum.FrayedClothRobe : ItemTypeEnum.RustedChainmail,
    i % 2 == 0 ? ItemRarityEnum.Magic : ItemRarityEnum.Rare,
    1);

  Game.getInstance().town.inventory.addItem(item);
}

// Generate 10 orbs of pandemonium and add them to the inventory
Game.getInstance().town.inventory.addItem(new Item(ItemTypeEnum.OrbOfPandemonium, ItemSuperTypeEnum.Currency, ItemRarityEnum.Normal, 1, 10));

// Initialize the screen manager
var screenManager = ScreenManager.getInstance();

// Load the town screen
screenManager.loadScreen(new TownScreen());