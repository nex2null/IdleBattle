import CharacterClassEnum from "../Enums/CharacterClassEnum";
import CryomancerClass from "./CryomancerClass";
import ICharacterClass from "./ICharacterClass";
import PaladinClass from "./PaladinClass";
import PyromancerClass from "./PyromancerClass";

class CharacterClassFactory {
  static getCharacterClass(characterClass: CharacterClassEnum): ICharacterClass {
    switch (characterClass) {
      case CharacterClassEnum.Cryomancer: return new CryomancerClass();
      case CharacterClassEnum.Paladin: return new PaladinClass();
      case CharacterClassEnum.Pyromancer: return new PyromancerClass();
    }
  }
}

export default CharacterClassFactory;