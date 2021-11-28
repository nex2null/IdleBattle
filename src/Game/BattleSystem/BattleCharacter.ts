import GambitTypeEnum from './Enums/GambitTypeEnum';
import BattleCharacterTypeEnum from './Enums/BattleCharacterTypeEnum';
import BaseEffect from './BattleEffects/BaseEffect';
import GambitAction from './Gambits/GambitAction';
import BattleLog from './BattleLog';
import BattleDamage from './BattleDamage';
import { LootGenerationOption } from '../Itemization/LootGenerator';
import Stats from '../Stats';

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
  gambits: Array<GambitAction>;
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
    gambits: Array<GambitAction>,
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

    this.currentCharge += this.currentStats.speed;
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
  act(characters: Array<BattleCharacter>, battleLog: BattleLog) {

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

    // If this is a skill action then use the skill
    if (gambitAction.type === GambitTypeEnum.Skill) {
      gambitAction.action.use(this, gambitAction.targets, battleLog);
    }

    // Set that an action was performed
    this.actionPerformed();
  }

  applyDamage(damage: BattleDamage) {

    // Allow effects to modify damage before processing
    this.effects.forEach(x => x.beforeDamageTaken(damage));

    // Round the damage
    damage.amount = Math.round(damage.amount);

    // Take the damage
    this.currentStats.hp -= damage.amount;

    // Don't allow hp to become negative
    this.currentStats.hp = this.currentStats.hp < 0 ? 0 : this.currentStats.hp;

    // Allow effects to process damage taken
    this.effects.forEach(x => x.afterDamageTaken(damage));

    // If the character has died, set charge to 0
    if (!this.isAlive())
      this.currentCharge = 0;
  }

  beforeActionPerformed() {

    // Allow effects to trigger before an action has been performed
    this.effects.forEach(x => x.beforeActionPerformed());
  }

  actionPerformed() {

    this.currentCharge -= REQUIRED_CHARGE_TO_ACT;

    // Allow effects to trigger after an action has been performed
    this.effects.forEach(x => x.afterActionPerformed());
  }

  addEffect(effect: BaseEffect) {

    // Make sure we can add the effect
    if (!effect.canApply())
      return;

    // Apply the effect
    effect.onApply();
    this.effects.push(effect);
  }

  removeEffect(effect: BaseEffect) {
    effect.onRemove();
    this.effects = this.effects.filter(x => x !== effect);
  }

  getEffect(name: string) {
    return this.effects.find(x => x.name === name);
  }
}