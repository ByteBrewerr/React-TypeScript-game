import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/stormElemental.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";
import Action from "@interfaces/Action";
import Board from "@models/Board";
import Cell from "@models/Cell";
import RangeCharacter from "../RangeCharacter";

export default class StormElemental extends RangeCharacter {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.StormElemental;
    this.level = 2;
    this.strength = 486;
    this.assault = 9;
    this.defence = 9;
    this.minDamage = 2;
    this.maxDamage = 8;
    this.initiative = 8;
    this.health = 25;
    this.maxHealth = 25;
    this.speed = 7;
    this.shooting = true;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }

}
