// Imports libraries
import { useEffect } from "react";

// Imports components
import { Menu } from "../Menu";
import { Tetris } from "../Tetris";

// Imports styled components
import { GameWrapper, Modal } from "./styled";

// Imports redux stuff
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  resetGameOver,
  changeBoardSize,
  resetPlayer,
} from "../../redux/slices/game";

type Props = {
  rows: number;
  cols: number;
};

export const Game = ({ rows, cols }: Props) => {
  const dispatch = useAppDispatch();
  const gameIsOver = useAppSelector((state) => state.game.gameIsOver);
  const paused = useAppSelector((state) => state.game.paused);

  useEffect(() => {
    dispatch(changeBoardSize({ width: cols, height: rows }));
  }, [rows, cols, dispatch]);

  const handleStart = () => {
    dispatch(changeBoardSize({ width: cols, height: rows }));
    dispatch(resetGameOver());
    dispatch(resetPlayer());
  };

  return (
    <GameWrapper>
      <Modal showed={paused}>PAUSE</Modal>
      {gameIsOver ? <Menu onStart={handleStart} /> : <Tetris />}
    </GameWrapper>
  );
};
