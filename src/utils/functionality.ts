// Imports types
import { useAppDispatch } from "../redux";
import { setGameOver, updatePlayer } from "../redux/slices/game";
import { ICell, CellType, Pos, TetrominoShape } from "./types";

export class Cell implements ICell {
  public isFixed = false;

  constructor(public type: CellType = "") {}

  setShape(type: CellType) {
    if (type !== "") {
      this.type = type;
    }
  }

  setFixed() {
    this.isFixed = true;
  }
}

export const defaultBoard = (rows: number, cols: number) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => new Cell())
  );

export const TETROMINOS: {
  [P in CellType]: {
    shape: TetrominoShape;
  };
} = {
  "": {
    shape: [],
  },
  ghost: {
    shape: [],
  },
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  },
  J: {
    shape: [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1],
    ],
  },
  L: {
    shape: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
};

type RandomizePlayer = () => {
  shape: CellType;
  tetromino: TetrominoShape;
};

export const randomizePlayer: RandomizePlayer = () => {
  // Without "" and 'ghost' keys
  const shapes: CellType[] = Object.keys(TETROMINOS).slice(2) as CellType[];

  const chosen = shapes[Math.floor(Math.random() * shapes.length)];

  return {
    shape: chosen,
    tetromino: TETROMINOS[chosen].shape,
  };
};

type ActionTypes =
  | "Right"
  | "Left"
  | "Rotate"
  | "Down"
  | "Quit"
  | "Pause/Resume"
  | "Fastdrop";

const ACTIONS: {
  [key: string]: ActionTypes;
} = {
  ArrowRight: "Right",
  ArrowLeft: "Left",
  ArrowUp: "Rotate",
  ArrowDown: "Down",
  q: "Quit",
  Q: "Quit",
  P: "Pause/Resume",
  p: "Pause/Resume",
  // Spacebar key
  " ": "Fastdrop",
};

export const keyToAction = (key: string): ActionTypes | undefined =>
  // @ts-ignore
  ACTIONS[key];

type RotateArgs = {
  direction?: 1 | -1;
  tetromino: TetrominoShape;
};

export const rotate = ({ direction = 1, tetromino }: RotateArgs) => {
  // Swap rows and columns
  const rotated = tetromino.map((_, rowIndex) =>
    tetromino.map((row) => row[rowIndex])
  );

  if (direction > 0) return rotated.map((row) => row.reverse());

  // Rotate in different direction
  return rotated.reverse();
};

type HasCollisionArgs = {
  tetromino: TetrominoShape;
  position: Pos;
  board: Cell[][];
};

export const hasCollision = ({
  tetromino,
  position,
  board,
}: HasCollisionArgs) => {
  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[0].length; col++) {
      if (tetromino[row][col]) {
        if (
          // If there is a row in the board array which equals player's position
          !board[row + position.y] ||
          // If there is a cell in the board array
          !board[row + position.y][col + position.x] ||
          // If the cell is fixed
          board[row + position.y][col + position.x].isFixed
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

type HandleRotationArgs = {
  position: Pos;
  tetromino: TetrominoShape;
  board: Cell[][];
  direction?: -1 | 1;
  dispatch: ReturnType<typeof useAppDispatch>;
};

export const handleRotation = ({
  tetromino,
  board,
  position,
  dispatch,
  direction = 1,
}: HandleRotationArgs) => {
  // Take rotated tetromino
  let candidate = rotate({
    tetromino: tetromino,
    direction,
  });

  let newPos = { x: 0, y: 0 };
  let offset = 1;

  // Shift tetromino's position if it is collided to the left or right
  while (
    hasCollision({
      tetromino: candidate,
      position: { x: position.x + newPos.x, y: position.y },
      board,
    })
  ) {
    newPos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));

    // But if offset of position is high enough then return to previous rotation and remove shifted position
    if (offset > candidate[0].length) {
      candidate = rotate({
        tetromino: tetromino,
        direction: direction ? -1 : 1,
      });
      newPos = { x: 0, y: 0 };
      break;
    }
  }

  dispatch(updatePlayer({ tetromino: candidate, position: newPos }));
};

type HandleMovementArgs = {
  position: Pos;
  nextStep: Pos;
  tetromino: TetrominoShape;
  board: Cell[][];
  isFastDroping?: boolean;
  dispatch: ReturnType<typeof useAppDispatch>;
};

export const handleMovement = ({
  position,
  nextStep,
  tetromino,
  isFastDroping = false,
  board,
  dispatch,
}: HandleMovementArgs) => {
  const collided = hasCollision({
    tetromino: tetromino,
    position: {
      x: position.x + nextStep.x,
      y: position.y + nextStep.y,
    },
    board,
  });

  // If its the very first row, it will be ignored
  if (collided && position.y <= 0 && nextStep.y > 0) {
    dispatch(setGameOver());
  }

  // If the player is plummeted and collided
  const isItTouchedGround = nextStep.y > 0 && collided;

  // If 'Fast Drop' action is used, calculate the lowest position of player and update its position
  if (isFastDroping) {
    const dropRow = dropPosition({
      board,
      tetromino,
      position,
    });

    return dispatch(
      updatePlayer({
        position: {
          x: 0,
          y: dropRow - position.y,
        },
        fixed: true,
      })
    );
  }

  // Handle left, right and bottom movement
  dispatch(
    updatePlayer({
      position: {
        x: !collided ? nextStep.x : 0,
        y: !collided ? nextStep.y : 0,
      },
      fixed: isItTouchedGround,
    })
  );
};

type DropPositionArgs = {
  position: Pos;
  tetromino: TetrominoShape;
  board: Cell[][];
};

export const dropPosition = ({
  position,
  board,
  tetromino,
}: DropPositionArgs) => {
  // Remained to the bottom of tetris
  const rowsToBottom = board.length - position.y;
  let ghostRow = 0;

  for (let i = 0; i < rowsToBottom; i++) {
    if (
      hasCollision({
        tetromino,
        board,
        position: { x: position.x, y: position.y + i },
      })
    ) {
      break;
    }

    // In the last iteration, it will get the lowest possible position of shape
    ghostRow = position.y + i;
  }

  return ghostRow;
};

export const MIN_SPEED = 150;
export const SPEED_STEP = 50;
export const INITIAL_SPEED = 1000;

export const SCORE_RATE = 50;
