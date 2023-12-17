import React from "react";
import { useHoveredEnemyDamage } from "@contexts/HoveredEnemyDamage";

/**
 * Компонент `DamageShower` предназначен для отображения информации о возможном уроне
 * и количестве существ, которые могут быть уничтожены при взаимодействии с врагом.
 */
export const DamageShower = () => {
  const { hoveredEnemyDamage, hoveredUnitsToLose } = useHoveredEnemyDamage();

  // Извлекаем значения минимального и максимального урона из хука
  const minDamage = hoveredEnemyDamage ? hoveredEnemyDamage.minDamage : undefined;
  const maxDamage = hoveredEnemyDamage ? hoveredEnemyDamage.maxDamage : undefined;

  // Извлекаем значения минимального и максимального количества существ из хука
  const minUnitsToLose = hoveredUnitsToLose.minUnitsToLose;
  const maxUnitsToLose = hoveredUnitsToLose.maxUnitsToLose;

  // Если информация о уроне недоступна, возвращаем null
  if (!minDamage || !maxDamage) {
    return null;
  }

  return (
    <div className="space-y-5 ml-2" style={{ fontSize: "clamp(10px, 1vw, 18px)" }}>
      {/* Отображаем информацию о возможном уроне */}
      <span className="block font-bold">{`Вы нанесете ${minDamage} - ${maxDamage} урона.`}</span>

      {/* Отображаем информацию о количестве существ, которые могут быть уничтожены */}
      <span className="font-bold">{`Погибнет ${minUnitsToLose} - ${maxUnitsToLose} существ`}</span>
    </div>
  );
};
