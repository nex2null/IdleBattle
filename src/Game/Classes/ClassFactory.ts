import ClassEnum from "../Enums/ClassEnum";
import CryomancerClass from "./CryomancerClass";
import IClass from "./IClass";

class ClassFactory {
  static getClass(classEnum: ClassEnum): IClass {
    switch (classEnum) {
      case ClassEnum.Cryomancer: return new CryomancerClass();
    }
  }
}

export default ClassFactory;