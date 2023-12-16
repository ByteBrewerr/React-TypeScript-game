import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/lich.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Action from "@interfaces/Action";
import Board from "@models/Board";
import Cell from "@models/Cell";
import RangeCharacter from "../RangeCharacter";

export default class Lich extends RangeCharacter {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.Lich;
    this.level = 5;
    this.strength = 1049;
    this.assault = 13;
    this.defence = 10;
    this.minDamage = 11;
    this.maxDamage = 15;
    this.initiative = 7;
    this.health = 40;
    this.maxHealth = 40;
    this.speed = 6;
    this.shooting = true;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }


}
