import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/zombie.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class Zombie extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.Zombie

    this.assault = 5
    this.defence = 5
    this.minDamage = 2
    this.maxDamage = 3
    this.initiative = 4 
    this.health = 20
    this.maxHealth = 20
    this.speed = 3
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

