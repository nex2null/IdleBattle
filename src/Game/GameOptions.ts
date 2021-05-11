import BattleSpeedEnum from "./BattleSystem/Enums/BattleSpeedEnum";

//
// Options for the game
//
class GameOptions {

  // Battle options
  battleSpeed: BattleSpeedEnum;
  autoAdvanceBattles: boolean;

  // Constructor
  constructor() {
    this.battleSpeed = BattleSpeedEnum.Normal;
    this.autoAdvanceBattles = false;
  }
}

export default GameOptions;