import ItemTypeEnum from "../../../Itemization/Enums/ItemTypeEnum";
import Equipment from "../../../Itemization/Equipment/Equipment";
import HealingFlaskSkill from "./HealingFlaskSkill";
import IFlaskSkill from "./IFlaskSkill";

class FlaskSkillFactory {
  static getSkill(flask: Equipment): IFlaskSkill {

    // Get the skill for the given flask
    switch (flask.type) {
      case ItemTypeEnum.MinorHealingFlask: return new HealingFlaskSkill(50);
      default: throw new Error(`No flask skill found for item type: ${flask.type}`);
    }
  }
}

export default FlaskSkillFactory;