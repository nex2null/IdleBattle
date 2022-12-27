import FunnelWeaver from "../Enemies/FunnelWeaver";
import Spider from "../Enemies/Spider";
import Dungeon from "./Dungeon";
import DungeonEnum from "./DungeonEnum";
import DungeonLevel from "./DungeonLevel";

class DungeonFactory {
  static getDungeon(dungeonEnum: DungeonEnum): Dungeon {
    switch (dungeonEnum) {
      case DungeonEnum.Floor1: return createSpiderCave();
      case DungeonEnum.Floor2: return createFunnelWeaverCave();
      default: throw `Cannot create dungeon with enum ${dungeonEnum}`;
    }
  }
}

function createSpiderCave(): Dungeon {
  return new Dungeon('Floor 1 - Spider Cave', [
    new DungeonLevel([new Spider('Spider 1'), new Spider('Spider 2')]),
    new DungeonLevel([new Spider('Spider 3'), new Spider('Spider 4')])
  ]);
}

function createFunnelWeaverCave(): Dungeon {
  return new Dungeon('Floor 2 - Ice Cavern', [
    new DungeonLevel([new FunnelWeaver('Funnel Weaver 1'), new FunnelWeaver('Funnel Weaver 2')]),
    new DungeonLevel([new FunnelWeaver('Funnel Weaver 3'), new FunnelWeaver('Funnel Weaver 4')])
  ]);
}

export default DungeonFactory;