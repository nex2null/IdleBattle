import PlayerCharacter from "./PlayerCharacter";
import Inventory from './Itemization/Inventory';
import Equipment from "./Itemization/Equipment/Equipment";

class Town {

  // Properties
  totalExperience: number;
  totalGold: number;
  inventory: Inventory;
  playerCharacters: Array<PlayerCharacter>;
  equipmentBeingForged: Equipment | null;

  // Constructor
  constructor(savedData: any = {}) {

    // Setup properties
    this.totalExperience = savedData.totalExperience || 0;
    this.totalGold = savedData.totalGold || 0;
    this.equipmentBeingForged = savedData.equipmentBeingForged || null;

    // Setup inventory
    this.inventory = new Inventory(savedData.inventory);

    // Setup characters
    this.playerCharacters = savedData.playerCharacters || [
      new PlayerCharacter({
        name: 'Brian',
        level: 1,
        hp: 175,
        mp: 0,
        str: 10,
        def: 15,
        spd: 8,
        eva: 5,
      })
    ]
  }
}

export default Town;