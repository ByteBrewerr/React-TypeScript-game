import Teams from '@enums/Teams.enum';
import Character from '@models/characters/Character';
import buildDraft from '@utils/buildDraftQueue';
import { makeAutoObservable } from 'mobx';


class GameSetupStore {
  playerCharacters: Character[] = []
  computerCharacters: Character[] = []
  valueToSpend: number = 1_000_000
  maxValueToSpend: number = 1_000_000
  FIXED_VALUE_TO_SPEND: number = 1_000_000
  pickOrder: Teams[] = buildDraft();

  constructor() {
    makeAutoObservable(this);
  }
  
  setPlayerCharactes = (characters: Character[])=>{
    this.playerCharacters = characters
  }

  setValueToSpend = (value: number, unitStrength: number)=>{
    this.valueToSpend = this.maxValueToSpend - (unitStrength * value)
  }

  setMaxValueToSpend = (value: number)=>{
    this.maxValueToSpend = value
  }


  updatePickOrder = () =>{
    const newOrder = this.pickOrder.slice(1)
    this.pickOrder = newOrder
  }

  reset = () =>{
    this.playerCharacters = []
    this.computerCharacters = []
    this.valueToSpend = 1_000_000
    this.maxValueToSpend = 1_000_000
    this.FIXED_VALUE_TO_SPEND = 1_000_000
    this.pickOrder = buildDraft();
  }


}

export default new GameSetupStore();