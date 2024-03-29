// Imports
const blessed = require('blessed');
const contrib = require('blessed-contrib');
import Battle from "../../Game/BattleSystem/Battle";
import BattleCharacter from "../../Game/BattleSystem/BattleCharacter";
import DamageTracker from "../../Game/BattleSystem/DamageTracker";
import BattleSpeedEnum from "../../Game/BattleSystem/Enums/BattleSpeedEnum";
import BattleStateEnum from "../../Game/BattleSystem/Enums/BattleStateEnum";
import Game from "../../Game/Game";
import GameOptions from "../../Game/GameOptions";
import UIHelpers from "../Helpers/UIHelpers";
import ScreenManager from "../ScreenManager";
import IScreen from "./IScreen";
import TownScreen from "./TownScreen";
import { getAsciiString } from "../Helpers/AsciiHelper";
import BattleDamageFeedbackEnum from "../../Game/BattleSystem/Enums/BattleDamageFeedbackEnum";
import DungeonEnum from "../../Game/BattleSystem/Dungeon/DungeonEnum";
import DungeonFactory from "../../Game/BattleSystem/Dungeon/DungeonFactory";

class BattleScreen implements IScreen {

  // Properties
  screen: any;
  dungeonEnum: DungeonEnum;
  battle: Battle;
  gameOptions: GameOptions;
  screenElements: any;
  messageCount: number = 0;
  autoRetry: boolean = false;

  // Constructor
  constructor(dungeonEnum: DungeonEnum) {
    this.screen = null;
    this.dungeonEnum = dungeonEnum;
    this.battle = this.startBattle();
    this.screenElements = {};
    this.gameOptions = Game.getInstance().options;
  }

  //
  // Initializes the screen
  //
  public initializeScreen(screen: any) {

    // Save the screen
    this.screen = screen;

    // Create a continue prompt
    this.screenElements.continuePrompt = contrib.question({
      parent: this.screen,
      border: 'line',
      height: 'shrink',
      width: 'half',
      top: 'center',
      left: 'center',
      okayText: 'Continue',
      cancelText: 'Escape'
    });

    // Render screen elements
    this.renderLog();
    this.renderBattleCharacters();
    this.renderBattleOptions();
    this.updateBattleOptions();

    // Render the screen
    this.screen.render();

    // Start the battle loop
    this.startBattleLoop();
  }

  //
  // Starts the battle processing loop
  //
  private async startBattleLoop() {

    // Grab the level
    var currentLevel = this.battle.dungeon.currentLevelNumber;

    // Loop while we're battling
    while (this.battle.currentState === BattleStateEnum.InBattle) {

      // Process the battle after a small delay
      await UIHelpers.delay(this.gameOptions.battleSpeed);
      await this.processBattle();

      // If the level has changed when we are finished processing then break
      if (this.battle.dungeon.currentLevelNumber != currentLevel)
        break;
    }
  }

  //
  // Uninitializes the screen
  //
  public uninitializeScreen() {
  }

  //
  // Starts a battle
  //
  private startBattle(): Battle {

    // Grab the selected dungeon
    var dungeon = DungeonFactory.getDungeon(this.dungeonEnum);

    // Initialize a new battle
    return Game.getInstance().startBattle(dungeon);
  }

  //
  // Processes the battle
  //
  private async processBattle() {

    if (this.battle.isBattleWon() || this.battle.isBattleLost())
      return;

    if (this.battle.currentState === BattleStateEnum.InBattle) {

      // Process battle and update characters
      var damageTracker = this.battle.processBattle();
      this.updateBattleCharacters();

      // Show animations
      if (this.gameOptions.battleDamageFeedback == BattleDamageFeedbackEnum.Damage)
        await this.processDamageTextAnimation(damageTracker);
      else if (this.gameOptions.battleDamageFeedback == BattleDamageFeedbackEnum.Flash)
        await this.processDamageFlashAnimation(damageTracker);
    }

    if (this.battle.currentState === BattleStateEnum.LevelCleared) {

      // If we are not auto advancing then prompt
      // otherwise just advance the level
      if (!this.gameOptions.autoAdvanceBattles) {
        this.screenElements.continuePrompt.ask('Level Cleared! Continue?', (err: any, data: any) => {
          if (err) throw err;
          if (!data) this.leaveBattle();
          if (data) this.advanceLevel();
        });
      } else {
        this.advanceLevel();
      }
    }

    if (this.battle.isBattleWon() || this.battle.isBattleLost()) {
      if (this.autoRetry) {
        this.restartBattle();
      } else {
        this.logMessage("{red-fg}---- PRESS 'ESCAPE' TO EXIT ----{/red-fg}");
        this.screenElements.logBox.key(['escape'], () => {
          this.leaveBattle();
        });
      }
    }

    this.screen.render();
  }

