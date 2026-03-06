import { MouseEventHandler } from "react";

import { StartButton, MenuWrapper, Logo, MainHeading } from "./styled";

import gameboy from "../../images/gameboy.png";

type Props = {
  onStart: MouseEventHandler;
};

export const Menu = ({ onStart }: Props) => {
  return (
    <MenuWrapper>
      <Logo src={gameboy} />
      <MainHeading>Tetris Game</MainHeading>
      <StartButton onClick={onStart}>Start</StartButton>
    </MenuWrapper>
  );
};
