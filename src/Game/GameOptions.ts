import BattleSpeedEnum from "./BattleSystem/Enums/BattleSpeedEnum";

//
// Options for the game
//
class GameOptions {

  // Battle options
  battleSpeed: BattleSpeedEnum;
  autoAdvanceBattles: boolean;

  // Constructor
  constructor(savedData: any = {}) {
    this.battleSpeed = savedData.battleSpeed || BattleSpeedEnum.Normal;
    this.autoAdvanceBattles = savedData.autoAdvanceBattles || false;
  }
}

export default GameOptions;