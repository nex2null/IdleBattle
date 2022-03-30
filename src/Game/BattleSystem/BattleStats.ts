import Stats from "../Stats";

class BattleStats extends Stats {

  // Properties
  hp: number;
  mp: number;

  // Constructor
  constructor(stats: Stats) {
    super(stats);
    this.hp = stats.maxHp || 0;
    this.mp = stats.maxMp || 0;
  }
}

export default BattleStats;