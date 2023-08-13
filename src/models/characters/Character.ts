import Teams from "../../enums/Teams.enum"
import Names from "../../enums/Name.enum"
import floor from '../../assets/floor.jpg'

export default class Character {
  team: Teams
  name: Names
  logo: typeof floor | null
  
  constructor(team: Teams) {
    this.team = team
    this.name = Names.Character
    this.logo = null
  }
}