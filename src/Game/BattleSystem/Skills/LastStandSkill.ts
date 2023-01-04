import TargetTypeEnum from '../Enums/TargetTypeEnum';
import ISkill from './ISkill';
import BattleCharacter from '../BattleCharacter';
import BattleLog from '../BattleLog';
import BattleEffectEnum from '../Enums/BattleEffectEnum';
import SkillEnum from '../Enums/SkillEnum';
import LastStandEffect from '../BattleEffects/LastStandEffect';

class LastStandSkill implements ISkill {

  // Properties
  level: number;
  maxLevel: number = 10;
  isMastered: boolean;
  isGeneric: boolean = false;
  name: string;
  skillEnum: SkillEnum = SkillEnum.LastStand;
  targetType: TargetTypeEnum;
  readonly mpCost: number;

  // Constructor
  constructor(slvl: number, isMastered: boolean) {
    this.level = slvl;
    this.isMastered = isMastered;
    this.mpCost = 15 + ((this.level - 1) * 2);
    this.name = 'Last Stand';
    this.targetType = TargetTypeEnum.Self;
  }

  // Get the skill description
  getDescription(): string {
    return `You gain a temporary amount of HP and maximum HP. When the effect ends the HP is removed.\n{red-fg}THIS CAN KILL YOU!{/}`;
  }

  // Get the required character level in order to level up this skill
  getLevelUpCharacterLevel(): number {
    switch (this.level) {
      case 0: return 12;
      case 1: return 16;
      case 2: return 20;
      case 3: return 24;
      case 4: return 28;
      case 5: return 32;
      case 6: return 36;
      case 7: return 40;
      case 8: return 44;
      case 9: return 48;
      default: return 1000;
    }
  }

  // Determine if the skill can be used
  canUse(
    character: BattleCharacter,
    targets: Array<BattleCharacter>): boolean {
    return character.canSpendMp(this.mpCost) && !character.isOnCooldown(this.skillEnum);
  }

  // Use the skill
  use(
    character: BattleCharacter,
    targets: Array<BattleCharacter>,
    battleLog: BattleLog
  ) {

    // Log
    battleLog.addMessage(`${character.name} uses last stand`);

    // Spend MP
    character.spendMp(this.mpCost);

    // Determine HP to add
    var percent = .25 + (.05 * this.level);
    var hpToAdd = character.baseStats.maxHp * percent;

    // Determine if there is a minimum percent of HP the character
    // will never go below when the effect ends
    var minimumHpPercent = this.isMastered ? .1 : null;

    // Add the last stand effect
    var lastStandEffect = new LastStandEffect(character, hpToAdd, 4, minimumHpPercent);
    character.inflictEffect(lastStandEffect, character, battleLog);

    // Add a cooldown for this skill for 8 full turns
    character.addCooldown(this.skillEnum, 9);
  }

  // Determine if the skill is valid for a target
  isValidTarget(target: BattleCharacter) {
    return target.isAlive() && target.getEffect(BattleEffectEnum.LastStand) == null;
  }
}

export default LastStandSkill;