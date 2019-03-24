import GambitType from './gambits/gambit-type';

export default class BattleCharacter {

    constructor(args) {

        this.name = args.name;
        this.level = args.level;
        this.hp = args.hp;
        this.mp = args.mp;
        this.str = args.str;
        this.def = args.def;
        this.spd = args.spd;
        this.eva = args.eva;
        this.characterType = args.characterType;
        this.hostileToCharacterType = args.hostileToCharacterType;

        this.effects = args.effects || [];
        this.currentCharge = args.currentCharge || 0;
        this.gambits = args.gambits || [];
    }

    updateCharge() {
        if (!this.isAlive())
            return;

        this.currentCharge += this.spd;
        this.currentCharge = this.currentCharge > 100 ? 100 : this.currentCharge;
    }

    isReadyToAct() {
        return this.isAlive() && this.currentCharge >= 100;
    }

    isAlive() {
        return this.hp > 0;
    }

    act(characters, battleLog) {

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

        // If this is a skill action the perform the skill
        if (gambitAction.type === GambitType.Skill) {
            gambitAction.action.performSkill(this, gambitAction.targets, battleLog);
        }       

        // Set that an action was performed
        this.actionPerformed();
    }

    applyDamage(damage) {

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

    addEffect(effect) {
        effect.onApply();
        this.effects.push(effect);
    }

    removeEffect(effect) {
        effect.onRemove();
        this.effects = this.effects.filter(x => x !== effect);
    }
}