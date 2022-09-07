import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Imports additional functionality
import {
  defaultBoard,
  Cell,
  randomizePlayer,
  INITIAL_SPEED,
  SCORE_RATE,
} from "../../utils/functionality";
import { CellType, Player } from "../../utils/types";

type ChangeBoardSizePayload = {
  width: number;
  height: number;
};

type ChangeCellType = {
  cell: Cell;
  type: CellType;
};

type UpdatePlayerPayload = Partial<Player>;

type HitRowPayload = {
  clearedRows: number;
};

let defaultState = {
  gameIsOver: true,
  width: 20,
  height: 10,
  level: 1,
  score: 0,
  paused: false,
  clearedRows: 0,
  rowsToLevelUp: 10,
  nextPlayers: [] as ReturnType<typeof randomizePlayer>[],
  board: defaultBoard(10, 20),
  player: {
    fixed: false,
    position: {
      x: 4,
      y: 0,
    },
    shape: "",
    speed: INITIAL_SPEED,
    previousSpeed: null,
    tetromino: [],
  } as Player,
};

const game = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    setGameOver(state) {
      state.gameIsOver = true;
      state.paused = false;
      state.nextPlayers = defaultState.nextPlayers;
    },
    resetGameOver(state) {
      state.level = defaultState.level;
      state.clearedRows = defaultState.clearedRows;
      state.rowsToLevelUp = defaultState.rowsToLevelUp;
      state.score = defaultState.score;
      state.player.previousSpeed = defaultState.player.previousSpeed;
      state.player.speed = defaultState.player.speed;

      for (let i = 0; i <= 3; i++) {
        state.nextPlayers.push(randomizePlayer());
      }

      // Remove the current player and order array correctly
      state.nextPlayers = state.nextPlayers.slice(1).reverse();

      state.gameIsOver = false;
    },
    changeBoardSize(state, action: PayloadAction<ChangeBoardSizePayload>) {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.board = defaultBoard(action.payload.height, action.payload.width);
    },
    updateBoard(state, action: PayloadAction<typeof defaultState.board>) {
      state.board = action.payload;
    },
    changeCellType(state, action: PayloadAction<ChangeCellType>) {
      state.board = state.board.map((row) => {
        const index = row.indexOf(action.payload.cell);
        if (index > -1) {
          return row.map((col, col_index) => {
            if (index === col_index) {
              col.setShape("I");
            }

            return col;
          });
        }
        return row;
      });
    },
    resetPlayer(state) {
      const chosenPlayer = randomizePlayer();
      const nextPlayer = state.nextPlayers.shift()!;

      state.player.shape = nextPlayer.shape;
      state.nextPlayers.push(chosenPlayer);
      state.player.tetromino = nextPlayer.tetromino;
      state.player.fixed = false;
      state.player.position.x = Math.floor(state.width / 2) - 1;
      state.player.position.y = 0;
    },
    setPlayerFixed(state) {
      state.player.fixed = true;
    },
    updatePlayer(state, action: PayloadAction<UpdatePlayerPayload>) {
      if (action.payload.tetromino)
        state.player.tetromino = action.payload.tetromino;
      if (action.payload.fixed) {
        state.player.fixed = action.payload.fixed;
      }
      if (action.payload.shape) state.player.shape = action.payload.shape;
      if (action.payload.position) {
        state.player.position.x += action.payload.position.x;
        state.player.position.y += action.payload.position.y;
      }

      if (action.payload.speed === null || action.payload.speed) {
        state.player.speed = action.payload.speed;
      }
    },
    pausePlayer(state) {
      if (state.player.speed) state.player.previousSpeed = state.player.speed;
      state.player.speed = null;
    },
    resumePlayer(state) {
      if (state.player.previousSpeed) {
        state.player.speed = state.player.previousSpeed;
        state.player.previousSpeed = null;
      }
    },
    pauseGame(state) {
      state.paused = true;
    },
    resumeGame(state) {
      state.paused = false;
    },
    hitRow(state, action: PayloadAction<HitRowPayload>) {
      if (state.rowsToLevelUp === 1) {
        state.level++;
        state.rowsToLevelUp = (10 * state.level) / 2;
      }
      state.rowsToLevelUp -= action.payload.clearedRows;
      state.clearedRows += action.payload.clearedRows;
      state.score += SCORE_RATE * state.level;
    },
  },
});

export const {
  resetGameOver,
  setGameOver,
  changeBoardSize,
  changeCellType,
  updateBoard,
  resetPlayer,
  setPlayerFixed,
  updatePlayer,
  pausePlayer,
  resumePlayer,
  pauseGame,
  resumeGame,
  hitRow,
} = game.actions;
export default game.reducer;