  //
  // Processes damage flash animation
  //
  async processDamageFlashAnimation(damageTracker?: DamageTracker) {

    // Sanity check damage tracker
    if (!damageTracker || !damageTracker.hasDamage()) return;

    var hpGauges: Array<any> = [];

    // Process each character that was dealt damage
    Object.keys(damageTracker.damageTaken).forEach(uid => {

      // Grab the element for the uid
      var characterElements = this.screenElements.playerCharacters[uid] ||
        this.screenElements.enemyCharacters[uid];

      // Sanity check character elements
      if (!characterElements) return;

      // Set the name box background to red
      hpGauges.push(characterElements.hpGauge);
    })

    // Set name boxes to red, sleep, then return to normal
    hpGauges.forEach(x => x.style.border.fg = 'red');
    this.screen.render();
    await UIHelpers.delay(350);
    hpGauges.forEach(x => x.style.border.fg = 'cyan');
    this.screen.render();
  }

  //
  // Processes damage text animation
  //
  async processDamageTextAnimation(damageTracker?: DamageTracker) {

    // Sanity check damage tracker
    if (!damageTracker || !damageTracker.hasDamage()) return;

    var damageTexts: Array<any> = [];

    // Process each character that was dealt damage
    Object.keys(damageTracker.damageTaken).forEach(uid => {

      // Grab the element for the uid
      var isPlayer = true;
      var characterElements = this.screenElements.playerCharacters[uid];
      if (!characterElements) {
        characterElements = this.screenElements.enemyCharacters[uid];
        isPlayer = false;
      }

      // Sanity check character elements
      if (!characterElements) return;

      // Add damage text to hp gauage
      var damageTaken = damageTracker.damageTaken[uid];
      var text = blessed.text({
        parent: isPlayer ? this.screenElements.playersBox : this.screenElements.enemiesBox,
        top: characterElements.hpGauge.atop - 2,
        left: 'center',
        width: damageTaken.toString().length * 4 + 5,
        height: 3,
        content: `${getAsciiString(damageTaken, 3)}`,
        tags: true,
        style: { bold: true, fg: 'red' }
      });

      // Keep track of damage text added
      damageTexts.push(text);
    });

    // Flicker magic
    for (var i = 0; i < 6; i++) {
      damageTexts.forEach(x => x.style.fg = x.style.fg == 'red' ? 'white' : 'red');
      this.screen.render();
      await UIHelpers.delay(150);
    }

    // Destroy the texts
    damageTexts.forEach(x => x.destroy());
    this.screen.render();
  }

  //
  // Advances the battle to the next level
  //
  private advanceLevel() {
    this.battle.advanceLevel();
    this.renderBattleCharacters();
    this.screen.render();
    this.startBattleLoop();
  }

  //
  // Renders the battle log
  //
  private renderLog() {

    // If we already have a log box, remove it before rendering
    if (this.screenElements.logBox)
      this.screen.remove(this.screenElements.logBox);

    // Initialize the log box
    this.screenElements.logBox = blessed.box({
      label: 'Log',
      top: 38,
      left: 0,
      width: 99,
      height: 14,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        border: {
          fg: '#f0f0f0'
        },
        focus: {
          border: {
            fg: 'blue'
          }
        }
      },
      tags: true,
      keys: true,
      scrollable: true,
      scrollbar: {
        style: {
          bg: 'yellow'
        }
      }
    });
    this.screen.append(this.screenElements.logBox);

    this.screenElements.logBox.focus();

    this.battle.battleLog.callback = (msg) => {
      this.logMessage(msg);
    }

    this.screenElements.logBox.key(['pageup'], () => {
      this.screenElements.logBox.scroll(-10);
      this.screen.render();
    });

    this.screenElements.logBox.key(['pagedown'], () => {
      this.screenElements.logBox.scroll(10);
      this.screen.render();
    });

