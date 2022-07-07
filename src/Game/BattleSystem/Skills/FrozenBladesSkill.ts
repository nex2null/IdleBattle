import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import FrozenBladesEffect from '../BattleEffects/FrozenBladesEffect';
import SkillEnum from '../Enums/SkillEnum';

class FrozenBladesSkill implements ISkill {

  // Constants
  readonly frozenBladesTurns: number = 4;

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.FrozenBlades;
  targetType: TargetTypeEnum;
  readonly mpCost: number;
  readonly addedCold: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + ((this.level - 1) * 2);
    this.addedCold = .2 + .05 * slvl;
    this.name = 'Frozen Blades';
    this.targetType = TargetTypeEnum.Single;
  }

  // Get the skill description
  getDescription(): string {
    return `Enchants a target's weapon with frost, dealing additional cold damage with a chance to chill for all physical attacks.`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 6;
      case 1: return 10;
      case 2: return 14;
      case 3: return 18;
      case 4: return 22;
      case 5: return 26;
      case 6: return 30;
      case 7: return 34;
      case 8: return 38;
      case 9: return 42;
      default: return 1000;
    }
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog
  ) {

    // Only first target is ever relevant
    var target = targets[0];

    // Log
    battleLog.addMessage(`${character.name} uses frozen blades on ${target.name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Inflict frozen blades on the target
    // NOTE: Need to do turns + 1 because it will lose a turn immediately after we apply it at
    // the end of the character's turn
    var frozenBladesEffect = new FrozenBladesEffect(target, this.frozenBladesTurns + 1, this.addedCold, this.isMastered)
    character.inflictEffect(frozenBladesEffect, target, battleLog);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.FrozenBlades) == null;
  }
}

export default FrozenBladesSkill;