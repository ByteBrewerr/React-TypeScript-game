import Teams from '../../../enums/Teams.enum'
import logo from './../../../assets/characters/blackKnight.png'
import Character from '../Character'
import Names from '../../../enums/Name.enum'

export default class BlackKnight extends Character {

  constructor(team: Teams, count: number) {
    super(team, count)
    this.logo = logo
    this.name = Names.BlackKnight
    this.level = 6
    this.strength = 2382
    this.assault = 18
    this.defence = 18
    this.minDamage = 15
    this.maxDamage = 30
    this.initiative = 9
    this.health = 120
    this.maxHealth = 120
    this.speed = 7
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = true

    
  }
 
}

