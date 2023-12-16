import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import gameSetupStore from '@stores/GameSetupStore'
export const ResignButton = () => {
    const { resetGameSetup } = gameSetupStore;
    const navigate = useNavigate()
    const doResign = () =>{
        sessionStorage.clear()
        resetGameSetup()
        navigate('/')
    }
  return (
    <Button className={`w-[100%] h-[10%] bg-yellow-600 font-bold rounded-lg  relative z-10 hover:animate-pulse ml-2`} onClick={()=>doResign()}>
        RESIGN
    </Button>
  )
}
