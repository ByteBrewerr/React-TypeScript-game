import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/archer.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Board from "@models/Board";
import Cell from "@models/Cell";
import Action from "@interfaces/Action";
import RangeCharacter from "../RangeCharacter";

export default class Archer extends RangeCharacter {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.Archer;
    this.level = 2;
    this.strength = 184;
    this.assault = 6;
    this.defence = 3;
    this.minDamage = 4;
    this.maxDamage = 6;
    this.initiative = 6;
    this.health = 10;
    this.maxHealth = 10;
    this.speed = 4;
    this.shooting = true;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }
}
