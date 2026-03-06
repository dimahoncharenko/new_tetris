import { Board } from "../Board";
import { GameStats } from "../GameStats";
import { Previews } from "../Previews";
import { Controller } from "../Controller";

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
