import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import SkillEnum from '../Enums/SkillEnum';

class DefendSkill implements ISkill {

  // Properties
  name: string;
  skillEnum: SkillEnum = SkillEnum.Focus;
  level: number = 1;
  maxLevel: number = 1;
  isMastered: boolean = false;
  isGeneric: boolean = true;
  targetType: TargetTypeEnum;

  // Constructor
  constructor() {
    this.name = 'Focus';
    this.targetType = TargetTypeEnum.Self;
  }

  // Get the skill description
  getDescription(): string {
    return `Focus your mind. Regenerates MP.`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    return 1000;
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
      return !character.isOnCooldown(this.skillEnum);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog
  ) {
    
    // Log
    battleLog.addMessage(`${character.name} focuses`);

    // Regenerate 20% of MP
    // TODO: Augment with stats
    var mpToRegain = character.baseStats.maxMp * .2;
    character.regainMp(mpToRegain, battleLog);

    // Add a cooldown for this skill for 4 full turns
    character.addCooldown(this.skillEnum, 5);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return true;
  }
}

export default DefendSkill;