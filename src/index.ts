#!/usr/bin/env node

// Imports
import Game from "./Game/Game";
import ItemRarityEnum from "./Game/Itemization/Enums/ItemRarityEnum";
import ItemTypeEnum from "./Game/Itemization/Enums/ItemTypeEnum";
import EquipmentForge from "./Game/Itemization/Equipment/EquipmentForge";
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

// Initialize the screen manager
var screenManager = ScreenManager.getInstance();

// Load the town screen
screenManager.loadScreen(new TownScreen());