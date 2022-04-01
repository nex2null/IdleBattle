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
  healPower: number;
  physicalResistance: number;
  coldResistance: number;
  fireResistance: number;
  lightningResistance: number;
  statusResistance: number;

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
    healPower?: number,
    physicalResistance?: number,
    coldResistance?: number,
    fireResistance?: number,
    lightningResistance?: number,
    statusResistance?: number
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
    this.healPower = args.healPower || 0;
    this.physicalResistance = args.physicalResistance || 0;
    this.coldResistance = args.coldResistance || 0;
    this.fireResistance = args.fireResistance || 0;
    this.lightningResistance = args.lightningResistance || 0;
    this.statusResistance = args.statusResistance || 0;
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
      healPower: savedData.healPower,
      physicalResistance: savedData.physicalResistance,
      coldResistance: savedData.coldResistance,
      fireResistance: savedData.fireResistance,
      lightningResistance: savedData.lightningResistance,
      statusResistance: savedData.statusResistance
    });
  }

  // Adjust stats based on new stats delta
  adjust(stats: Stats) {
    this.maxHp += stats.maxHp;
    this.maxMp += stats.maxMp;
    this.strength += stats.strength;
    this.intelligence += stats.intelligence;
    this.speed += stats.speed;
    this.dodgeChance += stats.dodgeChance;
    this.accuracy += stats.accuracy;
    this.physicalPower += stats.physicalPower;
    this.coldPower += stats.coldPower;
    this.firePower += stats.firePower;
    this.lightningPower += stats.lightningPower;
    this.healPower += stats.healPower;
    this.physicalResistance += stats.physicalResistance;
    this.coldResistance += stats.coldResistance;
    this.fireResistance += stats.fireResistance;
    this.lightningResistance += stats.lightningResistance;
    this.statusResistance += stats.statusResistance;
  }
}

export default Stats;