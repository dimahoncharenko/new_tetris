export type CellType = "" | "I" | "L" | "Z" | "S" | "O" | "T" | "J" | "ghost";

export interface ICell {
  isFixed: boolean;
  type: CellType;
}

export type Pos = {
  x: number;
  y: number;
};

export type TetrominoShape = number[][];

export type Player = {
  fixed: boolean;
  shape: CellType;
  position: Pos;
  tetromino: TetrominoShape;
  speed: number | null;
  previousSpeed: number | null;
};
