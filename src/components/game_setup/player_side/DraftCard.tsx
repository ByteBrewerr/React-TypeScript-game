import React, {FC} from 'react';
import { Button, Slider } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Character from '@models/characters/Character';

interface DraftCardProps {
    currentPick: number,
    handleCurrentUnits: (index: number)=>void,
    handleNextPick: ()=>void,
    currentUnits: Character[],
    pickedUnits: Character[],
    unitCount: number,
    handleSlider: (value: number)=>void,
    index: number
}

const DraftCard:FC<DraftCardProps> = ({ currentPick, handleCurrentUnits, handleNextPick, currentUnits, pickedUnits, unitCount, handleSlider, index }) => (
    <div className='flex items-center space-x-20' key={index}>
    <div className='flex'>
        {currentPick === index && <CaretRightOutlined className='text-white animate-pulse text-[5vh]'/>}

        <Button
            className='border-yellow-600 border-[2px] w-24 h-24 flex justify-center items-center bg-gray-600'
            onClick={()=>{handleCurrentUnits(index)}}
        >       
            {currentPick === index &&  <img className='w-[100%] h-[100%]' src={currentUnits[0].logo} alt="logo" />}
            {pickedUnits[index] && <img className='w-[100%] h-[100%]' src={pickedUnits[index].logo} alt="logo" />  }  
                     
        </Button>

    </div>

    <div className='w-[20vh]'>
       {currentPick === index && <Slider onAfterChange={(value)=>{handleSlider(value)}} max={unitCount} autoFocus={true}/>}
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

export default DraftCard;