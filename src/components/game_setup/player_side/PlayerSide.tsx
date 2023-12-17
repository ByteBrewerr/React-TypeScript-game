import React, { FC, useEffect, useRef, useState } from "react";
import { Slider, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { createCharacterInstances } from "@models/characters/CharacterClasses";
import Teams from "@enums/Teams.enum";
import Character from "@models/characters/Character";
import updateTurnQueue from "@utils/turnQueueUtils/turnQueueUpdater";
import gameSetupStore from "@stores/GameSetupStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import DraftCard from "./DraftCard";
import DraftControls from "./DraftControls";

interface PlayerSideProps {
  handleIsReseted: () => void;
}

const allCharacters = createCharacterInstances(Teams.Player);

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

  const unitCount = Math.floor(maxValueToSpend / currentUnits[0].strength);

  const handleCurrentUnits = (index: number) => {
    if (currentPick === index) {
      setCurrentUnits((prev) => {
        const newOrder = updateTurnQueue(prev);
        return newOrder;
      });
    }
  };
  const handleNextPick = () => {
    if (valueToSpend < 0 || currentUnits[0].count === 0) {
      return;
    }

    setPickedUnits((prev) => [...prev, currentUnits[0]]);

    setCurrentPick((prev) => prev + 1);

    updatePickOrder();

    if (currentPick === 6) {
      setPlayerCharacters([...playerCharacters, currentUnits[0]]);
      return;
    }

    setCurrentUnits(allCharacters.filter((character) => character.level === currentPick + 2));

    setPlayerCharacters([...playerCharacters, currentUnits[0]]);
    setMaxValueToSpend(valueToSpend);
  };

  const handleRestartDraft = () => {
    setCurrentPick(0);
    setCurrentUnits(allCharacters.filter((character) => character.level === 1));
    setPickedUnits([]);
    resetGameSetup();
    handleIsReseted();
  };

  const handleSlider = (value: number) => {
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
