// Imports libraries
import { MouseEventHandler } from "react";

// Imports styled components
import { StartButton, MenuWrapper, Logo, MainHeading } from "./styled";

// Imports assets
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
