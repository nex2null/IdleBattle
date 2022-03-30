class Stats {

  maxHp: number;
  maxMp: number;
  strength: number;
  intelligence: number;
  speed: number;
  dodgeChance: number;
  accuracy: number;
  physicalPower: number;
  coldPower: number;
  firePower: number;
  lightningPower: number;
  physicalResistance: number;
  coldResistance: number;
  fireResistance: number;
  lightningResistance: number;

  // Constructor
  constructor(args: {
    maxHp?: number,
    maxMp?: number,
    strength?: number,
    intelligence?: number,
    speed?: number,
    dodgeChance?: number,
    accuracy?: number,
    physicalPower?: number,
    coldPower?: number,
    firePower?: number,
    lightningPower?: number,
    physicalResistance?: number,
    coldResistance?: number,
    fireResistance?: number,
    lightningResistance?: number
  }) {
    this.maxHp = args.maxHp || 0;
    this.maxMp = args.maxMp || 0;
    this.strength = args.strength || 0;
    this.intelligence = args.intelligence || 0;
    this.speed = args.speed || 0;
    this.dodgeChance = args.dodgeChance || 0;
    this.accuracy = args.accuracy || 0;
    this.physicalPower = args.physicalPower || 0;
    this.coldPower = args.coldPower || 0;
    this.firePower = args.firePower || 0;
    this.lightningPower = args.lightningPower || 0;
    this.physicalResistance = args.physicalResistance || 0;
    this.coldResistance = args.coldResistance || 0;
    this.fireResistance = args.fireResistance || 0;
    this.lightningResistance = args.lightningResistance || 0;
  }

  // Load from saved data
  static load(savedData: any) {
    return new Stats({
      maxHp: savedData.maxHp,
      maxMp: savedData.maxMp,
      strength: savedData.strength,
      intelligence: savedData.intelligence,
      speed: savedData.speed,
      dodgeChance: savedData.dodgeChance,
      accuracy: savedData.accuracy,
      physicalPower: savedData.physicalPower,
      coldPower: savedData.coldPower,
      firePower: savedData.firePower,
      lightningPower: savedData.lightningPower,
      physicalResistance: savedData.physicalResistance,
      coldResistance: savedData.coldResistance,
      fireResistance: savedData.fireResistance,
      lightningResistance: savedData.lightningResistance
    });
  }

  // Adjust stats based on new stats delta
  adjust(stats: Stats) {
    this.maxHp += stats.maxHp || 0;
    this.maxMp += stats.maxMp || 0;
    this.strength += stats.strength || 0;
    this.intelligence += stats.intelligence || 0;
    this.speed += stats.speed || 0;
    this.dodgeChance += stats.dodgeChance || 0;
    this.accuracy += stats.accuracy || 0;
    this.physicalPower += stats.physicalPower || 0;
    this.coldPower += stats.coldPower || 0;
    this.firePower += stats.firePower || 0;
    this.lightningPower += stats.lightningPower || 0;
    this.physicalResistance += stats.physicalResistance || 0;
    this.coldResistance += stats.coldResistance || 0;
    this.fireResistance += stats.fireResistance || 0;
    this.lightningResistance += stats.lightningResistance || 0;
  }

  // Clones the stats
  clone() {
    return new Stats({
      maxHp: this.maxHp,
      maxMp: this.maxMp,
      strength: this.strength,
      intelligence: this.intelligence,
      speed: this.speed,
      dodgeChance: this.dodgeChance,
      accuracy: this.accuracy,
      physicalPower: this.physicalPower,
      coldPower: this.coldPower,
      firePower: this.firePower,
      lightningPower: this.lightningPower,
      physicalResistance: this.physicalResistance,
      coldResistance: this.coldResistance,
      fireResistance: this.fireResistance,
      lightningResistance: this.lightningResistance,
    });
  }
}

export default Stats;