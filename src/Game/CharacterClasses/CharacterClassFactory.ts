import CharacterClassEnum from "../Enums/CharacterClassEnum";
import CryomancerClass from "./CryomancerClass";
import ICharacterClass from "./ICharacterClass";

class CharacterClassFactory {
  static getCharacterClass(characterClass: CharacterClassEnum): ICharacterClass {
    switch (characterClass) {
      case CharacterClassEnum.Cryomancer: return new CryomancerClass();
    }
  }
}

export default CharacterClassFactory;