// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Game from "../../Game/Game";
import EquipmentAffixSlotEnum from "../../Game/Itemization/Enums/EquipmentAffixSlotEnum";
import ItemRarityEnum from "../../Game/Itemization/Enums/ItemRarityEnum";
import ItemSuperTypeEnum from "../../Game/Itemization/Enums/ItemSuperTypeEnum";
import Equipment from "../../Game/Itemization/Equipment/Equipment";
import { EquipmentForge, ForgeActionsEnum, ForgeCost } from "../../Game/Itemization/Equipment/EquipmentForge";
import { EquipmentInformation, itemInformations } from "../../Game/Itemization/ItemInformation";
import Town from "../../Game/Town";
import UIHelpers from "../Helpers/UIHelpers";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";

//
// The menu items a user can perform
//
enum ForgeMenuItemsEnum {
  CraftEquipment = 'Craft Equipment',
  LoadEquipment = 'Load Equipment',
  UnloadEquipment = 'Unload Equipment',
  ReRollAffixes = 'Re-roll Affixes',
  Exit = 'Exit'
}

//
// Map the menu items to forge actions
//
var menuItemsToForgeActions: Map<ForgeMenuItemsEnum, ForgeActionsEnum>
  = new Map<ForgeMenuItemsEnum, ForgeActionsEnum>([
    [ForgeMenuItemsEnum.CraftEquipment, ForgeActionsEnum.CraftEquipment],
    [ForgeMenuItemsEnum.ReRollAffixes, ForgeActionsEnum.ReRollAffixes]
  ]);

//
// The forge screen
//
class ForgeScreen implements IScreen {

  // Properties
  screen: any;
  screenElements: any = {};
  town: Town;
  displayedEquipment: Array<Equipment> = [];
  craftableEquipment: Array<EquipmentInformation> = [];

  // Constructor
  constructor() {
    this.screen = null;
    this.town = Game.getInstance().town;
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    this.screen = screen;

    // Forge menu
    this.screenElements.forgeMenu = blessed.list({
      top: 0,
      left: 0,
      width: 40,
      height: 40,
      border: {
        type: 'line'
      },
      label: 'Menu',
      style: {
        border: {
          fg: 'white'
        },
        selected: {
          bg: 'white',
          fg: 'black'
        }
      },
      keys: true
    });

    // Forge menu
    this.screenElements.forgeMenuDetails = blessed.box({
      top: 40,
      left: 0,
      width: 40,
      height: 10,
      border: {
        type: 'line'
      },
      label: 'Menu Details',
      tags: true
    });

    // Forge display
    this.screenElements.forgeDisplay = blessed.box({
      top: 0,
      left: 41,
      width: 70,
      height: 50,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    });

    // Loaded equipment display
    this.screenElements.loadedEquipmentDisplay = blessed.box({
      parent: this.screenElements.forgeDisplay,
      width: 68,
      height: 48,
      content: 'No Equipment Loaded',
      style: {
        fg: 'white',
        border: {
          fg: 'white'
        }
      }
    });

    // Equipment table
    this.screenElements.equipmentTable = contrib.table({
      parent: this.screenElements.forgeDisplay,
      keys: true,
      fg: 'white',
      selectedFg: 'white',
      selectedBg: 'blue',
      interactive: true,
      width: 68,
      height: 21,
      columnSpacing: 5, // in chars
      columnWidth: [15, 10, 25], // in chars
      hidden: true,
      scrollbar: {
        style: {
          bg: 'white'
        }
      }
    });

    // Equipment table details container
    this.screenElements.equipmentTableDetails = blessed.box({
      parent: this.screenElements.forgeDisplay,
      top: 21,
      left: 3,
      width: 62,
      height: 25,
      hidden: true,
      border: {
        type: 'line'
      },
      label: 'Equipment Details'
    });

    // Craftable equipment table
    this.screenElements.craftableEquipmentTable = contrib.table({
      parent: this.screenElements.forgeDisplay,
      keys: true,
      fg: 'white',
      selectedFg: 'white',
      selectedBg: 'blue',
      interactive: true,
      width: 68,
      height: 21,
      columnSpacing: 5, // in chars
      columnWidth: [15, 10, 25], // in chars
      hidden: true,
      scrollbar: {
        style: {
          bg: 'white'
        }
      }
    });

    // Crafting cost details
    this.screenElements.craftingCostDetails = blessed.box({
      parent: this.screenElements.forgeDisplay,
      top: 21,
      left: 3,
      width: 62,
      height: 25,
      hidden: true,
      border: {
        type: 'line'
      },
      label: 'Crafting Cost'
    });

    // Crafting cost table
    this.screenElements.craftingCostTable = contrib.table({
      parent: this.screenElements.craftingCostDetails,
      top: 1,
      keys: false,
      fg: 'white',
      interactive: false,
      width: 60,
      height: 20,
      columnSpacing: 5,
      columnWidth: [15, 10, 10]
    });

    // Message box
    this.screenElements.messageBox = blessed.message({
      parent: this.screenElements.craftingCostDetails,
      top: 'center',
      left: 'center',
      width: 'shrink',
      height: 'shrink',
      border: {
        type: 'line'
      },
      hidden: true
    })

    // Set key bindings
    this.screenElements.forgeMenu.key(['escape'], () => this.screenElements.forgeMenu.select(this.screenElements.forgeMenu.fuzzyFind('Exit')));
    this.screenElements.equipmentTable.rows.key(['escape'], () => this.hideEquipmentTable());
    this.screenElements.craftableEquipmentTable.rows.key(['escape'], () => this.hideCraftTable());

    // Set equipment table callbacks
    this.screenElements.equipmentTable.rows.on('select', (el: any, sel: any) => this.handleEquipmentSelected(el, sel));
    this.screenElements.equipmentTable.rows.on('select item', (el: any, sel: any) => this.handleEquipmentFocused(el, sel));

    // Set crafting table callbacks
    this.screenElements.craftableEquipmentTable.rows.on('select', (el: any, sel: any) => this.handleCraftingItemSelected(el, sel));
    this.screenElements.craftableEquipmentTable.rows.on('select item', (el: any, sel: any) => this.handleCraftingItemFocused(el, sel));

    // Append items to screen
    this.screen.append(this.screenElements.forgeMenu);
    this.screen.append(this.screenElements.forgeMenuDetails);
    this.screen.append(this.screenElements.forgeDisplay);

    // Set menu callbacks
    this.screenElements.forgeMenu.on('select', (el: any, idx: any) => this.processMenuSelection(el, idx));
    this.screenElements.forgeMenu.on('select item', (el: any, sel: any) => this.forgeMenuItemFocused(el, sel));

    // Set menu items
    this.setMenuItems();

    // Populate the craft table
    this.populateCraftTable();

    // Set focus to character name
    this.screenElements.forgeMenu.focus();

    // Render the equipment being forged
    this.renderEquipmentBeingForged();
  }

