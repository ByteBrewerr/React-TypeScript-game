import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/iceElemental.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Action from "@interfaces/Action";
import Board from "@models/Board";
import Cell from "@models/Cell";
import RangeCharacter from "../RangeCharacter";

export default class IceElemental extends RangeCharacter {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.IceElemental;
    this.level = 3;
    this.strength = 380;
    this.assault = 8;
    this.defence = 10;
    this.minDamage = 3;
    this.maxDamage = 7;
    this.initiative = 6;
    this.health = 30;
    this.maxHealth = 30;
    this.speed = 5;
    this.shooting = true;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }
  
}
