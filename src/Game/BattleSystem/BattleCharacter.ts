import BattleCharacterTypeEnum from './Enums/BattleCharacterTypeEnum';
import Gambit from './Gambits/Gambit';
import BattleLog from './BattleLog';
import BattleDamage from './BattleDamage';
import { LootGenerationOption } from '../Itemization/LootGenerator';
import Stats from '../Stats';
import { Guid } from "guid-typescript";
import DamageTracker from './DamageTracker';
import BattleEffectEnum from './Enums/BattleEffectEnum';
import IEffect from './BattleEffects/IEffect';
import PlayerSkill from '../PlayerSkill';
import BattleStats from './BattleStats';

const REQUIRED_CHARGE_TO_ACT = 250;

export default class BattleCharacter {

  // Properties
  name: string;
  level: number;
  currentCharge: number;
  baseStats: Stats;
  currentStats: BattleStats;
  characterType: BattleCharacterTypeEnum;
  hostileToCharacterType: BattleCharacterTypeEnum;
  effects: Array<IEffect>;
  gambits: Array<Gambit>;
  uid: string;
  skills: Array<PlayerSkill>;

  // TODO: Refactor enemy specific things to enemy base class
  maxNumberOfItemsToDrop: number;
  lootGenerationOptions: Array<LootGenerationOption> = [];
  goldWorth: number;
  xpWorth: number;

  // Constructor
  constructor(args: {
    name: string,
    level: number,
    baseStats: Stats,
    characterType: BattleCharacterTypeEnum,
    hostileToCharacterType: BattleCharacterTypeEnum,
    gambits: Array<Gambit>,
    effects?: Array<IEffect>,
    skills: Array<PlayerSkill>,
    maxNumberOfItemsToDrop?: number,
    lootGenerationOptions?: Array<LootGenerationOption>,
    goldWorth?: number,
    xpWorth?: number
  }) {
    this.name = args.name;
    this.level = args.level;
    this.baseStats = args.baseStats;
    this.currentStats = new BattleStats(args.baseStats);
    this.characterType = args.characterType;
    this.hostileToCharacterType = args.hostileToCharacterType;
    this.currentCharge = 0;
    this.uid = Guid.create().toString();
    this.skills = args.skills;

    this.gambits = args.gambits;
    this.effects = args.effects || [];

    // TODO: Refactor enemy specific things to enemy base class
    this.maxNumberOfItemsToDrop = args.maxNumberOfItemsToDrop || 0;
    this.lootGenerationOptions = args.lootGenerationOptions || [];
    this.goldWorth = args.goldWorth || 0;
    this.xpWorth = args.xpWorth || 0;
  }

  // Updates the charge level of the character
  updateCharge() {

    // Make sure we're alive
    if (!this.isAlive())
      return;

    // Increase charge by the character's speed
    var increasedCharge = this.increaseCharge(this.currentStats.speed);

    // Process the charge 'tick'
    this.effects.forEach(x => x.processChargeTick(increasedCharge));
  }

  // Increase the charge level of the character by a certain amount
  increaseCharge(amount: number): number {

    // Determine if charge can be added
    var canAddCharge = this.effects.find(x => !x.canGainCharge()) == null;

    // Figure out how much charge to add
    var chargeToAdd = canAddCharge ? amount : 0;

    // Add the charge to current charge
    this.currentCharge += chargeToAdd;

    // Return the charge that was added
    return chargeToAdd;
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

    // Handle effects for before damage is dealt
    this.effects.forEach(x => x.beforeDamageDealt(damage, target));

    // The target takes the damage
    target.takeDamage(damage, this, battleLog, damageTracker);

    // Handle effects for after damage is dealt
    this.effects.forEach(x => x.afterDamageDealt(damage, target, battleLog));
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
  takeDamage(damage: BattleDamage, attacker: BattleCharacter, battleLog: BattleLog, damageTracker: DamageTracker) {

    // Allow effects to modify damage before processing
    this.effects.forEach(x => x.beforeDamageTaken(damage, attacker, battleLog));

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
    this.effects.forEach(x => x.afterDamageTaken(damage, attacker, battleLog));

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

  // Heals a character
  healCharacter(target: BattleCharacter, amount: number, battleLog: BattleLog) {

    // TODO: things

    // Heal the character
    target.receiveHeal(this, amount, battleLog);
  }

  // Receives a heal from a character
  receiveHeal(healer: BattleCharacter, amount: number, battleLog: BattleLog) {
    
    // TODO: effects

    // Increase current HP by the amount healed
    this.currentStats.hp += amount;
    if (this.currentStats.hp > this.currentStats.maxHp)
      this.currentStats.hp = this.currentStats.maxHp;

    // Log that we were healed
    battleLog.addMessage(`${this.name} is healed for {green-fg}${amount}{/green-fg} hp`);
  }
}