import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import TargetTypeEnum from '../Enums/TargetTypeEnum';
import DamageTracker from '../DamageTracker';
import SkillEnum from '../Enums/SkillEnum';

class UseFlaskSkill implements ISkill {

  // Properties
  name: string;
  skillEnum: SkillEnum = SkillEnum.UseFlask;
  level: number = 1;
  maxLevel: number = 1;
  isMastered: boolean = false;
  isGeneric: boolean = true;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Use Flask';
    this.targetType = TargetTypeEnum.All;
  }

  // Get the skill description
  getDescription(): string {
    return `Use your equipped flask`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    return 1000;
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canUseFlask();
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog,
    damageTracker: DamageTracker,
    allCharacters: Array<BattleCharacter>
  ) {
    
    // Log
    battleLog.addMessage(`${character.name} uses their flask`);

    // Use the flask
    character.useFlask(targets, battleLog, damageTracker, allCharacters);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter, character: BattleCharacter) {

    // Get flask skill and sanity check
    var flaskSkill = character.getFlaskSkill();
    if (!flaskSkill) return false;

    // Ensure the target is valid for the flask
    return flaskSkill.isValidTarget(target);
  }
}

export default UseFlaskSkill;