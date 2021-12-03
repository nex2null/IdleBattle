class Stats {

  hp: number;
  mp: number;
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
    hp?: number,
    mp?: number,
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
    this.hp = args.hp || 0;
    this.mp = args.mp || 0;
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
      hp: savedData.hp,
      mp: savedData.mp,
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
}

export default Stats;