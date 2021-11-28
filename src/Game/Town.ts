import PlayerCharacter from "./PlayerCharacter";
import Inventory from './Itemization/Inventory';
import Equipment from "./Itemization/Equipment/Equipment";
import Stats from "./Stats";

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
    this.equipmentBeingForged = savedData.equipmentBeingForged != null ? Equipment.load(savedData.equipmentBeingForged) : null;

    // Setup inventory
    this.inventory = savedData.inventory ? Inventory.load(savedData.inventory) : new Inventory();

    // Setup characters
    this.playerCharacters = savedData.playerCharacters
      ? savedData.playerCharacters.map((x: any) => PlayerCharacter.load(x))
      : [
        new PlayerCharacter({
          name: 'Brian',
          level: 1,
          stats: new Stats({
            hp: 75,
            mp: 50,
            strength: 8,
            intelligence: 6
          })
        })
      ];
  }
}

export default Town;