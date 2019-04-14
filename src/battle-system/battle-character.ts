import GambitTypeEnum from './enums/gambit-type-enum';
import BattleCharacterTypeEnum from './enums/battle-character-type-enum';
import BaseEffect from './battle-effects/base-effect';
import GambitAction from './gambits/gambit-action';
import BattleLog from './battle-log';
import BattleDamage from './battle-damage';

export default class BattleCharacter {

    // Properties
    name: string;
    level: number;
    hp: number;
    mp: number;
    str: number;
    int: number;
    spd: number;
    currentCharge: number;
    characterType: BattleCharacterTypeEnum;
    hostileToCharacterType: BattleCharacterTypeEnum;
    effects: Array<BaseEffect> = [];
    gambits: Array<GambitAction> = [];

    // Constructor
    constructor(args: any) {

        this.name = args.name;
        this.level = args.level;
        this.hp = args.hp;
        this.mp = args.mp;
        this.str = args.str;
        this.int = args.int;
        this.spd = args.spd;
        this.characterType = args.characterType;
        this.hostileToCharacterType = args.hostileToCharacterType;

        this.effects = args.effects || [];
        this.currentCharge = args.currentCharge || 0;
        this.gambits = args.gambits || [];
    }

    // Updates the charge level of the character
    updateCharge() {
        if (!this.isAlive())
            return;

        this.currentCharge += this.spd;
        this.currentCharge = this.currentCharge > 100 ? 100 : this.currentCharge;
    }

    // Determines if the character is ready to act
    isReadyToAct() {
        return this.isAlive() && this.currentCharge >= 100;
    }

    // Determines if the character is alive
    isAlive() {
        return this.hp > 0;
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
        this.hp -= damage.amount;

        // Don't allow hp to become negative
        this.hp = this.hp < 0 ? 0 : this.hp;

        // Allow effects to process damage taken
        this.effects.forEach(x => x.afterDamageTaken(damage));
    }

    beforeActionPerformed() {

        // Allow effects to trigger before an action has been performed
        this.effects.forEach(x => x.beforeActionPerformed());
    }

    actionPerformed() {

        this.currentCharge = 0;

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