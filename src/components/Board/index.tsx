// Imports redux stuff
import { useAppSelector, useAppDispatch } from "../../redux/";
import { resetPlayer, updateBoard, hitRow } from "../../redux/slices/game";

// Imports styled components
import { BoardWrapper } from "./styled";

// Imports components
import { Cell } from "../Cell";
import { useEffect } from "react";

// Imports additional functionality
import {
  Cell as CellElement,
  dropPosition,
  defaultBoard,
} from "../../utils/functionality";

export const Board = () => {
  const dispatch = useAppDispatch();
  const { board, width, height, player } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    let newBoard = board.slice();

    // Sweep the rows
    newBoard = newBoard.map((row) =>
      row.map((col) => (col.isFixed ? col : new CellElement()))
    );

    // Clearing rows
    const rows = newBoard.reduce((acc: CellElement[][], row) => {
      if (!row.every((cell) => cell.isFixed)) {
        acc.push(row);
        return acc;
      }

      // Update game stats
      dispatch(hitRow({ clearedRows: 1 }));
      acc.unshift(defaultBoard(1, row.length)[0]);
      return acc;
    }, []);

    newBoard = rows;

    const dropRow = dropPosition({
      position: player.position,
      board,
      tetromino: player.tetromino,
    });

    // Redraw a player and its ghost
    player.tetromino.forEach((row, y) =>
      row.forEach((col, x) => {
        if (col !== 0) {
          const playerShape =
            newBoard[y + player.position.y][x + player.position.x];
          const ghost = newBoard[y + dropRow][x + player.position.x];

          if (ghost instanceof CellElement) {
            ghost.setShape("ghost");
          }

          if (playerShape instanceof CellElement) {
            playerShape.setShape(player.shape);
          }

          if (player.fixed) {
            playerShape.setFixed();
          }
        }
      })
    );

    dispatch(updateBoard(newBoard));
  }, [player]);

  useEffect(() => {
    if (player.fixed) {
      dispatch(resetPlayer());
    }
  }, [player.fixed]);

  return (
    <BoardWrapper rows={height} cols={width}>
      {board.map((row) =>
        row.map((col, x) => <Cell key={x * width + x} type={col.type} />)
      )}
    </BoardWrapper>
  );
};
