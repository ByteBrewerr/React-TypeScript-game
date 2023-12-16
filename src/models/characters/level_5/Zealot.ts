import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/zealot.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Action from "@interfaces/Action";
import Board from "@models/Board";
import Cell from "@models/Cell";
import RangeCharacter from "../RangeCharacter";

export default class Zealot extends RangeCharacter {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.Zealot;
    this.level = 5;
    this.strength = 750;
    this.assault = 12;
    this.defence = 10;
    this.minDamage = 10;
    this.maxDamage = 12;
    this.initiative = 7;
    this.health = 30;
    this.maxHealth = 30;
    this.speed = 5;
    this.shooting = true;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }

  
}
