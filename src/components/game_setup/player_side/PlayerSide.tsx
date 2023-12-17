import React, { FC, useState } from "react";
import { createCharacterInstances } from "@models/characters/CharacterClasses";
import Teams from "@enums/Teams.enum";
import Character from "@models/characters/Character";
import updateTurnQueue from "@utils/turnQueueUtils/turnQueueUpdater";
import gameSetupStore from "@stores/GameSetupStore";
import { observer } from "mobx-react-lite";
import DraftCard from "./DraftCard";
import DraftControls from "./DraftControls";

const allCharacters = createCharacterInstances(Teams.Player);

interface PlayerSideProps {
  handleIsReseted: () => void;
}

// Компонент PlayerSide, представляющий сторону игрока в драфте
const PlayerSide: FC<PlayerSideProps> = observer(({ handleIsReseted }) => {
  const {
    valueToSpend,
    maxValueToSpend,
    setValueToSpend,
    setMaxValueToSpend,
    setPlayerCharacters,
    updatePickOrder,
    resetGameSetup,
    playerCharacters,
  } = gameSetupStore;

  const [currentPick, setCurrentPick] = useState<number>(0);
  const [currentUnits, setCurrentUnits] = useState<Character[]>(allCharacters.filter((character) => character.level === 1));
  const [pickedUnits, setPickedUnits] = useState<Character[]>([]);

  // Рассчитывается максимальное количество выбранных персонажей, которое можно себе позволить
  const unitCount = Math.floor(maxValueToSpend / currentUnits[0].strength);

  // Функция для обновления порядка хода
  const handleCurrentUnits = (index: number) => {
    if (currentPick === index) {
      setCurrentUnits((prev) => {
        const newOrder = updateTurnQueue(prev);
        return newOrder;
      });
    }
  };

  // Функция для обработки следующего выбора
  const handleNextPick = () => {
    if (valueToSpend < 0 || currentUnits[0].count === 0) {
      return;
    }

    // Добавление текущего персонажа в список выбранных
    setPickedUnits((prev) => [...prev, currentUnits[0]]);
    // Увеличение номера текущего выбора
    setCurrentPick((prev) => prev + 1);
    // Обновление порядка выбора
    updatePickOrder();

    // Если выбор завершен, добавление персонажа в список игрока
    if (currentPick === 6) {
      setPlayerCharacters([...playerCharacters, currentUnits[0]]);
      return;
    }

    // Обновление текущих персонажей и списка игрока
    setCurrentUnits(allCharacters.filter((character) => character.level === currentPick + 2));
    setPlayerCharacters([...playerCharacters, currentUnits[0]]);
    // Установка нового максимального значения для расходования
    setMaxValueToSpend(valueToSpend);
  };

  // Функция для перезапуска драфта
  const handleRestartDraft = () => {
    setCurrentPick(0);
    setCurrentUnits(allCharacters.filter((character) => character.level === 1));
    setPickedUnits([]);
    // Сброс настроек игры
    resetGameSetup();
    handleIsReseted();
  };

  // Функция для обработки изменения ползунка
  const handleSlider = (value: number) => {
    // Обновление состояния valueToSpend и количества выбранных персонажей
    setValueToSpend(value, currentUnits[0].strength);
    currentUnits[0].count = value;
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="space-y-4 flex flex-col">
        {Array(7)
          .fill(null)
          .map((el, index) => {
            return (
              <DraftCard
                key={index}
                currentPick={currentPick}
                handleCurrentUnits={handleCurrentUnits}
                handleNextPick={handleNextPick}
                currentUnits={currentUnits}
                pickedUnits={pickedUnits}
                unitCount={unitCount}
                handleSlider={handleSlider}
                index={index}
              />
            );
          })}
      </div>
      <DraftControls valueToSpend={valueToSpend} playerCharacters={playerCharacters} handleRestartDraft={handleRestartDraft} />
    </div>
  );
});

export default PlayerSide;
