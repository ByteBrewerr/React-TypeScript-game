import React, { useEffect, useState } from 'react'
import gameSetupStore from '@stores/GameSetupStore';
import { Button } from 'antd';
import Teams from '@enums/Teams.enum';
import { createCharacterInstances } from '@models/characters/CharacterClasses';
import Character from '@models/characters/Character';
import { observer } from 'mobx-react-lite';
import _isEqual from 'lodash/isEqual';

const allCharacters = createCharacterInstances(Teams.Player)

const ComputerSide = observer(() => {
  const {pickOrder, playerCharacters, updatePickOrder} = gameSetupStore

  const [currentPick, setCurrentPick] = useState<number>(0)
  const [pickedUnits, setPickedUnits] = useState<Character[]>([])
  useEffect(() => {
    if(pickOrder[0] === Teams.Computer){
      const filteredUnits = allCharacters.filter(character=>character.level === currentPick + 1  && !playerCharacters.some(pc => pc.name === character.name))
      setCurrentPick(prev=>prev+1)
      updatePickOrder()

      const randomIndex = Math.floor(Math.random() * filteredUnits.length)
      const randomCharacter = filteredUnits[randomIndex]
      setPickedUnits([...pickedUnits, randomCharacter])


    }
  }, [pickOrder]) 
  
  return (
    <div className='space-y-4 flex flex-col'>
      {Array(7).fill(null).map((el, index) => {
        return (
          <div className='flex items-center space-x-20 bg-sky-900' key={index}>
            <Button className='border-yellow-600 border-[2px] w-24 h-24' disabled={true}>
              {pickedUnits[index] && <img className='w-[100%] h-[100%] scale-x-[-1]' src={pickedUnits[index].logo} alt="logo" />}
            </Button> 
          </div>
        );
      })}
    </div>
  )
})

export default ComputerSide