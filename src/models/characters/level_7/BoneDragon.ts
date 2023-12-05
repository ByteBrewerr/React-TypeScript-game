import Teams from "@enums/Teams.enum";
import logo from "@assets/characters/boneDragon.png";
import Character from "@models/characters/Character";
import Names from "@enums/Name.enum";

export default class BoneDragon extends Character {
  constructor(team: Teams, count: number) {
    super(team, count);
    this.logo = logo;
    this.name = Names.BoneDragon;
    this.level = 7;
    this.strength = 4696;
    this.assault = 19;
    this.defence = 17;
    this.minDamage = 25;
    this.maxDamage = 50;
    this.initiative = 14;
    this.health = 200;
    this.maxHealth = 200;
    this.speed = 10;
    this.shooting = false;
    this.isPerformingCounterAttack = false;
    this.isCounterAttackPossible = true;
  }
}