    this.screenElements.logBox.key(['s'], () => this.toggleSpeed());
    this.screenElements.logBox.key(['a'], () => this.toggleAutoAdvance());
    this.screenElements.logBox.key(['d'], () => this.toggleDamageFeedback());
    this.screenElements.logBox.key(['r'], () => this.toggleAutoRetry());
  }

  //
  // Logs a message
  //
  private logMessage(message: string) {
    this.screenElements.logBox.insertBottom(`${++this.messageCount}: ${message}`);
    this.screenElements.logBox.setScrollPerc(100);
    this.screen.render();
  }

  //
  // Renders the battle options
  //
  private renderBattleOptions() {

    // Battle options box
    this.screenElements.battleOptionsBox = blessed.box({
      top: 0,
      left: 0,
      width: 100,
      height: 1,
      tags: true
    });

    // Append to screen
    this.screen.append(this.screenElements.battleOptionsBox);
  }

  //
  // Update the battle options
  //
  private updateBattleOptions() {

    var content = "";

    // Set battle speed
    content += `{green-fg}S{/}peed: ${BattleSpeedEnum[this.gameOptions.battleSpeed]}`;

    // Set auto advance
    content += `\t{green-fg}A{/}uto advance: ${this.gameOptions.autoAdvanceBattles}`;

    // Set feedback
    content += `\t{green-fg}D{/}mg feedback: ${this.gameOptions.battleDamageFeedback}`;

    // Set auto retry
    content += `\tAuto {green-fg}R{/}etry: ${this.autoRetry}`;

    // Set content
    this.screenElements.battleOptionsBox.setContent(content);
    this.screen.render();
  }

  //
  // Renders the battle characters
  //
  private renderBattleCharacters() {

    // If we already have screen elements, remove them before initializing
    if (this.screenElements.playersBox)
      this.screen.remove(this.screenElements.playersBox);
    if (this.screenElements.enemiesBox)
      this.screen.remove(this.screenElements.enemiesBox);

    // Create the box for the players
    this.screenElements.playersBox = blessed.box({
      top: 1,
      left: 0,
      width: 49,
      height: 36,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: '#f0f0f0'
        }
      }
    });

    // Render the player character ui elements
    this.screenElements.playerCharacters = {};
    this.battle.playerCharacters.forEach((character, index) => {
      var characterElements: any = {};
      this.screenElements.playerCharacters[character.uid] = characterElements;
      this.renderCharacterElements(characterElements, this.screenElements.playersBox, index * 5);
      this.screen.append(this.screenElements.playersBox);
    });

    // Create the box for the enemies
    this.screenElements.enemiesBox = blessed.box({
      top: 1,
      left: 50,
      width: 49,
      height: 36,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: '#f0f0f0'
        },
      }
    });

    // Render the enemy character ui elements
    this.screenElements.enemyCharacters = {};
    this.battle.dungeon.currentLevel.enemies.forEach((character, index) => {
      var characterElements: any = {};
      this.screenElements.enemyCharacters[character.uid] = characterElements;
      this.renderCharacterElements(characterElements, this.screenElements.enemiesBox, index * 5);
      this.screen.append(this.screenElements.enemiesBox);
    });

    // Update the UI
    this.updateBattleCharacters();
  }

  //
  // Renders the UI elements for a given character
  //
  private renderCharacterElements(characterElements: any, parent: any, topBase: number) {

    characterElements.playerNameBox = blessed.text({
      parent: parent,
      top: topBase,
      left: 0,
      content: '',
      tags: true
    });

    characterElements.chargeGauge = contrib.gauge({
      parent: parent,
      top: topBase + 1,
      left: 0,
      width: 15,
      height: 3,
      label: 'Charge',
      showLabel: false,
      stroke: 'green',
      border: { type: 'line', fg: 'cyan' }
    });

    characterElements.hpGauge = contrib.gauge({
      parent: parent,
      top: topBase + 1,
      left: 16,
      width: 15,
      height: 3,
      label: 'HP',
      showLabel: false,
      stroke: 'red',
      border: { type: 'line', fg: 'cyan' }
    });

    characterElements.mpGauge = contrib.gauge({
      parent: parent,
      top: topBase + 1,
      left: 32,
      width: 15,
      height: 3,
      label: 'MP',
      showLabel: false,
      stroke: 'blue',
      border: { type: 'line', fg: 'cyan' }
    });
  }

  //
  // Updates the battle characters after each turn
  //
  private updateBattleCharacters() {

    // Update player characters
    this.battle.playerCharacters.forEach((character) => {
      var characterElements = this.screenElements.playerCharacters[character.uid];
      this.updateCharacterElements(characterElements, character);
    });

    // Update enemy characters
    this.battle.dungeon.currentLevel.enemies.forEach((character) => {
      var characterElements: any = this.screenElements.enemyCharacters[character.uid];
      this.updateCharacterElements(characterElements, character);
    });
  }

  //
  // Updates the character elements
  //
  private updateCharacterElements(characterElements: any, character: BattleCharacter) {

    // If character has died, the name is gray
    var name = character.isAlive() ? character.name : `{gray-fg}${character.name}{/gray-fg}`;

    // Build up the list of effects
    var allEffects = character.effects.map(x => x.uiCode);
    var effectsString = allEffects.join(' ');

    // Update name
    characterElements.playerNameBox.setContent(`${name} ${effectsString}`);

    // Update gauge values
    characterElements.chargeGauge.setPercent(character.currentCharge / 250 * 100);
    characterElements.hpGauge.setPercent((character.currentStats.hp / character.currentStats.maxHp) * 100);
    characterElements.mpGauge.setPercent((character.currentStats.mp / character.currentStats.maxMp) * 100);

    // Update labels
    characterElements.chargeGauge.setLabel(`Charge: ${Math.round(character.currentCharge / 250 * 100)}%`);
    characterElements.hpGauge.setLabel(`HP: ${character.currentStats.hp}`);
    characterElements.mpGauge.setLabel(`MP: ${character.currentStats.mp}`);
  }

  //
  // Toggles the battle speed
  //
  private toggleSpeed() {

    // Set the new speed
    if (this.gameOptions.battleSpeed === BattleSpeedEnum.Slow)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Normal;
    else if (this.gameOptions.battleSpeed === BattleSpeedEnum.Normal)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Fast;
    else if (this.gameOptions.battleSpeed === BattleSpeedEnum.Fast)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Fastest;
    else if (this.gameOptions.battleSpeed === BattleSpeedEnum.Fastest)
      this.gameOptions.battleSpeed = BattleSpeedEnum.Slow;

    // Update the battle options
    this.updateBattleOptions();
  }

  //
  // Toggles auto advancing through the dungeon
  //
  private toggleAutoAdvance() {

    // Toggle auto advance
    this.gameOptions.autoAdvanceBattles = !this.gameOptions.autoAdvanceBattles;

    // Update battle options
    this.updateBattleOptions();
  }

  //
  // Toggles the damage feedback
  //
  private toggleDamageFeedback() {

    // Set the new option
    if (this.gameOptions.battleDamageFeedback == BattleDamageFeedbackEnum.None)
      this.gameOptions.battleDamageFeedback = BattleDamageFeedbackEnum.Flash;
    else if (this.gameOptions.battleDamageFeedback == BattleDamageFeedbackEnum.Flash)
      this.gameOptions.battleDamageFeedback = BattleDamageFeedbackEnum.Damage
    else if (this.gameOptions.battleDamageFeedback == BattleDamageFeedbackEnum.Damage)
      this.gameOptions.battleDamageFeedback = BattleDamageFeedbackEnum.None;

    // Update the battle options
    this.updateBattleOptions();
  }

  //
  // Toggle auto retry battle
  //
  private toggleAutoRetry() {

    // TODO: Force speed

    // Toggle auto retry
    this.autoRetry = !this.autoRetry;
    this.updateBattleOptions();
  }


  //
  // Leaves the battle
  //
  private leaveBattle() {
    Game.getInstance().leaveBattle();
    ScreenManager.getInstance().loadScreen(new TownScreen());
  }

  //
  // Restarts the battle
  //
  private restartBattle() {

    // Restart the battle
    Game.getInstance().leaveBattle();
    this.battle = this.startBattle();

    // Re-render screen elements
    this.renderLog();
    this.renderBattleCharacters();

    // Reset message count
    this.messageCount = 0;

    // Start the battle loop
    this.startBattleLoop();
  }
}

export default BattleScreen;