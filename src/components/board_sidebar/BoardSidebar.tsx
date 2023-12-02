import React from 'react';
import { useGrid } from '../../contexts/GridProvider'; 
import gridPng from '@assets/grid.png'
import { GridButton } from './GridButton';
import { DamageShower } from './DamageShower';

const GameManipulator = () => {
  

  return (
    <div className='flex flex-col space-y-4 w-[16vh]'>
      <GridButton/>
      <DamageShower/>
    </div>
  );
};

export default GameManipulator;
