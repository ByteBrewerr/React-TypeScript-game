import React, {
  createContext,
  useContext,
  FC,
  useState,
  ReactNode,
} from "react";

type Damage = { minDamage: number; maxDamage: number };

type UnitsToLose = { minUnitsToLose: number; maxUnitsToLose: number };

interface HoveredEnemyDamageContextProps {
  hoveredEnemyDamage: Damage | null;
  updateHoveredEnemyDamage: (minDamage: number, maxDamage: number) => void;
  hoveredUnitsToLose: UnitsToLose;
  updateUnitsToLose: (minUnitsToLose: number, maxUnitsToLose: number) => void;
  resetHoveredEnemyDamage: () => void;
}

const HoveredEnemyDamageContext = createContext<
  HoveredEnemyDamageContextProps | undefined
>(undefined);

export const HoveredEnemyDamageProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hoveredEnemyDamage, setHoveredEnemyDamage] = useState<Damage | null>(
    null,
  );

  const [hoveredUnitsToLose, setHoveredUnitsToLose] = useState<UnitsToLose>({
    minUnitsToLose: 0,
    maxUnitsToLose: 0,
  });

  const updateHoveredEnemyDamage = (minDamage: number, maxDamage: number) => {
    setHoveredEnemyDamage({ minDamage, maxDamage });
  };

  const updateUnitsToLose = (
    minUnitsToLose: number,
    maxUnitsToLose: number,
  ) => {
    setHoveredUnitsToLose({ minUnitsToLose, maxUnitsToLose });
  };

  const resetHoveredEnemyDamage = () => {
    setHoveredEnemyDamage(null);
  };

  return (
    <HoveredEnemyDamageContext.Provider
      value={{
        hoveredEnemyDamage,
        updateHoveredEnemyDamage,
        hoveredUnitsToLose,
        updateUnitsToLose,
        resetHoveredEnemyDamage,
      }}
    >
      {children}
    </HoveredEnemyDamageContext.Provider>
  );
};

export const useHoveredEnemyDamage = () => {
  const context = useContext(HoveredEnemyDamageContext);
  if (!context) {
    throw new Error("no context");
  }
  return context;
};
