import PlayerCharacter from "./PlayerCharacter";
import Inventory from './Itemization/Inventory';
import Equipment from "./Itemization/Equipment/Equipment";
import CharacterClassEnum from "./Enums/CharacterClassEnum";

class Town {

  // Properties
  totalExperience: number;
  totalGold: number;
  inventory: Inventory;
  roster: Array<PlayerCharacter>;
  currentParty: Array<string>;
  equipmentBeingForged: Equipment | null;
  unlockedClasses: Array<CharacterClassEnum>;

  // Constructor
  constructor(savedData: any = {}) {

    // Setup properties
    this.totalExperience = savedData.totalExperience || 0;
    this.totalGold = savedData.totalGold || 0;
    this.equipmentBeingForged = savedData.equipmentBeingForged != null ? Equipment.load(savedData.equipmentBeingForged) : null;
    this.currentParty = savedData.currentParty || [];

    // Setup inventory
    this.inventory = savedData.inventory ? Inventory.load(savedData.inventory) : new Inventory();

    // Setup roster
    this.roster = savedData.roster
      ? savedData.roster.map((x: any) => PlayerCharacter.load(x))
      : [];

    // Setup unlocked classes
    // TODO: Change this
    this.unlockedClasses = savedData.unlockedClasses || [CharacterClassEnum.Cryomancer, CharacterClassEnum.Paladin];
  }

  // Get characters not in party
  getCharactersNotInParty(): Array<PlayerCharacter> {
    return this.roster.filter(x => !this.currentParty.includes(x.uid));
  }

  // Get player characters in party
  getCharactersInParty(): Array<PlayerCharacter> {
    return this.roster.filter(x => this.currentParty.includes(x.uid));
  }
}

export default Town;