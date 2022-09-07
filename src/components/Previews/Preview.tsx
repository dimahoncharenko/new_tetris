// Imports libraries
import { Fragment } from "react";

// Imports styled components
import { PreviewWrapper } from "./styled";

// Imports additional functionality
import { CellType } from "../../utils/types";
import { defaultBoard, TETROMINOS } from "../../utils/functionality";

// Imports components
import { Cell } from "../Cell";

type Props = {
  type: CellType;
};

export const Preview = ({ type }: Props) => {
  const tetromino = TETROMINOS[type];

  return (
    <PreviewWrapper
      rows={tetromino.shape.length}
      cols={tetromino.shape[0].length}
    >
      {tetromino.shape.map((row) =>
        row.map((col, x) => (
          <Fragment key={x * tetromino.shape.length + x}>
            {col ? (
              <Cell type={type} />
            ) : (
              <Cell
                type=""
                styles={{ border: ".005em solid hsl(0, 0%, 20%)" }}
              />
            )}
          </Fragment>
        ))
      )}
    </PreviewWrapper>
  );
};
