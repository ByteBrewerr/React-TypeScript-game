import { Slider } from 'antd';
import React from 'react'

const ComputerSide = () => {
  return (
    <div className='space-y-4 flex flex-col'>
      {Array(7).fill(null).map((el, index) => {
        return (
          <div className='flex items-center space-x-20' key={index}>
            <button className='border-yellow-600 border-[2px] w-24 h-24'>
            </button> 
          </div>
        );
      })}
    </div>
  )
}

export default ComputerSide