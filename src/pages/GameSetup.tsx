import ComputerSide from '@components/game_setup/ComputerSide'
import PlayerSide from '@components/game_setup/player_side/PlayerSide'
import { Divider } from 'antd'
import React, { FC, useState } from 'react'

const GameSetup:FC = () => {

  const [resetComputerSide, setResetComputerSide] = useState(false);

  const handleResetComputerSide = () => {
    setResetComputerSide((prev) => !prev);
  };


  return (
    <div className='w-[100%] h-[100vh] bg-black p-20 flex space-x-10'>
        <PlayerSide handleResetComputerSide={handleResetComputerSide}/>
        <div className='flex justify-between w-full'>
          <Divider className='bg-white h-full' type='vertical' />
        <ComputerSide resetComputerSide={resetComputerSide} handleResetComputerSide={handleResetComputerSide}/>
        </div>
        
    </div>
  )
}

export default GameSetup