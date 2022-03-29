import CharacterClassEnum from "../Enums/CharacterClassEnum";
import CryomancerClass from "./CryomancerClass";
import ICharacterClass from "./ICharacterClass";
import PaladinClass from "./PaladinClass";

class CharacterClassFactory {
  static getCharacterClass(characterClass: CharacterClassEnum): ICharacterClass {
    switch (characterClass) {
      case CharacterClassEnum.Cryomancer: return new CryomancerClass();
      case CharacterClassEnum.Paladin: return new PaladinClass();
    }
  }
}

export default CharacterClassFactory;