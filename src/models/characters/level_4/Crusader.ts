import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/crusader.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";

export default class Crusader extends Character {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.Crusader;
    this.level = 4;
    this.strength = 688;
    this.assault = 12;
    this.defence = 12;
    this.minDamage = 12;
    this.maxDamage = 16;
    this.initiative = 6;
    this.health = 30;
    this.maxHealth = 30;
    this.speed = 5;
    this.shooting = false;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }
}