  //
  // Sets the menu items
  //
  private setMenuItems() {

    var items = [];

    // Determine if equipment is loaded
    var equipment = this.town.equipmentBeingForged;
    var equipmentIsLoaded = equipment != null;

    // If equipment is not loaded, allow crafting equipment
    if (!equipmentIsLoaded)
      items.push(ForgeMenuItemsEnum.CraftEquipment);

    // If equipment is not loaded, allow loading equipment
    if (!equipmentIsLoaded)
      items.push(ForgeMenuItemsEnum.LoadEquipment);

    // If equipment is loaded, allow unloading equipment
    if (equipmentIsLoaded)
      items.push(ForgeMenuItemsEnum.UnloadEquipment);

    // If equipment is loaded, and not normal, allow rerolling affixes
    if (equipmentIsLoaded && equipment?.rarity !== ItemRarityEnum.Normal)
      items.push(ForgeMenuItemsEnum.ReRollAffixes);

    // Always allow exiting
    items.push(ForgeMenuItemsEnum.Exit);

    // Set the menu items
    this.screenElements.forgeMenu.setItems(items);

    // Render
    this.screen.render();
  }

  //
  // Processes menu selections
  //
  private processMenuSelection(element: any, index: any) {

    var selectedText = element.getText();

    // Handle exit
    if (selectedText === ForgeMenuItemsEnum.Exit)
      this.exitScreen();

    // Handle craft equipment
    else if (selectedText === ForgeMenuItemsEnum.CraftEquipment)
      this.displayCraftTable();

    // Handle load equipment
    else if (selectedText === ForgeMenuItemsEnum.LoadEquipment)
      this.displayEquipmentTable();

    // Handle unload equipment
    else if (selectedText === ForgeMenuItemsEnum.UnloadEquipment)
      this.unloadEquipment();

    // Handle re-rolling affixes
    else if (selectedText === ForgeMenuItemsEnum.ReRollAffixes)
      this.rerollAffixes();

    // Trigger re-focus to update menu costs
    this.forgeMenuItemFocused(element, index);
  }

