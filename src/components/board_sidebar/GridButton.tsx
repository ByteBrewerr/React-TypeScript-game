import React from 'react'
import { useGrid } from '@contexts/GridProvider';
import gridPng from '@assets/grid.png'


export const GridButton = () => {

  const { toggleGrid } = useGrid();
  
  return (
    <button
        className={`rounded-lg w-[125px] h-[100px] font-bold relative z-10 hover:animate-pulse`}
        onClick={toggleGrid}
        style={{ background: `url(${gridPng}) no-repeat center / contain ` }}
    />
  )
}
