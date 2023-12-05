import React, { FC } from "react";
import ReactDom from "react-dom";
import Character from "@models/characters/Character";
import CharacterImage from "./character_info/CharacterImage";
import CharacterStats from "./character_info/CharacterStats";
import "./modal.css";

interface ModalProps {
  handleModalClose: () => void;
  character: Character;
}

const Modal: FC<ModalProps> = ({ handleModalClose, character }) => {
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) {
    alert("Портал не найден");
    return null;
  }
  return ReactDom.createPortal(
    <div className="ModalContainer min-w-[400px] w-[30vw] h-[400px] text-white rounded-xl  fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
      <button
        className="flex justify-end w-[100%] text-white font-bold"
        onClick={() => handleModalClose()}
      >
        X
      </button>
      <div className="flex justify-between mx-2">
        <CharacterImage
          logo={character.logo}
          name={character.name}
          level={character.level}
        />
        <CharacterStats character={character} />
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
