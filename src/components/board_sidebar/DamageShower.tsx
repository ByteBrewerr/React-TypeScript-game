import React from 'react'
import { useHoveredEnemyDamage } from '@contexts/HoveredEnemyDamage'

export const DamageShower = () => {
  const {hoveredEnemyDamage, hoveredUnitsToLose} = useHoveredEnemyDamage()

  const minDamage = hoveredEnemyDamage ? hoveredEnemyDamage.minDamage : undefined
  const maxDamage = hoveredEnemyDamage ? hoveredEnemyDamage.maxDamage : undefined
  const minUnitsToLose = hoveredUnitsToLose.minUnitsToLose
  const maxUnitsToLose = hoveredUnitsToLose.maxUnitsToLose

  if(!minDamage || !maxDamage){
    return null
  }

  return (
    <div className='w-[25vh] space-y-5'>
        <span className='block font-bold'>
            {`Вы нанесете ${minDamage} - ${maxDamage} урона`}
        </span>
        <span className='font-bold'>
            {`Погибнет ${minUnitsToLose} - ${maxUnitsToLose} существ`}
        </span>
    </div>
  )
}