  //
  // Handle forge menu item focused
  //
  private forgeMenuItemFocused(element: any, index: any) {

    // Get selected item text
    var selectedText = element.getText();

    // Render the menu details
    this.renderMenuDetails(selectedText);
  }

  //
  // Render menu details
  //
  private renderMenuDetails(selectedText: string) {

    // Get details box
    var menuDetailsBox = this.screenElements.forgeMenuDetails;

    // Handle exit
    if (selectedText === ForgeMenuItemsEnum.Exit) {
      menuDetailsBox.setContent('Exit the Forge')
    }

    // Handle craft equipment
    else if (selectedText === ForgeMenuItemsEnum.CraftEquipment) {
      menuDetailsBox.setContent('Crafts a new equipment base');
    }

    // Handle load equipment
    else if (selectedText === ForgeMenuItemsEnum.LoadEquipment) {
      menuDetailsBox.setContent('Loads an equipment into the Forge')
    }

    // Handle unload equipment
    else if (selectedText === ForgeMenuItemsEnum.UnloadEquipment) {
      menuDetailsBox.setContent('Unloads an equipment from the Forge');
    }

    // Handle re-rolling affixes
    else if (selectedText === ForgeMenuItemsEnum.ReRollAffixes) {
      menuDetailsBox.setContent(`Re-rolls the loaded equipment's affixes\n\nCost:\n${this.getActionCostString(ForgeMenuItemsEnum.ReRollAffixes)}`)
    }

    this.screen.render();
  }

  //
  // Get the cost for an action as a string
  //
  private getActionCostString(menuItem: ForgeMenuItemsEnum) {

    // Grab loaded equipment and sanity check
    var equipmentBeingForged = this.town.equipmentBeingForged;
    if (!equipmentBeingForged)
      return 'Unknown';

    // Grab the forge action
    var forgeAction = menuItemsToForgeActions.get(menuItem);
    if (!forgeAction)
      return;

    // Grab cost and sanity check
    var forgeCost = EquipmentForge.getActionCost(equipmentBeingForged, forgeAction)
    if (!forgeCost)
      return 'Unknown';

    // Handle gold
    var costString = '';
    costString += `{yellow-fg}Gold: ${forgeCost.gold}{/yellow-fg} (have: {yellow-fg}${this.town.totalGold}{/})`;

    // Handle reagents
    forgeCost.reagents.forEach(x => costString += `\n${x.itemName}: ${x.amountRequired} (have: ${this.town.inventory.getItemCount(x.itemType)})`);

    // Return the cost string
    return costString;
  }

  //
  // Populates the craft table with craftable equipment
  //
  private populateCraftTable() {

    // Set the list of craftable equipment
    this.craftableEquipment = itemInformations
      .filter(x => x.itemSuperType === ItemSuperTypeEnum.Equipment)
      .map(x => x as EquipmentInformation)
      .filter(x => x.craftable);

    // Clear any existing rows in the table
    var tableItems = this.screenElements.craftableEquipmentTable.rows;
    if (tableItems) {
      tableItems.clearItems();
      tableItems._listInitialized = false;
    }

    // Set the tables data
    this.screenElements.craftableEquipmentTable.setData({
      headers: [' Slot', ' Req. Lvl', ' Name'],
      data: this.craftableEquipment.map(x => [x.slot, x.ilvl, x.itemName])
    });
  }

  //
  // Displays the craft table
  //
  private displayCraftTable() {

    // Hide the loaded equipment display
    // and show the craftable equipment table and crafting cost details
    this.screenElements.loadedEquipmentDisplay.hide();
    this.screenElements.craftableEquipmentTable.show();
    this.screenElements.craftingCostDetails.show();

    // Focus on the table
    this.screenElements.craftableEquipmentTable.focus();

    // Select the first element on the craft table
    this.screenElements.craftableEquipmentTable.rows.select(0);
    this.handleCraftingItemFocused(null, 0);

    // Render
    this.screen.render();
  }

  //
  // Hide the craft table
  //
  private hideCraftTable() {

    // Hide the craftable equipment table and crafting cost details
    // and show the loaded equipment display
    this.screenElements.craftableEquipmentTable.hide();
    this.screenElements.craftingCostDetails.hide();
    this.screenElements.loadedEquipmentDisplay.show();

    // Focus on the forge menu
    this.screenElements.forgeMenu.focus();

    // Render
    this.screen.render();
  }

