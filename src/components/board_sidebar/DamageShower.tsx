import React from "react";
import { useHoveredEnemyDamage } from "@contexts/HoveredEnemyDamage";
import { size } from "lodash";

export const DamageShower = () => {
  const { hoveredEnemyDamage, hoveredUnitsToLose } = useHoveredEnemyDamage();

  const minDamage = hoveredEnemyDamage
    ? hoveredEnemyDamage.minDamage
    : undefined;

  const maxDamage = hoveredEnemyDamage
    ? hoveredEnemyDamage.maxDamage
    : undefined;

  const minUnitsToLose = hoveredUnitsToLose.minUnitsToLose;
  const maxUnitsToLose = hoveredUnitsToLose.maxUnitsToLose;

  if (!minDamage || !maxDamage) {
    return null;
  }

  return (
    <div
      className="space-y-5 ml-2"
      style={{ fontSize: "clamp(10px, 1vw, 18px)" }}
    >
      <span className="block font-bold">
        {`Вы нанесете ${minDamage} - ${maxDamage} урона.`}
      </span>
      <span className="font-bold">
        {`Погибнет ${minUnitsToLose} - ${maxUnitsToLose} существ`}
      </span>
    </div>
  );
};
