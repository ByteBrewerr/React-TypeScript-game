import React, { FC } from 'react';
import Character from '@models/characters/Character';
import { GiHealthPotion, GiCheckedShield, GiSpearHook } from "react-icons/gi"
import { RiSwordLine } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { PiSneakerMoveBold } from "react-icons/pi";


interface CharacterStatsProps {
  character: Character;
}

const CharacterStats: FC<CharacterStatsProps> = ({ character }) => {
  const rowElements: { icon: React.ReactElement, property: keyof Character }[] = [
    { icon: <RiSwordLine />, property: 'assault' },
    { icon: <GiCheckedShield />, property: 'defence' },
    { icon: <GiSpearHook className='scale-x-[-1]'/>, property: 'minDamage'},
    { icon: <GiSpearHook className='scale-y-[-1]'/>, property: 'maxDamage'},
    { icon: <GiHealthPotion />, property: 'health' },
    { icon: <MdHealthAndSafety />, property: 'maxHealth' },
    { icon: <PiSneakerMoveBold />, property: 'initiative' },
    { icon: <FaRunning />, property: 'speed' },
    
  ];

  const renderRows = () => {
    return rowElements.map((element, index) => (
      <div key={index} className='flex '>
        <div className='w-[5vh] flex items-center justify-center'>
            {element.icon}
        </div>
        <div className='w-[20vh]  flex justify-between px-2'>
          <span>{element.property}</span> 
          <span>{character[element.property]}</span> 
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h2>Character Stats</h2>
      {renderRows()}
    </div>
  );
};

export default CharacterStats;