  //
  // Handles crafting item being selected
  //
  private handleCraftingItemSelected(element: any, index: any) {

    // Grab equipment information and sanity check
    var equipmentInformation = this.craftableEquipment[index];
    if (!equipmentInformation)
      return;

    // Verify we can afford the costs
    var canAfford = true;
    equipmentInformation.craftingReagents.forEach(x => {
      var currentAmount = this.town.inventory.getItemCount(x.itemType);
      if (currentAmount < x.amountRequired) {
        canAfford = false;
        return false;
      }
    });

    // If we cannot afford the costs notify the user
    if (!canAfford) {
      this.screenElements.messageBox.display('{red-fg}Cannot afford crafting cost{/}', 0);
      this.screenElements.messageBox.setFront();
      this.screenElements.messageBox.focus();
      this.screen.render();
      return;
    }

    // Craft the equipment
    // TODO: Figure out what ilvl to set
    this.town.inventory.addItem(EquipmentForge.createEquipment(
      equipmentInformation.itemType,
      ItemRarityEnum.Normal,
      equipmentInformation.ilvl));

    // Decrement crafting materials
    equipmentInformation.craftingReagents.forEach(x => {
      this.town.inventory.removeItem(x.itemType, x.amountRequired);
    });

    // Trigger the crafting item focus to redraw crafting costs
    this.handleCraftingItemFocused(element, index);

    // Render
    this.screen.render();
  }

  //
  // Handles crafting item being focused
  //
  private handleCraftingItemFocused(element: any, index: any) {

    // Grab equipment information and sanity check
    var equipmentInformation = this.craftableEquipment[index];
    if (!equipmentInformation)
      return;

    // Get the crafting cost data
    var craftingCostData: any[] = [];
    equipmentInformation.craftingReagents.forEach(reagent => {
      craftingCostData.push([
        reagent.itemName,
        reagent.amountRequired,
        this.town.inventory.getItemCount(reagent.itemType)])
    });

    // Set the crafting cost data
    this.screenElements.craftingCostTable.setData({
      headers: [' Item', ' Need', ' Have'],
      data: craftingCostData
    });
  }

  //
  // Displays the equipment table
  //
  private displayEquipmentTable() {

    // Refresh equipment
    this.displayedEquipment = this
      .town
      .inventory
      .items
      .filter(x => x.superType === ItemSuperTypeEnum.Equipment)
      .map(x => x as Equipment);

    // Clear any existing rows in the table
    var tableItems = this.screenElements.equipmentTable.rows;
    if (tableItems) {
      tableItems.clearItems();
      tableItems._listInitialized = false;
    }

    // Set the tables data
    this.screenElements.equipmentTable.setData({
      headers: [' Slot', ' iLvl', ' Name'],
      data: this.displayedEquipment.map(x => [x.slot, x.ilvl, x.name])
    });

    // Hide the loaded equipment display, and show the equipment table and details
    this.screenElements.loadedEquipmentDisplay.hide();
    this.screenElements.equipmentTable.show();
    this.screenElements.equipmentTableDetails.show();

    // Select the top element on the table
    this.screenElements.equipmentTable.rows.select(0);

    // Focus on the table
    this.screenElements.equipmentTable.focus();

    // Render
    this.screen.render();
  }

  //
  // Hide equipment table
  //
  private hideEquipmentTable() {

    // Hide the equipment table and details, and show the loaded equipment display
    this.screenElements.equipmentTable.hide();
    this.screenElements.equipmentTableDetails.hide();
    this.screenElements.loadedEquipmentDisplay.show();

    // Focus on the forge menu
    this.screenElements.forgeMenu.focus();

    // Render
    this.screen.render();
  }

  //
  // Handles equipment being selected
  //
  private handleEquipmentSelected(element: any, index: any) {

    // Grab equipment and sanity check
    var equipment = this.displayedEquipment[index];
    if (!equipment)
      return;

    // Load the equipment
    this.loadEquipment(equipment);
  }

