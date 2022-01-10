import BattleCharacterTypeEnum from './Enums/BattleCharacterTypeEnum';
import BaseEffect from './BattleEffects/BaseEffect';
import Gambit from './Gambits/Gambit';
import BattleLog from './BattleLog';
import BattleDamage from './BattleDamage';
import { LootGenerationOption } from '../Itemization/LootGenerator';
import Stats from '../Stats';
import { Guid } from "guid-typescript";
import DamageTracker from './DamageTracker';
import BattleEffectEnum from './Enums/BattleEffectEnum';
import IEffect from './BattleEffects/IEffect';

const REQUIRED_CHARGE_TO_ACT = 250;

export default class BattleCharacter {

  // Properties
  name: string;
  level: number;
  currentCharge: number;
  baseStats: Stats;
  currentStats: Stats;
  characterType: BattleCharacterTypeEnum;
  hostileToCharacterType: BattleCharacterTypeEnum;
  effects: Array<BaseEffect>;
  gambits: Array<Gambit>;
  uid: string;

  // TODO: Refactor enemy specific things to enemy base class
  maxNumberOfItemsToDrop: number;
  lootGenerationOptions: Array<LootGenerationOption> = [];
  goldWorth: number;

  // Constructor
  constructor(args: {
    name: string,
    level: number,
    baseStats: Stats,
    characterType: BattleCharacterTypeEnum,
    hostileToCharacterType: BattleCharacterTypeEnum,
    gambits: Array<Gambit>,
    effects?: Array<BaseEffect>,
    maxNumberOfItemsToDrop?: number,
    lootGenerationOptions?: Array<LootGenerationOption>,
    goldWorth?: number
  }) {
    this.name = args.name;
    this.level = args.level;
    this.baseStats = args.baseStats;
    this.currentStats = { ...args.baseStats };
    this.characterType = args.characterType;
    this.hostileToCharacterType = args.hostileToCharacterType;
    this.currentCharge = 0;
    this.uid = Guid.create().toString();

    this.gambits = args.gambits;
    this.effects = args.effects || [];

    // TODO: Refactor enemy specific things to enemy base class
    this.maxNumberOfItemsToDrop = args.maxNumberOfItemsToDrop || 0;
    this.lootGenerationOptions = args.lootGenerationOptions || [];
    this.goldWorth = args.goldWorth || 0;
  }

  // Updates the charge level of the character
  updateCharge() {

    if (!this.isAlive())
      return;

    // Figure out how much charge to add
    var chargeToAdd = this.currentStats.speed;

    // Add the charge to current charge and process the 'tick'
    this.currentCharge += chargeToAdd;
    this.effects.forEach(x => x.processChargeTick(chargeToAdd));
  }

  // Determines if the character is ready to act
  isReadyToAct() {
    return this.isAlive() && this.currentCharge >= REQUIRED_CHARGE_TO_ACT;
  }

  // Determines if the character is alive
  isAlive() {
    return this.currentStats.hp > 0;
  }

  // Has the character perform an action
  act(characters: Array<BattleCharacter>, battleLog: BattleLog, damageTracker: DamageTracker) {

    // Do any pre-action work
    this.beforeActionPerformed();

    // If I am no longer ready to act after pre-action work then do nothing
    if (!this.isReadyToAct()) {
      this.actionPerformed();
      return;
    }

    // Grab the first valid gambit action
    var gambitAction;
    for (var i = 0; i < this.gambits.length; i++) {
      gambitAction = this.gambits[i].getAction(this, characters);
      if (gambitAction) break;
    }

    // If there is no gambit action then the user has nothing to do
    if (!gambitAction) {
      battleLog.addMessage(`${this.name} wanders around aimlessly`);
      this.actionPerformed();
      return;
    }

    // Use the gambit's skill
    gambitAction.skill.use(this, gambitAction.targets, battleLog, damageTracker);

    // Set that an action was performed
    this.actionPerformed();
  }

  // Deals damage to a target
  dealDamage(
    damage: BattleDamage,
    target: BattleCharacter,
    battleLog: BattleLog,
    damageTracker: DamageTracker) {

    // TODO: Stat-based damage things (non-effects)

    // The target takes the damage
    target.takeDamage(damage, battleLog, damageTracker);
  }

  // Inflict an effect on a target
  inflictEffect(
    effect: IEffect,
    target: BattleCharacter,
    battleLog: BattleLog) {

    // TODO: Anything that happens when an effect is inflicted

    // Apply the effect to the target
    target.applyEffect(effect, battleLog);
  }

  // Takes damage
  takeDamage(damage: BattleDamage, battleLog: BattleLog, damageTracker: DamageTracker) {

    // Allow effects to modify damage before processing
    this.effects.forEach(x => x.beforeDamageTaken(damage));

    // Round the damage
    damage.round();

    // Take the damage
    var totalDamage = damage.getTotalAmount();
    this.currentStats.hp -= totalDamage;
    damageTracker.setDamageTaken(this, totalDamage);

    // Log that we took the damage
    battleLog.addMessage(`${this.name} takes {red-fg}${totalDamage}{/red-fg} damage`);

    // Don't allow hp to become negative
    this.currentStats.hp = this.currentStats.hp < 0 ? 0 : this.currentStats.hp;

    // Allow effects to process damage taken
    this.effects.forEach(x => x.afterDamageTaken(damage));

    // If the character has died, set charge to 0 and log
    if (!this.isAlive()) {
      this.currentCharge = 0;
      battleLog.addMessage(`{red-bg}${this.name} has died{/red-bg}`);
    }
  }

  // Handle before an action is performed
  beforeActionPerformed() {

    // Allow effects to trigger before an action has been performed
    this.effects.forEach(x => x.beforeActionPerformed());
  }

  // Mark that a character performed an action
  actionPerformed() {

    this.currentCharge -= REQUIRED_CHARGE_TO_ACT;

    // Allow effects to trigger after an action has been performed
    this.effects.forEach(x => x.afterActionPerformed());
  }

  // Applies an effect to the character
  applyEffect(effect: IEffect, battleLog: BattleLog) {

    // Make sure we can add the effect
    if (!effect.canApply())
      return;

    // Apply the effect
    effect.onApply();

    // Log that the effect was applied
    var inflictedMessage = effect.getInflictedMessage(this.name);
    if (inflictedMessage)
      battleLog.addMessage(inflictedMessage);
  }

  // Removes an effect from the character
  removeEffect(effect: IEffect) {
    effect.onRemove();
    this.effects = this.effects.filter(x => x !== effect);
  }

  // Gets an effect on the character by type
  getEffect(type: BattleEffectEnum) {
    return this.effects.find(x => x.type === type);
  }

  // Determine if this character has enough mp to use an ability
  canSpendMp(mp: number): boolean {
    return this.currentStats.mp >= mp;
  }

  // Spend MP
  spendMp(mp: number) {
    this.currentStats.mp -= mp;
    if (this.currentStats.mp < 0) this.currentStats.mp = 0;
  }
}