import GambitConditionEnum from "../../Enums/GambitConditionEnum";
import AllyAnyCondition from "./AllyAnyCondition";
import AllyHealthLessThanCondition from "./AllyHealthLessThanCondition";
import EnemyAnyCondition from "./EnemyAnyCondition";
import IGambitCondition from "./IGambitCondition";
import SelfCondition from "./SelfCondition";

class GambitConditionFactory {
  static getGambitCondition(condition: GambitConditionEnum): IGambitCondition {
    switch (condition) {
      case GambitConditionEnum.AllyAny: return new AllyAnyCondition();
      case GambitConditionEnum.EnemyAny: return new EnemyAnyCondition();
      case GambitConditionEnum.Self: return new SelfCondition();
      case GambitConditionEnum.AllyHealthLessThan: return new AllyHealthLessThanCondition();
    }
  }
}

export default GambitConditionFactory;