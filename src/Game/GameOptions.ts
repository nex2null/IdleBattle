import BattleDamageFeedbackEnum from "./BattleSystem/Enums/BattleDamageFeedbackEnum";
import BattleSpeedEnum from "./BattleSystem/Enums/BattleSpeedEnum";

//
// Options for the game
//
class GameOptions {

  // Battle options
  battleSpeed: BattleSpeedEnum;
  autoAdvanceBattles: boolean;
  battleDamageFeedback: BattleDamageFeedbackEnum;

  // Constructor
  constructor(savedData: any = {}) {
    this.battleSpeed = savedData.battleSpeed || BattleSpeedEnum.Normal;
    this.autoAdvanceBattles = savedData.autoAdvanceBattles || false;
    this.battleDamageFeedback = savedData.battleDamageFeedback || BattleDamageFeedbackEnum.Damage;
  }
}

export default GameOptions;