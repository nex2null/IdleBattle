import PlayerCharacter from "./PlayerCharacter";
import Inventory from './Itemization/Inventory';
import Equipment from "./Itemization/Equipment/Equipment";

class Town {

    // Properties
    totalExperience: number;
    totalGold: number;
    inventory: Inventory;
    playerCharacters: Array<PlayerCharacter>;
    equipmentBeingForged: Equipment | null = null;

    // Constructor
    constructor() {

        // TODO: Load town info

        // Setup properties
        this.totalExperience = 0;
        this.totalGold = 0;

        // Setup inventory
        this.inventory = new Inventory();

        // Setup characters
        this.playerCharacters = [
            new PlayerCharacter({
                name: 'Brian',
                level: 1,
                hp: 175,
                mp: 0,
                str: 9,
                def: 17,
                spd: 5,
                eva: 3,
            }),
            new PlayerCharacter({
                name: 'Chris',
                level: 1,
                hp: 250,
                mp: 0,
                str: 32,
                def: 25,
                spd: 2,
                eva: 1
            })
        ]
    }
}

export default Town;