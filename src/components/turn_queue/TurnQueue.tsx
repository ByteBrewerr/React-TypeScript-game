import React, { FC, useState } from "react";
import Teams from "@enums/Teams.enum";
import Character from "@models/characters/Character";
import Modal from "./Modal";

interface TurnQueueProps {
  queue: Character[] | [];
}

const TurnQueue: FC<TurnQueueProps> = ({ queue }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [characterIndex, setCharacterIndex] = useState<number | undefined>(undefined);

  const handleModalOpen = (index: number) => {
    setIsModalVisible(true);
    setCharacterIndex(index);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCharacterIndex(undefined);
  };

  return (
    <div className="flex">
      {queue.map((character, index) => {
        const borderColor = `${index === 0 ? "border-yellow-200" : "border-gray-800"}`;
        const bgColor = `${character.team === Teams.Player ? "bg-sky-900" : "bg-slate-500"}`;
        const isReversed = `${character.team === Teams.Computer ? "scale-x-[-1]" : ""}`;
        if (character.count <= 0) {
          return null;
        }

        return (
          <button
            key={character.name}
            onClick={() => handleModalOpen(index)}
            className={`
                w-[38px] h-[38px]
                sm:w-[40px] sm:h-[40px] 
                md:w-[60px] md:h-[60px] 
                lg:w-[75px] lg:h-[75px] 
                xl:w-[85px] xl:h-[85px] 
                2xl:w-[100px] 2xl:h-[100px]  
                border-2 ${borderColor}
                ${bgColor} m-[1px] 
                mt-[20px] items-end
                relative flex 
                justify-center`}
          >
            <img className={`${isReversed} max-h-[110%]`} src={character.logo} alt="character" />

            <span className="absolute right-0 bottom-0 text-white font-bold mr-1" style={{ fontSize: "clamp(10px, 1vw, 20px)" }}>
              {character.count}
            </span>
          </button>
        );
      })}
      {isModalVisible && characterIndex != undefined && (
        <Modal handleModalClose={handleModalClose} character={queue[characterIndex]} />
      )}
    </div>
  );
};

export default TurnQueue;
