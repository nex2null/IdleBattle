import HardSpider from "../Enemies/HardSpider";
import Spider from "../Enemies/Spider";
import Dungeon from "./Dungeon";
import DungeonEnum from "./DungeonEnum";
import DungeonLevel from "./DungeonLevel";

class DungeonFactory {
  static getDungeon(dungeonEnum: DungeonEnum): Dungeon {
    switch (dungeonEnum) {
      case DungeonEnum.SpiderCave: return createSpiderCave();
      case DungeonEnum.HardSpiderCave: return createHardSpiderCave();
      default: throw `Cannot create dungeon with enum ${dungeonEnum}`;
    }
  }
}

function createSpiderCave(): Dungeon {
  return new Dungeon('Spider Cave', [
    new DungeonLevel([new Spider('Spider 1'), new Spider('Spider 2')]),
    new DungeonLevel([new Spider('Spider 3')]),
    new DungeonLevel([new Spider('Spider 4'), new Spider('Spider 5')])
  ]);
}

function createHardSpiderCave(): Dungeon {
  return new Dungeon('Hard Spider Cave', [
    new DungeonLevel([new HardSpider('Spider 1'), new HardSpider('Spider 2')]),
    new DungeonLevel([new HardSpider('Spider 3'), new HardSpider('Spider 4')])
  ]);
}

export default DungeonFactory;