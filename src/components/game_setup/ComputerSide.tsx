import React, { FC, useEffect, useState } from "react";
import gameSetupStore from "@stores/GameSetupStore";
import { Button } from "antd";
import Teams from "@enums/Teams.enum";
import { createCharacterInstances } from "@models/characters/CharacterClasses";
import Character from "@models/characters/Character";
import { observer } from "mobx-react-lite";

interface ComputerSideProps {
  resetComputerSide: boolean;
  handleIsReseted: () => void;
}

const allCharacters = createCharacterInstances(Teams.Player);

const ComputerSide: FC<ComputerSideProps> = observer(({ resetComputerSide, handleIsReseted }) => {
  const {
    pickOrder,
    playerCharacters,
    setComputerCharacters,
    updatePickOrder,
    resetGameSetup,
    computerMaxValueToSpend,
    setComputerMaxValueToSpend,
    FIXED_VALUE_TO_SPEND,
  } = gameSetupStore;

  const [currentPick, setCurrentPick] = useState<number>(0);
  const [pickedUnits, setPickedUnits] = useState<Character[]>([]);
  console.log(pickedUnits);
  useEffect(() => {
    if (pickOrder[0] === Teams.Computer && resetComputerSide === false) {
      const filteredUnits = allCharacters.filter(
        (character) => character.level === currentPick + 1 && !playerCharacters.some((pc) => pc.name === character.name),
      );
      setCurrentPick((prev) => prev + 1);
      const valueToSpend = hanleValueToSpend();
      updatePickOrder();
      setComputerMaxValueToSpend(computerMaxValueToSpend - valueToSpend);

      const randomIndex = Math.floor(Math.random() * filteredUnits.length);
      const randomCharacter = filteredUnits[randomIndex];
      const randomCount = Math.floor(valueToSpend / randomCharacter.strength);

      randomCharacter.count = randomCount;
      setPickedUnits([...pickedUnits, randomCharacter]);
    }
  }, [pickOrder]);

  useEffect(() => {
    setComputerCharacters(pickedUnits);
  }, [pickedUnits]);

  useEffect(() => {
    if (resetComputerSide === true) {
      setCurrentPick(0);
      setPickedUnits([]);
      resetGameSetup();
      handleIsReseted();
    }
  }, [resetComputerSide]);

  const hanleValueToSpend = (): number => {
    const randomPercentage = Math.floor(Math.random() * (18 - 8 + 1)) + 8;
    const value = (randomPercentage / 100) * FIXED_VALUE_TO_SPEND;
    return value;
  };

  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-full ">
      {Array(7)
        .fill(null)
        .map((el, index) => {
          return (
            <div className="flex items-center ml-auto" key={index}>
              <div className="flex justify-between items-center ">
                {pickedUnits[index] && <span className="text-white mr-4">{pickedUnits[index].count}</span>}
                <Button className="flex justify-center items-center border-yellow-600 border-[2px] w-[11vh] h-[11vh] min-w-[3rem] min-h-[3rem] bg-sky-900">
                  {pickedUnits[index] && (
                    <img
                      className="w-[100%] h-[100%] min-w-[30px] min-h-[30px] scale-x-[-1]"
                      src={pickedUnits[index].logo}
                      alt="logo"
                    />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default ComputerSide;
