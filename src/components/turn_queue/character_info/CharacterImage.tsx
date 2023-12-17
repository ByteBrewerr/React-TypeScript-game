import React, { FC } from "react";
import img from "@assets/characters/archangel.png";
import Names from "@enums/Name.enum";

interface CharacterImageProps {
  logo: typeof img;
  name: Names;
  level: number;
}

const CharacterImage: FC<CharacterImageProps> = ({ logo, name, level }) => {
  return (
    <div className="w-[10rem] h-[12rem] flex flex-col items-center ">
      <img className="w-[60%] h-[70%]" src={logo} alt="characterLogo" />
      <div className="mt-6">
        {name} | level {level}
      </div>
    </div>
  );
};

export default CharacterImage;
