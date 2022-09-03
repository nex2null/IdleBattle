import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import MoltenBladesEffect from '../BattleEffects/MoltenBladesEffect';

class MoltenBladesSkill implements ISkill {

  // Constants
  readonly moltenBladesTurns: number = 4;

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.MoltenBlades;
  targetType: TargetTypeEnum;
  readonly mpCost: number;
  readonly addedFire: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 10 + ((this.level - 1) * 2);
    this.addedFire = .2 + .05 * slvl;
    this.name = 'Molten Blades';
    this.targetType = isMastered ? TargetTypeEnum.Single : TargetTypeEnum.All;
  }

  // Get the skill description
  getDescription(): string {
    return `Enchants a target's weapon with flame, dealing additional fire damage with a chance to burn for all physical attacks.`;
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

    // If unmastered, only first target is ever relevant
    var skillTargets = !this.isMastered ? targets.slice(0, 1) : targets;

    // Log
    battleLog.addMessage(`${character.name} uses molten blades on ${this.isMastered ? 'the party' : skillTargets[0].name}`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Loop through all targets
    skillTargets.forEach(target => {

      // Determine the number of turns the effect should last for
      // NOTE: Need to do turns + 1 because it will lose a turn immediately after we apply it at
      // the end of the character's turn
      var effectTurns = character == target ? this.moltenBladesTurns + 1 : this.moltenBladesTurns;

      // Inflict molten blades effect on the target
      var moltenBladesEffect = new MoltenBladesEffect(target, effectTurns, this.addedFire);
      character.inflictEffect(moltenBladesEffect, target, battleLog);
    });
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.MoltenBlades) == null;
  }
}

export default MoltenBladesSkill;