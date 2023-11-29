import Teams from "@enums/Teams.enum";
import Names from "@enums/Name.enum";
import Archer from "./level_2/Archer";
import Champion from "./level_6/Champion";
import Spearman from "./level_1/Spearman";
import Character from "./Character";
import Fairy from "./level_1/Fairy";
import Archangel from "./level_7/Archangel";
import BlackKnight from "./level_6/BlackKnight";
import BoneDragon from "./level_7/BoneDragon";
import Crusader from "./level_4/Crusader";
import EnergyElemental from "./level_4/EnergyElemental";
import Griffin from "./level_3/Griffin";
import IceElemental from "./level_3/IceElemental";
import Lich from "./level_5/Lich";
import MagicElemental from "./level_6/MagicElemental";
import MagmaElemental from "./level_5/MagmaElemental";
import Phoenix from "./level_7/Phoenix";
import Skeleton from "./level_1/Skeleton";
import StormElemental from "./level_2/StormElemental";
import Vampire from "./level_4/Vampire";
import Wrath from "./level_3/Wrath";
import Zealot from "./level_5/Zealot";
import Zombie from "./level_2/Zombie";

const characterClasses: { [name: string]: new (team: Teams, count: number) => Character } = {
  [Names.Archer]: Archer,
  [Names.Champion]: Champion, 
  [Names.Spearman]: Spearman,
  [Names.Archangel]: Archangel,
  [Names.BlackKnight]: BlackKnight,
  [Names.BoneDragon]: BoneDragon,
  [Names.Crusader]: Crusader,
  [Names.EnergyElemental]: EnergyElemental,
  [Names.Fairy]: Fairy,
  [Names.Griffin]: Griffin,
  [Names.IceElemental]: IceElemental,
  [Names.Lich]: Lich,
  [Names.MagicElemental]: MagicElemental,
  [Names.MagmaElemental]: MagmaElemental,
  [Names.Phoenix]: Phoenix,
  [Names.Skeleton]: Skeleton,
  [Names.StormElemental]: StormElemental,
  [Names.Vampire]: Vampire,
  [Names.Wrath]: Wrath,
  [Names.Zealot]: Zealot,
  [Names.Zombie]: Zombie,
};

export const createCharacterInstances = (team: Teams): Character[] => {
  const instances: Character[] = [];

  for (const className in characterClasses) {
    if (characterClasses.hasOwnProperty(className)) {
      const CharacterClass = characterClasses[className];
      const instance = new CharacterClass(team, 0);

      instances.push(instance);
    }
  }

  return instances;
};


export default characterClasses;