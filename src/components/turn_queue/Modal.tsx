import React, { FC } from "react";
import ReactDom from "react-dom";
import Character from "@models/characters/Character";
import CharacterImage from "./character_info/CharacterImage";
import CharacterStats from "./character_info/CharacterStats";
import "./modal.css";
import { Button } from "antd";

interface ModalProps {
  handleModalClose: () => void;
  character: Character;
}

// Компонент Modal, представляющий модальное окно для отображения информации о персонаже
const Modal: FC<ModalProps> = ({ handleModalClose, character }) => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    alert("no portal");
    return null;
  }

  // Создание портала для модального окна
  return ReactDom.createPortal(
    <div className="ModalContainer min-w-[300px] w-[30vw] h-[300px] text-white rounded-xl  fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
      <Button className="flex justify-end ml-auto text-white font-bold" onClick={() => handleModalClose()}>
        X
      </Button>

      <div className="flex justify-evenly mx-2">
        <CharacterImage logo={character.logo} name={character.name} level={character.level} />
        <CharacterStats character={character} />
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
