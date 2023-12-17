import React, { FC, useEffect, useState } from "react";
import gameSetupStore from "@stores/GameSetupStore";
import { Button } from "antd";
import Teams from "@enums/Teams.enum";
import { createCharacterInstances } from "@models/characters/CharacterClasses";
import Character from "@models/characters/Character";
import { observer } from "mobx-react-lite";

const allCharacters = createCharacterInstances(Teams.Player);

interface ComputerSideProps {
  resetComputerSide: boolean;
  handleIsReseted: () => void;
}

// Компонент ComputerSide, представляющий сторону компьютера в драфте
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

  // Эффект, выполняющийся при изменении порядка выбора
  useEffect(() => {
    if (pickOrder[0] === Teams.Computer && resetComputerSide === false) {
      // Фильтрация доступных персонажей для компьютера
      const filteredUnits = allCharacters.filter(
        (character) => character.level === currentPick + 1 && !playerCharacters.some((pc) => pc.name === character.name),
      );

      // Увеличение номера текущего выбора
      setCurrentPick((prev) => prev + 1);

      // Вычисление значения, которое компьютер готов потратить
      const valueToSpend = hanleValueToSpend();

      // Обновление порядка выбора
      updatePickOrder();

      // Установка нового максимального значения для расходов компьютера
      setComputerMaxValueToSpend(computerMaxValueToSpend - valueToSpend);

      // Выбор случайного персонажа и определение количества единиц для этого персонажа
      const randomIndex = Math.floor(Math.random() * filteredUnits.length);
      const randomCharacter = filteredUnits[randomIndex];
      const randomCount = Math.floor(valueToSpend / randomCharacter.strength);

      // Установка количества выбранных единиц для персонажа
      randomCharacter.count = randomCount;

      // Добавление выбранного персонажа в список выбранных
      setPickedUnits([...pickedUnits, randomCharacter]);
    }
  }, [pickOrder]);

  // Эффект, выполняющийся при изменении списка выбранных персонажей
  useEffect(() => {
    // Обновление списка персонажей компьютера в хранилище
    setComputerCharacters(pickedUnits);
  }, [pickedUnits]);

  // Эффект, выполняющийся при сбросе стороны компьютера
  useEffect(() => {
    if (resetComputerSide === true) {
      // Сброс настроек игры для стороны компьютера
      setCurrentPick(0);
      setPickedUnits([]);
      resetGameSetup();
      handleIsReseted();
    }
  }, [resetComputerSide]);

  // Функция для вычисления значения, которое компьютер готов потратить
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

// Экспорт компонента ComputerSide
export default ComputerSide;