  //
  // Handles equipment being focused
  //
  private handleEquipmentFocused(element: any, index: any) {

    // Grab equipment and sanity check
    var equipment = this.displayedEquipment[index];
    if (!equipment)
      return;

    // Clear the equipment table details
    UIHelpers.clearBlessedElement(this.screenElements.equipmentTableDetails, true);

    // Display the equipment
    UIHelpers.renderEquipmentDetailsToBox(equipment, this.screenElements.equipmentTableDetails, 1);
  }

  //
  // Load equipment
  //
  private loadEquipment(equipment: Equipment) {

    // Unload any loaded equipment
    this.unloadEquipment();

    // Load the equipment in the town forge
    this.town.equipmentBeingForged = equipment;

    // Remove the equipment from the inventory
    this.town.inventory.removeEquipment(equipment);

    // Render the equipment and hide the equipment table
    this.renderEquipmentBeingForged();
    this.hideEquipmentTable();

    // Refresh menu items
    this.setMenuItems();
  }

  //
  // Unloads the currently loaded equipment
  //
  private unloadEquipment() {

    // Check that equipment is loaded
    var equipmentBeingForged = this.town.equipmentBeingForged;
    if (!equipmentBeingForged)
      return;

    // Clear the forge and add the equipment back to the inventory
    this.town.equipmentBeingForged = null;
    this.town.inventory.addItem(equipmentBeingForged);

    // Render the equipment
    this.renderEquipmentBeingForged();

    // Refresh menu items
    this.setMenuItems();
  }

  //
  // Re-rolls affixes on the loaded item
  //
  private rerollAffixes() {

    // Grab the loaded equipment
    var loadedEquipment = this.town.equipmentBeingForged;
    if (!loadedEquipment)
      return;

    // Make sure we have enough gold to pay the cost
    var cost = EquipmentForge.getActionCost(loadedEquipment, ForgeActionsEnum.ReRollAffixes);
    if (!cost || !EquipmentForge.canAffordForgeCost(cost))
      return;

    // Spend the cost
    EquipmentForge.spendForgeCost(cost);

    // Re-roll the equipment
    EquipmentForge.reRollEquipmentAffixes(loadedEquipment);

    // Render the forged equipment
    this.renderEquipmentBeingForged();
  }

  //
  // Render the equipment being forged
  //
  private renderEquipmentBeingForged() {

    // Box to render to
    var blessedBox = this.screenElements.loadedEquipmentDisplay;

    // Clear the box
    UIHelpers.clearBlessedElement(blessedBox);

    // Grab the equipment being forged
    var equipment = this.town.equipmentBeingForged;

    // If there is no equipment being forged then no need to process further
    if (!equipment) {
      blessedBox.setContent('No Equipment Loaded');
      this.screen.render();
      return;
    }

    // Start at the 0th line
    var currentLine = 0;

    // Name
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Name: ${equipment.name}`
    });

    // Type
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Type: ${equipment.type}`
    });

    // Slot
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Slot: ${equipment.slot}`
    });

    // Rarity
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Rarity: ${equipment.rarity}`
    });

    // iLvl
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `iLvl: ${equipment.ilvl}`
    });

    // Required level
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Required Lvl: ${equipment.requiredLevel}`
    });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      orientation: 'horizontal',
      width: blessedBox.width - 2
    });

    // Implicits label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Implicits:`
    });

    // Implicits
    equipment.implicits.forEach(implicit => {
      blessed.box({
        parent: blessedBox,
        top: currentLine++,
        height: 1,
        width: blessedBox.width - 2,
        content: `${implicit.stat} - ${implicit.value}`
      });
    });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      orientation: 'horizontal',
      width: blessedBox.width - 2
    });

    // Prefixes label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Prefixes:`
    });

    // Prefixes
    equipment
      .affixes
      .filter(x => x.slot === EquipmentAffixSlotEnum.Prefix).forEach(prefix => {
        blessed.box({
          parent: blessedBox,
          top: currentLine++,
          height: 1,
          width: blessedBox.width - 2,
          content: `${prefix.type} (${prefix.modifiedStat}) - ${prefix.value}`
        });
      });

    // Line
    blessed.line({
      parent: blessedBox,
      top: currentLine++,
      orientation: 'horizontal',
      width: blessedBox.width - 2
    });

    // Suffixes label
    blessed.box({
      parent: blessedBox,
      top: currentLine++,
      height: 1,
      width: blessedBox.width - 2,
      content: `Suffixes:`
    });

    // Suffixes
    equipment
      .affixes
      .filter(x => x.slot === EquipmentAffixSlotEnum.Suffix).forEach(suffix => {
        blessed.box({
          parent: blessedBox,
          top: currentLine++,
          height: 1,
          width: blessedBox.width - 2,
          content: `${suffix.type} (${suffix.modifiedStat}) - ${suffix.value}`
        });
      });

    // Render
    this.screen.render();
  }

  //
  // Exits the current screen
  //
  private exitScreen() {
    ScreenManager.getInstance().loadScreen(new TownScreen());
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
  }
}

