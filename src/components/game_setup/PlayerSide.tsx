import React, { useEffect, useRef, useState } from 'react';
import { Slider, Button} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { createCharacterInstances } from '@models/characters/CharacterClasses';
import Teams from '@enums/Teams.enum';
import Character from '@models/characters/Character';
import updateTurnQueue from '@utils/turnQueueUtils/turnQueueUpdater';
import gameSetupStore from '@stores/GameSetupStore';
import { observer } from 'mobx-react-lite';


const allCharacters = createCharacterInstances  (Teams.Player)

const PlayerSide = observer(() => {
    const [currentPick, setCurrentPick] = useState<number>(0)
    const [currentUnits, setCurrentUnits] = useState<Character[]>(allCharacters.filter((character)=>character.level === 1))
    const [pickedUnits, setPickedUnits] = useState<Character[]>([])

    const {valueToSpend, maxValueToSpend, setValueToSpend, setMaxValueToSpend, setPlayerCharactes, setPickOrder} = gameSetupStore
    const unitCount = parseInt((maxValueToSpend / currentUnits[0].strength).toFixed(0))

    useEffect(()=>{
        const pickOrder = [];

        for (let i = 0; i < 14; i++) {
          if (i % 4 === 0 || i % 4 === 3) {
            pickOrder.push(Teams.Player);
          } else {
            pickOrder.push(Teams.Computer);
          }
        }
        setPickOrder(pickOrder)
    },[])
    
    const handleCurrentUnits = (index: number) =>{
        if(currentPick === index){
            setCurrentUnits(prev=>{
                const newOrder = updateTurnQueue(prev)
                return newOrder
            })
        }
    }

    const handleNextPick = () => {

        if (valueToSpend < 0 || currentUnits[0].count === 0) {
          return;
        }
      
        setPickedUnits((prev) => [...prev, currentUnits[0]]);
      
        setCurrentPick((prev) => prev + 1);
      
        if (currentPick === 6) {
          setPlayerCharactes(currentUnits);
          return;
        }
      
        setCurrentUnits(allCharacters.filter((character) => character.level === currentPick + 2));
      
        setPlayerCharactes(currentUnits);
        setMaxValueToSpend(valueToSpend);
      };

    const handleRestartDraft = () =>{
        setCurrentPick(0)
        setCurrentUnits(allCharacters.filter((character)=>character.level ===  1))
        setPickedUnits([])
    }

    const handleSlider = (value: number) =>{
        setValueToSpend(value, currentUnits[0].strength)
        currentUnits[0].count = value
    }

    return (
        <div className='flex items-center justify-center space-x-20'>
            <div className='space-y-4 flex flex-col'>
                {Array(7).fill(null).map((el, index) => {
                return (
                    <div className='flex items-center space-x-20' key={index}>
                        <div className='flex'>
                            {currentPick === index && <CaretRightOutlined className='text-white animate-pulse text-[5vh]'/>}

                            <Button
                                className='border-yellow-600 border-[2px] w-24 h-24 flex justify-center items-center bg-gray-600 '
                                onClick={()=>{handleCurrentUnits(index)}}
                            >       
                                {currentPick === index &&  <img className='w-[80%] h-[100%]' src={currentUnits[0].logo} alt="logo" />}
                                {pickedUnits[index] && <img className='w-[80%] h-[100%]' src={pickedUnits[index].logo} alt="logo" />  }             
                            </Button>

                        </div>

                        <div className='w-[20vh]'>
                           {currentPick === index && <Slider onAfterChange={(value)=>{handleSlider(value)}} defaultValue={0} max={unitCount} />}
                           {pickedUnits[index] && <span className='text-white'>{pickedUnits[index].count}</span>}
                        </div>  
                        <Button 
                            className='text-white'

                            onClick={()=>handleNextPick()}
                            disabled={currentPick!==index}
                        >
                            CONFIRM
                        </Button>
                    </div>
                );
                })}
            </div>
            <div className='flex flex-col'>
                <span className={`text-white font-bold text-[7vh] ${valueToSpend< 0 ? 'animate-pulse text-red-500' : ''}`}>
                    {valueToSpend}
                </span>
                <Button 
                    className='text-white'
                    onClick={()=>{handleRestartDraft()}}
                >
                    RESTART DRAFT
                </Button>
            </div>
           
        </div> 
    );
})

export default PlayerSide;
