import Teams from '../../enums/Teams.enum'
import logo from './../../assets/characters/champion.png'
import Character from './Character'
import Names from '../../enums/Name.enum'
import Board from '../Board'
import Cell from '../Cell'
import Action from '../../interfaces/Action'

export default class Champion extends Character {

  constructor(team: Teams, count: number, isCounterAttackPossible: boolean) {
    super(team, count, isCounterAttackPossible)
    this.logo = logo
    this.name = Names.Knight

    this.assault = 1
    this.defence = 1
    this.minDamage = 1
    this.maxDamage = 5
    this.initiative = 9
    this.health = 100
    this.speed = 9
    this.shooting = false
    this.isPerformingCounterAttack = false
    this.isCounterAttackPossible = isCounterAttackPossible
    this.isCounterAttackPerformed = false;

    
  }
 
}

