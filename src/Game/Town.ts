import PlayerCharacter from "./PlayerCharacter";

class Town {

    // Properties
    totalExperience: number;
    playerCharacters: Array<PlayerCharacter>;

    // Constructor
    constructor() {

        // TODO: Load town info

        // Setup exp
        this.totalExperience = 0;

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