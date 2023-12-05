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
    <div className="min-w-[80px] h-[70%] flex flex-col items-center ">
      <img className="w-[80%] h-[80%]" src={logo} alt="characterLogo" />
      <div className="mt-6">
        {name} | level {level}
      </div>
    </div>
  );
};

export default CharacterImage;
