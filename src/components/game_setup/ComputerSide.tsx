import React, { FC, useEffect, useState } from 'react'
import gameSetupStore from '@stores/GameSetupStore';
import { Button } from 'antd';
import Teams from '@enums/Teams.enum';
import { createCharacterInstances } from '@models/characters/CharacterClasses';
import Character from '@models/characters/Character';
import { observer } from 'mobx-react-lite';

interface ComputerSideProps{
  resetComputerSide: boolean
  handleResetComputerSide: ()=> void
}

const allCharacters = createCharacterInstances(Teams.Player)

const ComputerSide:FC<ComputerSideProps> = observer(({resetComputerSide, handleResetComputerSide,}) => {
  const {pickOrder, playerCharacters, setComputerCharacters,updatePickOrder, resetGameSetup, computerMaxValueToSpend, setComputerMaxValueToSpend, FIXED_VALUE_TO_SPEND} = gameSetupStore

  const [currentPick, setCurrentPick] = useState<number>(0)
  const [pickedUnits, setPickedUnits] = useState<Character[]>([])

  useEffect(() => {
    if(pickOrder[0] === Teams.Computer && resetComputerSide === false){
      const filteredUnits = allCharacters.filter(character=>character.level === currentPick + 1  && !playerCharacters.some(pc => pc.name === character.name))
      setCurrentPick(prev=>prev+1)
      updatePickOrder()
      setComputerMaxValueToSpend(computerMaxValueToSpend - hanleValueToSpend())

      const randomIndex = Math.floor(Math.random() * filteredUnits.length)
      const randomCharacter = filteredUnits[randomIndex]
      const randomCount = pickOrder.length === 1 
      ? Math.floor(computerMaxValueToSpend / randomCharacter.strength)
      : Math.floor((hanleValueToSpend() / randomCharacter.strength))

      randomCharacter.count = randomCount
      setPickedUnits([...pickedUnits, randomCharacter])
    }
  }, [pickOrder]) 

  useEffect(()=>{
    setComputerCharacters(pickedUnits)
  },[pickedUnits] )
  
  useEffect(() => {
    if(resetComputerSide===true){
      setCurrentPick(0)
      setPickedUnits([])
      resetGameSetup()
      handleResetComputerSide()
    }
  }, [resetComputerSide]) 
  
  const hanleValueToSpend = (): number =>{
    const randomPercentage = Math.floor(Math.random() * (18 - 8 + 1)) + 8;
    console.log(randomPercentage)
    const value = (randomPercentage / 100) * FIXED_VALUE_TO_SPEND;
    return value
  }

  return (
    <div className='space-y-4 flex flex-col'>
      {Array(7).fill(null).map((el, index) => {
        return (
          <div className='flex items-center space-x-20 ' key={index}>
            
            <div className='flex w-[20vh] justify-between items-center '>
              {pickedUnits[index] && <span className='text-white'>{pickedUnits[index].count}</span>}
              <Button className='border-yellow-600 border-[2px] w-24 h-24 bg-sky-900'>
                {pickedUnits[index] && <img className='w-[100%] h-[100%] scale-x-[-1]' src={pickedUnits[index].logo} alt="logo" />}
              </Button> 
            </div>
           
          </div>
        );
      })}
    </div>
  )
})

export default ComputerSide