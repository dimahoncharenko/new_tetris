// Imports components
import { Board } from "../Board";
import { GameStats } from "../GameStats";
import { Previews } from "../Previews";
import { Controller } from "../Controller";

// Imports styled components
import { TetrisWrapper } from "./styled";

export const Tetris = () => {
  return (
    <TetrisWrapper>
      <Board />
      <GameStats />
      <Previews />
      <Controller />
    </TetrisWrapper>
  );
};
