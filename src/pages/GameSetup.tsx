import ComputerSide from '@components/game_setup/ComputerSide'
import PlayerSide from '@components/game_setup/PlayerSide'
import { Divider } from 'antd'
import React, { FC } from 'react'

const GameSetup:FC = () => {
  return (
    <div className='w-[100%] h-[100vh] bg-black p-20 flex space-x-10'>
        <PlayerSide/>
        <div className='flex justify-between w-full'>
          <Divider className='bg-white h-full' type='vertical' />
          <ComputerSide/>
        </div>
        
    </div>
  )
}

export default GameSetup