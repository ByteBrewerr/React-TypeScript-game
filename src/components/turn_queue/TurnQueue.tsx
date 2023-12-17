import React, { FC, useState } from "react";
import Teams from "@enums/Teams.enum";
import Character from "@models/characters/Character";
import Modal from "./Modal";

interface TurnQueueProps {
  queue: Character[] | [];
}

// Компонент TurnQueue, представляющий очередь ходов персонажей
const TurnQueue: FC<TurnQueueProps> = ({ queue }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [characterIndex, setCharacterIndex] = useState<number | undefined>(undefined);

  // Обработчик открытия модального окна для выбранного персонажа
  const handleModalOpen = (index: number) => {
    setIsModalVisible(true);
    setCharacterIndex(index);
  };

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    setIsModalVisible(false);
    setCharacterIndex(undefined);
  };

  return (
    <div className="flex">
      {/* Маппинг персонажей в очереди */}
      {queue.map((character, index) => {
        // Установка стилей для кнопки в зависимости от индекса и команды персонажа
        const borderColor = `${index === 0 ? "border-yellow-200" : "border-gray-800"}`;
        const bgColor = `${character.team === Teams.Player ? "bg-sky-900" : "bg-slate-500"}`;
        const isReversed = `${character.team === Teams.Computer ? "scale-x-[-1]" : ""}`;

        // Проверка наличия у персонажа положительного количества
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
            {/* Изображение персонажа */}
            <img className={`${isReversed} max-h-[110%]`} src={character.logo} alt="character" />

            {/* Количество персонажей */}
            <span className="absolute right-0 bottom-0 text-white font-bold mr-1" style={{ fontSize: "clamp(10px, 1vw, 20px)" }}>
              {character.count}
            </span>
          </button>
        );
      })}

      {/* Отображение модального окна, если оно открыто */}
      {isModalVisible && characterIndex != undefined && (
        <Modal handleModalClose={handleModalClose} character={queue[characterIndex]} />
      )}
    </div>
  );
};

export default TurnQueue;
