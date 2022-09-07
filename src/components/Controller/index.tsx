// Imports libraries
import { KeyboardEvent, TouchEvent, useState } from "react";

// Imports styled components
import { ControllerWrapper } from "./styled";

// Imports additional functionality
import {
  handleMovement,
  handleRotation,
  keyToAction,
} from "../../utils/functionality";
import { Pos } from "../../utils/types";

// Imports redux stuff
import {
  pauseGame,
  pausePlayer,
  resumeGame,
  resumePlayer,
  setGameOver,
} from "../../redux/slices/game";
import { useAppDispatch, useAppSelector } from "../../redux";

// Imports custom hooks
import { useInterval } from "../../hooks/useInterval";
import { usePlaying } from "../../hooks/usePlaying";

export const Controller = () => {
  const [coords, setCoords] = useState<Pos>({
    x: 0,
    y: 0,
  });
  const dispatch = useAppDispatch();
  const { player, board, paused } = useAppSelector((state) => state.game);
  // Handles pauses in game
  usePlaying();

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    const action = keyToAction(key);

    if (action === undefined) return;
    if (paused) return;

    if (action === "Down") {
      // Stop an interval when you forcefully pushing down the tetromino
      if (player.speed) dispatch(pausePlayer());

      handleMovement({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        nextStep: { x: 0, y: 1 },
      });
    }

    if (action === "Left") {
      handleMovement({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        nextStep: { x: -1, y: 0 },
      });
    }

    if (action === "Right") {
      handleMovement({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        nextStep: { x: 1, y: 0 },
      });
    }
  };

  const handleKeyUp = ({ key, ctrlKey }: KeyboardEvent<HTMLInputElement>) => {
    const action = keyToAction(key);

    if (action === undefined) return;

    if (action === "Quit") {
      dispatch(setGameOver());
    }

    if (action === "Pause/Resume") {
      if (paused) dispatch(resumeGame());
      else {
        dispatch(pauseGame());
      }
    }

    if (paused) return;

    if (action === "Fastdrop") {
      handleMovement({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        isFastDroping: true,
        nextStep: { x: 0, y: 0 },
      });
    }

    if (action === "Rotate") {
      handleRotation({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        direction: ctrlKey ? -1 : 1,
      });
    }

    if (action === "Down") {
      // Start an interval after a forced pushing down of the tetromino
      if (!player.speed) dispatch(resumePlayer());
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLInputElement>) => {
    if (paused) return;

    const middleOfScreen = Math.round(window.innerWidth / 2);
    const offset = 300;
    const posX = e.touches[0].clientX;

    if (posX > middleOfScreen + offset) {
      handleMovement({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        nextStep: { x: 1, y: 0 },
      });
    } else if (posX < middleOfScreen - offset) {
      handleMovement({
        tetromino: player.tetromino,
        position: player.position,
        dispatch,
        board,
        nextStep: { x: -1, y: 0 },
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const newX = e.changedTouches[0].clientX;
    const newY = e.changedTouches[0].clientY;

    const absX = Math.abs(coords.x - newX);
    const absY = Math.abs(coords.y - newY);

    // If absX is greater than absY, it means user is swiping horizontally
    if (absX > absY) {
      return;
    }

    handleRotation({
      tetromino: player.tetromino,
      position: player.position,
      dispatch,
      board,
    });

    setCoords({ x: newX, y: newY });
  };

  const handleTouchEnd = (e: TouchEvent) => {};

  useInterval(() => {
    if (paused) return;
    handleMovement({
      tetromino: player.tetromino,
      position: player.position,
      dispatch,
      board,
      nextStep: { x: 0, y: 1 },
    });
  }, player.speed);

  return (
    <ControllerWrapper
      type="text"
      autoFocus
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      value=""
      onChange={() => {}}
    />
  );
};
