import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface GridContextProps {
  gridOn: boolean;
  toggleGrid: () => void;
}

const GridContext = createContext<GridContextProps | undefined>(undefined);

export const GridProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gridOn, setGridOn] = useState<boolean>(false);

  const toggleGrid = () => {
    setGridOn(!gridOn);
  };

  return (
    <GridContext.Provider value={{ gridOn, toggleGrid }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('no context');
  }
  return context;
};