export default ForgeScreen;


/* OLD CURRENCY ITEM CODE

// Orb of abolition
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfAbolition,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is not normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity == ItemRarityEnum.Normal)
            return false;

        // Reset the equipment back to normal
        EquipmentForge.resetEquipmentToNormal(targetEquipment);
        return true;
    })
);

// Orb of imbuing
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfImbuing,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Normal)
            return false;

        // Upgrade the equipment to magic
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Magic);
        return true;
    })
);

// Orb of conjury
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfImbuing,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Normal)
            return false;

        // Upgrade the equipment to rare
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Rare);
        return true;
    })
);

// Orb of conjury
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfImbuing,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is normal
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Normal)
            return false;

        // Upgrade the equipment to rare
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Rare);
        return true;
    })
);

// Orb of promotion
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPromotion,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is magic
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Magic)
            return false;

        // Upgrade the equipment to rare
        EquipmentForge.upgradeEquipmentToRarity(targetEquipment, ItemRarityEnum.Rare);
        return true;
    })
);

// Orb of mutation
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfMutation,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is magic
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Magic)
            return false;

        // Re-roll the equipment affixes
        EquipmentForge.reRollEquipmentAffixes(targetEquipment);
        return true;
    })
);

// Orb of pandemonium
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPandemonium,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        // Verify the equipment is rare
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Rare)
            return false;

        // Re-roll the equipment affixes
        EquipmentForge.reRollEquipmentAffixes(targetEquipment);
        return true;
    })
);

// Orb of thaumaturgy
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfThaumaturgy,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment is magic
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Magic)
            return false;

        // Get the existing equipment affix count
        var existingAffixCount = targetEquipment.affixes.length;

        // Attempt to add an affix to the equipment
        EquipmentForge.addRandomAffixToEquipment(targetEquipment);

        // If an affix was added then the item was successful, otherwise it was not
        return existingAffixCount < targetEquipment.affixes.length;
    })
);

// Orb of fortune
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfThaumaturgy,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment is rare
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.rarity != ItemRarityEnum.Rare)
            return false;

        // Get the existing equipment affix count
        var existingAffixCount = targetEquipment.affixes.length;

        // Attempt to add an affix to the equipment
        EquipmentForge.addRandomAffixToEquipment(targetEquipment);

        // If an affix was added then the item was successful, otherwise it was not
        return existingAffixCount < targetEquipment.affixes.length;
    })
);

// Orb of balance
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfBalance,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {
        var targetEquipment = <Equipment>targetItem;
        EquipmentForge.reRollEquipmentImplicitValues(targetEquipment);
        return true;
    })
);

// Orb of perfection
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPerfection,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment has affixes
        var targetEquipment = <Equipment>targetItem;
        if (!targetEquipment.affixes.length)
            return false;

        // Re-roll the affix values
        EquipmentForge.reRollEquipmentAffixValues(targetEquipment);
        return true;
    })
);

// Alpha orb
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPerfection,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment does not already have frozen prefixes
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.craftingTags.find(x => x == EquipmentCraftingTagEnum.PrefixesCannotBeChanged))
            return false;

        // Add the prefixes cannot be changed tag
        targetEquipment.craftingTags.push(EquipmentCraftingTagEnum.PrefixesCannotBeChanged);
        return true;
    })
);

// Omega orb
itemInformations.push(new CurrencyInformation(
    ItemTypeEnum.OrbOfPerfection,
    true,
    ItemSuperTypeEnum.Equipment,
    (targetItem: Item | null): boolean => {

        // Verify the equipment does not already have frozen suffixes
        var targetEquipment = <Equipment>targetItem;
        if (targetEquipment.craftingTags.find(x => x == EquipmentCraftingTagEnum.SuffixesCannotBeChanged))
            return false;

        // Add the suffixes cannot be changed tag
        targetEquipment.craftingTags.push(EquipmentCraftingTagEnum.SuffixesCannotBeChanged);
        return true;
    })
);

 */